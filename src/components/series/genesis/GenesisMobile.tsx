import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../../tv/Navbar'; // Usando el Navbar Móvil que me pasaste
import Footer from '../../Footer';

const genesisEpisodes = [
  { id: 1, title: "El edén", dur: "43:16", desc: "Historia de la creación y el inicio de la humanidad.", thumb: "https://static.wixstatic.com/media/859174_34318cd5b639416e9f54aac740e60a84~mv2.jpg", url: "https://ok.ru/videoembed/13888818973184" },
  { id: 2, title: "Las consecuencias", dur: "43:09", desc: "Adán y Eva enfrentan la expulsión del paraíso.", thumb: "https://static.wixstatic.com/media/859174_40d433337bf542d68b9965dccb4f0ecd~mv2.jpg", url: "https://ok.ru/videoembed/13888837454336" },
  { id: 3, title: "Hermanos", dur: "42:59", desc: "La historia de Caín y Abel y sus naturalezas opuestas.", thumb: "https://static.wixstatic.com/media/859174_244fa62379ba4682a6cc03815f3891f6~mv2.jpg", url: "https://ok.ru/videoembed/13888884902400" },
  { id: 4, title: "La opción", dur: "43:00", desc: "Los celos de Caín lo llevan a tomar una decisión trágica.", thumb: "https://static.wixstatic.com/media/859174_461f6b43b4a7488fb1eca919f954f145~mv2.jpg", url: "https://ok.ru/videoembed/13888885230080" },
  // ... (Aquí integraremos los 40 episodios)
];

const GenesisMobile = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState<number>(0);

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-[#F09800]">
      <Head><title>Génesis — Móvil</title></Head>
      <Navbar />

      {/* BANNER MÓVIL (AJUSTE VERTICAL COMPLETO) */}
      <div className="relative w-full pt-16 bg-black">
        <div className="w-full aspect-[4/3] relative">
            <img 
              src="https://static.wixstatic.com/media/859174_264be00ba6d14e699767e79c49297e5c~mv2.jpg" 
              className="w-full h-full object-contain" 
              alt="Génesis Móvil" 
            />
        </div>
        
        {/* BOTONES MÓVIL (DISPOSICIÓN COMPACTA) */}
        <div className="px-4 py-6 flex flex-col gap-3">
          <button 
            onClick={() => { setSelectedVideo(genesisEpisodes[0].url); setCurrentIdx(0); }}
            className="w-full bg-white text-black font-bold py-3 rounded-md text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            ▶ VER AHORA
          </button>
          <div className="flex gap-3">
            <button className="flex-1 bg-white/10 py-3 rounded-md text-xs font-bold border border-white/5 active:bg-white/20 transition-all">
              + MI LISTA
            </button>
            <button 
              onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS', '_blank')}
              className="flex-1 bg-white/10 py-3 rounded-md text-xs font-bold border border-white/5 active:bg-white/20 transition-all"
            >
              ❤ DONAR
            </button>
          </div>
        </div>
      </div>

      {/* GRILLA MÓVIL (2 COLUMNAS) */}
      <div className="px-4 mt-4 mb-20">
        <h2 className="text-sm font-bold mb-4 text-gray-400 tracking-widest uppercase">Episodios</h2>
        <div className="grid grid-cols-2 gap-4">
          {genesisEpisodes.map((ep, index) => (
            <div 
              key={ep.id} 
              className="flex flex-col gap-2 active:opacity-70 transition-opacity"
              onClick={() => { setSelectedVideo(ep.url); setCurrentIdx(index); }}
            >
              <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10 shadow-lg">
                <img src={ep.thumb} className="w-full h-full object-cover" loading="lazy" />
                <span className="absolute bottom-1 right-1 bg-black/90 px-1.5 py-0.5 text-[8px] font-bold rounded">{ep.dur}</span>
              </div>
              <h3 className="font-bold text-[11px] truncate uppercase tracking-tighter">EP. {ep.id} {ep.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* REPRODUCTOR MÓVIL (MODO CINE VERTICAL/HORIZ) */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[2000] bg-black flex flex-col">
          <div className="p-4 flex justify-between items-center bg-black/50 backdrop-blur-md">
            <span className="text-[10px] font-bold text-[#F09800] uppercase tracking-widest">Génesis EP. {genesisEpisodes[currentIdx].id}</span>
            <button onClick={() => setSelectedVideo(null)} className="text-3xl">&times;</button>
          </div>
          <div className="flex-grow flex flex-col relative">
            <iframe src={selectedVideo + "?autoplay=1"} className="w-full h-full border-none" allow="autoplay; fullscreen" />
            
            {/* BOTONES DE NAVEGACIÓN MÓVIL */}
            <div className="absolute inset-x-0 bottom-6 flex justify-around px-4">
              <button 
                disabled={currentIdx === 0}
                onClick={() => { setCurrentIdx(currentIdx - 1); setSelectedVideo(genesisEpisodes[currentIdx - 1].url); }}
                className="bg-black/80 text-white text-[10px] py-2 px-4 rounded-full border border-white/20 active:bg-[#F09800]"
              >
                ANTERIOR
              </button>
              <button 
                onClick={() => setSelectedVideo(null)}
                className="bg-black/80 text-white text-[10px] py-2 px-4 rounded-full border border-white/20 active:bg-white active:text-black"
              >
                CERRAR
              </button>
              <button 
                disabled={currentIdx === genesisEpisodes.length - 1}
                onClick={() => { setCurrentIdx(currentIdx + 1); setSelectedVideo(genesisEpisodes[currentIdx + 1].url); }}
                className="bg-black/80 text-white text-[10px] py-2 px-4 rounded-full border border-white/20 active:bg-[#F09800]"
              >
                SIGUIENTE
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default GenesisMobile;
