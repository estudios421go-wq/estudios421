import React, { useEffect, useRef } from 'react';
import Navbar from './Navbar';
import HeroBanner from './HeroBanner';
import MovieRow from './MovieRow';
import Footer from '../Footer';

export default function TVHomePage({ estrenos, seriesBiblicas, recomendados, seriesTv, peliculas }: any) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 🎯 Foco inicial: 500ms después de cargar para asegurar que el DOM esté listo
    const initialFocus = () => {
      const first = containerRef.current?.querySelector<HTMLElement>('.nav-focusable, .hero-focusable, .focusable-item');
      first?.focus();
    };
    const timer = setTimeout(initialFocus, 500);

    const handleVerticalNavigation = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;

      const active = document.activeElement as HTMLElement;
      if (!active) return;

      e.preventDefault(); // Evitamos scroll nativo del navegador

      // Buscamos todos los elementos con las clases que definimos en los componentes hijos
      const allElements = Array.from(
        containerRef.current?.querySelectorAll<HTMLElement>('.nav-focusable, .hero-focusable, .focusable-item') || []
      );

      const activeRect = active.getBoundingClientRect();
      let bestCandidate: HTMLElement | null = null;
      let minDistance = Infinity;

      // 🛑 REGLA DE SEGURIDAD PARA SUBIR: 
      // Si el usuario está en un póster (.focusable-item), no permitimos que salte directo a la Navbar (.nav-focusable).
      // Debe pasar primero por el Hero (.hero-focusable).
      const isCurrentlyInRow = active.classList.contains('focusable-item');

      allElements.forEach((candidate) => {
        if (candidate === active) return;

        const candRect = candidate.getBoundingClientRect();
        
        // Validación de dirección
        const isBelow = e.key === 'ArrowDown' && candRect.top >= activeRect.bottom - 15;
        const isAbove = e.key === 'ArrowUp' && candRect.bottom <= activeRect.top + 15;

        if (isBelow || isAbove) {
          // Si estamos subiendo desde una fila, ignoramos los elementos de la Navbar
          if (e.key === 'ArrowUp' && isCurrentlyInRow && candidate.classList.contains('nav-focusable')) {
            return;
          }

          // Cálculo de proximidad (Centro a Centro)
          const activeCenterX = activeRect.left + activeRect.width / 2;
          const candCenterX = candRect.left + candRect.width / 2;
          const activeCenterY = activeRect.top + activeRect.height / 2;
          const candCenterY = candRect.top + candRect.height / 2;

          const distance = Math.sqrt(
            Math.pow(candCenterX - activeCenterX, 2) + 
            Math.pow(candCenterY - activeCenterY, 2)
          );

          if (distance < minDistance) {
            minDistance = distance;
            bestCandidate = candidate;
          }
        }
      });

      if (bestCandidate) {
        (bestCandidate as HTMLElement).focus();
        
        // Centrado suave: importante para que el usuario no pierda la referencia visual
        (bestCandidate as HTMLElement).scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    };

    window.addEventListener('keydown', handleVerticalNavigation);
    return () => {
      window.removeEventListener('keydown', handleVerticalNavigation);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-black min-h-screen outline-none">
      <Navbar />
      
      <main>
        {/* El "Cerebro" ahora buscará .hero-focusable aquí dentro */}
        <section>
          <HeroBanner />
        </section>
        
        <div className="relative z-30 pb-20 space-y-10">
          <MovieRow title="Estrenos" movies={estrenos} rowIndex={1} />
          <MovieRow title="Series Bíblicas" movies={seriesBiblicas} rowIndex={2} />
          <MovieRow title="Recomendados" movies={recomendados} rowIndex={3} />
          <MovieRow title="Series TV" movies={seriesTv} rowIndex={4} />
          <MovieRow title="Películas" movies={peliculas} rowIndex={5} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
