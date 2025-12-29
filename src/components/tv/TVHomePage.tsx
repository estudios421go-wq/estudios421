import React, { useEffect, useRef } from 'react';
import TVNavbar from './Navbar';
import TVHeroBanner from './HeroBanner';
import TVMovieRow from './MovieRow';
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
  const navbarRef = useRef<HTMLDivElement>(null);
  const heroBannerRef = useRef<HTMLDivElement>(null);
  const row0Ref = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Foco inicial en el HeroBanner después de un pequeño retraso para asegurar carga
    const timer = setTimeout(() => {
      const firstButton = heroBannerRef.current?.querySelector('button');
      if (firstButton) (firstButton as HTMLElement).focus();
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Manejo de navegación por secciones para Smart TV
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const active = document.activeElement;
      
      if (e.key === 'ArrowDown') {
        // Si estamos en el Hero, saltar a la primera fila de películas
        if (active?.closest('section')) { 
          const firstRowItem = row0Ref.current?.querySelector('.focusable-item') as HTMLElement;
          if (firstRowItem) {
            e.preventDefault();
            firstRowItem.focus();
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="bg-black min-h-screen">
      {/* Las referencias ayudan a que el código sepa dónde está cada bloque */}
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
