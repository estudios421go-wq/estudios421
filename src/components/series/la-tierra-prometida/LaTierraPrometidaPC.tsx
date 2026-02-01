import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoCloseOutline, IoChevronBack, IoChevronForward, IoList, IoClose, IoCheckmarkCircle } from 'react-icons/io5';
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

const LaTierraPrometidaPC = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [inMyList, setInMyList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const SERIES_ID = 6;

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

    const savedEp = localStorage.getItem('tierra_prometida_last_ep');
    if (savedEp) {
      const idx = parseInt(savedEp);
      if (idx < tierraPrometidaEpisodes.length) setCurrentIdx(idx);
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
        moises: ['moises', 'diez mandamientos', 'egipto', 'tierra prometida'],
        egipto: ['jose', 'moises', 'diez mandamientos', 'egipto'],
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
    setSelectedVideo(tierraPrometidaEpisodes[idx]);
    localStorage.setItem('tierra_prometida_last_ep', idx.toString());
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
      <Head><title>La Tierra Prometida — Estudios 421</title></Head>

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
            {[{ n: '', img: '367960b11c1c44ba89cd1582fd1b5776', p: '/serie/la-tierra-prometida' }, 
              { n: 'en', img: '35112d9ffe234d6f9dcef16cf8f7544e', p: '/en/serie/la-tierra-prometida' }, 
              { n: 'pt', img: '830f1c20656e4d44a819bedfc13a22cc', p: '/pt/serie/la-tierra-prometida' }].map((l) => (
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
        <img src="https://static.wixstatic.com/media/859174_32aa416657064e87abdce1068640ad25~mv2.jpg" className="w-full h-full object-cover" alt="Banner La Tierra Prometida" />
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

      <div className="h-20 bg-black"></div>

      <div className="px-16 mb-32 relative z-10">
        <header className="flex items-center gap-4 mb-10 border-b border-white/10 pb-4">
          <div className="w-1.5 h-8 bg-[#FF8A00]"></div>
          <h2 className="text-2xl font-bold tracking-tight uppercase">Episodios Disponibles</h2>
        </header>

        {/* GRILLA DE EPISODIOS SIMPLIFICADA */}
        <div className="grid grid-cols-10 gap-4 max-w-7xl mx-auto bg-white/[0.02] p-10 rounded-2xl border border-white/5">
          {tierraPrometidaEpisodes.map((_, i) => (
            <button key={i} onClick={() => openEpisode(i)} className={`aspect-square rounded-lg font-black text-sm transition-all border-2 ${currentIdx === i ? 'bg-[#FF8A00] border-[#FF8A00] text-black shadow-[0_0_20px_rgba(255,138,0,0.3)] scale-110' : 'bg-white/5 border-white/10 hover:border-[#FF8A00] hover:text-[#FF8A00] hover:scale-105'}`}>
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 z-[1000] bg-[#050608] flex flex-col animate-fade-in">
          <div className="h-[12vh] min-h-[85px] px-12 flex items-center justify-between bg-gradient-to-b from-[#0a0b0d] to-[#050608] border-b border-white/5">
            <div className="flex flex-col border-l-4 border-[#FF8A00] pl-6 py-1 text-left">
              <span className="text-[10px] font-black text-[#FF8A00]/80 uppercase tracking-[0.5em] mb-1">Serie: La Tierra Prometida</span>
              <h2 className="text-2xl font-black tracking-tighter uppercase leading-none">Episodio {currentIdx + 1}</h2>
            </div>
            <button onClick={closePlayer} className="group flex items-center gap-4 bg-white/[0.03] px-8 py-3.5 rounded-full border border-white/10 hover:bg-[#FF8A00] hover:scale-105 transition-all">
              <span className="text-[11px] font-black uppercase tracking-[0.2em] group-hover:text-black">Cerrar Reproductor</span>
              <IoClose size={24} className="group-hover:rotate-90 group-hover:text-black transition-all" />
            </button>
          </div>
          <div className="flex-grow bg-black relative">
            <iframe src={selectedVideo + "?autoplay=1"} className="absolute inset-0 w-full h-full border-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" allow="autoplay; fullscreen" allowFullScreen />
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
            <button disabled={currentIdx === tierraPrometidaEpisodes.length - 1} onClick={() => openEpisode(currentIdx + 1)} className="group flex items-center gap-6 disabled:opacity-5 transition-all">
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
            <p className="text-[10px] md:text-xs leading-relaxed text-gray-500 max-w-5xl">Aviso Legal: El contenido audiovisual compartido en este sitio pertenece a sus respectivos propietarios y productoras (Record TV, Seriella Productions, Casablanca Productions, Amazon Content Services LLC, entre otros). Estudios 421 es una plataforma sin fines de lucro destinada a la difusión de contenido bíblico.</p>
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

export default LaTierraPrometidaPC;
