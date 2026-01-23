import React from 'react';

const InicioTV = () => {
  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center text-center p-10">
      <div className="w-32 h-1 bg-[#F09800] mb-8 shadow-[0_0_20px_#F09800]" />
      <h1 className="text-white text-4xl font-black uppercase tracking-[0.3em] mb-4">Modo Smart TV</h1>
      <p className="text-gray-500 text-sm uppercase tracking-widest font-bold">Interfaz en desarrollo para dispositivos de pantalla grande</p>
      <div className="mt-12 grid grid-cols-4 gap-6 opacity-20">
        {[1,2,3,4].map(i => (
          <div key={i} className="w-48 aspect-video bg-zinc-800 rounded-lg border border-white/10" />
        ))}
      </div>
    </div>
  );
};

export default InicioTV;
