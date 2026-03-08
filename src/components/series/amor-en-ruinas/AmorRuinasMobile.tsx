import React from 'react';
import { useRouter } from 'next/router';
import { IoHeart, IoHomeSharp } from 'react-icons/io5';

const AmorRuinasMobile = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center px-8 py-20 font-sans text-left relative overflow-hidden">
      <div className="absolute top-[-10%] left-0 w-full h-[40%] bg-gradient-to-b from-[#FF8A00]/20 to-transparent opacity-30" />

      <div className="relative z-10 space-y-8">
        <h1 className="text-4xl font-black uppercase leading-tight tracking-tighter">
          Amor en<br/>
          <span className="text-[#FF8A00] text-lg tracking-[0.3em]">Ruinas</span>
        </h1>

        <div className="w-12 h-1 bg-[#FF8A00]" />

        <p className="text-base leading-relaxed text-gray-400 font-medium">
          "Incluso en las cenizas, Dios tiene un plan de restauración. Acompaña a Israel en su hora más oscura y descubre el poder de la fidelidad. ¡Muy pronto!"
        </p>

        <div className="bg-white/[0.03] border-l-4 border-[#FF8A00] p-6 space-y-4 text-left">
          <p className="text-xs font-black text-[#FF8A00] uppercase tracking-widest">Haz una siembra</p>
          <p className="text-xs text-gray-500 leading-relaxed">
            Apóyanos con una donación para traerte esta nueva serie en alta calidad y audio latino. ¡Tu ayuda es vital!
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

export default AmorRuinasMobile;
