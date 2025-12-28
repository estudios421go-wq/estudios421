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
    arrows: true, // Ahora las flechas están activas en móvil
    swipeToSlide: true,
    touchThreshold: 10,
    lazyLoad: 'progressive' as const,
  };

  if (!isClient) return <div className="mb-0 h-[100px]" />;

  return (
    <div className="relative z-10 -mt-3 pb-2 px-4"> 
      {/* Título pegado al carrusel */}
      <h2 className="text-white text-[11px] font-bold mb-1 uppercase tracking-wider opacity-60 ml-1">
        {title}
      </h2>
      
      <div className="relative group">
        <Slider {...settings}>
          {movies.map((movie) => (
            <div key={movie.id} className="px-1 outline-none"> 
              <div className="relative aspect-[2/3] rounded shadow-md active:scale-95 transition-transform duration-200">
                <div className="relative w-full h-full rounded overflow-hidden ring-1 ring-white/5">
                  <Image 
                    src={movie.image} 
                    alt={movie.title} 
                    fill 
                    className="object-cover" 
                    unoptimized 
                  />
                </div>
                
                <div className="absolute bottom-1 left-1 z-20">
                  <span className={`text-[6.5px] font-black px-1 py-0.5 rounded-sm ${movie.isLatino ? 'bg-[#F09800] text-white' : 'bg-black/90 text-white border border-white/10'}`}>
                    {movie.isLatino ? 'LAT' : 'SUB'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <style jsx global>{`
        /* Flechas visibles y táctiles para móvil */
        .slick-prev, .slick-next {
          width: 25px !important;
          height: 25px !important;
          z-index: 30 !important;
          background: rgba(0,0,0,0.5) !important;
          border-radius: 50% !important;
        }
        .slick-prev { left: -5px !important; }
        .slick-next { right: -5px !important; }
        .slick-prev:before, .slick-next:before {
          font-size: 18px !important;
          opacity: 0.8 !important;
        }

        /* Eliminación total de espacios fantasmas */
        .slick-slider { margin-bottom: 0 !important; }
        .slick-list { 
          padding-top: 2px !important; 
          padding-bottom: 2px !important;
          overflow: visible !important; 
        }
      `}</style>
    </div>
  );
};

export default MovieRow;