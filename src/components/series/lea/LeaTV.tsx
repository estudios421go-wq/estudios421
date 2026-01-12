import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { IoPlay, IoClose } from 'react-icons/io5';

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
  const [focusIndex, setFocusIndex] = useState(0); // 0 = Botón Hero, 1-10 = Episodios
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const episodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedVideo) {
        if (e.key === 'Backspace' || e.key === 'Escape') setSelectedVideo(null);
        return;
      }
      switch (e.key) {
        case 'ArrowRight': setFocusIndex(p => Math.min(p + 1, leaEpisodes.length)); break;
        case 'ArrowLeft': setFocusIndex(p => Math.max(p - 1, 0)); break;
        case 'ArrowDown': setFocusIndex(p => Math.min(p + 5, leaEpisodes.length)); break;
        case 'ArrowUp': setFocusIndex(p => Math.max(p - 5, 0)); break;
        case 'Enter': 
          if (focusIndex === 0) openEpisode(currentIdx);
          else openEpisode(focusIndex - 1);
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusIndex, selectedVideo, currentIdx]);

  useEffect(() => {
    if (focusIndex > 0) episodeRefs.current[focusIndex - 1]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [focusIndex]);

  const openEpisode = (idx: number) => { setCurrentIdx(idx); setSelectedVideo(leaEpisodes[idx].url); };

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white font-sans overflow-hidden">
      <Head><title>Lea — Modo Smart TV</title></Head>

      <div className="relative w-full h-[70vh]">
        <img src="https://static.wixstatic.com/media/859174_394a43598162462980999d535f5ab55a~mv2.jpg" className="w-full h-full object-cover" alt="Lea TV" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        <div className="absolute left-20 top-1/2 -translate-y-1/2 max-w-2xl">
          <h1 className="text-8xl font-black italic mb-4 tracking-tighter text-[#FF8A00]">LEA</h1>
          <p className="text-2xl text-gray-300 mb-10 leading-relaxed uppercase font-bold tracking-widest">Una historia de superación y fe basada en el libro del Génesis.</p>
          <button className={`flex items-center gap-4 py-5 px-12 rounded-lg text-2xl font-black transition-all duration-300 ${focusIndex === 0 ? 'bg-[#FF8A00] text-white scale-110 shadow-[0_0_30px_rgba(255,138,0,0.5)]' : 'bg-white text-black'}`}>
            <IoPlay className="text-4xl" /> VER CAPÍTULO {leaEpisodes[currentIdx].id}
          </button>
        </div>
      </div>

      <div className="px-20 -mt-10 relative z-10 pb-20">
        <h2 className="text-2xl font-black mb-8 uppercase tracking-[0.3em] text-[#FF8A00]">Episodios Disponibles</h2>
        <div className="grid grid-cols-5 gap-8">
          {leaEpisodes.map((ep, index) => (
            <div key={ep.id} ref={el => { episodeRefs.current[index] = el; }} className={`relative rounded-xl overflow-hidden transition-all duration-300 border-4 ${focusIndex === index + 1 ? 'border-[#FF8A00] scale-110 z-20 shadow-2xl' : 'border-transparent opacity-60'}`}>
              <img src={ep.thumb} className="w-full aspect-video object-cover" />
              <div className="p-4 bg-black/80">
                <h3 className="text-lg font-black truncate uppercase tracking-tighter">Cap. {ep.id} — {ep.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 z-[1000] bg-black">
          <iframe src={selectedVideo + "?autoplay=1"} className="w-full h-full" allow="autoplay; fullscreen" />
          <div className="absolute top-10 left-10 flex items-center gap-4 bg-black/80 p-5 rounded-2xl border border-white/10 backdrop-blur-xl">
             <div className="w-2 h-12 bg-[#FF8A00] rounded-full" />
             <div>
               <p className="text-xs font-black text-[#FF8A00] uppercase tracking-widest">Estás viendo Lea</p>
               <h2 className="text-2xl font-black uppercase">Capítulo {leaEpisodes[currentIdx].id}</h2>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaTV;
