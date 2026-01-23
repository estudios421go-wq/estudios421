import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const LosDiezMandamientosPC = dynamic(() => import('../../components/peliculas/los-diez-mandamientos/LosDiezMandamientosPC'), { ssr: false });
const LosDiezMandamientosMobile = dynamic(() => import('../../components/peliculas/los-diez-mandamientos/LosDiezMandamientosMobile'), { ssr: false });

const LosDiezMandamientosPage = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (isMobile === null) return <div className="bg-black min-h-screen" />;

  return isMobile ? <LosDiezMandamientosMobile /> : <LosDiezMandamientosPC />;
};

export default LosDiezMandamientosPage;
