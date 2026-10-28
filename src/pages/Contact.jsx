import { useState } from 'react'

// files in public/ are served from the site root, so there is no "public/" in the URL
const ICONS = import.meta.env.BASE_URL + 'icons/'

export default function Contact() {
  const [wasValidated, setWasValidated] = useState(false)
  const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'success' | 'error'

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    setWasValidated(true)
    if (!form.checkValidity()) return

    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        form.reset()
        setWasValidated(false)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="container pt-3 mt-3 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h3 className="text-center">Contact me</h3>

              <div className="contact-icons d-flex justify-content-center align-items-center gap-4 m-4">
                {/* WhatsApp: number in international format, digits only */}
                <a href="https://wa.me/27845506227" target="_blank" rel="noopener noreferrer"
                  aria-label="Message me on WhatsApp" title="WhatsApp">
                  <img src={ICONS + 'whatsapp.svg'} alt="" width="40" height="40" />
                </a>

                {/* Gmail: opens a compose window addressed to you */}
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=vinduples@gmail.com"
                  target="_blank" rel="noopener noreferrer"
                  aria-label="Email me on Gmail" title="Email">
                  <img src={ICONS + 'envelope-at-fill.svg'} alt="" width="40" height="40" />
                </a>

                <a href="https://github.com/vincent-du-plessis" target="_blank" rel="noopener noreferrer"
                  aria-label="My GitHub profile" title="GitHub">
                  <img src={ICONS + 'github.svg'} alt="" width="40" height="40" />
                </a>

                <a href="https://www.linkedin.com/in/vincent-du-plessis" target="_blank" rel="noopener noreferrer"
                  aria-label="My LinkedIn profile" title="LinkedIn">
                  <img src={ICONS + 'linkedin.svg'} alt="" width="40" height="40" />
                </a>
              </div>

              <p className="text-muted mb-4">Send me a message and I'll get back to you soon.</p>

              {status === 'success' && (
                <div className="alert alert-success" role="alert">
                  Thanks! Your message has been sent.
                </div>
              )}
              {status === 'error' && (
                <div className="alert alert-danger" role="alert">
                  Something went wrong. Please try again.
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className={`needs-validation ${wasValidated ? 'was-validated' : ''}`}
                noValidate
              >
                <input type="hidden" name="access_key" value="0ef07ffc-63e5-45fe-b758-3e1e2ea8c957" />
                {/* Honeypot spam trap: leave hidden and empty */}
                <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" style={{ display: 'none' }} />

                <div className="row mb-3">
                  <label htmlFor="name" className="col-sm-3 col-form-label">Name</label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" id="name" name="name" />
                  </div>
                </div>

                <div className="row mb-3">
                  <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
                  <div className="col-sm-9">
                    <input type="email" className="form-control" id="email" name="email" required />
                    <div className="invalid-feedback">Please enter a valid email address.</div>
                  </div>
                </div>

                <div className="row mb-3">
                  <label htmlFor="subject" className="col-sm-3 col-form-label">Subject</label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" id="subject" name="subject" />
                  </div>
                </div>

                <div className="row mb-3">
                  <label htmlFor="message" className="col-sm-3 col-form-label">Message</label>
                  <div className="col-sm-9">
                    <textarea className="form-control" id="message" name="message" rows="3"></textarea>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-9 offset-sm-3">
                    <button type="submit" className="btn btn-primary w-100" disabled={status === 'sending'}>
                      {status === 'sending' ? 'Sending…' : 'Send Message'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}