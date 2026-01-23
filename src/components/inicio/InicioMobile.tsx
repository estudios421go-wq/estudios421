import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Slider from 'react-slick';
import { useRouter } from 'next/router';
import { FaPlay } from 'react-icons/fa';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import { BiDonateHeart } from 'react-icons/bi';
import { IoSearchOutline, IoMenuOutline, IoCloseOutline } from 'react-icons/io5';

const banners = [
  { id: 1, bg: "https://static.wixstatic.com/media/859174_8880c8a667894fd1af103a0336171721~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_6eb0c42c44e340d2a314f7be009d6e8a~mv2.png", desc: "Una joven guiada por su fe es llevada al corazón del imperio persa para cumplir un propósito divino." },
  { id: 2, bg: "https://static.wixstatic.com/media/859174_298156d13007436bade3f3219dac7771~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_373d72b97d7e49c6a2ed99da442b8e5a~mv2.png", desc: "El reino de Israel se hunde bajo decisiones alejadas de Dios. Idolatría y guerras se entrelazan." },
  { id: 3, bg: "https://static.wixstatic.com/media/859174_3f7434c3c97d4ed982befff72cfdbd27~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_90bd74be414340e29671df248bade4a3~mv2.png", desc: "De perseguidor implacable a mensajero de Cristo, vive la transformación radical de Pablo de Tarso." }
];

const InicioMobile = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const bannerSettings = {
    dots: true, infinite: true, speed: 800, autoplay: true, autoplaySpeed: 4000,
    arrows: false, dotsClass: "slick-dots mobile-dots",
  };

  const rowSettings = {
    dots: false, infinite: false, speed: 500, slidesToShow: 2.2, slidesToScroll: 1, arrows: false,
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans overflow-x-hidden">
      <Head><title>Estudios 421 — Móvil</title></Head>

      {/* NAVBAR MÓVIL RESCATADO */}
      <nav className={`fixed top-0 w-full z-[100] px-4 py-3 flex items-center gap-4 transition-all duration-300 ${isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black/90 to-transparent'}`}>
        <button className="text-white text-3xl z-[110]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <IoCloseOutline /> : <IoMenuOutline />}
        </button>
        <Link href="/"><div className="relative w-[100px] h-[30px]"><Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" fill className="object-contain" /></div></Link>
        <div className="flex-grow relative"><IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} /><input type="text" placeholder="Buscar..." className="w-full bg-white/10 border border-white/20 rounded-full py-1 pl-8 pr-4 text-[10px] text-white outline-none" /></div>
      </nav>

      {/* MENÚ LATERAL */}
      <div className={`fixed inset-0 bg-black/98 z-[90] transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full pt-24 px-8 gap-8">
          {['Inicio', 'Series Bíblicas', 'Series TV', 'Películas'].map((name) => (
            <Link key={name} href="/" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold border-b border-white/5 pb-2">{name}</Link>
          ))}
        </div>
      </div>

      {/* HERO BANNER MÓVIL OPTIMIZADO */}
      <section className="relative w-full h-[80vh]">
        <Slider {...bannerSettings}>
          {banners.map((item) => (
            <div key={item.id} className="relative w-full h-[80vh] outline-none">
              <Image src={item.bg} alt="Banner" fill className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end px-6 pb-16 text-center items-center">
                <div className="relative w-[220px] h-[80px] mb-4"><Image src={item.logo} alt="Logo" fill className="object-contain" /></div>
                <p className="text-xs text-gray-200 mb-6 line-clamp-3 px-4">{item.desc}</p>
                <div className="flex flex-col w-full gap-3">
                  <button className="flex items-center justify-center gap-2 bg-[#F09800] py-3 rounded-md font-bold text-sm"><FaPlay size={10}/> Ver Ahora</button>
                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 py-3 rounded-md text-xs font-bold"><HiOutlineInformationCircle size={16}/> Info</button>
                    <button className="flex-1 flex items-center justify-center gap-2 bg-[#F09800] py-3 rounded-md text-xs font-bold"><BiDonateHeart size={16}/> Donar</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* CARRUSELES MÓVILES */}
      <main className="py-8 space-y-8">
        <div className="pl-6">
          <h2 className="text-white text-sm font-bold uppercase tracking-widest mb-4 opacity-80">Series Bíblicas</h2>
          <Slider {...rowSettings}>
            {[1,2,3,4,5].map(i => (
              <div key={i} className="px-1 outline-none">
                <div className="aspect-[2/3] bg-zinc-900 rounded-md border border-white/5 relative overflow-hidden">
                   <div className="absolute inset-0 flex items-center justify-center text-[10px] text-gray-500">Próximamente</div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </main>

      <style jsx global>{`
        .mobile-dots { bottom: 20px !important; }
        .mobile-dots li button:before { color: white !important; font-size: 6px !important; opacity: 0.5; }
        .mobile-dots li.slick-active button:before { color: #F09800 !important; opacity: 1; }
      `}</style>
    </div>
  );
};

export default InicioMobile;
