import React from 'react';
import Head from 'next/head';

const TerminosPC = () => (
  <div className="bg-black min-h-screen text-gray-300 p-20 font-sans">
    <Head><title>Términos de Uso — Estudios 421</title></Head>
    <h1 className="text-[#F09800] text-4xl font-black mb-10 uppercase italic">Términos de Uso</h1>
    <div className="max-w-4xl space-y-8 text-sm leading-relaxed">
      <section>
        <h2 className="text-white font-bold text-lg mb-2">1. Uso del Contenido</h2>
        <p>El material audiovisual en esta plataforma es propiedad de sus respectivas productoras. Estudios 421 actúa únicamente como un medio de difusión sin fines de lucro para la comunidad cristiana.</p>
      </section>
      <section>
        <h2 className="text-white font-bold text-lg mb-2">2. Responsabilidad</h2>
        <p>Al utilizar este sitio, el usuario acepta que el contenido es para visualización personal y no para reventa o explotación comercial ajena a los titulares de los derechos.</p>
      </section>
    </div>
  </div>
);
export default TerminosPC;
