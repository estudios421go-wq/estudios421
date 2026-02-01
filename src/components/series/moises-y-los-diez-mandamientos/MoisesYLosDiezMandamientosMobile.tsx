import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoMenuOutline, IoCloseOutline, IoChevronBack, IoChevronForward, IoList, IoClose, IoCheckmarkCircle, IoChevronDown } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { allSeries } from '../../../data/series';

// --- CONFIGURACIÓN DE EPISODIOS (MISMA DATA QUE PC) ---
const MoisesT1 = [
  "https://ok.ru/videoembed/3543349922400", "https://ok.ru/videoembed/3545452317280", "https://ok.ru/videoembed/3546765789792",
  "https://ok.ru/videoembed/3549399485024", "https://ok.ru/videoembed/3553369983584", "https://ok.ru/videoembed/3567162493536",
  "https://ok.ru/videoembed/3567194540640", "https://ok.ru/videoembed/3567537556064", "https://ok.ru/videoembed/3567537752672",
  "https://ok.ru/videoembed/3567537949280", "https://ok.ru/videoembed/3577589860960", "https://ok.ru/videoembed/3577590188640",
  "https://ok.ru/videoembed/3577590319712", "https://ok.ru/videoembed/3577590385248", "https://ok.ru/videoembed/3577590516320",
  "https://ok.ru/videoembed/3577590647392", "https://ok.ru/videoembed/3606527150688", "https://ok.ru/videoembed/3606527281760",
  "https://ok.ru/videoembed/3606527412832", "https://ok.ru/videoembed/3606527609440", "https://ok.ru/videoembed/3631382792800",
  "https://ok.ru/videoembed/3631424670304", "https://ok.ru/videoembed/3631427750496", "https://ok.ru/videoembed/3631431748192",
  "https://ok.ru/videoembed/3631435483744", "https://ok.ru/videoembed/3703203105376", "https://ok.ru/videoembed/3703203236448",
  "https://ok.ru/videoembed/3703203629664", "https://ok.ru/videoembed/3703203826272", "https://ok.ru/videoembed/3703204088416",
  "https://ok.ru/videoembed/3703204285024", "https://ok.ru/videoembed/3703204743776", "https://ok.ru/videoembed/3703204874848",
  "https://ok.ru/videoembed/3703205005920", "https://ok.ru/videoembed/3703205202528", "https://ok.ru/videoembed/3727956707936",
  "https://ok.ru/videoembed/3727979580000", "https://ok.ru/videoembed/3727979842144", "https://ok.ru/videoembed/3727980431968",
  "https://ok.ru/videoembed/3727984888416", "https://ok.ru/videoembed/3796700760672", "https://ok.ru/videoembed/3796701874784",
  "https://ok.ru/videoembed/3796702268000", "https://ok.ru/videoembed/3796703054432", "https://ok.ru/videoembed/3796703447648",
  "https://ok.ru/videoembed/3796705610336", "https://ok.ru/videoembed/3796705872480", "https://ok.ru/videoembed/3796706200160",
  "https://ok.ru/videoembed/3796706658912", "https://ok.ru/videoembed/3796707773024", "https://ok.ru/videoembed/3807059380832",
  "https://ok.ru/videoembed/3838965385824", "https://ok.ru/videoembed/3839058840160", "https://ok.ru/videoembed/3839059757664",
  "https://ok.ru/videoembed/3839060413024", "https://ok.ru/videoembed/3839060806240", "https://ok.ru/videoembed/3839061002848",
  "https://ok.ru/videoembed/3923089033824", "https://ok.ru/videoembed/3923089230432", "https://ok.ru/videoembed/3923089361504",
  "https://ok.ru/videoembed/3923089427040", "https://ok.ru/videoembed/3923089623648", "https://ok.ru/videoembed/3923089689184",
  "https://ok.ru/videoembed/3923089754720", "https://ok.ru/videoembed/3923089820256", "https://ok.ru/videoembed/3923089885792",
  "https://ok.ru/videoembed/3923090016864", "https://ok.ru/videoembed/3966247832160", "https://ok.ru/videoembed/3966248159840",
  "https://ok.ru/videoembed/3966248290912", "https://ok.ru/videoembed/3966248421984", "https://ok.ru/videoembed/3966248487520",
  "https://ok.ru/videoembed/3966248684128", "https://ok.ru/videoembed/3966248749664", "https://ok.ru/videoembed/3966248815200",
  "https://ok.ru/videoembed/4074089220704", "https://ok.ru/videoembed/4074090138208", "https://ok.ru/videoembed/4074091514464",
  "https://ok.ru/videoembed/4074092366432", "https://ok.ru/videoembed/4074092956256", "https://ok.ru/videoembed/4074093415008",
  "https://ok.ru/videoembed/4074095184480", "https://ok.ru/videoembed/4074093939296", "https://ok.ru/videoembed/4074096888416",
  "https://ok.ru/videoembed/4074097674848", "https://ok.ru/videoembed/4074097936992", "https://ok.ru/videoembed/4074098526816",
  "https://ok.ru/videoembed/4074099116640", "https://ok.ru/videoembed/4074099772000", "https://ok.ru/videoembed/4074100361824",
  "https://ok.ru/videoembed/4098112162400", "https://ok.ru/videoembed/4098112227936", "https://ok.ru/videoembed/4098112293472",
  "https://ok.ru/videoembed/4098112359008", "https://ok.ru/videoembed/4098112424544", "https://ok.ru/videoembed/4098112490080",
  "https://ok.ru/videoembed/4098112555616", "https://ok.ru/videoembed/4098112686688", "https://ok.ru/videoembed/4098112817760",
  "https://ok.ru/videoembed/4098112948832", "https://ok.ru/videoembed/4106789587552", "https://ok.ru/videoembed/4112211118688",
  "https://ok.ru/videoembed/4112211577440", "https://ok.ru/videoembed/4124404550240", "https://ok.ru/videoembed/4124405205600",
  "https://ok.ru/videoembed/4127302683232", "https://ok.ru/videoembed/4130289486432", "https://ok.ru/videoembed/4134164957792",
  "https://ok.ru/videoembed/4139409148512", "https://ok.ru/videoembed/4139409672800", "https://ok.ru/videoembed/4280773839456",
  "https://ok.ru/videoembed/4280775150176", "https://ok.ru/videoembed/4280775805536", "https://ok.ru/videoembed/4280800774752",
  "https://ok.ru/videoembed/4281038604896", "https://ok.ru/videoembed/4281173412448", "https://ok.ru/videoembed/4281173740128",
  "https://ok.ru/videoembed/4281174198880", "https://ok.ru/videoembed/4281387059808", "https://ok.ru/videoembed/4281387321952",
  "https://ok.ru/videoembed/4281387911776", "https://ok.ru/videoembed/4281388304992", "https://ok.ru/videoembed/4281388960352",
  "https://ok.ru/videoembed/4281389288032", "https://ok.ru/videoembed/4281391581792", "https://ok.ru/videoembed/4281577376352",
  "https://ok.ru/videoembed/4281579866720", "https://ok.ru/videoembed/4302733380192", "https://ok.ru/videoembed/4302734166624",
  "https://ok.ru/videoembed/4302734821984", "https://ok.ru/videoembed/4302735346272", "https://ok.ru/videoembed/4302737771104",
  "https://ok.ru/videoembed/4302738360928", "https://ok.ru/videoembed/4302738819680", "https://ok.ru/videoembed/4302738885216",
  "https://ok.ru/videoembed/4302740523616", "https://ok.ru/videoembed/4302740785760", "https://ok.ru/videoembed/4302741375584",
  "https://ok.ru/videoembed/4302741768800", "https://ok.ru/videoembed/4302742424160", "https://ok.ru/videoembed/4302742751840",
  "https://ok.ru/videoembed/4331087006304", "https://ok.ru/videoembed/4331087268448", "https://ok.ru/videoembed/4331087661664",
  "https://ok.ru/videoembed/4339955337824", "https://ok.ru/videoembed/4990726965856", "https://ok.ru/videoembed/4990727096928",
  "https://ok.ru/videoembed/4990727424608", "https://ok.ru/videoembed/4990727490144", "https://ok.ru/videoembed/4990728342112",
  "https://ok.ru/videoembed/4990729128544", "https://ok.ru/videoembed/4990730308192", "https://ok.ru/videoembed/4990731356768",
  "https://ok.ru/videoembed/4990732995168", "https://ok.ru/videoembed/4990733781600", "https://ok.ru/videoembed/4990735551072",
  "https://ok.ru/videoembed/4990736534112", "https://ok.ru/videoembed/4990737189472", "https://ok.ru/videoembed/4990737451616",
  "https://ok.ru/videoembed/4990737648224", "https://ok.ru/videoembed/4990738434656", "https://ok.ru/videoembed/4990739024480",
  "https://ok.ru/videoembed/4990739548768", "https://ok.ru/videoembed/4990739810912", "https://ok.ru/videoembed/4990740335200",
  "https://ok.ru/videoembed/4990740793952", "https://ok.ru/videoembed/4990744660576", "https://ok.ru/videoembed/4990744726112",
  "https://ok.ru/videoembed/4990746233440", "https://ok.ru/videoembed/4990749968992", "https://ok.ru/videoembed/4990750296672",
  "https://ok.ru/videoembed/4990750427744", "https://ok.ru/videoembed/4990751279712", "https://ok.ru/videoembed/4990752328288",
  "https://ok.ru/videoembed/4990754622048", "https://ok.ru/videoembed/4990755408480"
];

