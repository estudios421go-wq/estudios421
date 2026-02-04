import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoCloseOutline, IoChevronBack, IoChevronForward, IoList, IoClose, IoCheckmarkCircle } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { allSeries } from '../../../data/series';

// --- CONFIGURACIÓN DE EPISODIOS (ID: 16) ---
const jesusEpisodes = [
  "https://ok.ru/videoembed/3044612115040", "https://ok.ru/videoembed/3049233975904", "https://ok.ru/videoembed/3260836088416",
  "https://ok.ru/videoembed/3262947002976", "https://ok.ru/videoembed/3262987766368", "https://ok.ru/videoembed/3262987831904",
  "https://ok.ru/videoembed/3262987897440", "https://ok.ru/videoembed/3262987962976", "https://ok.ru/videoembed/3262988094048",
  "https://ok.ru/videoembed/3262988159584", "https://ok.ru/videoembed/3262988356192", "https://ok.ru/videoembed/3262988487264",
  "https://ok.ru/videoembed/3262988552800", "https://ok.ru/videoembed/3262988618336", "https://ok.ru/videoembed/3262988749408",
  "https://ok.ru/videoembed/3262988814944", "https://ok.ru/videoembed/3262988880480", "https://ok.ru/videoembed/3262989011552",
  "https://ok.ru/videoembed/3262989077088", "https://ok.ru/videoembed/3262989273696", "https://ok.ru/videoembed/3270870960736",
  "https://ok.ru/videoembed/3270871485024", "https://ok.ru/videoembed/3270872140384", "https://ok.ru/videoembed/3270872336992",
  "https://ok.ru/videoembed/3270872599136", "https://ok.ru/videoembed/3270872861280", "https://ok.ru/videoembed/3270873057888",
  "https://ok.ru/videoembed/3270873254496", "https://ok.ru/videoembed/3270873516640", "https://ok.ru/videoembed/3270873713248",
  "https://ok.ru/videoembed/3270873909856", "https://ok.ru/videoembed/3270874040928", "https://ok.ru/videoembed/3270874368608",
  "https://ok.ru/videoembed/3270874696288", "https://ok.ru/videoembed/3270874958432", "https://ok.ru/videoembed/3270875155040",
  "https://ok.ru/videoembed/3270875482720", "https://ok.ru/videoembed/3270875941472", "https://ok.ru/videoembed/3270876203616",
  "https://ok.ru/videoembed/3270876400224", "https://ok.ru/videoembed/3270876662368", "https://ok.ru/videoembed/3270876990048",
  "https://ok.ru/videoembed/3270877186656", "https://ok.ru/videoembed/3270877317728", "https://ok.ru/videoembed/3273245657696",
  "https://ok.ru/videoembed/3273246444128", "https://ok.ru/videoembed/3273246640736", "https://ok.ru/videoembed/3273246771808",
  "https://ok.ru/videoembed/3273246968416", "https://ok.ru/videoembed/3273247165024", "https://ok.ru/videoembed/3285302905440",
  "https://ok.ru/videoembed/3285303233120", "https://ok.ru/videoembed/3285303298656", "https://ok.ru/videoembed/3285303495264",
  "https://ok.ru/videoembed/3285303691872", "https://ok.ru/videoembed/3285303757408", "https://ok.ru/videoembed/3285303822944",
  "https://ok.ru/videoembed/3285303888480", "https://ok.ru/videoembed/3285304019552", "https://ok.ru/videoembed/3285304150624",
  "https://ok.ru/videoembed/3285304281696", "https://ok.ru/videoembed/3285304347232", "https://ok.ru/videoembed/3285304478304",
  "https://ok.ru/videoembed/3285304674912", "https://ok.ru/videoembed/3285304805984", "https://ok.ru/videoembed/3285304937056",
  "https://ok.ru/videoembed/3285305002592", "https://ok.ru/videoembed/3285305133664", "https://ok.ru/videoembed/3285305199200",
  "https://ok.ru/videoembed/3285305264736", "https://ok.ru/videoembed/3285305330272", "https://ok.ru/videoembed/3285305461344",
  "https://ok.ru/videoembed/3285305526880", "https://ok.ru/videoembed/3285305657952", "https://ok.ru/videoembed/3285305789024",
  "https://ok.ru/videoembed/3285305920096", "https://ok.ru/videoembed/3285305985632", "https://ok.ru/videoembed/3285306116704",
  "https://ok.ru/videoembed/3285306313312", "https://ok.ru/videoembed/3285306378848", "https://ok.ru/videoembed/3285306575456",
  "https://ok.ru/videoembed/3285306772064", "https://ok.ru/videoembed/3285306837600", "https://ok.ru/videoembed/3285306968672",
  "https://ok.ru/videoembed/3289283758688", "https://ok.ru/videoembed/3289284545120", "https://ok.ru/videoembed/3289284741728",
  "https://ok.ru/videoembed/3289284872800", "https://ok.ru/videoembed/3289285069408", "https://ok.ru/videoembed/3289285266016",
  "https://ok.ru/videoembed/3289285528160", "https://ok.ru/videoembed/3296166873696", "https://ok.ru/videoembed/3296167070304",
  "https://ok.ru/videoembed/3297276856928", "https://ok.ru/videoembed/3297277184608", "https://ok.ru/videoembed/3297277250144",
  "https://ok.ru/videoembed/3297277315680", "https://ok.ru/videoembed/3297277708896", "https://ok.ru/videoembed/3297278167648",
  "https://ok.ru/videoembed/3297278298720", "https://ok.ru/videoembed/3297278823008", "https://ok.ru/videoembed/3297278888544",
  "https://ok.ru/videoembed/3297279085152", "https://ok.ru/videoembed/3297279281760", "https://ok.ru/videoembed/3297279543904",
  "https://ok.ru/videoembed/3297279609440", "https://ok.ru/videoembed/3297279740512", "https://ok.ru/videoembed/3297279937120",
  "https://ok.ru/videoembed/3297280133728", "https://ok.ru/videoembed/3297280264800", "https://ok.ru/videoembed/3298439137888",
  "https://ok.ru/videoembed/3298439203424", "https://ok.ru/videoembed/3298439268960", "https://ok.ru/videoembed/3298439334496",
  "https://ok.ru/videoembed/3298439465568", "https://ok.ru/videoembed/3298439531104", "https://ok.ru/videoembed/3298439662176",
  "https://ok.ru/videoembed/3298439727712", "https://ok.ru/videoembed/3298439858784", "https://ok.ru/videoembed/3298439989856",
  "https://ok.ru/videoembed/3298440055392", "https://ok.ru/videoembed/3303378520672", "https://ok.ru/videoembed/3303378717280",
  "https://ok.ru/videoembed/3303382387296", "https://ok.ru/videoembed/3303382452832", "https://ok.ru/videoembed/3303382583904",
  "https://ok.ru/videoembed/3303382649440", "https://ok.ru/videoembed/3303382780512", "https://ok.ru/videoembed/3303382911584",
  "https://ok.ru/videoembed/3303382977120", "https://ok.ru/videoembed/3319894116960", "https://ok.ru/videoembed/3319909255776",
  "https://ok.ru/videoembed/3319909386848", "https://ok.ru/videoembed/3319909452384", "https://ok.ru/videoembed/3319909583456",
  "https://ok.ru/videoembed/3320859069024", "https://ok.ru/videoembed/3320859593312", "https://ok.ru/videoembed/3320860052064",
  "https://ok.ru/videoembed/3320860379744", "https://ok.ru/videoembed/3320860772960", "https://ok.ru/videoembed/3323615840864",
  "https://ok.ru/videoembed/3323620035168", "https://ok.ru/videoembed/3323620624992", "https://ok.ru/videoembed/3323621083744",
  "https://ok.ru/videoembed/3323621214816", "https://ok.ru/videoembed/3323621673568", "https://ok.ru/videoembed/3323622066784",
  "https://ok.ru/videoembed/3323622197856", "https://ok.ru/videoembed/3323622328928", "https://ok.ru/videoembed/3323622656608",
  "https://ok.ru/videoembed/3323622787680", "https://ok.ru/videoembed/3323622984288", "https://ok.ru/videoembed/3323623180896",
  "https://ok.ru/videoembed/3323623377504", "https://ok.ru/videoembed/3323623574112", "https://ok.ru/videoembed/3323624098400",
  "https://ok.ru/videoembed/3323624229472", "https://ok.ru/videoembed/3323624426080", "https://ok.ru/videoembed/3323624557152",
  "https://ok.ru/videoembed/3323625081440", "https://ok.ru/videoembed/3330083523168", "https://ok.ru/videoembed/3330083785312",
  "https://ok.ru/videoembed/3330084112992", "https://ok.ru/videoembed/3330084309600", "https://ok.ru/videoembed/3330084506208",
  "https://ok.ru/videoembed/3330084899424", "https://ok.ru/videoembed/3330085030496", "https://ok.ru/videoembed/3330085358176",
  "https://ok.ru/videoembed/3330085620320", "https://ok.ru/videoembed/3330085816928", "https://ok.ru/videoembed/3330086013536",
  "https://ok.ru/videoembed/3454902405728", "https://ok.ru/videoembed/3454902536800", "https://ok.ru/videoembed/3454902864480",
  "https://ok.ru/videoembed/3454903061088", "https://ok.ru/videoembed/3454903192160", "https://ok.ru/videoembed/3454903388768",
  "https://ok.ru/videoembed/3454903519840", "https://ok.ru/videoembed/3454903650912", "https://ok.ru/videoembed/3454903781984",
  "https://ok.ru/videoembed/3454904371808"
];

