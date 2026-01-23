import React from 'react';
import Head from 'next/head';

const AnunciosTV = () => {
  return (
    <div className="bg-black min-h-screen flex items-center justify-center p-20 font-sans">
      <Head><title>Anuncios — Smart TV</title></Head>
      
      <div className="flex gap-16 items-center max-w-7xl">
        {/* Lado Izquierdo: Icono/Branding */}
        <div className="flex-shrink-0">
          <div className="w-40 h-40 bg-zinc-900 rounded-full flex items-center justify-center border-4 border-[#F09800] shadow-[0_0_50px_rgba(240,152,0,0.2)]">
            <span className="text-[#F09800] text-6xl font-black">!</span>
          </div>
        </div>

        {/* Lado Derecho: Contenido */}
        <div className="flex-grow">
          <h1 className="text-white text-6xl font-black uppercase mb-8 tracking-tighter">
            Política de <span className="text-[#F09800]">Anuncios</span>
          </h1>
          
          <div className="space-y-8 max-w-4xl">
            <p className="text-2xl text-gray-400 leading-relaxed">
              Nuestra plataforma se financia mediante donaciones voluntarias. La publicidad es un recurso <span className="text-white font-bold">intermitente</span>.
            </p>
            
            <div className="grid grid-cols-2 gap-10">
              <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                <h2 className="text-[#F09800] text-xl font-bold mb-4 uppercase">Estado: Donaciones</h2>
                <p className="text-lg text-gray-500">Si las donaciones cubren el mes, disfrutarás de contenido 100% libre de anuncios.</p>
              </div>
              
              <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                <h2 className="text-[#F09800] text-xl font-bold mb-4 uppercase">Estado: Emergencia</h2>
                <p className="text-lg text-gray-500">Si el presupuesto no se alcanza, se activan anuncios breves para evitar el cierre.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnunciosTV;
