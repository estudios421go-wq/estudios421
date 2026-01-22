import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const ReyesConquistaPC = dynamic(() => import('../../components/series/reyes-la-conquista/ReyesLaConquistaPC'), { ssr: false });
const ReyesConquistaMobile = dynamic(() => import('../../components/series/reyes-la-conquista/ReyesLaConquistaMobile'), { ssr: false });

const ReyesConquistaPage = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  if (isMobile === null) return <div className="bg-black min-h-screen" />;
  return isMobile ? <ReyesConquistaMobile /> : <ReyesConquistaPC />;
};
export default ReyesConquistaPage;
