import React, { useRef, useEffect } from 'react';
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
  rowIndex: number; // NUEVO: Índice de esta fila
  totalRows: number; // NUEVO: Total de filas en la página
  onNavigateUp?: () => void; // NUEVO: Callback para ir arriba
  onNavigateDown?: () => void; // NUEVO: Callback para ir abajo
}

const TVMovieRow = ({ title, movies, rowIndex, totalRows, onNavigateUp, onNavigateDown }: TVMovieRowProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const currentFocusIndex = useRef(0); // Guardamos qué póster está seleccionado

  // NUEVO: Auto-scroll cuando un póster recibe foco
  const scrollToItem = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const items = container.querySelectorAll('.focusable-item');
    const item = items[index] as HTMLElement;
    
    if (item) {
      // Calculamos la posición para centrar el póster
      const itemLeft = item.offsetLeft;
      const itemWidth = item.offsetWidth;
      const containerWidth = container.offsetWidth;
      
      const scrollPosition = itemLeft - (containerWidth / 2) + (itemWidth / 2);
      
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  // LÓGICA DE NAVEGACIÓN MEJORADA
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const parent = e.currentTarget.parentElement;
    if (!parent) return;
    
    const items = parent.querySelectorAll('.focusable-item');
    
    // NAVEGACIÓN HORIZONTAL (Izquierda/Derecha)
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      e.stopPropagation(); // IMPORTANTE: Evita que el scroll se active
      
      if (index < items.length - 1) {
        currentFocusIndex.current = index + 1;
        (items[index + 1] as HTMLElement).focus();
        scrollToItem(index + 1);
      }
    } 
    else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      e.stopPropagation();
      
      if (index > 0) {
        currentFocusIndex.current = index - 1;
        (items[index - 1] as HTMLElement).focus();
        scrollToItem(index - 1);
      }
    }
    // NAVEGACIÓN VERTICAL (Arriba/Abajo) - NUEVO
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      e.stopPropagation();
      
      if (onNavigateUp) {
        onNavigateUp(); // Salta a la fila anterior
      }
    }
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      e.stopPropagation();
      
      if (onNavigateDown) {
        onNavigateDown(); // Salta a la siguiente fila
      }
    }
    // BOTÓN OK/ENTER
    else if (e.key === 'Enter') {
      e.preventDefault();
      console.log(`Seleccionaste: ${movies[index].title}`);
      // Aquí puedes agregar la lógica para abrir el detalle o reproducir
    }
  };

  // NUEVO: Método para dar foco al primer póster cuando se entra a esta fila
  useEffect(() => {
    // Agregar un ID único a esta fila para identificarla
    const container = scrollContainerRef.current;
    if (container) {
      container.setAttribute('data-row-index', rowIndex.toString());
    }
  }, [rowIndex]);

  return (
    <div className="mb-2 px-16 outline-none overflow-hidden" data-row={rowIndex}>
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
            onFocus={() => {
              currentFocusIndex.current = index;
              scrollToItem(index);
            }}
            className="focusable-item relative flex-shrink-0 w-[240px] aspect-[2/3] rounded-xl border-[5px] border-transparent focus:border-[#F09800] focus:scale-110 outline-none transition-all duration-300 shadow-2xl snap-center group will-change-transform bg-zinc-900"
            data-row={rowIndex}
            data-col={index}
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
