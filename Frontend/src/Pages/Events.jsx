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

const events = [
  { day: '15', month: 'AUG', title: 'Western Dance Competition', time: '5:00 PM', venue: 'Danzi Auditorium' },
  { day: '22', month: 'AUG', title: 'Bharatanatyam Festival', time: '10:00 AM', venue: 'Cultural Hall' },
  { day: '30', month: 'AUG', title: 'Hip Hop Dance Battle', time: '4:00 PM', venue: 'Dance Arena' },
  { day: '05', month: 'SEP', title: 'Classical Dance Competition', time: '11:00 AM', venue: 'Danzi Hall' },
  { day: '20', month: 'SEP', title: 'Annual Dance Fest 2026', time: '6:00 PM', venue: 'Grand Auditorium' },
];

const workshops = [
  '💃 Western Dance Workshop',
  '🪷 Bharatanatyam Workshop',
  '🔥 Hip Hop Workshop',
  '🌊 Contemporary Dance Workshop',
  '🎬 Bollywood Dance Workshop',
];

const Events = () => {
  useReveal();

  return (
    <>
      <main>
        <section className="section">
          <div className="section-header reveal">
            <span className="section-tag">✦ What's Happening</span>
            <h1 className="section-title">
              Upcoming <span className="highlight">Events</span>
            </h1>
            <p className="section-desc">
              Competitions, festivals, and battles — mark your calendar and join the movement.
            </p>
          </div>

          <div className="stagger-children">
            {events.map((event, idx) => (
              <div className="event-card" key={idx}>
                <div className="event-date">
                  <span className="day">{event.day}</span>
                  <span className="month">{event.month}</span>
                </div>
                <div className="event-info">
                  <h3>{event.title}</h3>
                  <div className="event-meta">
                    <span>🕐 {event.time}</span>
                    <span>📍 {event.venue}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Workshops */}
        <section className="section reveal">
          <div className="section-header">
            <span className="section-tag">✦ Learn & Grow</span>
            <h2 className="section-title">Upcoming Workshops</h2>
            <p className="section-desc">Expand your skills with our specially curated dance workshops.</p>
          </div>

          <div className="workshop-tags" style={{ justifyContent: 'center' }}>
            {workshops.map((w, idx) => (
              <span className="workshop-tag" key={idx}>{w}</span>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/admission" className="btn btn-primary btn-large">Register for Events →</Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Events;
