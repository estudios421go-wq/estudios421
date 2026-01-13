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
    <div className="bg-black min-h-screen text-white p-10 pt-32">
      <Head><title>Resultados para: {q}</title></Head>
      
      <h1 className="text-3xl font-bold mb-10 uppercase tracking-tighter">
        Resultados para: <span className="text-[#FF8A00]">{q}</span>
      </h1>

      {results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {results.map(serie => (
            <Link key={serie.id} href={serie.path}>
              <div className="group cursor-pointer">
                <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-transparent group-hover:border-[#FF8A00] transition-all">
                  <img src={serie.banner} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                </div>
                <h3 className="mt-4 font-bold text-lg uppercase tracking-widest">{serie.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-xl italic">No se encontraron series con ese nombre.</p>
      )}
    </div>
  );
};

export default SearchPage;
