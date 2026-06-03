import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SERVICES_DATA } from '../utils/servicesData';

const STORAGE_KEY = 'admin_service_overrides';
const CUSTOM_KEY  = 'admin_custom_services';
const API_BASE    = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const ServicesContext = createContext(null);

function applyOverrides(dbServices) {
  let overrides = {};
  let customServices = [];
  try { overrides = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch {}
  try { customServices = JSON.parse(localStorage.getItem(CUSTOM_KEY)) || []; } catch {}

  // Build a map of slug -> DB service (source of truth for priceHidden)
  const dbMap = {};
  (dbServices || []).forEach(s => { dbMap[s.slug] = s; });

  const process = (s) => {
    const ov = overrides[s.id] || {};
    const base          = ov.base          !== undefined ? ov.base          : s.price.base;
    const governmentFee = ov.governmentFee !== undefined ? ov.governmentFee : (s.price.governmentFee || 0);
    const total         = Math.round(base + (base * 0.18) + governmentFee);
    // priceHidden comes from DB — all users see the same value
    const priceHidden   = dbMap[s.slug]?.priceHidden ?? ov.priceHidden ?? false;
    return {
      ...s,
      price: { ...s.price, base, governmentFee, total },
      hidden:      ov.hidden ?? false,
      priceHidden,
    };
  };

  return [...SERVICES_DATA, ...customServices].map(process);
}

export function ServicesProvider({ children }) {
  const [allServices, setAllServices] = useState(() => applyOverrides([]));

  const refresh = useCallback(() => {
    fetch(`${API_BASE}/services?limit=100`)
      .then(r => r.json())
      .then(data => setAllServices(applyOverrides(data.services || [])))
      .catch(() => setAllServices(applyOverrides([])));
  }, []);

  useEffect(() => {
    // Initial load
    refresh();

    // Re-fetch when admin makes a change on the same browser
    window.addEventListener('storage', refresh);
    window.addEventListener('admin_service_update', refresh);

    // Poll every 30s so OTHER browsers/devices pick up admin changes automatically
    const poll = setInterval(refresh, 30000);

    return () => {
      window.removeEventListener('storage', refresh);
      window.removeEventListener('admin_service_update', refresh);
      clearInterval(poll);
    };
  }, [refresh]);

  const services            = allServices.filter(s => !s.hidden);
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