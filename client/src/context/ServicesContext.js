import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SERVICES_DATA } from '../utils/servicesData';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Fallback map from hardcoded data, keyed by slug
const FALLBACK_MAP = {};
SERVICES_DATA.forEach(s => { FALLBACK_MAP[s.slug] = s; });

const ServicesContext = createContext(null);

/**
 * Merge DB record (source of truth for price/hidden/priceHidden)
 * with hardcoded data (source of truth for features/docs/process/icon).
 * If a service exists in DB, DB wins for all admin-editable fields.
 * If a service only exists in hardcoded data (not yet seeded), use hardcoded values.
 */
function mergeServices(dbServices) {
  const dbMap = {};
  (dbServices || []).forEach(s => { dbMap[s.slug] = s; });

  // Start from hardcoded list to preserve ordering and non-DB services
  const merged = SERVICES_DATA.map(local => {
    const db = dbMap[local.slug];
    if (!db) {
      // Not in DB yet — use hardcoded defaults, visible by default
      return { ...local, hidden: false, priceHidden: false };
    }
    const base = db.price?.base ?? local.price.base;
    const governmentFee = db.price?.governmentFee ?? local.price.governmentFee ?? 0;
    const total = Math.round(base + (base * 0.18) + governmentFee);
    return {
      ...local,
      // DB wins for admin-controlled fields
      price: { ...local.price, base, governmentFee, total },
      priceHidden: db.priceHidden ?? false,
      // isActive=false in DB means admin hid it
      hidden: db.isActive === false,
    };
  });

  // Also append any DB services not in SERVICES_DATA (custom/new ones)
  (dbServices || []).forEach(db => {
    if (!FALLBACK_MAP[db.slug]) {
      const base = db.price?.base ?? 0;
      const governmentFee = db.price?.governmentFee ?? 0;
      const total = Math.round(base + (base * 0.18) + governmentFee);
      merged.push({
        ...db,
        id: db._id,
        price: { base, governmentFee, total },
        priceHidden: db.priceHidden ?? false,
        hidden: db.isActive === false,
      });
    }
  });

  return merged;
}

export function ServicesProvider({ children }) {
  const [allServices, setAllServices] = useState(() => mergeServices([]));

  const refresh = useCallback(() => {
    fetch(`${API_BASE}/services?limit=100&all=true`)
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then(data => setAllServices(mergeServices(data.services || [])))
      .catch(() => {
        // Fallback to hardcoded data if server is unreachable
        setAllServices(mergeServices([]));
      });
  }, []);

  useEffect(() => {
    refresh();
    // Re-fetch when admin saves a change (same tab)
    window.addEventListener('admin_service_update', refresh);
    // Poll every 30s so other browsers/devices pick up changes
    const poll = setInterval(refresh, 30000);
    return () => {
      window.removeEventListener('admin_service_update', refresh);
      clearInterval(poll);
    };
  }, [refresh]);

  const services             = allServices.filter(s => !s.hidden);
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