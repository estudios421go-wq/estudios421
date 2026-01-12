import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { IoMenuOutline, IoCloseOutline, IoSearchOutline } from 'react-icons/io5';
import Footer from '../../Footer';

const leaEpisodes = [
  { id: 1, title: "Hermanas del destino", dur: "40:09", thumb: "https://static.wixstatic.com/media/859174_86a2172b057b4dbb8f9aad8c28163653~mv2.jpg", url: "https://ok.ru/videoembed/14199373957632" },
  { id: 2, title: "El voto sagrado", dur: "40:09", thumb: "https://static.wixstatic.com/media/859174_b2866dfb10364a52a6f6c4b1d0bd36b5~mv2.jpg", url: "https://ok.ru/videoembed/14199375071744" },
  { id: 3, title: "El engaño de Labán", dur: "42:09", thumb: "https://static.wixstatic.com/media/859174_d7cfc67255f04256a593c369119ed86c~mv2.jpg", url: "https://ok.ru/videoembed/14199375989248" },
  { id: 4, title: "La boda equivocada", dur: "41:09", thumb: "https://static.wixstatic.com/media/859174_7e9da0e84f384be2ae32c853dbdeedcc~mv2.jpg", url: "https://ok.ru/videoembed/14199376972288" },
  { id: 5, title: "Solo para Raquel", dur: "43:09", thumb: "https://static.wixstatic.com/media/859174_58e073319d26466a86e306f4691c9d96~mv2.jpg", url: "https://ok.ru/videoembed/14199377562112" },
  { id: 6, title: "Amor dividido", dur: "40:09", thumb: "https://static.wixstatic.com/media/859174_eb250911b0bb4614b9deeb1b78769c02~mv2.jpg", url: "https://ok.ru/videoembed/14199378283008" },
  { id: 7, title: "El dolor de la primogénita", dur: "42:09", thumb: "https://static.wixstatic.com/media/859174_7a07cdbacf0b4cf2a538a4a8058215e5~mv2.jpg", url: "https://ok.ru/videoembed/14199379134976" },
  { id: 8, title: "Bendecido para partir", dur: "40:09", thumb: "https://static.wixstatic.com/media/859174_192e07b145414120854d08fdfa103e40~mv2.jpg", url: "https://ok.ru/videoembed/14199380380160" },
  { id: 9, title: "La noche del encuentro", dur: "41:09", thumb: "https://static.wixstatic.com/media/859174_02f250b13a77498c8de22760af9bb7b8~mv2.jpg", url: "https://ok.ru/videoembed/14199397812736" },
  { id: 10, title: "Juicio en la familia", dur: "41:09", thumb: "https://static.wixstatic.com/media/859174_24d955c28833450eae4d86e9b842a109~mv2.jpg", url: "https://ok.ru/videoembed/14199398861312" }
];

const LeaMobile = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);

  const openEpisode = (idx: number) => { setSelectedVideo(leaEpisodes[idx].url); setCurrentIdx(idx); };

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-[#F09800]">
      <Head><title>Lea — Móvil</title></Head>
      
      <nav className="fixed top-0 w-full z-[100] px-4 py-3 flex items-center justify-between bg-black/90 backdrop-blur-md">
         <Link href="/"><div className="relative w-[110px] h-[30px]"><Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" fill className="object-contain" priority /></div></Link>
         <IoMenuOutline className="text-3xl text-white" />
      </nav>

      <div className="relative w-full aspect-[4/3] pt-14">
        <img src="https://static.wixstatic.com/media/859174_394a43598162462980999d535f5ab55a~mv2.jpg" className="w-full h-full object-cover" alt="Lea Mobile" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
      </div>

      <div className="px-4 -mt-10 relative z-20 flex flex-col gap-3">
        <button onClick={() => openEpisode(currentIdx)} className="w-full bg-white text-black font-black py-4 rounded-md text-sm uppercase tracking-widest shadow-2xl active:scale-95 transition-all">
          ▶ VER EPISODIO {leaEpisodes[currentIdx].id}
        </button>
      </div>

      <div className="px-4 mt-12 mb-20">
        <h2 className="text-[10px] font-black text-gray-500 tracking-[0.2em] uppercase border-b border-white/10 pb-2 mb-6">Lista de Capítulos</h2>
        <div className="grid grid-cols-2 gap-4">
          {leaEpisodes.map((ep, index) => (
            <div key={ep.id} className="flex flex-col gap-2 active:opacity-60" onClick={() => openEpisode(index)}>
              <div className={`relative aspect-video rounded-lg overflow-hidden border ${currentIdx === index ? 'border-[#F09800]' : 'border-white/10'}`}>
                <img src={ep.thumb} className="w-full h-full object-cover" />
                <span className="absolute bottom-1 right-1 bg-black/80 px-1.5 py-0.5 text-[8px] font-bold rounded">{ep.dur}</span>
              </div>
              <h3 className="font-bold text-[10px] uppercase truncate tracking-tight">Cap. {ep.id} {ep.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 z-[2000] bg-black flex flex-col">
          <div className="p-4 flex justify-between items-center bg-black">
            <span className="text-[9px] font-black text-[#F09800] uppercase tracking-widest">Lea — Cap. {leaEpisodes[currentIdx].id}</span>
            <button onClick={() => setSelectedVideo(null)} className="text-3xl font-light">&times;</button>
          </div>
          <iframe src={selectedVideo + "?autoplay=1"} className="w-full flex-grow border-none" allow="autoplay; fullscreen" />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default LeaMobile;
