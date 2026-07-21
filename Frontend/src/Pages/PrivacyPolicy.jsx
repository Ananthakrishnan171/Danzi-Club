import React from 'react';
import Footer from '../Components/Footer';

const PrivacyPolicy = () => (
  <>
    <main>
      <section className="section">
        <div className="section-header">
          <span className="section-tag">✦ Legal</span>
          <h1 className="section-title">Privacy <span className="highlight">Policy</span></h1>
        </div>

        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <h3>1. Data Collection</h3>
            <p>
              At Danzi, we collect personal information such as names, email addresses, and phone numbers
              exclusively for managing your dance classes and studio enrollment.
            </p>
          </div>
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <h3>2. Data Usage</h3>
            <p>
              Your information is used to schedule classes, notify you of upcoming recitals, and track
              student progress. We do not sell your personal data to third parties.
            </p>
          </div>
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <h3>3. Security</h3>
            <p>
              We implement standard security measures to protect your data. All transactions and personal
              information are securely encrypted.
            </p>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default PrivacyPolicy;
