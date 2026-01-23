import React from 'react';
import Head from 'next/head';
import Navbar from '../NavbarPC'; // Crearemos estos archivos a continuación
import HeroBanner from '../HeroBannerPC'; 
import MovieRow from '../MovieRowPC';
// El Footer irá integrado aquí mismo

const InicioPC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-black min-h-screen text-white">
      <Head><title>Estudios 421 — Inicio</title></Head>
      
      <Navbar />
      
      <main className="pb-20">
        <HeroBanner />
        
        <div className="relative -mt-32 z-30 space-y-10">
          <MovieRow title="Series Bíblicas Populares" movies={[]} /> 
          <MovieRow title="Películas Destacadas" movies={[]} />
        </div>
      </main>

      {/* FOOTER INTEGRADO */}
      <footer className="bg-[#0a0a0a] text-gray-400 py-12 px-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs">© {currentYear} Estudios 421. Contenido con fines de difusión bíblica.</p>
        </div>
      </footer>
    </div>
  );
};

export default InicioPC;
