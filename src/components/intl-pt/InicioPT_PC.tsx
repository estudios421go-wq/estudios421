import React from 'react';
import Head from 'next/head';

const InicioPT_PC = () => {
  return (
    <div className="bg-black min-h-screen text-white flex flex-col items-center justify-center select-none font-sans">
      <Head>
        <title>Início — Estudios 421 (Português)</title>
      </Head>
      
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-1 bg-[#F09800] mb-8 shadow-[0_0_20px_#F09800]" />
        <h1 className="text-6xl font-black uppercase tracking-tighter italic mb-4">
          Bem-vindo
        </h1>
        <p className="text-gray-500 tracking-[0.6em] uppercase text-[10px] font-light">
          Plataforma em Português — Em Construção
        </p>
        
        <div className="mt-12 flex gap-6 opacity-20 italic font-bold uppercase text-xs tracking-widest">
          <span>Filmes</span>
          <span>•</span>
          <span>Séries</span>
          <span>•</span>
          <span>TV ao Vivo</span>
        </div>
      </div>

      <footer className="absolute bottom-10 text-gray-700 text-[10px] uppercase tracking-[0.4em]">
        © {new Date().getFullYear()} Estudios 421 — Divisão Internacional
      </footer>
    </div>
  );
};

export default InicioPT_PC;
