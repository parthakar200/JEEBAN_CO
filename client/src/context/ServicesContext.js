import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SERVICES_DATA } from '../utils/servicesData';

const STORAGE_KEY = 'admin_service_overrides';
const CUSTOM_KEY  = 'admin_custom_services';

const ServicesContext = createContext(null);

function applyOverrides() {
  let overrides = {};
  let customServices = [];
  try { overrides = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch {}
  try { customServices = JSON.parse(localStorage.getItem(CUSTOM_KEY)) || []; } catch {}

  const process = (s) => {
    const ov = overrides[s.id] || {};
    const base         = ov.base         !== undefined ? ov.base         : s.price.base;
    const governmentFee = ov.governmentFee !== undefined ? ov.governmentFee : (s.price.governmentFee || 0);
    const total        = Math.round(base + (base * 0.18) + governmentFee);
    return {
      ...s,
      price: { ...s.price, base, governmentFee, total },
      hidden:      ov.hidden      ?? false,
      priceHidden: ov.priceHidden ?? false,
    };
  };

  return [...SERVICES_DATA, ...customServices].map(process);
}

export function ServicesProvider({ children }) {
  const [allServices, setAllServices] = useState(applyOverrides);

  const refresh = useCallback(() => setAllServices(applyOverrides()), []);

  useEffect(() => {
    window.addEventListener('storage', refresh);
    window.addEventListener('admin_service_update', refresh);
    return () => {
      window.removeEventListener('storage', refresh);
      window.removeEventListener('admin_service_update', refresh);
    };
  }, [refresh]);

  // Public view: exclude fully hidden services
  const services = allServices.filter(s => !s.hidden);
  // All including hidden: for admin panel
  const allServicesIncHidden = allServices;

  return (
    <ServicesContext.Provider value={{ services, allServicesIncHidden, refresh }}>
      {children}
    </ServicesContext.Provider>
  );
}

export const useServices = () => {
  const ctx = useContext(ServicesContext);
  if (!ctx) throw new Error('useServices must be used within ServicesProvider');
  return ctx;
};
