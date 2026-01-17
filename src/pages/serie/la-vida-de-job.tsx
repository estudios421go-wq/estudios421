import React, { useState, useEffect } from 'react';
// IMPORTACIONES CORREGIDAS CON LA NUEVA CARPETA
import LaVidaDeJobPC from '../../components/series/la-vida-de-job/LaVidaDeJobPC';
import LaVidaDeJobMobile from '../../components/series/la-vida-de-job/LaVidaDeJobMobile';

const LaVidaDeJobPage = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (isMobile === null) return <div className="bg-black min-h-screen" />;

  return isMobile ? <LaVidaDeJobMobile /> : <LaVidaDeJobPC />;
};

export default LaVidaDeJobPage;
