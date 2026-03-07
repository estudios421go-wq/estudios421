import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const BenHurPC = dynamic(() => import('../../components/series/ben-hur/BenHurPC'), { ssr: false });
const BenHurMobile = dynamic(() => import('../../components/series/ben-hur/BenHurMobile'), { ssr: false });

const BenHurPage = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  if (isMobile === null) return <div className="bg-black min-h-screen" />;
  return isMobile ? <BenHurMobile /> : <BenHurPC />;
};
export default BenHurPage;
