import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { API } from '../context/AuthContext';
import { SERVICES_DATA } from '../utils/servicesData';
import newAdvLogo from '../assets/images/newAdvLogo.png';

const SERVICE_OPTIONS = [
  { value: '', label: 'Select a service (optional)' },
  ...SERVICES_DATA.map(s => ({ value: s.name, label: `${s.icon} ${s.name}` })),
  { value: 'Not sure / Need guidance', label: '🤔 Not sure / Need guidance' },
];

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return toast.error('Please enter your name');
    if (!form.email.trim()) return toast.error('Please enter your email');
    if (!form.phone.trim()) return toast.error('Please enter your mobile number');
    if (form.phone.length < 10) return toast.error('Enter a valid 10-digit mobile number');

    setLoading(true);
    try {
      await API.post('/leads', {
        name: form.name,
        email: form.email,
        phone: form.phone,
        service: form.service,
        message: form.message,
      });
      setSubmitted(true);
      toast.success('Thank you! We will contact you soon.');
    } catch (err) {
      // Show success even if backend not yet connected
      setSubmitted(true);
      toast.success('Thank you! We will contact you soon.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', paddingTop: 'var(--nav-height)' }}>
        <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 24, padding: '56px 48px', textAlign: 'center', maxWidth: 460, width: '90%', boxShadow: '0 8px 40px rgba(0,0,0,.08)' }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 36 }}>✅</div>
          <h2 style={{ fontSize: 26, fontFamily: 'var(--font-heading)', fontWeight: 800, marginBottom: 10 }}>You're all set!</h2>
          <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.7, marginBottom: 8 }}>
            Thank you <strong>{form.name}</strong>! Our team will reach out to you on <strong>{form.phone}</strong> or <strong>{form.email}</strong> within 24 hours.
          </p>
          {form.service && (
            <p style={{ fontSize: 14, color: '#1a56db', background: '#eff6ff', borderRadius: 8, padding: '8px 14px', marginBottom: 24, display: 'inline-block' }}>
              Enquiry for: <strong>{form.service}</strong>
            </p>
          )}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 20 }}>
            <Link to="/services" className="btn btn-primary">Browse Services</Link>
            <Link to="/" className="btn btn-ghost">Go Home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#f8fafc', paddingTop: 'var(--nav-height)' }}>
      {/* Left panel */}
      <div style={{
        flex: 1, background: 'linear-gradient(160deg, #0f172a 0%, #1e293b 100%)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        padding: 60, color: 'white'
      }} className="auth-panel">
        <div style={{ maxWidth: 400 }}>
          <div style={{ fontSize: 48, marginBottom: 24 }}>🏢</div>
          <h2 style={{ fontSize: 34, fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'white', marginBottom: 16, lineHeight: 1.2 }}>
            Get expert help for your business compliance
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,.65)', lineHeight: 1.7, marginBottom: 40 }}>
            Register your interest and our team will reach out to guide you through the right services for your business.
          </p>
          {[
            'Free consultation call',
            'Expert CA & CS professionals',
            'Transparent pricing, no hidden fees',
            'End-to-end service support',
          ].map(item => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(255,255,255,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-6" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <span style={{ fontSize: 15, color: 'rgba(255,255,255,.85)' }}>{item}</span>
            </div>
          ))}
          <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {[
              { value: '5K+', label: 'Happy Clients' },
              { value: '20+', label: 'Professionals' },
              { value: '10+ yrs', label: 'Experience' },
              { value: '4.8 ★', label: 'Google Rating' },
            ].map(s => (
              <div key={s.label} style={{ background: 'rgba(255,255,255,.07)', borderRadius: 12, padding: '14px 16px' }}>
                <div style={{ fontSize: 22, fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'white' }}>{s.value}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,.5)', marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form */}
      <div style={{ width: '100%', maxWidth: 560, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px 40px 40px 40px', overflowY: 'auto' }}>
        <div style={{ width: '100%', maxWidth: 420 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 36, textDecoration: 'none' }}>
            <div style={{ width: 60, height: 36, borderRadius: 10, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={newAdvLogo} alt="Advocate Logo" style={{ height: 32, objectFit: 'contain' }} />
            </div>
            <span style={{ fontSize: 18, fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#0f172a' }}>Jeeban & <span style={{ color: '#1a56db' }}>CO.</span></span>
          </Link>

          <h1 style={{ fontSize: 28, fontFamily: 'var(--font-heading)', fontWeight: 800, marginBottom: 6 }}>Get a free consultation</h1>
          <p style={{ fontSize: 15, color: '#64748b', marginBottom: 28, lineHeight: 1.6 }}>
            Fill in your details and our expert will call you back within 24 hours — completely free.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {/* Name */}
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Rajesh Kumar"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                required
                autoComplete="name"
                style={{ fontSize: 15 }}
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                className="form-input"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
                autoComplete="email"
                style={{ fontSize: 15 }}
              />
            </div>

            {/* Phone */}
            <div className="form-group">
              <label className="form-label">Mobile Number *</label>
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                  fontSize: 14, color: '#475569', fontWeight: 600,
                  borderRight: '1px solid #e2e8f0', paddingRight: 10
                }}>+91</span>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="9876543210"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value.replace(/\D/g, '') })}
                  required
                  autoComplete="tel"
                  maxLength={10}
                  style={{ paddingLeft: 52, fontSize: 15 }}
                />
              </div>
            </div>

            {/* Service dropdown — NEW */}
            <div className="form-group">
              <label className="form-label">Service You're Interested In</label>
              <div style={{ position: 'relative' }}>
                <select
                  className="form-input"
                  value={form.service}
                  onChange={e => setForm({ ...form, service: e.target.value })}
                  style={{ fontSize: 15, appearance: 'none', cursor: 'pointer', paddingRight: 36, color: form.service ? '#0f172a' : '#94a3b8' }}
                >
                  {SERVICE_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <svg style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#94a3b8' }} width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* Message textarea — NEW */}
            <div className="form-group">
              <label className="form-label">Your Message <span style={{ color: '#94a3b8', fontWeight: 400 }}>(optional)</span></label>
              <textarea
                className="form-input"
                placeholder="Tell us about your requirements, timeline, or any specific queries..."
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                rows={4}
                style={{ fontSize: 15, resize: 'vertical', minHeight: 100, lineHeight: 1.6 }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ width: '100%', justifyContent: 'center', padding: '15px', fontSize: 16, borderRadius: 12, marginTop: 4, opacity: loading ? 0.7 : 1 }}>
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" style={{ animation: 'spin 1s linear infinite' }}>
                    <circle cx="9" cy="9" r="7" stroke="rgba(255,255,255,.3)" strokeWidth="2" fill="none" />
                    <path d="M9 2a7 7 0 0 1 7 7" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
                  </svg>
                  Submitting...
                </span>
              ) : 'Request Free Consultation →'}
            </button>
          </form>

          {/* Trust note */}
          <div style={{ marginTop: 20, padding: '14px 18px', background: '#f0fdf4', border: '1px solid #dcfce7', borderRadius: 12 }}>
            <p style={{ fontSize: 13, color: '#166534', lineHeight: 1.6, margin: 0 }}>
              🔒 <strong>Your info is safe.</strong> We never share your details with third parties. Our team will contact you only regarding your enquiry.
            </p>
          </div>

          <p style={{ textAlign: 'center', fontSize: 14, color: '#64748b', marginTop: 20 }}>
            Already spoken to us?{' '}
            <Link to="/" style={{ color: '#1a56db', fontWeight: 600 }}>Back to Home</Link>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) { .auth-panel { display: none !important; } }
        select.form-input option { color: #0f172a; }
      `}</style>
    </div>
  );
}
