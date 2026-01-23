import React from 'react';
import Head from 'next/head';

const SeriesTVMobile = () => {
  return (
    <div className="bg-black min-h-screen text-white flex flex-col items-center justify-center p-10 text-center">
      <Head><title>Series TV — Móvil</title></Head>
      <div className="w-12 h-1 bg-[#F09800] mb-6" />
      <h1 className="text-2xl font-black uppercase tracking-tighter mb-2">Series TV</h1>
      <p className="text-gray-500 text-xs uppercase tracking-widest leading-relaxed">
        El catálogo de series de televisión está siendo optimizado para dispositivos móviles.
      </p>
      <div className="mt-10 grid grid-cols-2 gap-4 w-full opacity-30">
        <div className="aspect-[2/3] bg-zinc-900 rounded-lg animate-pulse" />
        <div className="aspect-[2/3] bg-zinc-900 rounded-lg animate-pulse" />
      </div>
    </div>
  );
};

export default SeriesTVMobile;
