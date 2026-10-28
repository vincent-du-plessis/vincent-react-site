import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import PageNavigation from './components/PageNavigation.jsx'
import Tooltips from './components/Tooltips.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import Footer from './components/Footer.jsx'

import Welcome from './pages/Welcome.jsx'
import Blog from './pages/Blog.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Games from './pages/Games.jsx'
import CurriculumVitae from './pages/CurriculumVitae.jsx'
import Privacy from './pages/Privacy.jsx'
import Cookies from './pages/Cookies.jsx'
import Terms from './pages/Terms.jsx'
import Accessibility from './pages/Accessibility.jsx'
import Credits from './pages/Credits.jsx'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <Tooltips />
      <Navbar />
      <PageNavigation />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/games" element={<Games />} />
        <Route path="/curriculum-vitae" element={<CurriculumVitae />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/cookie-notice" element={<Cookies />} />
        <Route path="/terms-of-use" element={<Terms />} />
        <Route path="/accessibility" element={<Accessibility />} />
        <Route path="/credits" element={<Credits />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}