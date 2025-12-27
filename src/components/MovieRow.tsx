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
      { breakpoint: 850, settings: { slidesToShow: 3.5, slidesToScroll: 2 } },
      { 
        breakpoint: 480, 
        settings: { 
          slidesToShow: 3, // Valor base para que el JS no se rompa
          slidesToScroll: 1 
        } 
      },
    ],
  };

  return (
    <div className="mb-6 md:mb-10 px-2 md:px-16 relative group/row overflow-hidden">
      <h2 className="text-white text-[13px] md:text-2xl font-bold mb-2 md:mb-4 uppercase tracking-wider ml-1 md:ml-2 opacity-95">
        {title}
      </h2>
      
      <div className="relative mobile-container-fix">
        <Slider {...settings} className="movie-slider">
          {movies.map((movie) => (
            <div key={movie.id} className="outline-none py-2 md:py-6 px-1.5"> 
              <div className="relative aspect-[2/3] rounded-md transition-all duration-300 md:hover:scale-110 md:hover:z-[100] cursor-pointer shadow-2xl group">
                <div className="relative w-full h-full rounded-md overflow-hidden ring-1 ring-white/10">
                  <Image src={movie.image} alt={movie.title} fill className="object-cover" sizes="(max-width: 480px) 33vw, 16vw" priority />
                </div>
                <div className="absolute bottom-1 left-1 z-20">
                  <span className={`text-[7px] md:text-[10px] font-bold px-1.5 py-0.5 rounded border border-white/10 ${movie.isLatino ? 'bg-[#F09800] text-white' : 'bg-black/70 text-white backdrop-blur-md'}`}>
                    {movie.isLatino ? 'LAT' : 'SUB'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <style jsx global>{`
        /* --- BLOQUE DE SEGURIDAD MÓVIL (NO AFECTA PC) --- */
        @media (max-width: 480px) {
          /* 1. Forzamos el ancho del carrusel para que use el 100% real */
          .mobile-container-fix .slick-track {
            display: flex !important;
            width: auto !important; /* Deja que el contenido dicte el ancho */
            transform: translate3d(0, 0, 0); /* Estabiliza el renderizado */
          }

          /* 2. Forzamos a que cada slide ocupe exactamente lo necesario para ver 3 posters */
          .mobile-container-fix .slick-slide {
            width: 32vw !important; /* 32% del ancho de pantalla = 3 posters visibles */
            float: left;
            height: auto;
          }

          /* 3. Limpieza de márgenes para evitar el amontonamiento */
          .mobile-container-fix .slick-list {
            padding: 0 !important;
            margin: 0 -5px !important;
            overflow: hidden !important;
          }
        }

        /* --- ESTILOS GENERALES Y PC --- */
        .movie-slider .slick-list { overflow: hidden !important; }
        @media (min-width: 768px) { .movie-slider .slick-list { padding: 25px 0 !important; } }
        
        .movie-slider .slick-prev, .movie-slider .slick-next { 
          z-index: 110; width: 30px; height: 100%; background: rgba(0,0,0,0.5); opacity: 1 !important; 
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