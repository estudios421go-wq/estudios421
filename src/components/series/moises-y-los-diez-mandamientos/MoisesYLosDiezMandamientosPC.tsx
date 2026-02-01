import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoChevronBack, IoChevronForward, IoList, IoClose, IoCheckmarkCircle, IoChevronDown } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { allSeries } from '../../../data/series';

// --- CONFIGURACIÓN DE EPISODIOS ---
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

const MoisesPC = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [inMyList, setInMyList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentSeason, setCurrentSeason] = useState(1);
  const [currentIdx, setCurrentIdx] = useState(0);

  const [openT1, setOpenT1] = useState(true);
  const [openT2, setOpenT2] = useState(false);

  const SERIES_ID = 5;

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
    const savedPos = localStorage.getItem('moises_last_pos');
    if (savedPos) {
      const { s, i } = JSON.parse(savedPos);
      setCurrentSeason(s);
      setCurrentIdx(i);
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
    setCurrentSeason(season);
    setCurrentIdx(idx);
    setSelectedVideo(url);
    localStorage.setItem('moises_last_pos', JSON.stringify({ s: season, i: idx }));
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
      <Head><title>Moisés y los Diez Mandamientos — Estudios 421</title></Head>

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
            {[{ n: '', img: '367960b11c1c44ba89cd1582fd1b5776', p: '/serie/moises-y-los-diez-mandamientos' }, 
              { n: 'en', img: '35112d9ffe234d6f9dcef16cf8f7544e', p: '/en/serie/moises-y-los-diez-mandamientos' }, 
              { n: 'pt', img: '830f1c20656e4d44a819bedfc13a22cc', p: '/pt/serie/moises-y-los-diez-mandamientos' }].map((l) => (
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
        <img src="https://static.wixstatic.com/media/859174_bd48f7fab5344a3f8a733a139594a3b7~mv2.jpg" className="w-full h-full object-cover" alt="Banner Moisés" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/10 opacity-70" />
        <div className="absolute bottom-[-30px] left-16 flex gap-6 z-20 items-center">
          <button onClick={() => openEpisode(currentSeason, currentIdx)} className="bg-white text-black font-black py-4 px-12 rounded-sm text-lg hover:bg-[#FF8A00] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-2xl uppercase">
            {currentIdx === 0 && currentSeason === 1 ? "▶ Ver Ahora" : `▶ Continuar T${currentSeason} Ep.${currentIdx + 1}`}
          </button>
          <button onClick={toggleMyList} className={`border py-4 px-10 rounded-sm transition-all uppercase font-bold ${inMyList ? 'bg-[#FF8A00] border-[#FF8A00] text-white' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}>
            {inMyList ? <><IoCheckmarkCircle className="inline mr-2" /> En Mi Lista</> : '+ Mi Lista'}
          </button>
          <button onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS', '_blank')} className="border py-4 px-10 rounded-sm bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all uppercase font-bold">❤ Donar</button>
        </div>
      </div>

      <div className="h-20 bg-black"></div>

      <div className="px-16 mb-32 relative z-10 text-left">
        <header className="flex items-center gap-4 mb-10 border-b border-white/10 pb-4 text-left">
          <div className="w-1.5 h-8 bg-[#FF8A00]"></div>
          <h2 className="text-2xl font-bold tracking-tight uppercase tracking-widest">Episodios Disponibles</h2>
        </header>

        <div className="flex flex-col gap-6 max-w-6xl mx-auto text-left">
          {/* TEMPORADA 1 — AJUSTADA PARA MOSTRAR LOS 176 EPISODIOS */}
          <div className="border border-white/10 rounded-xl overflow-hidden bg-white/[0.02]">
            <button onClick={() => setOpenT1(!openT1)} className="w-full px-8 py-6 flex items-center justify-between hover:bg-white/[0.05] transition-all group">
              <span className="text-xl font-black uppercase tracking-widest group-hover:text-[#FF8A00]">Temporada 1</span>
              <IoChevronDown size={24} className={`transition-transform duration-500 ${openT1 ? 'rotate-180 text-[#FF8A00]' : ''}`} />
            </button>
            <div className={`transition-all duration-700 ease-in-out ${openT1 ? 'max-h-[5000px] opacity-100 py-8 px-8' : 'max-h-0 opacity-0 overflow-hidden'}`}>
              <div className="grid grid-cols-8 gap-4">
                {MoisesT1.map((_, i) => (
                  <button key={i} onClick={() => openEpisode(1, i)} className={`aspect-square rounded-lg font-bold text-sm transition-all border ${currentSeason === 1 && currentIdx === i ? 'bg-[#FF8A00] border-[#FF8A00] text-white' : 'bg-white/5 border-white/10 hover:border-[#FF8A00] hover:text-[#FF8A00]'}`}>
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* TEMPORADA 2 */}
          <div className="border border-white/10 rounded-xl overflow-hidden bg-white/[0.02]">
            <button onClick={() => setOpenT2(!openT2)} className="w-full px-8 py-6 flex items-center justify-between hover:bg-white/[0.05] transition-all group">
              <span className="text-xl font-black uppercase tracking-widest group-hover:text-[#FF8A00]">Temporada 2</span>
              <IoChevronDown size={24} className={`transition-transform duration-500 ${openT2 ? 'rotate-180 text-[#FF8A00]' : ''}`} />
            </button>
            <div className={`transition-all duration-700 ease-in-out ${openT2 ? 'max-h-[2000px] opacity-100 py-8 px-8' : 'max-h-0 opacity-0 overflow-hidden'}`}>
              <div className="grid grid-cols-8 gap-4">
                {MoisesT2.map((_, i) => (
                  <button key={i} onClick={() => openEpisode(2, i)} className={`aspect-square rounded-lg font-bold text-sm transition-all border ${currentSeason === 2 && currentIdx === i ? 'bg-[#FF8A00] border-[#FF8A00] text-white' : 'bg-white/5 border-white/10 hover:border-[#FF8A00] hover:text-[#FF8A00]'}`}>
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 z-[1000] bg-[#050608] flex flex-col animate-fade-in">
          <div className="h-[12vh] min-h-[85px] px-12 flex items-center justify-between bg-gradient-to-b from-[#0a0b0d] to-[#050608] border-b border-white/5">
            <div className="flex flex-col border-l-4 border-[#FF8A00] pl-6 py-1 text-left">
              <span className="text-[10px] font-black text-[#FF8A00]/80 uppercase tracking-[0.5em] mb-1">Serie: Moisés y los Diez Mandamientos</span>
              <h2 className="text-2xl font-black tracking-tighter uppercase leading-none">
                T{currentSeason} <span className="text-white/20 mx-3">/</span> Episodio {currentIdx + 1}
              </h2>
            </div>
            <button onClick={closePlayer} className="group flex items-center gap-4 bg-white/[0.03] px-8 py-3.5 rounded-full border border-white/10 hover:bg-[#FF8A00] hover:scale-105 transition-all">
              <span className="text-[11px] font-black uppercase tracking-[0.2em] group-hover:text-black">Cerrar Video</span>
              <IoClose size={24} className="group-hover:rotate-90 group-hover:text-black transition-all" />
            </button>
          </div>
          <div className="flex-grow bg-black relative">
            <iframe src={selectedVideo + "?autoplay=1"} className="absolute inset-0 w-full h-full border-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" allow="autoplay; fullscreen" allowFullScreen />
          </div>
          <div className="h-[13vh] min-h-[100px] px-16 bg-gradient-to-t from-[#0a0b0d] border-t border-white/5 flex items-center justify-between">
            <button disabled={currentIdx === 0} onClick={() => openEpisode(currentSeason, currentIdx - 1)} className="group flex items-center gap-5 disabled:opacity-5 transition-all">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] group-hover:bg-white group-hover:text-black transition-all shadow-xl">
                <IoChevronBack size={24} />
              </div>
              <div className="flex flex-col items-start text-left">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FF8A00]/60 text-left">Anterior</span>
                <span className="text-sm font-bold uppercase text-white/80">Episodio {currentIdx}</span>
              </div>
            </button>
            <button onClick={closePlayer} className="flex items-center gap-4 bg-white/[0.03] px-10 py-4 rounded-2xl border border-white/5 hover:bg-white/[0.08] transition-all">
              <IoList size={28} className="text-[#FF8A00]" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-white/60">Lista de Capítulos</span>
            </button>
            <button 
              disabled={currentSeason === 1 ? currentIdx === MoisesT1.length - 1 : currentIdx === MoisesT2.length - 1} 
              onClick={() => openEpisode(currentSeason, currentIdx + 1)} 
              className="group flex items-center gap-6 disabled:opacity-5 transition-all"
            >
              <div className="flex flex-col items-end text-right">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FF8A00] text-right">Siguiente</span>
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

export default MoisesPC;
