import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const SansonPC = dynamic(() => import('../../components/series/sanson-y-dalila/SansonYDalilaPC'), { ssr: false });
const SansonMobile = dynamic(() => import('../../components/series/sanson-y-dalila/SansonYDalilaMobile'), { ssr: false });

const SansonPage = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (isMobile === null) return <div className="bg-black min-h-screen" />;
  return isMobile ? <SansonMobile /> : <SansonPC />;
};
export default SansonPage;
