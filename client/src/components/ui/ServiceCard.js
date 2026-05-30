import React from 'react';
import { Link } from 'react-router-dom';

export default function ServiceCard({ service, compact = false }) {
  const totalPrice = service.price.base + (service.price.base * 18 / 100) + (service.price.governmentFee || 0);

  return (
    <Link to={`/services/${service.slug}`} style={{ textDecoration: 'none' }}>
      <div className="card" style={{
        padding: compact ? 20 : 24,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {service.isPopular && (
          <div style={{
            position: 'absolute', top: 12, right: 12,
            background: '#fef3c7', color: '#92400e',
            fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 99,
          }}>POPULAR</div>
        )}

        {/* Icon */}
        <div style={{
          fontSize: compact ? 28 : 36, marginBottom: 12, lineHeight: 1,
          width: compact ? 48 : 60, height: compact ? 48 : 60,
          background: 'var(--surface-2)', borderRadius: 14,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{service.icon}</div>

        {/* Name */}
        <h3 style={{ fontSize: compact ? 15 : 17, fontWeight: 700, color: '#0f172a', marginBottom: 8, lineHeight: 1.3 }}>
          {service.name}
        </h3>

        {!compact && (
          <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6, flex: 1, marginBottom: 16 }}>
            {service.shortDescription}
          </p>
        )}

        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: compact ? 10 : 14 }}>
          <div style={{ display: 'flex', gap: 2 }}>
            {[1, 2, 3, 4, 5].map(star => (
              <svg key={star} width="12" height="12" viewBox="0 0 12 12" fill={star <= Math.round(service.rating) ? '#f59e0b' : '#e2e8f0'}>
                <path d="M6 1l1.39 2.82L10.5 4.27l-2.25 2.19.53 3.09L6 7.97 3.22 9.55l.53-3.09L1.5 4.27l3.11-.45L6 1z" />
              </svg>
            ))}
          </div>
          <span style={{ fontSize: 12, color: '#64748b' }}>{service.rating} ({service.reviewCount?.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 14, borderTop: '1px solid #f1f5f9' }}>
          <div>
            {service.priceHidden ? (
              <>
                <span style={{ fontSize: 11, color: '#94a3b8' }}>Pricing</span>
                <div style={{ fontSize: compact ? 14 : 16, fontWeight: 700, color: '#1a56db', fontFamily: 'var(--font-heading)', marginTop: 2 }}>
                  Contact us
                </div>
                <span style={{ fontSize: 10, color: '#94a3b8' }}>Get a custom quote</span>
              </>
            ) : (
              <>
                <span style={{ fontSize: 11, color: '#94a3b8' }}>Starting at</span>
                <div style={{ fontSize: compact ? 17 : 20, fontWeight: 800, color: '#1a56db', fontFamily: 'var(--font-heading)' }}>
                  ₹{totalPrice.toLocaleString('en-IN')}
                </div>
                <span style={{ fontSize: 10, color: '#94a3b8' }}>incl. GST & Govt. fee</span>
              </>
            )}
          </div>
          <div style={{
            width: 34, height: 34, borderRadius: 10, background: '#eff6ff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3.33 8h9.34M8.67 4.67L12 8l-3.33 3.33" stroke="#1a56db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
