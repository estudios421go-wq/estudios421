import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const MariaPC = dynamic(() => import('../../components/peliculas/maria/MariaPC'), { ssr: false });
const MariaMobile = dynamic(() => import('../../components/peliculas/maria/MariaMobile'), { ssr: false });

const MariaPage = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (isMobile === null) return <div className="bg-black min-h-screen" />;

  return isMobile ? <MariaMobile /> : <MariaPC />;
};

export default MariaPage;
