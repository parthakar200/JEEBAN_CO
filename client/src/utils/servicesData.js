export const SERVICES_DATA = [
  {
    id: 's1', name: 'Private Limited Company', slug: 'private-limited-company', category: 'startup',
    icon: '🏢', price: { base: 6999, governmentFee: 2500 }, timeline: '15-20 business days',
    shortDescription: 'Register a Pvt Ltd Company with MCA. DIN, DSC, Name Approval included.',
    isPopular: true, rating: 4.8, reviewCount: 12450,
    features: ['2 Director DIN', '2 Digital Signatures', 'Name Approval', 'MOA & AOA Drafting', 'Certificate of Incorporation', 'PAN & TAN', 'Bank Account Opening Assistance', 'GST Registration'],
    documents: ['Aadhaar Card', 'PAN Card', 'Passport Size Photo', 'Mobile Number', 'Email ID', 'Proof of Registered Office'],
    process: [
      { step: 1, title: 'Application', description: 'Fill in business details & director information' },
      { step: 2, title: 'Document Upload', description: 'Upload required KYC and address proofs' },
      { step: 3, title: 'Name Approval', description: 'We apply for RUN name reservation with MCA' },
      { step: 4, title: 'Incorporation', description: 'File SPICe+ with ROC and get Certificate' },
    ]
  },
  {
    id: 's2', name: 'LLP Registration', slug: 'llp-registration', category: 'startup',
    icon: '🤝', price: { base: 4999, governmentFee: 1500 }, timeline: '10-15 business days',
    shortDescription: 'Register a Limited Liability Partnership. Ideal for professionals and service firms.',
    isPopular: true, rating: 4.7, reviewCount: 6820,
    features: ['2 Partner DPIN', '2 Digital Signatures', 'Name Approval', 'LLP Agreement Drafting', 'Certificate of Incorporation', 'PAN of LLP'],
    documents: ['Aadhaar Card', 'PAN Card', 'Passport Size Photo', 'Office Address Proof'],
    process: [
      { step: 1, title: 'Partner Details', description: 'Provide partner information and capital contribution' },
      { step: 2, title: 'Name Reservation', description: 'LLP-RUN name reservation with MCA' },
      { step: 3, title: 'Incorporation', description: 'File FiLLiP form with MCA' },
      { step: 4, title: 'LLP Agreement', description: 'Draft and file LLP Agreement within 30 days' },
    ]
  },
  {
    id: 's3', name: 'One Person Company', slug: 'opc-registration', category: 'startup',
    icon: '👤', price: { base: 5499, governmentFee: 2000 }, timeline: '12-18 business days',
    shortDescription: 'Perfect for solo entrepreneurs. Single owner with limited liability protection.',
    isPopular: false, rating: 4.6, reviewCount: 3240,
    features: ['1 Director DIN', '1 Digital Signature', 'Name Approval', 'MOA & AOA', 'Certificate of Incorporation', 'PAN & TAN'],
    documents: ['Aadhaar Card', 'PAN Card', 'Nominee Details', 'Office Proof'],
    process: [
      { step: 1, title: 'Owner Details', description: 'Submit director and nominee information' },
      { step: 2, title: 'Documents', description: 'Upload identity and address proofs' },
      { step: 3, title: 'Filing', description: 'File SPICe+ with ROC' },
      { step: 4, title: 'Certificate', description: 'Receive Certificate of Incorporation' },
    ]
  },
  {
    id: 's4', name: 'GST Registration', slug: 'gst-registration', category: 'gst',
    icon: '📋', price: { base: 1499, governmentFee: 0 }, timeline: '5-7 business days',
    shortDescription: 'Mandatory for businesses with turnover >20 lakhs. Get GSTIN in days.',
    isPopular: true, rating: 4.9, reviewCount: 28760,
    features: ['GSTIN Number', 'GST Certificate', 'Digital Signature (if required)', 'Guidance on First GST Return'],
    documents: ['PAN', 'Aadhaar', 'Business Address Proof', 'Bank Statement', 'Cancelled Cheque'],
    process: [
      { step: 1, title: 'Details', description: 'Provide business and promoter details' },
      { step: 2, title: 'Application', description: 'File GST REG-01 on GST portal' },
      { step: 3, title: 'Verification', description: 'GST officer reviews application' },
      { step: 4, title: 'GSTIN', description: 'Receive GSTIN and GST Certificate' },
    ]
  },
  {
    id: 's5', name: 'GST Return Filing', slug: 'gst-return-filing', category: 'gst',
    icon: '📊', price: { base: 999, governmentFee: 0 }, timeline: 'Monthly/Quarterly',
    shortDescription: 'GSTR-1, GSTR-3B, GSTR-9 filing. Never miss a deadline again.',
    isPopular: true, rating: 4.8, reviewCount: 19500,
    features: ['GSTR-1 Filing', 'GSTR-3B Filing', 'ITC Reconciliation', 'Late Fee Assistance', 'Annual Return GSTR-9'],
    documents: ['Sales Invoices', 'Purchase Invoices', 'Bank Statements'],
    process: [
      { step: 1, title: 'Data Collection', description: 'Share invoice and purchase data' },
      { step: 2, title: 'Reconciliation', description: 'Match sales and purchase data with GSTR-2B' },
      { step: 3, title: 'Filing', description: 'File GSTR-1 and GSTR-3B on time' },
      { step: 4, title: 'Confirmation', description: 'Share filed return acknowledgment' },
    ]
  },
  {
    id: 's6', name: 'Trademark Registration', slug: 'trademark-registration', category: 'trademark',
    icon: '™️', price: { base: 6499, governmentFee: 4500 }, timeline: '18-24 months',
    shortDescription: 'Protect your brand. File trademark application with IP India.',
    isPopular: true, rating: 4.7, reviewCount: 8930,
    features: ['Trademark Search', 'Application Filing', 'TM-A Form', 'Trademark Certificate', 'Brand Monitoring'],
    documents: ['Applicant PAN', 'Business Proof', 'Logo/Word Mark', 'Power of Attorney'],
    process: [
      { step: 1, title: 'Search', description: 'Comprehensive trademark search for conflicts' },
      { step: 2, title: 'Application', description: 'File TM-A with IP India' },
      { step: 3, title: 'Examination', description: 'Examiner reviews and issues examination report' },
      { step: 4, title: 'Registration', description: 'Trademark advertised and registered' },
    ]
  },
  {
    id: 's7', name: 'ITR Filing', slug: 'itr-filing', category: 'income-tax',
    icon: '💰', price: { base: 999, governmentFee: 0 }, timeline: '1-3 business days',
    shortDescription: 'Income Tax Return filing for individuals, professionals, and businesses.',
    isPopular: true, rating: 4.9, reviewCount: 34200,
    features: ['ITR-1 to ITR-6', 'Tax Computation', 'Refund Tracking', 'Form 26AS Reconciliation', 'Expert Review'],
    documents: ['Form 16', 'Bank Statements', 'Investment Proofs', 'Aadhaar & PAN'],
    process: [
      { step: 1, title: 'Data Collection', description: 'Provide income and investment details' },
      { step: 2, title: 'Tax Computation', description: 'Calculate tax liability and deductions' },
      { step: 3, title: 'Review', description: 'Expert reviews your return before filing' },
      { step: 4, title: 'Filing', description: 'File ITR and send acknowledgment' },
    ]
  },
  {
    id: 's8', name: 'ROC Annual Filing', slug: 'roc-annual-filing', category: 'mca',
    icon: '📁', price: { base: 5999, governmentFee: 1200 }, timeline: '7-10 business days',
    shortDescription: 'MGT-7, AOC-4, DIR-3 KYC annual compliance for private limited companies.',
    isPopular: false, rating: 4.6, reviewCount: 5670,
    features: ['MGT-7 Filing', 'AOC-4 Filing', 'Director KYC', 'Annual Report', 'Board Resolution'],
    documents: ['Financial Statements', 'Director Details', 'Shareholder Details', 'Bank Statements'],
    process: [
      { step: 1, title: 'Data', description: 'Collect financial and director data' },
      { step: 2, title: 'Accounts', description: 'Prepare financial statements if needed' },
      { step: 3, title: 'Forms', description: 'File MGT-7 and AOC-4 with MCA' },
      { step: 4, title: 'Confirmation', description: 'Share filed acknowledgments' },
    ]
  },
  {
    id: 's9', name: 'Payroll Management', slug: 'payroll-management', category: 'payroll',
    icon: '👥', price: { base: 2999, governmentFee: 0 }, timeline: 'Monthly',
    shortDescription: 'Complete HR & Payroll including PF, ESI, TDS on salary, payslips.',
    isPopular: false, rating: 4.5, reviewCount: 2340,
    features: ['Salary Processing', 'PF & ESI Filing', 'TDS on Salary', 'Payslip Generation', 'Form 16'],
    documents: ['Employee Details', 'Offer Letters', 'Bank Details'],
    process: [
      { step: 1, title: 'Setup', description: 'Configure payroll structure and components' },
      { step: 2, title: 'Processing', description: 'Calculate salaries, deductions and taxes' },
      { step: 3, title: 'Compliance', description: 'File PF, ESI, TDS returns on time' },
      { step: 4, title: 'Reports', description: 'Generate payslips and reports' },
    ]
  },
  {
    id: 's10', name: 'FSSAI Registration', slug: 'fssai-registration', category: 'compliance',
    icon: '🍽️', price: { base: 2499, governmentFee: 100 }, timeline: '7-15 business days',
    shortDescription: 'Food license for food businesses. Mandatory under Food Safety Act.',
    isPopular: false, rating: 4.6, reviewCount: 4120,
    features: ['FSSAI Basic Registration', 'State License', 'Central License', 'Annual Renewal'],
    documents: ['Aadhaar', 'PAN', 'Business Address Proof', 'Property Documents'],
    process: [
      { step: 1, title: 'Assessment', description: 'Determine license type based on turnover' },
      { step: 2, title: 'Application', description: 'File application on FoSCos portal' },
      { step: 3, title: 'Inspection', description: 'Food safety officer inspection (if applicable)' },
      { step: 4, title: 'License', description: 'Receive FSSAI license certificate' },
    ]
  },
  {
    id: 's11', name: 'MSME/Udyam Registration', slug: 'msme-registration', category: 'compliance',
    icon: '🏭', price: { base: 999, governmentFee: 0 }, timeline: '1-2 business days',
    shortDescription: 'Free MSME certificate to avail government benefits, subsidies and priority lending.',
    isPopular: false, rating: 4.8, reviewCount: 9800,
    features: ['Udyam Certificate', 'Priority Sector Lending', 'Govt Scheme Benefits', 'Collateral-Free Loans'],
    documents: ['Aadhaar', 'PAN', 'Business Details'],
    process: [
      { step: 1, title: 'Details', description: 'Provide business and investment details' },
      { step: 2, title: 'Filing', description: 'File on Udyam Registration portal' },
      { step: 3, title: 'Certificate', description: 'Download Udyam Registration Certificate' },
    ]
  },
  {
    id: 's12', name: 'Director KYC (DIR-3 KYC)', slug: 'dir-3-kyc', category: 'mca',
    icon: '🪪', price: { base: 1499, governmentFee: 0 }, timeline: '1-2 business days',
    shortDescription: 'Annual KYC for company directors. Avoid deactivation of DIN.',
    isPopular: false, rating: 4.7, reviewCount: 6500,
    features: ['DIR-3 KYC Filing', 'OTP-based Verification', 'DIN Activation', 'Acknowledgment'],
    documents: ['Aadhaar', 'PAN', 'Mobile & Email for OTP'],
    process: [
      { step: 1, title: 'Details', description: 'Director provides personal details' },
      { step: 2, title: 'OTP', description: 'Verify Aadhaar-linked mobile and email OTP' },
      { step: 3, title: 'Filing', description: 'File DIR-3 KYC on MCA portal' },
      { step: 4, title: 'Acknowledgment', description: 'Share SRN and acknowledgment' },
    ]
  }
];

