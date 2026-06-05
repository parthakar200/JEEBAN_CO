import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { API } from './AuthContext';

const ServicesContext = createContext(null);

export function ServicesProvider({ children }) {
  const [allServices, setAllServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);

  const fetchServices = useCallback(() => {
    setServicesLoading(true);
    API.get('/services?all=true')
      .then(res => setAllServices(res.data.services || res.data || []))
      .catch(() => setAllServices([]))
      .finally(() => setServicesLoading(false));
  }, []);

  useEffect(() => {
    fetchServices();
    window.addEventListener('admin_service_update', fetchServices);
    return () => window.removeEventListener('admin_service_update', fetchServices);
  }, [fetchServices]);


  const services = allServices.filter(s => s.isActive !== false);
  const allServicesIncHidden = allServices;

  return (
    <ServicesContext.Provider value={{ services, allServicesIncHidden, servicesLoading, refresh: fetchServices }}>
      {children}
    </ServicesContext.Provider>
  );
}

export const useServices = () => {
  const ctx = useContext(ServicesContext);
  if (!ctx) throw new Error('useServices must be used within ServicesProvider');
  return ctx;
};