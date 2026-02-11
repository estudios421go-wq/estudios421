import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// IMPORTACIONES DINÁMICAS APUNTANDO A LA ESTRUCTURA INTERNACIONAL (INTL-EN)
const ThePromisedLandPC = dynamic(() => import('../../../components/intl-en/series/the-promised-land/ThePromisedLandEN_PC'), { ssr: false });
const ThePromisedLandMobile = dynamic(() => import('../../../components/intl-en/series/the-promised-land/ThePromisedLandEN_Mobile'), { ssr: false });

const ThePromisedLandPageEN = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (isMobile === null) return <div className="bg-black min-h-screen" />;

  return isMobile ? <ThePromisedLandMobile /> : <ThePromisedLandPC />;
};

export default ThePromisedLandPageEN;