const JesusPC = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [inMyList, setInMyList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const SERIES_ID = 16;

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

    const savedEp = localStorage.getItem('jesus_last_ep');
    if (savedEp) {
      const idx = parseInt(savedEp);
      if (idx < jesusEpisodes.length) setCurrentIdx(idx);
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
        jesus: ['jesus', 'milagros', 'pasion', 'nazaret', 'cristo'],
        sanson: ['sanson', 'dalila', 'fuerza', 'filisteos'],
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
    setSelectedVideo(jesusEpisodes[idx]);
    localStorage.setItem('jesus_last_ep', idx.toString());
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
      <Head><title>Jesús — Estudios 421</title></Head>

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
            {[{ n: '', img: '367960b11c1c44ba89cd1582fd1b5776', p: '/serie/jesus' }, 
              { n: 'en', img: '35112d9ffe234d6f9dcef16cf8f7544e', p: '/en/serie/jesus' }, 
              { n: 'pt', img: '830f1c20656e4d44a819bedfc13a22cc', p: '/pt/serie/jesus' }].map((l) => (
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
        <img src="https://static.wixstatic.com/media/859174_7a425fa908884878a615219c76fd0a14~mv2.jpg" className="w-full h-full object-cover" alt="Banner Jesús" />
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

        <div className="grid grid-cols-10 gap-4 max-w-7xl mx-auto bg-white/[0.02] p-10 rounded-2xl border border-white/5">
          {jesusEpisodes.map((_, i) => (
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
              <span className="text-[10px] font-black text-[#FF8A00]/80 uppercase tracking-[0.5em] mb-1">Serie: Jesús</span>
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
            <button disabled={currentIdx === jesusEpisodes.length - 1} onClick={() => openEpisode(currentIdx + 1)} className="group flex items-center gap-6 disabled:opacity-5 transition-all">
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

export default JesusPC;
