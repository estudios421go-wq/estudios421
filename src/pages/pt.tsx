import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const InicioPT_PC = dynamic(() => import('../components/intl-pt/InicioPT_PC'), { ssr: false });
const InicioPT_Mobile = dynamic(() => import('../components/intl-pt/InicioPT_Mobile'), { ssr: false });
const InicioPT_TV = dynamic(() => import('../components/intl-pt/InicioPT_TV'), { ssr: false });

export default function PortugueseHomePage() {
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

  if (device === 'mobile') return <InicioPT_Mobile />;
  if (device === 'tv') return <InicioPT_TV />;
  return <InicioPT_PC />;
}
