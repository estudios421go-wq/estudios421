import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// IMPORTACIÓN DINÁMICA DE LOS TRES DISEÑOS
const GenesisPC = dynamic(() => import('../../components/series/genesis/GenesisPC'));
const GenesisMobile = dynamic(() => import('../../components/series/genesis/GenesisMobile'));
const GenesisTV = dynamic(() => import('../../components/series/genesis/GenesisTV'));

const GenesisPage = () => {
  const [deviceType, setDeviceType] = useState<'pc' | 'mobile' | 'tv' | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      // Detección inteligente por ancho de pantalla
      if (width < 768) {
        setDeviceType('mobile');
      } else if (width >= 768 && width <= 1366) {
        // Rango común para Smart TV y Laptops pequeñas
        // Si el agente de usuario indica TV, priorizamos TV
        if (navigator.userAgent.toLowerCase().includes('smart-tv') || 
            navigator.userAgent.toLowerCase().includes('tizen') || 
            navigator.userAgent.toLowerCase().includes('webos')) {
          setDeviceType('tv');
        } else {
          setDeviceType('pc');
        }
      } else {
        setDeviceType('pc');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // MIENTRAS DETECTA EL DISPOSITIVO, PANTALLA NEGRA DE CARGA
  if (!deviceType) return <div className="bg-black min-h-screen" />;

  // RENDERIZA EL ARCHIVO EXCLUSIVO SEGÚN EL DISPOSITIVO
  return (
    <>
      {deviceType === 'pc' && <GenesisPC />}
      {deviceType === 'mobile' && <GenesisMobile />}
      {deviceType === 'tv' && <GenesisTV />}
    </>
  );
};

export default GenesisPage;
