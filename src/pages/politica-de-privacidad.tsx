import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const PC = dynamic(() => import('../components/legales/privacidad/PrivacidadPC'), { ssr: false });
const Mobile = dynamic(() => import('../components/legales/privacidad/PrivacidadMobile'), { ssr: false });
const TV = dynamic(() => import('../components/legales/privacidad/PrivacidadTV'), { ssr: false });

export default function PrivacidadPage() {
  const [device, setDevice] = useState<'mobile' | 'pc' | 'tv' | null>(null);

  useEffect(() => {
    const width = window.innerWidth;
    if (width < 768) setDevice('mobile');
    else if (width >= 1280) setDevice('pc'); // Puedes activar 'tv' aquí si prefieres
    else setDevice('pc');
  }, []);

  if (!device) return <div className="bg-black min-h-screen" />;
  if (device === 'mobile') return <Mobile />;
  return <PC />;
}
