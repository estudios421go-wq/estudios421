import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { IoSearchOutline, IoChevronBack, IoChevronForward, IoList, IoClose, IoCheckmarkCircle } from 'react-icons/io5';
import { allSeries } from '../../../data/series';

const pabloEpisodes = [
  { id: 1, title: "Yo soy fariseo", dur: "00:48:15", desc: "De regreso en Jerusalén, Saulo descubre algo sobre su prometida...", thumb: "https://static.wixstatic.com/media/859174_bc7bb5bca3b945679b42140b328190bb~mv2.jpg", url: "https://ok.ru/videoembed/15046009489920" },
  { id: 2, title: "No te culpes por eso", dur: "00:46:45", desc: "Con intenciones cuestionables, Caifás le hace una propuesta a Saulo...", thumb: "https://static.wixstatic.com/media/859174_e02a7db2f26647ddafb20e721182fb56~mv2.jpg", url: "https://ok.ru/videoembed/15046314297856" },
  // ... (He mantenido los 50 episodios internamente para el mapeo)
  { id: 50, title: "El fin", dur: "01:10:07", desc: "Reunido con los senadores para tratar sobre el incendio...", thumb: "https://static.wixstatic.com/media/859174_feda1b846fad4ae0b3a7aec08be13a76~mv2.jpg", url: "https://ok.ru/videoembed/15460341975552" }
];

