import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const ApocalipsisPC = dynamic(() => import('../../components/series/apocalipsis/ApocalipsisPC'), { ssr: false });
const ApocalipsisMobile = dynamic(() => import('../../components/series/apocalipsis/ApocalipsisMobile'), { ssr: false });
const ApocalipsisTV = dynamic(() => import('../../components/series/apocalipsis/ApocalipsisTV'), { ssr: false });

const ApocalipsisPage = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  if (isMobile === null) return <div className="bg-black min-h-screen" />;
  return isMobile ? <ApocalipsisMobile /> : <ApocalipsisPC />;
};
export default ApocalipsisPage;
