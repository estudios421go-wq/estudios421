import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoMenuOutline, IoCloseOutline, IoChevronBack, IoChevronForward, IoList, IoClose, IoCheckmarkCircle } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { allSeries } from '../../../data/series';

// --- CONFIGURACIÓN DE EPISODIOS LIMPIA (ID: 23) ---
const reyesEleccionEpisodes = [
  { id: 1, title: "MUY AMADO", dur: "50:47", thumb: "https://static.wixstatic.com/media/859174_8579c07fbbe24c8c8119f89f3e32ff98~mv2.jpg", url: "https://ok.ru/videoembed/15502027131392" },
  { id: 2, title: "DOLOR DE CODO", dur: "47:02", thumb: "https://static.wixstatic.com/media/859174_660fc25bc76b4c8baf2532c51f6712ce~mv2.jpg", url: "https://ok.ru/videoembed/15502028704256" },
  { id: 3, title: "NO ES UN CUALQUIERA", dur: "45:06", thumb: "https://static.wixstatic.com/media/859174_230db4df10784a41a672cdbb5b67c908~mv2.jpg", url: "https://ok.ru/videoembed/15502444595712" },
  { id: 4, title: "SOY EL MAYOR", dur: "44:50", thumb: "https://static.wixstatic.com/media/859174_438460d143124e449d05910e332d313f~mv2.jpg", url: "https://ok.ru/videoembed/15506359257600" },
  { id: 5, title: "¿Y AHORA?", dur: "46:11", thumb: "https://static.wixstatic.com/media/859174_9dac8033d31b4c329ce3a32d6996f848~mv2.jpg", url: "https://ok.ru/videoembed/15506360830464" },
  { id: 6, title: "AQUEL QUE YO INDIQUE", dur: "45:58", thumb: "https://static.wixstatic.com/media/859174_afec6aae435c4001b85a871b9859f4e4~mv2.jpg", url: "https://ok.ru/videoembed/15506363517440" },
  { id: 7, title: "¿SE HAN ACABADO TUS HIJOS?", dur: "44:26", thumb: "https://static.wixstatic.com/media/859174_ba66087674794ef3a797902c816b2808~mv2.jpg", url: "https://ok.ru/videoembed/15506365680128" },
  { id: 8, title: "LAS COSAS VAN A CAMBIAR", dur: "45:59", thumb: "https://static.wixstatic.com/media/859174_8b6948d46218416d8350808feaad4c4a~mv2.jpg", url: "https://ok.ru/videoembed/15506368498176" },
  { id: 9, title: "¡AYÚDENME!", dur: "45:01", thumb: "https://static.wixstatic.com/media/859174_665e61ec858e4d1f951201641b3cc691~mv2.jpg", url: "https://ok.ru/videoembed/15506370005504" },
  { id: 10, title: "¿ME ESTÁS LLAMANDO COBARDE?", dur: "44:30", thumb: "https://static.wixstatic.com/media/859174_07865d5222124ee39ebe60a1a41d3131~mv2.jpg", url: "https://ok.ru/videoembed/15506371643904" },
  { id: 11, title: "POBRECITO", dur: "45:32", thumb: "https://static.wixstatic.com/media/859174_a75bd8ba2ecd406cab71fcc7ec427de5~mv2.jpg", url: "https://ok.ru/videoembed/15511264496128" },
  { id: 12, title: "POR QUÉ ESTOY ENVIANDO", dur: "46:06", thumb: "https://static.wixstatic.com/media/859174_82e87afcada14ec29cc2d070611a8b82~mv2.jpg", url: "https://ok.ru/videoembed/15512190519808" },
  { id: 13, title: "ESPERANDO ANSIOSAMENTE", dur: "45:53", thumb: "https://static.wixstatic.com/media/859174_15e2c6c618bf4b8f990566989394786d~mv2.jpg", url: "https://ok.ru/videoembed/15512191240704" },
  { id: 14, title: "MEJOR QUE NOSOTROS", dur: "46:32", thumb: "https://static.wixstatic.com/media/859174_ce1bbad9515744ffb11acefb8944692f~mv2.jpg", url: "https://ok.ru/videoembed/15512470030848" },
  { id: 15, title: "PORQUE YO VOY", dur: "49:57", thumb: "https://static.wixstatic.com/media/859174_86052773b58b4899a21575e6b01e831c~mv2.jpg", url: "https://ok.ru/videoembed/15512471865856" },
  { id: 16, title: "DECENAS DE MILES", dur: "55:17", thumb: "https://static.wixstatic.com/media/859174_1b571add7a794d77b023e142d5e1d0f3~mv2.jpg", url: "https://ok.ru/videoembed/15512601692672" },
];

