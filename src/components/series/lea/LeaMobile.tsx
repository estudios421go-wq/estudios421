import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoMenuOutline, IoCloseOutline, IoCheckmarkCircle } from 'react-icons/io5';
import Footer from '../../Footer';

// Use same leaEpisodes as PC

const LeaMobile = () => {
  const router = useRouter();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [inMyList, setInMyList] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('lea_last_ep');
    if (saved) setCurrentIdx(parseInt(saved));
    const list = JSON.parse(localStorage.getItem('myList') || '[]');
    if (list.includes('lea')) setInMyList(true);
  }, []);

  const openEpisode = (idx: number) => {
    setSelectedVideo(leaEpisodes[idx].url);
    setCurrentIdx(idx);
    localStorage.setItem('lea_last_ep', idx.toString());
  };

  const toggleMyList = () => {
    let list = JSON.parse(localStorage.getItem('myList') || '[]');
    if (inMyList) { list = list.filter((i: string) => i !== 'lea'); setInMyList(false); }
    else { list.push('lea'); setInMyList(true); }
    localStorage.setItem('myList', JSON.stringify(list));
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans overflow-x-hidden">
      <nav className="fixed top-0 w-full z-[100] px-4 py-3 flex items-center gap-4 bg-gradient-to-b from-black/90 to-transparent">
        <button className="text-3xl" onClick={()=>setIsMenuOpen(!isMenuOpen)}>{isMenuOpen?<IoCloseOutline/>:<IoMenuOutline/>}</button>
        <Link href="/"><div className="relative w-[110px] h-[30px]"><Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" fill className="object-contain" priority /></div></Link>
      </nav>

      <div className="relative w-full pt-0">
        <div className="w-full aspect-[4/3] relative">
          <img src="https://static.wixstatic.com/media/859174_394a43598162462980999d535f5ab55a~mv2.jpg" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50" />
        </div>
        <div className="px-4 -mt-14 flex flex-col gap-3 relative z-20">
          <button onClick={()=>openEpisode(currentIdx)} className="w-full bg-white text-black font-bold py-3.5 rounded-md text-sm uppercase shadow-2xl">
            {currentIdx===0?"▶ VER AHORA":`▶ CONTINUAR EP. ${leaEpisodes[currentIdx].id}`}
          </button>
          <div className="flex gap-3">
            <button onClick={toggleMyList} className={`flex-1 py-3 rounded-md text-[10px] font-bold border transition-all ${inMyList?'bg-[#F09800] border-[#F09800]':'bg-white/10 border-white/5'}`}>
              {inMyList ? <><IoCheckmarkCircle className="inline mr-1" />MI LISTA</> : '+ MI LISTA'}
            </button>
            <button onClick={()=>window.open('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS','_blank')} className="flex-1 bg-white/10 border border-white/5 py-3 rounded-md text-[10px] font-bold uppercase tracking-widest">❤ DONAR</button>
          </div>
        </div>
      </div>

      <div className="px-4 mt-10 mb-20">
        <h2 className="text-xs font-bold mb-4 text-gray-500 tracking-widest uppercase border-b border-white/10 pb-2">Episodios Disponibles</h2>
        <div className="grid grid-cols-2 gap-4">
          {leaEpisodes.map((ep, idx) => (
            <div key={ep.id} className="flex flex-col gap-2" onClick={()=>openEpisode(idx)}>
              <div className={`relative aspect-video rounded-md overflow-hidden border ${currentIdx===idx?'border-[#F09800]':'border-white/5'}`}>
                <img src={ep.thumb} className="w-full h-full object-cover" />
                <span className="absolute bottom-1 right-1 bg-black/90 px-1.5 py-0.5 text-[7px] font-black rounded uppercase">{ep.dur}</span>
              </div>
              <h3 className="font-bold text-[10px] truncate uppercase">EP. {ep.id} {ep.title}</h3>
            </div>
          ))}
        </div>
      </div>
      {selectedVideo && (
        <div className="fixed inset-0 z-[2000] bg-black flex flex-col">
          <div className="p-4 flex justify-between bg-black/80">
            <span className="text-[10px] font-bold text-[#F09800]">Lea — Cap. {leaEpisodes[currentIdx].id}</span>
            <button onClick={()=>setSelectedVideo(null)} className="text-2xl">&times;</button>
          </div>
          <iframe src={selectedVideo+"?autoplay=1"} className="w-full flex-grow" allow="autoplay; fullscreen" />
        </div>
      )}
      <Footer />
    </div>
  );
};
export default LeaMobile;
