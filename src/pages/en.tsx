import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const InicioEN_PC = dynamic(() => import('../components/intl-en/InicioEN_PC'), { ssr: false });
const InicioEN_Mobile = dynamic(() => import('../components/intl-en/InicioEN_Mobile'), { ssr: false });

export default function EnglishHomePage() {
  const [device, setDevice] = useState<'mobile' | 'pc' | null>(null);

  useEffect(() => {
    setDevice(window.innerWidth < 768 ? 'mobile' : 'pc');
  }, []);

  if (!device) return <div className="bg-black min-h-screen" />;
  return device === 'mobile' ? <InicioEN_Mobile /> : <InicioEN_PC />;
}
