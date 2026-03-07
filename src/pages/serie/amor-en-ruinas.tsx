import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const AmorRuinasPC = dynamic(() => import('../../components/series/amor-en-ruinas/AmorRuinasPC'), { ssr: false });
const AmorRuinasMobile = dynamic(() => import('../../components/series/amor-en-ruinas/AmorRuinasMobile'), { ssr: false });

const AmorRuinasPage = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  if (isMobile === null) return <div className="bg-black min-h-screen" />;
  return isMobile ? <AmorRuinasMobile /> : <AmorRuinasPC />;
};
export default AmorRuinasPage;
