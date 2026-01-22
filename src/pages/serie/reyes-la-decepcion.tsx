import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const ReyesDecepcionPC = dynamic(() => import('../../components/series/reyes-la-decepcion/ReyesLaDecepcionPC'), { ssr: false });
const ReyesDecepcionMobile = dynamic(() => import('../../components/series/reyes-la-decepcion/ReyesLaDecepcionMobile'), { ssr: false });

const ReyesDecepcionPage = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  if (isMobile === null) return <div className="bg-black min-h-screen" />;
  return isMobile ? <ReyesDecepcionMobile /> : <ReyesDecepcionPC />;
};
export default ReyesDecepcionPage;
