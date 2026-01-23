import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const ElApocalipsisDeSanJuanPC = dynamic(() => import('../../components/peliculas/el-apocalipsis-de-san-juan/ElApocalipsisDeSanJuanPC'), { ssr: false });
const ElApocalipsisDeSanJuanMobile = dynamic(() => import('../../components/peliculas/el-apocalipsis-de-san-juan/ElApocalipsisDeSanJuanMobile'), { ssr: false });

const ElApocalipsisDeSanJuanPage = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (isMobile === null) return <div className="bg-black min-h-screen" />;

  return isMobile ? <ElApocalipsisDeSanJuanMobile /> : <ElApocalipsisDeSanJuanPC />;
};

export default ElApocalipsisDeSanJuanPage;
