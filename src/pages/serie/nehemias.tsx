import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const NehemiasPC = dynamic(() => import('../../components/series/nehemias/NehemiasPC'), { ssr: false });
const NehemiasMobile = dynamic(() => import('../../components/series/nehemias/NehemiasMobile'), { ssr: false });
const NehemiasTV = dynamic(() => import('../../components/series/nehemias/NehemiasTV'), { ssr: false });

const NehemiasPage = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  if (isMobile === null) return <div className="bg-black min-h-screen" />;
  return isMobile ? <NehemiasMobile /> : <NehemiasPC />;
};
export default NehemiasPage;
