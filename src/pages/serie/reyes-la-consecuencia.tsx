import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const ReyesConsecuenciaPC = dynamic(() => import('../../components/series/reyes-la-consecuencia/ReyesLaConsecuenciaPC'), { ssr: false });
const ReyesConsecuenciaMobile = dynamic(() => import('../../components/series/reyes-la-consecuencia/ReyesLaConsecuenciaMobile'), { ssr: false });

const ReyesConsecuenciaPage = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  if (isMobile === null) return <div className="bg-black min-h-screen" />;
  return isMobile ? <ReyesConsecuenciaMobile /> : <ReyesConsecuenciaPC />;
};
export default ReyesConsecuenciaPage;
