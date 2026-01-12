import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// IMPORTACIÓN DINÁMICA DE LOS TRES DISEÑOS
const LeaPC = dynamic(() => import('../components/series/lea/LeaPC'));
const LeaMobile = dynamic(() => import('../components/series/lea/LeaMobile'));
const LeaTV = dynamic(() => import('../components/series/lea/LeaTV'));

const LeaPage = () => {
  const [deviceType, setDeviceType] = useState<'pc' | 'mobile' | 'tv' | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const ua = navigator.userAgent.toLowerCase();
      
      if (width < 768) {
        setDeviceType('mobile');
      } else if (ua.includes('smart-tv') || ua.includes('tizen') || ua.includes('webos') || ua.includes('hbbtv')) {
        setDeviceType('tv');
      } else {
        setDeviceType('pc');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!deviceType) return <div className="bg-black min-h-screen" />;

  return (
    <>
      {deviceType === 'pc' && <LeaPC />}
      {deviceType === 'mobile' && <LeaMobile />}
      {deviceType === 'tv' && <LeaTV />}
    </>
  );
};

export default LeaPage;
