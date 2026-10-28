import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import WelcomeScrollW from '../components/WelcomeScrollW.jsx'

const BASE = import.meta.env.BASE_URL // '/' locally and on your custom domain

let scriptsPromise = null

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = src
    s.onload = () => resolve()
    s.onerror = () => {
      s.remove() // remove the broken tag so a retry can add a fresh one
      reject(new Error(`Could not load ${src}. Is the file in public/vendor/ with this exact name?`))
    }
    document.head.appendChild(s)
  })
}

function loadVantaScripts() {
  if (window.VANTA?.BIRDS) return Promise.resolve()

  if (!scriptsPromise) {
    scriptsPromise = (async () => {
      await loadScript(BASE + 'vendor/three.js')
      if (!window.THREE) {
        throw new Error('three.js loaded, but window.THREE is missing. Is it the right file?')
      }

      await loadScript(BASE + 'vendor/vantaBirds.js')
      if (!window.VANTA?.BIRDS) {
        throw new Error('vantaBirds.js loaded, but window.VANTA.BIRDS is missing. Is it the right file?')
      }
    })().catch(err => {
      scriptsPromise = null // allow a retry on the next visit
      throw err
    })
  }
  return scriptsPromise
}

export default function Welcome({ theme = 'dark' }) {
  const heroRef = useRef(null)
  const [status, setStatus] = useState('loading') // 'loading' | 'ready' | 'error'
  const [errorText, setErrorText] = useState('')

  useEffect(() => {
    let effect = null
    let cancelled = false
    const isLight = theme === 'light'

    setStatus('loading')

    loadVantaScripts()
      .then(() => {
        if (cancelled) return // the visitor left Welcome while the scripts loaded
        effect = window.VANTA.BIRDS({
          el: heroRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          backgroundColor: isLight ? 0xffffff : 0x000000,
          color1: isLight ? 0xd6006e : 0x0f00ff,
          color2: isLight ? 0x0057d8 : 0x00b2ff,
          birdSize: 0.5,
          wingSpan: 13.0,
          speedLimit: 1.0,
          separation: 50.0,
        })
        setStatus('ready')
      })
      .catch(err => {
        if (cancelled) return
        console.error('[Vanta]', err)
        setErrorText(err.message)
        setStatus('error')
      })

    return () => {
      cancelled = true
      if (effect) effect.destroy()
    }
  }, [theme])

  return (
    <section id="Welcome" className="mb-5">
      <WelcomeScrollW />

      <header ref={heroRef} className="position-relative overflow-hidden">
        <div className="hero-bg" aria-hidden="true"></div>

        {import.meta.env.DEV && status === 'error' && (
          <div className="alert alert-danger position-absolute top-0 start-50 translate-middle-x m-3 z-3">
            Birds not loaded: {errorText}
          </div>
        )}

        <div className="hero-content hero-content-bg text-white container d-flex flex-column align-items-center justify-content-center text-center">
          <h1 className="h6">
            I'm Vincent du Plessis, a <span className="capital-red">W</span>eb Developer from South Africa
          </h1>
          <h2 className="display-4 fw-bold my-4">
            <span className="capital-red">W</span>elcome to my Site!
          </h2>
          <p className="lead mb-4 fw-bold">
            Explore my <span className="capital-red">w</span>ork or play a Game.
          </p>
          <div className="d-flex justify-content-center gap-2">
            <Link to="/about" className="btn btn-outline-danger btn-lg">About</Link>
            <Link to="/games" className="btn btn-light btn-lg">Game</Link>
          </div>
        </div>
      </header>
    </section>
  )
}