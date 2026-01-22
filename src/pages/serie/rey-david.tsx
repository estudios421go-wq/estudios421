import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const DavidPC = dynamic(() => import('../../components/series/el-rey-david/ElReyDavidPC'), { ssr: false });
const DavidMobile = dynamic(() => import('../../components/series/el-rey-david/ElReyDavidMobile'), { ssr: false });

const ReyDavidPage = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (isMobile === null) return <div className="bg-black min-h-screen" />;
  return isMobile ? <DavidMobile /> : <DavidPC />;
};
export default ReyDavidPage;
