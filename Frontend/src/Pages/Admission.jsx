import React, { useEffect, useState } from 'react';
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

const Admission = () => {
  useReveal();

  const [form, setForm] = useState({
    name: '', age: '', gender: '', mobile: '', email: '',
    address: '', course: 'western', batch: 'morning', photo: null
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({
        name: '', age: '', gender: '', mobile: '', email: '',
        address: '', course: 'western', batch: 'morning', photo: null
      });
    }, 2000);
  };

  const handleReset = () => {
    setForm({
      name: '', age: '', gender: '', mobile: '', email: '',
      address: '', course: 'western', batch: 'morning', photo: null
    });
  };

  return (
    <>
      <main>
        <section className="section">
          <div className="section-header reveal">
            <span className="section-tag">✦ Join Us</span>
            <h1 className="section-title">
              Admission <span className="highlight">Form</span>
            </h1>
            <p className="section-desc">
              Fill out the form below to begin your dance journey with Danzi.
            </p>
          </div>

          <div className="form-container reveal">
            <div className="form-card">
              <form id="admissionForm" onSubmit={handleSubmit}>

                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text" id="fullName" name="name"
                    placeholder="Enter your full name"
                    value={form.name} onChange={handleChange} required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input
                      type="number" id="age" name="age"
                      placeholder="e.g. 18"
                      value={form.age} onChange={handleChange} required
                    />
                  </div>
                  <div className="form-group">
                    <label>Gender</label>
                    <div className="radio-group">
                      <label>
                        <input
                          type="radio" name="gender" value="male"
                          checked={form.gender === 'male'} onChange={handleChange}
                        /> Male
                      </label>
                      <label>
                        <input
                          type="radio" name="gender" value="female"
                          checked={form.gender === 'female'} onChange={handleChange}
                        /> Female
                      </label>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="mobile">Mobile Number</label>
                  <input
                    type="tel" id="mobile" name="mobile"
                    placeholder="+91 XXXXX XXXXX"
                    value={form.mobile} onChange={handleChange} required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email" id="email" name="email"
                    placeholder="your@email.com"
                    value={form.email} onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <textarea
                    id="address" name="address" rows="3"
                    placeholder="Enter your address"
                    value={form.address} onChange={handleChange}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="course">Select Course</label>
                    <select id="course" name="course" value={form.course} onChange={handleChange}>
                      <option value="western">Western Dance</option>
                      <option value="classical">Classical Dance</option>
                      <option value="bharatanatyam">Bharatanatyam</option>
                      <option value="hiphop">Hip Hop</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="batch">Batch</label>
                    <select id="batch" name="batch" value={form.batch} onChange={handleChange}>
                      <option value="morning">Morning</option>
                      <option value="evening">Evening</option>
                      <option value="weekend">Weekend</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="photo">Upload Photo</label>
                  <input
                    type="file" id="photo" name="photo"
                    accept="image/*" onChange={handleChange}
                  />
                </div>

                <div className="form-actions">
                  <button
                    type="submit"
                    className="btn btn-primary btn-large"
                    style={{
                      flex: 1,
                      background: submitted ? '#22c55e' : '',
                      color: submitted ? '#fff' : '',
                    }}
                  >
                    {submitted ? '✓ Submitted!' : 'Submit Application'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost btn-large"
                    onClick={handleReset}
                  >
                    Clear
                  </button>
                </div>

              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Admission;
