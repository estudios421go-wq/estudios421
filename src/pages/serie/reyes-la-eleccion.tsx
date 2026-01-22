import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const ReyesEleccionPC = dynamic(() => import('../../components/series/reyes-la-eleccion/ReyesLaEleccionPC'), { ssr: false });
const ReyesEleccionMobile = dynamic(() => import('../../components/series/reyes-la-eleccion/ReyesLaEleccionMobile'), { ssr: false });

const ReyesEleccionPage = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  if (isMobile === null) return <div className="bg-black min-h-screen" />;
  return isMobile ? <ReyesEleccionMobile /> : <ReyesEleccionPC />;
};
export default ReyesEleccionPage;
