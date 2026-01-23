import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Cargamos los componentes de la nueva carpeta 'inicio'
const InicioPC = dynamic(() => import('../components/inicio/InicioPC'), { ssr: false });
const InicioMobile = dynamic(() => import('../components/inicio/InicioMobile'), { ssr: false });
const InicioTV = dynamic(() => import('../components/inicio/InicioTV'), { ssr: false });

export default function HomePage() {
  const [device, setDevice] = useState<'mobile' | 'pc' | 'tv' | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDevice('mobile');
      } else if (width >= 768 && width < 1280) {
        setDevice('pc'); // Puedes ajustar rangos para tablet si lo deseas
      } else {
        setDevice('pc'); // Por ahora PC maneja el resto, luego activaremos TV
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!device) return <div className="bg-black min-h-screen" />;

  if (device === 'mobile') return <InicioMobile />;
  return <InicioPC />; // Por defecto cargamos PC mientras pulimos TV
}
