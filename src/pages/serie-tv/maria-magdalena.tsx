import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const MariaMagdalenaPC = dynamic(() => import('../../components/series-tv/maria-magdalena/MariaMagdalenaPC'), { ssr: false });
const MariaMagdalenaMobile = dynamic(() => import('../../components/series-tv/maria-magdalena/MariaMagdalenaMobile'), { ssr: false });

const MariaMagdalenaPage = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (isMobile === null) return <div className="bg-black min-h-screen" />;

  return isMobile ? <MariaMagdalenaMobile /> : <MariaMagdalenaPC />;
};

export default MariaMagdalenaPage;
