import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Importaciones dinámicas apuntando a los componentes de la versión en inglés
const LeahEN_PC = dynamic(() => import('../../../components/intl-en/series/leah/LeahEN_PC'));
const LeahEN_Mobile = dynamic(() => import('../../../components/intl-en/series/leah/LeahEN_Mobile'));

const LeahPageEN = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkDevice = () => {
      // Mantenemos el estándar de 1024px para el cambio entre móvil y PC
      setIsMobile(window.innerWidth < 1024);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (isMobile === null) return <div className="bg-black min-h-screen" />;

  return isMobile ? <LeahEN_Mobile /> : <LeahEN_PC />;
};

export default LeahPageEN;
