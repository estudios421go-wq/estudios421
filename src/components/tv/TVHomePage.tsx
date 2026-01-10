import React, { useEffect, useRef } from 'react';
import Navbar from './Navbar';
import HeroBanner from './HeroBanner';
import MovieRow from './MovieRow';
import Footer from '../Footer';

export default function TVHomePage({ estrenos, seriesBiblicas, recomendados, seriesTv, peliculas }: any) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 🎯 Foco inicial en el primer elemento de la Navbar al cargar
    const initialFocus = () => {
      const first = containerRef.current?.querySelector<HTMLElement>('.nav-focusable, .hero-btn, .focusable-item');
      first?.focus();
    };
    setTimeout(initialFocus, 500);

    const handleVerticalNavigation = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;

      const active = document.activeElement as HTMLElement;
      if (!active) return;

      e.preventDefault(); // Bloqueamos el scroll molesto del navegador

      // Obtenemos todos los elementos enfocables de la página
      const allElements = Array.from(
        containerRef.current?.querySelectorAll<HTMLElement>('.nav-focusable, .hero-btn, .focusable-item') || []
      );

      const activeRect = active.getBoundingClientRect();
      let bestCandidate: HTMLElement | null = null;
      let minDistance = Infinity;

      allElements.forEach((candidate) => {
        if (candidate === active) return;

        const candRect = candidate.getBoundingClientRect();
        
        // ¿Está en la dirección correcta?
        const isBelow = e.key === 'ArrowDown' && candRect.top >= activeRect.bottom - 10;
        const isAbove = e.key === 'ArrowUp' && candRect.bottom <= activeRect.top + 10;

        if (isBelow || isAbove) {
          // Cálculo de distancia euclidiana entre centros para encontrar el "más cercano"
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
        // Centramos la pantalla suavemente en el nuevo elemento
        (bestCandidate as HTMLElement).scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest'
        });
      }
    };

    window.addEventListener('keydown', handleVerticalNavigation);
    return () => window.removeEventListener('keydown', handleVerticalNavigation);
  }, []);

  return (
    <div ref={containerRef} className="bg-black min-h-screen outline-none">
      <Navbar />
      
      <main>
        {/* Sección del Banner */}
        <section>
          <HeroBanner />
        </section>
        
        {/* Sección de las Filas de Películas */}
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
