import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { SERVICES_DATA } from '../utils/servicesData';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';

const STEPS = ['Business Details', 'Documents', 'Payment'];

export default function CheckoutPage() {
  const { serviceId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [form, setForm] = useState({
    businessName: '', state: '', pincode: '', address: '',
    directorName: '', directorPan: '', directorAadhaar: '',
  });

  const service = SERVICES_DATA.find(s => s.id === serviceId);

  if (!user) { navigate('/login?redirect=/checkout/' + serviceId); return null; }
  if (!service) return (
    <div style={{ paddingTop: 'var(--nav-height)', textAlign: 'center', padding: '120px 24px' }}>
      <h2>Service not found</h2>
      <Link to="/services" className="btn btn-primary" style={{ marginTop: 20 }}>Browse Services</Link>
    </div>
  );

  const gst = Math.round(service.price.base * 0.18);
  const total = service.price.base + gst + (service.price.governmentFee || 0);

  const handlePayment = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    toast.success('Order placed successfully! Our team will contact you shortly.');
    navigate('/dashboard');
    setLoading(false);
  };

  return (
    <div style={{ paddingTop: 'var(--nav-height)', minHeight: '100vh', background: '#f8fafc' }}>
      {/* For Search Engine Optimization */}
            <Helmet>
              <title>Jeeban & Co. - Company Registration, GST, ITR, Trademark India</title>
              <meta name="description" content="India's trusted platform for company registration, GST filing, trademark, and income tax services. Based in Soro, Baleshwar, Bhubaneswar, Odisha." />
              <meta name="keywords" content="company registration Bhubaneswar, GST registration Odisha, ITR filing Baleshwar, Project Funding, trademark India" />
            </Helmet>

      <div className="container" style={{ padding: '36px 24px' }}>
        {/* Breadcrumb */}
        <nav style={{ fontSize: 13, color: '#64748b', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link to="/" style={{ color: '#64748b' }}>Home</Link> ›
          <Link to="/services" style={{ color: '#64748b' }}>Services</Link> ›
          <Link to={`/services/${service.slug}`} style={{ color: '#64748b' }}>{service.name}</Link> ›
          <span style={{ color: '#1a56db', fontWeight: 500 }}>Checkout</span>
        </nav>

        {/* Step indicator */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 40, gap: 0 }}>
          {STEPS.map((s, i) => (
            <React.Fragment key={s}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: 14, transition: 'all 0.3s',
                  background: i < step ? '#16a34a' : i === step ? '#1a56db' : '#e2e8f0',
                  color: i <= step ? 'white' : '#94a3b8',
                }}>
                  {i < step ? (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  ) : i + 1}
                </div>
                <span style={{ fontSize: 12, fontWeight: i === step ? 600 : 400, color: i === step ? '#1a56db' : '#94a3b8', whiteSpace: 'nowrap' }}>{s}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div style={{ flex: 1, height: 2, background: i < step ? '#16a34a' : '#e2e8f0', margin: '0 12px', marginBottom: 22, transition: 'background 0.3s', minWidth: 48 }} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 32, alignItems: 'start' }} className="checkout-layout">
          {/* Left form */}
          <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: 32 }}>
            {/* Step 0: Business Details */}
            {step === 0 && (
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 800, fontFamily: 'var(--font-heading)', marginBottom: 6 }}>Business Details</h2>
                <p style={{ fontSize: 14, color: '#64748b', marginBottom: 28 }}>Provide details about your business and promoters</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label className="form-label">Business / Company Name *</label>
                    <input className="form-input" placeholder="e.g. ABC Technologies" value={form.businessName}
                      onChange={e => setForm({ ...form, businessName: e.target.value })} />
                    <span style={{ fontSize: 12, color: '#94a3b8' }}>Enter your proposed business name. We'll check availability.</span>
                  </div>
                  <div className="form-group">
                    <label className="form-label">State *</label>
                    <select className="form-input" value={form.state} onChange={e => setForm({ ...form, state: e.target.value })}>
                      <option value="">Select State</option>
                      {['Andhra Pradesh','Bihar','Delhi','Gujarat','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Odisha','Punjab','Rajasthan','Tamil Nadu','Telangana','Uttar Pradesh','West Bengal'].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Pincode *</label>
                    <input className="form-input" placeholder="e.g. 560001" value={form.pincode} maxLength={6}
                      onChange={e => setForm({ ...form, pincode: e.target.value.replace(/\D/g, '') })} />
                  </div>
                  <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label className="form-label">Registered Office Address *</label>
                    <textarea className="form-input" rows={3} placeholder="Full address including street, city" value={form.address}
                      onChange={e => setForm({ ...form, address: e.target.value })} style={{ resize: 'vertical' }} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Director / Partner Name *</label>
                    <input className="form-input" placeholder="Full name as per PAN" value={form.directorName}
                      onChange={e => setForm({ ...form, directorName: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">PAN Number *</label>
                    <input className="form-input" placeholder="ABCDE1234F" maxLength={10}
                      value={form.directorPan} onChange={e => setForm({ ...form, directorPan: e.target.value.toUpperCase() })} />
                  </div>
                </div>
                <div style={{ marginTop: 28, display: 'flex', justifyContent: 'flex-end' }}>
                  <button onClick={() => {
                    if (!form.businessName || !form.state || !form.pincode || !form.directorName) return toast.error('Please fill all required fields');
                    setStep(1);
                  }} className="btn btn-primary" style={{ padding: '12px 28px' }}>
                    Next: Upload Documents →
                  </button>
                </div>
              </div>
            )}

            {/* Step 1: Documents */}
            {step === 1 && (
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 800, fontFamily: 'var(--font-heading)', marginBottom: 6 }}>Upload Documents</h2>
                <p style={{ fontSize: 14, color: '#64748b', marginBottom: 28 }}>Upload the required documents for processing</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {service.documents.map((doc, i) => (
                    <div key={i} style={{ border: '2px dashed #e2e8f0', borderRadius: 12, padding: 20, display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer', transition: 'border-color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = '#1a56db'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = '#e2e8f0'}>
                      <div style={{ width: 44, height: 44, borderRadius: 10, background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M11.5 2H5.5A1.5 1.5 0 0 0 4 3.5v13A1.5 1.5 0 0 0 5.5 18h9a1.5 1.5 0 0 0 1.5-1.5V7L11.5 2z" stroke="#1a56db" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" /><path d="M11.5 2v5H16.5" stroke="#1a56db" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', marginBottom: 2 }}>{doc}</div>
                        <div style={{ fontSize: 12, color: '#94a3b8' }}>PDF, JPG or PNG — max 5MB</div>
                      </div>
                      <label style={{ cursor: 'pointer' }}>
                        <input type="file" accept=".pdf,.jpg,.jpeg,.png" style={{ display: 'none' }}
                          onChange={() => toast.success(`${doc} uploaded!`)} />
                        <span className="btn btn-outline btn-sm">Upload</span>
                      </label>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 8, padding: 14, background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 10 }}>
                  <p style={{ fontSize: 13, color: '#92400e' }}>
                    💡 <strong>Don't have all documents?</strong> You can upload them later from your dashboard. We'll hold your order.
                  </p>
                </div>
                <div style={{ marginTop: 28, display: 'flex', gap: 12 }}>
                  <button onClick={() => setStep(0)} className="btn btn-ghost">← Back</button>
                  <button onClick={() => setStep(2)} className="btn btn-primary" style={{ flex: 1 }}>Next: Payment →</button>
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 800, fontFamily: 'var(--font-heading)', marginBottom: 6 }}>Payment</h2>
                <p style={{ fontSize: 14, color: '#64748b', marginBottom: 28 }}>Choose your preferred payment method</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
                  {[
                    { id: 'razorpay', label: 'Razorpay', sub: 'UPI, Cards, Net Banking, Wallets', icon: '💳' },
                    { id: 'upi', label: 'UPI Direct', sub: 'Pay via any UPI app', icon: '📱' },
                    { id: 'netbanking', label: 'Net Banking', sub: 'All major Indian banks', icon: '🏦' },
                  ].map(method => (
                    <label key={method.id} style={{
                      display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px',
                      border: `2px solid ${paymentMethod === method.id ? '#1a56db' : '#e2e8f0'}`,
                      borderRadius: 12, cursor: 'pointer', transition: 'all 0.15s',
                      background: paymentMethod === method.id ? '#eff6ff' : 'white',
                    }}>
                      <input type="radio" name="payment" value={method.id} checked={paymentMethod === method.id}
                        onChange={() => setPaymentMethod(method.id)} style={{ accentColor: '#1a56db' }} />
                      <span style={{ fontSize: 22 }}>{method.icon}</span>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 600, color: '#0f172a' }}>{method.label}</div>
                        <div style={{ fontSize: 12, color: '#64748b' }}>{method.sub}</div>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Security */}
                <div style={{ display: 'flex', gap: 20, padding: '16px 20px', background: '#f0fdf4', borderRadius: 12, marginBottom: 28 }}>
                  {['SSL Encrypted', '256-bit Security', 'PCI DSS Compliant'].map(t => (
                    <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.5 4.5L5.5 10.5L2.5 7.5" stroke="#16a34a" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      <span style={{ fontSize: 12, color: '#166534', fontWeight: 500 }}>{t}</span>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 4, display: 'flex', gap: 12 }}>
                  <button onClick={() => setStep(1)} className="btn btn-ghost">← Back</button>
                  <button onClick={handlePayment} disabled={loading} className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '14px', fontSize: 16, opacity: loading ? 0.7 : 1 }}>
                    {loading ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <svg width="18" height="18" viewBox="0 0 18 18" style={{ animation: 'spin 1s linear infinite' }}><circle cx="9" cy="9" r="7" stroke="rgba(255,255,255,.3)" strokeWidth="2" fill="none" /><path d="M9 2a7 7 0 0 1 7 7" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" /></svg>
                        Processing...
                      </span>
                    ) : `Pay ₹${total.toLocaleString('en-IN')} →`}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order summary */}
          <div style={{ position: 'sticky', top: 88 }}>
            <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Order Summary</h3>
              <div style={{ display: 'flex', gap: 12, padding: '16px', background: '#f8fafc', borderRadius: 12, marginBottom: 20 }}>
                <div style={{ fontSize: 32, width: 52, height: 52, background: '#eff6ff', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{service.icon}</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{service.name}</div>
                  <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>⏱ {service.timeline}</div>
                  <div style={{ fontSize: 12, color: '#16a34a', marginTop: 4, fontWeight: 500 }}>⭐ {service.rating} rating</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
                {[
                  { label: 'Professional Fees', value: `₹${service.price.base.toLocaleString('en-IN')}` },
                  { label: 'GST (18%)', value: `₹${gst.toLocaleString('en-IN')}` },
                  ...(service.price.governmentFee ? [{ label: 'Government Fees', value: `₹${service.price.governmentFee.toLocaleString('en-IN')}` }] : []),
                ].map(row => (
                  <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 13, color: '#64748b' }}>{row.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 500, color: '#0f172a' }}>{row.value}</span>
                  </div>
                ))}
                <div style={{ height: 1, background: '#e2e8f0', margin: '4px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>Total</span>
                  <span style={{ fontSize: 18, fontWeight: 800, color: '#1a56db', fontFamily: 'var(--font-heading)' }}>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div style={{ padding: 14, background: '#f0fdf4', borderRadius: 10 }}>
                <p style={{ fontSize: 12, color: '#166534', lineHeight: 1.6 }}>
                  🛡️ <strong>30-Day Money Back Guarantee.</strong> If we're unable to complete your order, you'll receive a full refund.
                </p>
              </div>

              {/* Includes */}
              <div style={{ marginTop: 16 }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>What's Included</p>
                {service.features.slice(0, 4).map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.5 3.5L5.5 9.5L2.5 6.5" stroke="#16a34a" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    <span style={{ fontSize: 13, color: '#475569' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Support */}
            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 16, padding: 20, marginTop: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#1e40af', marginBottom: 6 }}>💬 Need help?</div>
              <p style={{ fontSize: 13, color: '#3730a3', lineHeight: 1.5, marginBottom: 12 }}>Our experts are available Mon–Sat, 9 AM to 7 PM IST</p>
              <a href="tel:+918069029097" className="btn btn-outline btn-sm" style={{ width: '100%', justifyContent: 'center' }}>📞 Call Us</a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 900px) { .checkout-layout { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