const ReyesEleccionMobile = () => {
  const router = useRouter();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inMyList, setInMyList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const SERIES_ID = 23;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    
    const saved = localStorage.getItem('reyes_eleccion_mobile_last_ep');
    if (saved) {
        const idx = parseInt(saved);
        if (reyesEleccionEpisodes[idx]) setCurrentIdx(idx);
    }
    
    const list = JSON.parse(localStorage.getItem('myList') || '[]');
    if (list.includes(SERIES_ID)) setInMyList(true);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      const normalize = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      const term = normalize(searchQuery);
      const filtered = allSeries.filter(serie => normalize(serie.title).includes(term));
      setSearchResults(filtered);
    } else { setSearchResults([]); }
  }, [searchQuery]);

  const openEpisode = (idx: number) => {
    setSelectedVideo(reyesEleccionEpisodes[idx].url);
    setCurrentIdx(idx);
    localStorage.setItem('reyes_eleccion_mobile_last_ep', idx.toString());
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
      <div className="fixed inset-0 z-[2000] bg-[#050608] flex flex-col overflow-hidden text-left">
        <Head><title>Reproduciendo: {reyesEleccionEpisodes[currentIdx].title}</title></Head>
        <div className="px-6 h-[85px] flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent border-b border-white/5 z-10">
          <div className="flex flex-col border-l-4 border-[#F09800] pl-4 py-1">
            <span className="text-[9px] font-black text-[#F09800] uppercase tracking-[0.3em] mb-1">Reyes: La Elección</span>
            <h2 className="text-sm font-black tracking-tight uppercase truncate max-w-[200px]">Ep. {reyesEleccionEpisodes[currentIdx].id} | {reyesEleccionEpisodes[currentIdx].title}</h2>
          </div>
          <button onClick={() => setSelectedVideo(null)} className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full border border-white/10 active:scale-90 transition-all">
            <IoClose size={24} />
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
            <button disabled={currentIdx === reyesEleccionEpisodes.length - 1} onClick={() => openEpisode(currentIdx + 1)} className="flex flex-col items-center gap-2 group disabled:opacity-5">
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
      <Head><title>Reyes: La Elección — Estudios 421</title></Head>
      
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

      {/* RESULTADOS DE BÚSQUEDA */}
      {searchQuery.length > 0 && (
        <div className="fixed inset-0 bg-black z-[105] pt-24 px-4 overflow-y-auto pb-20">
          <h2 className="text-white text-sm font-black mb-6 uppercase tracking-widest flex items-center gap-2"><span className="w-1 h-4 bg-[#F09800]" />RESULTADOS: "{searchQuery}"</h2>
          <div className="grid grid-cols-2 gap-4">
            {searchResults.map((m) => (
              <Link key={m.id} href={m.path} onClick={() => setSearchQuery("")}><div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-2xl"><Image src={m.banner} alt={m.title} fill className="object-cover" unoptimized /></div></Link>
            ))}
          </div>
        </div>
      )}

      {/* MENÚ LATERAL */}
      <div className={`fixed inset-0 bg-black/98 z-[100] transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full pt-24 px-8 gap-8 text-left">
          <p className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/10 pb-2">Navegación</p>
          <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white">Inicio</Link>
          <Link href="/series-biblicas" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white">Series Bíblicas</Link>
          <Link href="/series-tv" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white">Series TV</Link>
          <Link href="/peliculas" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white">Películas</Link>
          <p className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/10 pb-2 mt-4">Idioma</p>
          <div className="flex gap-6">
            {[{l:'ESP', i:'367960b11c1c44ba89cd1582fd1b5776', p:'/serie/reyes-la-eleccion'}, {l:'ENG', i:'35112d9ffe234d6f9dcef16cf8f7544e', p:'/en/serie/kings-the-choosing'}, {l:'PT', i:'830f1c20656e4d44a819bedfc13a22cc', p:'/pt/serie/reis-a-escolha'}].map((lang) => (
              <Link key={lang.l} href={lang.p} className="flex flex-col items-center gap-2 active:scale-95 transition-transform">
                <img src={`https://static.wixstatic.com/media/859174_${lang.i}~mv2.png`} alt={lang.l} className="w-10 h-10 object-contain" /><span className="text-[10px] text-white font-bold">{lang.l}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* HERO BANNER */}
      <div className="relative w-full pt-0 bg-black shadow-2xl">
        <div className="w-full aspect-[4/3] relative">
          <img src="https://static.wixstatic.com/media/859174_12a38d34df824a2399432a632688f86e~mv2.jpg" className="w-full h-full object-contain" alt="Banner" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        </div>
        <div className="px-4 -mt-14 flex flex-col gap-3 relative z-20">
          <button onClick={() => openEpisode(currentIdx)} className="w-full bg-white text-black font-black py-4 rounded-md text-sm active:scale-95 transition-transform uppercase tracking-[0.2em] shadow-2xl">
            {currentIdx === 0 ? "▶ Ver Ahora" : `▶ Continuar Ep. ${reyesEleccionEpisodes[currentIdx].id}`}
          </button>
          <div className="flex gap-3">
            <button onClick={toggleMyList} className={`flex-1 py-3.5 rounded-md text-[10px] font-black border transition-all tracking-widest ${inMyList ? 'bg-[#F09800] border-[#F09800] text-black' : 'bg-white/5 border-white/10 text-white active:bg-white/20'}`}>
              {inMyList ? <><IoCheckmarkCircle className="inline mr-1" /> EN MI LISTA</> : '+ MI LISTA'}
            </button>
            <button onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS', '_blank')} className="flex-1 bg-white/5 backdrop-blur-md py-3.5 rounded-md text-[10px] font-black border border-white/10 text-white active:bg-white/20 uppercase tracking-widest text-center">❤ Donar</button>
          </div>
        </div>
      </div>

      {/* LISTA DE EPISODIOS LIMPIA */}
      <div className="px-5 mt-12 mb-20">
        <header className="flex items-center gap-3 mb-6 border-b border-white/5 pb-3">
          <div className="w-1 h-5 bg-[#F09800]"></div>
          <h2 className="text-[11px] font-black text-white/50 tracking-[0.3em] uppercase">Episodios Disponibles</h2>
        </header>
        <div className="grid grid-cols-2 gap-5 text-left">
          {reyesEleccionEpisodes.map((ep, index) => (
            <div key={ep.id} className="flex flex-col gap-2.5 transition-all active:scale-95" onClick={() => openEpisode(index)}>
              <div className={`relative aspect-video rounded-lg overflow-hidden border-2 ${currentIdx === index ? 'border-[#F09800] shadow-[0_0_15px_rgba(240,152,0,0.2)]' : 'border-white/5'}`}>
                <img src={ep.thumb} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-black/20" />
                <span className="absolute bottom-1.5 right-1.5 bg-black/80 backdrop-blur-md px-2 py-0.5 text-[8px] font-black rounded border border-white/10 uppercase">{ep.dur}</span>
              </div>
              <h3 className="font-bold text-[10px] truncate uppercase tracking-tight text-white/90">
                EP. {ep.id} {ep.title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* SIGUIENTE TEMPORADA */}
      <div className="px-5 mb-24">
          <Link href="/serie/reyes-la-persecucion">
              <button className="w-full bg-[#FF8A00] text-black font-black py-4 rounded-xl text-xs uppercase tracking-widest active:scale-95 transition-all shadow-xl">
                  Ver Siguiente Temporada
              </button>
          </Link>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#0a0a0a] text-gray-500 py-10 px-6 border-t border-white/5 text-left">
        <div className="flex justify-start gap-6 mb-8 text-xl">
          <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="active:text-[#F09800] transition-colors"><FaFacebookF /></a>
          <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="active:text-[#F09800] transition-colors"><FaInstagram /></a>
          <a href="https://www.tiktok.com/@estudios421_com?_r=1&_t=ZS-93K0Cjg8TzM" target="_blank" rel="noreferrer" className="active:text-[#F09800] transition-colors"><FaTiktok /></a>
          <a href="https://youtube.com/@estudios421max?si=IXSltDZuOmclG7KL" target="_blank" rel="noreferrer" className="active:text-[#F09800] transition-colors"><FaYoutube /></a>
          <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="active:text-[#F09800] transition-colors"><FaXTwitter /></a>
        </div>
        <div className="space-y-4 mb-8 text-[10px]">
          <p className="leading-relaxed">© {new Date().getFullYear()} Estudios 421. Todos los derechos reservados sobre el diseño y edición de la plataforma.</p>
          <p className="leading-relaxed text-gray-600">Aviso Legal: El contenido audiovisual compartido en este sitio pertenece a sus respectivos propietarios. Estudios 421 es una plataforma sin fines de lucro para la difusión de contenido bíblico.</p>
        </div>
        <div className="flex flex-col gap-4 text-[10px] font-bold uppercase tracking-widest border-t border-white/5 pt-8">
          <Link href="/politica-de-privacidad">Política de privacidad</Link>
          <Link href="/terminos-de-uso">Términos de uso</Link>
          <Link href="/cookies">Configuración de cookies</Link>
          <Link href="/ayuda">Centro de ayuda</Link>
        </div>
      </footer>
    </div>
  );
};

export default ReyesEleccionMobile;
