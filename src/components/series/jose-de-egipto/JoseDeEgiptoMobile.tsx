import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoMenuOutline, IoCloseOutline, IoChevronBack, IoChevronForward, IoList, IoClose, IoCheckmarkCircle } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { allSeries } from '../../../data/series';

// BASE DE DATOS REEMPLAZADA AL 100% (MANTENIENDO TU DISEÑO)
const joseEpisodes = [
  { id: 1, title: "El nacimiento de José", dur: "42:50", thumb: "https://static.wixstatic.com/media/859174_b44bad1703f7498ab87ffc2899850ed7~mv2.jpg", url: "https://ok.ru/videoembed/14201500797440" },
  { id: 2, title: "Espadas desaparecidas", dur: "41:20", thumb: "https://static.wixstatic.com/media/859174_04e0e0290e5b4812a701e159ffdce225~mv2.jpg", url: "https://ok.ru/videoembed/14202233752064" },
  { id: 3, title: "Salvados por la tormenta", dur: "42:46", thumb: "https://static.wixstatic.com/media/859174_fa024efd1a9242e6911adc037fc17058~mv2.jpg", url: "https://ok.ru/videoembed/14202488490496" },
  { id: 4, title: "Privilegios y celos", dur: "42:50", thumb: "https://static.wixstatic.com/media/859174_d196ab94593b4992a2ec6fac714bb91e~mv2.jpg", url: "https://ok.ru/videoembed/14202491636224" },
  { id: 5, title: "Clemencia en el campo", dur: "42:08", thumb: "https://static.wixstatic.com/media/859174_85bf93bcc19647e19992cd6ba83fc345~mv2.jpg", url: "https://ok.ru/videoembed/14202493209088" },
  { id: 6, title: "El pozo del sufrimiento", dur: "41:59", thumb: "https://static.wixstatic.com/media/859174_f2232a43af444ac79066a4ebd9eabefc~mv2.jpg", url: "https://ok.ru/videoembed/14202495502848" },
  { id: 7, title: "Llegada a Egipto", dur: "43:36", thumb: "https://static.wixstatic.com/media/859174_d7cce2bce30141f8b88197247ca7eae3~mv2.jpg", url: "https://ok.ru/videoembed/14202701548032" },
  { id: 8, title: "Huida inesperada", dur: "43:17", thumb: "https://static.wixstatic.com/media/859174_30fa53f8486c45f2ba234f081e926ecb~mv2.jpg", url: "https://ok.ru/videoembed/14202703710720" },
  { id: 9, title: "Confesiones ocultas", dur: "43:19", thumb: "https://static.wixstatic.com/media/859174_d0cf09bdebe84778b1dc8c6594d77df7~mv2.jpg", url: "https://ok.ru/videoembed/14202705086976" },
  { id: 10, title: "Fidelidad puesta a prueba", dur: "42:42", thumb: "https://static.wixstatic.com/media/859174_d4b83ba525714ddab298a831494f4dd1~mv2.jpg", url: "https://ok.ru/videoembed/14202726844928" },
  { id: 11, title: "Decisiones prohibidas", dur: "43:18", thumb: "https://static.wixstatic.com/media/859174_56f0a2b0536f46eb96af799c073b4ae3~mv2.jpg", url: "https://ok.ru/videoembed/14540463606272" },
  { id: 12, title: "La verdad revelada", dur: "43:23", thumb: "https://static.wixstatic.com/media/859174_4a4c48e7687c437d91f94f83438c726f~mv2.jpg", url: "https://ok.ru/videoembed/14540464916992" },
  { id: 13, title: "Planes de traición", dur: "43:21", thumb: "https://static.wixstatic.com/media/859174_e49b213150b94ab987c2c960c2d3d89e~mv2.jpg", url: "https://ok.ru/videoembed/14540466620928" },
  { id: 14, title: "Sabiduría egipcia", dur: "41:21", thumb: "https://static.wixstatic.com/media/859174_b740a577b4e241b1ab9352239a0bd135~mv2.jpg", url: "https://ok.ru/videoembed/14556467038720" },
  { id: 15, title: "Sin noticias del pasado", dur: "43:21", thumb: "https://static.wixstatic.com/media/859174_8daae9eb494f435f8dc3a53b4a0eb9ee~mv2.jpg", url: "https://ok.ru/videoembed/14556484078080" },
  { id: 16, title: "Deseo y traición", dur: "42:11", thumb: "https://static.wixstatic.com/media/859174_f4968b0eae3443ee95950fc5e79bc800~mv2.jpg", url: "https://ok.ru/videoembed/14556484536832" },
  { id: 17, title: "El significado de los sueños", dur: "42:34", thumb: "https://static.wixstatic.com/media/859174_e655497fab594a7dbb9dc56028484568~mv2.jpg", url: "https://ok.ru/videoembed/14556636449280" },
  { id: 18, title: "Caída en desgracia", dur: "42:09", thumb: "https://static.wixstatic.com/media/859174_8427e058b1df4ce594242b23cb33a0e9~mv2.jpg", url: "https://ok.ru/videoembed/14556636908032" },
  { id: 19, title: "El precio de la verdad", dur: "42:02", thumb: "https://static.wixstatic.com/media/859174_6c7fc3ce3dac41f0aa7703f486074ad1~mv2.jpg", url: "https://ok.ru/videoembed/14556762999296" },
  { id: 20, title: "De esclavo a gobernador", dur: "42:09", thumb: "https://static.wixstatic.com/media/859174_74b0f8e6e0db46b69207a8a2f1046450~mv2.jpg", url: "https://ok.ru/videoembed/14556763654656" },
  { id: 21, title: "Revelaciones peligrosas", dur: "42:37", thumb: "https://static.wixstatic.com/media/859174_2ce9f56b09984eeb92356e3dba4f472e~mv2.jpg", url: "https://ok.ru/videoembed/14556764310016" },
  { id: 22, title: "Dolor y confesiones", dur: "42:31", thumb: "https://static.wixstatic.com/media/859174_8ae4948f1b8f4332874878c7a4d90d6c~mv2.jpg", url: "https://ok.ru/videoembed/14556764703232" },
  { id: 23, title: "Juicio y pesadillas", dur: "41:42", thumb: "https://static.wixstatic.com/media/859174_65288823091c423ead0a40284889c330~mv2.jpg", url: "https://ok.ru/videoembed/14556765030912" },
  { id: 24, title: "El poder de los sueños", dur: "43:36", thumb: "https://static.wixstatic.com/media/859174_f4b598fae5914ee7a1bb1615b1889e4d~mv2.jpg", url: "https://ok.ru/videoembed/14540486609408" },
  { id: 25, title: "Ascenso amenazado", dur: "39:00", thumb: "https://static.wixstatic.com/media/859174_d4e8dbf5e22a40a2ad7eadf1361388c0~mv2.jpg", url: "https://ok.ru/videoembed/14540488313344" },
  { id: 26, title: "Objetivo del traidor", dur: "42:42", thumb: "https://static.wixstatic.com/media/859174_018c912a00804ef9a9e7a7244f181428~mv2.jpg", url: "https://ok.ru/videoembed/14540489886208" },
  { id: 27, title: "Peligro en el palacio", dur: "42:25", thumb: "https://static.wixstatic.com/media/859174_770b78cf63b9488295dc20e0c0c4bd47~mv2.jpg", url: "https://ok.ru/videoembed/14540492507648" },
  { id: 28, title: "Hambre y castigo", dur: "42:37", thumb: "https://static.wixstatic.com/media/859174_d9cbbe9380894663bb2727450cda429f~mv2.jpg", url: "https://ok.ru/videoembed/14540494080512" },
  { id: 29, title: "En Egipto", dur: "42:29", thumb: "https://static.wixstatic.com/media/859174_21d59b65bd4a477b8e0afe08575a37f9~mv2.jpg", url: "https://ok.ru/videoembed/14556779842048" },
  { id: 30, title: "Reencuentro inesperado", dur: "42:29", thumb: "https://static.wixstatic.com/media/859174_c7baf40be24d4bb2bf254f921f5c1f8d~mv2.jpg", url: "https://ok.ru/videoembed/14540497029632" },
  { id: 31, title: "El dilema de José", dur: "42:30", thumb: "https://static.wixstatic.com/media/859174_f850e4ca54b741b3ab0aa845734af9f3~mv2.jpg", url: "https://ok.ru/videoembed/14540498471424" },
  { id: 32, title: "Padre tu hijo esta vivo", dur: "41:46", thumb: "https://static.wixstatic.com/media/859174_8acdce69414d43d7af92b43fbeaedd17~mv2.jpg", url: "https://ok.ru/videoembed/14540500240896" },
  { id: 33, title: "Amor y despedida", dur: "38:56", thumb: "https://static.wixstatic.com/media/859174_aabf06782221457f8f48f03c18e4403e~mv2.jpg", url: "https://ok.ru/videoembed/14540502272512" }
];

