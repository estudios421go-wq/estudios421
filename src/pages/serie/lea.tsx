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
      if (e instanceof MouseEvent && e.button === 2) e.preventDefault(); // Clic derecho
      if (e instanceof KeyboardEvent) {
        if (e.ctrlKey && (e.key === 'u' || e.key === 's' || e.key === 'i' || e.key === 'j')) e.preventDefault(); // Ctrl+U, S, I, J
        if (e.key === 'F12') e.preventDefault(); // F12
      }
    };

    document.addEventListener('contextmenu', (e) => e.preventDefault());
    document.addEventListener('keydown', disableProtections);

    // DETECCIÓN MAESTRA DE DISPOSITIVO
    const handleResize = () => {
      const width = window.innerWidth;
      const ua = navigator.userAgent.toLowerCase();
      
      // Detección Smart TV reforzada
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
    };
  }, []);

  if (!deviceType) return <div className="bg-black min-h-screen" />;

  return (
    <>
      <Head>
        {/* Blindaje de imágenes: evita arrastrar y soltar */}
        <style>{`
          img { -webkit-user-drag: none; -khtml-user-drag: none; -moz-user-drag: none; -o-user-drag: none; user-drag: none; pointer-events: none; }
          body { -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }
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
