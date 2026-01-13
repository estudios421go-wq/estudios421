import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// IMPORTACIÓN DINÁMICA DE LOS TRES DISEÑOS
const LeaPC = dynamic(() => import('../../components/series/lea/LeaPC'));
const LeaMobile = dynamic(() => import('../../components/series/lea/LeaMobile'));
const LeaTV = dynamic(() => import('../../components/series/lea/LeaTV'));

const LeaPage = () => {
  const [deviceType, setDeviceType] = useState<'pc' | 'mobile' | 'tv' | null>(null);

  useEffect(() => {
    const detectDevice = () => {
      const width = window.innerWidth;
      const ua = navigator.userAgent.toLowerCase();
      
      // 1. Detección exhaustiva de Smart TV
      const isTV = /smarttv|smart-tv|tizen|webos|hbbtv|appletv|googletv|android tv|viera|aquos|netcast|vizio|roku|sharp|philips/.test(ua);

      // 2. Priorización de renderizado
      if (isTV) {
        setDeviceType('tv');
      } else if (width < 768) {
        setDeviceType('mobile');
      } else if (width >= 768 && width <= 1366) {
        // En tablets u ordenadores pequeños, si no es TV, es PC (o Tablet que usa versión PC)
        setDeviceType('pc');
      } else {
        setDeviceType('pc');
      }
    };

    detectDevice();
    window.addEventListener('resize', detectDevice);
    return () => window.removeEventListener('resize', detectDevice);
  }, []);

  // Pantalla de carga profesional mientras detecta
  if (!deviceType) return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-[#FF8A00] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <>
      {deviceType === 'pc' && <LeaPC />}
      {deviceType === 'mobile' && <LeaMobile />}
      {deviceType === 'tv' && <LeaTV />}
    </>
  );
};

export default LeaPage;
