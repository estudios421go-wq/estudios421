import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Ajuste de rutas para la versión de 88 episodios
const Apocalipsis88PC = dynamic(() => import('../../components/series/apocalipsis88/Apocalipsis88PC'), { ssr: false });
const Apocalipsis88Mobile = dynamic(() => import('../../components/series/apocalipsis88/Apocalipsis88Mobile'), { ssr: false });

const Apocalipsis88Page = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (isMobile === null) return <div className="bg-black min-h-screen" />;

  // Retorna los componentes específicos de la versión 88
  return isMobile ? <Apocalipsis88Mobile /> : <Apocalipsis88PC />;
};

export default Apocalipsis88Page;
