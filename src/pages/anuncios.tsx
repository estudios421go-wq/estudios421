import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const PC = dynamic(() => import('../components/legales/anuncios/AnunciosPC'), { ssr: false });
const Mobile = dynamic(() => import('../components/legales/anuncios/AnunciosMobile'), { ssr: false });
const TV = dynamic(() => import('../components/legales/anuncios/AnunciosTV'), { ssr: false });

export default function AnunciosPage() {
  const [device, setDevice] = useState<'mobile' | 'pc' | null>(null);
  useEffect(() => { setDevice(window.innerWidth < 768 ? 'mobile' : 'pc'); }, []);

  if (!device) return <div className="bg-black min-h-screen" />;
  return device === 'mobile' ? <Mobile /> : <PC />;
}
