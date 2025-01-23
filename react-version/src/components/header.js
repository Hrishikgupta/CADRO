import { Link } from "gatsby"
import React from "react"

const Header = ({ siteTitle }) => (
  <header>
    <nav className="navbar">
      <a className="navbar-brand" href="./">
          <img src="assets\icons\nature.png" width="30" height="30" className="d-inline-block align-top" alt="" loading="lazy" />
          <b>EcoRoute</b>
      </a>
      <div className="nav-item">
          <a className="nav-link" href="#about">About</a>
      </div>
    </nav>
  </header>
)

export default Header
