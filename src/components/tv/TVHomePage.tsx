import React, { useEffect, useRef } from 'react';
import TVNavbar from './TVNavbar';
import TVHeroBanner from './TVHeroBanner';
import TVMovieRow from './TVMovieRow';
import Footer from '../Footer'; // El footer suele estar una carpeta arriba

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
  const navbarRef = useRef<HTMLDivElement>(null);
  const heroBannerRef = useRef<HTMLDivElement>(null);
  const row0Ref = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Foco inicial en el Hero
    const timer = setTimeout(() => {
      const firstButton = heroBannerRef.current?.querySelector('button');
      if (firstButton) (firstButton as HTMLElement).focus();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Lógica de navegación simple entre secciones
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        const active = document.activeElement;
        if (active?.closest('section')) { // Si estamos en el Hero
          const firstRow = row0Ref.current?.querySelector('.focusable-item') as HTMLElement;
          if (firstRow) {
            e.preventDefault();
            firstRow.focus();
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="bg-black min-h-screen">
      <div ref={navbarRef}><TVNavbar /></div>
      <div ref={heroBannerRef}><TVHeroBanner /></div>

      <div ref={row0Ref}>
        <TVMovieRow 
          title="ESTRENOS" 
          movies={estrenosMovies}
          rowIndex={0}
        />
      </div>

      <div ref={row1Ref}>
        <TVMovieRow 
          title="SERIES BÍBLICAS" 
          movies={seriesBiblicasMovies}
          rowIndex={1}
        />
      </div>

      <div ref={row2Ref}>
        <TVMovieRow 
          title="PELÍCULAS" 
          movies={peliculasMovies}
          rowIndex={2}
        />
      </div>

      <div ref={footerRef}><Footer /></div>
    </div>
  );
}
