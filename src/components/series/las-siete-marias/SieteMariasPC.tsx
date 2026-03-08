import React from 'react';
import { useRouter } from 'next/router';
import { IoHeartOutline, IoArrowBackOutline } from 'react-icons/io5';

const SieteMariasPC = () => {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center px-20 overflow-hidden font-sans select-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FF8A00]/10 via-transparent to-transparent opacity-40" />

      <div className="relative z-10 max-w-4xl text-center space-y-10 animate-fade-in">
        <h1 className="text-7xl font-black tracking-[0.2em] uppercase text-white drop-shadow-2xl">
          Las Siete <span className="text-[#FF8A00] block text-2xl tracking-[0.5em] mt-4">Marías</span>
        </h1>

        <p className="text-xl leading-relaxed text-gray-300 font-medium italic">
          "¡Siete destinos unidos por la mirada del Maestro! Acompaña a estas valientes mujeres en un recorrido de fe absoluta, desde el milagro del nacimiento hasta el triunfo de la resurrección. Descubre cómo la gracia divina empoderó sus voces para cambiar el curso de la humanidad. Una superproducción brasileña íntima y poderosa que revela la lealtad que no conoce miedos. ¡Próximamente en Estudios 421!"
        </p>

        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md space-y-4 text-center">
          <p className="text-[#FF8A00] text-lg font-bold uppercase tracking-widest">
            ¿Deseas ayudarnos a llevar este mensaje de fe a más hogares?
          </p>
          <p className="text-sm text-gray-400 max-w-2xl mx-auto">
            Tu generosidad permite que sigamos compartiendo contenidos que inspiran el alma. Si está en tus posibilidades, apóyanos con una donación para garantizar la mejor calidad en audio latino para este gran estreno.
          </p>
          <button 
            onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS', '_blank')}
            className="mt-4 flex items-center gap-2 mx-auto bg-transparent border-2 border-[#FF8A00] text-[#FF8A00] px-8 py-2 rounded-full font-black hover:bg-[#FF8A00] hover:text-black transition-all active:scale-95 text-sm uppercase"
          >
            <IoHeartOutline size={18} /> Apoyar este Estreno
          </button>
        </div>

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

export default SieteMariasPC;
