import React from 'react';
import Head from 'next/head';

const InicioEN_PC = () => {
  return (
    <div className="bg-black min-h-screen text-white flex flex-col items-center justify-center">
      <Head><title>Home — Estudios 421 (English)</title></Head>
      <h1 className="text-5xl font-black uppercase tracking-tighter mb-4 italic">Welcome</h1>
      <p className="text-[#F09800] tracking-[0.5em] uppercase text-sm font-light">English Version — In Development</p>
      <div className="mt-10 w-20 h-1 bg-white/20" />
    </div>
  );
};

export default InicioEN_PC;
