import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { SERVICES_DATA } from '../utils/servicesData';
import { Helmet } from 'react-helmet-async';

const STATUS_CONFIG = {
  pending: { label: 'Pending', color: '#f59e0b', bg: '#fffbeb' },
  payment_pending: { label: 'Payment Pending', color: '#ef4444', bg: '#fef2f2' },
  in_progress: { label: 'In Progress', color: '#1a56db', bg: '#eff6ff' },
  document_pending: { label: 'Docs Needed', color: '#f97316', bg: '#fff7ed' },
  under_review: { label: 'Under Review', color: '#7c3aed', bg: '#f5f3ff' },
  completed: { label: 'Completed', color: '#16a34a', bg: '#f0fdf4' },
  cancelled: { label: 'Cancelled', color: '#64748b', bg: '#f8fafc' },
};

function StatCard({ icon, label, value, color }) {
  return (
    <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 16, padding: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ fontSize: 13, color: '#64748b', fontWeight: 500 }}>{label}</span>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{icon}</div>
      </div>
      <div style={{ fontSize: 32, fontWeight: 800, fontFamily: 'var(--font-heading)', color }}>{value}</div>
    </div>
  );
}

function OrderRow({ order }) {
  const status = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
  const service = SERVICES_DATA.find(s => s.id === order.serviceId) || { name: order.serviceName, icon: '📄' };
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px 120px 100px', gap: 16, padding: '16px 20px', borderBottom: '1px solid #f1f5f9', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ fontSize: 24, width: 44, height: 44, background: '#f0f4ff', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{service.icon}</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{service.name}</div>
          <div style={{ fontSize: 12, color: '#94a3b8' }}>#{order.orderId || 'IF' + order.id}</div>
        </div>
      </div>
      <div style={{ fontSize: 13, color: '#64748b' }}>{new Date(order.date || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
      <div>
        <span style={{ fontSize: 12, fontWeight: 600, color: status.color, background: status.bg, padding: '4px 10px', borderRadius: 99 }}>
          {status.label}
        </span>
      </div>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>₹{(order.amount || 0).toLocaleString('en-IN')}</div>
    </div>
  );
}

// Mock orders for demo
const MOCK_ORDERS = [
  { id: '1', orderId: 'IF1703123456', serviceId: 's4', serviceName: 'GST Registration', status: 'completed', amount: 1768, date: '2024-11-15' },
  { id: '2', orderId: 'IF1703234567', serviceId: 's1', serviceName: 'Private Limited Company', status: 'in_progress', amount: 11268, date: '2024-12-01' },
  { id: '3', orderId: 'IF1703345678', serviceId: 's6', serviceName: 'Trademark Registration', status: 'document_pending', amount: 12228, date: '2024-12-10' },
];

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [profileForm, setProfileForm] = useState({ name: user?.name || '', phone: user?.phone || '' });

  if (!user) {
    navigate('/login');
    return null;
  }

  const completedOrders = MOCK_ORDERS.filter(o => o.status === 'completed').length;
  const activeOrders = MOCK_ORDERS.filter(o => o.status === 'in_progress' || o.status === 'document_pending').length;
  const totalSpend = MOCK_ORDERS.reduce((sum, o) => sum + o.amount, 0);

  const TABS = [
    { id: 'overview', label: '🏠 Overview' },
    { id: 'orders', label: '📦 My Orders' },
    { id: 'documents', label: '📁 Documents' },
    { id: 'profile', label: '👤 Profile' },
  ];

  return (
    <div style={{ paddingTop: 'var(--nav-height)', minHeight: '100vh', background: '#f8fafc' }}>
      {/* For Search Engine Optimization */}
            <Helmet>
              <title>Jeeban & Co. - Company Registration, GST, ITR, Trademark India</title>
              <meta name="description" content="India's trusted platform for company registration, GST filing, trademark, and income tax services. Based in Soro, Baleshwar, Bhubaneswar, Odisha." />
              <meta name="keywords" content="company registration Bhubaneswar, GST registration Odisha, ITR filing Baleshwar, Project Funding, trademark India" />
            </Helmet>
      
      <div className="container" style={{ padding: '32px 24px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 28, fontFamily: 'var(--font-heading)', fontWeight: 800, marginBottom: 4 }}>
              Good day, {user.name?.split(' ')[0]}! 👋
            </h1>
            <p style={{ fontSize: 14, color: '#64748b' }}>Manage your services and compliance tasks</p>
          </div>
          <Link to="/services" className="btn btn-primary">+ New Service</Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 28 }} className="dash-layout">
          {/* Sidebar */}
          <aside>
            {/* Profile card */}
            <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 16, padding: 24, marginBottom: 12, textAlign: 'center' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg, #1a56db, #7c3aed)', color: 'white', fontSize: 24, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontFamily: 'var(--font-heading)' }}>
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>{user.name}</div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 12 }}>{user.email}</div>
              <span style={{ fontSize: 12, fontWeight: 600, background: '#eff6ff', color: '#1a56db', padding: '4px 12px', borderRadius: 99 }}>
                {user.role === 'admin' ? '🔑 Admin' : '✅ Verified User'}
              </span>
            </div>

            {/* Nav */}
            <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 16, overflow: 'hidden' }}>
              {TABS.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  style={{ width: '100%', textAlign: 'left', padding: '13px 18px', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: activeTab === tab.id ? 600 : 400, background: activeTab === tab.id ? '#eff6ff' : 'none', color: activeTab === tab.id ? '#1a56db' : '#475569', transition: 'all 0.15s', borderLeft: activeTab === tab.id ? '3px solid #1a56db' : '3px solid transparent', display: 'block' }}>
                  {tab.label}
                </button>
              ))}
              <div style={{ padding: '8px 12px', borderTop: '1px solid #f1f5f9' }}>
                <button onClick={() => { logout(); navigate('/'); }}
                  style={{ width: '100%', textAlign: 'left', padding: '10px 6px', border: 'none', cursor: 'pointer', fontSize: 14, color: '#ef4444', background: 'none', fontWeight: 500 }}>
                  🚪 Sign Out
                </button>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main>
            {/* Overview */}
            {activeTab === 'overview' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }} className="stats-grid">
                  <StatCard icon="📦" label="Total Orders" value={MOCK_ORDERS.length} color="#1a56db" />
                  <StatCard icon="✅" label="Completed" value={completedOrders} color="#16a34a" />
                  <StatCard icon="⚡" label="In Progress" value={activeOrders} color="#f97316" />
                  <StatCard icon="💰" label="Total Spend" value={'₹' + totalSpend.toLocaleString('en-IN')} color="#7c3aed" />
                </div>

                {/* Recent orders */}
                <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 16, overflow: 'hidden', marginBottom: 24 }}>
                  <div style={{ padding: '20px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h3 style={{ fontSize: 17, fontWeight: 700 }}>Recent Orders</h3>
                    <button onClick={() => setActiveTab('orders')} style={{ fontSize: 13, color: '#1a56db', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>View All →</button>
                  </div>
                  <div style={{ padding: '12px 0 0' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px 120px 100px', gap: 16, padding: '0 20px 12px', borderBottom: '2px solid #f1f5f9' }}>
                      {['Service', 'Date', 'Status', 'Amount'].map(h => (
                        <span key={h} style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</span>
                      ))}
                    </div>
                    {MOCK_ORDERS.map(order => <OrderRow key={order.id} order={order} />)}
                  </div>
                </div>

                {/* Quick actions */}
                <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 16, padding: 24 }}>
                  <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 16 }}>Quick Actions</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                    {[
                      { icon: '🏢', label: 'Register Company', href: '/services/private-limited-company' },
                      { icon: '📋', label: 'GST Registration', href: '/services/gst-registration' },
                      { icon: '™️', label: 'Trademark Filing', href: '/services/trademark-registration' },
                      { icon: '💰', label: 'File ITR', href: '/services/itr-filing' },
                      { icon: '📁', label: 'ROC Filing', href: '/services/roc-annual-filing' },
                      { icon: '👥', label: 'Payroll Setup', href: '/services/payroll-management' },
                    ].map(action => (
                      <Link key={action.label} to={action.href}
                        style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', border: '1px solid #e2e8f0', borderRadius: 10, textDecoration: 'none', transition: 'all 0.15s' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = '#1a56db'; e.currentTarget.style.background = '#eff6ff'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = 'none'; }}>
                        <span style={{ fontSize: 20 }}>{action.icon}</span>
                        <span style={{ fontSize: 13, fontWeight: 500, color: '#0f172a' }}>{action.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Orders tab */}
            {activeTab === 'orders' && (
              <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 16, overflow: 'hidden' }}>
                <div style={{ padding: '20px 20px 0' }}>
                  <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>My Orders</h3>
                  <p style={{ fontSize: 13, color: '#64748b', marginBottom: 16 }}>Track all your service orders and their status</p>
                </div>
                {MOCK_ORDERS.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '60px 24px' }}>
                    <div style={{ fontSize: 48, marginBottom: 12 }}>📦</div>
                    <h4 style={{ fontSize: 18, marginBottom: 8 }}>No orders yet</h4>
                    <p style={{ color: '#64748b', marginBottom: 20 }}>Get started with one of our popular services</p>
                    <Link to="/services" className="btn btn-primary">Browse Services</Link>
                  </div>
                ) : (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px 120px 100px', gap: 16, padding: '12px 20px', borderTop: '1px solid #f1f5f9' }}>
                      {['Service', 'Date', 'Status', 'Amount'].map(h => (
                        <span key={h} style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</span>
                      ))}
                    </div>
                    {MOCK_ORDERS.map(order => <OrderRow key={order.id} order={order} />)}
                  </>
                )}
              </div>
            )}

            {/* Documents tab */}
            {activeTab === 'documents' && (
              <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 16, padding: 24 }}>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>My Documents</h3>
                <p style={{ fontSize: 13, color: '#64748b', marginBottom: 24 }}>Securely stored documents related to your services</p>
                <div style={{ textAlign: 'center', padding: '40px 24px', border: '2px dashed #e2e8f0', borderRadius: 16 }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>📁</div>
                  <h4 style={{ fontSize: 18, marginBottom: 8 }}>Your documents vault</h4>
                  <p style={{ color: '#64748b', fontSize: 14 }}>Documents uploaded during service fulfillment will appear here</p>
                </div>
              </div>
            )}

            {/* Profile tab */}
            {activeTab === 'profile' && (
              <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 16, padding: 32 }}>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 24 }}>Profile Settings</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input className="form-input" value={profileForm.name} onChange={e => setProfileForm({ ...profileForm, name: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input className="form-input" value={user.email} disabled style={{ opacity: 0.6, cursor: 'not-allowed' }} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Mobile Number</label>
                    <input className="form-input" placeholder="+91 XXXXXXXXXX" value={profileForm.phone} onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Account Type</label>
                    <input className="form-input" value={user.role} disabled style={{ opacity: 0.6, cursor: 'not-allowed', textTransform: 'capitalize' }} />
                  </div>
                </div>
                <button className="btn btn-primary" onClick={() => alert('Profile updated!')}>Save Changes</button>
              </div>
            )}
          </main>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .dash-layout { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
