import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Footer from '../../Footer';

const ReyDavidPC = () => {
  useEffect(() => {
    const handleContext = (e: MouseEvent) => e.preventDefault();
    const handleKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey && (e.key === 's' || e.key === 'u' || e.key === 'i')) || e.key === 'F12') e.preventDefault();
    };
    document.addEventListener('contextmenu', handleContext);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('contextmenu', handleContext);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  return (
    <div className="bg-black min-h-screen text-white font-sans select-none flex flex-col">
      <Head><title>Rey David — Estudios 421</title></Head>
      <div className="flex-grow flex flex-col items-center justify-center relative px-4 text-left">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FF8A00]/10 via-transparent to-black" />
        <div className="z-10 text-center space-y-8 max-w-2xl">
          <div className="w-24 h-1 bg-[#FF8A00] mx-auto shadow-[0_0_20px_#FF8A00]" />
          <h1 className="text-6xl font-black uppercase tracking-[0.2em]">Rey David</h1>
          <p className="text-[#FF8A00] text-sm font-bold tracking-[0.4em] uppercase">Estamos reconstruyendo esta experiencia</p>
          <p className="text-gray-400 text-base leading-relaxed">Próximamente esta serie bíblica estará disponible con la mejor calidad y todas sus funcionalidades. Gracias por tu paciencia.</p>
          <Link href="/">
            <button className="mt-8 border border-white/20 px-12 py-4 rounded-full font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500 transform hover:scale-105 shadow-2xl">
              Volver al inicio
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default ReyDavidPC;
