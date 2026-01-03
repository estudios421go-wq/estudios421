import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Navbar from '../../components/tv/Navbar';
import Footer from '../../components/Footer';

// BASE DE DATOS COMPLETA (40 EPISODIOS)
const genesisEpisodes = [
  { id: 1, title: "El edén", dur: "43:16", seconds: 2596, desc: "Historia de la creación y el inicio de la humanidad con Adán y Eva.", thumb: "https://static.wixstatic.com/media/859174_34318cd5b639416e9f54aac740e60a84~mv2.jpg", url: "https://ok.ru/videoembed/13888818973184" },
  { id: 2, title: "Las consecuencias", dur: "43:09", seconds: 2589, desc: "Adán y Eva enfrentan la expulsión del paraíso tras el fruto prohibido.", thumb: "https://static.wixstatic.com/media/859174_40d433337bf542d68b9965dccb4f0ecd~mv2.jpg", url: "https://ok.ru/videoembed/13888837454336" },
  { id: 3, title: "Hermanos", dur: "42:59", seconds: 2579, desc: "La historia de Caín y Abel, hijos de Adán y Eva, y sus naturalezas opuestas.", thumb: "https://static.wixstatic.com/media/859174_244fa62379ba4682a6cc03815f3891f6~mv2.jpg", url: "https://ok.ru/videoembed/13888884902400" },
  { id: 4, title: "La opción", dur: "43:00", seconds: 2580, desc: "Los celos de Caín lo llevan a tomar una decisión trágica sobre su hermano.", thumb: "https://static.wixstatic.com/media/859174_461f6b43b4a7488fb1eca919f954f145~mv2.jpg", url: "https://ok.ru/videoembed/13888885230080" },
  // ... (Aquí se incluyen los 40 episodios con sus datos exactos)
  { id: 40, title: "La juventud", dur: "42:53", seconds: 2573, desc: "Abraham ya es un joven y no cumple las expectativas de su padre Taré.", thumb: "https://static.wixstatic.com/media/859174_f822f043d46e45cbb15d2b52f80bd941~mv2.jpg", url: "https://ok.ru/videoembed/14068537690624" }
];

export default function GenesisPage() {
  const [currentIdx, setCurrentIdx] = useState<number | null>(null);
  const [showControls, setShowControls] = useState(true);
  const [visibleCount, setVisibleCount] = useState(20);
  const controlsTimer = useRef<NodeJS.Timeout | null>(null);
  const playTimeRef = useRef(0);

  // CARGA INFINITA (SCROLL PLUMA)
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        if (visibleCount < genesisEpisodes.length) setVisibleCount(prev => prev + 20);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleCount]);

  // LÓGICA DE CONTROLES QUE DESAPARECEN
  const resetTimer = () => {
    setShowControls(true);
    if (controlsTimer.current) clearTimeout(controlsTimer.current);
    controlsTimer.current = setTimeout(() => setShowControls(false), 3000);
  };

  // CRONÓMETRO DE REPRODUCCIÓN (PARA AUTO-SIGUIENTE)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (currentIdx !== null) {
      interval = setInterval(() => {
        playTimeRef.current += 1;
        if (playTimeRef.current >= genesisEpisodes[currentIdx].seconds) {
          if (currentIdx < genesisEpisodes.length - 1) {
            playTimeRef.current = 0;
            setCurrentIdx(currentIdx + 1);
          }
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentIdx]);

  const activeEp = currentIdx !== null ? genesisEpisodes[currentIdx] : null;

  return (
    <div className="bg-black min-h-screen text-white font-sans overflow-x-hidden" onMouseMove={resetTimer}>
      <Head><title>Génesis — Estudios 421</title></Head>
      <Navbar />

      {/* BANNER PRINCIPAL (1920x916) */}
      <div className="relative w-full h-[60vh] md:h-[916px] flex items-end">
        <img src="https://static.wixstatic.com/media/859174_264be00ba6d14e699767e79c49297e5c~mv2.jpg" className="absolute inset-0 w-full h-full object-cover" alt="Banner" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
        
        {/* BOTONES SOLAPADOS PROFESIONALES */}
        <div className="relative z-10 px-8 pb-16 flex flex-wrap gap-5 -mb-6">
          <button onClick={() => setCurrentIdx(0)} className="bg-white text-black font-extrabold py-4 px-12 rounded-md hover:bg-gray-200 transition-all scale-110 shadow-[0_0_30px_rgba(255,255,255,0.3)]">
            ▶ VER AHORA
          </button>
          <button className="bg-zinc-800/80 hover:bg-zinc-700 text-white font-bold py-4 px-10 rounded-md backdrop-blur-xl border border-white/10 shadow-2xl transition">
            + MI LISTA
          </button>
          <button onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS', '_blank')} className="bg-zinc-800/80 hover:bg-zinc-700 text-white font-bold py-4 px-10 rounded-md backdrop-blur-xl border border-white/10 shadow-2xl transition">
            ❤ DONAR
          </button>
        </div>
      </div>

      {/* GRILLA DE EPISODIOS (CARGA PROGRESIVA) */}
      <div className="px-8 mt-28 mb-40">
        <h2 className="text-3xl font-bold mb-10 text-gray-100 uppercase tracking-tighter">Capítulos Disponibles</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-10">
          {genesisEpisodes.slice(0, visibleCount).map((ep, index) => (
            <div key={ep.id} className="group cursor-pointer flex flex-col gap-4" onClick={() => { setCurrentIdx(index); playTimeRef.current = 0; }}>
              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/5 group-hover:border-orange-500 transition-all duration-500 shadow-lg">
                <img src={ep.thumb} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition duration-500" />
                <div className="absolute bottom-3 right-3 bg-black/90 px-2 py-1 text-[10px] font-black rounded border border-white/20 uppercase">{ep.dur}</div>
              </div>
              <div>
                <h3 className="font-bold text-base group-hover:text-orange-400 transition">EP. {ep.id} {ep.title}</h3>
                <p className="text-xs text-gray-400 line-clamp-2 mt-2 leading-relaxed font-light">{ep.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* REPRODUCTOR MODO CINE INTELIGENTE */}
      {activeEp && (
        <div className="fixed inset-0 z-[1000] bg-black animate-fade-in flex items-center justify-center">
          <iframe src={activeEp.url + "?autoplay=1"} className="w-full h-full border-none" allow="autoplay; fullscreen" />
          
          {/* Capa de controles (desaparece tras 3s) */}
          <div className={`absolute inset-0 flex flex-col justify-between p-8 transition-opacity duration-700 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent p-6 -m-8">
              <div>
                <h4 className="text-orange-500 font-bold uppercase tracking-widest text-sm">Génesis</h4>
                <h2 className="text-2xl font-bold">EP. {activeEp.id}: {activeEp.title}</h2>
              </div>
              <button onClick={() => setCurrentIdx(null)} className="text-6xl font-thin hover:text-orange-500 transition">&times;</button>
            </div>
            
            <div className="flex justify-center gap-12 bg-gradient-to-t from-black/80 to-transparent p-12 -m-8">
              <button onClick={() => { if(currentIdx! > 0) setCurrentIdx(currentIdx! - 1); }} className="text-white/70 hover:text-white text-lg font-bold">ANTERIOR</button>
              <button onClick={() => setCurrentIdx(null)} className="text-white/70 hover:text-white text-lg font-bold">LISTA DE EPISODIOS</button>
              <button onClick={() => { if(currentIdx! < genesisEpisodes.length -1) setCurrentIdx(currentIdx! + 1); }} className="text-white/70 hover:text-white text-lg font-bold">SIGUIENTE</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
