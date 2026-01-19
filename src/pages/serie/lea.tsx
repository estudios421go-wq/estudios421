import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';

// IMPORTACIÓN DINÁMICA MAESTRA
const LeaPC = dynamic(() => import('../../components/series/lea/LeaPC'));
const LeaMobile = dynamic(() => import('../../components/series/lea/LeaMobile'));
const LeaTV = dynamic(() => import('../../components/series/lea/LeaTV'));

const LeaPage = () => {
  const [deviceType, setDeviceType] = useState<'pc' | 'mobile' | 'tv' | null>(null);

  useEffect(() => {
    // BLINDAJE: Protección contra clic derecho e inspección de elementos
    const disableProtections = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof MouseEvent && e.button === 2) e.preventDefault();
      if (e instanceof KeyboardEvent) {
        if (e.ctrlKey && (e.key === 'u' || e.key === 's' || e.key === 'i' || e.key === 'j')) e.preventDefault();
        if (e.key === 'F12') e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', (e) => e.preventDefault());
    document.addEventListener('keydown', disableProtections);

    const handleResize = () => {
      const width = window.innerWidth;
      const ua = navigator.userAgent.toLowerCase();
      const isTV = /smarttv|smart-tv|tizen|webos|hbbtv|appletv|googletv|viera|aquos|netcast|roku|sharp|philips/.test(ua);

      if (isTV) {
        setDeviceType('tv');
      } else if (width < 768) {
        setDeviceType('mobile');
      } else {
        setDeviceType('pc');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('keydown', disableProtections);
      document.removeEventListener('contextmenu', (e) => e.preventDefault());
    };
  }, []);

  if (!deviceType) return <div className="bg-black min-h-screen" />;

  return (
    <>
      <Head>
        <style>{`
          img { 
            -webkit-user-drag: none; 
            user-drag: none; 
            pointer-events: none; 
          }
          body { 
            -webkit-user-select: ${deviceType === 'mobile' ? 'auto' : 'none'}; 
            -moz-user-select: ${deviceType === 'mobile' ? 'auto' : 'none'}; 
            -ms-user-select: ${deviceType === 'mobile' ? 'auto' : 'none'}; 
            user-select: ${deviceType === 'mobile' ? 'auto' : 'none'}; 
            background-color: black;
          }
          iframe { pointer-events: auto; }
        `}</style>
      </Head>
      {deviceType === 'pc' && <LeaPC />}
      {deviceType === 'mobile' && <LeaMobile />}
      {deviceType === 'tv' && <LeaTV />}
    </>
  );
};

export default LeaPage;