const JoseDeEgiptoMobile = () => {
  const router = useRouter();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inMyList, setInMyList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // SERIES_ID según data/series.ts para José de Egipto
  const SERIES_ID = 4;

  useEffect(() => {
    // --- BLINDAJE MÓVIL ---
    const handlePrevent = (e: any) => e.preventDefault();
    document.addEventListener('contextmenu', handlePrevent);
    document.addEventListener('dragstart', handlePrevent);
    
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    
    const saved = localStorage.getItem('jose_last_ep');
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
        ester: ['ester', 'reina de persia', 'persia', 'nehemias', 'artajerjes'],
        biblia: ['biblia', 'continua', 'testamento', 'milagros']
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
    setSelectedVideo(joseEpisodes[idx].url);
    setCurrentIdx(idx);
    localStorage.setItem('jose_last_ep', idx.toString());
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
        <Head><title>Reproduciendo: {joseEpisodes[currentIdx].title}</title></Head>
        <div className="px-6 h-[85px] flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent border-b border-white/5 z-10">
          <div className="flex flex-col border-l-4 border-[#F09800] pl-4 py-1">
            <span className="text-[9px] font-black text-[#F09800] uppercase tracking-[0.3em] mb-1">Serie: José de Egipto</span>
            <h2 className="text-sm font-black tracking-tight uppercase truncate max-w-[200px]">
              Ep. {joseEpisodes[currentIdx].id} <span className="text-white/20 mx-1">|</span> {joseEpisodes[currentIdx].title}
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
            <button disabled={currentIdx === joseEpisodes.length - 1} onClick={() => openEpisode(currentIdx + 1)} className="flex flex-col items-center gap-2 group disabled:opacity-5">
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
      <Head><title>José de Egipto — Estudios 421</title></Head>
      
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
            {[{l:'ESP', i:'367960b11c1c44ba89cd1582fd1b5776', p:'/serie/jose-de-egipto'}, {l:'ENG', i:'35112d9ffe234d6f9dcef16cf8f7544e', p:'/en/serie/jose-de-egipto'}, {l:'PT', i:'830f1c20656e4d44a819bedfc13a22cc', p:'/pt/serie/jose-de-egipto'}].map((lang) => (
              <Link key={lang.l} href={lang.p} className="flex flex-col items-center gap-2 active:scale-95 transition-transform">
                <img src={`https://static.wixstatic.com/media/859174_${lang.i}~mv2.png`} alt={lang.l} className="w-10 h-10 object-contain" /><span className="text-[10px] text-white font-bold">{lang.l}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="relative w-full pt-0 bg-black shadow-2xl">
        <div className="w-full aspect-[4/3] relative">
          <img src="https://static.wixstatic.com/media/859174_a13b7e8011764b4f815ab2438e7e0853~mv2.jpg" className="w-full h-full object-contain" alt="Banner" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        </div>
        <div className="px-4 -mt-14 flex flex-col gap-3 relative z-20">
          <button onClick={() => openEpisode(currentIdx)} className="w-full bg-white text-black font-black py-4 rounded-md text-sm active:scale-95 transition-transform uppercase tracking-[0.2em] shadow-2xl">
            {currentIdx === 0 ? "▶ Ver Ahora" : `▶ Continuar Ep. ${joseEpisodes[currentIdx].id}`}
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
          {joseEpisodes.map((ep, index) => (
            <div key={ep.id} className="flex flex-col gap-2.5 active:scale-95 transition-all" onClick={() => openEpisode(index)}>
              <div className={`relative aspect-video rounded-lg overflow-hidden border-2 ${currentIdx === index ? 'border-[#F09800] shadow-[0_0_15px_rgba(240,152,0,0.2)]' : 'border-white/5'}`}>
                <img src={ep.thumb} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-black/20" />
                <span className="absolute bottom-1.5 right-1.5 bg-black/80 backdrop-blur-md px-2 py-0.5 text-[8px] font-black rounded border border-white/10 uppercase">{ep.dur}</span>
              </div>
              <h3 className="font-bold text-[10px] truncate uppercase tracking-tight text-white/90 transition-colors">EP. {ep.id} {ep.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* --- FOOTER BLINDADO Y ENLAZADO (LLAVE MAESTRA LEA) --- */}
      <footer className="bg-[#0a0a0a] text-gray-500 py-10 px-6 border-t border-white/5 text-left unselectable">
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
        .unselectable { -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }
        img { pointer-events: none !important; }
      `}</style>
    </div>
  );
};

export default JoseDeEgiptoMobile;
