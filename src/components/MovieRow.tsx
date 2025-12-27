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
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2.2, // El valor original que los hacía gigantes
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="py-5">
      <h2 className="text-white text-xl font-bold mb-4 px-4">{title}</h2>
      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie.id} className="px-2">
            <div className="relative aspect-[2/3]">
              <Image
                src={movie.image}
                alt={movie.title}
                fill
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MovieRow;