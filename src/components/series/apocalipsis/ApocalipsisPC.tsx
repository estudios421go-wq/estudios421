import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoCloseOutline, IoChevronBack, IoChevronForward, IoList, IoClose, IoCheckmarkCircle, IoLayersOutline } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { allSeries } from '../../../data/series';

interface Episode {
  id: number;
  title: string;
  dur: string;
  thumb: string;
  url: string;
  releaseDate: Date | null;
}

const apocalipsis155Episodes: Episode[] = [
  { id: 1, title: "Episodio 001 | Apocalipsis", dur: "00:43:53", thumb: "https://static.wixstatic.com/media/859174_cfd920337c02422ea0f20ab5c91213db~mv2.jpg", url: "https://ok.ru/videoembed/15921806969344", releaseDate: null },
  { id: 2, title: "Episodio 002 | Apocalipsis", dur: "00:45:01", thumb: "https://static.wixstatic.com/media/859174_86e41341db694515aaa880c62602ec6c~mv2.jpg", url: "https://ok.ru/videoembed/15921807362560", releaseDate: null },
  { id: 3, title: "Episodio 003 | Apocalipsis", dur: "00:44:38", thumb: "https://static.wixstatic.com/media/859174_bbe9bf9b8cc14f24804c54d25ba80ddc~mv2.jpg", url: "https://ok.ru/videoembed/15921807559168", releaseDate: null },
  { id: 4, title: "Episodio 004 | Apocalipsis", dur: "00:45:27", thumb: "https://static.wixstatic.com/media/859174_7f172698c3e6445b8df4a74fad6491ae~mv2.jpg", url: "https://ok.ru/videoembed/15921808017920", releaseDate: null },
  { id: 5, title: "Episodio 005 | Apocalipsis", dur: "00:45:10", thumb: "https://static.wixstatic.com/media/859174_35c47639abab43e9ab1d6a5a190d4e90~mv2.jpg", url: "https://ok.ru/videoembed/15921808411136", releaseDate: null },
  { id: 6, title: "Episodio 006 | Apocalipsis", dur: "00:43:30", thumb: "https://static.wixstatic.com/media/859174_cfd2329e6cb3494fabea103d9d3cdabe~mv2.jpg", url: "https://ok.ru/videoembed/15921808738816", releaseDate: null },
  { id: 7, title: "Episodio 007 | Apocalipsis", dur: "00:44:13", thumb: "https://static.wixstatic.com/media/859174_08049b699795478fa4db66004c3561b7~mv2.jpg", url: "https://ok.ru/videoembed/15921808869888", releaseDate: null },
  { id: 8, title: "Episodio 008 | Apocalipsis", dur: "00:44:45", thumb: "https://static.wixstatic.com/media/859174_6bc041363bea46bead8f135cf92a805e~mv2.jpg", url: "https://ok.ru/videoembed/15921809132032", releaseDate: null },
  { id: 9, title: "Episodio 009 | Apocalipsis", dur: "00:45:07", thumb: "https://static.wixstatic.com/media/859174_77b240a91904413c9b526be67e842893~mv2.jpg", url: "https://ok.ru/videoembed/15944362625536", releaseDate: null },
];

const startDate = new Date(2026, 2, 18); 
let currentEpDate = new Date(startDate);

for (let i = 10; i <= 155; i++) {
  apocalipsis155Episodes.push({
    id: i,
    title: `Episodio ${String(i).padStart(3, '0')} | Apocalipsis`,
    dur: "--:--",
    thumb: "",
    url: "",
    releaseDate: new Date(currentEpDate)
  });
  currentEpDate.setDate(currentEpDate.getDate() + 1);
  if (currentEpDate.getDay() === 6) currentEpDate.setDate(currentEpDate.getDate() + 2);
  if (currentEpDate.getDay() === 0) currentEpDate.setDate(currentEpDate.getDate() + 1);
}

