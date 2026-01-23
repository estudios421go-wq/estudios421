import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const DCLaBibliaContinuaPC = dynamic(() => import('../../components/series-tv/dc-la-biblia-continua/DCLaBibliaContinuaPC'), { ssr: false });
const DCLaBibliaContinuaMobile = dynamic(() => import('../../components/series-tv/dc-la-biblia-continua/DCLaBibliaContinuaMobile'), { ssr: false });

const DCLaBibliaContinuaPage = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (isMobile === null) return <div className="bg-black min-h-screen" />;

  return isMobile ? <DCLaBibliaContinuaMobile /> : <DCLaBibliaContinuaPC />;
};

export default DCLaBibliaContinuaPage;
