import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoMenuOutline, IoCloseOutline, IoChevronBack, IoChevronForward, IoList, IoClose, IoCheckmarkCircle } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { allSeries } from '../../../data/series';

const jobEpisodes = [
  { id: 1, title: "La Juventud", dur: "51:35", thumb: "https://static.wixstatic.com/media/859174_6e9c9f95017d48fab10979c79bbe504b~mv2.jpg", url: "https://ok.ru/videoembed/14200848714240" },
  { id: 2, title: "La Tentación", dur: "1:04:28", thumb: "https://static.wixstatic.com/media/859174_df9b08a7fe524e1a93f8e5ecec085ecd~mv2.jpg", url: "https://ok.ru/videoembed/14200848845312" },
  { id: 3, title: "La Conquista", dur: "55:36", thumb: "https://static.wixstatic.com/media/859174_47e64b4383a4413bb12eab9d0a687ca6~mv2.jpg", url: "https://ok.ru/videoembed/14200849500672" },
  { id: 4, title: "Su Héroe", dur: "46:41", thumb: "https://static.wixstatic.com/media/859174_c4fad81c36344fe2abe3a497187800b1~mv2.jpg", url: "https://ok.ru/videoembed/14200850942464" },
  { id: 5, title: "La Noche de Bodas", dur: "1:02:36", thumb: "https://static.wixstatic.com/media/859174_56d5fd4a00c6424381e4c8672ff26369~mv2.jpg", url: "https://ok.ru/videoembed/14200851270144" },
  { id: 6, title: "La Boda", dur: "49:40", thumb: "https://static.wixstatic.com/media/859174_4942bf39205a491a9148ab8acbca19fc~mv2.jpg", url: "https://ok.ru/videoembed/14201569937920" },
  { id: 7, title: "La Muerte", dur: "50:20", thumb: "https://static.wixstatic.com/media/859174_089119311ae24c9c863e7b93fa4fdf39~mv2.jpg", url: "https://ok.ru/videoembed/14201570855424" },
  { id: 8, title: "El Pastoreo", dur: "48:02", thumb: "https://static.wixstatic.com/media/859174_b11d6df6c7a2408ebb19573c25998db4~mv2.jpg", url: "https://ok.ru/videoembed/14201572231680" },
  { id: 9, title: "La Partida de Job", dur: "49:50", thumb: "https://static.wixstatic.com/media/859174_4f8186d2cb194a829772fa61f345b4cd~mv2.jpg", url: "https://ok.ru/videoembed/14201572624896" },
  { id: 10, title: "La Llegada a Uz", dur: "55:58", thumb: "https://static.wixstatic.com/media/859174_53753f743f3643258ade5db11ed53945~mv2.jpg", url: "https://ok.ru/videoembed/14216478919168" },
  { id: 11, title: "La Familia de Job", dur: "46:37", thumb: "https://static.wixstatic.com/media/859174_1a255930c7024f31bd80efd27d110ec2~mv2.jpg", url: "https://ok.ru/videoembed/14216479115776" },
  { id: 12, title: "Los hijos de Job", dur: "44:49", thumb: "https://static.wixstatic.com/media/859174_e1b1efd205bf47be83c39eec48955430~mv2.jpg", url: "https://ok.ru/videoembed/14216479640064" },
  { id: 13, title: "La Reunión en el Cielo", dur: "44:30", thumb: "https://static.wixstatic.com/media/859174_37825499779b46b08ec2d33d39151853~mv2.jpg", url: "https://ok.ru/videoembed/14216479836672" },
  { id: 14, title: "La Prueba de Job", dur: "1:01:02", thumb: "https://static.wixstatic.com/media/859174_398e5c11b8204a6a8b96b592aa926065~mv2.jpg", url: "https://ok.ru/videoembed/14216479050240" },
  { id: 15, title: "Job en el Sheol", dur: "56:48", thumb: "https://static.wixstatic.com/media/859174_a53a91fb9c7042a29cf0d65b31161238~mv2.jpg", url: "https://ok.ru/videoembed/14216479312384" },
  { id: 16, title: "Amigos de Job", dur: "1:02:19", thumb: "https://static.wixstatic.com/media/859174_2b315227c5de4bb0ae66c8146fd3c1e0~mv2.jpg", url: "https://ok.ru/videoembed/14216479246848" },
  { id: 17, title: "Dios y Job", dur: "40:55", thumb: "https://static.wixstatic.com/media/859174_fd0323d4042a4a929b467ed39cc19134~mv2.jpg", url: "https://ok.ru/videoembed/14216479443456" },
  { id: 18, title: "Un Nuevo Comienzo", dur: "44:12", thumb: "https://static.wixstatic.com/media/859174_a68b9018fbb6433398fc4c324c83ef3f~mv2.jpg", url: "https://ok.ru/videoembed/14216479771136" },
  { id: 19, title: "La Restitución", dur: "42:45", thumb: "https://static.wixstatic.com/media/859174_662812f95f0b428da053bf35fbb7e143~mv2.jpg", url: "https://ok.ru/videoembed/14216479574528" },
  { id: 20, title: "La Continuación del Fin", dur: "53:36", thumb: "https://static.wixstatic.com/media/859174_83e339dc10f04a53b4361f4f4b321d3c~mv2.jpg", url: "https://ok.ru/videoembed/14216479377920" }
];

