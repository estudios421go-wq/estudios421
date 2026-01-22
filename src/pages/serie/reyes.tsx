import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const ReyesPC = dynamic(() => import('../../components/series/reyes/ReyesPC'), { ssr: false });
const ReyesMobile = dynamic(() => import('../../components/series/reyes/ReyesMobile'), { ssr: false });

const ReyesPage = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (isMobile === null) return <div className="bg-black min-h-screen" />;
  return isMobile ? <ReyesMobile /> : <ReyesPC />;
};
export default ReyesPage;