const MoisesT2 = [
  "https://ok.ru/videoembed/4990757898848", "https://ok.ru/videoembed/4990759144032", "https://ok.ru/videoembed/4990760258144",
  "https://ok.ru/videoembed/4990761044576", "https://ok.ru/videoembed/4990762158688", "https://ok.ru/videoembed/4990763207264",
  "https://ok.ru/videoembed/4991146199648", "https://ok.ru/videoembed/4991691459168", "https://ok.ru/videoembed/4991692638816",
  "https://ok.ru/videoembed/4991693359712", "https://ok.ru/videoembed/4992037423712", "https://ok.ru/videoembed/4992366611040",
  "https://ok.ru/videoembed/4998824069728", "https://ok.ru/videoembed/4999508331104", "https://ok.ru/videoembed/5005017025120",
  "https://ok.ru/videoembed/5005017090656", "https://ok.ru/videoembed/5005017287264", "https://ok.ru/videoembed/5005017483872",
  "https://ok.ru/videoembed/5046035548768", "https://ok.ru/videoembed/5046035876448", "https://ok.ru/videoembed/5046036597344",
  "https://ok.ru/videoembed/5046037056096", "https://ok.ru/videoembed/5080962697824", "https://ok.ru/videoembed/5080962763360",
  "https://ok.ru/videoembed/5080962894432", "https://ok.ru/videoembed/5080963287648", "https://ok.ru/videoembed/5080963549792",
  "https://ok.ru/videoembed/5080963680864", "https://ok.ru/videoembed/5080963746400", "https://ok.ru/videoembed/5875974277728",
  "https://ok.ru/videoembed/5875974343264", "https://ok.ru/videoembed/5875974408800", "https://ok.ru/videoembed/5875974539872",
  "https://ok.ru/videoembed/5878218492512", "https://ok.ru/videoembed/5878342290016", "https://ok.ru/videoembed/5878419032672",
  "https://ok.ru/videoembed/5878419294816", "https://ok.ru/videoembed/5878597421664", "https://ok.ru/videoembed/5878645590624",
  "https://ok.ru/videoembed/5878719318624", "https://ok.ru/videoembed/5881397185120", "https://ok.ru/videoembed/5881397447264",
  "https://ok.ru/videoembed/5881397643872", "https://ok.ru/videoembed/5881907710560", "https://ok.ru/videoembed/5881908038240",
  "https://ok.ru/videoembed/5881908234848", "https://ok.ru/videoembed/5881961384544", "https://ok.ru/videoembed/5882005031520",
  "https://ok.ru/videoembed/5882005097056", "https://ok.ru/videoembed/5882109889120", "https://ok.ru/videoembed/5882143705696",
  "https://ok.ru/videoembed/5882182896224", "https://ok.ru/videoembed/5882223725152", "https://ok.ru/videoembed/5882236308064",
  "https://ok.ru/videoembed/5885258041952", "https://ok.ru/videoembed/5885258173024", "https://ok.ru/videoembed/5885258566240",
  "https://ok.ru/videoembed/5885258893920", "https://ok.ru/videoembed/5885259549280", "https://ok.ru/videoembed/5885259614816",
  "https://ok.ru/videoembed/5885259680352", "https://ok.ru/videoembed/5885309028960", "https://ok.ru/videoembed/5885358770784",
  "https://ok.ru/videoembed/5918457858656", "https://ok.ru/videoembed/5918458055264", "https://ok.ru/videoembed/5918471096928"
];

