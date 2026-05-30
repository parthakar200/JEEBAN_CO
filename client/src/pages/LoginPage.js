import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

import newAdvLogo from '../assets/images/newAdvLogo.png';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return toast.error('Please fill all fields');
    setLoading(true);
    try {
      const res = await login(form.email, form.password);
      toast.success('Welcome back!');
      navigate(res?.user?.role === 'admin' ? '/admin' : redirect);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#f8fafc', paddingTop: 'var(--nav-height)' }}>
      {/* Left decorative panel */}
      <div style={{
        flex: 1, background: 'linear-gradient(160deg, #1a56db 0%, #1240a8 100%)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        padding: 60, color: 'white', height:'90vh',overflowY:'scroll'
      }} className="auth-panel">
        <div style={{ maxWidth: 400 }}>
          <div style={{ fontSize: 48, marginBottom: 24 }}>🚀</div>
          <h2 style={{ fontSize: 36, fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'white', marginBottom: 16, lineHeight: 1.2 }}>
            Simplify your compliance journey
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,.75)', lineHeight: 1.7, marginBottom: 40 }}>
            Join 5K+ businesses who trust Jeeban & CO. for GST, MCA, Trademark, and Income Tax compliance.
          </p>
          {[
            'Company registration in 15 days',
            'AI-powered GST filing',
            'Expert CAs & CSs at your service',
            'Secure document vault',
          ].map(item => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(255,255,255,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-6" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <span style={{ fontSize: 15, color: 'rgba(255,255,255,.85)' }}>{item}</span>
            </div>
          ))}

          <div style={{ marginTop: 40, padding: 24, background: 'rgba(255,255,255,.1)', borderRadius: 16, backdropFilter: 'blur(10px)' }}>
            <div style={{ display: 'flex', gap: 3, marginBottom: 10 }}>
              {[1,2,3,4,5].map(s => <span key={s} style={{ color: '#fbbf24', fontSize: 16 }}>★</span>)}
            </div>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,.85)', lineHeight: 1.6, fontStyle: 'italic' }}>
              "Jeeban & CO. made our company registration super smooth. Got our incorporation certificate in just 15 days!"
            </p>
            <div style={{ marginTop: 12, fontSize: 13, color: 'rgba(255,255,255,.6)' }}>— Priya Sharma, Founder TechVenture Pvt Ltd</div>
          </div>
        </div>
      </div>

      {/* Right form */}
      <div style={{ width: '100%', maxWidth: 520, display: 'flex', alignItems: 'start', justifyContent: 'center', padding: '40px 40px' }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 80, textDecoration: 'none' }}>
            <div style={{ width: 60, height: 40, borderRadius: 10, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 18, fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
              <img src={newAdvLogo} alt="Advocate Logo"  />
            </div>
            <span style={{ fontSize: 18, fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#0f172a' }}>Jeeban & <span style={{ color: '#1a56db' }}>CO.</span></span>
          </Link>

          <h1 style={{ fontSize: 28, fontFamily: 'var(--font-heading)', fontWeight: 800, marginBottom: 6 }}>Welcome back</h1>
          <p style={{ fontSize: 15, color: '#64748b', marginBottom: 32 }}>Sign in to your Jeeban & CO. account</p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                autoComplete="email"
                required
              />
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <label className="form-label" style={{ margin: 0 }}>Password</label>
                <Link to="/forgot-password" style={{ fontSize: 13, color: '#1a56db', fontWeight: 500 }}>Forgot password?</Link>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPass ? 'text' : 'password'}
                  className="form-input"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  autoComplete="current-password"
                  required
                  style={{ paddingRight: 44 }}
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                  {showPass ? (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 9s3-5.5 7-5.5S16 9 16 9s-3 5.5-7 5.5S2 9 2 9z" stroke="currentColor" strokeWidth="1.5" /><circle cx="9" cy="9" r="2" stroke="currentColor" strokeWidth="1.5" /><path d="M3 3l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 9s3-5.5 7-5.5S16 9 16 9s-3 5.5-7 5.5S2 9 2 9z" stroke="currentColor" strokeWidth="1.5" /><circle cx="9" cy="9" r="2" stroke="currentColor" strokeWidth="1.5" /></svg>
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}
              style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: 16, borderRadius: 12, opacity: loading ? 0.7 : 1 }}>
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" style={{ animation: 'spin 1s linear infinite' }}><circle cx="9" cy="9" r="7" stroke="rgba(255,255,255,.3)" strokeWidth="2" fill="none" /><path d="M9 2a7 7 0 0 1 7 7" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" /></svg>
                  Signing in...
                </span>
              ) : 'Sign In'}
            </button>
          </form>

          <div style={{ margin: '24px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
            <span style={{ fontSize: 13, color: '#94a3b8' }}>or</span>
            <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
          </div>

          <p style={{ textAlign: 'center', fontSize: 14, color: '#64748b' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#1a56db', fontWeight: 600 }}>Create account</Link>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) { .auth-panel { display: none !important; } }
      `}</style>
    </div>
  );
}
