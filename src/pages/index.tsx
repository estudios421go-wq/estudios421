import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const InicioPC = dynamic(() => import('../components/inicio/InicioPC'), { ssr: false });
const InicioMobile = dynamic(() => import('../components/inicio/InicioMobile'), { ssr: false });
const InicioTV = dynamic(() => import('../components/inicio/InicioTV'), { ssr: false });

export default function HomePage() {
  const [device, setDevice] = useState<'mobile' | 'pc' | 'tv' | null>(null);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();

    // Detección Smart TV por userAgent
    const isTV =
      /smart-tv|smarttv|tizen|webos|hbbtv|netcast|viera|philips|aquos|bravia|roku|firetv|fire tv|android tv|googletv|google tv|crkey|chromecast|appletv|apple tv|tvos/.test(ua);

    if (isTV) {
      setDevice('tv');
      return;
    }

    // Si no es TV, detectar por tamaño
    const width = window.innerWidth;
    if (width < 768) {
      setDevice('mobile');
    } else {
      setDevice('pc');
    }

    // Solo escuchar resize si NO es TV
    const handleResize = () => {
      const w = window.innerWidth;
      setDevice(w < 768 ? 'mobile' : 'pc');
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!device) return <div className="bg-black min-h-screen" />;
  if (device === 'tv') return <InicioTV />;
  if (device === 'mobile') return <InicioMobile />;
  return <InicioPC />;
}
