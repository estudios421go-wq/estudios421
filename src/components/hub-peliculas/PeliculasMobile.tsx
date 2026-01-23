import React from 'react';
import Head from 'next/head';

const PeliculasMobile = () => {
  return (
    <div className="bg-black min-h-screen text-white flex flex-col items-center justify-center p-10 text-center">
      <Head><title>Películas — Móvil</title></Head>
      <div className="w-12 h-1 bg-[#F09800] mb-6" />
      <h1 className="text-2xl font-black uppercase tracking-tighter mb-2">Películas</h1>
      <p className="text-gray-500 text-xs uppercase tracking-widest leading-relaxed mb-10">
        Sección de cine bíblico optimizada para smartphones.
      </p>
      <div className="grid grid-cols-2 gap-4 w-full opacity-20">
        {[1,2,3,4].map(i => (
          <div key={i} className="aspect-[2/3] bg-zinc-900 rounded-lg border border-white/5" />
        ))}
      </div>
    </div>
  );
};

export default PeliculasMobile;
