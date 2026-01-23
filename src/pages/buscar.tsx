import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { allSeries, Serie } from '../data/series';
import Head from 'next/head';

const SearchPage = () => {
  const router = useRouter();
  const { q } = router.query;
  const [results, setResults] = useState<Serie[]>([]);

  useEffect(() => {
    if (q) {
      const query = q.toString().toLowerCase();
      const filtered = allSeries.filter(serie => 
        serie.title.toLowerCase().includes(query)
      );
      setResults(filtered);
    }
  }, [q]);

  return (
    <div className="bg-black min-h-screen text-white p-6 md:p-20 pt-32 font-sans selection:bg-[#F09800] selection:text-black">
      <Head><title>Resultados: {q} — Estudios 421</title></Head>
      
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-black mb-12 uppercase italic tracking-tighter">
          Resultados para: <span className="text-[#F09800]">{q}</span>
        </h1>

        {results.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
            {results.map(serie => (
              <Link key={serie.id} href={serie.path}>
                <div className="group cursor-pointer">
                  <div className="relative aspect-[2/3] rounded-xl overflow-hidden border border-white/10 group-hover:border-[#F09800] transition-all duration-500 shadow-2xl">
                    <img 
                      src={serie.banner} 
                      alt={serie.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700 opacity-80 group-hover:opacity-100" 
                    />
                    
                    {/* Etiquetas Flotantes */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      <span className="bg-black/80 backdrop-blur-md px-2 py-1 rounded text-[9px] uppercase font-black tracking-widest text-[#F09800] border border-[#F09800]/20">
                        {serie.category}
                      </span>
                      <span className="bg-white/10 backdrop-blur-md px-2 py-1 rounded text-[9px] uppercase font-bold tracking-widest text-white border border-white/10 w-fit">
                        {serie.audio}
                      </span>
                    </div>
                  </div>
                  <h3 className="mt-4 font-bold text-sm uppercase tracking-tight group-hover:text-[#F09800] transition-colors line-clamp-2">
                    {serie.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center flex flex-col items-center">
            <div className="text-6xl mb-6 opacity-20 italic">?</div>
            <p className="text-gray-500 text-xl font-light italic">No se encontraron resultados para tu búsqueda.</p>
            <Link href="/">
              <button className="mt-8 px-10 py-3 bg-zinc-900 border border-white/5 rounded-full text-[10px] uppercase font-black tracking-[0.3em] hover:bg-[#F09800] hover:text-black transition-all">
                Volver al Inicio
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
