import React from 'react';
import Head from 'next/head';

const InicioEN_Mobile = () => {
  return (
    <div className="bg-black min-h-screen text-white flex flex-col items-center justify-center px-10 text-center select-none">
      <Head>
        <title>Mobile Home — English</title>
      </Head>
      
      <div className="w-12 h-0.5 bg-[#F09800] mb-6" />
      <h1 className="text-3xl font-black uppercase tracking-tighter italic mb-2">
        Welcome
      </h1>
      <p className="text-gray-600 tracking-[0.3em] uppercase text-[8px] leading-relaxed">
        Mobile Interface — English Version<br/>Coming Soon
      </p>

      <div className="mt-10 grid grid-cols-2 gap-2 w-full opacity-10">
        <div className="aspect-video bg-zinc-900 rounded" />
        <div className="aspect-video bg-zinc-900 rounded" />
      </div>
    </div>
  );
};

export default InicioEN_Mobile;
