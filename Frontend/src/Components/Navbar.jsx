import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
      <Link to="/" className="nav-brand">DANZI</Link>

      <div className={`nav-links${menuOpen ? ' open' : ''}`} id="navLinks">
        <Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link>
        <Link to="/about" className={isActive('/about') ? 'active' : ''}>About</Link>
        <Link to="/events" className={isActive('/events') ? 'active' : ''}>Events</Link>
        <Link to="/admission" className={isActive('/admission') ? 'active' : ''}>Admission</Link>
        <Link to="/contact" className={isActive('/contact') ? 'active' : ''}>Contact</Link>
      </div>

      <div className="nav-cta">
        {localStorage.getItem('token') ? (
          <>
            <Link to="/students" className="btn btn-ghost">Dashboard</Link>
            <button
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/login';
              }}
              className="btn btn-primary"
              style={{ fontFamily: 'inherit', border: 'none', cursor: 'pointer' }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-ghost">Login</Link>
            <Link to="/signup" className="btn btn-primary">Sign Up</Link>
          </>
        )}
      </div>

      <div
        className={`nav-toggle${menuOpen ? ' open' : ''}`}
        id="navToggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle mobile menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;