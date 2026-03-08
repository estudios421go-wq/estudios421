import React from 'react';
import { useRouter } from 'next/router';
import { IoHeartOutline, IoArrowBackOutline } from 'react-icons/io5';

const AmorRuinasPC = () => {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center px-20 overflow-hidden font-sans select-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FF8A00]/10 via-transparent to-transparent opacity-40" />

      <div className="relative z-10 max-w-4xl text-center space-y-10 animate-fade-in">
        <h1 className="text-7xl font-black tracking-[0.2em] uppercase text-white drop-shadow-2xl">
          Amor en <span className="text-[#FF8A00] block text-2xl tracking-[0.5em] mt-4">Ruinas</span>
        </h1>

        <p className="text-xl leading-relaxed text-gray-300 font-medium italic">
          "¡Donde la esperanza parece muerta, la fe reconstruye imperios! En medio de una nación que ha olvidado su herencia espiritual, surge una historia de fidelidad inquebrantable. Descubre cómo el amor verdadero y la devoción a Dios pueden florecer incluso sobre las cenizas del pasado. Una narrativa poderosa sobre la reconstrucción de la identidad de un pueblo en tiempos de crisis profética. ¡Próximamente una experiencia transformadora!"
        </p>

        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md space-y-4 text-center">
          <p className="text-[#FF8A00] text-lg font-bold uppercase tracking-widest">
            ¡Ayúdanos a reconstruir la fe a través de la pantalla!
          </p>
          <p className="text-sm text-gray-400 max-w-2xl mx-auto">
            Tu apoyo financiero nos permite adquirir y doblar estas joyas brasileñas en alta definición. Si está en tus posibilidades, haz una donación hoy para que estas historias lleguen a cada rincón con la mejor calidad posible.
          </p>
          <button 
            onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS', '_blank')}
            className="mt-4 flex items-center gap-2 mx-auto bg-transparent border-2 border-[#FF8A00] text-[#FF8A00] px-8 py-2 rounded-full font-black hover:bg-[#FF8A00] hover:text-black transition-all active:scale-95 text-sm uppercase"
          >
            <IoHeartOutline size={18} /> Apoyar este Proyecto
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

export default AmorRuinasPC;
