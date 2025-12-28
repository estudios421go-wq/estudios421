import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';

interface Movie { id: number; title: string; image: string; isLatino: boolean; }
interface MovieRowProps { title: string; movies: Movie[]; }

const MovieRow = ({ title, movies }: MovieRowProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => { setIsClient(true); }, []);

  const settings = {
    dots: false,
    infinite: movies.length > 3,
    speed: 400,
    slidesToShow: 3.3,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
    touchThreshold: 10,
    lazyLoad: 'progressive' as const,
  };

  // Reducimos la altura del skeleton para que no empuje el contenido mientras carga
  if (!isClient) return <div className="mb-1 h-[120px]" />;

  return (
    <div className="mb-1 px-4 relative"> {/* mb-1 para pegar los carruseles al máximo */}
      {/* Título más pegado a la fila y con tamaño optimizado */}
      <h2 className="text-white text-[11px] font-bold mb-1.5 uppercase tracking-wider opacity-70 ml-1">
        {title}
      </h2>
      
      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie.id} className="px-1 outline-none"> 
            <div className="relative aspect-[2/3] rounded shadow-md active:opacity-70 transition-opacity">
              <div className="relative w-full h-full rounded overflow-hidden ring-1 ring-white/5">
                <Image 
                  src={movie.image} 
                  alt={movie.title} 
                  fill 
                  className="object-cover" 
                  unoptimized 
                />
              </div>
              
              {/* Etiqueta de idioma minimalista */}
              <div className="absolute bottom-1 left-1 z-20">
                <span className={`text-[6.5px] font-black px-1 py-0.5 rounded-sm ${movie.isLatino ? 'bg-[#F09800] text-white' : 'bg-black/90 text-white border border-white/10'}`}>
                  {movie.isLatino ? 'LAT' : 'SUB'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <style jsx global>{`
        /* Eliminamos cualquier padding extra que slick-slider añada por defecto */
        .slick-slider { margin-bottom: 0 !important; }
        .slick-list { padding-top: 5px !important; padding-bottom: 5px !important; }
      `}</style>
    </div>
  );
};

export default MovieRow;