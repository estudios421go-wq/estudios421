import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const PC = dynamic(() => import('../components/legales/terminos/TerminosPC'), { ssr: false });
const Mobile = dynamic(() => import('../components/legales/terminos/TerminosMobile'), { ssr: false });
const TV = dynamic(() => import('../components/legales/terminos/TerminosTV'), { ssr: false });

export default function TerminosPage() {
  const [device, setDevice] = useState<'mobile' | 'pc' | null>(null);
  useEffect(() => { setDevice(window.innerWidth < 768 ? 'mobile' : 'pc'); }, []);

  if (!device) return <div className="bg-black min-h-screen" />;
  return device === 'mobile' ? <Mobile /> : <PC />;
}
