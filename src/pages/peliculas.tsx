import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const PeliculasPC = dynamic(() => import('../components/hub-peliculas/PeliculasPC'), { ssr: false });
const PeliculasMobile = dynamic(() => import('../components/hub-peliculas/PeliculasMobile'), { ssr: false });
const PeliculasTV = dynamic(() => import('../components/hub-peliculas/PeliculasTV'), { ssr: false });

export default function PeliculasPage() {
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

  if (device === 'mobile') return <PeliculasMobile />;
  return <PeliculasPC />;
}
