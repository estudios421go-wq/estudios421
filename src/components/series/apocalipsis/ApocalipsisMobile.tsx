import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoMenuOutline, IoCloseOutline, IoChevronBack, IoChevronForward, IoList, IoClose, IoCheckmarkCircle, IoLayersOutline } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { allSeries } from '../../../data/series';

// --- DEFINICIÓN DE INTERFAZ ---
interface Episode {
  id: number;
  title: string;
  dur: string;
  thumb: string;
  url: string;
  releaseDate: Date | null;
}

// --- CONFIGURACIÓN DE EPISODIOS EXTENDIDA (155 CAPÍTULOS) ---
const apocalipsis155Episodes: Episode[] = [
  { id: 1, title: "Episodio 001 | Apocalipsis", dur: "00:43:53", thumb: "https://static.wixstatic.com/media/859174_cfd920337c02422ea0f20ab5c91213db~mv2.jpg", url: "https://ok.ru/videoembed/15921806969344", releaseDate: null },
  { id: 2, title: "Episodio 002 | Apocalipsis", dur: "00:45:01", thumb: "https://static.wixstatic.com/media/859174_86e41341db694515aaa880c62602ec6c~mv2.jpg", url: "https://ok.ru/videoembed/15921807362560", releaseDate: null },
  { id: 3, title: "Episodio 003 | Apocalipsis", dur: "00:44:38", thumb: "https://static.wixstatic.com/media/859174_bbe9bf9b8cc14f24804c54d25ba80ddc~mv2.jpg", url: "https://ok.ru/videoembed/15921807559168", releaseDate: null },
  { id: 4, title: "Episodio 004 | Apocalipsis", dur: "00:45:27", thumb: "https://static.wixstatic.com/media/859174_7f172698c3e6445b8df4a74fad6491ae~mv2.jpg", url: "https://ok.ru/videoembed/15921808017920", releaseDate: null },
  { id: 5, title: "Episodio 005 | Apocalipsis", dur: "00:45:10", thumb: "https://static.wixstatic.com/media/859174_35c47639abab43e9ab1d6a5a190d4e90~mv2.jpg", url: "https://ok.ru/videoembed/15921808411136", releaseDate: null },
  { id: 6, title: "Episodio 006 | Apocalipsis", dur: "00:43:30", thumb: "https://static.wixstatic.com/media/859174_cfd2329e6cb3494fabea103d9d3cdabe~mv2.jpg", url: "https://ok.ru/videoembed/15921808738816", releaseDate: null },
  { id: 7, title: "Episodio 007 | Apocalipsis", dur: "00:44:13", thumb: "https://static.wixstatic.com/media/859174_08049b699795478fa4db66004c3561b7~mv2.jpg", url: "https://ok.ru/videoembed/15921808869888", releaseDate: null },
  { id: 8, title: "Episodio 008 | Apocalipsis", dur: "00:44:45", thumb: "https://static.wixstatic.com/media/859174_6bc041363bea46bead8f135cf92a805e~mv2.jpg", url: "https://ok.ru/videoembed/15921809132032", releaseDate: null },
  { id: 9, title: "Episodio 009 | Apocalipsis", dur: "00:45:08", thumb: "https://static.wixstatic.com/media/859174_77b240a91904413c9b526be67e842893~mv2.jpg", url: "https://ok.ru/videoembed/15944362625536", releaseDate: null },
  { id: 10, title: "Episodio 010 | Apocalipsis", dur: "00:45:31", thumb: "https://static.wixstatic.com/media/859174_1b1d997f83294344818cdc28e676309f~mv2.jpg", url: "https://ok.ru/videoembed/15945741175296", releaseDate: null },
  { id: 11, title: "Episodio 011 | Apocalipsis", dur: "00:45:30", thumb: "https://static.wixstatic.com/media/859174_583a8d6d10e24d04abebe9644ebc61da~mv2.jpg", url: "https://ok.ru/videoembed/15945743403520", releaseDate: null },
  { id: 12, title: "Episodio 012 | Apocalipsis", dur: "00:45:30", thumb: "https://static.wixstatic.com/media/859174_bf6aa85cf6f54137831b86c97881ad58~mv2.jpg", url: "https://ok.ru/videoembed/15947176020480", releaseDate: null },
  { id: 13, title: "Episodio 013 | Apocalipsis", dur: "00:45:16", thumb: "https://static.wixstatic.com/media/859174_f6d1f4734bdb47f188b207f22b450077~mv2.jpg", url: "https://ok.ru/videoembed/15947177396736", releaseDate: null },
  { id: 14, title: "Episodio 014 | Apocalipsis", dur: "00:45:33", thumb: "https://static.wixstatic.com/media/859174_809a9766b45144559e1347a189aad90d~mv2.jpg", url: "https://ok.ru/videoembed/15947178314240", releaseDate: null },
  { id: 15, title: "Episodio 015 | Apocalipsis", dur: "00:43:56", thumb: "https://static.wixstatic.com/media/859174_8e5fde4e809843eaaa97a94ebe79597b~mv2.jpg", url: "https://ok.ru/videoembed/15947179428352", releaseDate: null },
  { id: 16, title: "Episodio 016 | Apocalipsis", dur: "00:45:32", thumb: "https://static.wixstatic.com/media/859174_0f10b35af82d41e2b4657a65038d46ac~mv2.jpg", url: "https://ok.ru/videoembed/16048056175104", releaseDate: null },
  { id: 17, title: "Episodio 017 | Apocalipsis", dur: "00:43:41", thumb: "https://static.wixstatic.com/media/859174_810df1daab8041a6b5ebccb47ca2d411~mv2.jpg", url: "https://ok.ru/videoembed/16048058075648", releaseDate: null },
  { id: 18, title: "Episodio 018 | Apocalipsis", dur: "00:45:19", thumb: "https://static.wixstatic.com/media/859174_da3754b5edf54de5862ba398431b64ba~mv2.jpg", url: "https://ok.ru/videoembed/16048061876736", releaseDate: null },
  { id: 19, title: "Episodio 019 | Apocalipsis", dur: "00:45:30", thumb: "https://static.wixstatic.com/media/859174_881e9980ebfd428a803549cb757888f1~mv2.jpg", url: "https://ok.ru/videoembed/16048063908352", releaseDate: null },
  { id: 20, title: "Episodio 020 | Apocalipsis", dur: "00:45:28", thumb: "https://static.wixstatic.com/media/859174_944d807db4894e8992107e4dd4765f9d~mv2.jpg", url: "https://ok.ru/videoembed/16048065284608", releaseDate: null },
];

