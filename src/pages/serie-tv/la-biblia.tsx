import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const LaBibliaPC = dynamic(() => import('../../components/series-tv/la-biblia/LaBibliaPC'), { ssr: false });
const LaBibliaMobile = dynamic(() => import('../../components/series-tv/la-biblia/LaBibliaMobile'), { ssr: false });

const LaBibliaPage = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (isMobile === null) return <div className="bg-black min-h-screen" />;

  return isMobile ? <LaBibliaMobile /> : <LaBibliaPC />;
};

export default LaBibliaPage;
