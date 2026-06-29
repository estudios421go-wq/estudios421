import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoCloseOutline, IoChevronBack, IoChevronForward, IoList, IoClose, IoCheckmarkCircle } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { allSeries } from '../../../data/series';

// --- CONFIGURACIÓN DE EPISODIOS (ID: 12) ---
const esterEpisodes = [
  { 
    id: 1, 
    title: "EL BANQUETE DEL REY ASUERO", 
    desc: "El rey Asuero regresa victorioso a Susa y organiza un suntuoso banquete de 180 días para celebrar su poder ante el imperio. Mientras tanto, se introduce la humilde vida de la joven judía Ester junto a su primo Mardoqueo. El conflicto estalla cuando la reina Vasti desafía públicamente una orden del rey durante la fiesta.", 
    dur: "00:50:18", 
    thumb: "https://static.wixstatic.com/media/859174_c5689b7012c3439cbebbf7dc9d70cfaa~mv2.jpg",
    url: "https://ok.ru/videoembed/3001179834896" 
  },
  { 
    id: 2, 
    title: "LA DESTITUCIÓN DE LA REINA VASTI", 
    desc: "Tras la humillante negativa de la reina Vasti de presentarse ante los invitados del rey Asuero, el monarca enfurece por el desafío a su autoridad. Bajo el consejo de sus ministros, quienes temen que este acto inspire a otras mujeres del imperio a desobedecer, Asuero toma la firme decisión de destituir a Vasti de su trono, decretando que se busque una nueva soberana en todo el reino.", 
    dur: "00:51:05", 
    thumb: "https://static.wixstatic.com/media/859174_c5689b7012c3439cbebbf7dc9d70cfaa~mv2.jpg",
    url: "https://ok.ru/videoembed/3001180031504" 
  },
  { 
    id: 3, 
    title: "EL DECRETO DEL REY Y LA BÚSQUEDA DE UNA NUEVA REINA", 
    desc: "Tras la destitución de Vasti, el rey Asuero publica un decreto oficial en todo el imperio de Persia para convocar a las jóvenes más hermosas del reino. En Susa, los guardias reales comienzan la búsqueda exhaustiva de candidatas para el harén, obligando a Ester y a Mardoqueo a tomar difíciles decisiones para proteger su identidad judía ante el inminente reclutamiento.", 
    dur: "00:41:07", 
    thumb: "https://static.wixstatic.com/media/859174_c5689b7012c3439cbebbf7dc9d70cfaa~mv2.jpg",
    url: "https://ok.ru/videoembed/3005876603408" 
  },
  { 
    id: 4, 
    title: "EL RECLUTAMIENTO DE ESTER PARA EL HARÉN REAL", 
    desc: "Los guardias del rey avanzan con la recolección de las jóvenes más bellas de Susa y, a pesar de los esfuerzos de Mardoqueo por ocultarla, Ester es descubierta y llevada a la fuerza al palacio. Antes de separarse, Mardoqueo le ruega encarecidamente que mantenga en estricto secreto sus orígenes judíos para proteger su vida dentro del harén.", 
    dur: "00:45:11", 
    thumb: "https://static.wixstatic.com/media/859174_c5689b7012c3439cbebbf7dc9d70cfaa~mv2.jpg",
    url: "https://ok.ru/videoembed/1843699976800" 
  },
  { 
    id: 5, 
    title: "LA PREPARACIÓN EN EL HARÉN REAL Y EL ASCENSO DE AMÁN", 
    desc: "Ester comienza su largo proceso de preparación y purificación dentro del harén bajo el cuidado del eunuco Hegai, destacando rápidamente por su gracia y humildad. Mientras tanto, en la corte, el influyente y arrogante Amán gana el favor del rey Asuero, consolidando un poder político que pronto pondrá en peligro a todo el pueblo judío.", 
    dur: "00:47:41", 
    thumb: "https://static.wixstatic.com/media/859174_c5689b7012c3439cbebbf7dc9d70cfaa~mv2.jpg",
    url: "https://ok.ru/videoembed/3004571650576" 
  },
  { 
    id: 6, 
    title: "EL ENCUENTRO DE ESTER CON EL REY ASUERO", 
    desc: "Llega el momento decisivo en que Ester es presentada ante el rey Asuero tras culminar su periodo de preparación en el harén. Cautivado de inmediato por su belleza, gracia y pureza, el monarca se enamora profundamente de ella y decide coronarla como la nueva reina de Persia, ignorando por completo sus raíces judías.", 
    dur: "00:41:15", 
    thumb: "https://static.wixstatic.com/media/859174_c5689b7012c3439cbebbf7dc9d70cfaa~mv2.jpg",
    url: "https://ok.ru/videoembed/3004571716112" 
  },
  { 
    id: 7, 
    title: "EL COMPLOT CONTRA EL REY Y LA CONSPIRACIÓN DE AMÁN", 
    desc: "Mardoqueo descubre una conspiración secreta de dos guardias reales para asesinar al rey Asuero e informa de inmediato a Ester, logrando salvar la vida del monarca. Sin embargo, el orgullo del cruel Amán se desborda cuando Mardoqueo se niega a arrodillarse ante él, desatando una sed de venganza que amenaza con destruir a todos los judíos del imperio.", 
    dur: "00:45:58", 
    thumb: "https://static.wixstatic.com/media/859174_c5689b7012c3439cbebbf7dc9d70cfaa~mv2.jpg",
    url: "https://ok.ru/videoembed/3004571519504" 
  },
  { 
    id: 8, 
    title: "EL DECRETO DE EXTERMINIO CONTRA LOS JUDÍOS", 
    desc: "Amán manipula al rey Asuero para que firme un decreto oficial que ordena la aniquilación de todos los judíos del imperio en un día determinado. Al enterarse de la terrible noticia, Mardoqueo entra en un profundo luto y busca desesperadamente contactar a la reina Ester para exigirle que intervenga ante el rey y salve a su pueblo.", 
    dur: "00:44:41", 
    thumb: "https://static.wixstatic.com/media/859174_c5689b7012c3439cbebbf7dc9d70cfaa~mv2.jpg",
    url: "https://ok.ru/videoembed/3004571388432" 
  },
  { 
    id: 9, 
    title: "EL AYUNO DE ESTER Y EL RIESGO DE PRESENTARSE ANTE EL REY", 
    desc: "Mardoqueo convence a Ester de que debe arriesgar su vida presentándose ante el rey Asuero sin haber sido convocada, una falta que se castiga con la muerte. Antes de dar el peligroso paso, Ester le pide a Mardoqueo que reúna a todos los judíos de Susa para realizar un ayuno estricto de tres días implorando el favor divino.", 
    dur: "00:45:16", 
    thumb: "https://static.wixstatic.com/media/859174_c5689b7012c3439cbebbf7dc9d70cfaa~mv2.jpg",
    url: "https://ok.ru/videoembed/3004571453968" 
  },
  { 
    id: 10, 
    title: "EL TRIUNFO DE MARDOQUEO Y LA SALVACIÓN DEL PUEBLO JUDÍO", 
    desc: "Ester revela valientemente su origen judío ante el rey Asuero y desenmascara la traición del malvado Amán, quien termina recibiendo su propio castigo. Con el respaldo del monarca, Mardoqueo es honrado con un alto cargo y se emite un nuevo decreto real que permite a los judíos defenderse victorios amente, trayendo paz y una gran celebración a todo el imperio.", 
    dur: "00:46:50", 
    thumb: "https://static.wixstatic.com/media/859174_c5689b7012c3439cbebbf7dc9d70cfaa~mv2.jpg",
    url: "https://ok.ru/videoembed/3004571322896" 
  }
];

