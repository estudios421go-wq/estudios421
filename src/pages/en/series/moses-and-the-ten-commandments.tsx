import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// IMPORTACIONES DINÁMICAS APUNTANDO A LA ESTRUCTURA INTERNACIONAL (INTL-EN)
const MosesPC = dynamic(() => import('../../../components/intl-en/series/moses-and-the-ten-commandments/MosesAndTheTenCommandmentsEN_PC'), { ssr: false });
const MosesMobile = dynamic(() => import('../../../components/intl-en/series/moses-and-the-ten-commandments/MosesAndTheTenCommandmentsEN_Mobile'), { ssr: false });

const MosesPageEN = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (isMobile === null) return <div className="bg-black min-h-screen" />;

  return isMobile ? <MosesMobile /> : <MosesPC />;
};

export default MosesPageEN;
