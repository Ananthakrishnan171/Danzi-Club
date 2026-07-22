import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiCall } from '../utils/api';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [role, setRole] = useState('User'); // 'User' or 'Admin'
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRoleToggle = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === 'Admin') {
      setForm({ username: 'admin', password: 'admin@1234' }); // Auto-fill for convenience based on requirements
    } else {
      setForm({ username: '', password: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await apiCall('/auth/login', 'POST', { 
        email: form.username, 
        password: form.password,
        role: role // Pass the selected role
      });
      
      if (res.success) {
        setSubmitted(true);
        // Save auth details
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        
        setTimeout(() => {
          if (res.user?.role === 'Admin') {
            navigate('/admin');
          } else {
            navigate('/students'); // Redirect to dashboard
          }
        }, 1500);
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">DANZI</div>
        <h2>Welcome Back</h2>

        {error && (
          <div style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
          <button 
            type="button" 
            onClick={() => handleRoleToggle('User')}
            style={{ 
              flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid #333', 
              background: role === 'User' ? '#6366f1' : 'transparent',
              color: role === 'User' ? '#fff' : '#aaa',
              cursor: 'pointer', transition: 'all 0.2s'
            }}>
            User
          </button>
          <button 
            type="button" 
            onClick={() => handleRoleToggle('Admin')}
            style={{ 
              flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid #333', 
              background: role === 'Admin' ? '#ef4444' : 'transparent',
              color: role === 'Admin' ? '#fff' : '#aaa',
              cursor: 'pointer', transition: 'all 0.2s'
            }}>
            Admin
          </button>
        </div>

        <form id="loginForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Email or Username</label>
            <input
              type="text" id="username" name="username"
              placeholder="Enter your email"
              value={form.username} onChange={handleChange} required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password" id="password" name="password"
              placeholder="Enter your password"
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
            {loading ? 'Logging in...' : submitted ? '✓ Logged In!' : 'Login →'}
          </button>
        </form>

        <p className="auth-footer" style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>
          <Link to="/forgot-password" style={{ fontSize: '0.9rem' }}>Forgot Password?</Link>
        </p>
        <p className="auth-footer">
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;