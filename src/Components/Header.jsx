import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const isAboutPage = location.pathname.startsWith('/about')

  function closeMenu() {
    setIsMenuOpen(false)
  }

  return (
    <header>
      <div className="wrap nav">
        <div className="logo">DaanPay</div>
        <nav className="nav-links">
          <Link className={!isAboutPage ? 'is-current' : ''} to="/">Home</Link>
          <Link to="/">Temples</Link>
          <Link className={isAboutPage ? 'is-current' : ''} to="/about">About</Link>
          <a href="mailto:support@daanpay.in">Support</a>
          <a className="btn btn-outline" href="">Log in</a>
        </nav>
        <button
          type="button"
          className="mobile-toggle"
          aria-label="Open menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>
      <nav className={`mobile-nav${isMenuOpen ? ' open' : ''}`}>
        <Link className={!isAboutPage ? 'is-current' : ''} to="/" onClick={closeMenu}>Home</Link>
        <Link to="/" onClick={closeMenu}>Temples</Link>
        <Link className={isAboutPage ? 'is-current' : ''} to="/about" onClick={closeMenu}>About</Link>
        <a href="mailto:support@daanpay.in" onClick={closeMenu}>Support</a>
        <a href="mailto:support@daanpay.in?subject=Login%20support" onClick={closeMenu}>Log in</a>
      </nav>
    </header>
  )
}

export default Header
