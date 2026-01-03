import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Navbar from '../../tv/Navbar'; // Usando el Navbar de PC que me pasaste
import Footer from '../../Footer';

const genesisEpisodes = [
  { id: 1, title: "El edén", dur: "43:16", seconds: 2596, desc: "Historia de la creación y el inicio de la humanidad con Adán y Eva.", thumb: "https://static.wixstatic.com/media/859174_34318cd5b639416e9f54aac740e60a84~mv2.jpg", url: "https://ok.ru/videoembed/13888818973184" },
  { id: 2, title: "Las consecuencias", dur: "43:09", seconds: 2589, desc: "Adán y Eva enfrentan la expulsión del paraíso tras el fruto prohibido.", thumb: "https://static.wixstatic.com/media/859174_40d433337bf542d68b9965dccb4f0ecd~mv2.jpg", url: "https://ok.ru/videoembed/13888837454336" },
  { id: 3, title: "Hermanos", dur: "42:59", seconds: 2579, desc: "La historia de Caín y Abel, hijos de Adán y Eva, y sus naturalezas opuestas.", thumb: "https://static.wixstatic.com/media/859174_244fa62379ba4682a6cc03815f3891f6~mv2.jpg", url: "https://ok.ru/videoembed/13888884902400" },
  { id: 4, title: "La opción", dur: "43:00", seconds: 2580, desc: "Los celos de Caín lo llevan a tomar una decisión trágica sobre su hermano.", thumb: "https://static.wixstatic.com/media/859174_461f6b43b4a7488fb1eca919f954f145~mv2.jpg", url: "https://ok.ru/videoembed/13888885230080" },
  // ... (Pega aquí los 40 episodios que me pasaste)
];

const GenesisPC = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [showQR, setShowQR] = useState(false);

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-[#FF8A00]">
      <Head><title>Génesis — PC Version</title></Head>
      <Navbar />

      {/* HERO BANNER PC */}
      <div className="relative w-full h-[85vh] overflow-hidden">
        <img 
          src="https://static.wixstatic.com/media/859174_264be00ba6d14e699767e79c49297e5c~mv2.jpg" 
          className="w-full h-full object-cover" 
          alt="Génesis PC Banner" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/30" />
        
        {/* BOTONES SOLAPADOS PC */}
        <div className="absolute bottom-10 left-16 flex gap-6 z-10 items-center">
          <button 
            onClick={() => { setSelectedVideo(genesisEpisodes[0].url); setCurrentIdx(0); }}
            className="bg-white text-black font-black py-4 px-12 rounded-sm text-lg hover:bg-[#FF8A00] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          >
            ▶ VER AHORA
          </button>
          <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold py-4 px-10 rounded-sm hover:bg-white/20 transition-all">
            + MI LISTA
          </button>
          <button 
            onClick={() => setShowQR(true)}
            className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold py-4 px-10 rounded-sm hover:bg-white/20 transition-all"
          >
            ❤ DONAR
          </button>
        </div>
      </div>

      {/* GRILLA DE EPISODIOS PC (6 columnas) */}
      <div className="px-16 mt-16 mb-32">
        <h2 className="text-2xl font-bold mb-8 border-l-4 border-[#FF8A00] pl-4">EPISODIOS DISPONIBLES</h2>
        <div className="grid grid-cols-6 gap-6">
          {genesisEpisodes.map((ep, index) => (
            <div 
              key={ep.id} 
              className="group cursor-pointer"
              onClick={() => { setSelectedVideo(ep.url); setCurrentIdx(index); }}
            >
              <div className="relative aspect-video rounded-md overflow-hidden ring-1 ring-white/10 group-hover:ring-[#FF8A00] transition-all duration-300 shadow-xl">
                <img src={ep.thumb} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition" />
                <span className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 text-[10px] font-bold rounded">{ep.dur}</span>
              </div>
              <h3 className="mt-3 font-bold text-sm truncate group-hover:text-[#FF8A00]">EP. {ep.id} {ep.title}</h3>
              <p className="text-[11px] text-gray-500 line-clamp-2 mt-1">{ep.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL MODO CINE PC */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[1000] bg-black flex flex-col animate-fade-in">
          <div className="h-16 flex items-center justify-between px-8 bg-black/90">
            <span className="text-[#FF8A00] font-black tracking-widest uppercase">Génesis — EP. {genesisEpisodes[currentIdx].id}</span>
            <button onClick={() => setSelectedVideo(null)} className="text-4xl font-light hover:text-[#FF8A00] transition">&times;</button>
          </div>
          <div className="flex-grow flex flex-col relative">
            <iframe src={selectedVideo + "?autoplay=1"} className="w-full h-full" allow="autoplay; fullscreen" />
            
            {/* CONTROLES EXTREMOS */}
            <div className="absolute inset-x-0 bottom-10 flex justify-between px-20 pointer-events-none">
              <button 
                disabled={currentIdx === 0}
                onClick={() => { setCurrentIdx(currentIdx - 1); setSelectedVideo(genesisEpisodes[currentIdx - 1].url); }}
                className="pointer-events-auto bg-black/60 hover:bg-[#FF8A00] p-4 rounded-full transition-all disabled:opacity-30"
              >
                ANTERIOR
              </button>
              <button 
                onClick={() => setSelectedVideo(null)}
                className="pointer-events-auto bg-black/60 hover:bg-white hover:text-black px-8 py-4 rounded-full transition-all"
              >
                LISTA DE EPISODIOS
              </button>
              <button 
                disabled={currentIdx === genesisEpisodes.length - 1}
                onClick={() => { setCurrentIdx(currentIdx + 1); setSelectedVideo(genesisEpisodes[currentIdx + 1].url); }}
                className="pointer-events-auto bg-black/60 hover:bg-[#FF8A00] p-4 rounded-full transition-all disabled:opacity-30"
              >
                SIGUIENTE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DONAR QR PC */}
      {showQR && (
        <div className="fixed inset-0 z-[1100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111] border border-white/10 p-10 rounded-2xl flex flex-col items-center max-w-sm text-center shadow-2xl">
            <h3 className="text-2xl font-bold mb-2">Apoya el proyecto</h3>
            <p className="text-gray-400 text-sm mb-6">Escanea el código QR con tu celular para donar vía PayPal</p>
            <div className="bg-white p-4 rounded-xl mb-6">
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS')}`} alt="QR Donate" />
            </div>
            <button onClick={() => setShowQR(false)} className="bg-[#FF8A00] w-full py-3 rounded-lg font-bold text-black uppercase tracking-widest">Cerrar</button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default GenesisPC;
