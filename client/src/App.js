import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import CheckoutPage from './pages/CheckoutPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import { NotFoundPage, TermsPage, PrivacyPage } from './pages/StaticPages';
import { ServicesProvider } from './context/ServicesContext';
import Disclaimer from './components/ui/Disclaimer';
import './styles/globals.css';

const AUTH_PATHS = ['/login', '/register'];

function Layout({ children }) {
  const path = window.location.pathname;
  const isAuth = AUTH_PATHS.includes(path);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>{children}</main>
      {!isAuth && <Footer />}
    </div>
  );
}

export default function App() {
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  useEffect(() => {
  const accepted = sessionStorage.getItem('disclaimerAccepted');
  if (!accepted) setShowDisclaimer(true);
}, []);

  return (
    <Router>
      <AuthProvider>
        <ServicesProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                borderRadius: '10px',
                boxShadow: '0 4px 20px rgba(0,0,0,.12)',
              },
              success: { iconTheme: { primary: '#16a34a', secondary: 'white' } },
              error: { iconTheme: { primary: '#ef4444', secondary: 'white' } },
            }}
          />
          {showDisclaimer ? (
            <Disclaimer onAccept={() => setShowDisclaimer(false)} />
          ) : (
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/services/:slug" element={<ServiceDetailPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/admin" element={<AdminDashboardPage />} />
                <Route path="/checkout/:serviceId" element={<CheckoutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Layout>
          )}
        </ServicesProvider>
      </AuthProvider>
    </Router>
  );
}