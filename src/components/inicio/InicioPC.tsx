import React from 'react';
import Head from 'next/head';
/* Importaremos los componentes base que configuraremos en el siguiente paso */
import NavbarPC from '../NavbarPC';
import HeroBannerPC from '../HeroBannerPC';
import MovieRowPC from '../MovieRowPC';

const InicioPC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-black min-h-screen text-white">
      <Head><title>Estudios 421 — Inicio</title></Head>
      
      <NavbarPC />
      
      <main className="pb-20">
        <HeroBannerPC />
        
        {/* Contenedor de Carruseles */}
        <div className="relative -mt-32 z-30 space-y-2">
          <MovieRowPC title="Series Bíblicas" movies={[]} />
          <MovieRowPC title="Películas" movies={[]} />
        </div>
      </main>

      <footer className="bg-[#0a0a0a] text-gray-400 py-12 px-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <p className="text-xs leading-relaxed opacity-60">
            © {currentYear} Estudios 421. Aviso Legal: El contenido audiovisual pertenece a sus respectivos propietarios. 
            Plataforma sin fines de lucro destinada a la difusión bíblica.
          </p>
          <div className="flex gap-6 text-[11px] uppercase tracking-widest font-bold">
            <a href="#" className="hover:text-white">Privacidad</a>
            <a href="#" className="hover:text-white">Términos</a>
            <a href="#" className="hover:text-white">Ayuda</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InicioPC;
