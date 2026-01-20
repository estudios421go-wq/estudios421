import React, { useState, useEffect } from 'react';
// IMPORTACIONES CORREGIDAS CON LA NUEVA CARPETA
import JoseDeEgiptoPC from '../../components/series/jose-de-egipto/JoseDeEgiptoPC';
import JoseDeEgiptoMobile from '../../components/series/jose-de-egipto/JoseDeEgiptoMobile';

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
