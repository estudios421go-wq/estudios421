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
  rowIndex: number;
}

const MovieRow = ({ title, movies, rowIndex }: TVMovieRowProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const currentFocusIndex = useRef(0);

  // 🎯 Auto-scroll al enfocar un item
  const scrollToItem = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const items = container.querySelectorAll<HTMLElement>('.focusable-item');
    const item = items[index];
    if (!item) return;

    const itemLeft = item.offsetLeft;
    const itemWidth = item.offsetWidth;
    const containerWidth = container.offsetWidth;

    const scrollPosition =
      itemLeft - containerWidth / 2 + itemWidth / 2;

    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth',
    });
  };

  // 🎮 Control horizontal (← →) + OK
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const items = container.querySelectorAll<HTMLElement>('.focusable-item');

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      e.stopPropagation();

      if (index < items.length - 1) {
        currentFocusIndex.current = index + 1;
        items[index + 1].focus();
        scrollToItem(index + 1);
      }
    }

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      e.stopPropagation();

      if (index > 0) {
        currentFocusIndex.current = index - 1;
        items[index - 1].focus();
        scrollToItem(index - 1);
      }
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      console.log('Seleccionaste:', movies[index].title);
      // 👉 acá después podés abrir detalle o reproducir
    }
  };

  return (
    <div className="mb-4 px-16 overflow-hidden" data-row={rowIndex}>
      <h2 className="text-white/40 text-xl font-black mb-2 uppercase tracking-[0.2em] ml-4">
        {title}
      </h2>

      <div
        ref={scrollContainerRef}
        className="flex gap-5 overflow-x-auto no-scrollbar py-6 px-4 scroll-smooth"
      >
        {movies.map((movie, index) => (
          <button
            key={`${rowIndex}-${movie.id}`}
            tabIndex={0}
            className="focusable-item relative flex-shrink-0 w-[240px] aspect-[2/3] rounded-xl border-[5px] border-transparent focus:border-[#F09800] focus:scale-110 outline-none transition-all duration-300 shadow-2xl bg-zinc-900"
            onKeyDown={(e) => handleKeyDown(e, index)}
            onFocus={() => {
              currentFocusIndex.current = index;
              scrollToItem(index);
            }}
          >
            <div className="relative w-full h-full rounded-md overflow-hidden ring-1 ring-white/10">
              <Image
                src={movie.image}
                alt={movie.title}
                fill
                className="object-cover"
                unoptimized
                priority
              />
            </div>

            <div className="absolute bottom-4 left-4 z-20">
              <span
                className={`text-[10px] font-black px-2.5 py-1 rounded shadow-md ${
                  movie.isLatino
                    ? 'bg-[#F09800] text-white'
                    : 'bg-black/90 text-white border border-white/20'
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

        .focusable-item:focus {
          z-index: 50;
          box-shadow: 0 0 45px rgba(240, 152, 0, 0.45);
        }
      `}</style>
    </div>
  );
};

export default MovieRow;
