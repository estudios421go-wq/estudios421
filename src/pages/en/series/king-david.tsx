import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const KingDavidPC = dynamic(() => import('../../../components/intl-en/series/king-david/KingDavidEN_PC'), { ssr: false });
const KingDavidMobile = dynamic(() => import('../../../components/intl-en/series/king-david/KingDavidEN_Mobile'), { ssr: false });

const KingDavidPageEN = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (isMobile === null) return <div className="bg-black min-h-screen" />;
  return isMobile ? <KingDavidMobile /> : <KingDavidPC />;
};

export default KingDavidPageEN;
