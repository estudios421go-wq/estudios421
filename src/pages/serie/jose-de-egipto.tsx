import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Importación blindada para evitar errores de módulo en Render
const JoseDeEgiptoPC = dynamic(() => import('../../components/series/jose-de-egipto/JoseDeEgiptoPC'), { ssr: false });
const JoseDeEgiptoMobile = dynamic(() => import('../../components/series/jose-de-egipto/JoseDeEgiptoMobile'), { ssr: false });

const JoseDeEgiptoPage = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (isMobile === null) return <div className="bg-black min-h-screen" />;

  return isMobile ? <JoseDeEgiptoMobile /> : <JoseDeEgiptoPC />;
};

export default JoseDeEgiptoPage;
