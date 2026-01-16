import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoMenuOutline, IoCloseOutline, IoCheckmarkCircle, IoChevronBack, IoChevronForward, IoClose, IoList } from 'react-icons/io5';
import Footer from '../../Footer';

const LeaMobile = () => {
  const leaEpisodes = [
    { id: 1, title: "Hermanas del destino", dur: "00:40:06", thumb: "https://static.wixstatic.com/media/859174_86a2172b057b4dbb8f9aad8c28163653~mv2.jpg", url: "https://ok.ru/videoembed/14199373957632" },
    { id: 2, title: "El voto sagrado", dur: "00:39:26", thumb: "https://static.wixstatic.com/media/859174_b2866dfb10364a52a6f6c4b1d0bd36b5~mv2.jpg", url: "https://ok.ru/videoembed/14199375071744" },
    { id: 3, title: "El engaño de Labán", dur: "00:41:00", thumb: "https://static.wixstatic.com/media/859174_d7cfc67255f04256a593c369119ed86c~mv2.jpg", url: "https://ok.ru/videoembed/14199375989248" },
    { id: 4, title: "La boda equivocada", dur: "00:41:22", thumb: "https://static.wixstatic.com/media/859174_7e9da0e84f384be2ae32c853dbdeedcc~mv2.jpg", url: "https://ok.ru/videoembed/14199376972288" },
    { id: 5, title: "Solo para Raquel", dur: "00:42:42", thumb: "https://static.wixstatic.com/media/859174_58e073319d26466a86e306f4691c9d96~mv2.jpg", url: "https://ok.ru/videoembed/14199377562112" },
    { id: 6, title: "Amor dividido", dur: "00:40:34", thumb: "https://static.wixstatic.com/media/859174_eb250911b0bb4614b9deeb1b78769c02~mv2.jpg", url: "https://ok.ru/videoembed/14199378283008" },
    { id: 7, title: "El dolor de la primogénita", dur: "00:42:16", thumb: "https://static.wixstatic.com/media/859174_7a07cdbacf0b4cf2a538a4a8058215e5~mv2.jpg", url: "https://ok.ru/videoembed/14199379134976" },
    { id: 8, title: "Bendecido para partir", dur: "00:40:14", thumb: "https://static.wixstatic.com/media/859174_192e07b145414120854d08fdfa103e40~mv2.jpg", url: "https://ok.ru/videoembed/14199380380160" },
    { id: 9, title: "La noche del encuentro", dur: "00:40:36", thumb: "https://static.wixstatic.com/media/859174_02f250b13a77498c8de22760af9bb7b8~mv2.jpg", url: "https://ok.ru/videoembed/14199397812736" },
    { id: 10, title: "Juicio en la familia", dur: "00:40:38", thumb: "https://static.wixstatic.com/media/859174_24d955c28833450eae4d86e9b842a109~mv2.jpg", url: "https://ok.ru/videoembed/14199398861312" }
  ];

  const router = useRouter();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [inMyList, setInMyList] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    const saved = localStorage.getItem('lea_last_ep');
    if (saved) setCurrentIdx(parseInt(saved));
    const list = JSON.parse(localStorage.getItem('myList') || '[]');
    if (list.includes('lea')) setInMyList(true);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openEpisode = (idx: number) => { 
    setSelectedVideo(leaEpisodes[idx].url); 
    setCurrentIdx(idx); 
    localStorage.setItem('lea_last_ep', idx.toString());
  };

  const toggleMyList = () => {
    let list = JSON.parse(localStorage.getItem('myList') || '[]');
    if (inMyList) { list = list.filter((id: string) => id !== 'lea'); setInMyList(false); }
    else { list.push('lea'); setInMyList(true); }
    localStorage.setItem('myList', JSON.stringify(list));
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-[#FF8A00] overflow-x-hidden">
      <Head><title>Lea — Móvil</title></Head>
      
      {/* NAVBAR */}
      <nav className={`fixed top-0 w-full z-[100] px-4 py-3 flex items-center justify-between transition-all duration-300 ${isScrolled ? 'bg-black shadow-lg' : 'bg-gradient-to-b from-black/90 to-transparent'}`}>
        <div className="flex items-center gap-3">
          <button className="text-white text-3xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <IoCloseOutline /> : <IoMenuOutline />}
          </button>
          <Link href="/"><div className="relative w-[110px] h-[30px]"><Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" fill className="object-contain" priority /></div></Link>
        </div>
        <Image src="https://static.wixstatic.com/media/859174_26ca840644ce4f519c0458c649f44f34~mv2.png" alt="User" width={32} height={32} className="rounded-full ring-2 ring-white/10" />
      </nav>

      {/* BANNER */}
      <div className="relative w-full pt-0 bg-black">
        <div className="w-full aspect-[4/3] relative">
          <img src="https://static.wixstatic.com/media/859174_394a43598162462980999d535f5ab55a~mv2.jpg" className="w-full h-full object-contain" alt="Banner" />
        </div>
        <div className="px-4 py-0 -mt-14 flex flex-col gap-3 relative z-20">
          <button onClick={() => openEpisode(currentIdx)} className="w-full bg-white text-black font-black py-4 rounded-md text-sm shadow-2xl uppercase tracking-widest active:scale-95 transition-transform">
            {currentIdx === 0 ? "▶ VER AHORA" : `▶ CONTINUAR EP. ${leaEpisodes[currentIdx].id}`}
          </button>
          <div className="flex gap-3">
            <button onClick={toggleMyList} className={`flex-1 py-3 rounded-md text-[10px] font-bold border transition-all ${inMyList ? 'bg-[#FF8A00] border-[#FF8A00]' : 'bg-white/10 border-white/5'}`}>
              {inMyList ? 'EN MI LISTA' : '+ MI LISTA'}
            </button>
            <button className="flex-1 bg-white/10 backdrop-blur-md py-3 rounded-md text-[10px] font-bold border border-white/5 uppercase">DONAR</button>
          </div>
        </div>
      </div>

      {/* LISTA DE EPISODIOS - TEXTO CORREGIDO */}
      <div className="px-4 mt-12 mb-20">
        <header className="flex items-center gap-3 mb-6 border-b border-white/10 pb-3">
          <div className="w-1 h-5 bg-[#FF8A00]"></div>
          <h2 className="text-xs font-black tracking-widest uppercase">Episodios Disponibles</h2>
        </header>
        
        <div className="grid grid-cols-2 gap-4">
          {leaEpisodes.map((ep, index) => (
            <div key={ep.id} className="flex flex-col gap-2" onClick={() => openEpisode(index)}>
              <div className={`relative aspect-video rounded-lg overflow-hidden border ${currentIdx === index ? 'border-[#FF8A00] ring-1 ring-[#FF8A00]' : 'border-white/5'}`}>
                <img src={ep.thumb} className="w-full h-full object-cover" />
                <span className="absolute bottom-1 right-1 bg-black/80 px-1.5 py-0.5 text-[8px] font-black rounded text-[#FF8A00] uppercase tracking-tighter tabular-nums">{ep.dur}</span>
              </div>
              <h3 className="font-bold text-[10px] truncate uppercase tracking-tighter">EP. {ep.id} — {ep.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* REPRODUCTOR MÓVIL RECONSTRUIDO DESDE CERO */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[2000] bg-black flex flex-col overflow-hidden animate-fade-in">
          
          {/* 1. BARRA SUPERIOR (HUD UP) */}
          <div className="h-[10vh] min-h-[65px] px-6 flex items-center justify-between bg-gradient-to-b from-black to-transparent">
             <div className="flex flex-col max-w-[75%] border-l-2 border-[#FF8A00] pl-3">
                <span className="text-[9px] font-black text-[#FF8A00] uppercase tracking-widest leading-none mb-1">Viendo ahora</span>
                <span className="text-[11px] font-bold uppercase truncate">Ep. {leaEpisodes[currentIdx].id} — {leaEpisodes[currentIdx].title}</span>
             </div>
             <button onClick={() => setSelectedVideo(null)} className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full active:bg-[#FF8A00] transition-colors">
               <IoClose size={24} />
             </button>
          </div>

          {/* 2. CONTENEDOR DE VIDEO (ZONA LIBRE) */}
          <div className="flex-grow flex items-center justify-center bg-[#050608] relative">
             <div className="w-full aspect-video bg-black relative">
               <iframe 
                 src={selectedVideo + "?autoplay=1"} 
                 className="absolute inset-0 w-full h-full border-none shadow-2xl" 
                 allow="autoplay; fullscreen"
                 allowFullScreen
               />
             </div>
          </div>

          {/* 3. BARRA INFERIOR (HUD DOWN) - DISEÑO PREMIUM */}
          <div className="h-[18vh] min-h-[120px] px-8 bg-gradient-to-t from-black to-transparent flex flex-col justify-center gap-6 pb-4">
             <div className="flex items-center justify-between w-full">
                
                {/* Anterior */}
                <button 
                  disabled={currentIdx === 0} 
                  onClick={() => openEpisode(currentIdx - 1)} 
                  className="flex flex-col items-center gap-2 active:scale-90 transition-transform disabled:opacity-5"
                >
                   <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5 shadow-lg">
                      <IoChevronBack size={24} className="text-[#FF8A00]" />
                   </div>
                   <span className="text-[9px] font-black uppercase tracking-widest opacity-60">Anterior</span>
                </button>

                {/* Lista (Central) */}
                <button onClick={() => setSelectedVideo(null)} className="flex flex-col items-center gap-2 active:scale-90 transition-transform">
                   <div className="w-14 h-14 rounded-2xl border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-md shadow-2xl">
                      <IoList size={26} className="text-white" />
                   </div>
                   <span className="text-[9px] font-black uppercase tracking-widest">Explorar</span>
                </button>

                {/* Siguiente */}
                <button 
                  disabled={currentIdx === leaEpisodes.length - 1} 
                  onClick={() => openEpisode(currentIdx + 1)} 
                  className="flex flex-col items-center gap-2 active:scale-90 transition-transform disabled:opacity-5"
                >
                   <div className="w-12 h-12 rounded-full border border-[#FF8A00]/30 flex items-center justify-center bg-[#FF8A00] text-black shadow-[0_0_20px_rgba(255,138,0,0.3)]">
                      <IoChevronForward size={24} />
                   </div>
                   <span className="text-[9px] font-black uppercase tracking-widest text-[#FF8A00]">Siguiente</span>
                </button>

             </div>
             
             {/* Indicador de Progreso Visual sutil */}
             <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#FF8A00] transition-all duration-700" 
                  style={{ width: `${((currentIdx + 1) / leaEpisodes.length) * 100}%` }}
                />
             </div>
          </div>
        </div>
      )}

      {/* MENU LATERAL */}
      <div className={`fixed inset-0 bg-black/98 z-[2100] transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
         <div className="flex flex-col h-full pt-20 px-10 gap-8">
            <button className="self-end text-4xl mb-4" onClick={() => setIsMenuOpen(false)}><IoCloseOutline /></button>
            {['Inicio', 'Series Bíblicas', 'Series TV', 'Películas'].map((n) => (
              <Link key={n} href="/" onClick={() => setIsMenuOpen(false)} className="text-2xl font-black uppercase tracking-tighter border-b border-white/5 pb-4">{n}</Link>
            ))}
         </div>
      </div>

      <Footer />
    </div>
  );
};

export default LeaMobile;
