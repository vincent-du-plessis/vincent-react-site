import { useLocation, useNavigate } from 'react-router-dom'

const pages = [
  { path: '/', name: 'Welcome' },
  { path: '/blog', name: 'Blog' },
  { path: '/about', name: 'About' },
  { path: '/contact', name: 'Contact' },
  { path: '/games', name: 'Games' },
  { path: '/curriculum-vitae', name: 'Curriculum Vitae' },
]

// Legal pages: shown in the navigation, but both arrows go back to Welcome
const legalPages = [
  { path: '/privacy-policy', name: 'Privacy Policy' },
  { path: '/cookie-notice', name: 'Cookie Notice' },
  { path: '/terms-of-use', name: 'Terms of Use' },
  { path: '/accessibility', name: 'Accessibility Statement' },
  { path: '/credits', name: 'Credits' },
]

export default function PageNavigation() {
  const location = useLocation()
  const navigate = useNavigate()

  const currentIndex = pages.findIndex(
    page => page.path === location.pathname
  )
  const legalPage = legalPages.find(
    page => page.path === location.pathname
  )

  // Hide navigation on pages not in either list
  if (currentIndex === -1 && !legalPage) return null

  let currentPage, previousPage, nextPage

  if (legalPage) {
    // Legal pages: both arrows lead to Welcome
    currentPage = legalPage
    previousPage = pages[0]
    nextPage = pages[0]
  } else {
    currentPage = pages[currentIndex]
    // Cycle backwards: Welcome -> Curriculum Vitae
    previousPage = pages[(currentIndex - 1 + pages.length) % pages.length]
    // Cycle forwards: Curriculum Vitae -> Welcome
    nextPage = pages[(currentIndex + 1) % pages.length]
  }

  return (
    <div className="d-flex justify-content-center align-items-center my-2">
      {/* Previous page button */}
      <button
        className="btn btn-outline-danger border-0 px-2"
        type="button"
        aria-label={`Previous page: ${previousPage.name}`}
        onClick={() => navigate(previousPage.path)}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 16 16"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
          />
        </svg>
      </button>

      {/* Current page name */}
      <span className="small mx-2" id="pageName">
        {currentPage.name}
      </span>

      {/* Next page button */}
      <button
        className="btn btn-outline-danger border-0 px-2"
        type="button"
        aria-label={`Next page: ${nextPage.name}`}
        onClick={() => navigate(nextPage.path)}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 16 16"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
          />
        </svg>
      </button>
    </div>
  )
}