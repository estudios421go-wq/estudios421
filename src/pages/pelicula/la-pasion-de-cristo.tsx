import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const LaPasionDeCristoPC = dynamic(() => import('../../components/peliculas/la-pasion-de-cristo/LaPasionDeCristoPC'), { ssr: false });
const LaPasionDeCristoMobile = dynamic(() => import('../../components/peliculas/la-pasion-de-cristo/LaPasionDeCristoMobile'), { ssr: false });

const LaPasionDeCristoPage = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (isMobile === null) return <div className="bg-black min-h-screen" />;

  return isMobile ? <LaPasionDeCristoMobile /> : <LaPasionDeCristoPC />;
};

export default LaPasionDeCristoPage;
