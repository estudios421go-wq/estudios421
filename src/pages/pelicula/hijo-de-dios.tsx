import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const HijoDeDiosPC = dynamic(() => import('../../components/peliculas/hijo-de-Dios/HijoDeDiosPC'), { ssr: false });
const HijoDeDiosMobile = dynamic(() => import('../../components/peliculas/hijo-de-Dios/HijoDeDiosMobile'), { ssr: false });

const HijoDeDiosPage = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (isMobile === null) return <div className="bg-black min-h-screen" />;

  return isMobile ? <HijoDeDiosMobile /> : <HijoDeDiosPC />;
};

export default HijoDeDiosPage;
