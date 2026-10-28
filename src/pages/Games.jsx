import { useEffect, useRef, useState } from 'react'
import Matter from 'matter-js'
const BASE = import.meta.env.BASE_URL

// ---------- Game settings (tweak these) ----------
const AIR_RATE = 1e9        // catch bonus per second in the air
const MIN_AIR = 0.25        // seconds in the air before a catch counts
const STILL_FRAMES = 30     // this many nearly-still frames = landed on something
const BALL_COLORS = ['#ef4444', '#f59e0b', '#22c55e', '#3b82f6', '#a855f7']

// 1,234 / 1.23e+25 / ∞
const fmt = n => {
  if (n === Infinity) return '∞'
  if (!Number.isFinite(n)) return '0'
  return n < 1e6 ? Math.floor(n).toLocaleString() : n.toExponential(2)
}

// Load Matter.js once from public/vendor/
let matterPromise = null
function loadMatter() {
  if (window.Matter) return Promise.resolve()
  if (!matterPromise) {
    matterPromise = new Promise((resolve, reject) => {
      const s = document.createElement('script')
      s.src = BASE + 'vendor/matter.min.js'
      s.onload = () => resolve()
      s.onerror = () => {
        s.remove()
        matterPromise = null
        reject(new Error(`Could not load ${s.src}. Is matter.min.js in public/vendor/?`))
      }
      document.head.appendChild(s)
    })
  }
  return matterPromise
}

