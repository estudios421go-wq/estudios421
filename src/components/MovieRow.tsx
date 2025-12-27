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
    arrows: true, // Habilitadas globalmente
    responsive: [
      {
        breakpoint: 1440,
        settings: { slidesToShow: 5, slidesToScroll: 2 }
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4, slidesToScroll: 2 }
      },
      {
        breakpoint: 768, // Tablets o móvil horizontal
        settings: { 
          slidesToShow: 4.5, // Más pósters visibles
          slidesToScroll: 2,
          arrows: true 
        }
      },
      {
        breakpoint: 480, // Móvil vertical (Tu solicitud de 4 a 5)
        settings: { 
          slidesToShow: 4.2, // 4 completos y un asomo del 5to para indicar scroll
          slidesToScroll: 2,
          arrows: true // Flechas visibles en móvil
        }
      },
    ],
  };

  return (
    <div className="mb-4 md:mb-8 px-2 md:px-16 relative group/row">
      {/* Título más pegado al póster en móvil (mb-1) */}
      <h2 className="text-white text-sm md:text-2xl font-bold mb-1 md:mb-4 uppercase tracking-wider ml-1 md:ml-2 opacity-90">
        {title}
      </h2>
      
      <div className="relative overflow-hidden md:overflow-visible">
        <Slider {...settings} className="movie-slider">
          {movies.map((movie) => (
            <div key={movie.id} className="px-0.5 md:px-1.5 outline-none py-2 md:py-6"> 
              <div className="relative aspect-[2/3] rounded-md transition-all duration-300 md:hover:scale-110 md:hover:z-[100] cursor-pointer shadow-2xl group">
                
                <div className="relative w-full h-full rounded-md overflow-hidden ring-1 ring-white/10">
                  <Image 
                    src={movie.image} 
                    alt={movie.title} 
                    fill 
                    className="object-cover"
                    sizes="(max-width: 768px) 25vw, 16vw"
                  />
                </div>

                {/* Etiqueta miniaturizada para móvil */}
                <div className="absolute bottom-1 left-1 z-20">
                  <span className={`text-[6px] md:text-[10px] font-bold px-1 py-0.2 md:py-0.5 rounded shadow-lg border border-white/10 ${movie.isLatino ? 'bg-[#F09800] text-white' : 'bg-black/70 text-white backdrop-blur-md'}`}>
                    {movie.isLatino ? 'LAT' : 'SUB'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <style jsx global>{`
        /* COMPACTACIÓN PARA MÓVIL */
        .movie-slider .slick-list {
          overflow: hidden !important;
          padding: 5px 0 !important; /* Espacio mínimo para evitar cortes */
          margin: 0 -2px;
        }

        @media (min-width: 768px) {
          .movie-slider .slick-list {
            padding: 25px 0 !important;
          }
        }
        
        /* FLECHAS VISIBLES EN MÓVIL Y PC */
        .movie-slider .slick-prev, .movie-slider .slick-next {
          z-index: 110;
          width: 30px; /* Más delgadas en móvil */
          height: 100%;
          background: rgba(0,0,0,0.3);
          opacity: 1 !important; /* Siempre visibles en móvil para guiar */
          transition: all 0.4s ease;
        }

        @media (min-width: 768px) {
          .movie-slider .slick-prev, .movie-slider .slick-next {
            width: 50px;
            opacity: 0 !important; /* Solo hover en PC */
          }
          .group\/row:hover .movie-slider .slick-prev,
          .group\/row:hover .movie-slider .slick-next {
            opacity: 1 !important;
          }
        }

        .movie-slider .slick-prev:hover, .movie-slider .slick-next:hover {
          background: rgba(240, 152, 0, 0.7);
        }

        .movie-slider .slick-prev { left: 0px; border-radius: 0 4px 4px 0; }
        .movie-slider .slick-next { right: 0px; border-radius: 4px 0 0 4px; }
        
        /* Ocultar flechas pequeñas por defecto de slick */
        .movie-slider .slick-prev:before, .movie-slider .slick-next:before {
          font-size: 20px;
        }
      `}</style>
    </div>
  );
};

export default MovieRow;