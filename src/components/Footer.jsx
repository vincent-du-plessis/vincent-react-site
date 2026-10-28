import { Link, NavLink } from 'react-router-dom'

// NavLink adds the "active" class (and aria-current="page") to the link for the current page
function FooterLink({ to, end, children }) {
  return (
    <li className="mb-1">
      <NavLink
        className="link-body-emphasis text-decoration-none"
        to={to}
        end={end}
      >
        {children}
      </NavLink>
    </li>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer bg-body border-top mt-5 py-5">
      <div className="container">
        <div className="row gy-4">

          {/* Brand + icons */}
          <div className="col-12 col-md-4">
            <h2 className="h6 fw-bold mb-2">Vincent du Plessis</h2>
            <p className="small mb-3">
              Thanks for visiting. Get in touch any time.
            </p>

            <div className="footer-icons d-flex gap-3">
              <a
                href="https://wa.me/27845506227"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                title="WhatsApp"
              >
                <img src="/icons/whatsapp.svg" alt="" width="24" height="24" />
              </a>

              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=vinduples@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email"
                title="Email"
              >
                <img src="/icons/envelope-at-fill.svg" alt="" width="24" height="24" />
              </a>

              <a
                href="https://github.com/vincent-du-plessis"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                title="GitHub"
              >
                <img src="/icons/github.svg" alt="" width="24" height="24" />
              </a>

              <a
                href="https://www.linkedin.com/in/vincent-du-plessis"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <img src="/icons/linkedin.svg" alt="" width="24" height="24" />
              </a>
            </div>
          </div>

          {/* Pages */}
          <div className="col-6 col-md-4">
            <h2 className="h6 fw-bold mb-2">Pages</h2>
            <ul className="list-unstyled small mb-0">
              {/* "end" stops Welcome counting as active on every page */}
              <FooterLink to="/" end>Welcome</FooterLink>
              <FooterLink to="/blog">Blog</FooterLink>
              <FooterLink to="/about">About</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
              <FooterLink to="/games">Games</FooterLink>
              <FooterLink to="/curriculum-vitae">Curriculum Vitae</FooterLink>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-6 col-md-4">
            <h2 className="h6 fw-bold mb-2">Legal</h2>
            <ul className="list-unstyled small mb-0">
              <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
              <FooterLink to="/cookie-notice">Cookie Notice</FooterLink>
              <FooterLink to="/terms-of-use">Terms of Use</FooterLink>
              <FooterLink to="/accessibility">Accessibility</FooterLink>
              <FooterLink to="/credits">Credits</FooterLink>
            </ul>
          </div>

        </div>

        <hr className="my-4" />

        <div className="d-flex flex-column flex-sm-row justify-content-between small text-muted">
          <span className="text-body-emphasis">
            &copy; {year} Vincent du Plessis. All rights reserved.
          </span>

          <Link
            className="link-body-emphasis text-decoration-none"
            to="/"
            aria-label="Back to start"
          >
            Back to start
          </Link>
        </div>
      </div>
    </footer>
  )
}