import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Footer from '../../Footer';

const SuUnicoHijoMobile = () => (
  <div className="bg-black min-h-screen text-white font-sans flex flex-col text-center">
    <Head><title>Su Único Hijo — Móvil</title></Head>
    <div className="flex-grow flex flex-col items-center justify-center px-8 relative">
      <div className="w-16 h-1 bg-[#FF8A00] mb-6 shadow-[0_0_10px_#FF8A00]" />
      <h1 className="text-3xl font-black uppercase tracking-widest mb-4 leading-tight">Su Único Hijo</h1>
      <p className="text-[#FF8A00] text-[10px] font-bold tracking-widest uppercase mb-6 animate-pulse">Próximamente</p>
      <p className="text-gray-500 text-xs leading-relaxed mb-10 text-center">La conmovedora historia de Abraham e Isaac, muy pronto en tus dispositivos móviles.</p>
      <Link href="/" className="w-full">
        <button className="w-full bg-white text-black font-black py-4 rounded-xl text-xs uppercase tracking-widest active:scale-95 transition-transform shadow-xl">
          Volver al inicio
        </button>
      </Link>
    </div>
    <Footer />
  </div>
);

export default SuUnicoHijoMobile;
