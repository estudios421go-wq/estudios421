import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const JesusDeNazaretPC = dynamic(() => import('../../components/series-tv/jesus-de-nazaret/JesusDeNazaretPC'), { ssr: false });
const JesusDeNazaretMobile = dynamic(() => import('../../components/series-tv/jesus-de-nazaret/JesusDeNazaretMobile'), { ssr: false });

const JesusDeNazaretPage = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (isMobile === null) return <div className="bg-black min-h-screen" />;

  return isMobile ? <JesusDeNazaretMobile /> : <JesusDeNazaretPC />;
};

export default JesusDeNazaretPage;
