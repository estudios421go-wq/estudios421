import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { IoPlay, IoClose, IoCheckmarkCircle } from 'react-icons/io5';

// Definición interna para evitar errores de renderizado
const leaEpisodes = [
  { id: 1, title: "Hermanas del destino", dur: "00:40:09", thumb: "https://static.wixstatic.com/media/859174_86a2172b057b4dbb8f9aad8c28163653~mv2.jpg", url: "https://ok.ru/videoembed/14199373957632" },
  { id: 2, title: "El voto sagrado", dur: "00:40:09", thumb: "https://static.wixstatic.com/media/859174_b2866dfb10364a52a6f6c4b1d0bd36b5~mv2.jpg", url: "https://ok.ru/videoembed/14199375071744" },
  { id: 3, title: "El engaño de Labán", dur: "00:42:09", thumb: "https://static.wixstatic.com/media/859174_d7cfc67255f04256a593c369119ed86c~mv2.jpg", url: "https://ok.ru/videoembed/14199375989248" },
  { id: 4, title: "La boda equivocada", dur: "00:41:09", thumb: "https://static.wixstatic.com/media/859174_7e9da0e84f384be2ae32c853dbdeedcc~mv2.jpg", url: "https://ok.ru/videoembed/14199376972288" },
  { id: 5, title: "Solo para Raquel", dur: "00:43:09", thumb: "https://static.wixstatic.com/media/859174_58e073319d26466a86e306f4691c9d96~mv2.jpg", url: "https://ok.ru/videoembed/14199377562112" },
  { id: 6, title: "Amor dividido", dur: "00:40:09", thumb: "https://static.wixstatic.com/media/859174_eb250911b0bb4614b9deeb1b78769c02~mv2.jpg", url: "https://ok.ru/videoembed/14199378283008" },
  { id: 7, title: "El dolor de la primogénita", dur: "00:42:09", thumb: "https://static.wixstatic.com/media/859174_7a07cdbacf0b4cf2a538a4a8058215e5~mv2.jpg", url: "https://ok.ru/videoembed/14199379134976" },
  { id: 8, title: "Bendecido para partir", dur: "00:40:09", thumb: "https://static.wixstatic.com/media/859174_192e07b145414120854d08fdfa103e40~mv2.jpg", url: "https://ok.ru/videoembed/14199380380160" },
  { id: 9, title: "La noche del encuentro", dur: "00:41:09", thumb: "https://static.wixstatic.com/media/859174_02f250b13a77498c8de22760af9bb7b8~mv2.jpg", url: "https://ok.ru/videoembed/14199397812736" },
  { id: 10, title: "Juicio en la familia", dur: "00:41:09", thumb: "https://static.wixstatic.com/media/859174_24d955c28833450eae4d86e9b842a109~mv2.jpg", url: "https://ok.ru/videoembed/14199398861312" }
];

