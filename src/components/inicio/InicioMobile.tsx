import React from 'react';
import Head from 'next/head';
import NavbarMobile from '../NavbarMobile';

const InicioMobile = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      <Head><title>Estudios 421 — Móvil</title></Head>
      
      <NavbarMobile />
      
      <main className="pt-24 px-6 text-center">
        <div className="w-16 h-1 bg-[#F09800] mx-auto mb-6" />
        <h1 className="text-3xl font-black uppercase tracking-tighter mb-4">Bienvenido</h1>
        <p className="text-gray-400 text-sm leading-relaxed">
          Estamos rediseñando la experiencia móvil para ofrecerte la mejor calidad.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-4">
          <div className="aspect-[2/3] bg-zinc-900 rounded-lg animate-pulse" />
          <div className="aspect-[2/3] bg-zinc-900 rounded-lg animate-pulse" />
        </div>
      </main>
    </div>
  );
};

export default InicioMobile;
