import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const SuUnicoHijoPC = dynamic(() => import('../../components/peliculas/su-unico-hijo/SuUnicoHijoPC'), { ssr: false });
const SuUnicoHijoMobile = dynamic(() => import('../../components/peliculas/su-unico-hijo/SuUnicoHijoMobile'), { ssr: false });

const SuUnicoHijoPage = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (isMobile === null) return <div className="bg-black min-h-screen" />;

  return isMobile ? <SuUnicoHijoMobile /> : <SuUnicoHijoPC />;
};

export default SuUnicoHijoPage;
