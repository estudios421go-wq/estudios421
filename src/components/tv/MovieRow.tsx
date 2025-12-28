import React from 'react';
import Image from 'next/image';

interface Movie { id: number; title: string; image: string; isLatino: boolean; }
interface MovieRowProps { title: string; movies: Movie[]; }

const TVMovieRow = ({ title, movies }: MovieRowProps) => {
  return (
    <div className="mb-20 px-16 relative">
      <h2 className="text-white/60 text-4xl font-black mb-8 uppercase tracking-[0.2em] ml-4">{title}</h2>
      
      <div className="relative overflow-visible">
        {/* Contenedor con Scroll Snap para navegación fluida con control remoto */}
        <div className="flex gap-8 overflow-x-auto no-scrollbar py-10 px-4 scroll-smooth snap-x snap-proximity">
          {movies.map((movie) => (
            <button 
              key={movie.id} 
              className="relative flex-shrink-0 w-[320px] aspect-[2/3] rounded-xl border-[6px] border-transparent focus:border-[#F09800] focus:scale-110 outline-none transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.8)] snap-center group"
            >
              <div className="relative w-full h-full rounded-lg overflow-hidden ring-2 ring-white/5">
                <Image src={movie.image} alt={movie.title} fill className="object-cover" unoptimized />
              </div>
              
              <div className="absolute bottom-6 left-6 z-20">
                <span className={`text-xl font-black px-4 py-1.5 rounded-md shadow-lg ${movie.isLatino ? 'bg-[#F09800] text-white' : 'bg-black/90 text-white border border-white/30'}`}>
                  {movie.isLatino ? 'LAT' : 'SUB'}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        /* Asegura que el foco no se corte en los bordes de la fila */
        .snap-center {
          scroll-margin: 60px;
        }
      `}</style>
    </div>
  );
};

export default TVMovieRow;