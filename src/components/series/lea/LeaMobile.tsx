import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoMenuOutline, IoCloseOutline, IoChevronBack, IoChevronForward, IoList, IoClose, IoCheckmarkCircle } from 'react-icons/io5';
import Footer from '../../Footer';

const LeaMobile = () => {
  const router = useRouter();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inMyList, setInMyList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  useEffect(() => {
    const handleScroll = () => {
      if (!selectedVideo) setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    const saved = localStorage.getItem('lea_last_ep');
    if (saved) setCurrentIdx(parseInt(saved));
    const list = JSON.parse(localStorage.getItem('myList') || '[]');
    if (list.includes('lea')) setInMyList(true);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedVideo]);

  const openEpisode = (idx: number) => {
    setSelectedVideo(leaEpisodes[idx].url);
    setCurrentIdx(idx);
    localStorage.setItem('lea_last_ep', idx.toString());
    window.scrollTo(0, 0);
  };

  const toggleMyList = () => {
    let list = JSON.parse(localStorage.getItem('myList') || '[]');
    if (inMyList) {
      list = list.filter((id: string) => id !== 'lea');
      setInMyList(false);
    } else {
      list.push('lea');
      setInMyList(true);
    }
    localStorage.setItem('myList', JSON.stringify(list));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.toLowerCase().trim();
    if (q === "lea") router.push('/serie/lea');
    else if (q === "genesis") router.push('/serie/genesis');
  };

  if (selectedVideo) {
    return (
      <div className="fixed inset-0 bg-black w-full h-full flex flex-col z-[9999]">
        <div className="h-[10vh] min-h-[60px] px-6 flex items-center justify-between border-b border-white/5 bg-black">
          <div className="flex flex-col max-w-[70%] border-l-2 border-[#F09800] pl-3">
            <span className="text-[8px] font-black text-[#F09800] uppercase tracking-widest">Estudios 421</span>
            <span className="text-xs font-bold uppercase truncate">Ep. {leaEpisodes[currentIdx].id} — {leaEpisodes[currentIdx].title}</span>
          </div>
          <button onClick={() => setSelectedVideo(null)} className="text-4xl p-2">&times;</button>
        </div>
        
        <div className="flex-1 flex items-center justify-center bg-black overflow-hidden">
          <iframe 
            src={selectedVideo + "?autoplay=1"} 
            className="w-full h-full border-none" 
            allow="autoplay; fullscreen" 
            allowFullScreen 
          />
        </div>
        
        <div className="h-[15vh] min-h-[100px] px-8 bg-black border-t border-white/5 flex items-center justify-between pb-8">
          <button disabled={currentIdx === 0} onClick={() => openEpisode(currentIdx - 1)} className="flex flex-col items-center gap-1 active:scale-90 transition-transform disabled:opacity-5">
            <IoChevronBack size={26} className="text-[#F09800]" /><span className="text-[9px] font-black uppercase tracking-widest text-gray-500">Anterior</span>
          </button>
          <button onClick={() => setSelectedVideo(null)} className="flex flex-col items-center gap-1 active:scale-90 transition-transform">
            <div className="p-3 bg-white/10 rounded-xl border border-white/10"><IoList size={22} /></div>
            <span className="text-[8px] font-black uppercase tracking-widest mt-1">Episodios</span>
          </button>
          <button disabled={currentIdx === leaEpisodes.length - 1} onClick={() => openEpisode(currentIdx + 1)} className="flex flex-col items-center gap-1 active:scale-90 transition-transform disabled:opacity-5">
            <IoChevronForward size={26} className="text-[#F09800]" /><span className="text-[9px] font-black uppercase tracking-widest text-[#F09800]">Siguiente</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-[#F09800] overflow-x-hidden">
      <Head><title>Lea — Estudios 421</title></Head>
      
      <nav className={`fixed top-0 w-full z-[100] px-4 py-3 flex items-center gap-4 transition-all duration-300 ${isScrolled ? 'bg-black shadow-lg' : 'bg-gradient-to-b from-black/90 to-transparent'}`}>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="text-white text-3xl z-[110]" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <IoCloseOutline /> : <IoMenuOutline />}</button>
          <Link href="/"><div className="relative w-[110px] h-[30px] cursor-pointer"><Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" fill className="object-contain" priority /></div></Link>
        </div>
        <form onSubmit={handleSearch} className="flex-grow relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><IoSearchOutline size={16} /></div>
          <input type="text" placeholder="Buscar..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-full py-1.5 pl-9 pr-4 text-xs text-white outline-none focus:bg-white/20 focus:border-[#F09800] transition-all" />
        </form>
        <div className="flex-shrink-0"><Image src="https://static.wixstatic.com/media/859174_26ca840644ce4f519c0458c649f44f34~mv2.png" alt="User" width={32} height={32} className="rounded-full ring-2 ring-white/10" /></div>
      </nav>

      <div className={`fixed inset-0 bg-black/98 z-[90] transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full pt-24 px-8 gap-8 text-left">
          <p className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/10 pb-2">Navegación</p>
          {[{ n: 'Inicio', h: '/' }, { n: 'Series Bíblicas', h: '/series-biblicas' }, { n: 'Series TV', h: '/series-tv' }, { n: 'Películas', h: '/peliculas' }].map((link) => (
            <Link key={link.n} href={link.h} onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white">{link.n}</Link>
          ))}
          <p className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/10 pb-2 mt-4">Idioma</p>
          <div className="flex gap-6">
            {[{ l: 'ESP', r: '/serie/lea', i: '367960b11c1c44ba89cd1582fd1b5776' }, { l: 'ENG', r: '/en/serie/lea', i: '35112d9ffe234d6f9dcef16cf8f7544e' }, { l: 'PT', r: '/pt/serie/lea', i: '830f1c20656e4d44a819bedfc13a22cc' }].map((lang) => (
              <button key={lang.l} onClick={() => { setIsMenuOpen(false); router.push(lang.r); }} className="flex flex-col items-center gap-2 active:scale-95 transition-transform">
                <img src={`https://static.wixstatic.com/media/859174_${lang.i}~mv2.png`} alt={lang.l} className="w-10 h-10 object-contain" /><span className="text-[10px] text-white font-bold">{lang.l}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative w-full bg-black">
        <div className="w-full aspect-[4/3] relative pointer-events-none">
          <img src="https://static.wixstatic.com/media/859174_394a43598162462980999d535f5ab55a~mv2.jpg" className="w-full h-full object-contain" alt="Banner" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50" />
        </div>
        <div className="px-4 -mt-14 flex flex-col gap-3 relative z-20">
          <button onClick={() => openEpisode(currentIdx)} className="w-full bg-white text-black font-bold py-3.5 rounded-md text-sm active:scale-95 transition-transform uppercase tracking-widest shadow-2xl">
            {currentIdx === 0 ? "▶ VER AHORA" : `▶ CONTINUAR EP. ${leaEpisodes[currentIdx].id}`}
          </button>
          <div className="flex gap-3">
            <button onClick={toggleMyList} className={`flex-1 py-3 rounded-md text-[10px] font-bold border transition-all ${inMyList ? 'bg-[#F09800] border-[#F09800]' : 'bg-white/10 border-white/5'}`}>
              {inMyList ? <><IoCheckmarkCircle className="inline mr-1" /> EN MI LISTA</> : '+ MI LISTA'}
            </button>
            <button onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS', '_blank')} className="flex-1 bg-white/10 backdrop-blur-md py-3 rounded-md text-[10px] font-bold border border-white/5 active:bg-white/20 uppercase tracking-widest">❤ DONAR</button>
          </div>
        </div>
      </div>

      <div className="px-4 mt-10 mb-20 text-left">
        <h2 className="text-xs font-bold mb-4 text-gray-500 tracking-widest uppercase border-b border-white/10 pb-2">Episodios Disponibles</h2>
        <div className="grid grid-cols-2 gap-4">
          {leaEpisodes.map((ep, index) => (
            <div key={ep.id} className="flex flex-col gap-2 active:opacity-70 transition-opacity" onClick={() => openEpisode(index)}>
              <div className={`relative aspect-video rounded-md overflow-hidden border ${currentIdx === index ? 'border-[#F09800]' : 'border-white/5'} shadow-lg`}>
                <img src={ep.thumb} className="w-full h-full object-cover" loading="lazy" />
                <span className="absolute bottom-1 right-1 bg-black text-white px-2 py-0.5 text-[8px] font-black rounded uppercase">{ep.dur}</span>
              </div>
              <h3 className="font-bold text-[10px] truncate uppercase tracking-tighter">EP. {ep.id} {ep.title}</h3>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LeaMobile;
