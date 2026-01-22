import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const ReyesIngratitudPC = dynamic(() => import('../../components/series/reyes-la-ingratitud/ReyesLaIngratitudPC'), { ssr: false });
const ReyesIngratitudMobile = dynamic(() => import('../../components/series/reyes-la-ingratitud/ReyesLaIngratitudMobile'), { ssr: false });

const ReyesIngratitudPage = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  if (isMobile === null) return <div className="bg-black min-h-screen" />;
  return isMobile ? <ReyesIngratitudMobile /> : <ReyesIngratitudPC />;
};
export default ReyesIngratitudPage;
