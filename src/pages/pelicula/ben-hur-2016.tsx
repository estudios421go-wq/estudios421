import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const BenHur2016PC = dynamic(() => import('../../components/peliculas/ben-hur-2016/BenHur2016PC'), { ssr: false });
const BenHur2016Mobile = dynamic(() => import('../../components/peliculas/ben-hur-2016/BenHur2016Mobile'), { ssr: false });

const BenHur2016Page = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (isMobile === null) return <div className="bg-black min-h-screen" />;

  return isMobile ? <BenHur2016Mobile /> : <BenHur2016PC />;
};

export default BenHur2016Page;
