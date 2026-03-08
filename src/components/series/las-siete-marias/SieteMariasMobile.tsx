import React from 'react';
import { useRouter } from 'next/router';
import { IoHeart, IoHomeSharp } from 'react-icons/io5';

const SieteMariasMobile = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center px-8 py-20 font-sans text-left relative overflow-hidden">
      <div className="absolute top-[-10%] left-0 w-full h-[40%] bg-gradient-to-b from-[#FF8A00]/20 to-transparent opacity-30" />

      <div className="relative z-10 space-y-8 text-left">
        <h1 className="text-4xl font-black uppercase leading-tight tracking-tighter">
          Las Siete<br/>
          <span className="text-[#FF8A00] text-lg tracking-[0.3em]">Marías</span>
        </h1>

        <div className="w-12 h-1 bg-[#FF8A00]" />

        <p className="text-base leading-relaxed text-gray-400 font-medium">
          "Unidas por la fe, transformadas por Su amor. Vive la historia sagrada a través de los ojos de las mujeres que nunca abandonaron al Maestro. ¡Muy pronto!"
        </p>

        <div className="bg-white/[0.03] border-l-4 border-[#FF8A00] p-6 space-y-4">
          <p className="text-xs font-black text-[#FF8A00] uppercase tracking-widest">Sé parte del proyecto</p>
          <p className="text-xs text-gray-500 leading-relaxed">
            Tu donación nos ayuda a traerte esta nueva serie en alta definición y audio latino. ¡Apóyanos!
          </p>
          <button 
            onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS', '_blank')}
            className="bg-[#FF8A00] text-black text-[10px] font-black px-6 py-2 rounded-full uppercase flex items-center gap-2"
          >
            <IoHeart /> Donar ahora
          </button>
        </div>

        <button 
          onClick={() => router.push('/')}
          className="w-full py-4 bg-white text-black font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <IoHomeSharp /> Volver al Inicio
        </button>
      </div>
    </div>
  );
};

export default SieteMariasMobile;
