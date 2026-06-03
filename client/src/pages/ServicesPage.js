import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ServiceCard from '../components/ui/ServiceCard';
import { CATEGORIES } from '../utils/servicesData';
import { useServices } from '../context/ServicesContext';
import { Helmet } from 'react-helmet-async';

export default function ServicesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [priceSort, setPriceSort] = useState('');
  const activeCategory = searchParams.get('category') || 'all';
  const { services: SERVICES_DATA } = useServices();

  const setCategory = (cat) => {
    if (cat === 'all') searchParams.delete('category');
    else searchParams.set('category', cat);
    setSearchParams(searchParams);
  };

  const filtered = useMemo(() => {
    let list = SERVICES_DATA;
    if (activeCategory !== 'all') list = list.filter(s => s.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(s => s.name.toLowerCase().includes(q) || s.shortDescription?.toLowerCase().includes(q));
    }
    if (priceSort === 'asc') list = [...list].sort((a, b) => a.price.base - b.price.base);
    if (priceSort === 'desc') list = [...list].sort((a, b) => b.price.base - a.price.base);
    return list;
  }, [activeCategory, search, priceSort,SERVICES_DATA]);

  return (
    <div style={{ paddingTop: 'var(--nav-height)', minHeight: '100vh' }}>
      {/* For Search Engine Optimization */}
            <Helmet>
              <title>Jeeban & Co. - Company Registration, GST, ITR, Trademark India</title>
              <meta name="description" content="India's trusted platform for company registration, GST filing, trademark, and income tax services. Based in Soro, Baleshwar, Bhubaneswar, Odisha." />
              <meta name="keywords" content="company registration Bhubaneswar, GST registration Odisha, ITR filing Baleshwar, Project Funding, trademark India" />
            </Helmet>

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #f0f4ff, #f8fafc)', padding: '48px 0 36px', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontFamily: 'var(--font-heading)', fontWeight: 800, marginBottom: 8 }}>All Services</h1>
          <p style={{ fontSize: 16, color: '#64748b' }}>End-to-end compliance and business services. {SERVICES_DATA.length}+ services available.</p>

          {/* Search */}
          <div style={{ position: 'relative', maxWidth: 480, marginTop: 24 }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>
              <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12.5 12.5L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search services (e.g. GST, Trademark)..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="form-input"
              style={{ paddingLeft: 42, background: 'white' }}
            />
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 32 }} className="services-layout">

          {/* Sidebar */}
          <aside>
            <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden', position: 'sticky', top: 88 }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9' }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>Filter by Category</h3>
              </div>
              <div style={{ padding: 8 }}>
                <button onClick={() => setCategory('all')}
                  style={{ width: '100%', textAlign: 'left', padding: '10px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: activeCategory === 'all' ? 600 : 400, background: activeCategory === 'all' ? '#eff6ff' : 'none', color: activeCategory === 'all' ? '#1a56db' : '#475569', transition: 'all 0.15s' }}>
                  🏠 All Services ({SERVICES_DATA.length})
                </button>
                {CATEGORIES.map(cat => {
                  const count = SERVICES_DATA.filter(s => s.category === cat.id).length;
                  return (
                    <button key={cat.id} onClick={() => setCategory(cat.id)}
                      style={{ width: '100%', textAlign: 'left', padding: '10px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: activeCategory === cat.id ? 600 : 400, background: activeCategory === cat.id ? '#eff6ff' : 'none', color: activeCategory === cat.id ? '#1a56db' : '#475569', transition: 'all 0.15s', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>{cat.icon} {cat.label}</span>
                      <span style={{ fontSize: 12, color: '#94a3b8', background: '#f1f5f9', borderRadius: 99, padding: '2px 7px' }}>{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Main */}
          <main>
            {/* Sort bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
              <p style={{ fontSize: 14, color: '#64748b' }}>
                Showing <strong>{filtered.length}</strong> services{activeCategory !== 'all' ? ` in ${CATEGORIES.find(c => c.id === activeCategory)?.label}` : ''}
              </p>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <label style={{ fontSize: 13, color: '#64748b' }}>Sort:</label>
                <select value={priceSort} onChange={e => setPriceSort(e.target.value)} className="form-input" style={{ width: 'auto', padding: '7px 12px', fontSize: 13 }}>
                  <option value="">Recommended</option>
                  <option value="asc">Price: Low to High</option>
                  <option value="desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 60 }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
                <h3 style={{ fontSize: 20, marginBottom: 8 }}>No services found</h3>
                <p style={{ color: '#64748b' }}>Try a different search term or category</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
                {filtered.map(service => <ServiceCard key={service.id} service={service} />)}
              </div>
            )}
          </main>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .services-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
