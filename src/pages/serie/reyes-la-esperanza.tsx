import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const ReyesEsperanzaPC = dynamic(() => import('../../components/series/reyes-la-esperanza/ReyesLaEsperanzaPC'), { ssr: false });
const ReyesEsperanzaMobile = dynamic(() => import('../../components/series/reyes-la-esperanza/ReyesLaEsperanzaMobile'), { ssr: false });
const ReyesEsperanzaTV = dynamic(() => import('../../components/series/reyes-la-esperanza/ReyesLaEsperanzaTV'), { ssr: false });

const ReyesEsperanzaPage = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  if (isMobile === null) return <div className="bg-black min-h-screen" />;
  return isMobile ? <ReyesEsperanzaMobile /> : <ReyesEsperanzaPC />;
};
export default ReyesEsperanzaPage;
