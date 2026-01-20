import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const JoseDeEgiptoPC = dynamic(() => import('../../components/series/jose-de-egipto/JoseDeEgiptoPC'));
const JoseDeEgiptoMobile = dynamic(() => import('../../components/series/jose-de-egipto/JoseDeEgiptoMobile'));
const JoseDeEgiptoTV = dynamic(() => import('../../components/series/jose-de-egipto/JoseDeEgiptoTV'));

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
