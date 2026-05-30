import React from 'react';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div style={{ paddingTop: 'var(--nav-height)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px 24px' }}>
      <div>
        <div style={{ fontSize: 96, lineHeight: 1, marginBottom: 16 }}>404</div>
        <h1 style={{ fontSize: 32, fontFamily: 'var(--font-heading)', fontWeight: 800, marginBottom: 12 }}>Page Not Found</h1>
        <p style={{ fontSize: 17, color: '#64748b', maxWidth: 440, margin: '0 auto 32px', lineHeight: 1.7 }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-primary btn-lg">Go Home</Link>
          <Link to="/services" className="btn btn-ghost btn-lg">Browse Services</Link>
        </div>
      </div>
    </div>
  );
}

export function TermsPage() {
  return (
    <div style={{ paddingTop: 'var(--nav-height)', minHeight: '100vh' }}>
      <div style={{ background: 'linear-gradient(135deg, #f0f4ff, #f8fafc)', padding: '48px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <h1 style={{ fontSize: 36, fontFamily: 'var(--font-heading)', fontWeight: 800 }}>Terms & Conditions</h1>
          <p style={{ fontSize: 14, color: '#64748b', marginTop: 8 }}>Last updated: December 2024</p>
        </div>
      </div>
      <div className="container" style={{ padding: '48px 24px', maxWidth: 800 }}>
        {[
          { title: '1. Acceptance of Terms', content: 'By accessing and using the IndiaFilings platform, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using IndiaFilings services, you shall be subject to any posted guidelines or rules applicable to such services.' },
          { title: '2. Services', content: 'IndiaFilings provides online corporate and compliance services including but not limited to company registration, GST filing, trademark registration, and income tax filing. All services are subject to applicable government regulations and fees.' },
          { title: '3. User Accounts', content: 'To access certain features of the platform, you must register for an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.' },
          { title: '4. Payment & Refunds', content: 'All payments are processed securely. Professional fees are non-refundable once work has commenced. Government fees are non-refundable once submitted. In case of service failure due to our error, full refund of professional fees will be issued within 7 business days.' },
          { title: '5. Privacy', content: 'Your use of IndiaFilings is also governed by our Privacy Policy, which is incorporated into these terms by reference. We collect and process your personal data in accordance with applicable data protection laws.' },
          { title: '6. Limitation of Liability', content: 'IndiaFilings shall not be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses resulting from your use of the service.' },
          { title: '7. Governing Law', content: 'These Terms shall be governed and construed in accordance with the laws of India. Any disputes arising shall be subject to the exclusive jurisdiction of courts in Chennai, Tamil Nadu.' },
        ].map(section => (
          <div key={section.title} style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, color: '#0f172a' }}>{section.title}</h2>
            <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.8 }}>{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PrivacyPage() {
  return (
    <div style={{ paddingTop: 'var(--nav-height)', minHeight: '100vh' }}>
      <div style={{ background: 'linear-gradient(135deg, #f0f4ff, #f8fafc)', padding: '48px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <h1 style={{ fontSize: 36, fontFamily: 'var(--font-heading)', fontWeight: 800 }}>Privacy Policy</h1>
          <p style={{ fontSize: 14, color: '#64748b', marginTop: 8 }}>Last updated: December 2024</p>
        </div>
      </div>
      <div className="container" style={{ padding: '48px 24px', maxWidth: 800 }}>
        {[
          { title: 'Information We Collect', content: 'We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support. This includes name, email address, phone number, PAN, Aadhaar, and business details required for service delivery.' },
          { title: 'How We Use Your Information', content: 'We use the information we collect to provide, maintain, and improve our services, process transactions, send transactional and promotional communications, and comply with legal obligations including regulatory filings.' },
          { title: 'Information Sharing', content: 'We do not sell your personal information. We share your information only with government authorities as required for service delivery, service providers who assist us in operations, and legal authorities when required by law.' },
          { title: 'Data Security', content: 'We implement industry-standard security measures including SSL encryption, access controls, and regular security audits. We are ISO 27001:2022 certified for information security management.' },
          { title: 'Data Retention', content: 'We retain your personal information for as long as necessary to provide services and comply with legal obligations. You may request deletion of your account data subject to regulatory requirements.' },
          { title: 'Your Rights', content: 'You have the right to access, correct, or delete your personal information. You may also object to processing or request data portability. Contact us at privacy@indiafilings.com to exercise these rights.' },
          { title: 'Contact Us', content: 'For privacy-related queries, contact our Data Protection Officer at privacy@indiafilings.com or write to IndiaFilings, No.1, 8th Floor, Arihant Nitco Park, Rajiv Gandhi Salai, Perungudi, Chennai – 600096.' },
        ].map(section => (
          <div key={section.title} style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, color: '#0f172a' }}>{section.title}</h2>
            <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.8 }}>{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
