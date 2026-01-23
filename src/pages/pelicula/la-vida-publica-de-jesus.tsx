import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const LaVidaPublicaDeJesusPC = dynamic(() => import('../../components/peliculas/la-vida-publica-de-jesus/LaVidaPublicaDeJesusPC'), { ssr: false });
const LaVidaPublicaDeJesusMobile = dynamic(() => import('../../components/peliculas/la-vida-publica-de-jesus/LaVidaPublicaDeJesusMobile'), { ssr: false });

const LaVidaPublicaDeJesusPage = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (isMobile === null) return <div className="bg-black min-h-screen" />;

  return isMobile ? <LaVidaPublicaDeJesusMobile /> : <LaVidaPublicaDeJesusPC />;
};

export default LaVidaPublicaDeJesusPage;
