import React, { useRef } from 'react';
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
  rowIndex?: number; // Opcional para identificar la fila
}

const MovieRow = ({ title, movies, rowIndex = 0 }: TVMovieRowProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 🎯 Función para centrar el elemento enfocado en la pantalla
  const scrollToItem = (target: HTMLElement) => {
    const container = scrollContainerRef.current;
    if (!container || !target) return;

    const itemLeft = target.offsetLeft;
    const itemWidth = target.offsetWidth;
    const containerWidth = container.offsetWidth;

    const scrollPosition = itemLeft - containerWidth / 2 + itemWidth / 2;

    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth',
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const items = container.querySelectorAll<HTMLElement>('.focusable-item');

    if (e.key === 'ArrowRight' && index < items.length - 1) {
      e.preventDefault();
      items[index + 1].focus();
    }

    if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      items[index - 1].focus();
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      console.log('Seleccionado:', movies[index].title);
    }
  };

  return (
    <div className="mb-8 px-4 md:px-16 overflow-hidden">
      <h2 className="text-white/60 text-xl font-bold mb-4 uppercase tracking-widest ml-2">
        {title}
      </h2>

      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto no-scrollbar py-6 px-2 scroll-smooth"
        style={{ scrollbarWidth: 'none' }}
      >
        {movies.map((movie, index) => (
          <button
            key={`${rowIndex}-${movie.id}`}
            className="focusable-item relative flex-shrink-0 w-[220px] aspect-[2/3] rounded-lg border-[5px] border-transparent outline-none transition-all duration-300 bg-zinc-900 focus:border-[#F09800] focus:scale-110 focus:z-50 focus:shadow-[0_0_40px_rgba(240,152,0,0.4)]"
            onKeyDown={(e) => handleKeyDown(e, index)}
            onFocus={(e) => scrollToItem(e.currentTarget)}
          >
            <div className="relative w-full h-full rounded-md overflow-hidden ring-1 ring-white/10">
              <Image
                src={movie.image}
                alt={movie.title}
                fill
                className="object-cover"
                unoptimized
                priority={index < 6}
              />
            </div>

            {/* Etiqueta de idioma mantenida del original */}
            <div className="absolute bottom-2 left-2 z-20">
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded border border-white/10 ${
                  movie.isLatino 
                    ? 'bg-[#F09800] text-white' 
                    : 'bg-black/80 text-white backdrop-blur-md'
                }`}
              >
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
      `}</style>
    </div>
  );
};

export default MovieRow;
