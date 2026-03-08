import React from 'react';
import { useRouter } from 'next/router';
import { IoHeartOutline, IoArrowBackOutline } from 'react-icons/io5';

const BenHurPC = () => {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center px-20 overflow-hidden font-sans select-none">
      {/* Fondo decorativo sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FF8A00]/10 via-transparent to-transparent opacity-40" />

      <div className="relative z-10 max-w-4xl text-center space-y-10 animate-fade-in">
        {/* Título de la Serie */}
        <h1 className="text-7xl font-black tracking-[0.2em] uppercase text-white drop-shadow-2xl">
          Ben-Hur <span className="text-[#FF8A00] block text-2xl tracking-[0.5em] mt-4">La Serie</span>
        </h1>

        {/* Sinopsis con Adrenalina */}
        <p className="text-xl leading-relaxed text-gray-300 font-medium italic">
          "¡Prepara tu corazón para la travesía más grande de redención! En un mundo de imperios implacables y traiciones de sangre, la sed de venganza de un príncipe judío se enfrentará cara a cara con la mirada divina que cambia el odio por perdón. Una superproducción épica que te llevará desde las profundas galeras romanas hasta el encuentro glorioso que dividió la historia en dos. ¡Muy pronto en Estudios 421!"
        </p>

        {/* Bloque de Donación */}
        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md space-y-4">
          <p className="text-[#FF8A00] text-lg font-bold uppercase tracking-widest">
            Si esta en tus posibilidades ayudar a este sitio, puedes hacerlo mediante el botón de donación
          </p>
          <p className="text-sm text-gray-400 max-w-2xl mx-auto">
            Tu generosidad es la semilla que permite traer estas historias de fe en la más alta calidad y audio latino. Si está en tus posibilidades, apóyanos para seguir expandiendo el mensaje bíblico a todo el mundo.
          </p>
          <button 
            onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS', '_blank')}
            className="mt-4 flex items-center gap-2 mx-auto bg-transparent border-2 border-[#FF8A00] text-[#FF8A00] px-8 py-2 rounded-full font-black hover:bg-[#FF8A00] hover:text-black transition-all active:scale-95 text-sm uppercase"
          >
            <IoHeartOutline size={18} /> Donar Ahora
          </button>
        </div>

        {/* Botón Volver */}
        <button 
          onClick={() => router.push('/')}
          className="group flex items-center gap-3 mx-auto bg-white text-black px-12 py-4 rounded-sm font-black uppercase tracking-tighter hover:bg-[#FF8A00] hover:text-white transition-all shadow-xl active:scale-95"
        >
          <IoArrowBackOutline className="group-hover:-translate-x-2 transition-transform" />
          Volver al Inicio
        </button>
      </div>
    </div>
  );
};

export default BenHurPC;
