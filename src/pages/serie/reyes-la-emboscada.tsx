import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const ReyesEmboscadaPC = dynamic(() => import('../../components/series/reyes-la-emboscada/ReyesLaEmboscadaPC'), { ssr: false });
const ReyesEmboscadaMobile = dynamic(() => import('../../components/series/reyes-la-emboscada/ReyesLaEmboscadaMobile'), { ssr: false });
const ReyesEmboscadaTV = dynamic(() => import('../../components/series/reyes-la-emboscada/ReyesLaEmboscadaTV'), { ssr: false });

const ReyesEmboscadaPage = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  if (isMobile === null) return <div className="bg-black min-h-screen" />;
  return isMobile ? <ReyesEmboscadaMobile /> : <ReyesEmboscadaPC />;
};
export default ReyesEmboscadaPage;
