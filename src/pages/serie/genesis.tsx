import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../../components/tv/Navbar';
import Footer from '../../components/Footer';

const genesisEpisodes = [
  { id: 1, title: "El edén", dur: "43:16", thumb: "https://static.wixstatic.com/media/859174_34318cd5b639416e9f54aac740e60a84~mv2.jpg", url: "https://ok.ru/videoembed/13888818973184" },
  { id: 2, title: "Las consecuencias", dur: "43:09", thumb: "https://static.wixstatic.com/media/859174_40d433337bf542d68b9965dccb4f0ecd~mv2.jpg", url: "https://ok.ru/videoembed/13888837454336" },
  { id: 3, title: "Hermanos", dur: "42:59", thumb: "https://static.wixstatic.com/media/859174_244fa62379ba4682a6cc03815f3891f6~mv2.jpg", url: "https://ok.ru/videoembed/13888884902400" },
  { id: 4, title: "La opción", dur: "43:00", thumb: "https://static.wixstatic.com/media/859174_461f6b43b4a7488fb1eca919f954f145~mv2.jpg", url: "https://ok.ru/videoembed/13888885230080" }
];

export default function GenesisPage() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <div className="bg-black min-h-screen text-white font-sans overflow-x-hidden">
      <Head><title>Génesis — Estudios 421</title></Head>
      <Navbar />

      {/* HERO SECTION - BANNER PRINCIPAL */}
      <div className="relative w-full h-[60vh] md:h-[916px]">
        <img 
          src="https://static.wixstatic.com/media/859174_264be00ba6d14e699767e79c49297e5c~mv2.jpg" 
          className="w-full h-full object-cover"
          alt="Génesis Banner"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        
        {/* BOTONES SOLAPADOS */}
        <div className="absolute bottom-[-40px] left-8 flex gap-4 z-10">
          <button className="bg-orange-500 hover:bg-orange-600 text-black font-bold py-4 px-8 rounded-md flex items-center gap-2 shadow-xl transform transition hover:scale-105">
            <span>▶</span> VER AHORA
          </button>
          <button className="bg-gray-800/80 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-md backdrop-blur-md shadow-xl border border-white/10">
            + MI LISTA
          </button>
          <button 
            onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS', '_blank')}
            className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-md backdrop-blur-md border border-white/20"
          >
            ❤ DONAR
          </button>
        </div>
      </div>

      {/* GRID DE EPISODIOS */}
      <div className="px-8 mt-20 mb-20">
        <h2 className="text-2xl font-bold mb-6 text-gray-300 uppercase tracking-widest">Episodios</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {genesisEpisodes.map((ep) => (
            <div 
              key={ep.id} 
              className="group cursor-pointer bg-zinc-900 rounded-lg overflow-hidden border border-transparent hover:border-orange-500 transition"
              onClick={() => setSelectedVideo(ep.url)}
            >
              <div className="relative aspect-video">
                <img src={ep.thumb} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 text-xs rounded">{ep.dur}</div>
              </div>
              <div className="p-3">
                <h3 className="font-bold text-sm truncate">EP. {ep.id} {ep.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* REPRODUCTOR MODO CINE (MODAL) */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col">
          <div className="p-4 flex justify-end">
            <button onClick={() => setSelectedVideo(null)} className="text-white text-4xl">&times;</button>
          </div>
          <iframe src={selectedVideo} className="flex-grow w-full border-none" allowFullScreen />
        </div>
      )}

      <Footer />
    </div>
  );
}
