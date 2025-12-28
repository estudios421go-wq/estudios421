import React, { useRef } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import { BiDonateHeart } from 'react-icons/bi';

const banners = [
  { id: 1, bg: "https://static.wixstatic.com/media/859174_8880c8a667894fd1af103a0336171721~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_6eb0c42c44e340d2a314f7be009d6e8a~mv2.png", desc: "Inspirada en el libro de Ester, esta historia revela cómo una joven guiada por su fe es llevada al corazón del imperio persa para cumplir un propósito divino." },
  // ... (mantén todos los banners igual)
];

export default function HeroBanner() {
  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 4500,
    pauseOnHover: false,
    pauseOnFocus: false,
    arrows: false,
    dotsClass: "slick-dots custom-dots",
  };

  return (
    <section className="relative w-full h-[95vh] bg-black overflow-hidden">
      <Slider ref={sliderRef} {...settings}>
        {banners.map((item) => (
          <div key={item.id} className="relative w-full h-[95vh] outline-none">
            <div className="relative w-full h-full">
               <Image src={item.bg} alt="Banner" fill className="object-cover opacity-80" priority />
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent z-10" />
            
            <div className="absolute inset-0 z-20 flex flex-col justify-center px-20 mt-12">
              <div className="relative w-[380px] h-[140px] mb-6">
                <Image src={item.logo} alt="Logo" fill className="object-contain object-left" />
              </div>
              
              <p className="max-w-[480px] text-white text-[17px] font-medium mb-8 leading-relaxed drop-shadow-md text-justify opacity-90">
                {item.desc}
              </p>
              
              <div className="flex items-center gap-4">
                <button style={{ backgroundColor: '#F09800' }} className="flex items-center justify-center gap-1 text-white px-7 py-2.5 rounded font-bold text-base shadow-xl hover:scale-105 transition-transform">
                  <FaPlay className="text-xs" /> Ver
                </button>
                <button className="flex items-center justify-center gap-1 bg-white/10 text-white px-7 py-2.5 rounded font-bold backdrop-blur-md border border-white/20 text-base hover:bg-white/20">
                  <HiOutlineInformationCircle className="text-xl" /> Info
                </button>
                <button style={{ backgroundColor: '#F09800' }} className="flex items-center justify-center gap-1 text-white px-7 py-2.5 rounded font-bold text-base shadow-lg hover:scale-105 transition-transform">
                  <BiDonateHeart className="text-xl" /> Donar
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <style jsx global>{`
        .custom-dots { bottom: 70px !important; z-index: 50 !important; }
        .custom-dots li button:before { color: white !important; font-size: 8px !important; }
        .custom-dots li.slick-active button:before { color: #F09800 !important; }
      `}</style>
    </section>
  );
}