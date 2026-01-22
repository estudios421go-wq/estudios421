import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const EsterPC = dynamic(() => import('../../components/series/la-historia-de-la-reina-ester/LaHistoriaDeLaReinaEsterPC'), { ssr: false });
const EsterMobile = dynamic(() => import('../../components/series/la-historia-de-la-reina-ester/LaHistoriaDeLaReinaEsterMobile'), { ssr: false });
const EsterTV = dynamic(() => import('../../components/series/la-historia-de-la-reina-ester/LaHistoriaDeLaReinaEsterTV'), { ssr: false });

const ReinaEsterPage = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  if (isMobile === null) return <div className="bg-black min-h-screen" />;
  return isMobile ? <EsterMobile /> : <EsterPC />;
};
export default ReinaEsterPage;
