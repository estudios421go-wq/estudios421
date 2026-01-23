import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
/* Usamos el InicioPC como referencia de estilo para mantener coherencia */

const SeriesBiblicasPC = () => {
  const series = [
    { id: 1, title: "Génesis", slug: "genesis" },
    { id: 2, title: "Los Diez Mandamientos", slug: "los-diez-mandamientos" },
    { id: 3, title: "Rey David", slug: "rey-david" },
    { id: 4, title: "Jesús", slug: "jesus" }
  ];

  return (
    <div className="bg-black min-h-screen text-white select-none">
      <Head><title>Series Bíblicas — Estudios 421</title></Head>
      
      <main className="p-20">
        <div className="flex items-center gap-6 mb-16">
          <div className="w-20 h-1 bg-[#F09800] shadow-[0_0_15px_#F09800]" />
          <h1 className="text-5xl font-black uppercase tracking-tighter">Series Bíblicas</h1>
        </div>

        <div className="grid grid-cols-4 gap-8">
          {series.map((s) => (
            <Link key={s.id} href={`/serie/${s.slug}`}>
              <div className="bg-zinc-900 aspect-[2/3] rounded-xl border border-white/5 hover:border-[#F09800] transition-all duration-500 cursor-pointer flex items-center justify-center p-6 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-xl font-bold uppercase text-center group-hover:scale-110 transition-transform">{s.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="mt-20 border-t border-white/5 p-10 text-center text-gray-500 text-xs uppercase tracking-widest">
        © {new Date().getFullYear()} Estudios 421 — Contenido Bíblico
      </footer>
    </div>
  );
};

export default SeriesBiblicasPC;
