import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const PeliculasPC = () => {
  const peliculas = [
    { title: "La Pasión de Cristo", slug: "la-pasion-de-cristo" },
    { title: "Ben-Hur 2016", slug: "ben-hur-2016" },
    { title: "Hijo de Dios", slug: "hijo-de-dios" },
    { title: "María Magdalena", slug: "maria-magdalena" }
  ];

  return (
    <div className="bg-black min-h-screen text-white select-none">
      <Head><title>Películas — Estudios 421</title></Head>
      
      <main className="p-20">
        <div className="flex items-center gap-6 mb-16">
          <div className="w-20 h-1 bg-[#F09800] shadow-[0_0_15px_#F09800]" />
          <h1 className="text-5xl font-black uppercase tracking-tighter">Películas</h1>
        </div>

        <div className="grid grid-cols-4 gap-8">
          {peliculas.map((p, i) => (
            <Link key={i} href={`/pelicula/${p.slug}`}>
              <div className="bg-zinc-900 aspect-[2/3] rounded-xl border border-white/5 hover:border-[#F09800] transition-all duration-500 cursor-pointer flex flex-col items-center justify-center p-6 group">
                <span className="text-xl font-bold uppercase text-center group-hover:text-[#F09800] transition-colors">{p.title}</span>
                <div className="mt-6 text-[10px] text-gray-500 border border-gray-500 px-4 py-1 rounded-full group-hover:bg-[#F09800] group-hover:text-white group-hover:border-[#F09800] transition-all">VER AHORA</div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="mt-20 border-t border-white/5 p-10 text-center text-gray-500 text-[10px] uppercase tracking-[0.3em]">
        © {new Date().getFullYear()} Estudios 421 — Cine Bíblico
      </footer>
    </div>
  );
};

export default PeliculasPC;
