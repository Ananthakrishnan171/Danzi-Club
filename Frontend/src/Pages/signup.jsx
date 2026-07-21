import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiCall } from '../utils/api';

const Signup = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Create account
      await apiCall('/auth/signup', 'POST', { email: form.email, password: form.password, name: form.username });
      
      // Simulate verifying it and logging in immediately
      const res = await apiCall('/auth/verify-signup', 'POST', { email: form.email });
      
      if (res.success) {
        setSubmitted(true);
        setTimeout(() => {
          navigate('/students'); // Redirect to dashboard
        }, 1500);
      }
    } catch (err) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">DANZI</div>
        <h2>Create Account</h2>

        {error && (
          <div style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form id="signupForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text" id="username" name="username"
              placeholder="Choose a username"
              value={form.username} onChange={handleChange} required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email" id="email" name="email"
              placeholder="your@email.com"
              value={form.email} onChange={handleChange} required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password" id="password" name="password"
              placeholder="Create a password"
              value={form.password} onChange={handleChange} required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-large"
            disabled={loading || submitted}
            style={{
              background: submitted ? '#22c55e' : '',
              color: submitted ? '#fff' : '',
              width: '100%'
            }}
          >
            {loading ? 'Creating...' : submitted ? '✓ Account Created!' : 'Sign Up →'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </main>
  );
};

export default Signup;