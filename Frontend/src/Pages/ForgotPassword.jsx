import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // 0=email, 1=otp, 2=reset, 3=success
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const steps = ['Email', 'OTP', 'Password', 'Success'];

  const handleRequestOtp = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      setLoading(false);
      setStep(1);
    }, 1000);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      setLoading(false);
      if (otp === '000000') {
        setError('Invalid OTP. Please try again.');
      } else {
        setStep(2);
      }
    }, 800);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    setError('');
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 800);
  };

  return (
    <main className="auth-page">
      <div className="auth-card" style={{ maxWidth: 460 }}>
        <div className="auth-brand">DANZI</div>
        <h2 style={{ marginBottom: '1.5rem' }}>🔑 Reset Password</h2>

        {/* Step indicator */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {steps.map((s, i) => (
            <div key={s} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px'
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: i <= step ? 'var(--accent)' : 'var(--bg-glass)',
                border: `1px solid ${i <= step ? 'var(--accent)' : 'var(--border-glass)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.75rem', fontWeight: 700,
                color: i <= step ? '#0a0a0a' : 'var(--text-muted)'
              }}>
                {i + 1}
              </div>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{s}</span>
            </div>
          ))}
        </div>

        {error && (
          <div style={{
            padding: '0.75rem 1rem', background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.3)', borderRadius: 'var(--radius-sm)',
            color: '#ef4444', fontSize: '0.875rem', marginBottom: '1rem', textAlign: 'left'
          }}>
            {error}
          </div>
        )}

        {step === 0 && (
          <form onSubmit={handleRequestOtp} style={{ textAlign: 'left' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Enter your registered email address and we'll send you a verification code.
            </p>
            <div className="form-group">
              <label htmlFor="fpEmail">Email Address</label>
              <input type="email" id="fpEmail" placeholder="john@example.com"
                value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary btn-large" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Sending…' : 'Request Reset Code'}
            </button>
          </form>
        )}

        {step === 1 && (
          <form onSubmit={handleVerifyOtp} style={{ textAlign: 'left' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Enter the 6-digit verification code sent to <strong style={{ color: 'var(--text-primary)' }}>{email}</strong>.
            </p>
            <div className="form-group">
              <label htmlFor="fpOtp">Verification OTP</label>
              <input type="text" id="fpOtp" placeholder="123456"
                value={otp} onChange={e => setOtp(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary btn-large" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Verifying…' : 'Verify Code'}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleResetPassword} style={{ textAlign: 'left' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Enter your new password below.
            </p>
            <div className="form-group">
              <label htmlFor="fpPass">New Password</label>
              <input type="password" id="fpPass" placeholder="Min 6 characters"
                value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="fpConfirm">Confirm Password</label>
              <input type="password" id="fpConfirm" placeholder="Confirm new password"
                value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary btn-large" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Updating…' : 'Reset Password'}
            </button>
          </form>
        )}

        {step === 3 && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
            <h3 style={{ color: 'var(--accent)', marginBottom: '0.75rem' }}>Password Updated!</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Your password has been reset successfully. You can now log in.
            </p>
            <button className="btn btn-primary btn-large" style={{ width: '100%' }} onClick={() => navigate('/login')}>
              Go to Login
            </button>
          </div>
        )}

        {step < 3 && (
          <p className="auth-footer">
            <Link to="/login">← Back to Login</Link>
          </p>
        )}
      </div>
    </main>
  );
};

export default ForgotPassword;
