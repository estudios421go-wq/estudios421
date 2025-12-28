import React, { useRef } from 'react';
import Image from 'next/image';

interface Movie { id: number; title: string; image: string; isLatino: boolean; }
interface TVMovieRowProps { title: string; movies: Movie[]; }

const TVMovieRow = ({ title, movies }: TVMovieRowProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // LÓGICA DE NAVEGACIÓN MANUAL (FORZADA)
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const parent = e.currentTarget.parentElement;
    if (!parent) return;

    const items = parent.querySelectorAll('.focusable-item');
    
    if (e.key === 'ArrowRight' && index < items.length - 1) {
      e.preventDefault();
      (items[index + 1] as HTMLElement).focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      (items[index - 1] as HTMLElement).focus();
    }
    // Las flechas Arriba/Abajo las maneja el navegador hacia las otras filas/navbar
  };

  return (
    <div className="mb-2 px-16 outline-none overflow-hidden">
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
              <span className={`text-[10px] font-black px-2.5 py-1 rounded shadow-md ${movie.isLatino ? 'bg-[#F09800] text-white' : 'bg-black/90 text-white border border-white/20'}`}>
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
        
        /* Efecto de resalte profesional para TV */
        .focusable-item:focus {
          z-index: 100;
          box-shadow: 0 0 50px rgba(240, 152, 0, 0.4);
        }
      `}</style>
    </div>
  );
};

export default TVMovieRow;