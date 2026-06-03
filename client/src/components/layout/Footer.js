import React from 'react';
import { Link } from 'react-router-dom';
import newAdvLogo from '../../assets/images/newAdvLogo.png';

const FOOTER_LINKS = {
  'Company': [
    { label: 'About Us', href: '/about' },
    { label: 'Our Team', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Partner With Us', href: '/partner' },
    { label: 'Contact Us', href: '/contact' },
  ],
  'Services': [
    { label: 'Company Registration', href: '/services?category=startup' },
    { label: 'GST Services', href: '/services?category=gst' },
    { label: 'Income Tax Filing', href: '/services?category=income-tax' },
    { label: 'Trademark', href: '/services?category=trademark' },
    { label: 'MCA Compliance', href: '/services?category=mca' },
  ],
  'Resources': [
    { label: 'Learning Center', href: '/learn' },
    { label: 'Business Name Search', href: '/search' },
    { label: 'GST Calculator', href: '/tools/gst-calculator' },
    { label: 'Tax Calculator', href: '/tools/tax-calculator' },
    { label: 'Blog', href: '/blog' },
  ],
  'Legal': [
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Refund Policy', href: '/refund' },
    { label: 'Disclaimer', href: '/disclaimer' },
    { label: 'Grievance Policy', href: '/grievance' },
  ],
};

const SOCIALS = [
  {
    label: 'Facebook', href: 'https://facebook.com',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
  },
  {
    label: 'Twitter', href: 'https://twitter.com',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
  },
  {
    label: 'LinkedIn', href: 'https://linkedin.com',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
  },
  {
    label: 'YouTube', href: 'https://youtube.com',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" /></svg>
  },
];

export default function Footer() {
  return (
    <footer style={{ background: '#0f172a', color: '#94a3b8', marginTop: 'auto' }}>
      {/* Main footer */}
      <div className="container" style={{ padding: '64px 24px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '280px repeat(4, 1fr)', gap: 48 }}>
          {/* Brand */}
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 40, height: 36, borderRadius: 10, background: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
                fontSize: 18, fontWeight: 800, fontFamily: 'var(--font-heading)'
              }}>
                <img src={newAdvLogo} alt="Advocate Logo"  />
              </div>
              <span style={{ fontSize: 18, fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'white' }}>
                Jeeban & <span style={{ color: '#60a5fa' }}>CO.</span>
              </span>
            </Link>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: '#64748b', marginBottom: 24 }}>
              India's Largest AI-Powered Corporate Services & Compliance Platform. Trusted by 2.2 lakh+ businesses.
            </p>

            {/* Socials */}
            <div style={{ display: 'flex', gap: 10 }}>
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: 38, height: 38, borderRadius: 10, background: '#1e293b', color: '#64748b',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#1a56db'; e.currentTarget.style.color = 'white'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#1e293b'; e.currentTarget.style.color = '#64748b'; }}>
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Trust badges */}
            <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {['ISO 27001 Certified', 'MCA Registered eFiling Intermediary', 'SSL Secured Platform'].map(t => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <span style={{ fontSize: 12, color: '#64748b' }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Link groups */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: 'white', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 16 }}>{title}</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {links.map(link => (
                  <li key={link.label}>
                    <Link to={link.href} style={{ fontSize: 14, color: '#64748b', transition: 'color 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'white'}
                      onMouseLeave={e => e.currentTarget.style.color = '#64748b'}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Contact bar */}
      <div style={{ borderTop: '1px solid #1e293b' }}>
        <div className="container" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            <a href="tel:+919692195476" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#64748b', transition: 'color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#60a5fa'}
              onMouseLeave={e => e.currentTarget.style.color = '#64748b'}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 3h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              +91 9692195476
            </a>
            <a href="mailto:advjeeban@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#64748b', transition: 'color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#60a5fa'}
              onMouseLeave={e => e.currentTarget.style.color = '#64748b'}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
              advjeeban@gmail.com
            </a>
          </div>
          <p style={{ fontSize: 13, color: '#475569' }}>
            © {new Date().getFullYear()} Jeeban & Co. All rights reserved.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          footer .container > div { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 600px) {
          footer .container > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
