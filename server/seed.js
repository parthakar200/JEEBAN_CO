/**
 * Database Seeder — run with: node server/seed.js
 * Seeds initial services, admin user, and sample data
 */
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/jeebanco';

// Inline models to avoid import issues
const userSchema = new mongoose.Schema({
  name: String, email: { type: String, unique: true }, password: String,
  role: { type: String, default: 'user' }, phone: String, isVerified: Boolean,
  createdAt: { type: Date, default: Date.now }
});
const serviceSchema = new mongoose.Schema({
  name: String, slug: { type: String, unique: true }, category: String,
  description: String, shortDescription: String,
  price: { base: Number, gst: Number, governmentFee: Number, total: Number },
  features: [String], documents: [String], timeline: String,
  process: [{ step: Number, title: String, description: String }],
  faqs: [{ question: String, answer: String }],
  isPopular: Boolean, isActive: Boolean, priceHidden: Boolean,
  rating: Number, reviewCount: Number,
  icon: String, createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Service = mongoose.model('Service', serviceSchema);


const SERVICES = [
  {
    name: 'Private Limited Company Registration',
    slug: 'private-limited-company',
    category: 'startup',
    description: 'Register a Private Limited Company with MCA. Includes DIN for 2 directors, DSC, name approval via RUN, and Certificate of Incorporation via SPICe+.',
    shortDescription: 'Register a Pvt Ltd Company with MCA. DIN, DSC, Name Approval included.',
    price: { base: 0, gst: 0, governmentFee: 0, total: 0 },
    features: ['2 Director DIN', '2 Digital Signatures', 'Name Approval (RUN)', 'MOA & AOA Drafting', 'Certificate of Incorporation', 'PAN & TAN', 'Bank Account Opening Assistance', 'GST Registration'],
    documents: ['Aadhaar Card', 'PAN Card', 'Passport Size Photo', 'Mobile Number & Email', 'Proof of Registered Office', 'Latest Utility Bill'],
    timeline: '15-20 business days',
    isPopular: true, isActive: true, priceHidden: false, rating: 4.8, reviewCount: 12450, icon: '🏢',
    process: [
      { step: 1, title: 'Application', description: 'Fill in business details & director information' },
      { step: 2, title: 'Document Upload', description: 'Upload required KYC and address proofs' },
      { step: 3, title: 'Name Approval', description: 'We apply for RUN name reservation with MCA' },
      { step: 4, title: 'Incorporation', description: 'File SPICe+ with ROC and receive Certificate of Incorporation' },
    ],
    faqs: [
      { question: 'What is the minimum capital required?', answer: 'There is no minimum paid-up capital requirement for a Private Limited Company in India.' },
      { question: 'How many directors are required?', answer: 'A minimum of 2 directors and maximum of 15 directors are allowed.' },
    ]
  },
  {
    name: 'LLP Registration',
    slug: 'llp-registration',
    category: 'startup',
    description: 'Register a Limited Liability Partnership. Ideal for professionals and service firms seeking partnership structure with limited liability.',
    shortDescription: 'Register a Limited Liability Partnership. Ideal for professionals and service firms.',
    price: { base: 0, gst: 0, governmentFee: 0, total: 0 },
    features: ['2 Partner DPIN', '2 Digital Signatures', 'Name Approval (LLP-RUN)', 'LLP Agreement Drafting', 'Certificate of Incorporation', 'PAN of LLP'],
    documents: ['Aadhaar Card', 'PAN Card', 'Passport Size Photo', 'Office Address Proof'],
    timeline: '10-15 business days',
    isPopular: true, isActive: true, priceHidden: false, rating: 4.7, reviewCount: 6820, icon: '🤝',
    process: [
      { step: 1, title: 'Partner Details', description: 'Provide partner information and capital contribution' },
      { step: 2, title: 'Name Reservation', description: 'LLP-RUN name reservation with MCA' },
      { step: 3, title: 'Incorporation', description: 'File FiLLiP form with MCA' },
      { step: 4, title: 'LLP Agreement', description: 'Draft and file LLP Agreement within 30 days' },
    ]
  },
  {
    name: 'One Person Company',
    slug: 'opc-registration',
    category: 'startup',
    description: 'Register a One Person Company in India. Perfect for solo entrepreneurs who want limited liability protection with single ownership.',
    shortDescription: 'Perfect for solo entrepreneurs. Single owner with limited liability protection.',
    price: { base: 0, gst: 0, governmentFee: 0, total: 0 },
    features: ['1 Director DIN', '1 Digital Signature', 'Name Approval', 'MOA & AOA', 'Certificate of Incorporation', 'PAN & TAN'],
    documents: ['Aadhaar Card', 'PAN Card', 'Nominee Details', 'Office Proof'],
    timeline: '12-18 business days',
    isPopular: false, isActive: true, priceHidden: false, rating: 4.6, reviewCount: 3240, icon: '👤',
    process: [
      { step: 1, title: 'Owner Details', description: 'Submit director and nominee information' },
      { step: 2, title: 'Documents', description: 'Upload identity and address proofs' },
      { step: 3, title: 'Filing', description: 'File SPICe+ with ROC' },
      { step: 4, title: 'Certificate', description: 'Receive Certificate of Incorporation' },
    ]
  },
  {
    name: 'GST Registration',
    slug: 'gst-registration',
    category: 'gst',
    description: 'Mandatory for businesses with turnover exceeding ₹20 lakhs (₹10 lakhs for North-East states). Get your GSTIN within 5-7 business days.',
    shortDescription: 'Mandatory for businesses with turnover >20 lakhs. Get GSTIN in days.',
    price: { base: 0, gst: 0, governmentFee: 0, total: 0 },
    features: ['GSTIN Number', 'GST Certificate', 'Digital Signature (if required)', 'Guidance on First GST Return', 'GST Login Credentials'],
    documents: ['PAN Card', 'Aadhaar Card', 'Business Address Proof', 'Bank Statement', 'Cancelled Cheque'],
    timeline: '5-7 business days',
    isPopular: true, isActive: true, priceHidden: false, rating: 4.9, reviewCount: 28760, icon: '📋',
    process: [
      { step: 1, title: 'Details', description: 'Provide business and promoter details' },
      { step: 2, title: 'Application', description: 'File GST REG-01 on GST portal' },
      { step: 3, title: 'Verification', description: 'GST officer reviews application' },
      { step: 4, title: 'GSTIN', description: 'Receive GSTIN and GST Certificate' },
    ]
  },
  {
    name: 'GST Return Filing',
    slug: 'gst-return-filing',
    category: 'gst',
    description: 'Comprehensive GST return filing covering GSTR-1, GSTR-3B, and annual GSTR-9 with ITC reconciliation to ensure full compliance.',
    shortDescription: 'GSTR-1, GSTR-3B, GSTR-9 filing. Never miss a deadline again.',
    price: { base: 0, gst: 0, governmentFee: 0, total: 0 },
    features: ['GSTR-1 Filing', 'GSTR-3B Filing', 'ITC Reconciliation', 'Late Fee Assistance', 'Annual Return GSTR-9'],
    documents: ['Sales Invoices', 'Purchase Invoices', 'Bank Statements'],
    timeline: 'Monthly/Quarterly',
    isPopular: true, isActive: true, priceHidden: false, rating: 4.8, reviewCount: 19500, icon: '📊',
    process: [
      { step: 1, title: 'Data Collection', description: 'Share invoice and purchase data' },
      { step: 2, title: 'Reconciliation', description: 'Match sales and purchase data with GSTR-2B' },
      { step: 3, title: 'Filing', description: 'File GSTR-1 and GSTR-3B on time' },
      { step: 4, title: 'Confirmation', description: 'Share filed return acknowledgment' },
    ]
  },
  {
    name: 'Trademark Registration',
    slug: 'trademark-registration',
    category: 'trademark',
    description: 'Protect your brand by registering your trademark with the IP India office. Includes trademark search, application filing, and TM-A acknowledgment.',
    shortDescription: 'Protect your brand. File trademark application with IP India.',
    price: { base: 0, gst: 0, governmentFee: 0, total: 0 },
    features: ['Comprehensive Trademark Search', 'Application Filing (TM-A)', 'TM-A Acknowledgment', 'Trademark Certificate (post registration)', 'Brand Monitoring Alerts', 'Opposition Handling Assistance'],
    documents: ['Applicant PAN Card', 'Business Registration Proof', 'Logo / Word Mark File', 'Power of Attorney'],
    timeline: '18-24 months',
    isPopular: true, isActive: true, priceHidden: false, rating: 4.7, reviewCount: 8930, icon: '™️',
    process: [
      { step: 1, title: 'Search', description: 'Comprehensive trademark search for conflicts' },
      { step: 2, title: 'Application', description: 'File TM-A with IP India' },
      { step: 3, title: 'Examination', description: 'Examiner reviews and issues examination report' },
      { step: 4, title: 'Registration', description: 'Trademark advertised and registered after opposition period' },
    ]
  },
  {
    name: 'ITR Filing',
    slug: 'itr-filing',
    category: 'income-tax',
    description: 'Income Tax Return filing for individuals, salaried employees, professionals, and businesses. Expert review included.',
    shortDescription: 'Income Tax Return filing for individuals, professionals, and businesses.',
    price: { base: 0, gst: 0, governmentFee: 0, total: 0 },
    features: ['ITR-1 to ITR-6', 'Tax Computation', 'Refund Status Tracking', 'Form 26AS Reconciliation', 'Expert Review', 'e-Verification Assistance'],
    documents: ['Form 16', 'Bank Statements', 'Investment Proofs (80C, 80D)', 'Aadhaar & PAN Card'],
    timeline: '1-3 business days',
    isPopular: true, isActive: true, priceHidden: false, rating: 4.9, reviewCount: 34200, icon: '💰',
    process: [
      { step: 1, title: 'Data Collection', description: 'Provide income and investment details' },
      { step: 2, title: 'Tax Computation', description: 'Calculate tax liability and deductions' },
      { step: 3, title: 'Review', description: 'Expert reviews your return before filing' },
      { step: 4, title: 'Filing', description: 'File ITR and send acknowledgment (ITR-V)' },
    ]
  },
  {
    name: 'ROC Annual Filing',
    slug: 'roc-annual-filing',
    category: 'mca',
    description: 'Complete ROC annual compliance for Private Limited Companies. Covers MGT-7 (Annual Return), AOC-4 (Financial Statements), and DIR-3 KYC for all directors.',
    shortDescription: 'MGT-7, AOC-4, DIR-3 KYC annual compliance for private limited companies.',
    price: { base: 0, gst: 0, governmentFee: 0, total: 0 },
    features: ['MGT-7 Filing', 'AOC-4 Filing', 'Director KYC', 'Annual Report', 'Board Resolution'],
    documents: ['Financial Statements', 'Director Details', 'Shareholder Details', 'Bank Statements'],
    timeline: '7-10 business days',
    isPopular: false, isActive: true, priceHidden: false, rating: 4.6, reviewCount: 5670, icon: '📁',
    process: [
      { step: 1, title: 'Data', description: 'Collect financial and director data' },
      { step: 2, title: 'Accounts', description: 'Prepare financial statements if needed' },
      { step: 3, title: 'Forms', description: 'File MGT-7 and AOC-4 with MCA' },
      { step: 4, title: 'Confirmation', description: 'Share filed acknowledgments' },
    ]
  },
  {
    name: 'Payroll Management',
    slug: 'payroll-management',
    category: 'payroll',
    description: 'End-to-end payroll management including salary processing, PF & ESI compliance, TDS on salary, payslip generation, and Form 16 issuance.',
    shortDescription: 'Complete HR & Payroll including PF, ESI, TDS on salary, payslips.',
    price: { base: 0, gst: 0, governmentFee: 0, total: 0 },
    features: ['Salary Processing', 'PF & ESI Filing', 'TDS on Salary', 'Payslip Generation', 'Form 16'],
    documents: ['Employee Details', 'Offer Letters', 'Bank Details'],
    timeline: 'Monthly',
    isPopular: false, isActive: true, priceHidden: false, rating: 4.5, reviewCount: 2340, icon: '👥',
    process: [
      { step: 1, title: 'Setup', description: 'Configure payroll structure and components' },
      { step: 2, title: 'Processing', description: 'Calculate salaries, deductions and taxes' },
      { step: 3, title: 'Compliance', description: 'File PF, ESI, TDS returns on time' },
      { step: 4, title: 'Reports', description: 'Generate payslips and reports' },
    ]
  },
  {
    name: 'FSSAI Registration',
    slug: 'fssai-registration',
    category: 'compliance',
    description: 'Obtain your FSSAI food license for food businesses. We handle Basic Registration, State License, and Central License on the FoSCos portal.',
    shortDescription: 'Food license for food businesses. Mandatory under Food Safety Act.',
    price: { base: 0, gst: 0, governmentFee: 0, total: 0 },
    features: ['FSSAI Basic Registration', 'State License', 'Central License', 'Annual Renewal'],
    documents: ['Aadhaar', 'PAN', 'Business Address Proof', 'Property Documents'],
    timeline: '7-15 business days',
    isPopular: false, isActive: true, priceHidden: false, rating: 4.6, reviewCount: 4120, icon: '🍽️',
    process: [
      { step: 1, title: 'Assessment', description: 'Determine license type based on turnover' },
      { step: 2, title: 'Application', description: 'File application on FoSCos portal' },
      { step: 3, title: 'Inspection', description: 'Food safety officer inspection (if applicable)' },
      { step: 4, title: 'License', description: 'Receive FSSAI license certificate' },
    ]
  },
  {
    name: 'MSME/Udyam Registration',
    slug: 'msme-registration',
    category: 'compliance',
    description: 'Register your business under MSME/Udyam and unlock government subsidies, priority sector lending, and collateral-free loan benefits.',
    shortDescription: 'Free MSME certificate to avail government benefits, subsidies and priority lending.',
    price: { base: 00, gst: 00, governmentFee: 00, total: 00 },
    features: ['Udyam Certificate', 'Priority Sector Lending', 'Govt Scheme Benefits', 'Collateral-Free Loans'],
    documents: ['Aadhaar', 'PAN', 'Business Details'],
    timeline: '1-2 business days',
    isPopular: false, isActive: true, priceHidden: false, rating: 4.8, reviewCount: 9800, icon: '🏭',
    process: [
      { step: 1, title: 'Details', description: 'Provide business and investment details' },
      { step: 2, title: 'Filing', description: 'File on Udyam Registration portal' },
      { step: 3, title: 'Certificate', description: 'Download Udyam Registration Certificate' },
    ]
  },
  {
    name: 'Director KYC (DIR-3 KYC)',
    slug: 'dir-3-kyc',
    category: 'mca',
    description: 'File the mandatory DIR-3 KYC to keep your Director Identification Number (DIN) active. Includes Aadhaar OTP-based verification and MCA portal filing.',
    shortDescription: 'Annual KYC for company directors. Avoid deactivation of DIN.',
    price: { base: 0, gst: 0, governmentFee: 0, total: 0 },
    features: ['DIR-3 KYC Filing', 'OTP-based Verification', 'DIN Activation', 'Acknowledgment'],
    documents: ['Aadhaar', 'PAN', 'Mobile & Email for OTP'],
    timeline: '1-2 business days',
    isPopular: false, isActive: true, priceHidden: false, rating: 4.7, reviewCount: 6500, icon: '🪪',
    process: [
      { step: 1, title: 'Details', description: 'Director provides personal details' },
      { step: 2, title: 'OTP', description: 'Verify Aadhaar-linked mobile and email OTP' },
      { step: 3, title: 'Filing', description: 'File DIR-3 KYC on MCA portal' },
      { step: 4, title: 'Acknowledgment', description: 'Share SRN and acknowledgment' },
    ]
  },
  {
    name: 'GST Return Filing (Monthly)',
    slug: 'gst-return-filing-monthly',
    category: 'gst',
    description: 'Monthly GST return filing plan for businesses with higher transaction volumes.',
    shortDescription: 'Monthly GSTR-1 and GSTR-3B filing with dedicated support.',
    price: { base: 000, gst: 000, governmentFee: 000, total: 000 },
    features: ['Monthly GSTR-1', 'Monthly GSTR-3B', 'ITC Reconciliation', 'Dedicated Support'],
    documents: ['Sales Invoices', 'Purchase Invoices', 'Bank Statements'],
    timeline: 'Monthly',
    isPopular: false, isActive: true, priceHidden: false, rating: 4.7, reviewCount: 3200, icon: '📊',
    process: [
      { step: 1, title: 'Data Collection', description: 'Share monthly invoice and purchase data' },
      { step: 2, title: 'Reconciliation', description: 'Match with GSTR-2B' },
      { step: 3, title: 'Filing', description: 'File GSTR-1 and GSTR-3B' },
      { step: 4, title: 'Confirmation', description: 'Share acknowledgment' },
    ]
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing services and admin
    await Service.deleteMany({});
    await User.deleteMany({ role: 'admin' });
    console.log('🗑️  Cleared existing services and admin user');

    const TeamMember = require('./models/TeamMember');

await TeamMember.deleteMany({});
await TeamMember.insertMany([
  { name: 'Jeebanjyoti Dashmohapatra', role: 'Founder & Managing Partner', bio: 'M.COM. LLB with 10+ years in corporate law and compliance', avatar: '', isPinned: true, order: 1 },
  { name: 'Jagannath Jena', role: 'Chartered Accountant (CA)', bio: 'CA CS M.COM. with 5+ years Expert in business process automation and scale', avatar: '', isPinned: true, order: 2 },
  { name: 'Madhusudan Behera', role: 'Senior Consultant', bio: 'Led engineering at top fintech companies', avatar: '', isPinned: false, order: 3 },
  { name: 'Mihir Mohapatra', role: 'Senior Consultant', bio: 'CS with deep expertise in MCA and SEBI regulations', avatar: '', isPinned: false, order: 4 },
]);
console.log('✅ Seeded 4 team members');

    // Create services
    await Service.insertMany(SERVICES);
    console.log(`✅ Seeded ${SERVICES.length} services`);

    // Create admin user
    const hashedPassword = await bcrypt.hash('Admin@123', 12);
    await User.create({
      name: 'Admin User',
      email: 'admin@jeebanco.com',
      password: hashedPassword,
      role: 'admin',
      isVerified: true,
    });
    console.log('✅ Admin user created: admin@jeebanco.com / Admin@123');

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
}

seed();