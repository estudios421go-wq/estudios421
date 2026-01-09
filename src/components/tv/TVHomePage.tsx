import React, { useEffect, useRef, useState } from 'react';
import Navbar from './Navbar';
import HeroBanner from './HeroBanner';
import MovieRow from './MovieRow';
import Footer from '../Footer';

export default function TVHomePage() {
  const heroBannerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<Array<HTMLDivElement | null>>([]);
  const [currentRow, setCurrentRow] = useState(0);

  const focusHero = () => {
    const btn = heroBannerRef.current?.querySelector<HTMLElement>('button');
    btn?.focus();
  };

  const focusRow = (index: number) => {
    const row = rowsRef.current[index];
    if (!row) return;

    const item = row.querySelector<HTMLElement>('[tabindex="0"]');
    item?.focus();
  };

  // 🔑 Foco inicial ROBUSTO (Smart TV)
  useEffect(() => {
    let attempts = 0;

    const tryFocus = () => {
      attempts++;
      const btn = heroBannerRef.current?.querySelector<HTMLElement>('button');
      if (btn) {
        btn.focus();
      } else if (attempts < 10) {
        setTimeout(tryFocus, 300);
      }
    };

    tryFocus();
  }, []);

  // 🎮 Control remoto GLOBAL
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = Math.min(currentRow + 1, rowsRef.current.length);
        setCurrentRow(next);
        if (next === 0) focusHero();
        else focusRow(next - 1);
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = Math.max(currentRow - 1, 0);
        setCurrentRow(prev);
        if (prev === 0) focusHero();
        else focusRow(prev - 1);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [currentRow]);

  return (
    <div className="bg-black min-h-screen">
      <Navbar />

      <div ref={heroBannerRef}>
        <HeroBanner />
      </div>

      {[0, 1, 2].map((i) => (
        /* ✅ CORRECCIÓN FINAL DE TIPADO PARA RENDER */
        <div 
          key={i} 
          ref={(el) => {
            rowsRef.current[i] = el;
          }}
        >
          <MovieRow rowIndex={i} />
        </div>
      ))}

      <Footer />
    </div>
  );
}
