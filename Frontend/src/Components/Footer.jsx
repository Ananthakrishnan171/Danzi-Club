import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="site-footer">
    <div className="footer-content">
      <div>
        <div className="footer-brand">DANZI</div>
        <p className="footer-tagline">Every Beat Tells a Story. Every Step Creates a Memory.</p>
      </div>
      <div className="footer-links">
        <div className="footer-links-col">
          <h4>Navigate</h4>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/events">Events</Link>
          <Link to="/admission">Admission</Link>
        </div>
        <div className="footer-links-col">
          <h4>Connect</h4>
          <Link to="/contact">Contact Us</Link>
          <a href="mailto:danzistars@gmail.com">Email</a>
          <a href="tel:+918778131152">Call Us</a>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <span>&copy; 2026 Danzi Dance Club. All Rights Reserved.</span>
      <span className="tagline-quote">"Dance with Danzi" 💃</span>
    </div>
  </footer>
);

export default Footer;
