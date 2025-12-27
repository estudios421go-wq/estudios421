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
      { breakpoint: 1440, settings: { slidesToShow: 5 } },
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 600, settings: { slidesToShow: 3 } },
    ],
  };

  return (
    <div className="mb-8 px-4 md:px-16 relative group/row">
      <h2 className="text-white text-xl md:text-2xl font-bold mb-4 uppercase tracking-wider ml-2 opacity-80">
        {title}
      </h2>
      
      {/* Contenedor principal con overflow oculto solo a los lados */}
      <div className="relative overflow-hidden md:overflow-visible">
        <Slider {...settings} className="movie-slider">
          {movies.map((movie) => (
            <div key={movie.id} className="px-1.5 outline-none py-6"> 
              <div className="relative aspect-[2/3] rounded-md transition-all duration-300 hover:scale-110 hover:z-[100] cursor-pointer shadow-2xl group">
                
                <div className="relative w-full h-full rounded-md overflow-hidden ring-1 ring-white/10">
                  <Image 
                    src={movie.image} 
                    alt={movie.title} 
                    fill 
                    className="object-cover"
                    sizes="(max-width: 768px) 33vw, 16vw"
                  />
                </div>

                {/* ETIQUETA: Esquina Inferior Izquierda */}
                <div className="absolute bottom-2 left-2 z-20">
                  <span className={`text-[9px] md:text-[10px] font-bold px-1.5 py-0.5 rounded shadow-lg border border-white/10 ${movie.isLatino ? 'bg-[#F09800] text-white' : 'bg-black/70 text-white backdrop-blur-md'}`}>
                    {movie.isLatino ? 'LAT' : 'SUB'}
                  </span>
                </div>

                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-md" />
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <style jsx global>{`
        /* Limitamos el desborde lateral pero permitimos el vertical */
        .movie-slider .slick-list {
          overflow: hidden !important; /* Corta los laterales */
          padding: 25px 0 !important; /* Espacio para el zoom arriba/abajo */
          margin: 0 -5px;
        }
        
        /* Flechas estilo VIX: Solo visibles al pasar el mouse por la fila */
        .movie-slider .slick-prev, .movie-slider .slick-next {
          z-index: 110;
          width: 50px;
          height: 100%;
          background: rgba(0,0,0,0.5);
          opacity: 0;
          transition: all 0.4s ease;
        }
        .group\/row:hover .movie-slider .slick-prev,
        .group\/row:hover .movie-slider .slick-next {
          opacity: 1;
        }
        .movie-slider .slick-prev:hover, .movie-slider .slick-next:hover {
          background: rgba(240, 152, 0, 0.7); /* Naranja Estudios 421 al hacer hover en flecha */
        }
        .movie-slider .slick-prev { left: 0px; border-radius: 0 8px 8px 0; }
        .movie-slider .slick-next { right: 0px; border-radius: 8px 0 0 8px; }
      `}</style>
    </div>
  );
};

export default MovieRow;