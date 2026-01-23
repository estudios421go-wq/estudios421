import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const SeriesBiblicasPC = dynamic(() => import('../components/series-biblicas/SeriesBiblicasPC'), { ssr: false });
const SeriesBiblicasMobile = dynamic(() => import('../components/series-biblicas/SeriesBiblicasMobile'), { ssr: false });
const SeriesBiblicasTV = dynamic(() => import('../components/series-biblicas/SeriesBiblicasTV'), { ssr: false });

export default function SeriesBiblicasPage() {
  const [device, setDevice] = useState<'mobile' | 'pc' | 'tv' | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) setDevice('mobile');
      else if (width >= 768 && width < 1280) setDevice('pc');
      else setDevice('pc'); // Ajustaremos TV más adelante
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!device) return <div className="bg-black min-h-screen" />;

  if (device === 'mobile') return <SeriesBiblicasMobile />;
  return <SeriesBiblicasPC />;
}
