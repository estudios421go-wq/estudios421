import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';

interface Movie {
  id: number;
  title: string;
  image: string;
  isLatino: boolean;
}

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

const MovieRow = ({ title, movies }: MovieRowProps) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    initialSlide: 0,
    arrows: true,
    responsive: [
      { breakpoint: 1440, settings: { slidesToShow: 5, slidesToScroll: 2 } },
      { breakpoint: 1024, settings: { slidesToShow: 4, slidesToScroll: 2 } },
      { 
        breakpoint: 768, 
        settings: { slidesToShow: 3.2, slidesToScroll: 2, arrows: true } 
      },
      { 
        breakpoint: 480, 
        /* VALOR DE LA VERSIÓN INICIAL: Forzamos el gigantismo */
        settings: { 
          slidesToShow: 2.2, 
          slidesToScroll: 1,
          arrows: true 
        } 
      },
    ],
  };

  return (
    <div className="mb-6 md:mb-8 px-4 md:px-16 relative group/row">
      <h2 className="text-white text-[14px] md:text-2xl font-bold mb-3 md:mb-4 uppercase tracking-wider ml-1 md:ml-2 opacity-95">
        {title}
      </h2>
      
      <div className="relative overflow-hidden md:overflow-visible">
        <Slider {...settings} className="movie-slider">
          {movies.map((movie) => (
            <div key={movie.id} className="px-1.5 md:px-1.5 outline-none py-2 md:py-6"> 
              <div className="relative aspect-[2/3] rounded-md transition-all duration-300 md:hover:scale-110 md:hover:z-[100] cursor-pointer shadow-2xl group">
                <div className="relative w-full h-full rounded-md overflow-hidden ring-1 ring-white/10">
                  <Image 
                    src={movie.image} 
                    alt={movie.title} 
                    fill 
                    className="object-cover" 
                    sizes="(max-width: 480px) 50vw, 16vw" 
                  />
                </div>
                {/* Funcionalidad moderna de etiquetas */}
                <div className="absolute bottom-2 left-2 z-20">
                  <span className={`text-[8px] md:text-[10px] font-bold px-2 py-0.5 rounded shadow-lg border border-white/10 ${movie.isLatino ? 'bg-[#F09800] text-white' : 'bg-black/70 text-white backdrop-blur-md'}`}>
                    {movie.isLatino ? 'LAT' : 'SUB'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <style jsx global>{`
        /* ADN de la Versión Inicial para recuperar el tamaño */
        .movie-slider .slick-list { 
          overflow: hidden !important; 
          padding: 10px 0 !important; 
          margin: 0 -5px; 
        }
        
        @media (min-width: 768px) { 
          .movie-slider .slick-list { padding: 25px 0 !important; margin: 0 -4px; } 
        }
        
        /* Funcionalidad moderna de flechas */
        .movie-slider .slick-prev, .movie-slider .slick-next { 
          z-index: 110; 
          width: 35px; 
          height: 100%; 
          background: rgba(0,0,0,0.5); 
          opacity: 1 !important; 
        }
        
        @media (min-width: 768px) {
          .movie-slider .slick-prev, .movie-slider .slick-next { width: 50px; opacity: 0 !important; }
          .group\/row:hover .movie-slider .slick-prev, .group\/row:hover .movie-slider .slick-next { opacity: 1 !important; }
        }
        
        .movie-slider .slick-prev:hover, .movie-slider .slick-next:hover { background: rgba(240, 152, 0, 0.8); }
        .movie-slider .slick-prev { left: 0px; border-radius: 0 4px 4px 0; }
        .movie-slider .slick-next { right: 0px; border-radius: 4px 0 0 4px; }
      `}</style>
    </div>
  );
};

export default MovieRow;