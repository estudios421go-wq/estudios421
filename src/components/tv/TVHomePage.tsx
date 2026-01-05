import React, { useEffect, useRef } from 'react';
import Navbar from './Navbar';
import HeroBanner from './HeroBanner';
import MovieRow from './MovieRow';
import Footer from '../Footer'; 

const estrenosMovies = [
  { id: 1, title: 'Reyes', image: 'https://static.wixstatic.com/media/859174_8880c8a667894fd1af103a0336171721~mv2.jpg', isLatino: true },
  { id: 2, title: 'Pablo', image: 'https://static.wixstatic.com/media/859174_8880c8a667894fd1af103a0336171721~mv2.jpg', isLatino: false },
  { id: 3, title: 'La Casa de David', image: 'https://static.wixstatic.com/media/859174_8880c8a667894fd1af103a0336171721~mv2.jpg', isLatino: true },
  { id: 4, title: 'Moisés', image: 'https://static.wixstatic.com/media/859174_8880c8a667894fd1af103a0336171721~mv2.jpg', isLatino: true },
  { id: 5, title: 'José de Egipto', image: 'https://static.wixstatic.com/media/859174_8880c8a667894fd1af103a0336171721~mv2.jpg', isLatino: false },
];

const seriesBiblicasMovies = [
  { id: 6, title: 'Jesús', image: 'https://static.wixstatic.com/media/859174_8880c8a667894fd1af103a0336171721~mv2.jpg', isLatino: true },
  { id: 7, title: 'Los Hechos', image: 'https://static.wixstatic.com/media/859174_8880c8a667894fd1af103a0336171721~mv2.jpg', isLatino: true },
  { id: 8, title: 'Apocalipsis', image: 'https://static.wixstatic.com/media/859174_8880c8a667894fd1af103a0336171721~mv2.jpg', isLatino: false },
  { id: 9, title: 'Sansón', image: 'https://static.wixstatic.com/media/859174_8880c8a667894fd1af103a0336171721~mv2.jpg', isLatino: true },
  { id: 10, title: 'Daniel', image: 'https://static.wixstatic.com/media/859174_8880c8a667894fd1af103a0336171721~mv2.jpg', isLatino: false },
];

const peliculasMovies = [
  { id: 11, title: 'La Pasión', image: 'https://static.wixstatic.com/media/859174_8880c8a667894fd1af103a0336171721~mv2.jpg', isLatino: true },
  { id: 12, title: 'Ben-Hur', image: 'https://static.wixstatic.com/media/859174_8880c8a667894fd1af103a0336171721~mv2.jpg', isLatino: false },
  { id: 13, title: 'Los Diez Mandamientos', image: 'https://static.wixstatic.com/media/859174_8880c8a667894fd1af103a0336171721~mv2.jpg', isLatino: true },
  { id: 14, title: 'Quo Vadis', image: 'https://static.wixstatic.com/media/859174_8880c8a667894fd1af103a0336171721~mv2.jpg', isLatino: false },
  { id: 15, title: 'El Rey de Reyes', image: 'https://static.wixstatic.com/media/859174_8880c8a667894fd1af103a0336171721~mv2.jpg', isLatino: true },
];

export default function TVHomePage() {
  const heroBannerRef = useRef<HTMLDivElement>(null);
  const row0Ref = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  // Funciones para navegar entre filas
  const focusRow = (rowRef: React.RefObject<HTMLDivElement>) => {
    setTimeout(() => {
      const firstButton = rowRef.current?.querySelector('.focusable-item') as HTMLElement;
      if (firstButton) firstButton.focus();
    }, 100);
  };

  const navigateFromHeroToRow0 = () => focusRow(row0Ref);
  const navigateFromRow0ToRow1 = () => focusRow(row1Ref);
  const navigateFromRow1ToRow2 = () => focusRow(row2Ref);
  const navigateFromRow1ToRow0 = () => focusRow(row0Ref);
  const navigateFromRow2ToRow1 = () => focusRow(row1Ref);
  const navigateFromRow0ToHero = () => {
    setTimeout(() => {
      const firstButton = heroBannerRef.current?.querySelector('button') as HTMLElement;
      if (firstButton) firstButton.focus();
    }, 100);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const firstButton = heroBannerRef.current?.querySelector('button');
      if (firstButton) (firstButton as HTMLElement).focus();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      
      <div ref={heroBannerRef}>
        <HeroBanner onNavigateDown={navigateFromHeroToRow0} />
      </div>

      <div ref={row0Ref}>
        <MovieRow 
          title="ESTRENOS" 
          movies={estrenosMovies}
          rowIndex={0}
          totalRows={3}
          onNavigateUp={navigateFromRow0ToHero}
          onNavigateDown={navigateFromRow0ToRow1}
        />
      </div>

      <div ref={row1Ref}>
        <MovieRow 
          title="SERIES BÍBLICAS" 
          movies={seriesBiblicasMovies}
          rowIndex={1}
          totalRows={3}
          onNavigateUp={navigateFromRow1ToRow0}
          onNavigateDown={navigateFromRow1ToRow2}
        />
      </div>

      <div ref={row2Ref}>
        <MovieRow 
          title="PELÍCULAS" 
          movies={peliculasMovies}
          rowIndex={2}
          totalRows={3}
          onNavigateUp={navigateFromRow2ToRow1}
        />
      </div>

      <Footer />
    </div>
  );
}
