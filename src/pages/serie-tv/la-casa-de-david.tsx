import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const LaCasaDeDavidPC = dynamic(() => import('../../components/series-tv/la-casa-de-david/LaCasaDeDavidPC'), { ssr: false });
const LaCasaDeDavidMobile = dynamic(() => import('../../components/series-tv/la-casa-de-david/LaCasaDeDavidMobile'), { ssr: false });

const LaCasaDeDavidPage = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (isMobile === null) return <div className="bg-black min-h-screen" />;

  return isMobile ? <LaCasaDeDavidMobile /> : <LaCasaDeDavidPC />;
};

export default LaCasaDeDavidPage;
