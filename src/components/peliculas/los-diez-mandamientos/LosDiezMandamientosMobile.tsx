import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoMenuOutline, IoCloseOutline, IoPlay, IoClose, IoCheckmarkCircle } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { allSeries } from '../../../data/series';

// --- CONFIGURACIÓN DE LA PELÍCULA (ID: 62) ---
const MOVIE_DATA = {
  id: 62,
  title: "Los Diez Mandamientos",
  titleEn: "The Ten Commandments",
  titlePt: "Os Dez Mandamentos",
  url: "https://drive.google.com/file/d/13KsbOf9nDP_-PGMdZxxvnnypnqhzUAfU/preview",
  banner: "https://static.wixstatic.com/media/859174_7dd9b11efd3142c2a207096aabbc2f7b~mv2.jpg"
};

const LosDiezMandamientosMobile = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [inMyList, setInMyList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [randomMovies, setRandomMovies] = useState<any[]>([]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    
    const list = JSON.parse(localStorage.getItem('myList') || '[]');
    if (list.includes(MOVIE_DATA.id)) setInMyList(true);

    const moviesOnly = allSeries.filter(s => s.category === 'Película' && s.id !== MOVIE_DATA.id);
    const shuffled = [...moviesOnly].sort(() => 0.5 - Math.random());
    setRandomMovies(shuffled.slice(0, 3));

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- BUSCADOR 100% ---
  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      const normalize = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      const term = normalize(searchQuery);
      const themeMap: { [key: string]: string[] } = {
        moises: ['moises', 'diez mandamientos', 'egipto', 'exodo'],
        jesus: ['jesus', 'milagros', 'pasion', 'nazaret', 'cristo'],
        reyes: ['reyes', 'david', 'saul', 'salomon', 'casa de david'],
        biblia: ['biblia', 'apocalipsis', 'evangelio']
      };
      const relatedTerms = new Set<string>();
      relatedTerms.add(term);
      Object.entries(themeMap).forEach(([key, values]) => {
        if (term.includes(key) || key.includes(term)) values.forEach(v => relatedTerms.add(v));
      });
      const filtered = allSeries.filter(serie => {
        const titleNormalized = normalize(serie.title);
        const categoryNormalized = normalize(serie.category || "");
        return Array.from(relatedTerms).some(t => titleNormalized.includes(t)) || categoryNormalized.includes(term);
      });
      setSearchResults(filtered);
    } else { setSearchResults([]); }
  }, [searchQuery]);

  const toggleMyList = () => {
    let list = JSON.parse(localStorage.getItem('myList') || '[]');
    if (inMyList) { 
      list = list.filter((id: any) => id !== MOVIE_DATA.id); 
      setInMyList(false); 
    } else { 
      list.push(MOVIE_DATA.id); 
      setInMyList(true); 
    }
    localStorage.setItem('myList', JSON.stringify(list));
  };

  if (showPlayer) {
    return (
      <div className="fixed inset-0 z-[2000] bg-black flex flex-col overflow-hidden text-left">
        <div className="px-6 h-[80px] flex items-center justify-between bg-black border-b border-white/5">
          <div className="flex flex-col border-l-4 border-[#FF8A00] pl-4">
            <span className="text-[10px] font-black text-[#FF8A00] uppercase tracking-widest">REPRODUCIENDO</span>
            <h2 className="text-sm font-black uppercase truncate max-w-[200px]">{MOVIE_DATA.title}</h2>
          </div>
          <button onClick={() => setShowPlayer(false)} className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full border border-white/10">
            <IoClose className="text-2xl" />
          </button>
        </div>
        <div className="flex-grow flex flex-col items-center justify-center bg-black relative">
          <iframe src={MOVIE_DATA.url} className="w-full aspect-video border-none" allow="autoplay; fullscreen" allowFullScreen />
          <div className="mt-8 px-10 text-center">
            <p className="text-[#FF8A00] font-black text-[11px] uppercase tracking-tighter animate-pulse">Toca el video para activar pantalla completa</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white font-sans text-left overflow-x-hidden">
      <Head><title>{MOVIE_DATA.title} — Estudios 421</title></Head>
      
      <nav className={`fixed top-0 w-full z-[110] px-4 py-3 flex items-center gap-4 transition-all duration-300 ${isScrolled || isMenuOpen || searchQuery.length > 0 ? 'bg-black shadow-lg' : 'bg-gradient-to-b from-black/90 to-transparent'}`}>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="text-white text-3xl active:scale-90 transition-transform" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <IoCloseOutline /> : <IoMenuOutline />}
          </button>
          <Link href="/"><div className="relative w-[110px] h-[30px]"><Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" fill className="object-contain" priority /></div></Link>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="flex-grow relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><IoSearchOutline size={16} /></div>
          <input type="text" placeholder="Buscar..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-full py-1.5 pl-9 pr-4 text-xs text-white outline-none focus:border-[#FF8A00]" />
        </form>
        <Image src="https://static.wixstatic.com/media/859174_26ca840644ce4f519c0458c649f44f34~mv2.png" alt="User" width={32} height={32} className="rounded-full ring-2 ring-white/10" />
      </nav>

      {searchQuery.length > 0 && (
        <div className="fixed inset-0 bg-black z-[105] pt-24 px-4 overflow-y-auto pb-20 text-left">
          <h2 className="text-white text-sm font-black mb-6 uppercase tracking-widest flex items-center gap-2"><span className="w-1 h-4 bg-[#FF8A00]" />RESULTADOS: "{searchQuery}"</h2>
          <div className="grid grid-cols-2 gap-4">
            {searchResults.map((m) => (
              <Link key={m.id} href={m.path} onClick={() => setSearchQuery("")}><div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-2xl"><Image src={m.banner} alt={m.title} fill className="object-cover" unoptimized /></div></Link>
            ))}
          </div>
        </div>
      )}

      <div className={`fixed inset-0 bg-black/98 z-[100] transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full pt-24 px-8 gap-8 text-left">
          <p className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/10 pb-2">NAVEGACIÓN</p>
          <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold">Inicio</Link>
          <Link href="/series-biblicas" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold">Series Bíblicas</Link>
          <Link href="/series-tv" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold">Series TV</Link>
          <Link href="/peliculas" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold">Películas</Link>
          <p className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/10 pb-2 mt-4">IDIOMA</p>
          <div className="flex gap-6">
            <Link href="/pelicula/los-diez-mandamientos" className="flex flex-col items-center gap-2"><img src="https://static.wixstatic.com/media/859174_367960b11c1c44ba89cd1582fd1b5776~mv2.png" className="w-10 h-10 object-contain" /><span className="text-[10px] font-bold">ESP</span></Link>
            <Link href="/en/movie/the-ten-commandments" className="flex flex-col items-center gap-2"><img src="https://static.wixstatic.com/media/859174_35112d9ffe234d6f9dcef16cf8f7544e~mv2.png" className="w-10 h-10 object-contain" /><span className="text-[10px] font-bold">ENG</span></Link>
            <Link href="/pt/filme/os-dez-mandamentos" className="flex flex-col items-center gap-2"><img src="https://static.wixstatic.com/media/859174_830f1c20656e4d44a819bedfc13a22cc~mv2.png" className="w-10 h-10 object-contain" /><span className="text-[10px] font-bold">PT</span></Link>
          </div>
        </div>
      </div>

      <div className="relative w-full shadow-2xl">
        <div className="w-full aspect-[4/3] relative">
          <img src={MOVIE_DATA.banner} className="w-full h-full object-contain" alt="Banner" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        </div>
        <div className="px-4 -mt-14 flex flex-col gap-3 relative z-20 text-left">
          <button onClick={() => setShowPlayer(true)} className="w-full bg-white text-black font-black py-4 rounded-md text-sm uppercase tracking-[0.2em] shadow-2xl flex items-center justify-center gap-2">
            <IoPlay size={20} /> VER AHORA
          </button>
          <div className="flex gap-3">
            <button onClick={toggleMyList} className={`flex-1 py-3.5 rounded-md text-[10px] font-black border transition-all tracking-widest ${inMyList ? 'bg-[#FF8A00] border-[#FF8A00] text-black' : 'bg-white/5 border-white/10 text-white'}`}>
              {inMyList ? <><IoCheckmarkCircle className="inline mr-1" /> EN MI LISTA</> : '+ MI LISTA'}
            </button>
            <button onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS', '_blank')} className="flex-1 bg-white/5 py-3.5 rounded-md text-[10px] font-black border border-white/10 text-white uppercase tracking-widest">❤ DONAR</button>
          </div>
        </div>
      </div>

      <div className="px-5 mt-16 mb-20 text-left">
        <header className="flex items-center gap-3 mb-8 border-b border-white/5 pb-3">
          <div className="w-1 h-5 bg-[#FF8A00]"></div>
          <h2 className="text-[11px] font-black text-white/50 tracking-[0.3em] uppercase">También te puede interesar</h2>
        </header>
        <div className="grid grid-cols-3 gap-3">
          {randomMovies.map((movie) => (
            <Link key={movie.id} href={movie.path}>
              <div className="flex flex-col gap-2 active:scale-95 transition-all text-left">
                <div className="relative aspect-[2/3] rounded-md overflow-hidden border border-white/5">
                  <Image src={movie.banner} alt={movie.title} fill className="object-cover" unoptimized />
                </div>
                <h3 className="font-bold text-[9px] truncate uppercase text-white/80">{movie.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <footer className="bg-[#0a0a0a] text-gray-500 py-10 px-6 border-t border-white/5 text-left">
        <div className="flex justify-start gap-6 mb-8 text-xl">
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaTiktok /></a>
          <a href="#"><FaYoutube /></a>
          <a href="#"><FaXTwitter /></a>
        </div>
        <div className="space-y-4 mb-8">
          <p className="text-[10px]">© {new Date().getFullYear()} Estudios 421. Todos los derechos reservados.</p>
          <p className="text-[9px] text-gray-600 leading-tight">Aviso Legal: El contenido audiovisual compartido en este sitio pertenece a sus respectivos propietarios. Estudios 421 es una plataforma sin fines de lucro.</p>
        </div>
        <div className="flex flex-col gap-4 text-[10px] font-bold uppercase tracking-widest border-t border-white/5 pt-8">
          <Link href="/politica-de-privacidad">POLÍTICA DE PRIVACIDAD</Link>
          <Link href="/terminos-de-uso">TÉRMINOS DE USO</Link>
          <Link href="/cookies">CONFIGURACIÓN DE COOKIES</Link>
          <Link href="/ayuda">CENTRO DE AYUDA</Link>
        </div>
      </footer>
    </div>
  );
};

export default LosDiezMandamientosMobile;
