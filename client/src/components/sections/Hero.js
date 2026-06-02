import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Building2, ClipboardList, Landmark, Banknote, BadgeCheck } from 'lucide-react';

const ROTATING_WORDS = ['Company Registration', 'GST Compliance', 'Trademark Filing', 'ITR Filing', 'MCA Compliance', 'HR & Payroll'];

const SERVICE_CHIPS = [
  { label: 'Startup', sub: 'Company, LLP & OPC', href: '/services?category=startup', color: '#1a56db',icon: <Building2 size={20} /> },
  { label: 'GST', sub: 'Registration & Returns', href: '/services?category=gst', color: '#7c3aed', icon: <ClipboardList size={20}/> },
  { label: 'MCA', sub: 'ROC Filings', href: '/services?category=mca', color: '#0891b2', icon: <Landmark size={20}/> },
  { label: 'Income Tax', sub: 'ITR & TDS', href: '/services?category=income-tax', color: '#16a34a', icon: <Banknote size={20}/> },
  { label: 'Trademark', sub: 'Brand Protection', href: '/services?category=trademark', color: '#ea580c', icon: <BadgeCheck size={20}/> },
];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex(i => (i + 1) % ROTATING_WORDS.length);
        setVisible(true);
      }, 400);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section style={{
      paddingTop: 'calc(var(--nav-height) + 72px)',
      paddingBottom: 80,
      background: 'linear-gradient(160deg, #f8faff 0%, #eef3ff 40%, #f0fdf4 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute', top: -100, right: -200, width: 600, height: 600,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(26,86,219,.06) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', bottom: -100, left: -100, width: 400, height: 400,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(22,163,74,.05) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'white', border: '1px solid #e2e8f0', borderRadius: 99, padding: '6px 16px', marginBottom: 28, boxShadow: '0 2px 8px rgba(0,0,0,.06)' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#16a34a', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: -4, borderRadius: '50%', border: '2px solid rgba(22,163,74,.3)', animation: 'pulse-ring 1.5s infinite' }} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>India's Largest AI-Powered Compliance Platform</span>
          </div>

          {/* Headline */}
          <h1 style={{ fontSize: 'clamp(36px, 5.5vw, 66px)', fontFamily: 'var(--font-heading)', fontWeight: 800, lineHeight: 1.1, marginBottom: 24, color: '#0f172a', letterSpacing: '-0.02em' }}>
            Simplify Your<br />
            <span style={{
              display: 'inline-block',
              color: '#1a56db',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 0.35s ease, transform 0.35s ease',
              minWidth: 400,
            }}>
              {ROTATING_WORDS[wordIndex]}
            </span>
          </h1>

          <p style={{ fontSize: 18, color: '#475569', lineHeight: 1.7, marginBottom: 40, maxWidth: 580, margin: '0 auto 40px' }}>
            Join millions who trust Jeeban & CO. to simplify MCA, GST, and Income Tax compliance with AI automation, expert support, and paperless workflows.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 56 }}>
            <Link to="/register" className="btn btn-primary btn-lg" style={{ fontSize: 16 }}>
              Get Started Free
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3.75 9h10.5M9.75 4.5L14.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
            <Link to="/services" className="btn btn-ghost btn-lg" style={{ fontSize: 16 }}>
              Explore Services
            </Link>
          </div>

          {/* Service chips */}
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            {SERVICE_CHIPS.map(chip => (
              <Link key={chip.label} to={chip.href} style={{
                display: 'flex', alignItems: 'center',gap: 10,
                background: 'white', border: '1px solid #e2e8f0', borderRadius: 14,
                padding: '12px 15px', minWidth: 110, transition: 'all 0.2s',
                textDecoration: 'none', boxShadow: '0 1px 4px rgba(0,0,0,.05)'
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = chip.color; e.currentTarget.style.boxShadow = `0 4px 16px ${chip.color}22`; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,.05)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                
                <span style={{ color: chip.color}}>{chip.icon}</span>
                <div style={{display: 'flex', flexDirection: 'column', textAlign: 'start', alignItems: 'start' }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: chip.color, marginBottom: 1 }}>{chip.label}</span>
                <span style={{ fontSize: 11, color: '#94a3b8', whiteSpace: 'nowrap' }}>{chip.sub}</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Trust signals */}
          <div style={{ marginTop: 48, display: 'flex', gap: 36, justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
            {[
              { value: '1.3L+', label: 'Services Delivered' },
              { value: '5K+', label: 'Happy Clients' },
              { value: '20+', label: 'Professionals' },
              { value: '10 yrs', label: 'Experience' },
            ].map(stat => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#1a56db' }}>{stat.value}</div>
                <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
