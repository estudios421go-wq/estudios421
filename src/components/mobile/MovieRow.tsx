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
    infinite: true,
    speed: 400,
    slidesToShow: 2.2, // TAMAÑO GRANDE PARA MÓVIL
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
  };

  if (!isClient) return <div className="mb-6 h-[200px]" />;

  return (
    <div className="mb-6 px-4 relative">
      <h2 className="text-white text-[14px] font-bold mb-3 uppercase tracking-wider opacity-90">{title}</h2>
      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie.id} className="px-1.5 outline-none"> 
            <div className="relative aspect-[2/3] rounded-md shadow-lg active:opacity-70 transition-opacity">
              <div className="relative w-full h-full rounded-md overflow-hidden ring-1 ring-white/10">
                <Image src={movie.image} alt={movie.title} fill className="object-cover" unoptimized />
              </div>
              <div className="absolute bottom-1.5 left-1.5 z-20">
                <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${movie.isLatino ? 'bg-[#F09800] text-white' : 'bg-black/80 text-white'}`}>
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