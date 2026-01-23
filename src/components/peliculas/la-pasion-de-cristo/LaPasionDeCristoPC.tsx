import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Footer from '../../Footer';

const LaPasionDeCristoPC = () => {
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
      <Head><title>La Pasión de Cristo — Estudios 421</title></Head>
      <div className="flex-grow flex flex-col items-center justify-center relative px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FF0000]/10 via-transparent to-black" />
        <div className="z-10 text-center space-y-8 max-w-2xl">
          <div className="w-24 h-1 bg-[#FF0000] mx-auto shadow-[0_0_20px_#FF0000]" />
          <h1 className="text-6xl font-black uppercase tracking-[0.2em]">La Pasión de Cristo</h1>
          <p className="text-[#FF0000] text-sm font-bold tracking-[0.4em] uppercase">Estamos reconstruyendo esta experiencia</p>
          <p className="text-gray-400 text-base leading-relaxed">Próximamente esta obra maestra del cine estará disponible con la mejor calidad visual y de audio.</p>
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

export default LaPasionDeCristoPC;
