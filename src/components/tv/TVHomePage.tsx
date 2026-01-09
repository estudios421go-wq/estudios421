import React, { useEffect, useRef } from 'react';
import Navbar from './Navbar';
import HeroBanner from './HeroBanner';
import MovieRow from './MovieRow';
import Footer from '../Footer';

export default function TVHomePage({ estrenos, seriesBiblicas, recomendados, seriesTv, peliculas }: any) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 🎯 FOCO INICIAL: Al abrir la app, enfocamos el primer link de la Navbar
    const firstFocus = containerRef.current?.querySelector<HTMLElement>('nav a, nav button, button');
    firstFocus?.focus();

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      const active = document.activeElement as HTMLElement;
      if (!active) return;

      // ⬇️ LÓGICA PARA BAJAR
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        // Buscamos el siguiente elemento enfocable que esté debajo del actual
        const allFocusables = Array.from(containerRef.current?.querySelectorAll<HTMLElement>('button, a, input') || []);
        const currentIndex = allFocusables.indexOf(active);
        
        // Intentamos encontrar un elemento en la siguiente fila visual
        const nextRowElement = allFocusables.find((el, idx) => {
          return idx > currentIndex && el.getBoundingClientRect().top > active.getBoundingClientRect().bottom;
        });

        nextRowElement?.focus();
      }

      // ⬆️ LÓGICA PARA SUBIR
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        const allFocusables = Array.from(containerRef.current?.querySelectorAll<HTMLElement>('button, a, input') || []);
        const currentIndex = allFocusables.indexOf(active);

        // Buscamos el elemento que esté por encima del actual
        const prevRowElement = [...allFocusables].reverse().find((el, idx) => {
          const revIdx = allFocusables.length - 1 - idx;
          return revIdx < currentIndex && el.getBoundingClientRect().bottom < active.getBoundingClientRect().top;
        });

        prevRowElement?.focus();
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  return (
    <div ref={containerRef} className="bg-black min-h-screen">
      <Navbar />
      
      <main className="pt-20">
        <HeroBanner />
        
        <div className="relative z-30 pb-20 -mt-10 space-y-10">
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
