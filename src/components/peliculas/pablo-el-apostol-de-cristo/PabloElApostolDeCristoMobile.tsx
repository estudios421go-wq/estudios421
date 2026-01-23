import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Footer from '../../Footer';

const PabloElApostolDeCristoMobile = () => (
  <div className="bg-black min-h-screen text-white font-sans flex flex-col text-center">
    <Head><title>Pablo, el apóstol de Cristo — Móvil</title></Head>
    <div className="flex-grow flex flex-col items-center justify-center px-8 relative text-center">
      <div className="w-16 h-1 bg-[#FF8A00] mb-6 shadow-[0_0_10px_#FF8A00] mx-auto" />
      <h1 className="text-3xl font-black uppercase tracking-widest mb-2 leading-tight">Pablo</h1>
      <p className="text-[#FF8A00] text-[10px] font-bold tracking-widest uppercase mb-6 animate-pulse">El apóstol de Cristo</p>
      <p className="text-gray-500 text-xs leading-relaxed mb-10">La historia del hombre que pasó de perseguidor a seguidor, pronto en tu móvil.</p>
      <Link href="/" className="w-full">
        <button className="w-full bg-white text-black font-black py-4 rounded-xl text-xs uppercase tracking-widest active:scale-95 transition-transform">
          Volver al inicio
        </button>
      </Link>
    </div>
    <Footer />
  </div>
);

export default PabloElApostolDeCristoMobile;
