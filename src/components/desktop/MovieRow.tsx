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
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    arrows: true,
  };

  if (!isClient) return <div className="mb-10 h-[300px]" />;

  return (
    <div className="mb-10 px-16 relative group/row">
      <h2 className="text-white text-2xl font-bold mb-4 uppercase tracking-wider ml-2 opacity-90">{title}</h2>
      <div className="relative overflow-visible">
        <Slider ref={sliderRef} {...settings} className="movie-slider">
          {movies.map((movie) => (
            <div key={movie.id} className="px-1.5 outline-none py-6"> 
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
        .movie-slider .slick-list { overflow: visible !important; padding: 25px 0 !important; }
        .movie-slider .slick-prev, .movie-slider .slick-next { z-index: 110; width: 50px; height: 100%; background: rgba(0,0,0,0.5); opacity: 0 !important; transition: opacity 0.3s; }
        .group\/row:hover .movie-slider .slick-prev, .group\/row:hover .movie-slider .slick-next { opacity: 1 !important; }
        .movie-slider .slick-prev:hover, .movie-slider .slick-next:hover { background: rgba(240, 152, 0, 0.8); }
        .movie-slider .slick-prev { left: 0; border-radius: 0 4px 4px 0; }
        .movie-slider .slick-next { right: 0; border-radius: 4px 0 0 4px; }
      `}</style>
    </div>
  );
};
export default MovieRow;