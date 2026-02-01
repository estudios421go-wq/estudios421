import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoMenuOutline, IoCloseOutline, IoChevronBack, IoChevronForward, IoList, IoClose, IoCheckmarkCircle } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { allSeries } from '../../../data/series';

// --- CONFIGURACIÓN DE EPISODIOS (ID: 6) ---
const tierraPrometidaEpisodes = [
  "https://ok.ru/videoembed/9813483719351", "https://ok.ru/videoembed/9813483522743", "https://ok.ru/videoembed/9813482867383",
  "https://ok.ru/videoembed/9813482474167", "https://ok.ru/videoembed/9813482408631", "https://ok.ru/videoembed/9810193418935",
  "https://ok.ru/videoembed/9810193091255", "https://ok.ru/videoembed/9810192829111", "https://ok.ru/videoembed/9810192501431",
  "https://ok.ru/videoembed/9810156260023", "https://ok.ru/videoembed/9810155932343", "https://ok.ru/videoembed/9810155408055",
  "https://ok.ru/videoembed/9810154752695", "https://ok.ru/videoembed/9810153179831", "https://ok.ru/videoembed/9810152590007",
  "https://ok.ru/videoembed/9810151606967", "https://ok.ru/videoembed/9810151279287", "https://ok.ru/videoembed/9810151082679",
  "https://ok.ru/videoembed/9810150820535", "https://ok.ru/videoembed/9810150492855", "https://ok.ru/videoembed/9810150099639",
  "https://ok.ru/videoembed/9810149640887", "https://ok.ru/videoembed/9810148330167", "https://ok.ru/videoembed/9810147740343",
  "https://ok.ru/videoembed/9810147412663", "https://ok.ru/videoembed/9810147150519", "https://ok.ru/videoembed/9810114710199",
  "https://ok.ru/videoembed/9810114448055", "https://ok.ru/videoembed/9810114316983", "https://ok.ru/videoembed/9809141238455",
  "https://ok.ru/videoembed/9809140976311", "https://ok.ru/videoembed/9809140714167", "https://ok.ru/videoembed/9809140452023",
  "https://ok.ru/videoembed/9809140320951", "https://ok.ru/videoembed/9809139927735", "https://ok.ru/videoembed/9809138748087",
  "https://ok.ru/videoembed/9809138617015", "https://ok.ru/videoembed/9809138027191", "https://ok.ru/videoembed/9809137830583",
  "https://ok.ru/videoembed/9807333690039", "https://ok.ru/videoembed/9810554981047", "https://ok.ru/videoembed/9807333427895",
  "https://ok.ru/videoembed/9807333296823", "https://ok.ru/videoembed/9807333100215", "https://ok.ru/videoembed/9807332838071",
  "https://ok.ru/videoembed/9807332772535", "https://ok.ru/videoembed/9807332706999", "https://ok.ru/videoembed/9807332641463",
  "https://ok.ru/videoembed/9807332575927", "https://ok.ru/videoembed/9807322942135", "https://ok.ru/videoembed/9807322876599",
  "https://ok.ru/videoembed/9807322614455", "https://ok.ru/videoembed/9807322548919", "https://ok.ru/videoembed/9807322352311",
  "https://ok.ru/videoembed/9807322221239", "https://ok.ru/videoembed/9807322155703", "https://ok.ru/videoembed/9806887979703",
  "https://ok.ru/videoembed/9806887717559", "https://ok.ru/videoembed/9806887586487", "https://ok.ru/videoembed/9806853507767",
  "https://ok.ru/videoembed/9806853180087", "https://ok.ru/videoembed/9806852655799", "https://ok.ru/videoembed/9806852328119",
  "https://ok.ru/videoembed/9806852065975", "https://ok.ru/videoembed/9806851672759", "https://ok.ru/videoembed/9806851279543",
  "https://ok.ru/videoembed/9806851148471", "https://ok.ru/videoembed/9806850886327", "https://ok.ru/videoembed/9806850689719",
  "https://ok.ru/videoembed/9806819953335", "https://ok.ru/videoembed/9806819756727", "https://ok.ru/videoembed/9806819429047",
  "https://ok.ru/videoembed/9806819101367", "https://ok.ru/videoembed/9806818839223", "https://ok.ru/videoembed/9806817790647",
  "https://ok.ru/videoembed/9806817594039", "https://ok.ru/videoembed/9806817397431", "https://ok.ru/videoembed/9806816479927",
  "https://ok.ru/videoembed/9806816283319", "https://ok.ru/videoembed/9806812678839", "https://ok.ru/videoembed/9806805666487",
  "https://ok.ru/videoembed/9806780107447", "https://ok.ru/videoembed/9806779976375", "https://ok.ru/videoembed/9806779714231",
  "https://ok.ru/videoembed/9806174620343", "https://ok.ru/videoembed/9806173964983", "https://ok.ru/videoembed/9806173899447",
  "https://ok.ru/videoembed/9806172981943", "https://ok.ru/videoembed/9806091389623", "https://ok.ru/videoembed/9806051216055",
  "https://ok.ru/videoembed/9806050953911", "https://ok.ru/videoembed/9806050495159", "https://ok.ru/videoembed/9806050167479",
  "https://ok.ru/videoembed/9806031686327", "https://ok.ru/videoembed/9806031424183", "https://ok.ru/videoembed/9806031162039",
  "https://ok.ru/videoembed/9806030506679", "https://ok.ru/videoembed/9806029720247", "https://ok.ru/videoembed/9806028933815",
  "https://ok.ru/videoembed/9805993347767", "https://ok.ru/videoembed/9805992889015", "https://ok.ru/videoembed/9805992364727",
  "https://ok.ru/videoembed/9805992102583", "https://ok.ru/videoembed/9805974211255", "https://ok.ru/videoembed/9805974080183",
  "https://ok.ru/videoembed/9805923682999", "https://ok.ru/videoembed/9805915163319", "https://ok.ru/videoembed/9805914966711",
  "https://ok.ru/videoembed/9805898844855", "https://ok.ru/videoembed/9805300107959", "https://ok.ru/videoembed/9805299976887",
  "https://ok.ru/videoembed/9805299649207", "https://ok.ru/videoembed/9805299387063", "https://ok.ru/videoembed/9805281430199",
  "https://ok.ru/videoembed/9805276514999", "https://ok.ru/videoembed/9805276383927", "https://ok.ru/videoembed/9805276187319",
  "https://ok.ru/videoembed/9805275531959", "https://ok.ru/videoembed/9805263932087", "https://ok.ru/videoembed/9805263669943",
  "https://ok.ru/videoembed/9805263538871", "https://ok.ru/videoembed/9805263342263", "https://ok.ru/videoembed/9805263145655",
  "https://ok.ru/videoembed/9805255150263", "https://ok.ru/videoembed/9805253249719", "https://ok.ru/videoembed/9805248596663",
  "https://ok.ru/videoembed/9805247679159", "https://ok.ru/videoembed/9805247482551", "https://ok.ru/videoembed/9805240666807",
  "https://ok.ru/videoembed/9805235423927", "https://ok.ru/videoembed/9805235227319", "https://ok.ru/videoembed/9805231753911",
  "https://ok.ru/videoembed/9805231557303", "https://ok.ru/videoembed/9805230115511", "https://ok.ru/videoembed/9805229984439",
  "https://ok.ru/videoembed/9805229722295", "https://ok.ru/videoembed/9805224741559", "https://ok.ru/videoembed/9805224610487",
  "https://ok.ru/videoembed/9805224479415", "https://ok.ru/videoembed/9804295572151", "https://ok.ru/videoembed/9804295506615",
  "https://ok.ru/videoembed/9804295441079", "https://ok.ru/videoembed/9804295310007", "https://ok.ru/videoembed/9804295178935",
  "https://ok.ru/videoembed/9804294982327", "https://ok.ru/videoembed/9804294916791", "https://ok.ru/videoembed/9804294851255",
  "https://ok.ru/videoembed/9804294785719", "https://ok.ru/videoembed/9804294589111", "https://ok.ru/videoembed/9804236393143",
  "https://ok.ru/videoembed/9804236327607", "https://ok.ru/videoembed/9804236262071", "https://ok.ru/videoembed/9804233378487",
  "https://ok.ru/videoembed/9804231871159", "https://ok.ru/videoembed/9804231740087", "https://ok.ru/videoembed/9804231543479",
  "https://ok.ru/videoembed/9804225710775", "https://ok.ru/videoembed/9804225579703", "https://ok.ru/videoembed/9804225514167",
  "https://ok.ru/videoembed/9804196416183", "https://ok.ru/videoembed/9804196350647", "https://ok.ru/videoembed/9804196219575",
  "https://ok.ru/videoembed/9804196088503", "https://ok.ru/videoembed/9804195957431", "https://ok.ru/videoembed/9804195891895",
  "https://ok.ru/videoembed/9804191435447", "https://ok.ru/videoembed/9804191304375", "https://ok.ru/videoembed/9804191173303",
  "https://ok.ru/videoembed/9804191107767", "https://ok.ru/videoembed/9804186651319", "https://ok.ru/videoembed/9804186454711",
  "https://ok.ru/videoembed/9804185471671", "https://ok.ru/videoembed/9804184685239", "https://ok.ru/videoembed/9804184619703",
  "https://ok.ru/videoembed/9804183308983", "https://ok.ru/videoembed/9804182522551", "https://ok.ru/videoembed/9804169611959",
  "https://ok.ru/videoembed/9804169349815", "https://ok.ru/videoembed/9804166531767"
];

