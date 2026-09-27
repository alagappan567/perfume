import { useState } from 'react'
import './Navbar.css'

const NAV_ITEMS = ['Home', 'About', 'Shop', 'Benefits', 'Contact']

const Navbar = () => {
  const [active, setActive] = useState('Home')
  const [open, setOpen] = useState(false)

  return (
    <nav className="navbar">
      <a href="#home" className="navbar-logo">
        Fruitivo
        <span className="navbar-logo-dot">.</span>
        <svg className="navbar-logo-leaf" width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 20c0-8 6-14 14-14 0 8-6 14-14 14Z"
            fill="#4CAF50"
          />
        </svg>
      </a>

      <button
        className="navbar-burger"
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      <ul className={`navbar-links ${open ? 'is-open' : ''}`}>
        {NAV_ITEMS.map((item) => (
          <li key={item}>
            <button
              className={`navbar-link ${active === item ? 'is-active' : ''}`}
              onClick={() => {
                setActive(item)
                setOpen(false)
              }}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>

      <div className="navbar-icons">
        <button className="navbar-icon-btn" aria-label="Cart">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 4h2l2.4 12.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 8H6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="10" cy="21" r="1.4" fill="currentColor" />
            <circle cx="17" cy="21" r="1.4" fill="currentColor" />
          </svg>
        </button>
        <button className="navbar-icon-btn" aria-label="Account">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="12" cy="9.5" r="3.2" stroke="currentColor" strokeWidth="1.6" />
            <path
              d="M5.5 19c1.3-2.8 3.8-4.3 6.5-4.3s5.2 1.5 6.5 4.3"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
