import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const JesusPC = dynamic(() => import('../../components/series/jesus/JesusPC'), { ssr: false });
const JesusMobile = dynamic(() => import('../../components/series/jesus/JesusMobile'), { ssr: false });
const JesusTV = dynamic(() => import('../../components/series/jesus/JesusTV'), { ssr: false });

const JesusPage = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  if (isMobile === null) return <div className="bg-black min-h-screen" />;
  return isMobile ? <JesusMobile /> : <JesusPC />;
};
export default JesusPage;
