import React from 'react';
import Footer from '../Components/Footer';

const Terms = () => (
  <>
    <main>
      <section className="section">
        <div className="section-header">
          <span className="section-tag">✦ Legal</span>
          <h1 className="section-title">Terms & <span className="highlight">Conditions</span></h1>
        </div>

        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <h3>1. Acceptance of Terms</h3>
            <p>
              By accessing and using the Danzi Dance Club platform, you agree to comply with and be bound
              by these terms and conditions.
            </p>
          </div>
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <h3>2. Use of the Platform</h3>
            <p>
              Danzi provides tools for scheduling, student management, and enrollment. Users must not
              misuse the platform for any illegal activities or unauthorized data extraction.
            </p>
          </div>
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <h3>3. Fees and Payments</h3>
            <p>
              Any fees related to classes must be paid promptly. The studio reserves the right to suspend
              access for accounts with outstanding balances.
            </p>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default Terms;
