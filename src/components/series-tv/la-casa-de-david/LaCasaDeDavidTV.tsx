import React from 'react';
import Head from 'next/head';

const LaCasaDeDavidTV = () => {
  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center text-center p-20 select-none">
      <Head>
        <title>La Casa de David — Smart TV</title>
      </Head>
      
      {/* Indicador visual de marca */}
      <div className="w-40 h-1.5 bg-[#FF8A00] mb-12 shadow-[0_0_30px_#FF8A00]" />
      
      {/* Título de gran formato para TV */}
      <h1 className="text-8xl font-black uppercase tracking-[0.4em] text-white mb-6">
        La Casa de David
      </h1>
      
      {/* Subtítulo dinámico */}
      <p className="text-[#FF8A00] text-2xl font-bold tracking-[0.6em] uppercase mb-12 animate-pulse">
        Experiencia Cinema en Desarrollo
      </p>
      
      {/* Mensaje de estado */}
      <p className="text-gray-400 text-3xl max-w-4xl leading-relaxed font-light">
        Esta serie está siendo optimizada para pantallas de gran formato. 
        Próximamente disponible en Ultra HD.
      </p>
      
      {/* Nota técnica para navegación con control remoto */}
      <div className="mt-20 py-4 px-10 border border-white/10 rounded-full">
        <p className="text-gray-600 text-xl uppercase tracking-widest">
          Presione cualquier tecla para regresar
        </p>
      </div>
    </div>
  );
};

export default LaCasaDeDavidTV;
