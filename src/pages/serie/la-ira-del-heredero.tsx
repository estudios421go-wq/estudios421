import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const IraHerederoPC = dynamic(() => import('../../components/series/la-ira-del-heredero/IraHerederoPC'), { ssr: false });
const IraHerederoMobile = dynamic(() => import('../../components/series/la-ira-del-heredero/IraHerederoMobile'), { ssr: false });

const IraHerederoPage = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  if (isMobile === null) return <div className="bg-black min-h-screen" />;
  return isMobile ? <IraHerederoMobile /> : <IraHerederoPC />;
};
export default IraHerederoPage;