// Generador de cronograma automático (Ep 21 en adelante - Lunes a Viernes)
const startDate = new Date(2026, 2, 2); 
let currentEpDate = new Date(startDate);

for (let i = 21; i <= 155; i++) {
  apocalipsis155Episodes.push({
    id: i,
    title: `Episodio ${String(i).padStart(4, '0')} | Apocalipsis`,
    dur: "--:--",
    thumb: "",
    url: "",
    releaseDate: new Date(currentEpDate)
  });
  currentEpDate.setDate(currentEpDate.getDate() + 1);
  if (currentEpDate.getDay() === 6) currentEpDate.setDate(currentEpDate.getDate() + 2);
  if (currentEpDate.getDay() === 0) currentEpDate.setDate(currentEpDate.getDate() + 1);
}

const ApocalipsisMobile = () => {
  const router = useRouter();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inMyList, setInMyList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const SERIES_ID = 19;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    const saved = localStorage.getItem('apocalipsis_extendida_mobile_last_ep');
    if (saved) {
        const idx = parseInt(saved);
        if (idx < apocalipsis155Episodes.length && !apocalipsis155Episodes[idx].releaseDate) setCurrentIdx(idx);
    }
    const list = JSON.parse(localStorage.getItem('myList') || '[]');
    if (list.includes(SERIES_ID)) setInMyList(true);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- BUSCADOR COMPLETO ---
  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      const normalize = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      const term = normalize(searchQuery);
      const themeMap: { [key: string]: string[] } = {
        moises: ['moises', 'diez mandamientos', 'egipto'],
        sanson: ['sanson', 'dalila', 'fuerza'],
        jesus: ['jesus', 'milagros', 'pasion'],
        reyes: ['reyes', 'david', 'saul'],
        apocalipsis: ['apocalipsis', 'fin del mundo', 'profecia']
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

  const openEpisode = (idx: number) => {
    if (apocalipsis155Episodes[idx].releaseDate) return;
    setSelectedVideo(apocalipsis155Episodes[idx].url);
    setCurrentIdx(idx);
    localStorage.setItem('apocalipsis_extendida_mobile_last_ep', idx.toString());
  };

  const toggleMyList = () => {
    let list = JSON.parse(localStorage.getItem('myList') || '[]');
    if (inMyList) { list = list.filter((id: any) => id !== SERIES_ID); setInMyList(false); }
    else { list.push(SERIES_ID); setInMyList(true); }
    localStorage.setItem('myList', JSON.stringify(list));
  };

  if (selectedVideo) {
    return (
      <div className="fixed inset-0 z-[2000] bg-[#050608] flex flex-col overflow-hidden text-left">
        <Head><title>Episodio {currentIdx + 1} — Apocalipsis</title></Head>
        <div className="px-6 h-[85px] flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent border-b border-white/5 z-10 text-left">
          <div className="flex flex-col border-l-4 border-[#F09800] pl-4 py-1">
            <span className="text-[9px] font-black text-[#F09800] uppercase tracking-[0.3em] mb-1">Apocalipsis (155)</span>
            <h2 className="text-sm font-black tracking-tight uppercase truncate max-w-[200px]">Episodio {currentIdx + 1}</h2>
          </div>
          <button onClick={() => setSelectedVideo(null)} className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full border border-white/10 active:scale-90 transition-all">
            <IoClose className="text-2xl" />
          </button>
        </div>
        <div className="flex-grow flex flex-col relative bg-black items-center justify-center text-left">
          <iframe src={selectedVideo + "?autoplay=1"} className="w-full aspect-video border-none" allow="autoplay; fullscreen" allowFullScreen />
          <div className="absolute inset-x-0 bottom-8 flex justify-around items-center px-6">
            <button disabled={currentIdx === 0} onClick={() => openEpisode(currentIdx - 1)} className="flex flex-col items-center gap-2 group disabled:opacity-5">
              <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center active:bg-[#F09800] transition-all"><IoChevronBack size={20} /></div>
              <span className="text-[8px] font-black uppercase tracking-widest text-gray-500">Anterior</span>
            </button>
            <button onClick={() => setSelectedVideo(null)} className="flex flex-col items-center gap-2 group text-left">
              <div className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center active:bg-white active:text-black transition-all"><IoList size={24} className="text-[#F09800]" /></div>
              <span className="text-[8px] font-black uppercase tracking-widest text-white/40">Capítulos</span>
            </button>
            <button disabled={currentIdx === apocalipsis155Episodes.length - 1 || apocalipsis155Episodes[currentIdx + 1].releaseDate !== null} onClick={() => openEpisode(currentIdx + 1)} className="flex flex-col items-center gap-2 group disabled:opacity-5">
              <div className="w-12 h-12 rounded-full bg-[#F09800] text-black flex items-center justify-center shadow-[0_0_20px_rgba(240,152,0,0.3)] active:scale-110 transition-all"><IoChevronForward size={24} /></div>
              <span className="text-[8px] font-black uppercase tracking-widest text-[#F09800]">Siguiente</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-[#F09800] text-left">
      <Head><title>Apocalipsis (155) — Estudios 421</title></Head>
      
      <nav className={`fixed top-0 w-full z-[110] px-4 py-3 flex items-center gap-4 transition-all duration-300 ${isScrolled || isMenuOpen || searchQuery.length > 0 ? 'bg-black shadow-lg' : 'bg-gradient-to-b from-black/90 to-transparent'}`}>
        <div className="flex items-center gap-2 flex-shrink-0 text-left">
          <button className="text-white text-3xl active:scale-90 transition-transform" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <IoCloseOutline /> : <IoMenuOutline />}
          </button>
          <Link href="/"><div className="relative w-[110px] h-[30px]"><Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" fill className="object-contain" priority /></div></Link>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="flex-grow relative group text-left">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><IoSearchOutline size={16} /></div>
          <input type="text" placeholder="Buscar..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-full py-1.5 pl-9 pr-4 text-xs text-white outline-none focus:bg-white/20 focus:border-[#F09800] transition-all" />
        </form>
        <div className="flex-shrink-0"><Image src="https://static.wixstatic.com/media/859174_26ca840644ce4f519c0458c649f44f34~mv2.png" alt="User" width={32} height={32} className="rounded-full ring-2 ring-white/10" /></div>
      </nav>

      {/* BLOQUE DE RESULTADOS DE BÚSQUEDA */}
      {searchQuery.length > 0 && (
        <div className="fixed inset-0 bg-black z-[105] pt-24 px-4 overflow-y-auto pb-20 text-left">
          <h2 className="text-white text-sm font-black mb-6 uppercase tracking-widest flex items-center gap-2"><span className="w-1 h-4 bg-[#F09800]" />Resultados: "{searchQuery}"</h2>
          <div className="grid grid-cols-2 gap-4">
            {searchResults.map((m) => (
              <Link key={m.id} href={m.path} onClick={() => setSearchQuery("")}><div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-2xl"><Image src={m.banner} alt={m.title} fill className="object-cover" unoptimized /></div></Link>
            ))}
          </div>
        </div>
      )}

      <div className={`fixed inset-0 bg-black/98 z-[100] transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full pt-24 px-8 gap-8 text-left">
          <p className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/10 pb-2">Navegación</p>
          <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white">Inicio</Link>
          <Link href="/series-biblicas" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white">Series Biblicas</Link>
          <Link href="/series-tv" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white">Series TV</Link>
          <Link href="/peliculas" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white">Peliculas</Link>
          <p className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/10 pb-2 mt-4">Idioma</p>
          <div className="flex gap-6">
            {[{l:'ESP', i:'367960b11c1c44ba89cd1582fd1b5776', p:'/serie/apocalipsis'}, {l:'ENG', i:'35112d9ffe234d6f9dcef16cf8f7544e', p:'/en/serie/apocalypse'}, {l:'PT', i:'830f1c20656e4d44a819bedfc13a22cc', p:'/pt/serie/apocalipse'}].map((lang) => (
              <Link key={lang.l} href={lang.p} className="flex flex-col items-center gap-2 active:scale-95 transition-transform">
                <img src={`https://static.wixstatic.com/media/859174_${lang.i}~mv2.png`} alt={lang.l} className="w-10 h-10 object-contain" /><span className="text-[10px] text-white font-bold">{lang.l}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="relative w-full pt-0 bg-black shadow-2xl">
        <div className="w-full aspect-[4/3] relative text-left">
          <img src="https://static.wixstatic.com/media/859174_f73133cc2267477786433f55120ea643~mv2.jpg" className="w-full h-full object-contain" alt="Banner" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        </div>
        <div className="px-4 -mt-14 flex flex-col gap-3 relative z-20 text-left">
          <button onClick={() => openEpisode(currentIdx)} className="w-full bg-white text-black font-black py-4 rounded-md text-sm active:scale-95 transition-transform uppercase tracking-[0.2em] shadow-2xl">
            {currentIdx === 0 ? "▶ Ver Ahora" : `▶ Continuar Ep. ${currentIdx + 1}`}
          </button>
          <div className="flex gap-3 text-left">
            <button onClick={toggleMyList} className={`flex-1 py-3.5 rounded-md text-[10px] font-black border transition-all tracking-widest ${inMyList ? 'bg-[#F09800] border-[#F09800] text-black' : 'bg-white/5 border-white/10 text-white active:bg-white/20'}`}>
              {inMyList ? <><IoCheckmarkCircle className="inline mr-1" /> EN MI LISTA</> : '+ MI LISTA'}
            </button>
            <button onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS', '_blank')} className="flex-1 bg-white/5 backdrop-blur-md py-3.5 rounded-md text-[10px] font-black border border-white/10 text-white active:bg-white/20 uppercase tracking-widest">❤ Donar</button>
          </div>
        </div>
      </div>

      <div className="px-5 mt-12 mb-20 text-left">
        <header className="flex items-center gap-3 mb-6 border-b border-white/5 pb-3">
          <div className="w-1 h-5 bg-[#F09800]"></div>
          <h2 className="text-[11px] font-black text-white/50 tracking-[0.3em] uppercase">Episodios Disponibles</h2>
        </header>

        {/* BOTÓN INTERCONEXIÓN MÓVIL */}
        <div className="mb-8 text-left">
          <Link href="/serie/apocalipsis-88">
            <button className="w-full bg-[#FF8A00] text-black font-black py-4 rounded-xl text-[10px] uppercase tracking-widest active:scale-95 transition-all shadow-xl flex items-center justify-center gap-3">
              <IoLayersOutline size={18} />
              Ver Versión Resumida (88 Episodios)
            </button>
          </Link>
        </div>

        <p className="text-[#F09800] font-black text-[10px] tracking-[0.1em] mb-8 animate-pulse uppercase">
          ESTRENO PROGRESIVO: LUNES A VIERNES
        </p>

        <div className="grid grid-cols-2 gap-x-5 gap-y-10 text-left">
          {apocalipsis155Episodes.map((ep, index) => (
            <div 
              key={ep.id} 
              className={`flex flex-col gap-3 transition-all ${!ep.releaseDate ? 'active:scale-95' : 'opacity-40'}`} 
              onClick={() => !ep.releaseDate && openEpisode(index)}
            >
              <div className={`relative aspect-video rounded-lg overflow-hidden border-2 ${!ep.releaseDate ? (currentIdx === index ? 'border-[#F09800] shadow-[0_0_15px_rgba(240,152,0,0.2)]' : 'border-white/5') : 'border-white/5 bg-[#1a1a1a]'}`}>
                {!ep.releaseDate ? (
                   <img src={ep.thumb} className="w-full h-full object-cover" loading="lazy" />
                ) : (
                   <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center">
                      <span className="text-white/10 font-black text-3xl mb-1">{ep.id}</span>
                      <span className="text-[7px] font-black text-white uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded">
                        {ep.releaseDate?.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }).toUpperCase()}
                      </span>
                   </div>
                )}
                {!ep.releaseDate && (
                   <span className="absolute bottom-1.5 right-1.5 bg-black/80 backdrop-blur-md px-2 py-0.5 text-[8px] font-black rounded border border-white/10 uppercase">{ep.dur}</span>
                )}
              </div>
              <h3 className={`font-bold text-[10px] truncate uppercase tracking-tight ${!ep.releaseDate ? 'text-white/90' : 'text-gray-600'}`}>
                {ep.title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      <footer className="bg-[#0a0a0a] text-gray-500 py-10 px-6 border-t border-white/5 text-left">
        <div className="flex justify-start gap-6 mb-8 text-xl">
          <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="active:text-[#F09800] transition-colors"><FaFacebookF /></a>
          <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="active:text-[#F09800] transition-colors"><FaInstagram /></a>
          <a href="https://www.tiktok.com/@estudios421_com" target="_blank" rel="noreferrer" className="active:text-[#F09800] transition-colors"><FaTiktok /></a>
          <a href="https://youtube.com/@estudios421max" target="_blank" rel="noreferrer" className="active:text-[#F09800] transition-colors"><FaYoutube /></a>
          <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="active:text-[#F09800] transition-colors"><FaXTwitter /></a>
        </div>
        <div className="space-y-4 mb-8 text-left">
          <p className="text-[10px] leading-relaxed">© {new Date().getFullYear()} Estudios 421. Todos los derechos reservados sobre el diseño y edición de la plataforma.</p>
          <p className="text-[9px] leading-relaxed text-gray-600 font-medium text-justify">Aviso Legal: El contenido audiovisual compartido en este sitio pertenece a sus respectivos propietarios. Estudios 421 es una plataforma sin fines de lucro para la difusión de contenido bíblico.</p>
        </div>
        <div className="flex flex-col gap-4 text-[10px] font-bold uppercase tracking-widest border-t border-white/5 pt-8 text-left">
          <Link href="/politica-de-privacidad">Política de privacidad</Link>
          <Link href="/terminos-de-uso">Términos de uso</Link>
          <Link href="/cookies">Configuración de cookies</Link>
          <Link href="/ayuda">Centro de ayuda</Link>
        </div>
      </footer>
    </div>
  );
};

export default ApocalipsisMobile;