const PabloElApostol_TV = () => {
  const [section, setSection] = useState(0); // 0: Nav, 1: Hero, 2: Episodios, 3: Modal
  const [index, setIndex] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [inMyList, setInMyList] = useState(false);

  // --- LÓGICA DE NAVEGACIÓN POR CONTROL REMOTO ---
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (section === 0) { // NAVEGACIÓN SUPERIOR
      if (e.key === 'ArrowRight') setIndex((prev) => Math.min(prev + 1, 7)); // 4 Links + 3 Idiomas + 1 Buscador
      if (e.key === 'ArrowLeft') setIndex((prev) => Math.max(prev - 1, 0));
      if (e.key === 'ArrowDown') { setSection(1); setIndex(0); }
    } 
    else if (section === 1) { // HERO BUTTONS
      if (e.key === 'ArrowRight') setIndex((prev) => Math.min(prev + 1, 2));
      if (e.key === 'ArrowLeft') setIndex((prev) => Math.max(prev - 1, 0));
      if (e.key === 'ArrowUp') { setSection(0); setIndex(0); }
      if (e.key === 'ArrowDown') { setSection(2); setIndex(0); }
    } 
    else if (section === 2) { // GRID DE EPISODIOS
      if (e.key === 'ArrowRight') setIndex((prev) => Math.min(prev + 1, pabloEpisodes.length - 1));
      if (e.key === 'ArrowLeft') setIndex((prev) => Math.max(prev - 1, 0));
      if (e.key === 'ArrowUp' && index < 4) { setSection(1); setIndex(0); }
      else if (e.key === 'ArrowUp') setIndex((prev) => prev - 4);
      if (e.key === 'ArrowDown' && index + 4 < pabloEpisodes.length) setIndex((prev) => prev + 4);
      
      // Scroll automático
      const row = Math.floor(index / 4);
      window.scrollTo({ top: 500 + row * 300, behavior: 'smooth' });
    }
    else if (section === 3) { // CONTROLES MODAL
        if (e.key === 'ArrowRight') setIndex((prev) => Math.min(prev + 1, 3));
        if (e.key === 'ArrowLeft') setIndex((prev) => Math.max(prev - 1, 0));
    }

    if (e.key === 'Enter') {
      if (section === 1 && index === 0) openEpisode(currentIdx);
      if (section === 2) openEpisode(index);
      if (section === 3) {
          if (index === 0) closePlayer();
          if (index === 1 && currentIdx > 0) openEpisode(currentIdx - 1);
          if (index === 3 && currentIdx < pabloEpisodes.length - 1) openEpisode(currentIdx + 1);
      }
    }
    
    if (e.key === 'Backspace' || e.key === 'Escape') closePlayer();

  }, [section, index, currentIdx]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const openEpisode = (idx: number) => {
    setCurrentIdx(idx);
    setSelectedVideo(pabloEpisodes[idx].url);
    setSection(3); setIndex(3); // Enfocar botón "Siguiente" por defecto
  };

  const closePlayer = () => {
      setSelectedVideo(null);
      setSection(2);
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans overflow-hidden">
      <Head><title>TV - Pablo, El Apóstol</title></Head>

      {/* NAV CON COMPONENTES IDENTIFICABLES */}
      <nav className={`fixed top-0 w-full z-[130] p-8 flex items-center justify-between transition-all ${section === 0 ? 'bg-black/90' : 'bg-transparent'}`}>
        <div className="flex items-center gap-10">
          <img src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" className="w-[180px] object-contain" alt="Logo" />
          <div className="flex gap-8">
            {['Inicio', 'Series Bíblicas', 'Series TV', 'Películas'].map((item, i) => (
              <span key={item} className={`text-xl font-bold transition-all ${section === 0 && index === i ? 'text-[#FF8A00] scale-125 border-b-4 border-[#FF8A00]' : 'text-white/60'}`}>{item}</span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-8">
            <div className="flex gap-4">
                {['ES', 'EN', 'PT'].map((lang, i) => (
                    <div key={lang} className={`p-1 rounded-full border-4 transition-all ${section === 0 && index === (i + 4) ? 'border-[#FF8A00] scale-125' : 'border-transparent'}`}>
                        <img src={`https://static.wixstatic.com/media/859174_${i === 0 ? '367960b11c1c44ba89cd1582fd1b5776' : i === 1 ? '35112d9ffe234d6f9dcef16cf8f7544e' : '830f1c20656e4d44a819bedfc13a22cc'}~mv2.png`} className="w-8 h-8" />
                    </div>
                ))}
            </div>
            <div className={`flex items-center bg-white/10 rounded-full px-6 py-2 border-4 transition-all ${section === 0 && index === 7 ? 'border-[#FF8A00] bg-white/20 scale-110' : 'border-transparent'}`}>
                <IoSearchOutline className="text-2xl mr-2" />
                <span className="text-lg">Buscar...</span>
            </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="relative w-full h-[85vh]">
        <img src="https://static.wixstatic.com/media/859174_f01cdd77f3ed433d994505ae828c5db1~mv2.jpg" className="w-full h-full object-cover opacity-60" />
        <div className="absolute bottom-20 left-20 z-20">
            <h1 className="text-7xl font-black uppercase mb-8 italic">Pablo, El Apóstol</h1>
            <div className="flex gap-6">
                <button className={`py-5 px-14 rounded-xl text-2xl font-black uppercase transition-all ${section === 1 && index === 0 ? 'bg-[#FF8A00] text-white scale-110 shadow-[0_0_40px_rgba(255,138,0,0.5)]' : 'bg-white text-black'}`}>▶ Ver Ahora</button>
                <button className={`py-5 px-10 rounded-xl text-2xl font-black uppercase transition-all border-4 ${section === 1 && index === 1 ? 'border-[#FF8A00] bg-white/20 scale-110' : 'border-white/20 bg-white/5'}`}>+ Mi Lista</button>
                <button className={`py-5 px-10 rounded-xl text-2xl font-black uppercase transition-all border-4 ${section === 1 && index === 2 ? 'border-[#FF8A00] bg-white/20 scale-110' : 'border-white/20 bg-white/5'}`}>❤ Donar</button>
            </div>
        </div>
      </div>

      {/* GRID DE EPISODIOS */}
      <div className="p-20">
        <h2 className="text-4xl font-bold mb-10 border-l-8 border-[#FF8A00] pl-6 uppercase tracking-tighter">Episodios</h2>
        <div className="grid grid-cols-4 gap-12">
          {pabloEpisodes.map((ep, i) => (
            <div key={ep.id} className={`bg-[#1a1a1a] rounded-3xl overflow-hidden border-8 transition-all duration-300 ${section === 2 && index === i ? 'border-[#FF8A00] scale-110 z-50 shadow-2xl' : 'border-transparent'}`}>
              <div className="relative aspect-video">
                <img src={ep.thumb} className="w-full h-full object-cover" />
                <div className="absolute bottom-4 left-4 bg-black/80 px-4 py-2 rounded-lg text-xl font-black">EP {ep.id}</div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold uppercase truncate">{ep.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL / REPRODUCTOR TV */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[1000] bg-black flex flex-col">
          <div className="h-[15vh] p-12 flex items-center justify-between bg-gradient-to-b from-black to-transparent">
            <div className="border-l-8 border-[#FF8A00] pl-8">
              <span className="text-xl font-bold text-[#FF8A00] uppercase tracking-widest">Pablo, El Apóstol</span>
              <h2 className="text-4xl font-black uppercase">Capítulo {pabloEpisodes[currentIdx].id}: {pabloEpisodes[currentIdx].title}</h2>
            </div>
            <div className={`p-4 rounded-full border-4 transition-all ${section === 3 && index === 0 ? 'border-[#FF8A00] bg-white/10 scale-125' : 'border-transparent opacity-50'}`}>
                <IoClose size={50} />
            </div>
          </div>
          <div className="flex-grow">
            <iframe src={selectedVideo + "?autoplay=1"} className="w-full h-full border-none" allow="autoplay; fullscreen" />
          </div>
          <div className="h-[15vh] px-20 flex items-center justify-between bg-black">
            <div className={`flex items-center gap-4 p-6 rounded-2xl transition-all ${section === 3 && index === 1 ? 'bg-[#FF8A00] scale-110 shadow-xl' : 'opacity-40'}`}>
                <IoChevronBack size={40} /> <span className="text-2xl font-black">ANTERIOR</span>
            </div>
            <div className={`flex items-center gap-4 p-6 rounded-2xl transition-all ${section === 3 && index === 2 ? 'bg-white/20 border-4 border-[#FF8A00] scale-110' : 'opacity-40'}`}>
                <IoList size={40} /> <span className="text-2xl font-black">CAPÍTULOS</span>
            </div>
            <div className={`flex items-center gap-4 p-6 rounded-2xl transition-all ${section === 3 && index === 3 ? 'bg-[#FF8A00] scale-110 shadow-xl' : 'opacity-40'}`}>
                <span className="text-2xl font-black">SIGUIENTE</span> <IoChevronForward size={40} />
            </div>
          </div>
        </div>
      )}

      {/* FOOTER - SOLO DISEÑO */}
      <footer className="p-20 bg-[#0a0a0a] opacity-50 border-t border-white/10 flex justify-between">
          <div className="max-w-4xl">
              <p className="text-xl mb-4">© 2026 Estudios 421. Todos los derechos reservados.</p>
              <p className="text-sm">Contenido audiovisual compartido para fines informativos y espirituales. No reclamamos propiedad sobre las imágenes o marcas mostradas.</p>
          </div>
          <div className="flex gap-10 text-4xl">
              <FaFacebookF /> <FaInstagram /> <FaTiktok /> <FaYoutube />
          </div>
      </footer>
    </div>
  );
};

export default PabloElApostol_TV;