export const CATEGORIES = [
  { id: 'startup', label: 'Business Setup', icon: '🚀', description: 'Company, LLP, OPC registration' },
  { id: 'gst', label: 'GST', icon: '📋', description: 'Registration, returns & reconciliation' },
  { id: 'mca', label: 'MCA / ROC', icon: '📁', description: 'ROC filings & director compliance' },
  { id: 'income-tax', label: 'Income Tax', icon: '💰', description: 'ITR filing, TDS, tax planning' },
  { id: 'trademark', label: 'Trademark', icon: '™️', description: 'Search, filing & brand protection' },
  { id: 'payroll', label: 'HR & Payroll', icon: '👥', description: 'Payroll, PF, ESI, payslips' },
  { id: 'compliance', label: 'Compliance', icon: '✅', description: 'FSSAI, MSME, imports & more' },
  { id: 'legal', label: 'Legal', icon: '⚖️', description: 'Agreements, notices, legal advice' },
];

export const STATS = [
  { value: 1300000, label: 'Services Delivered', suffix: '+', prefix: '' },
  { value: 220000, label: 'Happy Clients', suffix: '+', prefix: '' },
  { value: 2000, label: 'Professionals', suffix: '+', prefix: '' },
  { value: 12, label: 'Years Experience', suffix: '', prefix: '' },
];

