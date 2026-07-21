import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';
import loho1 from '../Assets/loho1.png';
import rockImg from '../Assets/rock.jpg';
import hiImg from '../Assets/hi.jpg';
import ba1Img from '../Assets/ba1.jpg';

// Custom hook for Intersection Observer reveal animations
function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    const els = document.querySelectorAll('.reveal, .stagger-children');
    els.forEach((el) => observer.observe(el));
    return () => els.forEach((el) => observer.unobserve(el));
  }, []);
}

const Home = () => {
  useReveal();

  return (
    <>
      <main>
        {/* Hero Section */}
        <section className="hero" id="hero">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="dot"></span> Now Enrolling for 2026
            </div>
            <h1>
              Every Step Creates<br />
              a <span className="highlight">Memory</span>
            </h1>
            <p className="hero-subtitle">
              Welcome to Danzi Dance Club — where every beat tells a story. Build confidence,
              creativity, and excellence through the art of dance.
            </p>
            <div className="hero-actions">
              <Link to="/admission" className="btn btn-primary btn-large">Start Dancing →</Link>
              <Link to="/about" className="btn btn-outline btn-large">Learn More</Link>
            </div>
            <div className="hero-image">
              <img
                src={loho1}
                alt="Danzi Dance Club Logo"
              />
            </div>
          </div>
        </section>

        {/* Dance Styles Section */}
        <section className="section" id="styles">
          <div className="section-header reveal">
            <span className="section-tag">✦ Our Programs</span>
            <h2 className="section-title">Dance Styles We Offer</h2>
            <p className="section-desc">
              From high-energy western routines to the timeless grace of classical forms — find your rhythm.
            </p>
          </div>
          <div className="cards-grid stagger-children">
            <div className="style-card">
              <div className="style-image">
                <img src={rockImg} alt="Western Dance" />
              </div>
              <h3>Western Dance</h3>
            </div>
            <div className="style-card">
              <div className="style-image">
                <img src={hiImg} alt="Classical Dance" />
              </div>
              <h3>Classical Dance</h3>
            </div>
            <div className="style-card">
              <div className="style-image">
                <img src={ba1Img} alt="Bharatanatyam" />
              </div>
              <h3>Bharatanatyam</h3>
            </div>
          </div>
        </section>

        {/* About Teaser */}
        <section className="section reveal" id="about-teaser">
          <div className="section-header">
            <span className="section-tag">✦ Who We Are</span>
            <h2 className="section-title">About Danzi</h2>
            <p className="section-desc">
              At Danzi Dance Club, we believe dance is more than movement — it's a powerful form of
              expression. We provide professional training through experienced instructors, modern
              facilities, and a supportive learning environment.
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link to="/about" className="btn btn-outline btn-large">Discover Our Story →</Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Home;