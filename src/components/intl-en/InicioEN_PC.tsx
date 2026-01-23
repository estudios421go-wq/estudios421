import React from 'react';
import Head from 'next/head';

const InicioEN_PC = () => {
  return (
    <div className="bg-black min-h-screen text-white flex flex-col items-center justify-center select-none font-sans">
      <Head>
        <title>Home — Estudios 421 (English)</title>
      </Head>
      
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-1 bg-[#F09800] mb-8 shadow-[0_0_20px_#F09800]" />
        <h1 className="text-6xl font-black uppercase tracking-tighter italic mb-4">
          Welcome
        </h1>
        <p className="text-gray-500 tracking-[0.6em] uppercase text-[10px] font-light">
          English Language Platform — Under Construction
        </p>
        
        <div className="mt-12 flex gap-6 opacity-20 italic font-bold uppercase text-xs tracking-widest">
          <span>Movies</span>
          <span>•</span>
          <span>Series</span>
          <span>•</span>
          <span>Live TV</span>
        </div>
      </div>

      <footer className="absolute bottom-10 text-gray-700 text-[10px] uppercase tracking-[0.4em]">
        © {new Date().getFullYear()} Estudios 421 — International Division
      </footer>
    </div>
  );
};

export default InicioEN_PC;
