import React, { useState } from 'react';
import Footer from '../Components/Footer';

const faqs = [
  {
    q: 'What types of dance classes do you offer?',
    a: 'We offer a wide variety of classes including Western, Classical, Bharatanatyam, Hip-Hop, and Contemporary for all ages and skill levels.'
  },
  {
    q: 'How do I enroll my child?',
    a: 'You can easily enroll by visiting the Admission page, filling out the required details, and submitting the application form.'
  },
  {
    q: 'Can I view my session schedule online?',
    a: 'Yes! Students can log in to the student portal to view their schedule, instructors, and class progress.'
  },
  {
    q: 'What is your cancellation policy?',
    a: 'Please refer to our Terms & Conditions. Generally, classes must be canceled 24 hours in advance to avoid a fee.'
  }
];

const FAQ = () => {
  const [open, setOpen] = useState(null);

  return (
    <>
      <main>
        <section className="section">
          <div className="section-header">
            <span className="section-tag">✦ Help Center</span>
            <h1 className="section-title">Frequently Asked <span className="highlight">Questions</span></h1>
          </div>

          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="card"
                style={{ marginBottom: '1rem', cursor: 'pointer' }}
                onClick={() => setOpen(open === i ? null : i)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '1rem', marginBottom: 0 }}>{faq.q}</h3>
                  <span style={{ color: 'var(--accent)', fontSize: '1.25rem', flexShrink: 0 }}>
                    {open === i ? '−' : '+'}
                  </span>
                </div>
                {open === i && (
                  <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', marginBottom: 0 }}>
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default FAQ;