const LaTierraPrometidaMobile = () => {
  const router = useRouter();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inMyList, setInMyList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const SERIES_ID = 6;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    const saved = localStorage.getItem('tierra_prometida_mobile_last_ep');
    if (saved) setCurrentIdx(parseInt(saved));
    const list = JSON.parse(localStorage.getItem('myList') || '[]');
    if (list.includes(SERIES_ID)) setInMyList(true);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      const normalize = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      const term = normalize(searchQuery);
      const themeMap: { [key: string]: string[] } = {
        moises: ['moises', 'diez mandamientos', 'tierra prometida'],
        egipto: ['jose', 'egipto'],
        jesus: ['jesus', 'milagros', 'pasion']
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
    setSelectedVideo(tierraPrometidaEpisodes[idx]);
    setCurrentIdx(idx);
    localStorage.setItem('tierra_prometida_mobile_last_ep', idx.toString());
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
        <Head><title>Episodio {currentIdx + 1} — La Tierra Prometida</title></Head>
        <div className="px-6 h-[85px] flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent border-b border-white/5 z-10">
          <div className="flex flex-col border-l-4 border-[#F09800] pl-4 py-1">
            <span className="text-[9px] font-black text-[#F09800] uppercase tracking-[0.3em] mb-1">La Tierra Prometida</span>
            <h2 className="text-sm font-black tracking-tight uppercase truncate max-w-[200px]">
              Episodio {currentIdx + 1}
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
              <span className="text-[8px] font-black uppercase tracking-widest text-gray-500 text-center">Anterior</span>
            </button>
            <button onClick={() => setSelectedVideo(null)} className="flex flex-col items-center gap-2 group text-center">
              <div className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center active:bg-white active:text-black transition-all"><IoList size={24} className="text-[#F09800]" /></div>
              <span className="text-[8px] font-black uppercase tracking-widest text-white/40">Episodios</span>
            </button>
            <button disabled={currentIdx === tierraPrometidaEpisodes.length - 1} onClick={() => openEpisode(currentIdx + 1)} className="flex flex-col items-center gap-2 group disabled:opacity-5 text-center">
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
      <Head><title>La Tierra Prometida — Estudios 421</title></Head>
      
      <nav className={`fixed top-0 w-full z-[110] px-4 py-3 flex items-center gap-4 transition-all duration-300 ${isScrolled || isMenuOpen || searchQuery.length > 0 ? 'bg-black shadow-lg' : 'bg-gradient-to-b from-black/90 to-transparent'}`}>
        <div className="flex items-center gap-2 flex-shrink-0">
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

      {searchQuery.length > 0 && (
        <div className="fixed inset-0 bg-black z-[105] pt-24 px-4 overflow-y-auto pb-20">
          <h2 className="text-white text-sm font-black mb-6 uppercase tracking-widest flex items-center gap-2"><span className="w-1 h-4 bg-[#F09800]" />Resultados: "{searchQuery}"</h2>
          <div className="grid grid-cols-2 gap-4 text-left">
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
            {[{l:'ESP', i:'367960b11c1c44ba89cd1582fd1b5776', p:'/serie/la-tierra-prometida'}, {l:'ENG', i:'35112d9ffe234d6f9dcef16cf8f7544e', p:'/en/serie/la-tierra-prometida'}, {l:'PT', i:'830f1c20656e4d44a819bedfc13a22cc', p:'/pt/serie/la-tierra-prometida'}].map((lang) => (
              <Link key={lang.l} href={lang.p} className="flex flex-col items-center gap-2 active:scale-95 transition-transform text-center">
                <img src={`https://static.wixstatic.com/media/859174_${lang.i}~mv2.png`} alt={lang.l} className="w-10 h-10 object-contain" /><span className="text-[10px] text-white font-bold">{lang.l}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="relative w-full pt-0 bg-black shadow-2xl">
        <div className="w-full aspect-[4/3] relative">
          <img src="https://static.wixstatic.com/media/859174_32aa416657064e87abdce1068640ad25~mv2.jpg" className="w-full h-full object-contain" alt="Banner" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        </div>
        <div className="px-4 -mt-14 flex flex-col gap-3 relative z-20">
          <button onClick={() => openEpisode(currentIdx)} className="w-full bg-white text-black font-black py-4 rounded-md text-sm active:scale-95 transition-transform uppercase tracking-[0.2em] shadow-2xl">
            {currentIdx === 0 ? "▶ Ver Ahora" : `▶ Continuar Ep. ${currentIdx + 1}`}
          </button>
          <div className="flex gap-3">
            <button onClick={toggleMyList} className={`flex-1 py-3.5 rounded-md text-[10px] font-black border transition-all tracking-widest ${inMyList ? 'bg-[#F09800] border-[#F09800] text-black' : 'bg-white/5 border-white/10 text-white active:bg-white/20'}`}>
              {inMyList ? <><IoCheckmarkCircle className="inline mr-1" /> EN MI LISTA</> : '+ MI LISTA'}
            </button>
            <button onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS', '_blank')} className="flex-1 bg-white/5 backdrop-blur-md py-3.5 rounded-md text-[10px] font-black border border-white/10 text-white active:bg-white/20 uppercase tracking-widest text-center">❤ Donar</button>
          </div>
        </div>
      </div>

      {/* SECCIÓN DE EPISODIOS MÓVIL (GRILLA NUMÉRICA) */}
      <div className="px-5 mt-12 mb-20 text-left">
        <header className="flex items-center gap-3 mb-6 border-b border-white/5 pb-3">
          <div className="w-1 h-5 bg-[#F09800]"></div>
          <h2 className="text-[11px] font-black text-white/50 tracking-[0.3em] uppercase">Episodios Disponibles</h2>
        </header>
        <div className="grid grid-cols-5 gap-3 max-w-full text-center">
          {tierraPrometidaEpisodes.map((_, i) => (
            <button key={i} onClick={() => openEpisode(i)} className={`aspect-square rounded-md text-[10px] font-black border transition-all ${currentIdx === i ? 'bg-[#F09800] border-[#F09800] text-black shadow-[0_0_10px_rgba(240,152,0,0.4)]' : 'bg-white/5 border-white/10 text-white/60 active:bg-white/10'}`}>
              {i + 1}
            </button>
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
          <p className="text-[10px] leading-relaxed">© {new Date().getFullYear()} Estudios 421. Todos los derechos reservados.</p>
          <p className="text-[9px] leading-relaxed text-gray-600">Aviso Legal: El contenido audiovisual compartido en este sitio pertenece a sus respectivos propietarios. Estudios 421 es una plataforma sin fines de lucro para la difusión de contenido bíblico.</p>
        </div>
        <div className="flex flex-col gap-4 text-[10px] font-bold uppercase tracking-widest border-t border-white/5 pt-8">
          <Link href="/politica-de-privacidad">Política de privacidad</Link>
          <Link href="/terminos-de-uso">Términos de uso</Link>
          <Link href="/cookies">Configuración de cookies</Link>
          <Link href="/anuncios">Especificaciones de anuncios</Link>
          <Link href="/ayuda">Centro de ayuda</Link>
        </div>
      </footer>
    </div>
  );
};

export default LaTierraPrometidaMobile;
