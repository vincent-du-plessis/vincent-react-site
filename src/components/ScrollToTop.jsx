import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  // location.key changes on every navigation, so clicking a link to the page
  // you're already on (e.g. footer "Blog" while on Blog) scrolls up too
  const { key } = useLocation()

  useEffect(() => {
    // 'instant' ignores any `scroll-behavior: smooth` in your CSS
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [key])

  return null
}