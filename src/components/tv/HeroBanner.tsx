import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import { BiDonateHeart } from 'react-icons/bi';

export default function TVHeroBanner() {
  // Referencia para capturar el botón principal
  const verAhoraRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Forzamos el foco inicial para activar la navegación del control remoto
    if (verAhoraRef.current) {
      verAhoraRef.current.focus();
    }
  }, []);

  return (
    <section className="relative w-full h-[85vh] bg-black overflow-hidden flex items-end pb-24">
      {/* Fondo del Banner con brillo completo */}
      <div className="absolute inset-0">
        <Image 
          src="https://static.wixstatic.com/media/859174_8880c8a667894fd1af103a0336171721~mv2.jpg" 
          alt="Banner" 
          fill 
          className="object-cover opacity-100" 
          unoptimized 
          priority
        />
      </div>

      {/* Degradado equilibrado: solo para legibilidad inferior e izquierda */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent z-10 w-1/2" />
      
      {/* Contenido del Hero */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center px-24 pt-20">
        {/* Logo de la Serie */}
        <div className="relative w-[550px] h-[200px] mb-6 transform transition-transform duration-500">
          <Image 
            src="https://static.wixstatic.com/media/859174_6eb0c42c44e340d2a314f7be009d6e8a~mv2.png" 
            alt="Logo" 
            fill 
            className="object-contain object-left" 
          />
        </div>
        
        {/* Descripción nítida */}
        <p className="max-w-[750px] text-white text-3xl mb-10 leading-relaxed opacity-95 drop-shadow-[0_4px_15px_rgba(0,0,0,1)] font-medium">
          Inspirada en el libro de Ester, esta historia revela cómo una joven guiada por su fe es llevada al corazón del imperio persa para cumplir un propósito divino.
        </p>
        
        {/* Grupo de Botones Enfocables con Imán de Foco */}
        <div className="flex items-center gap-8">
          <button 
            ref={verAhoraRef}
            className="flex items-center gap-4 bg-[#F09800] text-white px-12 py-5 rounded-xl font-black text-2xl border-4 border-transparent focus:border-white focus:scale-110 outline-none transition-all duration-300 shadow-[0_10px_40px_rgba(240,152,0,0.5)]"
          >
            <FaPlay className="text-xl" /> VER AHORA
          </button>

          <button 
            className="flex items-center gap-4 bg-white/10 text-white px-10 py-5 rounded-xl font-black text-2xl border-4 border-transparent focus:border-[#F09800] focus:scale-110 outline-none backdrop-blur-md transition-all duration-300"
          >
            <HiOutlineInformationCircle className="text-3xl" /> INFO
          </button>

          <button 
            className="flex items-center gap-4 bg-white/5 text-white px-10 py-5 rounded-xl font-black text-2xl border-4 border-transparent focus:border-[#F09800] focus:scale-110 outline-none transition-all duration-300"
          >
            <BiDonateHeart className="text-3xl" /> DONAR
          </button>
        </div>
      </div>
    </section>
  );
}