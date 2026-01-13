import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { IoChevronBack, IoChevronForward, IoClose, IoPlay, IoList, IoCheckmarkCircle } from 'react-icons/io5';

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
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [inMyList, setInMyList] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const episodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('lea_last_ep');
    if (saved) setCurrentIdx(parseInt(saved));
    const myList = JSON.parse(localStorage.getItem('myList') || '[]');
    if (myList.includes('lea')) setInMyList(true);

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
          else setFocusIndex(p => Math.min(p + 5, leaEpisodes.length + 2)); 
          break;
        case 'ArrowUp': 
          if (focusIndex >= 3 && focusIndex <= 7) setFocusIndex(0);
          else setFocusIndex(p => Math.max(p - 5, 0)); 
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
  }, [focusIndex, selectedVideo, currentIdx, inMyList, showQR]);

  const toggleMyList = () => {
    let myList = JSON.parse(localStorage.getItem('myList') || '[]');
    if (inMyList) {
      myList = myList.filter((id: string) => id !== 'lea');
      setInMyList(false);
    } else {
      myList.push('lea');
      setInMyList(true);
    }
    localStorage.setItem('myList', JSON.stringify(myList));
  };

  const openEpisode = (idx: number) => {
    setCurrentIdx(idx);
    setSelectedVideo(leaEpisodes[idx].url);
    localStorage.setItem('lea_last_ep', idx.toString());
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white font-sans overflow-hidden">
      <Head><title>Lea — Smart TV Mode</title></Head>

      {/* HERO SECTION TV */}
      <div className="relative w-full h-[75vh]">
        <img src="https://static.wixstatic.com/media/859174_394a43598162462980999d535f5ab55a~mv2.jpg" className="w-full h-full object-cover" alt="Lea" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
        
        <div className="absolute left-20 top-1/2 -translate-y-1/2 max-w-3xl">
          <h1 className="text-9xl font-black italic mb-4 tracking-tighter text-[#FF8A00] drop-shadow-2xl">LEA</h1>
          <p className="text-2xl text-gray-300 mb-12 uppercase font-bold tracking-[0.2em] leading-relaxed">Una historia de superación y fe basada en el libro del Génesis.</p>
          
          <div className="flex gap-6">
            <button className={`flex items-center gap-4 py-5 px-12 rounded-lg text-2xl font-black transition-all duration-300 ${focusIndex === 0 ? 'bg-[#FF8A00] text-white scale-110 shadow-[0_0_40px_rgba(255,138,0,0.6)]' : 'bg-white text-black'}`}>
              <IoPlay className="text-4xl" /> {currentIdx === 0 ? "VER AHORA" : `CONTINUAR EP. ${leaEpisodes[currentIdx].id}`}
            </button>
            <button className={`flex items-center gap-4 py-5 px-10 rounded-lg text-xl font-bold transition-all duration-300 ${focusIndex === 1 ? 'bg-[#FF8A00] text-white scale-110 shadow-xl' : 'bg-white/10 text-white'}`}>
              {inMyList ? <><IoCheckmarkCircle /> EN MI LISTA</> : '+ MI LISTA'}
            </button>
            <button className={`py-5 px-10 rounded-lg text-xl font-bold transition-all duration-300 ${focusIndex === 2 ? 'bg-[#FF8A00] text-white scale-110 shadow-xl' : 'bg-white/10 text-white'}`}>
              ❤ DONAR
            </button>
          </div>
        </div>
      </div>

      {/* EPISODIOS TV - CUADRÍCULA DE 5 */}
      <div className="px-20 -mt-12 relative z-10 pb-20">
        <h2 className="text-3xl font-black mb-10 uppercase tracking-[0.3em] text-[#FF8A00]">Episodios Disponibles</h2>
        <div className="grid grid-cols-5 gap-8">
          {leaEpisodes.map((ep, index) => (
            <div 
              key={ep.id} 
              ref={(el) => { episodeRefs.current[index] = el; }}
              className={`relative rounded-xl overflow-hidden transition-all duration-300 border-4 bg-[#2C2F33] ${focusIndex === index + 3 ? 'border-[#FF8A00] scale-110 z-20 shadow-[0_0_30px_rgba(255,138,0,0.4)]' : 'border-transparent opacity-60'}`}
            >
              <img src={ep.thumb} className="w-full aspect-video object-cover" />
              <div className="p-5 bg-gradient-to-t from-[#0a0a0a] to-transparent">
                <h3 className="text-lg font-black truncate uppercase tracking-tighter">EP {ep.id} — {ep.title}</h3>
                <span className="text-sm font-bold text-gray-400">{ep.dur}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* POPUP QR DONACIÓN TV */}
      {showQR && (
        <div className="fixed inset-0 z-[3000] bg-black/95 flex items-center justify-center p-20 animate-fade-in">
          <div className="bg-[#111] border-2 border-[#FF8A00] p-16 rounded-3xl flex flex-col items-center text-center shadow-[0_0_60px_rgba(255,138,0,0.3)]">
            <h3 className="text-5xl font-black mb-8 uppercase tracking-widest text-[#FF8A00]">Apoya el proyecto</h3>
            <p className="text-2xl text-gray-400 mb-10">Escanea el código con tu celular para donar</p>
            <div className="bg-white p-6 rounded-2xl mb-10 shadow-inner">
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS')}`} alt="QR" className="w-64 h-64" />
            </div>
            <p className="text-xl font-bold animate-pulse uppercase tracking-widest">Presiona ENTER para cerrar</p>
          </div>
        </div>
      )}

      {/* PLAYER TV */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[2000] bg-black">
          <iframe src={selectedVideo + "?autoplay=1"} className="w-full h-full border-none" allow="autoplay; fullscreen" />
          <div className="absolute top-10 left-10 flex items-center gap-6 bg-black/70 p-6 rounded-2xl border border-white/10 backdrop-blur-xl">
             <div className="w-2 h-14 bg-[#FF8A00] rounded-full" />
             <div>
               <p className="text-sm font-black text-[#FF8A00] uppercase tracking-[0.3em]">Estás viendo</p>
               <h2 className="text-3xl font-black uppercase tracking-tight text-white">Lea — Cap. {leaEpisodes[currentIdx].id}</h2>
             </div>
          </div>
          <div className="absolute bottom-10 right-10 text-gray-400 text-2xl font-black bg-black/60 px-8 py-4 rounded-xl border border-white/10">Presiona ATRÁS para salir</div>
        </div>
      )}
    </div>
  );
};

export default LeaTV;
