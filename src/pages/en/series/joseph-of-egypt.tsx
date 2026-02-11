import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// IMPORTACIONES DINÁMICAS APUNTANDO A LA ESTRUCTURA INTERNACIONAL
const JosephOfEgyptEN_PC = dynamic(() => import('../../../components/intl-en/series/joseph-of-egypt/JosephOfEgyptEN_PC'));
const JosephOfEgyptEN_Mobile = dynamic(() => import('../../../components/intl-en/series/joseph-of-egypt/JosephOfEgyptEN_Mobile'));

const JosephOfEgyptPageEN = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkDevice = () => {
      // Mantenemos el estándar de 1024px para la detección de dispositivos
      setIsMobile(window.innerWidth < 1024);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (isMobile === null) return <div className="bg-black min-h-screen" />;

  return isMobile ? <JosephOfEgyptEN_Mobile /> : <JosephOfEgyptEN_PC />;
};

export default JosephOfEgyptPageEN;
