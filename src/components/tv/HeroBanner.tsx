import React from 'react';
import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import { BiDonateHeart } from 'react-icons/bi';

export default function TVHeroBanner() {
  return (
    <section className="relative w-full h-[90vh] bg-black overflow-hidden">
      <div className="absolute inset-0">
        <Image src="https://static.wixstatic.com/media/859174_8880c8a667894fd1af103a0336171721~mv2.jpg" alt="Banner" fill className="object-cover opacity-60" unoptimized />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
      <div className="absolute inset-0 z-20 flex flex-col justify-center px-24">
        <div className="relative w-[600px] h-[220px] mb-8">
          <Image src="https://static.wixstatic.com/media/859174_6eb0c42c44e340d2a314f7be009d6e8a~mv2.png" alt="Logo" fill className="object-contain object-left" />
        </div>
        <p className="max-w-[800px] text-white text-3xl mb-12 leading-relaxed opacity-95 drop-shadow-2xl">
          Inspirada en el libro de Ester, esta historia revela cómo una joven guiada por su fe es llevada al corazón del imperio persa.
        </p>
        <div className="flex items-center gap-8">
          <button className="flex items-center gap-4 bg-[#F09800] text-white px-12 py-5 rounded-lg font-black text-3xl border-4 border-transparent focus:border-white focus:scale-110 outline-none transition-all duration-300 shadow-2xl">
            <FaPlay /> VER AHORA
          </button>
          <button className="flex items-center gap-4 bg-white/20 text-white px-12 py-5 rounded-lg font-black text-3xl border-4 border-transparent focus:border-[#F09800] focus:scale-110 outline-none backdrop-blur-md transition-all duration-300">
            <HiOutlineInformationCircle /> INFO
          </button>
          <button className="flex items-center gap-4 bg-white/10 text-white px-12 py-5 rounded-lg font-black text-3xl border-4 border-transparent focus:border-[#F09800] focus:scale-110 outline-none transition-all duration-300">
            <BiDonateHeart /> DONAR
          </button>
        </div>
      </div>
    </section>
  );
}