import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const JezabelPC = dynamic(() => import('../../components/series/jezabel/JezabelPC'), { ssr: false });
const JezabelMobile = dynamic(() => import('../../components/series/jezabel/JezabelMobile'), { ssr: false });
const JezabelTV = dynamic(() => import('../../components/series/jezabel/JezabelTV'), { ssr: false });

const JezabelPage = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  if (isMobile === null) return <div className="bg-black min-h-screen" />;
  return isMobile ? <JezabelMobile /> : <JezabelPC />;
};
export default JezabelPage;
