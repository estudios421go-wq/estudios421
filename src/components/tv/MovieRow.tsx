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
    <div className="mb-2 px-16 outline-none focus:outline-none overflow-hidden">
      {/* Título optimizado */}
      <h2 className="text-white/40 text-xl font-black mb-1 uppercase tracking-[0.2em] ml-4">
        {title}
      </h2>
      
      {/* Contenedor de alto rendimiento para TV */}
      <div className="flex gap-5 overflow-x-auto no-scrollbar py-6 px-4 snap-x snap-mandatory scroll-smooth focus-within:z-50">
        {movies.map((movie) => (
          <button 
            key={movie.id} 
            tabIndex={0} // Obliga a la TV a reconocer el elemento como navegable
            className="relative flex-shrink-0 w-[240px] aspect-[2/3] rounded-xl border-[5px] border-transparent focus:border-[#F09800] focus:scale-110 outline-none transition-all duration-300 shadow-2xl snap-center group will-change-transform"
          >
            <div className="relative w-full h-full rounded-md overflow-hidden ring-1 ring-white/10 bg-zinc-900">
              <Image 
                src={movie.image} 
                alt={movie.title} 
                fill 
                className="object-cover" 
                unoptimized // Evita procesos de redimensionamiento que causan cuadros negros
                priority={true} // Fuerza la carga inmediata para evitar parpadeos
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
        .no-scrollbar::-webkit-scrollbar { 
          display: none; 
        }
        .no-scrollbar { 
          -ms-overflow-style: none; 
          scrollbar-width: none; 
          /* Forzamos el uso de la tarjeta gráfica del TV para suavidad */
          transform: translateZ(0);
        }
        
        .snap-center {
          scroll-margin: 100px;
        }

        /* Mejora la respuesta táctil/remota en navegadores antiguos de TV */
        button:focus {
          z-index: 100;
          position: relative;
        }
      `}</style>
    </div>
  );
};

export default TVMovieRow;