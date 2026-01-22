import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const PabloPC = dynamic(() => import('../../components/series/pablo-el-apostol/PabloElApostolPC'), { ssr: false });
const PabloMobile = dynamic(() => import('../../components/series/pablo-el-apostol/PabloElApostolMobile'), { ssr: false });
const PabloTV = dynamic(() => import('../../components/series/pablo-el-apostol/PabloElApostolTV'), { ssr: false });

const PabloElApostolPage = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  if (isMobile === null) return <div className="bg-black min-h-screen" />;
  return isMobile ? <PabloMobile /> : <PabloPC />;
};
export default PabloElApostolPage;
