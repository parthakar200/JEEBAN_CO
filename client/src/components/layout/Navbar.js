import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
// import { CATEGORIES } from '../../utils/servicesData';

import newAdvLogo from '../../assets/images/newAdvLogo.png';

const NAV_LINKS = [
  {
    label: 'Startup', href: '/services?category=startup',
    sub: [
      { label: 'Private Limited Company', href: '/services/private-limited-company' },
      { label: 'LLP Registration', href: '/services/llp-registration' },
      { label: 'One Person Company', href: '/services/opc-registration' },
      { label: 'Nidhi Company', href: '/services?category=startup' },
      { label: 'Section 8 Company', href: '/services?category=startup' },
    ]
  },
  {
    label: 'GST', href: '/services?category=gst',
    sub: [
      { label: 'GST Registration', href: '/services/gst-registration' },
      { label: 'GST Return Filing', href: '/services/gst-return-filing' },
      { label: 'GST Notice Response', href: '/services?category=gst' },
      { label: 'GST Reconciliation', href: '/services?category=gst' },
    ]
  },
  {
    label: 'MCA', href: '/services?category=mca',
    sub: [
      { label: 'ROC Annual Filing', href: '/services/roc-annual-filing' },
      { label: 'Director KYC', href: '/services/dir-3-kyc' },
      { label: 'Company Name Change', href: '/services?category=mca' },
      { label: 'Add/Remove Director', href: '/services?category=mca' },
    ]
  },
  {
    label: 'Income Tax', href: '/services?category=income-tax',
    sub: [
      { label: 'ITR Filing', href: '/services/itr-filing' },
      { label: 'TDS Returns', href: '/services?category=income-tax' },
      { label: 'Tax Planning', href: '/services?category=income-tax' },
    ]
  },
  {
    label: 'Trademark', href: '/services?category=trademark',
    sub: [
      { label: 'Trademark Registration', href: '/services/trademark-registration' },
      { label: 'Trademark Renewal', href: '/services?category=trademark' },
      { label: 'Trademark Search', href: '/services?category=trademark' },
    ]
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownTimer, setDropdownTimer] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const handleMouseEnter = (label) => {
    if (dropdownTimer) clearTimeout(dropdownTimer);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    const timer = setTimeout(() => setActiveDropdown(null), 150);
    setDropdownTimer(timer);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav ref={navRef} style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? 'rgba(255,255,255,0.97)' : 'white',
      borderBottom: `1px solid ${scrolled ? '#e2e8f0' : '#e2e8f0'}`,
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,.07)' : 'none',
      transition: 'all 0.3s ease',
      height: 'var(--nav-height)',
    }}>
      <div className="container" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 3, flexShrink: 0 }}>
          <div style={{
            width: 60, height: 36, borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
            fontSize: 18, fontWeight: 800, fontFamily: 'var(--font-heading)'
          }}>
            <img src={newAdvLogo} alt="Advocate Logo"  />
          </div>
          <span style={{ fontSize: 18, fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#0f172a', letterSpacing: '-0.02em' }}>
            Jeeban & <span style={{ color: '#1a56db' }}>CO.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1, justifyContent: 'center' }}
          className="desktop-nav">
          {NAV_LINKS.map(link => (
            <div key={link.label} style={{ position: 'relative' }}
              onMouseEnter={() => handleMouseEnter(link.label)}
              onMouseLeave={handleMouseLeave}>
              <Link to={link.href} style={{
                display: 'flex', alignItems: 'center', gap: 4, padding: '8px 14px',
                borderRadius: 8, fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)',
                transition: 'all 0.15s', whiteSpace: 'nowrap'
              }}
                onMouseEnter={e => { e.currentTarget.style.color = '#1a56db'; e.currentTarget.style.background = '#f0f4ff'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'transparent'; }}>
                {link.label}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>

              {/* Dropdown */}
              {activeDropdown === link.label && link.sub && (
                <div style={{
                  position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
                  background: 'white', borderRadius: 14, border: '1px solid #e2e8f0',
                  boxShadow: '0 12px 40px rgba(0,0,0,.12)', padding: 8,
                  minWidth: 220, zIndex: 100, animation: 'fadeInUp 0.15s ease',
                }}>
                  {link.sub.map(sub => (
                    <Link key={sub.label} to={sub.href} style={{
                      display: 'block', padding: '9px 14px', borderRadius: 8,
                      fontSize: 14, color: 'var(--text-secondary)', transition: 'all 0.1s'
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#f0f4ff'; e.currentTarget.style.color = '#1a56db'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}>
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link to="/services" style={{
            padding: '8px 14px', borderRadius: 8, fontSize: 14, fontWeight: 500,
            color: 'var(--text-secondary)', transition: 'all 0.15s'
          }}
            onMouseEnter={e => { e.currentTarget.style.color = '#1a56db'; e.currentTarget.style.background = '#f0f4ff'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'transparent'; }}>
            All Services
          </Link>
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          {user ? (
            <>
              {user?.role === 'admin' ? (
                <Link to="/admin" className="btn btn-ghost btn-sm" style={{ color: '#7c3aed', fontWeight: 700 }}>🛡️ Admin Panel</Link>
              ) : null}
              <div style={{ position: 'relative' }} className="user-menu">
                <button onClick={handleLogout} className="btn btn-primary btn-sm">Logout</button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost btn-sm">Login</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Get Started</Link>
            </>
          )}

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: 'none', border: '1.5px solid #e2e8f0', borderRadius: 8, padding: '6px 10px', cursor: 'pointer', display: 'none' }}
            className="mobile-menu-btn" aria-label="Toggle menu">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              {mobileOpen ? (
                <path d="M5 5L15 15M15 5L5 15" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M3 6h14M3 10h14M3 14h14" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: 'white', borderTop: '1px solid #e2e8f0',
          boxShadow: '0 12px 40px rgba(0,0,0,.12)', maxHeight: '80vh', overflowY: 'auto', padding: 16
        }}>
          {NAV_LINKS.map(link => (
            <div key={link.label}>
              <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '12px 8px 4px' }}>{link.label}</p>
              {link.sub?.map(sub => (
                <Link key={sub.label} to={sub.href} style={{ display: 'block', padding: '8px 12px', borderRadius: 8, fontSize: 14, color: 'var(--text-secondary)' }}>{sub.label}</Link>
              ))}
            </div>
          ))}
          <div style={{ borderTop: '1px solid #e2e8f0', marginTop: 12, paddingTop: 12, display: 'flex', gap: 10 }}>
            {user ? (
              <>
                {user?.role === 'admin' ? (
                  <Link to="/admin" className="btn btn-ghost btn-sm" style={{ flex: 1, justifyContent: 'center', color: '#7c3aed', fontWeight: 700 }}>🛡️ Admin Panel</Link>
                ) : null}
                <button onClick={handleLogout} className="btn btn-primary btn-sm" style={{ flex: 1 }}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost btn-sm" style={{ flex: 1, justifyContent: 'center' }}>Login</Link>
                <Link to="/register" className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: 'center' }}>Get Started</Link>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 960px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
