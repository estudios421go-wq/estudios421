import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// CAMBIO AQUÍ: Se agrega 'hub-' a la ruta
const SeriesBiblicasPC = dynamic(() => import('../components/hub-series-biblicas/SeriesBiblicasPC'), { ssr: false });
const SeriesBiblicasMobile = dynamic(() => import('../components/hub-series-biblicas/SeriesBiblicasMobile'), { ssr: false });
const SeriesBiblicasTV = dynamic(() => import('../components/hub-series-biblicas/SeriesBiblicasTV'), { ssr: false });

export default function SeriesBiblicasPage() {
  const [device, setDevice] = useState<'mobile' | 'pc' | 'tv' | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) setDevice('mobile');
      else if (width >= 768 && width < 1280) setDevice('pc');
      else setDevice('pc');
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!device) return <div className="bg-black min-h-screen" />;
  if (device === 'mobile') return <SeriesBiblicasMobile />;
  return <SeriesBiblicasPC />;
}
