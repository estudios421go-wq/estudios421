import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoMenuOutline, IoCloseOutline, IoChevronBack, IoChevronForward, IoList, IoCheckmarkCircle } from 'react-icons/io5';
import Footer from '../../Footer';

const Navbar = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.toLowerCase().trim() === "lea") router.push('/serie/lea');
    if (searchQuery.toLowerCase().trim() === "genesis") router.push('/serie/genesis');
  };

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Series Bíblicas', href: '/series-biblicas' },
    { name: 'Series TV', href: '/series-tv' },
    { name: 'Películas', href: '/peliculas' },
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full z-[100] px-4 py-3 flex items-center gap-4 transition-all duration-300 ${isScrolled ? 'bg-black shadow-lg' : 'bg-gradient-to-b from-black/90 to-transparent'}`}>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="text-white text-3xl z-[110]" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <IoCloseOutline /> : <IoMenuOutline />}</button>
          <Link href="/"><div className="relative w-[110px] h-[30px]"><Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" fill className="object-contain" priority /></div></Link>
        </div>
        <form onSubmit={handleSearch} className="flex-grow relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><IoSearchOutline size={16} /></div>
          <input 
            type="text" 
            placeholder="Buscar..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-full py-1.5 pl-9 pr-4 text-xs text-white outline-none focus:bg-white/20 focus:border-[#F09800] transition-all" 
          />
        </form>
        <div className="flex-shrink-0"><Image src="https://static.wixstatic.com/media/859174_26ca840644ce4f519c0458c649f44f34~mv2.png" alt="User" width={32} height={32} className="rounded-full ring-2 ring-white/10" /></div>
      </nav>

      {/* Menú Lateral con Idiomas */}
      <div className={`fixed inset-0 bg-black/98 z-[90] transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full pt-24 px-8 gap-8">
          <div className="flex flex-col gap-6">
            <p className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/10 pb-2">Navegación</p>
            {navLinks.map((link) => (<Link key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className={`text-xl font-bold ${router.pathname === link.href ? 'text-[#F09800]' : 'text-white'}`}>{link.name}</Link>))}
          </div>
          <div className="flex flex-col gap-6 mt-4">
            <p className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/10 pb-2">Idioma</p>
            <div className="flex gap-6">
              {[
                { name: 'ESP', img: "367960b11c1c44ba89cd1582fd1b5776", path: '/serie/lea' },
                { name: 'ENG', img: "35112d9ffe234d6f9dcef16cf8f7544e", path: '/en/serie/lea' },
                { name: 'PT', img: "830f1c20656e4d44a819bedfc13a22cc", path: '/pt/serie/lea' }
              ].map((lang) => (
                <button key={lang.name} onClick={() => router.push(lang.path)} className="flex flex-col items-center gap-2 active:scale-95 transition-transform">
                  <img src={`https://static.wixstatic.com/media/859174_${lang.img}~mv2.png`} alt={lang.name} className="w-10 h-10 object-contain" />
                  <span className="text-[10px] text-white font-bold">{lang.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

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
  const [inMyList, setInMyList] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('lea_last_ep');
    if (saved) setCurrentIdx(parseInt(saved));
    const myList = JSON.parse(localStorage.getItem('myList') || '[]');
    if (myList.includes('lea')) setInMyList(true);
  }, []);

  const openEpisode = (idx: number) => { 
    setSelectedVideo(leaEpisodes[idx].url); 
    setCurrentIdx(idx); 
    localStorage.setItem('lea_last_ep', idx.toString());
  };

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

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-[#F09800]">
      <Head><title>Lea — Móvil</title></Head>
      <Navbar />
      
      {/* Banner Principal con Proporción Corregida */}
      <div className="relative w-full pt-0 bg-black overflow-hidden">
        <div className="w-full aspect-[4/3] relative pointer-events-none select-none">
          <img src="https://static.wixstatic.com/media/859174_394a43598162462980999d535f5ab55a~mv2.jpg" className="w-full h-full object-cover" alt="Banner" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>
        
        <div className="px-4 py-0 -mt-16 flex flex-col gap-3 relative z-20">
          <button onClick={() => openEpisode(currentIdx)} className="w-full bg-white text-black font-black py-4 rounded-md text-sm active:scale-95 transition-transform uppercase tracking-widest shadow-2xl">
            {currentIdx === 0 ? "▶ VER AHORA" : `▶ CONTINUAR EP. ${leaEpisodes[currentIdx].id}`}
          </button>
          
          <div className="flex gap-3">
            <button 
              onClick={toggleMyList}
              className={`flex-1 flex justify-center items-center gap-2 backdrop-blur-md py-3 rounded-md text-[10px] font-black border active:bg-white/20 uppercase tracking-widest transition-all ${inMyList ? 'bg-[#F09800] border-[#F09800]' : 'bg-white/10 border-white/5'}`}
            >
              {inMyList ? <><IoCheckmarkCircle className="text-sm" /> EN MI LISTA</> : '+ MI LISTA'}
            </button>
            <button 
              onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS', '_blank')} 
              className="flex-1 bg-white/10 backdrop-blur-md py-3 rounded-md text-[10px] font-black border border-white/5 active:bg-white/20 uppercase tracking-widest"
            >
              ❤ DONAR
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 mt-12 mb-20">
        <h2 className="text-xs font-black mb-6 text-gray-500 tracking-[0.2em] uppercase border-b border-white/10 pb-2">Episodios Disponibles</h2>
        <div className="grid grid-cols-2 gap-4">
          {leaEpisodes.map((ep, index) => (
            <div key={ep.id} className="flex flex-col gap-2 active:opacity-50 transition-opacity" onClick={() => openEpisode(index)}>
              <div className={`relative aspect-video rounded-md overflow-hidden border-2 ${currentIdx === index ? 'border-[#F09800]' : 'border-white/5'} shadow-lg pointer-events-none`}>
                <img src={ep.thumb} className="w-full h-full object-cover" loading="lazy" />
                <span className="absolute bottom-1 right-1 bg-black/90 px-1.5 py-0.5 text-[7px] font-black rounded uppercase text-[#F09800]">{ep.dur}</span>
              </div>
              <h3 className="font-bold text-[10px] truncate uppercase tracking-tighter">EP. {ep.id} {ep.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* REPRODUCTOR MÓVIL */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[2000] bg-black flex flex-col animate-fade-in">
          <div className="p-4 flex justify-between items-center bg-black/80 backdrop-blur-md border-b border-white/5">
            <div className="flex flex-col">
                <span className="text-[7px] font-black text-[#F09800] uppercase tracking-widest">Estás viendo</span>
                <span className="text-[10px] font-bold text-white uppercase truncate">Lea — Cap. {leaEpisodes[currentIdx].id}</span>
            </div>
            <button onClick={() => setSelectedVideo(null)} className="text-3xl font-light text-white active:scale-75 transition-transform">&times;</button>
          </div>
          <div className="flex-grow flex flex-col relative bg-[#050608]">
            <iframe src={selectedVideo + "?autoplay=1"} className="w-full h-full border-none" allow="autoplay; fullscreen" />
            <div className="absolute inset-x-0 bottom-8 flex justify-around px-4">
              <button disabled={currentIdx === 0} onClick={() => openEpisode(currentIdx - 1)} className="bg-black/80 text-white text-[9px] py-3.5 px-6 rounded-full border border-white/10 active:bg-[#F09800] uppercase font-black tracking-widest transition-colors disabled:opacity-20">Anterior</button>
              <button onClick={() => setSelectedVideo(null)} className="bg-black/80 text-white text-[9px] py-3.5 px-6 rounded-full border border-white/10 active:bg-white active:text-black uppercase font-black tracking-widest transition-colors">Cerrar</button>
              <button disabled={currentIdx === leaEpisodes.length - 1} onClick={() => openEpisode(currentIdx + 1)} className="bg-black/80 text-white text-[9px] py-3.5 px-6 rounded-full border border-white/10 active:bg-[#F09800] uppercase font-black tracking-widest transition-colors disabled:opacity-20">Siguiente</button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};
export default LeaMobile;
