import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import TVNavbar from '../../tv/Navbar'; // Usando el Navbar de TV que me pasaste
import Footer from '../../Footer';

const genesisEpisodes = [
  { id: 1, title: "El edén", dur: "43:16", seconds: 2596, desc: "Historia de la creación y el inicio de la humanidad con Adán y Eva.", thumb: "https://static.wixstatic.com/media/859174_34318cd5b639416e9f54aac740e60a84~mv2.jpg", url: "https://ok.ru/videoembed/13888818973184" },
  { id: 2, title: "Las consecuencias", dur: "43:09", seconds: 2589, desc: "Adán y Eva enfrentan la expulsión del paraíso tras el fruto prohibido.", thumb: "https://static.wixstatic.com/media/859174_40d433337bf542d68b9965dccb4f0ecd~mv2.jpg", url: "https://ok.ru/videoembed/13888837454336" },
  { id: 3, title: "Hermanos", dur: "42:59", seconds: 2579, desc: "La historia de Caín y Abel, hijos de Adán y Eva, y sus naturalezas opuestas.", thumb: "https://static.wixstatic.com/media/859174_244fa62379ba4682a6cc03815f3891f6~mv2.jpg", url: "https://ok.ru/videoembed/13888884902400" },
  { id: 4, title: "La opción", dur: "43:00", seconds: 2580, desc: "Los celos de Caín lo llevan a tomar una decisión trágica sobre su hermano.", thumb: "https://static.wixstatic.com/media/859174_461f6b43b4a7488fb1eca919f954f145~mv2.jpg", url: "https://ok.ru/videoembed/13888885230080" },
  // ... (Aquí integraremos los 40 episodios completos)
];

const GenesisTV = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [showQR, setShowQR] = useState(false);

  return (
    <div className="bg-black min-h-screen text-white font-sans overflow-x-hidden">
      <Head><title>Génesis — Smart TV</title></Head>
      <TVNavbar />

      {/* BANNER TV GIGANTE */}
      <div className="relative w-full h-[90vh]">
        <img 
          src="https://static.wixstatic.com/media/859174_264be00ba6d14e699767e79c49297e5c~mv2.jpg" 
          className="w-full h-full object-cover" 
          alt="Génesis TV" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
        
        {/* BOTONES TV (FOCUS OPTIMIZED) */}
        <div className="absolute bottom-20 left-20 flex gap-10 z-10">
          <button 
            onClick={() => { setSelectedVideo(genesisEpisodes[0].url); setCurrentIdx(0); }}
            className="bg-white text-black font-black py-6 px-16 rounded-md text-2xl border-8 border-transparent focus:border-[#F09800] focus:scale-110 transition-all outline-none"
          >
            ▶ VER AHORA
          </button>
          <button className="bg-white/10 text-white font-bold py-6 px-12 rounded-md text-2xl border-8 border-transparent focus:border-[#F09800] focus:bg-white/20 transition-all outline-none">
            + MI LISTA
          </button>
          <button 
            onClick={() => setShowQR(true)}
            className="bg-white/10 text-white font-bold py-6 px-12 rounded-md text-2xl border-8 border-transparent focus:border-[#F09800] focus:bg-white/20 transition-all outline-none"
          >
            ❤ DONAR (QR)
          </button>
        </div>
      </div>

      {/* GRILLA TV (6 COLUMNAS GRANDES) */}
      <div className="px-20 mt-10 mb-40">
        <h2 className="text-4xl font-black mb-12 text-gray-400 uppercase tracking-tighter">Capítulos Completos</h2>
        <div className="grid grid-cols-6 gap-12">
          {genesisEpisodes.map((ep, index) => (
            <button 
              key={ep.id} 
              className="flex flex-col gap-4 text-left border-8 border-transparent focus:border-[#F09800] focus:scale-110 transition-all outline-none rounded-xl p-2 bg-transparent focus:bg-white/5"
              onClick={() => { setSelectedVideo(ep.url); setCurrentIdx(index); }}
            >
              <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl">
                <img src={ep.thumb} className="w-full h-full object-cover" />
                <span className="absolute bottom-3 right-3 bg-black px-3 py-1 text-sm font-black rounded border border-white/20 uppercase">{ep.dur}</span>
              </div>
              <h3 className="font-black text-xl truncate uppercase">EP. {ep.id}</h3>
            </button>
          ))}
        </div>
      </div>

      {/* REPRODUCTOR TV (MODO CINE TOTAL) */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[2000] bg-black flex flex-col items-center justify-center">
          <iframe 
             src={selectedVideo + "?autoplay=1"} 
             className="w-full h-full border-none shadow-[0_0_100px_rgba(240,152,0,0.2)]" 
             allow="autoplay; fullscreen" 
          />
          
          {/* CONTROLES TV (GRANDES PARA CONTROL REMOTO) */}
          <div className="absolute bottom-12 flex gap-12">
            <button 
              disabled={currentIdx === 0}
              onClick={() => { setCurrentIdx(currentIdx - 1); setSelectedVideo(genesisEpisodes[currentIdx - 1].url); }}
              className="bg-black/80 text-white text-xl py-6 px-12 rounded-md border-4 border-transparent focus:border-[#F09800] outline-none"
            >
              EP. ANTERIOR
            </button>
            <button 
              onClick={() => setSelectedVideo(null)}
              className="bg-black/80 text-white text-xl py-6 px-12 rounded-md border-4 border-transparent focus:border-[#F09800] outline-none"
            >
              VOLVER A LA LISTA
            </button>
            <button 
              disabled={currentIdx === genesisEpisodes.length - 1}
              onClick={() => { setCurrentIdx(currentIdx + 1); setSelectedVideo(genesisEpisodes[currentIdx + 1].url); }}
              className="bg-black/80 text-white text-xl py-6 px-12 rounded-md border-4 border-transparent focus:border-[#F09800] outline-none"
            >
              SIGUIENTE EPISODIO
            </button>
          </div>
        </div>
      )}

      {/* MODAL QR GIGANTE TV */}
      {showQR && (
        <div className="fixed inset-0 z-[3000] bg-black/95 flex items-center justify-center">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-5xl font-black mb-10">APOYA ESTE PROYECTO</h2>
            <div className="bg-white p-12 rounded-3xl shadow-[0_0_60px_rgba(255,255,255,0.2)] mb-10">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS')}`} 
                alt="QR TV" 
                className="w-[400px] h-[400px]"
              />
            </div>
            <p className="text-3xl text-gray-400 mb-12">Escanea este código con tu celular para donar</p>
            <button 
              autoFocus
              onClick={() => setShowQR(false)} 
              className="bg-[#F09800] text-black font-black py-8 px-24 rounded-full text-3xl border-8 border-transparent focus:border-white transition-all outline-none"
            >
              CERRAR
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default GenesisTV;
