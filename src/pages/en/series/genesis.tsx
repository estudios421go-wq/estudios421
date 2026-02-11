import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';

// Importación dinámica de los componentes en inglés
const GenesisEN_PC = dynamic(() => import('../../../components/intl-en/series/genesis/GenesisEN_PC'), { ssr: false });
const GenesisEN_Mobile = dynamic(() => import('../../../components/intl-en/series/genesis/GenesisEN_Mobile'), { ssr: false });

const GenesisPageEn = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkDevice = () => {
      // Mantenemos el estándar de 1024px para la ruptura entre Mobile y PC
      setIsMobile(window.innerWidth < 1024);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Pantalla de carga mientras se detecta el dispositivo
  if (isMobile === null) return <div className="bg-black min-h-screen" />;

  return (
    <>
      <Head>
        <title>Genesis — Faith on Screen</title>
        <meta name="description" content="Watch the full series of Genesis in English." />
      </Head>
      
      {isMobile ? <GenesisEN_Mobile /> : <GenesisEN_PC />}
    </>
  );
};

export default GenesisPageEn;
