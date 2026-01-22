import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const ReyesDivisionPC = dynamic(() => import('../../components/series/reyes-la-division/ReyesLaDivisionPC'), { ssr: false });
const ReyesDivisionMobile = dynamic(() => import('../../components/series/reyes-la-division/ReyesLaDivisionMobile'), { ssr: false });
// Conexión de seguridad para TV
const ReyesDivisionTV = dynamic(() => import('../../components/series/reyes-la-division/ReyesLaDivisionTV'), { ssr: false });

const ReyesDivisionPage = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  if (isMobile === null) return <div className="bg-black min-h-screen" />;
  return isMobile ? <ReyesDivisionMobile /> : <ReyesDivisionPC />;
};
export default ReyesDivisionPage;
