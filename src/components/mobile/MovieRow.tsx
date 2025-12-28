import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';

const MovieRow = ({ title, movies }: any) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true); }, []);

  const settings = {
    dots: false,
    infinite: movies.length > 3,
    speed: 400,
    slidesToShow: 3.3,
    slidesToScroll: 1,
    arrows: true,
    swipeToSlide: true,
  };

  if (!isClient) return null;

  return (
    <div className="mobile-row-container relative px-4 py-0 my-0">
      <h2 className="text-white text-[11px] font-bold uppercase tracking-wider opacity-60 ml-1 text-left mb-1">
        {title}
      </h2>
      
      <div className="relative slider-wrapper">
        <Slider {...settings}>
          {movies.map((movie: any) => (
            <div key={movie.id} className="px-1 outline-none"> 
              <div className="relative aspect-[2/3] rounded overflow-hidden">
                <Image src={movie.image} alt={movie.title} fill className="object-cover" unoptimized />
                <div className="absolute bottom-1 left-1 z-20">
                  <span className={`text-[7px] font-black px-1 py-0.5 rounded-sm ${movie.isLatino ? 'bg-[#F09800]' : 'bg-black/80'}`}>
                    {movie.isLatino ? 'LAT' : 'SUB'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <style jsx global>{`
        /* 1. Juntar Carruseles: Eliminamos todos los espacios de la librería */
        .mobile-row-container .slick-slider { margin-bottom: 0 !important; }
        .mobile-row-container .slick-list { padding: 0 !important; margin: 0 !important; }
        .mobile-row-container { margin-top: -5px !important; margin-bottom: 5px !important; }

        /* 2. Flechas a los extremos y centradas verticalmente */
        .mobile-row-container .slick-prev, .mobile-row-container .slick-next {
          position: absolute !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
          z-index: 50 !important;
          width: 30px !important;
          height: 30px !important;
          background: rgba(0,0,0,0.4) !important;
          border-radius: 50% !important;
        }
        .mobile-row-container .slick-prev { left: -10px !important; }
        .mobile-row-container .slick-next { right: -10px !important; }
      `}</style>
    </div>
  );
};
export default MovieRow;