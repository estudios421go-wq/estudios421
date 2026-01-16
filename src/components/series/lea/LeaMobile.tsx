import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoMenuOutline, IoCloseOutline, IoCheckmarkCircle, IoChevronBack, IoChevronForward, IoClose, IoList } from 'react-icons/io5';
import Footer from '../../Footer';

// Definición de episodios integrada correctamente
const leaEpisodes = [
  { id: 1, title: "Hermanas del destino", dur: "00:40:06", thumb: "https://static.wixstatic.com/media/859174_86a2172b057b4dbb8f9aad8c28163653~mv2.jpg", url: "https://ok.ru/videoembed/14199373957632" },
  { id: 2, title: "El voto sagrado", dur: "00:39:26", thumb: "https://static.wixstatic.com/media/859174_b2866dfb10364a52a6f6c4b1d0bd36b5~mv2.jpg", url: "https://ok.ru/videoembed/14199375071744" },
  { id: 3, title: "El engaño de Labán", dur: "00:41:00", thumb: "https://static.wixstatic.com/media/859174_d7cfc67255f04256a593c369119ed86c~mv2.jpg", url: "https://ok.ru/videoembed/14199375989248" },
  { id: 4, title: "La boda equivocada", dur: "00:41:22", thumb: "https://static.wixstatic.com/media/859174_7e9da0e84f384be2ae32c853dbdeedcc~mv2.jpg", url: "https://ok.ru/videoembed/14199376972288" },
  { id: 5, title: "Solo para Raquel", dur: "00:42:42", thumb: "https://static.wixstatic.com/media/859174_58e073319d26466a86e306f4691c9d96~mv2.jpg", url: "https://ok.ru/videoembed/14199377562112" },
  { id: 6, title: "Amor dividido", dur: "00:40:34", thumb: "https://static.wixstatic.com/media/859174_eb250911b0bb4614b9deeb1b78769c02~mv2.jpg", url: "https://ok.ru/videoembed/14199378283008" },
  { id: 7, title: "El dolor de la primogénita", dur: "00:42:16", thumb: "https://static.wixstatic.com/media/859174_7a07cdbacf0b4cf2a538a4a8058215e5~mv2.jpg", url: "https://ok.ru/videoembed/14199379134976" },
  { id: 8, title: "Bendecido para partir", dur: "00:40:14", thumb: "https://static.wixstatic.com/media/859174_192e07b145414120854d08fdfa103e40~mv2.jpg", url: "https://ok.ru/videoembed/14199380380160" },
  { id: 10, title: "Juicio en la familia", dur: "00:40:38", thumb: "https://static.wixstatic.com/media/859174_24d955c28833450eae4d86e9b842a109~mv2.jpg", url: "https://ok.ru/videoembed/14199398861312" }
];