const LaVidaDeJobMobile = () => {
  const router = useRouter();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inMyList, setInMyList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const SERIES_ID = 3;

  useEffect(() => {
    // --- BLINDAJE TOTAL ACTIVADO ---
    const handlePrevent = (e: any) => e.preventDefault();
    document.addEventListener('contextmenu', handlePrevent);
    document.addEventListener('dragstart', handlePrevent);
    
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    
    const saved = localStorage.getItem('job_last_ep');
    if (saved) setCurrentIdx(parseInt(saved));
    
    const list = JSON.parse(localStorage.getItem('myList') || '[]');
    if (list.includes(SERIES_ID)) setInMyList(true);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('contextmenu', handlePrevent);
      document.removeEventListener('dragstart', handlePrevent);
    };
  }, []);

  // BUSCADOR COMPLETO Y PROFESIONAL
  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      const normalize = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      const term = normalize(searchQuery);
      const themeMap: { [key: string]: string[] } = {
        moises: ['moises', 'diez mandamientos', 'testamento', 'egipto', 'exodo', 'tierra prometida', 'sanson', 'david'],
        egipto: ['jose', 'moises', 'diez mandamientos', 'egipto'],
        jesus: ['jesus', 'milagros', 'pasion', 'nazaret', 'hijo de dios', 'vida publica', 'magdalena', 'pablo', 'apocalipsis'],
        reyes: ['reyes', 'david', 'saul', 'salomon', 'jerusalen', 'division', 'jezabel', 'el rico', 'ester', 'persia'],
        ester: ['ester', 'reina de persia', 'persia', 'nehemias', 'artajerjes']
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
    setSelectedVideo(jobEpisodes[idx].url);
    setCurrentIdx(idx);
    localStorage.setItem('job_last_ep', idx.toString());
  };

  const toggleMyList = () => {
    let list = JSON.parse(localStorage.getItem('myList') || '[]');
    if (inMyList) { 
      list = list.filter((id: any) => id !== SERIES_ID); 
      setInMyList(false); 
    } else { 
      list.push(SERIES_ID); 
      setInMyList(true); 
    }
    localStorage.setItem('myList', JSON.stringify(list));
  };

  if (selectedVideo) {
    return (
      <div className="fixed inset-0 z-[2000] bg-[#050608] flex flex-col overflow-hidden text-left unselectable">
        <Head><title>Reproduciendo: {jobEpisodes[currentIdx].title}</title></Head>
        <div className="px-6 h-[85px] flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent border-b border-white/5 z-10">
          <div className="flex flex-col border-l-4 border-[#F09800] pl-4 py-1">
            <span className="text-[9px] font-black text-[#F09800] uppercase tracking-[0.3em] mb-1">Serie: La vida de Job</span>
            <h2 className="text-sm font-black tracking-tight uppercase truncate max-w-[200px]">
              Ep. {jobEpisodes[currentIdx].id} <span className="text-white/20 mx-1">|</span> {jobEpisodes[currentIdx].title}
            </h2>
          </div>
          <button onClick={() => setSelectedVideo(null)} className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full border border-white/10 active:scale-90 transition-all">
            <IoClose className="text-2xl" />
          </button>
        </div>
        <div className="flex-grow flex flex-col relative bg-black items-center justify-center">
          <iframe src={selectedVideo + "?autoplay=1"} className="w-full aspect-video border-none shadow-[0_0_50px_rgba(0,0,0,1)]" allow="autoplay; fullscreen" allowFullScreen />
          <div className="absolute inset-x-0 bottom-8 flex justify-around items-center px-6">
            <button disabled={currentIdx === 0} onClick={() => openEpisode(currentIdx - 1)} className="flex flex-col items-center gap-2 group disabled:opacity-5">
              <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center active:bg-[#F09800] transition-all"><IoChevronBack size={20} /></div>
              <span className="text-[8px] font-black uppercase tracking-widest text-gray-500">Anterior</span>
            </button>
            <button onClick={() => setSelectedVideo(null)} className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center active:bg-white active:text-black transition-all"><IoList size={24} className="text-[#F09800]" /></div>
              <span className="text-[8px] font-black uppercase tracking-widest text-white/40">Episodios</span>
            </button>
            <button disabled={currentIdx === jobEpisodes.length - 1} onClick={() => openEpisode(currentIdx + 1)} className="flex flex-col items-center gap-2 group disabled:opacity-5">
              <div className="w-12 h-12 rounded-full bg-[#F09800] text-black flex items-center justify-center shadow-[0_0_20px_rgba(240,152,0,0.3)] active:scale-110 transition-all"><IoChevronForward size={24} /></div>
              <span className="text-[8px] font-black uppercase tracking-widest text-[#F09800]">Siguiente</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-[#F09800] text-left unselectable">
      <Head><title>La vida de Job — Estudios 421</title></Head>
      
      <nav className={`fixed top-0 w-full z-[110] px-4 py-3 flex items-center gap-4 transition-all duration-300 ${isScrolled || isMenuOpen || searchQuery.length > 0 ? 'bg-black shadow-lg' : 'bg-gradient-to-b from-black/90 to-transparent'}`}>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="text-white text-3xl active:scale-90 transition-transform" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <IoCloseOutline /> : <IoMenuOutline />}
          </button>
          <Link href="/"><div className="relative w-[110px] h-[30px]"><Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" fill className="object-contain" priority /></div></Link>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="flex-grow relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><IoSearchOutline size={16} /></div>
          <input type="text" placeholder="Buscar..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-full py-1.5 pl-9 pr-4 text-xs text-white outline-none focus:bg-white/20 focus:border-[#F09800] transition-all" />
        </form>
        <div className="flex-shrink-0"><Image src="https://static.wixstatic.com/media/859174_26ca840644ce4f519c0458c649f44f34~mv2.png" alt="User" width={32} height={32} className="rounded-full ring-2 ring-white/10" /></div>
      </nav>

      {searchQuery.length > 0 && (
        <div className="fixed inset-0 bg-black z-[105] pt-24 px-4 overflow-y-auto pb-20">
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
          <Link href="/series-biblicas" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white">Series Bíblicas</Link>
          <Link href="/series-tv" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white">Series TV</Link>
          <Link href="/peliculas" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white">Películas</Link>
          <p className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/10 pb-2 mt-4">Idioma</p>
          <div className="flex gap-6">
            {[{l:'ESP', i:'367960b11c1c44ba89cd1582fd1b5776', p:'/serie/la-vida-de-job'}, {l:'ENG', i:'35112d9ffe234d6f9dcef16cf8f7544e', p:'/en/serie/la-vida-de-job'}, {l:'PT', i:'830f1c20656e4d44a819bedfc13a22cc', p:'/pt/serie/la-vida-de-job'}].map((lang) => (
              <Link key={lang.l} href={lang.p} className="flex flex-col items-center gap-2 active:scale-95 transition-transform">
                <img src={`https://static.wixstatic.com/media/859174_${lang.i}~mv2.png`} alt={lang.l} className="w-10 h-10 object-contain" /><span className="text-[10px] text-white font-bold">{lang.l}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="relative w-full pt-0 bg-black shadow-2xl">
        <div className="w-full aspect-[4/3] relative">
          <img src="https://static.wixstatic.com/media/859174_f2663a3ee1e64c0e872790d28c7f659e~mv2.jpg" className="w-full h-full object-contain" alt="Banner" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        </div>
        <div className="px-4 -mt-14 flex flex-col gap-3 relative z-20">
          <button onClick={() => openEpisode(currentIdx)} className="w-full bg-white text-black font-black py-4 rounded-md text-sm active:scale-95 transition-transform uppercase tracking-[0.2em] shadow-2xl">
            {currentIdx === 0 ? "▶ Ver Ahora" : `▶ Continuar Ep. ${jobEpisodes[currentIdx].id}`}
          </button>
          <div className="flex gap-3">
            <button onClick={toggleMyList} className={`flex-1 py-3.5 rounded-md text-[10px] font-black border transition-all tracking-widest ${inMyList ? 'bg-[#F09800] border-[#F09800] text-black' : 'bg-white/5 border-white/10 text-white active:bg-white/20'}`}>
              {inMyList ? <><IoCheckmarkCircle className="inline mr-1" /> EN MI LISTA</> : '+ MI LISTA'}
            </button>
            <button onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS', '_blank')} className="flex-1 bg-white/5 backdrop-blur-md py-3.5 rounded-md text-[10px] font-black border border-white/10 text-white active:bg-white/20 uppercase tracking-widest">❤ Donar</button>
          </div>
        </div>
      </div>

      <div className="px-5 mt-12 mb-20">
        <header className="flex items-center gap-3 mb-6 border-b border-white/5 pb-3">
          <div className="w-1 h-5 bg-[#F09800]"></div>
          <h2 className="text-[11px] font-black text-white/50 tracking-[0.3em] uppercase">Episodios Disponibles</h2>
        </header>
        <div className="grid grid-cols-2 gap-5 text-left">
          {jobEpisodes.map((ep, index) => (
            <div key={ep.id} className="flex flex-col gap-2.5 active:scale-95 transition-all" onClick={() => openEpisode(index)}>
              <div className={`relative aspect-video rounded-lg overflow-hidden border-2 ${currentIdx === index ? 'border-[#F09800] shadow-[0_0_15px_rgba(240,152,0,0.2)]' : 'border-white/5'}`}>
                <img src={ep.thumb} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-black/20" />
                <span className="absolute bottom-1.5 right-1.5 bg-black/80 backdrop-blur-md px-2 py-0.5 text-[8px] font-black rounded border border-white/10 uppercase">{ep.dur}</span>
              </div>
              <h3 className="font-bold text-[10px] truncate uppercase tracking-tight text-white/90">EP. {ep.id} {ep.title}</h3>
            </div>
          ))}
        </div>
      </div>

      <footer className="bg-[#0a0a0a] text-gray-500 py-10 px-6 border-t border-white/5 text-left">
        <div className="flex justify-start gap-6 mb-8 text-xl">
          <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="active:text-[#F09800] transition-colors"><FaFacebookF /></a>
          <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="active:text-[#F09800] transition-colors"><FaInstagram /></a>
          <a href="https://www.tiktok.com/@estudios421_com?_r=1&_t=ZS-93K0Cjg8TzM" target="_blank" rel="noreferrer" className="active:text-[#F09800] transition-colors"><FaTiktok /></a>
          <a href="https://youtube.com/@estudios421max?si=IXSltDZuOmclG7KL" target="_blank" rel="noreferrer" className="active:text-[#F09800] transition-colors"><FaYoutube /></a>
          <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="active:text-[#F09800] transition-colors"><FaXTwitter /></a>
        </div>
        <div className="space-y-4 mb-8">
          <p className="text-[10px] leading-relaxed">© {new Date().getFullYear()} Estudios 421. Todos los derechos reservados sobre el diseño y edición.</p>
          <p className="text-[9px] leading-relaxed text-gray-600">Aviso Legal: El contenido audiovisual compartido en este sitio pertenece a sus respectivos propietarios. Estudios 421 es una plataforma sin fines de lucro destinada a la difusión de contenido bíblico.</p>
        </div>
        <div className="flex flex-col gap-4 text-[10px] font-bold uppercase tracking-widest border-t border-white/5 pt-8">
          <Link href="/politica-de-privacidad">Política de privacidad</Link>
          <Link href="/terminos-de-uso">Términos de uso</Link>
          <Link href="/cookies">Configuración de cookies</Link>
          <Link href="/anuncios">Especificaciones de anuncios</Link>
          <Link href="/ayuda">Centro de ayuda</Link>
        </div>
      </footer>

      <style jsx global>{`
        .unselectable {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        img {
          pointer-events: none !important;
        }
      `}</style>
    </div>
  );
};

export default LaVidaDeJobMobile;
