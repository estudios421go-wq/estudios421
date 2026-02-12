import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const TheRichAndLazarusPC = dynamic(() => import('../../../components/intl-en/series/the-rich-and-lazarus/TheRichAndLazarusEN_PC'), { ssr: false });
const TheRichAndLazarusMobile = dynamic(() => import('../../../components/intl-en/series/the-rich-and-lazarus/TheRichAndLazarusEN_Mobile'), { ssr: false });

const TheRichAndLazarusPageEN = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (isMobile === null) return <div className="bg-black min-h-screen" />;
  return isMobile ? <TheRichAndLazarusMobile /> : <TheRichAndLazarusPC />;
};

export default TheRichAndLazarusPageEN;