const MoisesMobile = () => {
  const router = useRouter();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentSeason, setCurrentSeason] = useState(1);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inMyList, setInMyList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Acordeones
  const [openT1, setOpenT1] = useState(true);
  const [openT2, setOpenT2] = useState(false);

  const SERIES_ID = 5;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    
    const savedPos = localStorage.getItem('moises_mobile_last_pos');
    if (savedPos) {
      const { s, i } = JSON.parse(savedPos);
      setCurrentSeason(s);
      setCurrentIdx(i);
    }
    
    const list = JSON.parse(localStorage.getItem('myList') || '[]');
    if (list.includes(SERIES_ID)) setInMyList(true);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      const normalize = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      const term = normalize(searchQuery);
      const themeMap: { [key: string]: string[] } = {
        moises: ['moises', 'diez mandamientos', 'testamento', 'egipto', 'exodo', 'tierra prometida'],
        egipto: ['jose', 'moises', 'diez mandamientos', 'egipto'],
        jesus: ['jesus', 'milagros', 'pasion', 'nazaret'],
        reyes: ['reyes', 'david', 'saul', 'salomon'],
        ester: ['ester', 'reina de persia']
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

  const openEpisode = (season: number, idx: number) => {
    const url = season === 1 ? MoisesT1[idx] : MoisesT2[idx];
    setSelectedVideo(url);
    setCurrentSeason(season);
    setCurrentIdx(idx);
    localStorage.setItem('moises_mobile_last_pos', JSON.stringify({ s: season, i: idx }));
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
        <Head><title>T{currentSeason} Ep. {currentIdx + 1} — Moisés</title></Head>
        <div className="px-6 h-[85px] flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent border-b border-white/5 z-10">
          <div className="flex flex-col border-l-4 border-[#F09800] pl-4 py-1">
            <span className="text-[9px] font-black text-[#F09800] uppercase tracking-[0.3em] mb-1">Moisés y los 10 Mandamientos</span>
            <h2 className="text-sm font-black tracking-tight uppercase truncate max-w-[200px]">
              T{currentSeason} <span className="text-white/20 mx-1">|</span> Episodio {currentIdx + 1}
            </h2>
          </div>
          <button onClick={() => setSelectedVideo(null)} className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full border border-white/10 active:scale-90 transition-all">
            <IoClose className="text-2xl" />
          </button>
        </div>
        <div className="flex-grow flex flex-col relative bg-black items-center justify-center">
          <iframe src={selectedVideo + "?autoplay=1"} className="w-full aspect-video border-none shadow-[0_0_50px_rgba(0,0,0,1)]" allow="autoplay; fullscreen" allowFullScreen />
          <div className="absolute inset-x-0 bottom-8 flex justify-around items-center px-6">
            <button disabled={currentIdx === 0} onClick={() => openEpisode(currentSeason, currentIdx - 1)} className="flex flex-col items-center gap-2 group disabled:opacity-5">
              <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center active:bg-[#F09800] transition-all"><IoChevronBack size={20} /></div>
              <span className="text-[8px] font-black uppercase tracking-widest text-gray-500">Anterior</span>
            </button>
            <button onClick={() => setSelectedVideo(null)} className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center active:bg-white active:text-black transition-all"><IoList size={24} className="text-[#F09800]" /></div>
              <span className="text-[8px] font-black uppercase tracking-widest text-white/40">Capítulos</span>
            </button>
            <button 
              disabled={currentSeason === 1 ? currentIdx === MoisesT1.length - 1 : currentIdx === MoisesT2.length - 1} 
              onClick={() => openEpisode(currentSeason, currentIdx + 1)} 
              className="flex flex-col items-center gap-2 group disabled:opacity-5"
            >
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
      <Head><title>Moisés y los Diez Mandamientos — Estudios 421</title></Head>
      
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
          <p className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/10 pb-2 text-left">Navegación</p>
          <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white">Inicio</Link>
          <Link href="/series-biblicas" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white">Series Biblicas</Link>
          <Link href="/series-tv" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white">Series TV</Link>
          <Link href="/peliculas" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white">Peliculas</Link>
          <p className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/10 pb-2 mt-4 text-left">Idioma</p>
          <div className="flex gap-6">
            {[{l:'ESP', i:'367960b11c1c44ba89cd1582fd1b5776', p:'/serie/moises-y-los-diez-mandamientos'}, {l:'ENG', i:'35112d9ffe234d6f9dcef16cf8f7544e', p:'/en/serie/moises-y-los-diez-mandamientos'}, {l:'PT', i:'830f1c20656e4d44a819bedfc13a22cc', p:'/pt/serie/moises-y-los-diez-mandamientos'}].map((lang) => (
              <Link key={lang.l} href={lang.p} className="flex flex-col items-center gap-2 active:scale-95 transition-transform">
                <img src={`https://static.wixstatic.com/media/859174_${lang.i}~mv2.png`} alt={lang.l} className="w-10 h-10 object-contain" /><span className="text-[10px] text-white font-bold">{lang.l}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="relative w-full pt-0 bg-black shadow-2xl">
        <div className="w-full aspect-[4/3] relative">
          <img src="https://static.wixstatic.com/media/859174_bd48f7fab5344a3f8a733a139594a3b7~mv2.jpg" className="w-full h-full object-contain" alt="Banner" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        </div>
        <div className="px-4 -mt-14 flex flex-col gap-3 relative z-20">
          <button onClick={() => openEpisode(currentSeason, currentIdx)} className="w-full bg-white text-black font-black py-4 rounded-md text-sm active:scale-95 transition-transform uppercase tracking-[0.2em] shadow-2xl">
            {currentIdx === 0 && currentSeason === 1 ? "▶ Ver Ahora" : `▶ Continuar T${currentSeason} Ep. ${currentIdx + 1}`}
          </button>
          <div className="flex gap-3">
            <button onClick={toggleMyList} className={`flex-1 py-3.5 rounded-md text-[10px] font-black border transition-all tracking-widest ${inMyList ? 'bg-[#F09800] border-[#F09800] text-black' : 'bg-white/5 border-white/10 text-white active:bg-white/20'}`}>
              {inMyList ? <><IoCheckmarkCircle className="inline mr-1" /> EN MI LISTA</> : '+ MI LISTA'}
            </button>
            <button onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS', '_blank')} className="flex-1 bg-white/5 backdrop-blur-md py-3.5 rounded-md text-[10px] font-black border border-white/10 text-white active:bg-white/20 uppercase tracking-widest">❤ Donar</button>
          </div>
        </div>
      </div>

      {/* SECCIÓN EPISODIOS ACORDEÓN MÓVIL */}
      <div className="px-5 mt-12 mb-20 text-left">
        <header className="flex items-center gap-3 mb-6 border-b border-white/5 pb-3">
          <div className="w-1 h-5 bg-[#F09800]"></div>
          <h2 className="text-[11px] font-black text-white/50 tracking-[0.3em] uppercase">Episodios Disponibles</h2>
        </header>

        <div className="space-y-4">
          {/* TEMPORADA 1 */}
          <div className="border border-white/5 rounded-lg bg-white/[0.02] overflow-hidden">
            <button onClick={() => setOpenT1(!openT1)} className="w-full px-5 py-4 flex items-center justify-between active:bg-white/5">
              <span className="text-xs font-black uppercase tracking-widest text-white/80">Temporada 1 — Liberación</span>
              <IoChevronDown size={18} className={`transition-transform ${openT1 ? 'rotate-180 text-[#F09800]' : ''}`} />
            </button>
            <div className={`transition-all ${openT1 ? 'h-auto py-6 px-4' : 'h-0 overflow-hidden'}`}>
              <div className="grid grid-cols-5 gap-3">
                {MoisesT1.map((_, i) => (
                  <button key={i} onClick={() => openEpisode(1, i)} className={`aspect-square rounded-md text-[10px] font-bold border transition-all ${currentSeason === 1 && currentIdx === i ? 'bg-[#F09800] border-[#F09800] text-black' : 'bg-white/5 border-white/10 text-white/60'}`}>
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* TEMPORADA 2 */}
          <div className="border border-white/5 rounded-lg bg-white/[0.02] overflow-hidden">
            <button onClick={() => setOpenT2(!openT2)} className="w-full px-5 py-4 flex items-center justify-between active:bg-white/5">
              <span className="text-xs font-black uppercase tracking-widest text-white/80">Temporada 2 — Tierra Prometida</span>
              <IoChevronDown size={18} className={`transition-transform ${openT2 ? 'rotate-180 text-[#F09800]' : ''}`} />
            </button>
            <div className={`transition-all ${openT2 ? 'h-auto py-6 px-4' : 'h-0 overflow-hidden'}`}>
              <div className="grid grid-cols-5 gap-3">
                {MoisesT2.map((_, i) => (
                  <button key={i} onClick={() => openEpisode(2, i)} className={`aspect-square rounded-md text-[10px] font-bold border transition-all ${currentSeason === 2 && currentIdx === i ? 'bg-[#F09800] border-[#F09800] text-black' : 'bg-white/5 border-white/10 text-white/60'}`}>
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
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
          <p className="text-[9px] leading-relaxed text-gray-600">Aviso Legal: El contenido audiovisual compartido en este sitio pertenece a sus respectivos propietarios y productoras (Record TV, Seriella Productions, entre otros). Estudios 421 es una plataforma sin fines de lucro.</p>
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

export default MoisesMobile;
