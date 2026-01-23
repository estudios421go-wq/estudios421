import React from 'react';
import Head from 'next/head';

const InicioPT_TV = () => {
  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center text-center font-sans overflow-hidden">
      <Head>
        <title>Smart TV — Português</title>
      </Head>
      
      <div className="scale-150">
        <h1 className="text-white text-7xl font-black uppercase italic mb-2 tracking-tighter">
          Bem-vindo
        </h1>
        <div className="h-1.5 w-full bg-[#F09800] shadow-[0_0_30px_#F09800]" />
        <p className="text-white/20 text-xl font-light tracking-[1em] mt-6 uppercase">
          Experiência Smart TV
        </p>
      </div>

      <div className="mt-32 flex gap-10 opacity-5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="w-80 h-44 bg-white rounded-2xl" />
        ))}
      </div>
    </div>
  );
};

export default InicioPT_TV;
