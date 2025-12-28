import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';

interface Movie { id: number; title: string; image: string; isLatino: boolean; }
interface MovieRowProps { title: string; movies: Movie[]; }

const MovieRow = ({ title, movies }: MovieRowProps) => {
  const [isClient, setIsClient] = useState(false);
  const sliderRef = useRef<Slider | null>(null);

  useEffect(() => { setIsClient(true); }, []);

  const settings = {
    dots: false,
    infinite: movies.length > 6,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    arrows: movies.length > 6,
    initialSlide: 0,
  };

  // Ajustamos el margen del skeleton para que coincida con el nuevo diseño
  if (!isClient) return <div className="mb-4 h-[250px]" />;

  return (
    <div className="mb-4 px-4 md:px-16 relative group/row">
      <h2 className="text-white text-xl font-bold mb-2 uppercase tracking-wider ml-2 opacity-80">
        {title}
      </h2>
      
      <div className="relative slider-container">
        <Slider ref={sliderRef} {...settings} className="movie-slider">
          {movies.map((movie) => (
            <div key={movie.id} className="px-1.5 outline-none py-4"> 
              <div className="relative aspect-[2/3] rounded-md transition-all duration-300 hover:scale-110 hover:z-[100] cursor-pointer shadow-2xl">
                <div className="relative w-full h-full rounded-md overflow-hidden ring-1 ring-white/10">
                  <Image src={movie.image} alt={movie.title} fill className="object-cover" unoptimized />
                </div>
                <div className="absolute bottom-1 left-1 z-20">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border border-white/10 ${movie.isLatino ? 'bg-[#F09800] text-white' : 'bg-black/70 text-white backdrop-blur-md'}`}>
                    {movie.isLatino ? 'LAT' : 'SUB'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <style jsx global>{`
        .slider-container {
            position: relative;
            z-index: 10;
        }

        .movie-slider .slick-list { 
            overflow: visible !important; 
            padding: 10px 0 !important; 
        }

        .slider-container::before,
        .slider-container::after {
            content: "";
            position: absolute;
            top: 0;
            width: 100vw;
            height: 100%;
            background: black;
            z-index: 50;
        }

        .slider-container::before { right: 100%; }
        .slider-container::after { left: 100%; }

        .movie-slider .slick-prev, 
        .movie-slider .slick-next { 
            z-index: 110; 
            width: 50px; 
            height: 100%; 
            background: rgba(0,0,0,0.6); 
            opacity: 0 !important; 
            transition: all 0.4s ease;
            top: 50%;
            transform: translateY(-50%);
        }

        .group\/row:hover .movie-slider .slick-prev, 
        .group\/row:hover .movie-slider .slick-next { 
            opacity: 1 !important; 
        }

        .movie-slider .slick-prev:hover, 
        .movie-slider .slick-next:hover { 
            background: rgba(240, 152, 0, 0.9);
        }

        .movie-slider .slick-prev { left: -50px; border-radius: 4px 0 0 4px; }
        .movie-slider .slick-next { right: -50px; border-radius: 0 4px 4px 0; }
        .movie-slider .slick-disabled { display: none !important; }
      `}</style>
    </div>
  );
};
export default MovieRow;