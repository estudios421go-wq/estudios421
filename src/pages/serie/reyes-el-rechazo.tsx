import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const ReyesRechazoPC = dynamic(() => import('../../components/series/reyes-el-rechazo/ReyesElRechazoPC'), { ssr: false });
const ReyesRechazoMobile = dynamic(() => import('../../components/series/reyes-el-rechazo/ReyesElRechazoMobile'), { ssr: false });

const ReyesRechazoPage = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  if (isMobile === null) return <div className="bg-black min-h-screen" />;
  return isMobile ? <ReyesRechazoMobile /> : <ReyesRechazoPC />;
};
export default ReyesRechazoPage;
