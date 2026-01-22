import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const SiervaPC = dynamic(() => import('../../components/series/el-senor-y-la-sierva/ElSenorYLaSiervaPC'), { ssr: false });
const SiervaMobile = dynamic(() => import('../../components/series/el-senor-y-la-sierva/ElSenorYLaSiervaMobile'), { ssr: false });
const SiervaTV = dynamic(() => import('../../components/series/el-senor-y-la-sierva/ElSenorYLaSiervaTV'), { ssr: false });

const ElSenorYLaSiervaPage = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  if (isMobile === null) return <div className="bg-black min-h-screen" />;
  return isMobile ? <SiervaMobile /> : <SiervaPC />;
};
export default ElSenorYLaSiervaPage;
