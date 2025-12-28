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
    slidesToShow: 3.3, // Tamaño optimizado: Ni muy grande ni muy pequeño
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
    touchThreshold: 10,
  };

  if (!isClient) return <div className="mb-2 h-[150px]" />;

  return (
    <div className="mb-2 px-4 relative">
      {/* Título más compacto y elegante */}
      <h2 className="text-white text-[12px] font-bold mb-2 uppercase tracking-wider opacity-80 ml-1">
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
              
              {/* Etiqueta de idioma más pequeña para no tapar el arte */}
              <div className="absolute bottom-1 left-1 z-20">
                <span className={`text-[7px] font-black px-1 py-0.5 rounded-sm ${movie.isLatino ? 'bg-[#F09800] text-white' : 'bg-black/90 text-white'}`}>
                  {movie.isLatino ? 'LAT' : 'SUB'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MovieRow;