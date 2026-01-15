import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoChevronBack, IoChevronForward, IoList, IoClose, IoCheckmarkCircle } from 'react-icons/io5';
import Footer from '../../Footer';

// ... (leaEpisodes se mantienen igual)

const LeaPC = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [inMyList, setInMyList] = useState(false);
  const [donated, setDonated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const episodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    const savedEp = localStorage.getItem('lea_last_ep');
    if (savedEp) setCurrentIdx(parseInt(savedEp));
    const myList = JSON.parse(localStorage.getItem('myList') || '[]');
    if (myList.includes('lea')) setInMyList(true);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openEpisode = (idx: number) => {
    setCurrentIdx(idx);
    setSelectedVideo(leaEpisodes[idx].url);
    localStorage.setItem('lea_last_ep', idx.toString());
  };

  const closePlayer = () => {
    setSelectedVideo(null);
    setTimeout(() => {
      episodeRefs.current[currentIdx]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const toggleMyList = () => {
    let list = JSON.parse(localStorage.getItem('myList') || '[]');
    if (inMyList) { list = list.filter((i: string) => i !== 'lea'); setInMyList(false); }
    else { list.push('lea'); setInMyList(true); }
    localStorage.setItem('myList', JSON.stringify(list));
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-[#FF8A00] overflow-x-hidden">
      <Head><title>Lea — Estudios 421</title></Head>

      {/* NAVBAR (SIN CAMBIOS) */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 px-8 py-4 flex items-center justify-between ${isScrolled ? 'bg-black shadow-lg' : 'bg-gradient-to-b from-black via-black/60 to-transparent'}`}>
        <div className="flex items-center gap-10">
          <Link href="/"><div className="relative w-[160px] h-[45px] cursor-pointer"><Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" fill className="object-contain" priority /></div></Link>
          <div className="flex gap-8">
            {['Inicio', 'Series Bíblicas', 'Series TV', 'Películas'].map((name) => (
              <Link key={name} href={name === 'Inicio' ? '/' : `/${name.toLowerCase().replace(' ', '-')}`} className="relative group text-white text-[15px] font-medium tracking-wide">
                {name}
                <span className={`absolute -bottom-1 left-0 h-[3px] bg-[#FF8A00] transition-all duration-500 ${router.pathname === (name === 'Inicio' ? '/' : `/${name.toLowerCase().replace(' ', '-')}`) ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex gap-4 mr-4">
            {['', 'en', 'pt'].map((l) => (
              <Link key={l} href={l === '' ? '/serie/lea' : `/${l}/serie/lea`}>
                <img src={`https://static.wixstatic.com/media/859174_${l === '' ? '367960b11c1c44ba89cd1582fd1b5776' : l === 'en' ? '35112d9ffe234d6f9dcef16cf8f7544e' : '830f1c20656e4d44a819bedfc13a22cc'}~mv2.png`} className="w-7 h-7 object-contain cursor-pointer hover:scale-110 transition-transform" />
              </Link>
            ))}
          </div>
          <div className="flex items-center bg-white/10 rounded-full px-4 py-1 border border-white/5 focus-within:border-[#FF8A00]">
            <IoSearchOutline className="text-white text-xl" />
            <input type="text" placeholder="Buscar..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent border-none outline-none text-white text-sm ml-2 w-32 placeholder:text-gray-400" />
          </div>
          <Image src="https://static.wixstatic.com/media/859174_26ca840644ce4f519c0458c649f44f34~mv2.png" alt="User" width={30} height={30} className="rounded-full ring-1 ring-white/20 hover:ring-[#FF8A00] cursor-pointer" />
        </div>
      </nav>

      {/* BANNER (SIN CAMBIOS) */}
      <div className="relative w-full h-[88vh]">
        <img src="https://static.wixstatic.com/media/859174_394a43598162462980999d535f5ab55a~mv2.jpg" className="w-full h-full object-cover" alt="Banner" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/10 opacity-70" />
        <div className="absolute bottom-[-30px] left-16 flex gap-6 z-20 items-center">
          <button onClick={() => openEpisode(currentIdx)} className="bg-white text-black font-black py-4 px-12 rounded-sm text-lg hover:bg-[#FF8A00] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-2xl uppercase">
            {currentIdx === 0 ? "▶ Ver Ahora" : `▶ Continuar Ep. ${leaEpisodes[currentIdx].id}`}
          </button>
          <button onClick={toggleMyList} className={`border py-4 px-10 rounded-sm transition-all uppercase font-bold ${inMyList ? 'bg-[#FF8A00] border-[#FF8A00] text-white' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}>
            {inMyList ? <><IoCheckmarkCircle className="inline mr-2" /> En Mi Lista</> : '+ Mi Lista'}
          </button>
          <button onClick={() => { setDonated(true); window.open('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS', '_blank'); }} className={`border py-4 px-10 rounded-sm transition-all uppercase font-bold ${donated ? 'bg-green-600 border-green-500 text-white' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}>❤ Donar</button>
        </div>
      </div>

      <div className="h-20 bg-black"></div>

      {/* EPISODIOS: RETORNO AL DISEÑO ORIGINAL CON MEJORA SUTIL */}
      <div className="px-16 mb-32 relative z-10">
        <header className="flex items-center gap-4 mb-10 border-b border-white/10 pb-4">
          <div className="w-1.5 h-8 bg-[#FF8A00]"></div>
          <h2 className="text-2xl font-bold tracking-tight uppercase">Episodios Disponibles</h2>
        </header>

        <div className="grid grid-cols-4 gap-8">
          {leaEpisodes.map((ep, index) => (
            <div 
              key={ep.id} 
              ref={(el) => { episodeRefs.current[index] = el; }} 
              className={`group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 bg-[#2C2F33] border-2 ${currentIdx === index ? 'border-[#FF8A00] ring-4 ring-[#FF8A00]/20' : 'border-transparent hover:border-white/20 hover:shadow-2xl'}`} 
              onClick={() => openEpisode(index)}
            >
              <div className="relative aspect-video overflow-hidden">
                <img src={ep.thumb} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C2F33] via-transparent to-transparent opacity-60" />
                <span className="absolute bottom-2 left-2 bg-black/80 px-2 py-0.5 text-[10px] font-black rounded border border-white/10 uppercase tracking-widest text-[#FF8A00]">Episodio {ep.id}</span>
                <span className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 text-[10px] font-bold rounded border border-white/10">{ep.dur}</span>
              </div>
              <div className="p-5 flex flex-col gap-1">
                <h3 className="font-bold text-base truncate tracking-tight uppercase transition-colors group-hover:text-[#FF8A00]">{ep.title}</h3>
                <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed h-8">{ep.desc}</p>
                <div className="mt-4 flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${currentIdx === index ? 'bg-[#FF8A00] animate-pulse' : 'bg-gray-600'}`}></div>
                  <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Disponible ahora</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* REPRODUCTOR (MANTENIENDO EL ÉXITO DE BARRAS INDEPENDIENTES) */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[1000] bg-[#050608] flex flex-col animate-fade-in overflow-hidden">
          <div className="h-[12vh] min-h-[85px] px-12 flex items-center justify-between bg-gradient-to-b from-[#0a0b0d] to-[#050608] border-b border-white/5 relative shadow-2xl">
            <div className="flex items-center gap-8">
              <div className="flex flex-col border-l-4 border-[#FF8A00] pl-6 py-1">
                <span className="text-[10px] font-black text-[#FF8A00]/80 uppercase tracking-[0.5em] mb-1">Serie: Lea</span>
                <h2 className="text-2xl font-black tracking-tighter uppercase leading-none">
                  Capítulo {leaEpisodes[currentIdx].id} <span className="text-white/10 mx-3">/</span> <span className="text-white/90">{leaEpisodes[currentIdx].title}</span>
                </h2>
              </div>
            </div>
            <button onClick={closePlayer} className="group flex items-center gap-4 bg-white/[0.03] px-8 py-3.5 rounded-full border border-white/10 hover:bg-[#FF8A00] hover:border-[#FF8A00] hover:scale-105 transition-all duration-500">
              <span className="text-[11px] font-black uppercase tracking-[0.2em] group-hover:text-black">Salir del video</span>
              <div className="w-px h-4 bg-white/20 group-hover:bg-black/20" />
              <IoClose className="text-2xl group-hover:rotate-90 group-hover:text-black transition-all" />
            </button>
          </div>

          <div className="flex-grow bg-black relative">
            <iframe src={selectedVideo + "?autoplay=1"} className="absolute inset-0 w-full h-full border-none" allow="autoplay; fullscreen" />
          </div>

          <div className="h-[13vh] min-h-[100px] px-16 bg-gradient-to-t from-[#0a0b0d] to-[#050608] border-t border-white/5 flex items-center justify-between shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
            <button disabled={currentIdx === 0} onClick={() => openEpisode(currentIdx - 1)} className="group flex items-center gap-5 disabled:opacity-5 disabled:pointer-events-none transition-all duration-500">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] group-hover:bg-white group-hover:text-black group-hover:scale-110 shadow-xl transition-all">
                <IoChevronBack className="text-xl" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FF8A00]/60">Anterior</span>
                <span className="text-sm font-bold uppercase text-white/80 group-hover:text-white">Episodio {currentIdx}</span>
              </div>
            </button>
            <button onClick={closePlayer} className="flex items-center gap-4 bg-white/[0.03] px-10 py-4 rounded-2xl border border-white/5 hover:bg-white/[0.08] hover:border-white/20 transition-all group scale-95 hover:scale-100">
              <IoList className="text-2xl text-[#FF8A00]" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-white/60 group-hover:text-white">Lista de Capítulos</span>
            </button>
            <button disabled={currentIdx === leaEpisodes.length - 1} onClick={() => openEpisode(currentIdx + 1)} className="group flex items-center gap-6 disabled:opacity-5 disabled:pointer-events-none transition-all duration-500">
              <div className="flex flex-col items-end text-right">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FF8A00]">Siguiente</span>
                <span className="text-sm font-bold uppercase text-white/80 group-hover:text-white">Episodio {currentIdx + 2}</span>
              </div>
              <div className="w-16 h-16 rounded-[22px] bg-[#FF8A00] flex items-center justify-center text-black shadow-[0_15px_35px_rgba(255,138,0,0.2)] group-hover:scale-110 transition-all">
                <IoChevronForward className="text-4xl" />
              </div>
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default LeaPC;
