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
  isPopular: Boolean, isActive: Boolean, rating: Number, reviewCount: Number,
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
    price: { base: 6999, gst: 18, governmentFee: 2500, total: 11758 },
    features: ['2 Director DIN', '2 Digital Signatures', 'Name Approval (RUN)', 'MOA & AOA Drafting', 'Certificate of Incorporation', 'PAN & TAN', 'Bank Account Opening Assistance', 'GST Registration'],
    documents: ['Aadhaar Card', 'PAN Card', 'Passport Size Photo', 'Mobile Number & Email', 'Proof of Registered Office', 'Latest Utility Bill'],
    timeline: '15-20 business days',
    isPopular: true, isActive: true, rating: 4.8, reviewCount: 12450, icon: '🏢',
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
    price: { base: 4999, gst: 18, governmentFee: 1500, total: 8148 },
    features: ['2 Partner DPIN', '2 Digital Signatures', 'Name Approval (LLP-RUN)', 'LLP Agreement Drafting', 'Certificate of Incorporation', 'PAN of LLP'],
    documents: ['Aadhaar Card', 'PAN Card', 'Passport Size Photo', 'Office Address Proof'],
    timeline: '10-15 business days',
    isPopular: true, isActive: true, rating: 4.7, reviewCount: 6820, icon: '🤝',
    process: [
      { step: 1, title: 'Partner Details', description: 'Provide partner information and capital contribution' },
      { step: 2, title: 'Name Reservation', description: 'LLP-RUN name reservation with MCA' },
      { step: 3, title: 'Incorporation', description: 'File FiLLiP form with MCA' },
      { step: 4, title: 'LLP Agreement', description: 'Draft and file LLP Agreement within 30 days' },
    ]
  },
  {
    name: 'GST Registration',
    slug: 'gst-registration',
    category: 'gst',
    description: 'Mandatory for businesses with turnover exceeding ₹20 lakhs (₹10 lakhs for North-East states). Get your GSTIN within 5-7 business days.',
    shortDescription: 'Mandatory for businesses with turnover >20 lakhs. Get GSTIN in days.',
    price: { base: 1499, gst: 18, governmentFee: 0, total: 1769 },
    features: ['GSTIN Number', 'GST Certificate', 'Digital Signature (if required)', 'Guidance on First GST Return', 'GST Login Credentials'],
    documents: ['PAN Card', 'Aadhaar Card', 'Business Address Proof', 'Bank Statement', 'Cancelled Cheque'],
    timeline: '5-7 business days',
    isPopular: true, isActive: true, rating: 4.9, reviewCount: 28760, icon: '📋',
    process: [
      { step: 1, title: 'Details', description: 'Provide business and promoter details' },
      { step: 2, title: 'Application', description: 'File GST REG-01 on GST portal' },
      { step: 3, title: 'Verification', description: 'GST officer reviews application' },
      { step: 4, title: 'GSTIN', description: 'Receive GSTIN and GST Certificate' },
    ]
  },
  {
    name: 'Trademark Registration',
    slug: 'trademark-registration',
    category: 'trademark',
    description: 'Protect your brand by registering your trademark with the IP India office. Includes trademark search, application filing, and TM-A acknowledgment.',
    shortDescription: 'Protect your brand. File trademark application with IP India.',
    price: { base: 6499, gst: 18, governmentFee: 4500, total: 13169 },
    features: ['Comprehensive Trademark Search', 'Application Filing (TM-A)', 'TM-A Acknowledgment', 'Trademark Certificate (post registration)', 'Brand Monitoring Alerts', 'Opposition Handling Assistance'],
    documents: ['Applicant PAN Card', 'Business Registration Proof', 'Logo / Word Mark File', 'Power of Attorney'],
    timeline: '18-24 months',
    isPopular: true, isActive: true, rating: 4.7, reviewCount: 8930, icon: '™️',
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
    price: { base: 999, gst: 18, governmentFee: 0, total: 1179 },
    features: ['ITR-1 to ITR-6', 'Tax Computation', 'Refund Status Tracking', 'Form 26AS Reconciliation', 'Expert Review', 'e-Verification Assistance'],
    documents: ['Form 16', 'Bank Statements', 'Investment Proofs (80C, 80D)', 'Aadhaar & PAN Card'],
    timeline: '1-3 business days',
    isPopular: true, isActive: true, rating: 4.9, reviewCount: 34200, icon: '💰',
    process: [
      { step: 1, title: 'Data Collection', description: 'Provide income and investment details' },
      { step: 2, title: 'Tax Computation', description: 'Calculate tax liability and deductions' },
      { step: 3, title: 'Review', description: 'Expert reviews your return before filing' },
      { step: 4, title: 'Filing', description: 'File ITR and send acknowledgment (ITR-V)' },
    ]
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing
    await Service.deleteMany({});
    await User.deleteMany({ role: 'admin' });
    console.log('🗑️  Cleared existing data');

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
    console.log('✅ Admin user created: admin@jeebanco.com / admin@123');

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
}

seed();
