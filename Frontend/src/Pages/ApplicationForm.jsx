import React, { useState } from 'react';
import Footer from '../Components/Footer';
import { apiCall } from '../utils/api';

const ApplicationForm = () => {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', experience: '', style: 'western'
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await apiCall('/applications/submit', 'POST', {
        fullName: `${form.firstName} ${form.lastName}`.trim(),
        email: form.email,
        phone: form.phone,
        experience: form.experience,
        course: form.style
      });

      if (res.success) {
        setSubmitted(true);
        setForm({ firstName: '', lastName: '', email: '', phone: '', experience: '', style: 'western' });
        setTimeout(() => {
          setSubmitted(false);
        }, 4000);
      }
    } catch (err) {
      console.error('Failed to submit application to MongoDB:', err);
      setError(err.message || 'Failed to submit application.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main>
        <section className="section">
          <div className="section-header">
            <span className="section-tag">✦ Join Us</span>
            <h1 className="section-title">Student <span className="highlight">Application</span></h1>
            <p className="section-desc">Apply to join Danzi Dance Club. Fill out your details below.</p>
          </div>

          <div className="form-container">
            <div className="form-card">
              {error && (
                <div style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" name="firstName"
                      placeholder="First name" value={form.firstName} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" name="lastName"
                      placeholder="Last name" value={form.lastName} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="appEmail">Email Address</label>
                  <input type="email" id="appEmail" name="email"
                    placeholder="your@email.com" value={form.email} onChange={handleChange} required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone"
                      placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="experience">Experience (Yrs)</label>
                    <input type="number" id="experience" name="experience"
                      placeholder="0" value={form.experience} onChange={handleChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="style">Preferred Dance Style</label>
                  <select id="style" name="style" value={form.style} onChange={handleChange}>
                    <option value="western">Western Dance</option>
                    <option value="bharatanatyam">Bharatanatyam</option>
                    <option value="classical">Classical Dance</option>
                    <option value="hiphop">Hip Hop</option>
                    <option value="zumba">Zumba Dance</option>
                    <option value="breakdance">Break Dance</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary btn-large"
                  style={{
                    width: '100%',
                    background: submitted ? '#22c55e' : '',
                    color: submitted ? '#fff' : ''
                  }}
                >
                  {submitted ? '✓ Application Submitted!' : loading ? 'Submitting...' : 'Submit Application →'}
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

export default ApplicationForm;
