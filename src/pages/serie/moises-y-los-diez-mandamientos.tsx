import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const MoisesPC = dynamic(() => import('../../components/series/moises-y-los-diez-mandamientos/MoisesYLosDiezMandamientosPC'), { ssr: false });
const MoisesMobile = dynamic(() => import('../../components/series/moises-y-los-diez-mandamientos/MoisesYLosDiezMandamientosMobile'), { ssr: false });

const MoisesPage = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (isMobile === null) return <div className="bg-black min-h-screen" />;
  return isMobile ? <MoisesMobile /> : <MoisesPC />;
};
export default MoisesPage;