const LeaMobile = () => {
  const router = useRouter();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [inMyList, setInMyList] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
    <div className="bg-black min-h-screen text-white font-sans selection:bg-[#FF8A00]">
      <Head><title>Lea — Estudios 421</title></Head>
      
      <nav className={`fixed top-0 w-full z-[100] px-4 py-3 flex items-center gap-4 transition-all duration-300 ${isScrolled ? 'bg-black shadow-lg' : 'bg-gradient-to-b from-black/90 to-transparent'}`}>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="text-white text-3xl z-[110]" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <IoCloseOutline /> : <IoMenuOutline />}</button>
          <Link href="/"><div className="relative w-[110px] h-[30px]"><Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" fill className="object-contain" priority /></div></Link>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="flex-grow relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><IoSearchOutline size={16} /></div>
          <input type="text" placeholder="Buscar..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-full py-1.5 pl-9 pr-4 text-xs text-white outline-none focus:border-[#FF8A00]" />
        </form>
      </nav>

      <div className={`fixed inset-0 bg-black/98 z-[90] transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full pt-24 px-8 gap-8">
            <p className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/10 pb-2">Navegación</p>
            {['Inicio', 'Series Bíblicas', 'Series TV', 'Películas'].map((n) => (
              <Link key={n} href="/" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white">{n}</Link>
            ))}
        </div>
      </div>

      <div className="relative w-full pt-0 bg-black">
        <div className="w-full aspect-[4/3] relative">
          <img src="https://static.wixstatic.com/media/859174_394a43598162462980999d535f5ab55a~mv2.jpg" className="w-full h-full object-contain" alt="Banner" />
        </div>
        <div className="px-4 py-0 -mt-14 flex flex-col gap-3 relative z-20">
          <button onClick={() => openEpisode(currentIdx)} className="w-full bg-white text-black font-black py-4 rounded-md text-sm shadow-2xl uppercase tracking-widest">
            {currentIdx === 0 ? "▶ VER AHORA" : `▶ CONTINUAR EP. ${leaEpisodes[currentIdx].id}`}
          </button>
          <div className="flex gap-3">
            <button onClick={toggleMyList} className={`flex-1 py-3 rounded-md text-[10px] font-bold border transition-all ${inMyList ? 'bg-[#FF8A00] border-[#FF8A00]' : 'bg-white/10 border-white/5'}`}>
              MI LISTA
            </button>
            <button className="flex-1 bg-white/10 backdrop-blur-md py-3 rounded-md text-[10px] font-bold border border-white/5 uppercase tracking-widest">DONAR</button>
          </div>
        </div>
      </div>

      <div className="px-4 mt-10 mb-20">
        <h2 className="text-xs font-bold mb-4 text-gray-500 tracking-widest uppercase border-b border-white/10 pb-2">Capítulos Disponibles</h2>
        <div className="grid grid-cols-2 gap-4">
          {leaEpisodes.map((ep, index) => (
            <div key={ep.id} className="flex flex-col gap-2" onClick={() => openEpisode(index)}>
              <div className={`relative aspect-video rounded-lg overflow-hidden border ${currentIdx === index ? 'border-[#FF8A00]' : 'border-white/5'}`}>
                <img src={ep.thumb} className="w-full h-full object-cover" />
                <span className="absolute bottom-1 right-1 bg-black/80 px-1.5 py-0.5 text-[8px] font-black rounded text-[#FF8A00] uppercase">{ep.dur}</span>
              </div>
              <h3 className="font-bold text-[11px] truncate uppercase">EP. {ep.id} {ep.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 z-[2000] bg-black flex flex-col">
          <div className="h-[10vh] px-4 flex items-center justify-between border-b border-white/5 bg-black">
             <span className="text-xs font-bold uppercase truncate">Ep. {leaEpisodes[currentIdx].id} — {leaEpisodes[currentIdx].title}</span>
             <button onClick={() => setSelectedVideo(null)} className="p-2"><IoClose size={24} /></button>
          </div>
          <div className="flex-grow flex items-center justify-center bg-black relative">
             <iframe 
               src={selectedVideo + "?autoplay=1"} 
               className="absolute inset-0 w-full h-full border-none" 
               allow="autoplay; fullscreen" 
               allowFullScreen
             />
          </div>
          <div className="h-[15vh] px-6 flex items-center justify-between border-t border-white/5 pb-6 bg-black">
             <button disabled={currentIdx === 0} onClick={() => openEpisode(currentIdx - 1)} className="flex flex-col items-center disabled:opacity-10">
                <IoChevronBack size={30} className="text-[#FF8A00]" />
                <span className="text-[9px] font-black uppercase">Anterior</span>
             </button>
             <button disabled={currentIdx === leaEpisodes.length - 1} onClick={() => openEpisode(currentIdx + 1)} className="flex flex-col items-center disabled:opacity-10">
                <IoChevronForward size={30} className="text-[#FF8A00]" />
                <span className="text-[9px] font-black uppercase">Siguiente</span>
             </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default LeaMobile;
