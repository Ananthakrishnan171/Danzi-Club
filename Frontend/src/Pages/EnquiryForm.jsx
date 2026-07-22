import React, { useState } from 'react';
import Footer from '../Components/Footer';
import { apiCall } from '../utils/api';

const EnquiryForm = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
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
        subject: form.subject,
        message: form.message
      });

      if (res.success) {
        setSubmitted(true);
        setForm({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => {
          setSubmitted(false);
        }, 4000);
      }
    } catch (err) {
      console.error('Failed to submit enquiry:', err);
      setError(err.message || 'Failed to submit enquiry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main>
        <section className="section">
          <div className="section-header">
            <span className="section-tag">✦ Get In Touch</span>
            <h1 className="section-title">Enquiry <span className="highlight">Form</span></h1>
            <p className="section-desc">Have a question about our classes or pricing? Let us know!</p>
          </div>

          <div className="form-container">
            <div className="form-card">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="enquiryName">Your Name</label>
                  <input type="text" id="enquiryName" name="name"
                    placeholder="Enter your name" value={form.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="enquiryEmail">Email Address</label>
                  <input type="email" id="enquiryEmail" name="email"
                    placeholder="your@email.com" value={form.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="enquirySubject">Subject</label>
                  <input type="text" id="enquirySubject" name="subject"
                    placeholder="What's it about?" value={form.subject} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="enquiryMessage">Your Message</label>
                  <textarea id="enquiryMessage" name="message" rows="5"
                    placeholder="Type your message here…"
                    value={form.message} onChange={handleChange} required />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-large"
                  style={{
                    width: '100%',
                    background: submitted ? '#22c55e' : '',
                    color: submitted ? '#fff' : '',
                  }}
                >
                  {submitted ? '✓ Enquiry Sent!' : 'Send Message →'}
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

export default EnquiryForm;
