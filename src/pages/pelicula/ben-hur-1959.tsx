import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const BenHur1959PC = dynamic(() => import('../../components/peliculas/ben-hur-1959/BenHur1959PC'), { ssr: false });
const BenHur1959Mobile = dynamic(() => import('../../components/peliculas/ben-hur-1959/BenHur1959Mobile'), { ssr: false });

const BenHur1959Page = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (isMobile === null) return <div className="bg-black min-h-screen" />;

  return isMobile ? <BenHur1959Mobile /> : <BenHur1959PC />;
};

export default BenHur1959Page;
