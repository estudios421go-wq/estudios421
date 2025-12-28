import React from 'react';
import Image from 'next/image';

interface Movie {
  id: number;
  title: string;
  image: string;
  isLatino: boolean;
}

interface TVMovieRowProps {
  title: string;
  movies: Movie[];
}

const TVMovieRow = ({ title, movies }: TVMovieRowProps) => {
  return (
    <div className="mb-2 px-16 outline-none focus:outline-none">
      {/* Título más compacto para Smart TV */}
      <h2 className="text-white/50 text-xl font-black mb-2 uppercase tracking-[0.15em] ml-4">
        {title}
      </h2>
      
      {/* Contenedor con Scroll Snap: La TV centrará el elemento enfocado automáticamente */}
      <div className="flex gap-5 overflow-x-auto no-scrollbar py-8 px-4 snap-x snap-mandatory scroll-smooth">
        {movies.map((movie) => (
          <button 
            key={movie.id} 
            className="relative flex-shrink-0 w-[240px] aspect-[2/3] rounded-xl border-[5px] border-transparent focus:border-[#F09800] focus:scale-110 outline-none transition-all duration-300 shadow-[0_15px_35px_rgba(0,0,0,0.7)] snap-center group"
          >
            <div className="relative w-full h-full rounded-md overflow-hidden ring-1 ring-white/10">
              <Image 
                src={movie.image} 
                alt={movie.title} 
                fill 
                className="object-cover" 
                unoptimized 
              />
            </div>
            
            {/* Indicador de idioma optimizado para TV */}
            <div className="absolute bottom-4 left-4 z-20">
              <span className={`text-[10px] font-black px-2.5 py-1 rounded shadow-md ${movie.isLatino ? 'bg-[#F09800] text-white' : 'bg-black/90 text-white border border-white/20'}`}>
                {movie.isLatino ? 'LAT' : 'SUB'}
              </span>
            </div>
          </button>
        ))}
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { 
          display: none; 
        }
        .no-scrollbar { 
          -ms-overflow-style: none; 
          scrollbar-width: none; 
        }
        
        /* Asegura que el foco no se corte y que el scroll se mantenga limpio */
        .snap-center {
          scroll-margin: 80px;
        }

        /* Ajuste de scroll horizontal fluido para navegadores de TV */
        .flex {
          -webkit-overflow-scrolling: touch;
        }
      `}</style>
    </div>
  );
};

export default TVMovieRow;