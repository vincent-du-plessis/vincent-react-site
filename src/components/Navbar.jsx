import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

// close the mobile menu after picking a page (uses the Bootstrap script from index.html)
function closeMenu() {
  const menu = document.getElementById('navbarSupportedContent')
  if (menu && menu.classList.contains('show') && window.bootstrap?.Collapse) {
    window.bootstrap.Collapse.getOrCreateInstance(menu).hide()
  }
}

function MenuLink({ to, end, children }) {
  return (
    <li className="nav-item">
      <NavLink
        className="nav-link text-end mx-3 link-body-emphasis"
        to={to}
        end={end}
        onClick={closeMenu}
      >
        {children}
      </NavLink>
    </li>
  )
}

export default function Navbar() {
  const [theme, setTheme] = useState(() => {
    try {
      return (
        localStorage.getItem('theme') ||
        document.documentElement.getAttribute('data-bs-theme') ||
        'dark'
      )
    } catch {
      return 'dark'
    }
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme)

    try {
      localStorage.setItem('theme', theme)
    } catch {
      // Storage may be unavailable
    }
  }, [theme])

  const isDark = theme === 'dark'

  function toggleTheme() {
    setTheme(currentTheme =>
      currentTheme === 'dark' ? 'light' : 'dark'
    )
  }

  return (
    <nav className="navbar navbar-expand-xl navbar-dark bg-dark">
      <div className="container-fluid spaced-apart">
        <div className="d-flex align-items-center justify-content-center gap-2">
          <NavLink to="/" className="navbar-brand mb-0 h1 fw-bold" aria-label="Home">
            <span className="capital-red">V</span>
            <span className="capital-red">D</span>
          </NavLink>
        </div>

        <div>
          <button
            id="themeToggle"
            className="btn btn-outline-secondary border-0"
            type="button"
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            aria-pressed={isDark}
            onClick={toggleTheme}
          >
            <img
              src="/icons/moon-fill.svg"
              alt=""
              width="20"
              height="20"
              className={isDark ? '' : 'd-none'}
            />

            <img
              src="/icons/brightness-high-fill.svg"
              alt=""
              width="20"
              height="20"
              className={isDark ? 'd-none' : ''}
            />
          </button>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 pt-2">
            {/* "end" stops Welcome counting as active on every page */}
            <MenuLink to="/" end>Welcome</MenuLink>
            <MenuLink to="/blog">Blog</MenuLink>
            <MenuLink to="/about">About</MenuLink>
            <MenuLink to="/contact">Contact</MenuLink>
            <MenuLink to="/games">Games</MenuLink>
            <MenuLink to="/curriculum-vitae">Curriculum Vitae</MenuLink>
          </ul>
        </div>
      </div>
    </nav>
  )
}