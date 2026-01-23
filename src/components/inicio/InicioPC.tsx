import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Slider from 'react-slick';
import { useRouter } from 'next/router';
import { FaPlay, FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import { BiDonateHeart } from 'react-icons/bi';
import { IoSearchOutline } from 'react-icons/io5';

// DATOS DE LOS BANNERS
const banners = [
  { id: 1, bg: "https://static.wixstatic.com/media/859174_8880c8a667894fd1af103a0336171721~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_6eb0c42c44e340d2a314f7be009d6e8a~mv2.png", desc: "Inspirada en el libro de Ester, esta historia revela cómo una joven guiada por su fe es llevada al corazón del imperio persa para cumplir un propósito divino." },
  { id: 2, bg: "https://static.wixstatic.com/media/859174_298156d13007436bade3f3219dac7771~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_373d72b97d7e49c6a2ed99da442b8e5a~mv2.png", desc: "En una etapa de corrupción espiritual, el reino de Israel se hunde bajo decisiones alejadas de Dios." },
  { id: 3, bg: "https://static.wixstatic.com/media/859174_3f7434c3c97d4ed982befff72cfdbd27~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_90bd74be414340e29671df248bade4a3~mv2.png", desc: "De perseguidor implacable a mensajero de Cristo, vive la transformación radical de Pablo de Tarso." }
];

const InicioPC = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const bannerSettings = {
    dots: true, infinite: true, speed: 1000, autoplay: true,
    autoplaySpeed: 5000, arrows: false, dotsClass: "slick-dots custom-dots",
  };

  return (
    <div className="bg-black min-h-screen text-white select-none">
      <Head><title>Estudios 421 — Inicio</title></Head>

      {/* NAVBAR INTEGRADO */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 px-8 py-4 flex items-center justify-between ${isScrolled ? 'bg-black shadow-lg' : 'bg-gradient-to-b from-black via-black/60 to-transparent'}`}>
        <div className="flex items-center gap-10">
          <Link href="/"><div className="relative w-[160px] h-[45px] cursor-pointer"><Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" fill className="object-contain" priority /></div></Link>
          <div className="flex gap-8">
            {['Inicio', 'Series Bíblicas', 'Series TV', 'Películas'].map((name, i) => (
              <Link key={i} href={name === 'Inicio' ? '/' : `/${name.toLowerCase().replace(' ', '-')}`} className="relative group text-white text-[15px] font-medium tracking-wide">
                {name}
                <span className="absolute -bottom-1 left-0 h-[3px] bg-[#FF8A00] transition-all duration-500 w-0 group-hover:w-full" />
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex gap-4 mr-4">
            {['ESP', 'ENG', 'PT'].map((lang) => <img key={lang} src={`https://static.wixstatic.com/media/859174_${lang === 'ESP' ? '367960b11c1c44ba89cd1582fd1b5776' : lang === 'ENG' ? '35112d9ffe234d6f9dcef16cf8f7544e' : '830f1c20656e4d44a819bedfc13a22cc'}~mv2.png`} className="w-7 h-7 cursor-pointer hover:scale-110 transition-transform" />)}
          </div>
          <div className="flex items-center bg-white/10 rounded-full px-4 py-1 border border-white/5"><IoSearchOutline className="text-white text-xl" /><input type="text" placeholder="Buscar..." className="bg-transparent border-none outline-none text-white text-sm ml-2 w-32" /></div>
          <Image src="https://static.wixstatic.com/media/859174_26ca840644ce4f519c0458c649f44f34~mv2.png" alt="User" width={30} height={30} className="rounded-full ring-1 ring-white/20 hover:ring-[#FF8A00] cursor-pointer" />
        </div>
      </nav>

      {/* HERO BANNER INTEGRADO */}
      <section className="relative w-full h-[95vh] overflow-hidden">
        <Slider {...bannerSettings}>
          {banners.map((item) => (
            <div key={item.id} className="relative w-full h-[95vh] outline-none">
              <Image src={item.bg} alt="Banner" fill className="object-cover opacity-100" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent z-10 w-2/3" />
              <div className="absolute inset-0 z-20 flex flex-col justify-center px-20 pt-10">
                <div className="relative w-[450px] h-[160px] mb-6"><Image src={item.logo} alt="Logo" fill className="object-contain object-left" /></div>
                <p className="max-w-[550px] text-white text-[19px] font-medium mb-6 leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] text-justify">{item.desc}</p>
                <div className="flex items-center gap-4">
                  <button className="flex items-center justify-center gap-2 bg-[#F09800] text-white px-7 py-2.5 rounded font-bold hover:scale-105 transition-all"><FaPlay className="text-[10px]" /> Ver Ahora</button>
                  <button className="flex items-center justify-center gap-2 bg-white/10 text-white px-7 py-2.5 rounded font-bold backdrop-blur-md border border-white/20 hover:bg-white/20 hover:scale-105 transition-all"><HiOutlineInformationCircle className="text-xl" /> Más Información</button>
                  <button className="flex items-center justify-center gap-2 bg-[#F09800] text-white px-7 py-2.5 rounded font-bold hover:scale-105 transition-all"><BiDonateHeart className="text-xl" /> Donar</button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* CONTENIDO DE FILAS (VÍAS PLACEHOLDER) */}
      <main className="relative -mt-32 z-30 space-y-20 pb-20">
        <div className="px-20"><h2 className="text-white text-2xl font-bold mb-6 uppercase tracking-widest opacity-80">Próximamente</h2>
        <div className="grid grid-cols-6 gap-4">
          {[1,2,3,4,5,6].map(i => <div key={i} className="aspect-[2/3] bg-zinc-900 rounded-md border border-white/5 animate-pulse" />)}
        </div></div>
      </main>

      {/* FOOTER INTEGRADO */}
      <footer className="bg-[#0a0a0a] text-gray-400 py-12 px-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-end gap-6 mb-10">
            <FaFacebookF className="hover:text-white cursor-pointer" /><FaInstagram className="hover:text-white cursor-pointer" /><FaTiktok className="hover:text-white cursor-pointer" /><FaYoutube className="hover:text-white cursor-pointer" /><FaXTwitter className="hover:text-white cursor-pointer" />
          </div>
          <div className="mb-10 space-y-4">
            <p className="text-xs">© {currentYear} Estudios 421. Todos los derechos reservados sobre el diseño y edición.</p>
            <p className="text-[10px] text-gray-500 max-w-5xl">Aviso Legal: El contenido audiovisual pertenece a sus respectivos propietarios. Estudios 421 es una plataforma sin fines de lucro destinada a la difusión de contenido bíblico.</p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-[11px] font-medium uppercase tracking-widest border-t border-white/5 pt-8">
            <a href="#" className="hover:text-white transition-colors">Política de privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos de uso</a>
            <a href="#" className="hover:text-white transition-colors">Centro de ayuda</a>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        .custom-dots { bottom: 80px !important; z-index: 50 !important; }
        .custom-dots li button:before { color: white !important; font-size: 10px !important; }
        .custom-dots li.slick-active button:before { color: #F09800 !important; }
      `}</style>
    </div>
  );
};

export default InicioPC;
