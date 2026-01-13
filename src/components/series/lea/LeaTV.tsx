import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { IoPlay, IoClose, IoCheckmarkCircle } from 'react-icons/io5';

const LeaTV = () => {
  const [focusIndex, setFocusIndex] = useState(0); 
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [inMyList, setInMyList] = useState(false);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('lea_last_ep');
    if (saved) setCurrentIdx(parseInt(saved));
    const list = JSON.parse(localStorage.getItem('myList') || '[]');
    if (list.includes('lea')) setInMyList(true);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedVideo) { if (e.key === 'Backspace') setSelectedVideo(null); return; }
      if (showQR) { if (e.key === 'Backspace' || e.key === 'Enter') setShowQR(false); return; }
      switch (e.key) {
        case 'ArrowRight': setFocusIndex(p => Math.min(p + 1, leaEpisodes.length + 2)); break;
        case 'ArrowLeft': setFocusIndex(p => Math.max(p - 1, 0)); break;
        case 'ArrowDown': setFocusIndex(p => Math.min(p + 4, leaEpisodes.length + 2)); break;
        case 'ArrowUp': setFocusIndex(p => Math.max(p - 4, 0)); break;
        case 'Enter': 
          if (focusIndex === 0) openEpisode(currentIdx);
          else if (focusIndex === 1) toggleMyList();
          else if (focusIndex === 2) setShowQR(true);
          else if (focusIndex >= 3) openEpisode(focusIndex - 3);
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusIndex, selectedVideo, showQR, inMyList, currentIdx]);

  const toggleMyList = () => {
    let list = JSON.parse(localStorage.getItem('myList') || '[]');
    if (inMyList) { list = list.filter((i: string) => i !== 'lea'); setInMyList(false); }
    else { list.push('lea'); setInMyList(true); }
    localStorage.setItem('myList', JSON.stringify(list));
  };

  const openEpisode = (idx: number) => {
    setCurrentIdx(idx); setSelectedVideo(leaEpisodes[idx].url);
    localStorage.setItem('lea_last_ep', idx.toString());
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans overflow-hidden">
      <nav className="fixed top-0 w-full z-[100] px-12 py-8 flex items-center justify-between bg-gradient-to-b from-black to-transparent">
        <Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" width={220} height={60} />
        <div className="flex gap-10 text-2xl font-bold uppercase tracking-widest text-gray-400">
          <span className="text-white border-b-4 border-[#FF8A00]">Inicio</span>
          <span>Series Bíblicas</span><span>Series TV</span><span>Películas</span>
        </div>
      </nav>

      <div className="relative w-full h-[80vh]">
        <img src="https://static.wixstatic.com/media/859174_394a43598162462980999d535f5ab55a~mv2.jpg" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-10 left-20 flex gap-8">
          <button className={`py-6 px-16 rounded-sm text-2xl font-black transition-all ${focusIndex===0?'bg-[#FF8A00] text-white scale-110 shadow-2xl':'bg-white text-black'}`}>
            {currentIdx===0?"▶ Ver Ahora":`▶ Continuar Ep. ${leaEpisodes[currentIdx].id}`}
          </button>
          <button className={`py-6 px-12 rounded-sm text-xl font-bold border-2 transition-all ${focusIndex===1?'bg-[#FF8A00] border-[#FF8A00] scale-110':'bg-transparent border-white'}`}>
            {inMyList ? <><IoCheckmarkCircle className="inline mr-2" />En Mi Lista</> : '+ Mi Lista'}
          </button>
          <button className={`py-6 px-12 rounded-sm text-xl font-bold border-2 transition-all ${focusIndex===2?'bg-green-600 border-green-500 scale-110':'bg-transparent border-white'}`}>❤ Donar</button>
        </div>
      </div>

      <div className="px-20 py-20 bg-black">
        <h2 className="text-3xl font-bold uppercase tracking-widest border-l-8 border-[#FF8A00] pl-6 mb-12">Episodios Disponibles</h2>
        <div className="grid grid-cols-4 gap-12">
          {leaEpisodes.map((ep, idx) => (
            <div key={ep.id} className={`bg-[#2C2F33] rounded-xl overflow-hidden transition-all border-4 ${focusIndex===idx+3?'border-[#FF8A00] scale-105':'border-transparent opacity-60'}`}>
              <img src={ep.thumb} className="w-full aspect-video object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold uppercase truncate">{ep.title}</h3>
                <p className="text-[#FF8A00] font-black mt-2">EPISODIO {ep.id}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showQR && (
        <div className="fixed inset-0 z-[3000] bg-black/95 flex items-center justify-center p-20">
          <div className="bg-[#111] border-2 border-[#FF8A00] p-16 rounded-3xl flex flex-col items-center">
            <h3 className="text-5xl font-black mb-8 uppercase text-[#FF8A00]">Apoya el proyecto</h3>
            <div className="bg-white p-6 rounded-2xl mb-10">
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS')}`} className="w-64 h-64" />
            </div>
            <p className="text-xl font-bold animate-pulse">PRESIONA ENTER PARA CERRAR</p>
          </div>
        </div>
      )}

      {selectedVideo && (
        <div className="fixed inset-0 z-[2000] bg-black flex items-center justify-center">
          <iframe src={selectedVideo+"?autoplay=1"} className="w-full h-full" allow="autoplay; fullscreen" />
          <div className="absolute top-10 left-10 flex items-center gap-6 bg-black/70 p-6 rounded-2xl">
             <div className="w-2 h-14 bg-[#FF8A00] rounded-full" />
             <div>
               <p className="text-sm font-black text-[#FF8A00] uppercase tracking-widest">Estás viendo</p>
               <h2 className="text-2xl font-bold">Lea — Cap. {leaEpisodes[currentIdx].id}</h2>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default LeaTV;
