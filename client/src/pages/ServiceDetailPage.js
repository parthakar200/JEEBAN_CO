import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
//import { useAuth } from '../context/AuthContext';
import { useServices } from '../context/ServicesContext';
import { BUSINESS_PHONE } from '../utils/constants';
import { SERVICES_DATA } from '../utils/servicesData';

const DOC_STORAGE_KEY      = 'admin_service_documents';
const CONTENT_STORAGE_KEY  = 'admin_service_content';

function loadDocOverrides() {
  try { return JSON.parse(localStorage.getItem(DOC_STORAGE_KEY)) || {}; } catch { return {}; }
}

export default function ServiceDetailPage() {
  const { slug } = useParams();
  //const { user } = useAuth();
  const navigate = useNavigate();
  const { services } = useServices();
  const [tab, setTab] = useState('overview');
  const [openFaq, setOpenFaq] = useState(null);

  // Find from context (applies price/hide overrides) — fall back to static for custom
  const service = services.find(s => s.slug === slug)
    || SERVICES_DATA.find(s => s.slug === slug);

  if (!service) {
    return (
      <div style={{ paddingTop: 'var(--nav-height)', textAlign: 'center', padding: '120px 24px' }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>😔</div>
        <h2 style={{ marginBottom: 8 }}>Service not found</h2>
        <Link to="/services" className="btn btn-primary" style={{ marginTop: 16 }}>Browse All Services</Link>
      </div>
    );
  }

  // Load per-service document overrides from localStorage (set by admin)
  const docOverrides = loadDocOverrides();
  const documents = docOverrides[service.id] ?? service.documents ?? [];

  // Admin-editable content overrides (features, process, faqs)
  const contentOverrides = (() => {
    try { return JSON.parse(localStorage.getItem(CONTENT_STORAGE_KEY)) || {}; } catch { return {}; }
  })();
  const co = contentOverrides[service.id] || {};
  const features  = co.features  ?? service.features  ?? [];
  const processes = co.process   ?? service.process   ?? [];
  const faqs      = co.faqs     ?? service.faqs       ?? [];

  const gstAmount   = service.price.base * 0.18;
  const totalPrice  = service.price.base + gstAmount + (service.price.governmentFee || 0);
  const priceHidden = service.priceHidden ?? false;

  const handleGetStarted = () => {
    navigate('/register');
  };

  return (
    <div style={{ paddingTop: 'var(--nav-height)', minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <div style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '12px 0' }}>
        <div className="container">
          <nav style={{ fontSize: 13, color: '#64748b', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Link to="/" style={{ color: '#64748b' }}>Home</Link>
            <span>›</span>
            <Link to="/services" style={{ color: '#64748b' }}>Services</Link>
            <span>›</span>
            <span style={{ color: '#1a56db', fontWeight: 500 }}>{service.name}</span>
          </nav>
        </div>
      </div>

      <div className="container" style={{ padding: '36px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 40, alignItems: 'start' }} className="detail-layout">

          {/* Left content */}
          <div>
            {/* Header */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                <div style={{ fontSize: 48, width: 72, height: 72, background: '#eff6ff', borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{service.icon}</div>
                <div>
                  {service.isPopular && <span className="badge badge-orange" style={{ marginBottom: 8 }}>⭐ Most Popular</span>}
                  <h1 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontFamily: 'var(--font-heading)', fontWeight: 800, lineHeight: 1.2 }}>{service.name}</h1>
                </div>
              </div>
              <p style={{ fontSize: 17, color: '#475569', lineHeight: 1.7, marginBottom: 16 }}>{service.shortDescription}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  {[1,2,3,4,5].map(s => <span key={s} style={{ color: s <= Math.round(service.rating) ? '#f59e0b' : '#e2e8f0', fontSize: 16 }}>★</span>)}
                  <span style={{ fontSize: 14, color: '#64748b', marginLeft: 4 }}>{service.rating} ({service.reviewCount?.toLocaleString()} reviews)</span>
                </div>
                {service.timeline && <><span style={{ color: '#e2e8f0' }}>|</span><span style={{ fontSize: 14, color: '#16a34a', fontWeight: 600 }}>⏱ {service.timeline}</span></>}
              </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 4, borderBottom: '2px solid #f1f5f9', marginBottom: 32 }}>
              {['overview', 'documents', 'process', 'faqs'].map(t => (
                <button key={t} onClick={() => setTab(t)}
                  style={{ padding: '12px 20px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14, background: 'none', borderBottom: tab === t ? '2px solid #1a56db' : '2px solid transparent', color: tab === t ? '#1a56db' : '#64748b', marginBottom: -2, transition: 'all 0.2s', textTransform: 'capitalize' }}>
                  {t === 'faqs' ? 'FAQs' : t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>

            {/* Overview */}
            {tab === 'overview' && (
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>What's Included</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
                  {features.map((f, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: 14, background: '#f0fdf4', borderRadius: 10, border: '1px solid #dcfce7' }}>
                      <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 5.5l2.5 2.5 4.5-5" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                      <span style={{ fontSize: 14, color: '#166534', fontWeight: 500 }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Documents */}
            {tab === 'documents' && (
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Documents Required</h3>
                <p style={{ fontSize: 14, color: '#64748b', marginBottom: 20 }}>Keep these documents handy to ensure smooth processing.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {documents.map((doc, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', background: 'white', border: '1px solid #e2e8f0', borderRadius: 10 }}>
                      <div style={{ width: 38, height: 38, borderRadius: 10, background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M10.5 1.5H4.5A1.5 1.5 0 0 0 3 3v12a1.5 1.5 0 0 0 1.5 1.5h9A1.5 1.5 0 0 0 15 15V6l-4.5-4.5z" stroke="#1a56db" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" /><path d="M10.5 1.5V6H15" stroke="#1a56db" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                      <span style={{ fontSize: 15, fontWeight: 500, color: '#0f172a' }}>{doc}</span>
                    </div>
                  ))}
                  {documents.length === 0 && (
                    <p style={{ color: '#94a3b8', fontSize: 14 }}>No documents listed for this service.</p>
                  )}
                </div>
              </div>
            )}

            {/* Process */}
            {tab === 'process' && (
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>How It Works</h3>
                <div style={{ position: 'relative' }}>
                  {processes.map((step, i) => (
                    <div key={i} style={{ display: 'flex', gap: 20, marginBottom: i < (processes.length - 1) ? 24 : 0 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#1a56db', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16, fontFamily: 'var(--font-heading)', flexShrink: 0 }}>{step.step}</div>
                        {i < service.process.length - 1 && <div style={{ width: 2, flex: 1, background: '#e2e8f0', margin: '8px 0' }} />}
                      </div>
                      <div style={{ paddingTop: 8, paddingBottom: 24 }}>
                        <h4 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}>{step.title}</h4>
                        <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6 }}>{step.description}</p>
                      </div>
                    </div>
                  ))}
                  {processes.length === 0 && (
                    <p style={{ color: '#94a3b8', fontSize: 14 }}>Process steps not yet added.</p>
                  )}
                </div>
              </div>
            )}

            {/* FAQs */}
            {tab === 'faqs' && (
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Frequently Asked Questions</h3>
                {(faqs.length ? faqs : [
                  { question: `How long does ${service.name} take?`, answer: `The typical timeline is ${service.timeline || 'a few business days'}. This may vary based on document submission and government processing times.` },
                  { question: `What is the total cost for ${service.name}?`, answer: priceHidden ? 'Please contact us for a custom quote tailored to your needs.' : `The total cost is ₹${Math.round(totalPrice).toLocaleString('en-IN')} including professional fees, GST (18%), and government fees.` },
                  { question: 'Do you offer any refunds?', answer: 'Yes, we have a transparent refund policy. If we are unable to complete the service, we will issue a full refund of the professional fees.' },
                ]).map((faq, i) => (
                  <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: 12, marginBottom: 10, overflow: 'hidden' }}>
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', textAlign: 'left', padding: '18px 20px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: 15, fontWeight: 600, color: '#0f172a' }}>{faq.question}</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                        <path d="M4 6l4 4 4-4" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    {openFaq === i && <div style={{ padding: '0 20px 18px', fontSize: 14, color: '#64748b', lineHeight: 1.7, borderTop: '1px solid #f1f5f9' }}>{faq.answer}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sticky Order Card */}
          <div style={{ position: 'sticky', top: 88 }}>
            <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: 28, boxShadow: '0 8px 32px rgba(0,0,0,.08)' }}>
              {priceHidden ? (
                /* Price hidden — show contact us */
                <div style={{ marginBottom: 24, textAlign: 'center' }}>
                  <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>Pricing</div>
                  <div style={{ fontSize: 28, fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#1a56db', lineHeight: 1, marginBottom: 6 }}>
                    Contact Us
                  </div>
                  <div style={{ fontSize: 13, color: '#64748b' }}>Get a custom quote for your requirements</div>
                </div>
              ) : (
                /* Normal price display */
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 4 }}>Starting from</div>
                  <div style={{ fontSize: 38, fontWeight: 900, fontFamily: 'var(--font-heading)', color: '#1a56db', lineHeight: 1 }}>
                    ₹{Math.round(totalPrice).toLocaleString('en-IN')}
                  </div>
                  <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>All inclusive (GST + Govt. fees)</div>
                </div>
              )}

              {/* Price breakdown — only when price is visible */}
              {!priceHidden && (
                <div style={{ background: '#f8fafc', borderRadius: 12, padding: 16, marginBottom: 20 }}>
                  {[
                    { label: 'Professional Fees', value: service.price.base },
                    { label: 'GST (18%)', value: Math.round(gstAmount) },
                    ...(service.price.governmentFee ? [{ label: 'Government Fees', value: service.price.governmentFee }] : []),
                    { label: 'Total', value: Math.round(totalPrice), bold: true },
                  ].map((row, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderTop: row.bold ? '1px solid #e2e8f0' : 'none', marginTop: row.bold ? 8 : 0, paddingTop: row.bold ? 10 : 5 }}>
                      <span style={{ fontSize: 13, color: row.bold ? '#0f172a' : '#64748b', fontWeight: row.bold ? 700 : 400 }}>{row.label}</span>
                      <span style={{ fontSize: 13, fontWeight: row.bold ? 700 : 500, color: row.bold ? '#1a56db' : '#0f172a' }}>₹{row.value.toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              )}

              <button onClick={handleGetStarted} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: 16, fontSize: 16, borderRadius: 12, marginBottom: 12 }}>
                Get Started
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3.75 9h10.5M9.75 4.5L14.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>

              <a href={`tel:${BUSINESS_PHONE}`} className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', padding: 14, borderRadius: 12, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                📞 Talk to an experts
                 {/* &nbsp;<span style={{ fontSize: 12, color: '#94a3b8' }}>{BUSINESS_PHONE_DISPLAY}</span> */}
              </a>

              <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['100% Online Process', '30-Day Money Back Guarantee', 'Expert Support Included'].map(t => (
                  <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#475569' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13.5 4.5L6.5 11.5L2.5 7.5" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .detail-layout { grid-template-columns: 1fr !important; } }
        @media (max-width: 600px) { .detail-layout > div:first-child > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
