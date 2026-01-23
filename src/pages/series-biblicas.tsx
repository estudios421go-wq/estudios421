import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Importaciones corregidas: Apuntan a 'series-biblicas' directamente
const SeriesBiblicasPC = dynamic(() => import('../components/series-biblicas/SeriesBiblicasPC'), { 
  ssr: false,
  loading: () => <div className="bg-black min-h-screen" /> 
});

const SeriesBiblicasMobile = dynamic(() => import('../components/series-biblicas/SeriesBiblicasMobile'), { 
  ssr: false,
  loading: () => <div className="bg-black min-h-screen" /> 
});

const SeriesBiblicasTV = dynamic(() => import('../components/series-biblicas/SeriesBiblicasTV'), { 
  ssr: false,
  loading: () => <div className="bg-black min-h-screen" /> 
});

export default function SeriesBiblicasPage() {
  const [device, setDevice] = useState<'mobile' | 'pc' | 'tv' | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDevice('mobile');
      } else if (width >= 1280) {
        setDevice('pc'); // Aquí podrías activar 'tv' si el ancho es de televisor
      } else {
        setDevice('pc');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Estado inicial mientras se detecta el dispositivo
  if (!device) return <div className="bg-black min-h-screen" />;

  // Retorno de versión según dispositivo detectado
  if (device === 'mobile') return <SeriesBiblicasMobile />;
  if (device === 'tv') return <SeriesBiblicasTV />;
  
  return <SeriesBiblicasPC />;
}
