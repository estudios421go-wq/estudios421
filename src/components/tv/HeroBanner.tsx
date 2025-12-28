import React from 'react';
import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import { BiDonateHeart } from 'react-icons/bi';

export default function TVHeroBanner() {
  return (
    <section className="relative w-full h-[85vh] bg-black overflow-hidden">
      <div className="absolute inset-0">
        <Image src="https://static.wixstatic.com/media/859174_8880c8a667894fd1af103a0336171721~mv2.jpg" alt="Banner" fill className="object-cover opacity-60" priority />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
      
      <div className="absolute inset-0 z-20 flex flex-col justify-center px-20">
        <div className="relative w-[500px] h-[180px] mb-8">
          <Image src="https://static.wixstatic.com/media/859174_6eb0c42c44e340d2a314f7be009d6e8a~mv2.png" alt="Logo" fill className="object-contain object-left" />
        </div>
        
        <p className="max-w-[700px] text-white text-2xl mb-12 leading-relaxed opacity-90 drop-shadow-lg">
          Inspirada en el libro de Ester, esta historia revela cómo una joven guiada por su fe es llevada al corazón del imperio persa.
        </p>
        
        <div className="flex items-center gap-6">
          <button className="flex items-center gap-3 bg-[#F09800] text-white px-10 py-4 rounded-md font-bold text-2xl border-4 border-transparent focus:border-white focus:scale-110 outline-none transition-all shadow-2xl">
            <FaPlay /> Ver Ahora
          </button>
          <button className="flex items-center gap-3 bg-white/20 text-white px-10 py-4 rounded-md font-bold text-2xl border-4 border-transparent focus:border-[#F09800] focus:scale-110 outline-none backdrop-blur-md transition-all">
            <HiOutlineInformationCircle /> Más Información
          </button>
          <button className="flex items-center gap-3 bg-white/10 text-white px-10 py-4 rounded-md font-bold text-2xl border-4 border-transparent focus:border-[#F09800] focus:scale-110 outline-none transition-all">
            <BiDonateHeart /> Donar
          </button>
        </div>
      </div>
    </section>
  );
}