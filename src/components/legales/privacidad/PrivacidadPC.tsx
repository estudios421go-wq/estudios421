import React from 'react';
import Head from 'next/head';

const PrivacidadPC = () => (
  <div className="bg-black min-h-screen text-gray-300 p-20 font-sans">
    <Head><title>Política de Privacidad — Estudios 421</title></Head>
    <h1 className="text-[#F09800] text-4xl font-black mb-10 uppercase italic">Política de Privacidad</h1>
    <div className="max-w-4xl space-y-8 text-sm leading-relaxed">
      <section>
        <h2 className="text-white font-bold text-lg mb-2">1. Compromiso de Privacidad</h2>
        <p>Estudios 421 no comercializa, vende ni distribuye información personal de sus usuarios. Como plataforma de difusión bíblica sin fines de lucro, nuestro único interés es facilitar el acceso al contenido.</p>
      </section>
      <section>
        <h2 className="text-white font-bold text-lg mb-2">2. Datos Técnicos</h2>
        <p>Podemos recolectar datos no identificables como el tipo de navegador o tiempo de estancia para optimizar la velocidad de nuestros reproductores.</p>
      </section>
    </div>
  </div>
);
export default PrivacidadPC;