export const TESTIMONIALS = [
  {
    name: 'Priya Sharma', role: 'Founder, TechVenture Pvt Ltd', location: 'Bangalore',
    text: 'Jeeban & CO. made our company registration super smooth. The team guided us at every step. Got our incorporation certificate in just 15 days!',
    rating: 5, service: 'Private Limited Registration', avatar: 'PS'
  },
  {
    name: 'Rajesh Kumar', role: 'CA, Kumar & Associates', location: 'Mumbai',
    text: 'Been using Jeeban & CO. for GST filings for our 50+ clients. The platform is reliable, and the support team is always ready to help.',
    rating: 5, service: 'GST Return Filing', avatar: 'RK'
  },
  {
    name: 'Anita Reddy', role: 'Co-Founder, Thinai Organics', location: 'Chennai',
    text: 'Registered our trademark and company through Jeeban & CO. Excellent service, transparent pricing, and very professional team.',
    rating: 5, service: 'Trademark + Company Registration', avatar: 'AR'
  },
  {
    name: 'Mohammed Farid', role: 'Proprietor, Farid Exports', location: 'Surat',
    text: 'Got FSSAI license and GST registration done within a week. Very responsive team. Highly recommended for any compliance work.',
    rating: 5, service: 'FSSAI + GST Registration', avatar: 'MF'
  },
];
