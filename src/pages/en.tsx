import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const InicioEN_PC = dynamic(() => import('../components/intl-en/InicioEN_PC'), { ssr: false });
const InicioEN_Mobile = dynamic(() => import('../components/intl-en/InicioEN_Mobile'), { ssr: false });
const InicioEN_TV = dynamic(() => import('../components/intl-en/InicioEN_TV'), { ssr: false });

export default function EnglishHomePage() {
  const [device, setDevice] = useState<'mobile' | 'pc' | 'tv' | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) setDevice('mobile');
      else if (width >= 1280) setDevice('pc');
      else setDevice('pc');
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!device) return <div className="bg-black min-h-screen" />;

  if (device === 'mobile') return <InicioEN_Mobile />;
  if (device === 'tv') return <InicioEN_TV />;
  return <InicioEN_PC />;
}
