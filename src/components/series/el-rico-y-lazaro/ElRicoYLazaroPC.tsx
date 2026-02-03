import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoCloseOutline, IoChevronBack, IoChevronForward, IoList, IoClose, IoCheckmarkCircle } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { allSeries } from '../../../data/series';

// --- CONFIGURACIÓN DE EPISODIOS (ID: 11) ---
const ricoLazaroEpisodes = [
  "https://ok.ru/videoembed/3044676405856", "https://ok.ru/videoembed/3073101138528", "https://ok.ru/videoembed/3073113721440",
  "https://ok.ru/videoembed/3510845770336", "https://ok.ru/videoembed/3510845639264", "https://ok.ru/videoembed/3510845573728",
  "https://ok.ru/videoembed/3510845442656", "https://ok.ru/videoembed/3510845311584", "https://ok.ru/videoembed/3510845246048",
  "https://ok.ru/videoembed/3510845180512", "https://ok.ru/videoembed/3510845049440", "https://ok.ru/videoembed/3510844983904",
  "https://ok.ru/videoembed/3510844918368", "https://ok.ru/videoembed/3510844852832", "https://ok.ru/videoembed/3510844787296",
  "https://ok.ru/videoembed/3510844656224", "https://ok.ru/videoembed/3510844590688", "https://ok.ru/videoembed/3510844525152",
  "https://ok.ru/videoembed/3510844328544", "https://ok.ru/videoembed/3510844263008", "https://ok.ru/videoembed/3510844066400",
  "https://ok.ru/videoembed/3510844000864", "https://ok.ru/videoembed/3510843935328", "https://ok.ru/videoembed/3510843738720",
  "https://ok.ru/videoembed/3510843673184", "https://ok.ru/videoembed/3510843476576", "https://ok.ru/videoembed/3510843345504",
  "https://ok.ru/videoembed/3510843279968", "https://ok.ru/videoembed/3510843214432", "https://ok.ru/videoembed/3510842952288",
  "https://ok.ru/videoembed/3510842886752", "https://ok.ru/videoembed/3510842821216", "https://ok.ru/videoembed/3510842690144",
  "https://ok.ru/videoembed/3510842624608", "https://ok.ru/videoembed/3510842493536", "https://ok.ru/videoembed/3510842428000",
  "https://ok.ru/videoembed/3510842362464", "https://ok.ru/videoembed/3510842296928", "https://ok.ru/videoembed/3510842231392",
  "https://ok.ru/videoembed/3503996996192", "https://ok.ru/videoembed/3503996734048", "https://ok.ru/videoembed/3503996668512",
  "https://ok.ru/videoembed/3503996537440", "https://ok.ru/videoembed/3503996275296", "https://ok.ru/videoembed/3503996209760",
  "https://ok.ru/videoembed/3503996013152", "https://ok.ru/videoembed/3503995947616", "https://ok.ru/videoembed/3503995882080",
  "https://ok.ru/videoembed/3503995751008", "https://ok.ru/videoembed/3503995685472", "https://ok.ru/videoembed/3503995554400",
  "https://ok.ru/videoembed/3503995292256", "https://ok.ru/videoembed/3503995030112", "https://ok.ru/videoembed/3503994964576",
  "https://ok.ru/videoembed/3503994899040", "https://ok.ru/videoembed/3503994767968", "https://ok.ru/videoembed/3503994702432",
  "https://ok.ru/videoembed/3503994636896", "https://ok.ru/videoembed/3503994440288", "https://ok.ru/videoembed/3503994309216",
  "https://ok.ru/videoembed/3503994178144", "https://ok.ru/videoembed/3503994047072", "https://ok.ru/videoembed/3503993981536",
  "https://ok.ru/videoembed/3503993850464", "https://ok.ru/videoembed/3503993653856", "https://ok.ru/videoembed/3503993588320",
  "https://ok.ru/videoembed/3503993522784", "https://ok.ru/videoembed/3503993326176", "https://ok.ru/videoembed/3503993260640",
  "https://ok.ru/videoembed/3501428771424", "https://ok.ru/videoembed/3501428640352", "https://ok.ru/videoembed/3501428574816",
  "https://ok.ru/videoembed/3501428247136", "https://ok.ru/videoembed/3501428181600", "https://ok.ru/videoembed/3501427984992",
  "https://ok.ru/videoembed/3501427657312", "https://ok.ru/videoembed/3501427329632", "https://ok.ru/videoembed/3501427067488",
  "https://ok.ru/videoembed/3501426674272", "https://ok.ru/videoembed/3496303135328", "https://ok.ru/videoembed/3496302938720",
  "https://ok.ru/videoembed/3496302873184", "https://ok.ru/videoembed/3496302807648", "https://ok.ru/videoembed/3496302742112",
  "https://ok.ru/videoembed/3496302676576", "https://ok.ru/videoembed/3496302611040", "https://ok.ru/videoembed/3496302545504",
  "https://ok.ru/videoembed/3496302479968", "https://ok.ru/videoembed/3496302348896", "https://ok.ru/videoembed/3496302283360",
  "https://ok.ru/videoembed/3496302217824", "https://ok.ru/videoembed/3496302086752", "https://ok.ru/videoembed/3496297302624",
  "https://ok.ru/videoembed/3496297237088", "https://ok.ru/videoembed/3496297171552", "https://ok.ru/videoembed/3496297106016",
  "https://ok.ru/videoembed/3496297040480", "https://ok.ru/videoembed/3496296974944", "https://ok.ru/videoembed/3496296909408",
  "https://ok.ru/videoembed/3496296843872", "https://ok.ru/videoembed/3496296712800", "https://ok.ru/videoembed/3496296647264",
  "https://ok.ru/videoembed/3496296450656", "https://ok.ru/videoembed/3496296385120", "https://ok.ru/videoembed/3496296319584",
  "https://ok.ru/videoembed/3496296254048", "https://ok.ru/videoembed/3496296122976", "https://ok.ru/videoembed/3496295991904",
  "https://ok.ru/videoembed/3496295860832", "https://ok.ru/videoembed/3496295664224", "https://ok.ru/videoembed/3496295598688",
  "https://ok.ru/videoembed/3496295533152", "https://ok.ru/videoembed/3496295467616", "https://ok.ru/videoembed/3496295402080",
  "https://ok.ru/videoembed/3496295271008", "https://ok.ru/videoembed/3496295205472", "https://ok.ru/videoembed/3496295139936",
  "https://ok.ru/videoembed/3496295074400", "https://ok.ru/videoembed/3496294943328", "https://ok.ru/videoembed/3465634253408",
  "https://ok.ru/videoembed/3465634056800", "https://ok.ru/videoembed/3465633991264", "https://ok.ru/videoembed/3465633925728",
  "https://ok.ru/videoembed/3465633860192", "https://ok.ru/videoembed/3465633794656", "https://ok.ru/videoembed/3465633729120",
  "https://ok.ru/videoembed/3465633663584", "https://ok.ru/videoembed/3465633598048", "https://ok.ru/videoembed/3465633532512",
  "https://ok.ru/videoembed/3465567210080", "https://ok.ru/videoembed/3465567472224", "https://ok.ru/videoembed/3465568914016",
  "https://ok.ru/videoembed/3465569241696", "https://ok.ru/videoembed/3465568782944", "https://ok.ru/videoembed/3465568717408",
  "https://ok.ru/videoembed/3465568586336", "https://ok.ru/videoembed/3465568455264", "https://ok.ru/videoembed/3465568389728",
  "https://ok.ru/videoembed/3465568324192", "https://ok.ru/videoembed/3459400731232", "https://ok.ru/videoembed/3459400469088",
  "https://ok.ru/videoembed/3459400338016", "https://ok.ru/videoembed/3459372485216", "https://ok.ru/videoembed/3459368225376",
  "https://ok.ru/videoembed/3459368028768", "https://ok.ru/videoembed/3459367897696", "https://ok.ru/videoembed/3459221424736",
  "https://ok.ru/videoembed/3459207531104", "https://ok.ru/videoembed/3459079473760", "https://ok.ru/videoembed/3458587757152",
  "https://ok.ru/videoembed/3458583300704", "https://ok.ru/videoembed/3458583235168", "https://ok.ru/videoembed/3458582841952",
  "https://ok.ru/videoembed/3458582710880", "https://ok.ru/videoembed/3458582514272", "https://ok.ru/videoembed/3458582448736",
  "https://ok.ru/videoembed/3458551188064", "https://ok.ru/videoembed/3458543979104", "https://ok.ru/videoembed/3458538080864",
  "https://ok.ru/videoembed/3458533231200", "https://ok.ru/videoembed/3458533100128", "https://ok.ru/videoembed/3458532641376",
  "https://ok.ru/videoembed/3458517043808", "https://ok.ru/videoembed/3458516781664", "https://ok.ru/videoembed/3458516585056",
  "https://ok.ru/videoembed/3458516322912", "https://ok.ru/videoembed/3458516060768", "https://ok.ru/videoembed/3458515929696",
  "https://ok.ru/videoembed/3458515798624", "https://ok.ru/videoembed/3456736496224", "https://ok.ru/videoembed/3456736823904",
  "https://ok.ru/videoembed/3456736365152", "https://ok.ru/videoembed/3456736103008", "https://ok.ru/videoembed/3456735971936",
  "https://ok.ru/videoembed/3456735775328", "https://ok.ru/videoembed/3456735578720", "https://ok.ru/videoembed/3456735513184",
  "https://ok.ru/videoembed/3456735316576", "https://ok.ru/videoembed/3456735054432", "https://ok.ru/videoembed/3456734661216",
  "https://ok.ru/videoembed/3456734595680", "https://ok.ru/videoembed/3455173397088", "https://ok.ru/videoembed/3455168219744",
  "https://ok.ru/videoembed/3455160224352", "https://ok.ru/videoembed/3455154653792"
];

