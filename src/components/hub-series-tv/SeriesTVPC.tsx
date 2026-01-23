import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SeriesTVPC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-black min-h-screen text-white select-none">
      <Head><title>Series TV — Estudios 421</title></Head>
      
      <main className="p-20">
        <div className="flex items-center gap-6 mb-16">
          <div className="w-20 h-1 bg-[#F09800] shadow-[0_0_15px_#F09800]" />
          <h1 className="text-5xl font-black uppercase tracking-tighter">Series TV</h1>
        </div>

        {/* Grilla de Series */}
        <div className="grid grid-cols-4 gap-8">
          <div className="bg-zinc-900 aspect-[2/3] rounded-xl border border-white/5 flex flex-col items-center justify-center p-6 group">
            <span className="text-gray-600 font-bold uppercase text-center tracking-widest text-sm">Próximamente</span>
            <div className="mt-4 w-10 h-1 bg-zinc-800 group-hover:bg-[#F09800] transition-colors" />
          </div>
        </div>
      </main>

      <footer className="mt-20 border-t border-white/5 p-10 text-center text-gray-500 text-[10px] uppercase tracking-[0.3em]">
        © {currentYear} Estudios 421 — Catálogo General
      </footer>
    </div>
  );
};

export default SeriesTVPC;
