import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const SieteMariasPC = dynamic(() => import('../../components/series/las-siete-marias/SieteMariasPC'), { ssr: false });
const SieteMariasMobile = dynamic(() => import('../../components/series/las-siete-marias/SieteMariasMobile'), { ssr: false });

const SieteMariasPage = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  if (isMobile === null) return <div className="bg-black min-h-screen" />;
  return isMobile ? <SieteMariasMobile /> : <SieteMariasPC />;
};
export default SieteMariasPage;
