import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    const els = document.querySelectorAll('.reveal, .stagger-children');
    els.forEach((el) => observer.observe(el));
    return () => els.forEach((el) => observer.unobserve(el));
  }, []);
}

const About = () => {
  useReveal();

  return (
    <>
      <main>
        {/* About Hero */}
        <section className="section about-hero">
          <div className="hero-badge">
            <span className="dot"></span> Est. 2026
          </div>
          <h1
            className="section-title"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '0.5rem' }}
          >
            About <span className="highlight">Danzi</span>
          </h1>
          <p className="tagline">DANCE BEYOND LIMITS</p>
          <p className="sub-tagline">Where Passion Meets Performance</p>
          <p className="section-desc" style={{ marginBottom: 0 }}>
            At Danzi Dance Club, we believe dance is more than movement — it's a powerful form of
            expression. We provide professional training in a variety of dance styles through experienced
            instructors, modern facilities, and a supportive learning environment. Our mission is to
            inspire every student to build confidence, discipline, and creativity while enjoying the art
            of dance.
          </p>
        </section>

        {/* Dance Styles */}
        <section className="section" id="styles">
          <div className="section-header reveal">
            <span className="section-tag">✦ What We Teach</span>
            <h2 className="section-title">Our Dance Styles</h2>
          </div>
          <div className="cards-grid stagger-children">
            <div className="card">
              <div className="card-icon">💃</div>
              <h3>Western Dance</h3>
              <p>High-energy routines that combine creativity, rhythm, and modern techniques to build confidence and stage presence.</p>
            </div>
            <div className="card">
              <div className="card-icon">🎭</div>
              <h3>Classical Dance</h3>
              <p>Experience the elegance of traditional dance forms that preserve culture while enhancing grace, discipline, and expression.</p>
            </div>
            <div className="card">
              <div className="card-icon">🪷</div>
              <h3>Bharatanatyam</h3>
              <p>Explore one of India's oldest classical dance forms, blending storytelling, rhythm, and graceful movements.</p>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="section reveal">
          <div className="section-header">
            <span className="section-tag">✦ Why Danzi</span>
            <h2 className="section-title">Why Choose Us</h2>
          </div>
          <div className="cards-grid stagger-children">
            <div className="card">
              <div className="card-icon">🎯</div>
              <h3>Expert Instructors</h3>
              <p>Learn from highly experienced dancers and choreographers who bring the best out of every student.</p>
            </div>
            <div className="card">
              <div className="card-icon">🏟️</div>
              <h3>Modern Facilities</h3>
              <p>Spacious studios equipped with mirrors, sound systems, and everything you need for the perfect practice.</p>
            </div>
            <div className="card">
              <div className="card-icon">🌟</div>
              <h3>Supportive Community</h3>
              <p>Join a vibrant community of dancers who inspire, motivate, and celebrate each other's journey.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section reveal" style={{ textAlign: 'center' }}>
          <h2 className="section-title">Ready to Start Dancing?</h2>
          <p className="section-desc" style={{ marginBottom: '2rem' }}>
            Join Danzi today and discover the dancer within you.
          </p>
          <Link to="/admission" className="btn btn-primary btn-large">Apply for Admission →</Link>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default About;