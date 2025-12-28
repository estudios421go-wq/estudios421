import React from 'react';
import Image from 'next/image';

interface Movie { id: number; title: string; image: string; isLatino: boolean; }
interface MovieRowProps { title: string; movies: Movie[]; }

const TVMovieRow = ({ title, movies }: MovieRowProps) => {
  return (
    <div className="mb-12 px-16 relative">
      <h2 className="text-white/70 text-3xl font-bold mb-6 uppercase tracking-widest ml-2">{title}</h2>
      
      <div className="flex gap-6 overflow-x-auto no-scrollbar py-8">
        {movies.map((movie) => (
          <button 
            key={movie.id} 
            className="relative flex-shrink-0 w-[280px] aspect-[2/3] rounded-lg border-4 border-transparent focus:border-[#F09800] focus:scale-110 outline-none transition-all duration-300 shadow-2xl group"
          >
            <div className="relative w-full h-full rounded-md overflow-hidden">
              <Image src={movie.image} alt={movie.title} fill className="object-cover" unoptimized />
            </div>
            
            {/* Indicador de idioma siempre visible en TV */}
            <div className="absolute bottom-4 left-4 z-20">
              <span className={`text-sm font-black px-3 py-1 rounded-md ${movie.isLatino ? 'bg-[#F09800] text-white' : 'bg-black/80 text-white border border-white/20'}`}>
                {movie.isLatino ? 'LAT' : 'SUB'}
              </span>
            </div>
          </button>
        ))}
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default TVMovieRow;