const ApocalipsisPC = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [inMyList, setInMyList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const SERIES_ID = 19;

  useEffect(() => {
    const handleGlobalPrevent = (e: any) => e.preventDefault();
    document.addEventListener('contextmenu', handleGlobalPrevent);
    document.addEventListener('dragstart', handleGlobalPrevent);
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && (e.key === 'u' || e.key === 's' || e.key === 'i')) || (e.metaKey && (e.key === 'u' || e.key === 's' || e.key === 'i')) || e.key === 'F12') {
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    const savedEp = localStorage.getItem('apocalipsis_extendida_last_ep');
    if (savedEp) {
      const idx = parseInt(savedEp);
      if (idx < apocalipsis155Episodes.length && !apocalipsis155Episodes[idx].releaseDate) setCurrentIdx(idx);
    }
    const myListData = JSON.parse(localStorage.getItem('myList') || '[]');
    if (myListData.includes(SERIES_ID)) setInMyList(true);

    return () => {
      document.removeEventListener('contextmenu', handleGlobalPrevent);
      document.removeEventListener('dragstart', handleGlobalPrevent);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      const normalize = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      const term = normalize(searchQuery);
      const themeMap: { [key: string]: string[] } = {
        moises: ['moises', 'diez mandamientos', 'egipto'],
        sanson: ['sanson', 'dalila', 'fuerza', 'filisteos'],
        jesus: ['jesus', 'milagros', 'pasion', 'nazaret', 'cristo'],
        reyes: ['reyes', 'david', 'saul', 'salomon', 'jerusalen'],
        apocalipsis: ['apocalipsis', 'fin del mundo', 'profecia', 'revelacion']
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
    setCurrentIdx(idx);
    setSelectedVideo(apocalipsis155Episodes[idx].url);
    localStorage.setItem('apocalipsis_extendida_last_ep', idx.toString());
  };

  const closePlayer = () => setSelectedVideo(null);

  const toggleMyList = () => {
    let list = JSON.parse(localStorage.getItem('myList') || '[]');
    if (inMyList) { list = list.filter((i: number) => i !== SERIES_ID); setInMyList(false); }
    else { list.push(SERIES_ID); setInMyList(true); }
    localStorage.setItem('myList', JSON.stringify(list));
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans select-none overflow-x-hidden text-left unselectable">
      <Head><title>Apocalipsis (155 Episodios) — Estudios 421</title></Head>

      <nav className={`fixed top-0 w-full z-[130] transition-all duration-500 px-8 py-4 flex items-center justify-between ${isScrolled || searchQuery.length > 0 ? 'bg-black shadow-lg' : 'bg-gradient-to-b from-black via-black/60 to-transparent'}`}>
        <div className="flex items-center gap-10">
          <Link href="/"><div className="relative w-[160px] h-[45px] cursor-pointer"><Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" fill className="object-contain" priority /></div></Link>
          <div className="flex gap-8">
            <Link href="/" className="relative group text-white text-[15px] font-medium tracking-wide">Inicio<span className="absolute -bottom-1 left-0 h-[3px] bg-[#FF8A00] transition-all duration-500 w-0 group-hover:w-full" /></Link>
            <Link href="/series-biblicas" className="relative group text-white text-[15px] font-medium tracking-wide">Series Biblicas<span className="absolute -bottom-1 left-0 h-[3px] bg-[#FF8A00] transition-all duration-500 w-0 group-hover:w-full" /></Link>
            <Link href="/series-tv" className="relative group text-white text-[15px] font-medium tracking-wide">Series TV<span className="absolute -bottom-1 left-0 h-[3px] bg-[#FF8A00] transition-all duration-500 w-0 group-hover:w-full" /></Link>
            <Link href="/peliculas" className="relative group text-white text-[15px] font-medium tracking-wide">Peliculas<span className="absolute -bottom-1 left-0 h-[3px] bg-[#FF8A00] transition-all duration-500 w-0 group-hover:w-full" /></Link>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex gap-4 mr-4">
            {[{ n: '', img: '367960b11c1c44ba89cd1582fd1b5776', p: '/serie/apocalipsis' }, 
              { n: 'en', img: '35112d9ffe234d6f9dcef16cf8f7544e', p: '/en/serie/apocalypse' }, 
              { n: 'pt', img: '830f1c20656e4d44a819bedfc13a22cc', p: '/pt/serie/apocalipse' }].map((l) => (
              <Link key={l.n} href={l.p}><img src={`https://static.wixstatic.com/media/859174_${l.img}~mv2.png`} className="w-7 h-7 object-contain cursor-pointer hover:scale-110 transition-transform" /></Link>
            ))}
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="flex items-center bg-white/10 rounded-full px-4 py-1 border border-white/5 focus-within:border-[#FF8A00]">
            <IoSearchOutline className="text-white text-xl" />
            <input type="text" placeholder="Buscar..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent border-none outline-none text-white text-sm ml-2 w-32 placeholder:text-gray-400" />
          </form>
          <Image src="https://static.wixstatic.com/media/859174_26ca840644ce4f519c0458c649f44f34~mv2.png" alt="User" width={30} height={30} className="rounded-full ring-1 ring-white/20 hover:ring-[#FF8A00] cursor-pointer" />
        </div>
      </nav>

      {/* BLOQUE DE RESULTADOS DE BÚSQUEDA RESTAURADO */}
      {searchQuery.length > 0 && (
        <div className="fixed inset-0 bg-black z-[120] pt-24 px-16 overflow-y-auto pb-20">
          <h2 className="text-white text-2xl font-bold mb-10 uppercase tracking-widest flex items-center gap-3"><span className="w-1.5 h-6 bg-[#FF8A00]" />Resultados: "{searchQuery}"</h2>
          <div className="grid grid-cols-6 gap-x-4 gap-y-10">
            {searchResults.map((m) => (
              <Link key={m.id} href={m.path}><div className="relative aspect-[2/3] rounded-md transition-all duration-500 hover:scale-110 hover:z-[110] cursor-pointer shadow-2xl group"><Image src={m.banner} alt={m.title} fill className="object-cover rounded-md" unoptimized /></div></Link>
            ))}
          </div>
        </div>
      )}

      <div className="relative w-full h-[88vh]">
        <img src="https://static.wixstatic.com/media/859174_f73133cc2267477786433f55120ea643~mv2.jpg" className="w-full h-full object-cover" alt="Banner Apocalipsis" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/10 opacity-70" />
        <div className="absolute bottom-[-30px] left-16 flex gap-6 z-20 items-center">
          <button onClick={() => openEpisode(currentIdx)} className="bg-white text-black font-black py-4 px-12 rounded-sm text-lg hover:bg-[#FF8A00] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-2xl uppercase">
            {currentIdx === 0 ? "▶ Ver Ahora" : `▶ Continuar Ep. ${currentIdx + 1}`}
          </button>
          <button onClick={toggleMyList} className={`border py-4 px-10 rounded-sm transition-all uppercase font-bold ${inMyList ? 'bg-[#FF8A00] border-[#FF8A00] text-white' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}>
            {inMyList ? <><IoCheckmarkCircle className="inline mr-2" /> En Mi Lista</> : '+ Mi Lista'}
          </button>
          <button onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS', '_blank')} className="border py-4 px-10 rounded-sm bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all uppercase font-bold">❤ Donar</button>
        </div>
      </div>

      <div className="h-24 bg-black"></div>

      <div className="px-16 mb-40 relative z-10 text-left">
        <header className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
          <div className="w-1.5 h-8 bg-[#FF8A00]"></div>
          <h2 className="text-2xl font-bold tracking-tight uppercase">Episodios Disponibles</h2>
        </header>

        <div className="mb-12">
          <Link href="/serie/apocalipsis-88">
            <button className="flex items-center gap-3 bg-[#FF8A00] text-black font-black py-4 px-10 rounded-full text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,138,0,0.4)]">
              <IoLayersOutline size={20} />
              Ver Versión Resumida (88 Episodios)
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-4 gap-x-8 gap-y-12">
          {apocalipsis155Episodes.map((ep, index) => (
            <div 
              key={ep.id} 
              className={`group flex flex-col gap-4 transition-all ${!ep.releaseDate ? 'cursor-pointer' : 'opacity-60 cursor-default'}`}
              onClick={() => !ep.releaseDate && openEpisode(index)}
            >
              <div className={`relative aspect-video rounded-xl overflow-hidden border-2 ${!ep.releaseDate ? (currentIdx === index ? 'border-[#FF8A00]' : 'border-transparent group-hover:border-white/20') : 'border-white/5 bg-[#1a1a1a]'}`}>
                {!ep.releaseDate ? (
                  <img src={ep.thumb} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
                    <span className="text-white/20 font-black text-4xl mb-2">{ep.id}</span>
                    <span className="text-[10px] font-black text-white uppercase tracking-widest bg-white/5 px-3 py-1 rounded">
                      ESTRENO: {ep.releaseDate?.toLocaleDateString('es-ES', { day: '2-digit', month: 'long' }).toUpperCase()}
                    </span>
                  </div>
                )}
                {!ep.releaseDate && (
                  <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold">
                    {ep.dur}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <h3 className={`font-bold text-sm uppercase truncate ${!ep.releaseDate ? 'group-hover:text-[#FF8A00]' : 'text-gray-600'}`}>
                  {ep.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 z-[1000] bg-[#050608] flex flex-col animate-fade-in text-left">
          <div className="h-[12vh] min-h-[85px] px-12 flex items-center justify-between bg-gradient-to-b from-[#0a0b0d] to-[#050608] border-b border-white/5">
            <div className="flex flex-col border-l-4 border-[#FF8A00] pl-6 py-1">
              <span className="text-[10px] font-black text-[#FF8A00]/80 uppercase tracking-[0.5em] mb-1">Apocalipsis (155)</span>
              <h2 className="text-2xl font-black tracking-tighter uppercase leading-none">{apocalipsis155Episodes[currentIdx].title}</h2>
            </div>
            <button onClick={closePlayer} className="group flex items-center gap-4 bg-white/[0.03] px-8 py-3.5 rounded-full border border-white/10 hover:bg-[#FF8A00] hover:scale-105 transition-all">
              <span className="text-[11px] font-black uppercase tracking-[0.2em] group-hover:text-black">Cerrar</span>
              <IoClose size={24} className="group-hover:rotate-90 group-hover:text-black transition-all" />
            </button>
          </div>
          <div className="flex-grow bg-black relative">
            <iframe src={selectedVideo + "?autoplay=1"} className="absolute inset-0 w-full h-full border-none" allow="autoplay; fullscreen" allowFullScreen />
          </div>
          <div className="h-[13vh] min-h-[100px] px-16 bg-gradient-to-t from-[#0a0b0d] border-t border-white/5 flex items-center justify-between">
            <button disabled={currentIdx === 0} onClick={() => openEpisode(currentIdx - 1)} className="group flex items-center gap-5 disabled:opacity-5 transition-all">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] group-hover:bg-white group-hover:text-black transition-all shadow-xl">
                <IoChevronBack size={24} />
              </div>
              <div className="flex flex-col items-start text-left">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FF8A00]/60">Anterior</span>
                <span className="text-sm font-bold uppercase text-white/80">Episodio {currentIdx}</span>
              </div>
            </button>
            <button onClick={closePlayer} className="flex items-center gap-4 bg-white/[0.03] px-10 py-4 rounded-2xl border border-white/5 hover:bg-white/[0.08] transition-all">
              <IoList size={28} className="text-[#FF8A00]" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-white/60">Capítulos</span>
            </button>
            <button disabled={currentIdx === apocalipsis155Episodes.length - 1 || apocalipsis155Episodes[currentIdx + 1].releaseDate !== null} onClick={() => openEpisode(currentIdx + 1)} className="group flex items-center gap-6 disabled:opacity-5 transition-all">
              <div className="flex flex-col items-end text-right">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FF8A00]">Siguiente</span>
                <span className="text-sm font-bold uppercase text-white/80">Episodio {currentIdx + 2}</span>
              </div>
              <div className="w-16 h-16 rounded-[22px] bg-[#FF8A00] flex items-center justify-center text-black shadow-2xl group-hover:scale-110 transition-all">
                <IoChevronForward size={32} />
              </div>
            </button>
          </div>
        </div>
      )}

      <footer className="bg-[#0a0a0a] text-gray-400 py-12 px-8 md:px-16 border-t border-white/5 text-left">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-start md:justify-end gap-6 mb-10 text-left">
            <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xl"><FaFacebookF /></a>
            <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xl"><FaInstagram /></a>
            <a href="https://www.tiktok.com/@estudios421_com?_r=1&_t=ZS-93K0Cjg8TzM" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xl"><FaTiktok /></a>
            <a href="https://youtube.com/@estudios421max?si=IXSltDZuOmclG7KL" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xl"><FaYoutube /></a>
            <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xl"><FaXTwitter /></a>
          </div>
          <div className="mb-10 space-y-4 text-left">
            <p className="text-xs leading-relaxed max-w-4xl">© {new Date().getFullYear()} Estudios 421. Todos los derechos reservados sobre el diseño y edición de la plataforma.</p>
            <p className="text-[10px] md:text-xs leading-relaxed text-gray-500 max-w-5xl text-justify font-medium">Aviso Legal: El contenido audiovisual compartido en este sitio pertenece a sus respectivos propietarios y productoras (Record TV, Seriella Productions, Casablanca Productions, Amazon Content Services LLC, entre otros). Estudios 421 es una plataforma sin fines de lucro destinada a la difusión de contenido bíblico para la comunidad. No reclamamos propiedad sobre las series o películas mostradas.</p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-[11px] md:text-xs font-medium uppercase tracking-widest border-t border-white/5 pt-8 text-left">
            <Link href="/politica-de-privacidad" className="hover:text-white transition-colors">Política de privacidad</Link>
            <Link href="/terminos-de-uso" className="hover:text-white transition-colors">Términos de uso</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">Configuración de cookies</Link>
            <Link href="/anuncios" className="hover:text-white transition-colors">Especificaciones de anuncios</Link>
            <Link href="/ayuda" className="hover:text-white transition-colors">Centro de ayuda</Link>
          </div>
        </div>
      </footer>
      <style jsx global>{`
        .unselectable { -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }
        img { pointer-events: none !important; }
      `}</style>
    </div>
  );
};

export default ApocalipsisPC;
