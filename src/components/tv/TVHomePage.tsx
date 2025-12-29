import React, { useEffect, useRef } from 'react';
import TVNavbar from './Barra de navegación';
import TVHeroBanner from './HeroBanner';
import TVMovieRow from './MovieRow';
import Footer from './Footer';

// DATOS DE EJEMPLO - Reemplaza con tus datos reales
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

  // Array de referencias para facilitar la navegación
  const sectionsRefs = [navbarRef, heroBannerRef, row0Ref, row1Ref, row2Ref, footerRef];
  const currentSectionIndex = useRef(1); // Empezamos en HeroBanner (índice 1)

  useEffect(() => {
    // Al cargar, damos foco al primer botón del HeroBanner
    const heroBanner = heroBannerRef.current;
    if (heroBanner) {
      const firstButton = heroBanner.querySelector('button');
      if (firstButton) {
        (firstButton as HTMLElement).focus();
      }
    }
  }, []);

  // NAVEGACIÓN DESDE EL HEROBANNER HACIA ABAJO
  const handleHeroBannerNavigateDown = () => {
    const firstRow = row0Ref.current;
    if (firstRow) {
      const firstPoster = firstRow.querySelector('.focusable-item') as HTMLElement;
      if (firstPoster) {
        currentSectionIndex.current = 2; // Nos movemos a la primera fila
        firstPoster.focus();
      }
    }
  };

  // NAVEGACIÓN DESDE FILA 0 (ESTRENOS)
  const handleRow0NavigateUp = () => {
    const heroBanner = heroBannerRef.current;
    if (heroBanner) {
      const firstButton = heroBanner.querySelector('button') as HTMLElement;
      if (firstButton) {
        currentSectionIndex.current = 1;
        firstButton.focus();
      }
    }
  };

  const handleRow0NavigateDown = () => {
    const secondRow = row1Ref.current;
    if (secondRow) {
      const firstPoster = secondRow.querySelector('.focusable-item') as HTMLElement;
      if (firstPoster) {
        currentSectionIndex.current = 3;
        firstPoster.focus();
      }
    }
  };

  // NAVEGACIÓN DESDE FILA 1 (SERIES BÍBLICAS)
  const handleRow1NavigateUp = () => {
    const firstRow = row0Ref.current;
    if (firstRow) {
      const firstPoster = firstRow.querySelector('.focusable-item') as HTMLElement;
      if (firstPoster) {
        currentSectionIndex.current = 2;
        firstPoster.focus();
      }
    }
  };

  const handleRow1NavigateDown = () => {
    const thirdRow = row2Ref.current;
    if (thirdRow) {
      const firstPoster = thirdRow.querySelector('.focusable-item') as HTMLElement;
      if (firstPoster) {
        currentSectionIndex.current = 4;
        firstPoster.focus();
      }
    }
  };

  // NAVEGACIÓN DESDE FILA 2 (PELÍCULAS)
  const handleRow2NavigateUp = () => {
    const secondRow = row1Ref.current;
    if (secondRow) {
      const firstPoster = secondRow.querySelector('.focusable-item') as HTMLElement;
      if (firstPoster) {
        currentSectionIndex.current = 3;
        firstPoster.focus();
      }
    }
  };

  const handleRow2NavigateDown = () => {
    // Aquí podrías navegar al footer o a más filas si las agregas
    console.log('Llegaste al final de las filas');
  };

  return (
    <div className="bg-black min-h-screen">
      {/* NAVBAR */}
      <div ref={navbarRef}>
        <TVNavbar />
      </div>

      {/* HERO BANNER */}
      <div ref={heroBannerRef}>
        <TVHeroBanner />
      </div>

      {/* MODIFICACIÓN TEMPORAL: Agregar navegación manual desde HeroBanner */}
      <style jsx global>{`
        /* Interceptar teclas desde el HeroBanner */
        section:has(button:focus) {
          position: relative;
        }
      `}</style>

      {/* Script para manejar navegación desde HeroBanner */}
      <script dangerouslySetInnerHTML={{__html: `
        document.addEventListener('keydown', function(e) {
          const activeElement = document.activeElement;
          if (!activeElement) return;
          
          // Si estamos en un botón del HeroBanner
          const isHeroBannerButton = activeElement.closest('section') && 
                                      activeElement.tagName === 'BUTTON' &&
                                      !activeElement.classList.contains('focusable-item');
          
          if (isHeroBannerButton && e.key === 'ArrowDown') {
            e.preventDefault();
            const firstRow = document.querySelector('[data-row="0"]');
            if (firstRow) {
              const firstPoster = firstRow.querySelector('.focusable-item');
              if (firstPoster) firstPoster.focus();
            }
          }
        });
      `}} />

      {/* FILA 0: ESTRENOS */}
      <div ref={row0Ref}>
        <TVMovieRow 
          title="ESTRENOS" 
          movies={estrenosMovies}
          rowIndex={0}
          totalRows={3}
          onNavigateUp={handleRow0NavigateUp}
          onNavigateDown={handleRow0NavigateDown}
        />
      </div>

      {/* FILA 1: SERIES BÍBLICAS */}
      <div ref={row1Ref}>
        <TVMovieRow 
          title="SERIES BÍBLICAS" 
          movies={seriesBiblicasMovies}
          rowIndex={1}
          totalRows={3}
          onNavigateUp={handleRow1NavigateUp}
          onNavigateDown={handleRow1NavigateDown}
        />
      </div>

      {/* FILA 2: PELÍCULAS */}
      <div ref={row2Ref}>
        <TVMovieRow 
          title="PELÍCULAS" 
          movies={peliculasMovies}
          rowIndex={2}
          totalRows={3}
          onNavigateUp={handleRow2NavigateUp}
          onNavigateDown={handleRow2NavigateDown}
        />
      </div>

      {/* FOOTER */}
      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
}
