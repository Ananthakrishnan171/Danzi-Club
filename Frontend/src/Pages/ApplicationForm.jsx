import React, { useState } from 'react';
import Footer from '../Components/Footer';

const ApplicationForm = () => {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', experience: '', style: 'western'
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ firstName: '', lastName: '', email: '', phone: '', experience: '', style: 'western' });
    }, 2000);
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
                  className="btn btn-primary btn-large"
                  style={{
                    width: '100%',
                    background: submitted ? '#22c55e' : '',
                    color: submitted ? '#fff' : '',
                  }}
                >
                  {submitted ? '✓ Application Submitted!' : 'Submit Application'}
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
