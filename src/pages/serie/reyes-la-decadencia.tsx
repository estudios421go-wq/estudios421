import React, { useState, useEffect } from 'react';
import dynamic from 'dynamic';

const ReyesDecadenciaPC = dynamic(() => import('../../components/series/reyes-la-decadencia/ReyesLaDecadenciaPC'), { ssr: false });
const ReyesDecadenciaMobile = dynamic(() => import('../../components/series/reyes-la-decadencia/ReyesLaDecadenciaMobile'), { ssr: false });

const ReyesDecadenciaPage = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  if (isMobile === null) return <div className="bg-black min-h-screen" />;
  return isMobile ? <ReyesDecadenciaMobile /> : <ReyesDecadenciaPC />;
};
export default ReyesDecadenciaPage;
