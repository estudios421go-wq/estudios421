import { useEffect, useRef } from 'react';

export const useTVNavigation = (sectionId: string, priority: number = 0) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      const activeElement = document.activeElement as HTMLElement;
      
      // Si no hay nada enfocado, enfocar el primer elemento
      if (!activeElement || activeElement === document.body) {
        const firstFocusable = document.querySelector('.focusable-item') as HTMLElement;
        if (firstFocusable) {
          firstFocusable.focus();
          e.preventDefault();
          return;
        }
      }

      // Navegación vertical entre secciones
      if (e.key === 'ArrowDown') {
        const currentSection = activeElement.closest('[data-tv-section]');
        if (currentSection) {
          const allSections = Array.from(document.querySelectorAll('[data-tv-section]'));
          const currentIndex = allSections.indexOf(currentSection);
          
          if (currentIndex < allSections.length - 1) {
            const nextSection = allSections[currentIndex + 1];
            const nextFocusable = nextSection.querySelector('.focusable-item') as HTMLElement;
            
            if (nextFocusable) {
              e.preventDefault();
              nextFocusable.focus();
              
              // Scroll suave hacia la siguiente sección
              nextSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }
        }
      }

      if (e.key === 'ArrowUp') {
        const currentSection = activeElement.closest('[data-tv-section]');
        if (currentSection) {
          const allSections = Array.from(document.querySelectorAll('[data-tv-section]'));
          const currentIndex = allSections.indexOf(currentSection);
          
          if (currentIndex > 0) {
            const prevSection = allSections[currentIndex - 1];
            const prevFocusable = prevSection.querySelector('.focusable-item') as HTMLElement;
            
            if (prevFocusable) {
              e.preventDefault();
              prevFocusable.focus();
              
              // Scroll suave hacia la sección anterior
              prevSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }
        }
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  return containerRef;
};


// 2. NAVBAR MEJORADO (TVNavbar.tsx)

import Image from 'next/image';
import { IoSearchOutline } from 'react-icons/io5';
import { useTVNavigation } from '@/hooks/useTVNavigation';

const TVNavbar = () => {
  const containerRef = useTVNavigation('navbar', 1);
  const navLinks = ['Inicio', 'Series Bíblicas', 'Series TV', 'Películas'];
  
  const languages = [
    { name: 'ESP', img: "https://static.wixstatic.com/media/859174_367960b11c1c44ba89cd1582fd1b5776~mv2.png" },
    { name: 'ENG', img: "https://static.wixstatic.com/media/859174_35112d9ffe234d6f9dcef16cf8f7544e~mv2.png" },
    { name: 'PT', img: "https://static.wixstatic.com/media/859174_830f1c20656e4d44a819bedfc13a22cc~mv2.png" }
  ];

  return (
    <nav 
      ref={containerRef}
      data-tv-section="navbar"
      className="fixed top-0 w-full z-[100] bg-gradient-to-b from-black via-black/95 to-transparent px-16 py-8 flex items-center justify-between transition-all duration-500"
    >
      <div className="flex items-center gap-12">
        <div className="relative w-[200px] h-[55px]">
          <Image 
            src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" 
            alt="Logo" 
            fill 
            className="object-contain" 
            priority 
          />
        </div>
        <div className="flex gap-2">
          {navLinks.map((link, index) => (
            <button 
              key={link}
              tabIndex={0}
              className="focusable-item px-6 py-2.5 text-white text-xl font-bold rounded-md border-4 border-transparent focus:border-[#F09800] focus:bg-white/10 outline-none transition-all duration-300 transform focus:scale-105"
            >
              {link}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex gap-3 p-2 bg-white/5 rounded-xl border border-white/10">
          {languages.map((lang) => (
            <button 
              key={lang.name}
              tabIndex={0}
              className="focusable-item p-1 rounded-full border-4 border-transparent focus:border-[#F09800] outline-none transition-all transform focus:scale-110"
            >
              <img src={lang.img} alt={lang.name} className="w-9 h-9 object-contain" />
            </button>
          ))}
        </div>

        <button 
          tabIndex={0}
          className="focusable-item flex items-center gap-4 bg-white/10 px-7 py-2.5 rounded-full border-4 border-transparent focus:border-[#F09800] focus:bg-white/20 outline-none text-white transition-all shadow-lg transform focus:scale-105"
        >
          <IoSearchOutline className="text-2xl" />
          <span className="text-lg font-medium">Buscar</span>
        </button>

        <button 
          tabIndex={0}
          className="focusable-item rounded-full border-4 border-transparent focus:border-[#F09800] outline-none transition-all transform focus:scale-110"
        >
          <Image 
            src="https://static.wixstatic.com/media/859174_26ca840644ce4f519c0458c649f44f34~mv2.png" 
            alt="User" 
            width={50} 
            height={50} 
            className="rounded-full ring-2 ring-white/20" 
          />
        </button>
      </div>
    </nav>
  );
};

export default TVNavbar;

// 3. HERO BANNER MEJORADO (TVHeroBanner.tsx)

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import { BiDonateHeart } from 'react-icons/bi';
import { useTVNavigation } from '@/hooks/useTVNavigation';

export default function TVHeroBanner() {
  const containerRef = useTVNavigation('hero', 2);
  const verAhoraRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Auto-focus en el primer botón al cargar
    const timer = setTimeout(() => {
      if (verAhoraRef.current) {
        verAhoraRef.current.focus();
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section 
      ref={containerRef}
      data-tv-section="hero"
      className="relative w-full h-[85vh] bg-black overflow-hidden flex items-end pb-24"
    >
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

      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent z-10 w-1/2" />
      
      <div className="absolute inset-0 z-20 flex flex-col justify-center px-24 pt-20">
        <div className="relative w-[550px] h-[200px] mb-6 transform transition-transform duration-500">
          <Image 
            src="https://static.wixstatic.com/media/859174_6eb0c42c44e340d2a314f7be009d6e8a~mv2.png" 
            alt="Logo" 
            fill 
            className="object-contain object-left" 
          />
        </div>
        
        <p className="max-w-[750px] text-white text-3xl mb-10 leading-relaxed opacity-95 drop-shadow-[0_4px_15px_rgba(0,0,0,1)] font-medium">
          Inspirada en el libro de Ester, esta historia revela cómo una joven guiada por su fe es llevada al corazón del imperio persa para cumplir un propósito divino.
        </p>
        
        <div className="flex items-center gap-8">
          <button 
            ref={verAhoraRef}
            tabIndex={0}
            className="focusable-item flex items-center gap-4 bg-[#F09800] text-white px-12 py-5 rounded-xl font-black text-2xl border-4 border-transparent focus:border-white focus:scale-110 outline-none transition-all duration-300 shadow-[0_10px_40px_rgba(240,152,0,0.5)]"
          >
            <FaPlay className="text-xl" /> VER AHORA
          </button>
          
          <button 
            tabIndex={0}
            className="focusable-item flex items-center gap-4 bg-white/10 text-white px-10 py-5 rounded-xl font-black text-2xl border-4 border-transparent focus:border-[#F09800] focus:scale-110 outline-none backdrop-blur-md transition-all duration-300"
          >
            <HiOutlineInformationCircle className="text-3xl" /> INFO
          </button>
          
          <button 
            tabIndex={0}
            className="focusable-item flex items-center gap-4 bg-white/5 text-white px-10 py-5 rounded-xl font-black text-2xl border-4 border-transparent focus:border-[#F09800] focus:scale-110 outline-none transition-all duration-300"
          >
            <BiDonateHeart className="text-3xl" /> DONAR
          </button>
        </div>
      </div>
    </section>
  );
}

// 4. FILA DE PELÍCULAS MEJORADA (TVMovieRow.tsx)

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { useTVNavigation } from '@/hooks/useTVNavigation';

interface Movie { 
  id: number; 
  title: string; 
  image: string; 
  isLatino: boolean; 
}

interface TVMovieRowProps { 
  title: string; 
  movies: Movie[];
  rowIndex: number; // Nuevo: para identificar la fila
}

const TVMovieRow = ({ title, movies, rowIndex }: TVMovieRowProps) => {
  const containerRef = useTVNavigation(`row-${rowIndex}`, 3 + rowIndex);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Navegación horizontal mejorada con scroll automático
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const parent = e.currentTarget.parentElement;
    if (!parent) return;

    const items = parent.querySelectorAll('.focusable-item');
    
    if (e.key === 'ArrowRight' && index < items.length - 1) {
      e.preventDefault();
      const nextItem = items[index + 1] as HTMLElement;
      nextItem.focus();
      
      // Scroll automático
      if (scrollContainerRef.current) {
        const itemWidth = nextItem.offsetWidth + 20; // ancho + gap
        scrollContainerRef.current.scrollBy({ 
          left: itemWidth, 
          behavior: 'smooth' 
        });
      }
    } 
    else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      const prevItem = items[index - 1] as HTMLElement;
      prevItem.focus();
      
      // Scroll automático hacia atrás
      if (scrollContainerRef.current) {
        const itemWidth = prevItem.offsetWidth + 20;
        scrollContainerRef.current.scrollBy({ 
          left: -itemWidth, 
          behavior: 'smooth' 
        });
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      data-tv-section={`row-${rowIndex}`}
      className="mb-2 px-16 outline-none overflow-hidden"
    >
      <h2 className="text-white/40 text-xl font-black mb-1 uppercase tracking-[0.2em] ml-4 text-left">
        {title}
      </h2>
      
      <div 
        ref={scrollContainerRef}
        className="flex gap-5 overflow-x-auto no-scrollbar py-6 px-4 snap-x snap-mandatory scroll-smooth"
      >
        {movies.map((movie, index) => (
          <button 
            key={`${title}-${movie.id}`}
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="focusable-item relative flex-shrink-0 w-[240px] aspect-[2/3] rounded-xl border-[5px] border-transparent focus:border-[#F09800] focus:scale-110 outline-none transition-all duration-300 shadow-2xl snap-center group will-change-transform bg-zinc-900"
          >
            <div className="relative w-full h-full rounded-md overflow-hidden ring-1 ring-white/10">
              <Image 
                src={movie.image} 
                alt={movie.title} 
                fill 
                className="object-cover" 
                unoptimized 
                priority
                loading="eager"
              />
            </div>
            
            <div className="absolute bottom-4 left-4 z-20">
              <span className={`text-[10px] font-black px-2.5 py-1 rounded shadow-md ${
                movie.isLatino 
                  ? 'bg-[#F09800] text-white' 
                  : 'bg-black/90 text-white border border-white/20'
              }`}>
                {movie.isLatino ? 'LAT' : 'SUB'}
              </span>
            </div>
          </button>
        ))}
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { 
          -ms-overflow-style: none; 
          scrollbar-width: none;
          transform: translateZ(0); 
        }
        .snap-center { scroll-margin: 100px; }
        
        .focusable-item:focus {
          z-index: 100;
          box-shadow: 0 0 50px rgba(240, 152, 0, 0.4);
        }
      `}</style>
    </div>
  );
};

export default TVMovieRow;

// 5. FOOTER MEJORADO (Footer.tsx)

import React from 'react';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useTVNavigation } from '@/hooks/useTVNavigation';

const Footer = () => {
  const containerRef = useTVNavigation('footer', 99);
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      ref={containerRef}
      data-tv-section="footer"
      className="bg-[#0a0a0a] text-gray-400 py-12 px-8 md:px-16 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        
        <div className="flex justify-center md:justify-end gap-6 mb-10">
          <a 
            href="#"
            tabIndex={0}
            className="focusable-item hover:text-white transition-colors text-xl border-2 border-transparent focus:border-[#F09800] rounded-full p-2 outline-none"
          >
            <FaFacebookF />
          </a>
          <a 
            href="#"
            tabIndex={0}
            className="focusable-item hover:text-white transition-colors text-xl border-2 border-transparent focus:border-[#F09800] rounded-full p-2 outline-none"
          >
            <FaInstagram />
          </a>
          <a 
            href="#"
            tabIndex={0}
            className="focusable-item hover:text-white transition-colors text-xl border-2 border-transparent focus:border-[#F09800] rounded-full p-2 outline-none"
          >
            <FaTiktok />
          </a>
          <a 
            href="#"
            tabIndex={0}
            className="focusable-item hover:text-white transition-colors text-xl border-2 border-transparent focus:border-[#F09800] rounded-full p-2 outline-none"
          >
            <FaYoutube />
          </a>
          <a 
            href="#"
            tabIndex={0}
            className="focusable-item hover:text-white transition-colors text-xl border-2 border-transparent focus:border-[#F09800] rounded-full p-2 outline-none"
          >
            <FaXTwitter />
          </a>
        </div>

        <div className="mb-10 space-y-4">
          <p className="text-xs leading-relaxed max-w-4xl">
            © {currentYear} Estudios 421. Todos los derechos reservados sobre el diseño y edición de la plataforma.
          </p>
          <p className="text-[10px] md:text-xs leading-relaxed text-gray-500 max-w-5xl">
            Aviso Legal: El contenido audiovisual compartido en este sitio pertenece a sus respectivos propietarios y productoras (Record TV, Seriella Productions, Casablanca Productions, Amazon Content Services LLC, entre otros). Estudios 421 es una plataforma sin fines de lucro destinada a la difusión de contenido bíblico para la comunidad. No reclamamos propiedad sobre las series o películas mostradas.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-4 text-[11px] md:text-xs font-medium uppercase tracking-widest border-t border-white/5 pt-8">
          <a 
            href="#"
            tabIndex={0}
            className="focusable-item hover:text-white transition-colors border-b-2 border-transparent focus:border-[#F09800] outline-none"
          >
            Política de privacidad
          </a>
          <a 
            href="#"
            tabIndex={0}
            className="focusable-item hover:text-white transition-colors border-b-2 border-transparent focus:border-[#F09800] outline-none"
          >
            Términos de uso
          </a>
          <a 
            href="#"
            tabIndex={0}
            className="focusable-item hover:text-white transition-colors border-b-2 border-transparent focus:border-[#F09800] outline-none"
          >
            Configuración de cookies
          </a>
          <a 
            href="#"
            tabIndex={0}
            className="focusable-item hover:text-white transition-colors border-b-2 border-transparent focus:border-[#F09800] outline-none"
          >
            Especificaciones de anuncios
          </a>
          <a 
            href="#"
            tabIndex={0}
            className="focusable-item hover:text-white transition-colors border-b-2 border-transparent focus:border-[#F09800] outline-none"
          >
            Centro de ayuda
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