const ReinaEsterPC = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [inMyList, setInMyList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const SERIES_ID = 12;

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

    const savedEp = localStorage.getItem('ester_last_ep');
    if (savedEp) {
      const idx = parseInt(savedEp);
      if (idx < esterEpisodes.length) setCurrentIdx(idx);
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
        ester: ['ester', 'reina', 'persia', 'mardoqueo', 'aman', 'asuero'],
        jesus: ['jesus', 'milagros', 'pasion'],
        reyes: ['reyes', 'david', 'saul']
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
    setCurrentIdx(idx);
    setSelectedVideo(esterEpisodes[idx].url);
    localStorage.setItem('ester_last_ep', idx.toString());
  };

  const closePlayer = () => setSelectedVideo(null);

  const toggleMyList = () => {
    let list = JSON.parse(localStorage.getItem('myList') || '[]');
    if (inMyList) { 
      list = list.filter((i: number) => i !== SERIES_ID); 
      setInMyList(false); 
    } else { 
      list.push(SERIES_ID); 
      setInMyList(true); 
    }
    localStorage.setItem('myList', JSON.stringify(list));
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans select-none overflow-x-hidden text-left unselectable">
      <Head><title>La Historia de la Reina Ester — Estudios 421</title></Head>

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
            {[{ n: '', img: '367960b11c1c44ba89cd1582fd1b5776', p: '/serie/la-historia-de-la-reina-ester' }, 
              { n: 'en', img: '35112d9ffe234d6f9dcef16cf8f7544e', p: '/en/serie/la-historia-de-la-reina-ester' }, 
              { n: 'pt', img: '830f1c20656e4d44a819bedfc13a22cc', p: '/pt/serie/la-historia-de-la-reina-ester' }].map((l) => (
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
        <img src="https://static.wixstatic.com/media/859174_c5689b7012c3439cbebbf7dc9d70cfaa~mv2.jpg" className="w-full h-full object-cover" alt="Banner Reina Ester" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/10 opacity-70" />
        <div className="absolute bottom-[-30px] left-16 flex gap-6 z-20 items-center">
          <button onClick={() => openEpisode(currentIdx)} className="bg-white text-black font-black py-4 px-12 rounded-sm text-lg hover:bg-[#FF8A00] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-2xl uppercase">
            {currentIdx === 0 ? "▶ Ver Ahora" : `▶ Continuar Ep. ${esterEpisodes[currentIdx].id}`}
          </button>
          <button onClick={toggleMyList} className={`border py-4 px-10 rounded-sm transition-all uppercase font-bold ${inMyList ? 'bg-[#FF8A00] border-[#FF8A00] text-white' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}>
            {inMyList ? <><IoCheckmarkCircle className="inline mr-2" /> En Mi Lista</> : '+ Mi Lista'}
          </button>
          <button onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS', '_blank')} className="border py-4 px-10 rounded-sm bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all uppercase font-bold">❤ Donar</button>
        </div>
      </div>

      <div className="h-20 bg-black"></div>

      <div className="px-16 mb-32 relative z-10">
        <header className="flex items-center gap-4 mb-10 border-b border-white/10 pb-4">
          <div className="w-1.5 h-8 bg-[#FF8A00]"></div>
          <h2 className="text-2xl font-bold tracking-tight uppercase">Episodios Disponibles</h2>
        </header>

        <div className="grid grid-cols-2 gap-8">
          {esterEpisodes.map((ep, index) => (
            <div key={ep.id} className={`group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 bg-[#2C2F33] border-2 ${currentIdx === index ? 'border-[#FF8A00] ring-4 ring-[#FF8A00]/20' : 'border-transparent hover:border-white/20'}`} onClick={() => openEpisode(index)}>
              <div className="relative aspect-video overflow-hidden">
                <img src={ep.thumb} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C2F33] opacity-60" />
                <div className="absolute bottom-2 left-2 bg-black/40 backdrop-blur-md px-3 py-1 rounded-md border border-white/10">
                    <span className="text-[11px] font-black uppercase text-white">Episodio <span className="text-[#FF8A00]">{ep.id}</span></span>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                  <span className="text-[10px] font-bold text-white">{ep.dur}</span>
                </div>
              </div>
              <div className="p-5 flex flex-col gap-1">
                <h3 className="font-bold text-base truncate uppercase group-hover:text-[#FF8A00]">{ep.title}</h3>
                <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed h-8">{ep.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 z-[1000] bg-[#050608] flex flex-col animate-fade-in">
          <div className="h-[12vh] min-h-[85px] px-12 flex items-center justify-between bg-gradient-to-b from-[#0a0b0d] to-[#050608] border-b border-white/5">
            <div className="flex flex-col border-l-4 border-[#FF8A00] pl-6 py-1 text-left">
              <span className="text-[10px] font-black text-[#FF8A00]/80 uppercase tracking-[0.5em] mb-1">Serie: La Historia de la Reina Ester</span>
              <h2 className="text-2xl font-black tracking-tighter uppercase leading-none">Episodio {esterEpisodes[currentIdx].id} — {esterEpisodes[currentIdx].title}</h2>
            </div>
            <button onClick={closePlayer} className="group flex items-center gap-4 bg-white/[0.03] px-8 py-3.5 rounded-full border border-white/10 hover:bg-[#FF8A00] hover:scale-105 transition-all">
              <span className="text-[11px] font-black uppercase tracking-[0.2em] group-hover:text-black">Cerrar Reproductor</span>
              <IoClose size={24} className="group-hover:rotate-90 group-hover:text-black transition-all" />
            </button>
          </div>
          <div className="flex-grow bg-black relative">
            <iframe src={selectedVideo} className="absolute inset-0 w-full h-full border-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" allow="autoplay; fullscreen" allowFullScreen />
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
              <span className="text-xs font-black uppercase tracking-[0.3em] text-white/60">Lista de Capítulos</span>
            </button>
            <button disabled={currentIdx === esterEpisodes.length - 1} onClick={() => openEpisode(currentIdx + 1)} className="group flex items-center gap-6 disabled:opacity-5 transition-all">
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
          <div className="flex justify-start md:justify-end gap-6 mb-10">
            <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xl"><FaFacebookF /></a>
            <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xl"><FaInstagram /></a>
            <a href="https://www.tiktok.com/@estudios421_com?_r=1&_t=ZS-93K0Cjg8TzM" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xl"><FaTiktok /></a>
            <a href="https://youtube.com/@estudios421max?si=IXSltDZuOmclG7KL" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xl"><FaYoutube /></a>
            <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xl"><FaXTwitter /></a>
          </div>
          <div className="mb-10 space-y-4">
            <p className="text-xs leading-relaxed max-w-4xl">© {new Date().getFullYear()} Estudios 421. Todos los derechos reservados sobre el diseño y edición de la plataforma.</p>
            <p className="text-[10px] md:text-xs leading-relaxed text-gray-500 max-w-5xl">Aviso Legal: El contenido audiovisual compartido en este sitio pertenece a sus respectivos propietarios y productoras (Record TV, Seriella Productions, Casablanca Productions, Amazon Content Services LLC, entre otros). Estudios 421 es una plataforma sin fines de lucro destinada a la difusión de contenido bíblico para la comunidad. No reclamamos propiedad sobre las series o películas mostradas.</p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-[11px] md:text-xs font-medium uppercase tracking-widest border-t border-white/5 pt-8">
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

export default ReinaEsterPC;