const LeaTV = () => {
  const router = useRouter();
  const [focusIndex, setFocusIndex] = useState(0); // 0=Play, 1=List, 2=Donate, 3+=Episodes
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [inMyList, setInMyList] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const episodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Cargar persistencia
    const saved = localStorage.getItem('lea_last_ep');
    if (saved) setCurrentIdx(parseInt(saved));
    const list = JSON.parse(localStorage.getItem('myList') || '[]');
    if (list.includes('lea')) setInMyList(true);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedVideo) {
        if (e.key === 'Backspace' || e.key === 'Escape') setSelectedVideo(null);
        return;
      }
      if (showQR) {
        if (e.key === 'Backspace' || e.key === 'Enter' || e.key === 'Escape') setShowQR(false);
        return;
      }

      switch (e.key) {
        case 'ArrowRight': setFocusIndex(p => Math.min(p + 1, leaEpisodes.length + 2)); break;
        case 'ArrowLeft': setFocusIndex(p => Math.max(p - 1, 0)); break;
        case 'ArrowDown': 
          if (focusIndex <= 2) setFocusIndex(3);
          else setFocusIndex(p => Math.min(p + 4, leaEpisodes.length + 2)); 
          break;
        case 'ArrowUp': 
          if (focusIndex >= 3 && focusIndex <= 6) setFocusIndex(0);
          else setFocusIndex(p => Math.max(p - 4, 0)); 
          break;
        case 'Enter': 
          if (focusIndex === 0) openEpisode(currentIdx);
          else if (focusIndex === 1) toggleMyList();
          else if (focusIndex === 2) setShowQR(true);
          else openEpisode(focusIndex - 3);
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusIndex, selectedVideo, showQR, inMyList, currentIdx]);

  // Scroll automático para TV
  useEffect(() => {
    if (focusIndex >= 3) {
      episodeRefs.current[focusIndex - 3]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [focusIndex]);

  const toggleMyList = () => {
    let list = JSON.parse(localStorage.getItem('myList') || '[]');
    if (inMyList) { list = list.filter((id: string) => id !== 'lea'); setInMyList(false); }
    else { list.push('lea'); setInMyList(true); }
    localStorage.setItem('myList', JSON.stringify(list));
  };

  const openEpisode = (idx: number) => {
    setCurrentIdx(idx);
    setSelectedVideo(leaEpisodes[idx].url);
    localStorage.setItem('lea_last_ep', idx.toString());
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans overflow-hidden">
      <Head><title>Lea — Smart TV</title></Head>

      {/* NAVBAR MAESTRA (CLON DE PC PERO ADAPTADA) */}
      <nav className="fixed top-0 w-full z-[100] px-16 py-10 flex items-center justify-between bg-gradient-to-b from-black via-black/80 to-transparent">
        <Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" width={240} height={65} priority />
        <div className="flex gap-12 text-2xl font-bold uppercase tracking-[0.2em] text-gray-400">
          <span className="text-white border-b-4 border-[#FF8A00] pb-2">Inicio</span>
          <span>Series Bíblicas</span>
          <span>Series TV</span>
          <span>Películas</span>
        </div>
      </nav>

      {/* HERO SECTION (IDENTICA A PC) */}
      <div className="relative w-full h-[85vh]">
        <img src="https://static.wixstatic.com/media/859174_394a43598162462980999d535f5ab55a~mv2.jpg" className="w-full h-full object-cover" alt="Banner" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
        
        <div className="absolute bottom-12 left-20 flex gap-10 items-center z-20">
          <button className={`py-6 px-16 rounded-sm text-3xl font-black uppercase transition-all duration-300 ${focusIndex === 0 ? 'bg-white text-black scale-110 shadow-[0_0_50px_rgba(255,255,255,0.3)]' : 'bg-white/10 text-white'}`}>
            {currentIdx === 0 ? "▶ Ver Ahora" : `▶ Continuar Ep. ${leaEpisodes[currentIdx].id}`}
          </button>
          <button className={`py-6 px-12 rounded-sm text-2xl font-bold uppercase border-4 transition-all duration-300 ${focusIndex === 1 ? 'bg-[#FF8A00] border-[#FF8A00] text-white scale-110 shadow-xl' : 'bg-transparent border-white/20 text-white'}`}>
            {inMyList ? <><IoCheckmarkCircle className="inline mr-2" />En Mi Lista</> : '+ Mi Lista'}
          </button>
          <button className={`py-6 px-12 rounded-sm text-2xl font-bold uppercase border-4 transition-all duration-300 ${focusIndex === 2 ? 'bg-green-600 border-green-600 text-white scale-110 shadow-xl' : 'bg-transparent border-white/20 text-white'}`}>
            ❤ Donar
          </button>
        </div>
      </div>

      {/* EPISODIOS (CUADRÍCULA DE 4 - FONDO GRIS #2C2F33) */}
      <div className="px-20 py-24 bg-black">
        <header className="flex items-center gap-6 mb-16 border-l-[12px] border-[#FF8A00] pl-8">
            <h2 className="text-4xl font-black uppercase tracking-[0.2em]">Episodios Disponibles</h2>
        </header>

        <div className="grid grid-cols-4 gap-12">
          {leaEpisodes.map((ep, index) => (
            <div 
              key={ep.id} 
              ref={(el) => { episodeRefs.current[index] = el; }}
              className={`bg-[#2C2F33] rounded-2xl overflow-hidden transition-all duration-300 border-[6px] ${focusIndex === index + 3 ? 'border-[#FF8A00] scale-110 z-20 shadow-2xl' : 'border-transparent opacity-50'}`}
            >
              <div className="relative aspect-video">
                <img src={ep.thumb} className="w-full h-full object-cover" alt={ep.title} />
                <div className="absolute bottom-4 left-4 bg-black/80 px-4 py-1 text-xl font-black rounded text-[#FF8A00] uppercase tracking-tighter">Episodio {ep.id}</div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-black uppercase truncate">{ep.title}</h3>
                <span className="text-xl font-bold text-gray-400 mt-2 block">{ep.dur}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* POPUP QR DONACIÓN */}
      {showQR && (
        <div className="fixed inset-0 z-[3000] bg-black/95 flex items-center justify-center animate-fade-in">
          <div className="bg-[#111] border-4 border-[#FF8A00] p-20 rounded-[40px] flex flex-col items-center shadow-2xl">
            <h3 className="text-6xl font-black mb-10 uppercase text-[#FF8A00] tracking-widest">Apoya el proyecto</h3>
            <div className="bg-white p-8 rounded-3xl mb-12 shadow-2xl">
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS')}`} className="w-80 h-80" alt="QR" />
            </div>
            <p className="text-3xl font-bold animate-pulse uppercase tracking-widest">Presiona ENTER para cerrar</p>
          </div>
        </div>
      )}

      {/* REPRODUCTOR TV */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[2000] bg-black">
          <iframe src={selectedVideo + "?autoplay=1"} className="w-full h-full border-none" allow="autoplay; fullscreen" />
          <div className="absolute top-12 left-12 flex items-center gap-8 bg-black/70 p-8 rounded-3xl border border-white/10 backdrop-blur-2xl">
             <div className="w-3 h-20 bg-[#FF8A00] rounded-full" />
             <div>
               <p className="text-lg font-black text-[#FF8A00] uppercase tracking-[0.4em]">Estás viendo</p>
               <h2 className="text-4xl font-black uppercase text-white">Lea — Cap. {leaEpisodes[currentIdx].id}</h2>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaTV;
