import React, { useEffect, useState } from 'react';
import Footer from '../Components/Footer';
import { apiCall } from '../utils/api';

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

const Contact = () => {
  useReveal();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await apiCall('/enquiries/submit', 'POST', {
        name: form.name,
        email: form.email,
        message: form.message,
        subject: 'Website Contact Message'
      });

      if (res.success) {
        setSubmitted(true);
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => {
          setSubmitted(false);
        }, 4000);
      }
    } catch (err) {
      console.error('Failed to save contact enquiry:', err);
      setError(err.message || 'Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main>
        <section className="section">
          <div className="section-header reveal">
            <span className="section-tag">✦ Get In Touch</span>
            <h1 className="section-title">
              Contact <span className="highlight">Us</span>
            </h1>
            <p className="section-desc">
              We'd love to hear from you. Reach out anytime — we're always happy to help.
            </p>
          </div>

          <div className="contact-grid reveal">
            {/* Contact Details */}
            <div className="contact-info-card">
              <h3>📍 Our Details</h3>
              <div className="contact-item">
                <span className="icon">🏢</span>
                <div>
                  <strong>Danzi Dance Club</strong><br />
                  1st Street, M.Thangammal Puram,<br />
                  Thoothukudi, Tamil Nadu – 628005
                </div>
              </div>
              <div className="contact-item">
                <span className="icon">📞</span>
                <div>
                  <strong>Phone</strong><br />
                  <a href="tel:+918778131152" style={{ color: 'var(--accent)' }}>+91 87781 31152</a>
                </div>
              </div>
              <div className="contact-item">
                <span className="icon">✉️</span>
                <div>
                  <strong>Email</strong><br />
                  <a href="mailto:danzistars@gmail.com" style={{ color: 'var(--accent)' }}>
                    danzistars@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="contact-info-card">
              <h3>🕐 Working Hours</h3>
              <ul className="hours-list">
                <li>
                  <span className="day-name">Monday – Friday</span>
                  <span>9:00 AM – 7:00 PM</span>
                </li>
                <li>
                  <span className="day-name">Saturday</span>
                  <span>9:00 AM – 5:00 PM</span>
                </li>
                <li>
                  <span className="day-name">Sunday</span>
                  <span className="closed">Closed</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="section reveal">
          <div className="section-header">
            <span className="section-tag">✦ Send a Message</span>
            <h2 className="section-title">Drop Us a Line</h2>
          </div>

          <div className="form-container">
            <div className="form-card">
              {error && (
                <div style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>
                  {error}
                </div>
              )}
              <form id="contactForm" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="contactName">Your Name</label>
                  <input
                    type="text"
                    id="contactName"
                    name="name"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contactEmail">Your Email</label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contactMessage">Message</label>
                  <textarea
                    id="contactMessage"
                    name="message"
                    rows="5"
                    placeholder="Type your message here..."
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary btn-large"
                  style={{
                    width: '100%',
                    background: submitted ? '#22c55e' : '',
                    color: submitted ? '#fff' : '',
                  }}
                >
                  {submitted ? '✓ Submitted!' : loading ? 'Sending...' : 'Send Message →'}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Contact;
