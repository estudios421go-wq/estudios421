import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const LazaroPC = dynamic(() => import('../../components/series/el-rico-y-lazaro/ElRicoYLazaroPC'), { ssr: false });
const LazaroMobile = dynamic(() => import('../../components/series/el-rico-y-lazaro/ElRicoYLazaroMobile'), { ssr: false });
const LazaroTV = dynamic(() => import('../../components/series/el-rico-y-lazaro/ElRicoYLazaroTV'), { ssr: false });

const RicoYLazaroPage = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  if (isMobile === null) return <div className="bg-black min-h-screen" />;
  return isMobile ? <LazaroMobile /> : <LazaroPC />;
};
export default RicoYLazaroPage;