// Runs the game. Returns a stop() function that undoes everything.
function runGame({ pageEl, hud }) {
const { Engine, Bodies, Composite, Constraint, Events } = Matter
  const cleanups = []
  const listen = (target, type, fn, opts) => {
    target.addEventListener(type, fn, opts)
    cleanups.push(() => target.removeEventListener(type, fn, opts))
  }

  // lock scrolling while playing
  const htmlOverflow = document.documentElement.style.overflow
  const bodyOverflow = document.body.style.overflow
  document.documentElement.style.overflow = 'hidden'
  document.body.style.overflow = 'hidden'
  cleanups.push(() => {
    document.documentElement.style.overflow = htmlOverflow
    document.body.style.overflow = bodyOverflow
  })

  const engine = Engine.create()
  engine.gravity.x = 0
  engine.gravity.y = 1                    // 0.5 = floaty, 2 = heavy

  // ---------- the page's own elements become physics bodies ----------
  const items = []
  pageEl.querySelectorAll('*:not(:has(*)):not(script):not(style):not(canvas)').forEach(el => {
    const r = el.getBoundingClientRect()
    if (!r.width || !r.height || r.bottom < 0 || r.top > innerHeight) return
    if (r.width * r.height > innerWidth * innerHeight * 0.5) return

    // remember the original style so cleanup can put it back exactly
    const oldStyle = el.getAttribute('style')
    cleanups.push(() => (oldStyle === null ? el.removeAttribute('style') : el.setAttribute('style', oldStyle)))

    const x0 = r.left + r.width / 2 + scrollX
    const y0 = r.top + r.height / 2 + scrollY
    const body = Bodies.rectangle(x0, y0, r.width, r.height, { restitution: 0.4, friction: 0.3 })

    const cs = getComputedStyle(el)
    if (cs.display === 'inline') el.style.display = 'inline-block'
    if (cs.position === 'static') el.style.position = 'relative'   // so z-index works
    el.style.transition = 'none'
    el.style.touchAction = 'none'         // stops phone scrolling while dragging
    el.style.userSelect = 'none'
    el.draggable = false

    items.push({ el, body, x0, y0, st: { grabs: 0, flying: false, t0: 0, still: 0 } })
  })

  // ---------- 5 coloured balls ----------
  const radius = innerWidth < 600 ? 24 : 30
  BALL_COLORS.forEach((color, i) => {
    const x0 = innerWidth * (i + 1) / (BALL_COLORS.length + 1)
    const y0 = scrollY - radius - i * 70      // start above the screen and rain in

    const el = document.createElement('div')
    el.setAttribute('aria-hidden', 'true')
    Object.assign(el.style, {
      position: 'fixed',
      left: (x0 - radius) + 'px',
      top: (y0 - scrollY - radius) + 'px',
      width: radius * 2 + 'px',
      height: radius * 2 + 'px',
      borderRadius: '50%',
      background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,.75), ${color} 55%)`,
      boxShadow: '0 2px 6px rgba(0,0,0,.4)',
      cursor: 'grab',
      zIndex: '900',
      touchAction: 'none',
      userSelect: 'none',
      webkitUserSelect: 'none',
      webkitTouchCallout: 'none',
    })
    el.draggable = false
    document.body.appendChild(el)
    cleanups.push(() => el.remove())

    const body = Bodies.circle(x0, y0, radius, { restitution: 0.7, friction: 0.05 })
    items.push({ el, body, x0, y0, st: { grabs: 0, flying: false, t0: 0, still: 0 } })
  })

  // ---------- floor and side walls ----------
  const bottom = scrollY + innerHeight
  const mid = scrollY + innerHeight / 2
  Composite.add(engine.world, [
    Bodies.rectangle(innerWidth / 2, bottom + 50, innerWidth * 3, 100, { isStatic: true }),
    Bodies.rectangle(-50, mid, 100, 10000, { isStatic: true }),
    Bodies.rectangle(innerWidth + 50, mid, 100, 10000, { isStatic: true }),
    ...items.map(i => i.body),
  ])

  // ---------- messages and scoring ----------
  const hideMsg = () => {
    hud.message.style.opacity = '0'
    setTimeout(() => { hud.message.style.display = 'none' }, 600)
  }
  const msgTimer = setTimeout(hideMsg, 7000)
  cleanups.push(() => clearTimeout(msgTimer))

  let score = 0
  let statusTimer = 0
  cleanups.push(() => clearTimeout(statusTimer))

  const setStatus = text => {
    hud.status.textContent = text
    clearTimeout(statusTimer)
    statusTimer = setTimeout(() => { hud.status.textContent = '\u00a0' }, 1800)
  }

  // a successful catch banks the air score:
  // score = (score + bonus) ^ (1 + airTime * 0.1)
  const catchItem = st => {
    const t = (performance.now() - st.t0) / 1000
    st.flying = false
    if (t < MIN_AIR) return
    const bonus = t * AIR_RATE
    score = (score + bonus) ** (1 + t * 0.1)
    setStatus(score === Infinity ? 'INFINITY!' : 'Caught! +' + fmt(bonus))
  }

  // came down without a catch: stop its timer
  let frozenAir = 0
  let frozenUntil = 0
  const land = st => {
    if (!st.flying) return
    const t = (performance.now() - st.t0) / 1000
    st.flying = false
    if (t >= MIN_AIR) {
      frozenAir = t
      frozenUntil = performance.now() + 1500
      setStatus('Missed! Bonus lost')
    }
  }

  // ANY collision (another item, a wall or the floor) stops a flying item's timer
  const stOf = new Map(items.map(i => [i.body, i.st]))
  const onTouch = ev => ev.pairs.forEach(({ bodyA, bodyB }) => {
    const a = stOf.get(bodyA)
    const b = stOf.get(bodyB)
    if (a) land(a)
    if (b) land(b)
  })
  Events.on(engine, 'collisionStart', onTouch)
  Events.on(engine, 'collisionActive', onTouch)

  // ---------- dragging (mouse, touch, multi-finger) ----------
  const active = new Map()     // pointerId -> { c, x, y, moved, st }
  let zTop = 1000
  let blockClick = false

  items.forEach(({ el, body, st }) => {
    listen(el, 'dragstart', e => e.preventDefault())
    listen(el, 'pointerdown', e => {
      if (active.has(e.pointerId)) return
      el.setPointerCapture(e.pointerId)
      el.style.zIndex = ++zTop
      hideMsg()

      st.grabs++
      if (st.flying) catchItem(st)            // grabbed in the air = a catch

      // grab point, in the body's own rotated coordinates
      const dx = e.pageX - body.position.x
      const dy = e.pageY - body.position.y
      const cos = Math.cos(body.angle)
      const sin = Math.sin(body.angle)
      const c = Constraint.create({
        pointA: { x: e.pageX, y: e.pageY },
        bodyB: body,
        pointB: { x: dx * cos + dy * sin, y: -dx * sin + dy * cos },
        stiffness: 0.2,
        damping: 0.1,
        length: 0,
      })
      Composite.add(engine.world, c)
      active.set(e.pointerId, { c, x: e.pageX, y: e.pageY, moved: false, st })
    })
  })

  listen(window, 'pointermove', e => {
    const a = active.get(e.pointerId)
    if (!a) return
    a.c.pointA.x = e.pageX
    a.c.pointA.y = e.pageY
    if (Math.hypot(e.pageX - a.x, e.pageY - a.y) > 6) a.moved = true
  })

  const release = e => {
    const a = active.get(e.pointerId)
    if (!a) return
    Composite.remove(engine.world, a.c)
    active.delete(e.pointerId)
    if (a.moved) {
      blockClick = true
      setTimeout(() => { blockClick = false }, 50)
    }

    // once nothing holds the item, its time in the air starts
    const st = a.st
    st.grabs = Math.max(0, st.grabs - 1)
    if (st.grabs === 0) {
      st.flying = true
      st.t0 = performance.now()
      st.still = 0
    }
  }
  listen(window, 'pointerup', release)
  listen(window, 'pointercancel', release)

  // dragging shouldn't also open a link; a plain tap still does
  listen(document, 'click', e => {
    if (blockClick) {
      e.preventDefault()
      e.stopPropagation()
    }
  }, true)

  // ---------- physics loop ----------
  let raf = 0
  const tick = () => {
    Engine.update(engine, 1000 / 60)
    const now = performance.now()
    let bestAir = 0

    items.forEach(({ el, body, x0, y0, st }) => {
      el.style.transform =
        `translate(${body.position.x - x0}px, ${body.position.y - y0}px) rotate(${body.angle}rad)`

      if (st.flying) {
        const speed = Math.hypot(body.velocity.x, body.velocity.y)
        st.still = speed < 0.5 ? st.still + 1 : 0
        if (body.bounds.max.y >= bottom - 2 || st.still > STILL_FRAMES) {
          land(st)
        } else {
          bestAir = Math.max(bestAir, (now - st.t0) / 1000)
        }
      }
    })

    const shown = bestAir > 0 ? bestAir : (now < frozenUntil ? frozenAir : 0)
    hud.airTime.textContent = shown.toFixed(2) + ' s'
    hud.airScore.textContent = fmt(bestAir * AIR_RATE)
    hud.score.textContent = fmt(score)
    raf = requestAnimationFrame(tick)
  }
  raf = requestAnimationFrame(tick)

  // stop: cancel the loop, clear physics and undo every change
  return () => {
    cancelAnimationFrame(raf)
    Engine.clear(engine)
    cleanups.forEach(fn => fn())
  }
}

export default function Games() {
  const pageRef = useRef(null)
  const airTimeRef = useRef(null)
  const airScoreRef = useRef(null)
  const statusRef = useRef(null)
  const scoreRef = useRef(null)
  const messageRef = useRef(null)
  const [started, setStarted] = useState(false)

useEffect(() => {
  if (!started) return
  const stop = runGame({
    pageEl: pageRef.current,
    hud: {
      airTime: airTimeRef.current,
      airScore: airScoreRef.current,
      status: statusRef.current,
      score: scoreRef.current,
      message: messageRef.current,
    },
  })
  return () => stop()
}, [started])

  return (
    <>
      <section ref={pageRef} className="container pt-3 vh-100 mb-5">
        <h3>Games</h3>
      </section>

      <div
        className="position-fixed start-0 end-0 d-flex justify-content-between align-items-start px-3"
        style={{ top: '4.5rem', zIndex: 2147483000, pointerEvents: 'none' }}
      >
        <button
          type="button"
          className="btn btn-outline-primary"
          style={{ pointerEvents: 'auto' }}
          onClick={() => (started ? window.location.reload() : setStarted(true))}
        >
          {started ? 'Reset' : 'Start'}
        </button>

        {started && (
          <>
            <div
              className="bg-body-tertiary border rounded px-3 py-2 shadow-sm text-center"
              style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}
            >
              <div className="small text-body-secondary">Air time</div>
              <div className="fs-4 fw-bold" ref={airTimeRef}>0.00 s</div>
              <div className="small">Catch bonus: <span ref={airScoreRef}>0</span></div>
              <div className="small fw-bold" ref={statusRef}>&nbsp;</div>
            </div>

            <div className="bg-body-tertiary border rounded px-3 py-2 shadow-sm text-center">
              <div className="small text-body-secondary">Score</div>
              <div className="fs-4 fw-bold" ref={scoreRef}>0</div>
            </div>
          </>
        )}
      </div>

      {started && (
        <div
          ref={messageRef}
          className="alert alert-info shadow"
          role="status"
          style={{
            position: 'fixed',
            top: '35%',
            left: '50%',
            transform: 'translateX(-50%)',
            maxWidth: '90vw',
            textAlign: 'center',
            pointerEvents: 'none',
            zIndex: 2147483000,
            transition: 'opacity .5s',
          }}
        >
          Throw the elements in the air and catch them to gain a score! Reach infinity which is an actual number in website code.
        </div>
      )}
    </>
  )
}