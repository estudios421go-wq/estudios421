import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// IMPORTACIONES DINÁMICAS APUNTANDO A LA ESTRUCTURA DE LA REINA DE PERSIA (INTL-EN)
const TheQueenOfPersiaPC = dynamic(() => import('../../../components/intl-en/series/the-queen-of-persia/TheQueenOfPersiaEN_PC'), { ssr: false });
const TheQueenOfPersiaMobile = dynamic(() => import('../../../components/intl-en/series/the-queen-of-persia/TheQueenOfPersiaEN_Mobile'), { ssr: false });

const TheQueenOfPersiaPageEN = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (isMobile === null) return <div className="bg-black min-h-screen" />;

  return isMobile ? <TheQueenOfPersiaMobile /> : <TheQueenOfPersiaPC />;
};

export default TheQueenOfPersiaPageEN;
