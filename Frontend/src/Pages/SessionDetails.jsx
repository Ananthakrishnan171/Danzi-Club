import React from 'react';
import Footer from '../Components/Footer';

const SessionDetails = () => (
  <>
    <main>
      <section className="section">
        <div className="section-header">
          <span className="section-tag">✦ Session Info</span>
          <h1 className="section-title">Session <span className="highlight">Details</span></h1>
        </div>

        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div className="card">
            <h3>Bharatanatyam Fundamentals – Group A</h3>
            <hr style={{ display: 'block', border: 'none', borderTop: '1px solid var(--border-glass)', margin: '1rem 0' }} />
            <ul className="hours-list">
              <li>
                <span className="day-name">Instructor</span>
                <span>Anand Kumar</span>
              </li>
              <li>
                <span className="day-name">Schedule</span>
                <span>Mon & Wed, 4:00 PM – 5:30 PM</span>
              </li>
              <li>
                <span className="day-name">Location</span>
                <span>Studio 1, Danzi Dance Club</span>
              </li>
              <li>
                <span className="day-name">Prerequisites</span>
                <span>None. Suitable for beginners.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default SessionDetails;
