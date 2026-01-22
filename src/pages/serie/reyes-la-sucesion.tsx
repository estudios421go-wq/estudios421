import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const ReyesSucesionPC = dynamic(() => import('../../components/series/reyes-la-sucesion/ReyesLaSucesionPC'), { ssr: false });
const ReyesSucesionMobile = dynamic(() => import('../../components/series/reyes-la-sucesion/ReyesLaSucesionMobile'), { ssr: false });

const ReyesSucesionPage = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  if (isMobile === null) return <div className="bg-black min-h-screen" />;
  return isMobile ? <ReyesSucesionMobile /> : <ReyesSucesionPC />;
};
export default ReyesSucesionPage;