const RicoLazaroPC = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [inMyList, setInMyList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const SERIES_ID = 11;

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

    const savedEp = localStorage.getItem('rico_lazaro_last_ep');
    if (savedEp) {
      const idx = parseInt(savedEp);
      if (idx < ricoLazaroEpisodes.length) setCurrentIdx(idx);
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
        rico: ['rico', 'lazaro', 'babilonia', 'nabucodonosor', 'profecia'],
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
    setSelectedVideo(ricoLazaroEpisodes[idx]);
    localStorage.setItem('rico_lazaro_last_ep', idx.toString());
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
      <Head><title>El Rico y Lázaro — Estudios 421</title></Head>

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
            {[{ n: '', img: '367960b11c1c44ba89cd1582fd1b5776', p: '/serie/el-rico-y-lazaro' }, 
              { n: 'en', img: '35112d9ffe234d6f9dcef16cf8f7544e', p: '/en/serie/el-rico-y-lazaro' }, 
              { n: 'pt', img: '830f1c20656e4d44a819bedfc13a22cc', p: '/pt/serie/el-rico-y-lazaro' }].map((l) => (
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
        <img src="https://static.wixstatic.com/media/859174_012688393e4149ea824cd9407bf608ac~mv2.jpg" className="w-full h-full object-cover" alt="Banner El Rico y Lázaro" />
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
          {ricoLazaroEpisodes.map((_, i) => (
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
              <span className="text-[10px] font-black text-[#FF8A00]/80 uppercase tracking-[0.5em] mb-1">Serie: El Rico y Lázaro</span>
              <h2 className="text-2xl font-black tracking-tighter uppercase leading-none">Episodio {currentIdx + 1}</h2>
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
            <button disabled={currentIdx === ricoLazaroEpisodes.length - 1} onClick={() => openEpisode(currentIdx + 1)} className="group flex items-center gap-6 disabled:opacity-5 transition-all">
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

export default RicoLazaroPC;
