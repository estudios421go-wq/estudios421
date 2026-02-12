import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoChevronBack, IoChevronForward, IoList, IoClose, IoCheckmarkCircle } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
// Step 3: International Search Database (Master)
import { allSeriesEn } from '../../../../data/en/seriesEn';

// --- EPISODE CONFIGURATION (STEP 2: REPLACED LINKS) ---
const JesusEpisodes = [
  "https://ok.ru/videoembed/3921269951129", "https://ok.ru/videoembed/3921315367577", "https://ok.ru/videoembed/3921340402329",
  "https://ok.ru/videoembed/3924250593945", "https://ok.ru/videoembed/3924365281945", "https://ok.ru/videoembed/3924424985241",
  "https://ok.ru/videoembed/3924428720793", "https://ok.ru/videoembed/3928056990361", "https://ok.ru/videoembed/3928057186969",
  "https://ok.ru/videoembed/3928057252505", "https://ok.ru/videoembed/3928706189977", "https://ok.ru/videoembed/3928706255513",
  "https://ok.ru/videoembed/3928706452121", "https://ok.ru/videoembed/3928706583193", "https://ok.ru/videoembed/3928706648729",
  "https://ok.ru/videoembed/3928706779801", "https://ok.ru/videoembed/3928706910873", "https://ok.ru/videoembed/3928707107481",
  "https://ok.ru/videoembed/3928707173017", "https://ok.ru/videoembed/3928707304089", "https://ok.ru/videoembed/10949111843344",
  "https://ok.ru/videoembed/10949123508752", "https://ok.ru/videoembed/10949123836432", "https://ok.ru/videoembed/10949128292880",
  "https://ok.ru/videoembed/10949130390032", "https://ok.ru/videoembed/10949133732368", "https://ok.ru/videoembed/10949143169552",
  "https://ok.ru/videoembed/10949143300624", "https://ok.ru/videoembed/10949143628304", "https://ok.ru/videoembed/10949143824912",
  "https://ok.ru/videoembed/10949259954704", "https://ok.ru/videoembed/10949260020240", "https://ok.ru/videoembed/10949260151312",
  "https://ok.ru/videoembed/10949260413456", "https://ok.ru/videoembed/10949285054992", "https://ok.ru/videoembed/10949285317136",
  "https://ok.ru/videoembed/10949435787792", "https://ok.ru/videoembed/10949435918864", "https://ok.ru/videoembed/10949436115472",
  "https://ok.ru/videoembed/10949436312080", "https://ok.ru/videoembed/10949588224528", "https://ok.ru/videoembed/10949588355600",
  "https://ok.ru/videoembed/10949588552208", "https://ok.ru/videoembed/10949588814352", "https://ok.ru/videoembed/10949589010960",
  "https://ok.ru/videoembed/10949590125072", "https://ok.ru/videoembed/10949590256144", "https://ok.ru/videoembed/10949590387216",
  "https://ok.ru/videoembed/10949590583824", "https://ok.ru/videoembed/10949593532944", "https://ok.ru/videoembed/10949642750480",
  "https://ok.ru/videoembed/10949643012624", "https://ok.ru/videoembed/10949643078160", "https://ok.ru/videoembed/10949643143696",
  "https://ok.ru/videoembed/10949643274768", "https://ok.ru/videoembed/10949643471376", "https://ok.ru/videoembed/10949643667984",
  "https://ok.ru/videoembed/10949643733520", "https://ok.ru/videoembed/10949643799056", "https://ok.ru/videoembed/10949643864592",
  "https://ok.ru/videoembed/10950857984528", "https://ok.ru/videoembed/10950864931344", "https://ok.ru/videoembed/10950865127952",
  "https://ok.ru/videoembed/10950874040848", "https://ok.ru/videoembed/10950874302992", "https://ok.ru/videoembed/10950874434064",
  "https://ok.ru/videoembed/10950902614544", "https://ok.ru/videoembed/10950902876688", "https://ok.ru/videoembed/10950903073296",
  "https://ok.ru/videoembed/10950903138832", "https://ok.ru/videoembed/10950903269904", "https://ok.ru/videoembed/10950903400976",
  "https://ok.ru/videoembed/10950903466512", "https://ok.ru/videoembed/10950903728656", "https://ok.ru/videoembed/10950903859728",
  "https://ok.ru/videoembed/10950904121872", "https://ok.ru/videoembed/10950904252944", "https://ok.ru/videoembed/10950904515088",
  "https://ok.ru/videoembed/10950904842768", "https://ok.ru/videoembed/10950904973840", "https://ok.ru/videoembed/10952373242384",
  "https://ok.ru/videoembed/10952373438992", "https://ok.ru/videoembed/10952373570064", "https://ok.ru/videoembed/10952373701136",
  "https://ok.ru/videoembed/10952373832208", "https://ok.ru/videoembed/10952373963280", "https://ok.ru/videoembed/10952374028816",
  "https://ok.ru/videoembed/10952374094352", "https://ok.ru/videoembed/10952374356496", "https://ok.ru/videoembed/10952375470608",
  "https://ok.ru/videoembed/10952375798288", "https://ok.ru/videoembed/10952393820688", "https://ok.ru/videoembed/10952394148368",
  "https://ok.ru/videoembed/10952394279440", "https://ok.ru/videoembed/10952394607120", "https://ok.ru/videoembed/10952394672656",
  "https://ok.ru/videoembed/10952394803728", "https://ok.ru/videoembed/10952395000336", "https://ok.ru/videoembed/10952395262480",
  "https://ok.ru/videoembed/10952395524624", "https://ok.ru/videoembed/10953729509904", "https://ok.ru/videoembed/10953747597840",
  "https://ok.ru/videoembed/10953748056592", "https://ok.ru/videoembed/10953749432848", "https://ok.ru/videoembed/10953749629456",
  "https://ok.ru/videoembed/10953827486224", "https://ok.ru/videoembed/10953827879440", "https://ok.ru/videoembed/10953828076048",
  "https://ok.ru/videoembed/10953828403728", "https://ok.ru/videoembed/10953828534800", "https://ok.ru/videoembed/10953828796944",
  "https://ok.ru/videoembed/10953828993552", "https://ok.ru/videoembed/10953829124624", "https://ok.ru/videoembed/10953829321232",
  "https://ok.ru/videoembed/10953829517840", "https://ok.ru/videoembed/10953829779984", "https://ok.ru/videoembed/10953829845520",
  "https://ok.ru/videoembed/10953829976592", "https://ok.ru/videoembed/10953830238736", "https://ok.ru/videoembed/10953896954384",
  "https://ok.ru/videoembed/10957779896848", "https://ok.ru/videoembed/10957785467408", "https://ok.ru/videoembed/10957785598480",
  "https://ok.ru/videoembed/10957785860624", "https://ok.ru/videoembed/10957941836304", "https://ok.ru/videoembed/10957941967376",
  "https://ok.ru/videoembed/10957995510288", "https://ok.ru/videoembed/10959550155280", "https://ok.ru/videoembed/10959550286352",
  "https://ok.ru/videoembed/10959550482960", "https://ok.ru/videoembed/10960867363344", "https://ok.ru/videoembed/10960867559952",
  "https://ok.ru/videoembed/10960867625488", "https://ok.ru/videoembed/10960867822096", "https://ok.ru/videoembed/10960867887632",
  "https://ok.ru/videoembed/10960868018704", "https://ok.ru/videoembed/10972770142736", "https://ok.ru/videoembed/10972770208272",
  "https://ok.ru/videoembed/10972770404880", "https://ok.ru/videoembed/10972770470416", "https://ok.ru/videoembed/10973458926096",
  "https://ok.ru/videoembed/10973459057168", "https://ok.ru/videoembed/10973459122704", "https://ok.ru/videoembed/10973459188240",
  "https://ok.ru/videoembed/10973459384848", "https://ok.ru/videoembed/10975903549968", "https://ok.ru/videoembed/10975903615504",
  "https://ok.ru/videoembed/10975903877648", "https://ok.ru/videoembed/10975904205328", "https://ok.ru/videoembed/10975904270864",
  "https://ok.ru/videoembed/10982582651408", "https://ok.ru/videoembed/10982582782480", "https://ok.ru/videoembed/10985947990544",
  "https://ok.ru/videoembed/10985948056080", "https://ok.ru/videoembed/10985948121616", "https://ok.ru/videoembed/10985948187152",
  "https://ok.ru/videoembed/10985948318224", "https://ok.ru/videoembed/10985948383760", "https://ok.ru/videoembed/10985948449296",
  "https://ok.ru/videoembed/10985966471696", "https://ok.ru/videoembed/10985984625168", "https://ok.ru/videoembed/10985985673744",
  "https://ok.ru/videoembed/10985985739280", "https://ok.ru/videoembed/10985986066960", "https://ok.ru/videoembed/10985986198032",
  "https://ok.ru/videoembed/10985986263568", "https://ok.ru/videoembed/10985986394640", "https://ok.ru/videoembed/10985986525712",
  "https://ok.ru/videoembed/10985986591248", "https://ok.ru/videoembed/10985986656784", "https://ok.ru/videoembed/10986115959312",
  "https://ok.ru/videoembed/10986116352528", "https://ok.ru/videoembed/10986116614672", "https://ok.ru/videoembed/10986116811280",
  "https://ok.ru/videoembed/10986116942352", "https://ok.ru/videoembed/10986117138960", "https://ok.ru/videoembed/10986117204496",
  "https://ok.ru/videoembed/10986117401104", "https://ok.ru/videoembed/10986117466640", "https://ok.ru/videoembed/10986117532176",
  "https://ok.ru/videoembed/10987505912336", "https://ok.ru/videoembed/10987506174480", "https://ok.ru/videoembed/10987506502160",
  "https://ok.ru/videoembed/10987506567696", "https://ok.ru/videoembed/10987507026448", "https://ok.ru/videoembed/10987507878416",
  "https://ok.ru/videoembed/10987508075024", "https://ok.ru/videoembed/10987508337168", "https://ok.ru/videoembed/10987508599312",
  "https://ok.ru/videoembed/10987508992528", "https://ok.ru/videoembed/10987509254672", "https://ok.ru/videoembed/10987509385744",
  "https://ok.ru/videoembed/10987509778960", "https://ok.ru/videoembed/10987509975568", "https://ok.ru/videoembed/10987510172176",
  "https://ok.ru/videoembed/10988843633168"
];

const JesusEN_PC = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [inMyList, setInMyList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const episodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const SERIES_ID = 16; // Replaced ID

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

    const savedIdx = localStorage.getItem('jesus_last_idx_en');
    if (savedIdx) {
      setCurrentIdx(parseInt(savedIdx));
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
      const filtered = allSeriesEn.filter(serie => {
        const titleNormalized = normalize(serie.title);
        const categoryNormalized = normalize(serie.category || "");
        return titleNormalized.includes(term) || categoryNormalized.includes(term);
      });
      setSearchResults(filtered);
    } else { setSearchResults([]); }
  }, [searchQuery]);

  const openEpisode = (idx: number) => {
    const url = JesusEpisodes[idx];
    setCurrentIdx(idx);
    setSelectedVideo(url);
    localStorage.setItem('jesus_last_idx_en', idx.toString());
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
      <Head><title>Jesus — Estudios 421</title></Head>

      <nav className={`fixed top-0 w-full z-[130] transition-all duration-500 px-8 py-4 flex items-center justify-between ${isScrolled || searchQuery.length > 0 ? 'bg-black shadow-lg' : 'bg-gradient-to-b from-black via-black/60 to-transparent'}`}>
        <div className="flex items-center gap-10">
          <Link href="/en"><div className="relative w-[160px] h-[45px] cursor-pointer"><Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" fill className="object-contain" priority /></div></Link>
          <div className="flex gap-8">
            <Link href="/en" className="relative group text-white text-[15px] font-medium tracking-wide">Home<span className="absolute -bottom-1 left-0 h-[3px] bg-[#FF8A00] transition-all duration-500 w-0 group-hover:w-full" /></Link>
            <Link href="/en/biblical-series" className="relative group text-white text-[15px] font-medium tracking-wide">Biblical Series<span className="absolute -bottom-1 left-0 h-[3px] bg-[#FF8A00] transition-all duration-500 w-0 group-hover:w-full" /></Link>
            <Link href="/en/tv-shows" className="relative group text-white text-[15px] font-medium tracking-wide">TV Shows<span className="absolute -bottom-1 left-0 h-[3px] bg-[#FF8A00] transition-all duration-500 w-0 group-hover:w-full" /></Link>
            <Link href="/en/movies" className="relative group text-white text-[15px] font-medium tracking-wide">Movies<span className="absolute -bottom-1 left-0 h-[3px] bg-[#FF8A00] transition-all duration-500 w-0 group-hover:w-full" /></Link>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex gap-4 mr-4">
            {[{ n: '', img: '367960b11c1c44ba89cd1582fd1b5776', p: '/serie/jesus' }, 
              { n: 'en', img: '35112d9ffe234d6f9dcef16cf8f7544e', p: '/en/series/jesus' }, 
              { n: 'pt', img: '830f1c20656e4d44a819bedfc13a22cc', p: '/pt/series/jesus' }].map((l) => (
              <Link key={l.n} href={l.p}><img src={`https://static.wixstatic.com/media/859174_${l.img}~mv2.png`} className="w-7 h-7 object-contain cursor-pointer hover:scale-110 transition-transform" /></Link>
            ))}
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="flex items-center bg-white/10 rounded-full px-4 py-1 border border-white/5 focus-within:border-[#FF8A00]">
            <IoSearchOutline className="text-white text-xl" />
            <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent border-none outline-none text-white text-sm ml-2 w-32 placeholder:text-gray-400" />
          </form>
          <Image src="https://static.wixstatic.com/media/859174_26ca840644ce4f519c0458c649f44f34~mv2.png" alt="User" width={30} height={30} className="rounded-full ring-1 ring-white/20 hover:ring-[#FF8A00] cursor-pointer" />
        </div>
      </nav>

      {searchQuery.length > 0 && (
        <div className="fixed inset-0 bg-black z-[120] pt-24 px-16 overflow-y-auto pb-20">
          <h2 className="text-white text-2xl font-bold mb-10 uppercase tracking-widest flex items-center gap-3"><span className="w-1.5 h-6 bg-[#FF8A00]" />Results: "{searchQuery}"</h2>
          <div className="grid grid-cols-6 gap-x-4 gap-y-10">
            {searchResults.map((m) => (
              <Link key={m.id} href={m.path}><div className="relative aspect-[2/3] rounded-md transition-all duration-500 hover:scale-110 hover:z-[110] cursor-pointer shadow-2xl group"><Image src={m.banner} alt={m.title} fill className="object-cover rounded-md" unoptimized /></div></Link>
            ))}
          </div>
        </div>
      )}

      <div className="relative w-full h-[88vh]">
        <img src="https://static.wixstatic.com/media/859174_4c5c745df2904499a6a52369668a6262~mv2.jpg" className="w-full h-full object-cover" alt="Banner Jesus" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/10 opacity-70" />
        <div className="absolute bottom-[-30px] left-16 flex gap-6 z-20 items-center">
          <button onClick={() => openEpisode(currentIdx)} className="bg-white text-black font-black py-4 px-12 rounded-sm text-lg hover:bg-[#FF8A00] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-2xl uppercase">
            {currentIdx === 0 ? "▶ Watch Now" : `▶ Continue Ep.${currentIdx + 1}`}
          </button>
          <button onClick={toggleMyList} className={`border py-4 px-10 rounded-sm transition-all uppercase font-bold ${inMyList ? 'bg-[#FF8A00] border-[#FF8A00] text-white' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}>
            {inMyList ? <><IoCheckmarkCircle className="inline mr-2" /> In My List</> : '+ My List'}
          </button>
          <button onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS', '_blank')} className="border py-4 px-10 rounded-sm bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all uppercase font-bold">❤ Donate</button>
        </div>
      </div>

      <div className="h-20 bg-black"></div>

      <div className="px-16 mb-32 relative z-10 text-left">
        <header className="flex items-center gap-4 mb-10 border-b border-white/10 pb-4">
          <div className="w-1.5 h-8 bg-[#FF8A00]"></div>
          <h2 className="text-2xl font-bold tracking-tight uppercase tracking-widest">Available Episodes</h2>
        </header>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-8 gap-4 py-8">
            {JesusEpisodes.map((_, i) => (
              <button key={i} onClick={() => openEpisode(i)} className={`aspect-square rounded-lg font-bold text-sm transition-all border ${currentIdx === i ? 'bg-[#FF8A00] border-[#FF8A00] text-white' : 'bg-white/5 border-white/10 hover:border-[#FF8A00] hover:text-[#FF8A00]'}`}>
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 z-[1000] bg-[#050608] flex flex-col animate-fade-in overflow-hidden">
          <div className="h-[12vh] min-h-[85px] px-12 flex items-center justify-between bg-gradient-to-b from-[#0a0b0d] to-[#050608] border-b border-white/5 relative shadow-2xl">
            <div className="flex items-center gap-8">
              <div className="flex flex-col border-l-4 border-[#FF8A00] pl-6 py-1 text-left">
                <span className="text-[10px] font-black text-[#FF8A00]/80 uppercase tracking-[0.5em] mb-1">Series: Jesus</span>
                <h2 className="text-2xl font-black tracking-tighter uppercase leading-none">
                  Episode {currentIdx + 1}
                </h2>
              </div>
            </div>
            <button onClick={closePlayer} className="group flex items-center gap-4 bg-white/[0.03] px-8 py-3.5 rounded-full border border-white/10 hover:bg-[#FF8A00] hover:scale-105 transition-all">
              <span className="text-[11px] font-black uppercase tracking-[0.2em] group-hover:text-black">Exit Video</span>
              <IoClose className="text-2xl group-hover:rotate-90 group-hover:text-black transition-all" />
            </button>
          </div>
          <div className="flex-grow bg-black relative">
            <iframe src={selectedVideo + "?autoplay=1"} className="absolute inset-0 w-full h-full border-none" allow="autoplay; fullscreen" allowFullScreen />
          </div>
          <div className="h-[13vh] min-h-[100px] px-16 bg-gradient-to-t from-[#0a0b0d] to-[#050608] border-t border-white/5 flex items-center justify-between shadow-2xl">
            <button disabled={currentIdx === 0} onClick={() => openEpisode(currentIdx - 1)} className="group flex items-center gap-5 disabled:opacity-5 transition-all">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] group-hover:bg-white group-hover:text-black transition-all shadow-xl">
                <IoChevronBack className="text-xl" />
              </div>
              <div className="flex flex-col items-start text-left">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FF8A00]/60">Previous</span>
                <span className="text-sm font-bold uppercase text-white/80">Episode {currentIdx}</span>
              </div>
            </button>
            <button onClick={closePlayer} className="flex items-center gap-4 bg-white/[0.03] px-10 py-4 rounded-2xl border border-white/5 hover:bg-white/[0.08] transition-all group scale-95 hover:scale-100">
              <IoList className="text-2xl text-[#FF8A00]" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-white/60">Chapters</span>
            </button>
            <button 
              disabled={currentIdx === JesusEpisodes.length - 1} 
              onClick={() => openEpisode(currentIdx + 1)} 
              className="group flex items-center gap-6 disabled:opacity-5 transition-all"
            >
              <div className="flex flex-col items-end text-right">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FF8A00]">Next</span>
                <span className="text-sm font-bold uppercase text-white/80">Episode {currentIdx + 2}</span>
              </div>
              <div className="w-16 h-16 rounded-[22px] bg-[#FF8A00] flex items-center justify-center text-black shadow-2xl group-hover:scale-110 transition-all">
                <IoChevronForward className="text-4xl" />
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
          <div className="mb-10 space-y-4 text-left">
            <p className="text-xs leading-relaxed max-w-4xl">© {new Date().getFullYear()} Estudios 421. All rights reserved on the design and editing of the platform.</p>
            <p className="text-[10px] md:text-xs leading-relaxed text-gray-500 max-w-5xl text-justify">Legal Notice: The audiovisual content shared on this site belongs to its respective owners and production companies. Estudios 421 is a non-profit platform dedicated to the dissemination of biblical content for the community.</p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-[11px] md:text-xs font-medium uppercase tracking-widest border-t border-white/5 pt-8">
            <Link href="/en/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/en/terms-of-use" className="hover:text-white transition-colors">Terms of Use</Link>
            <Link href="/en/cookies" className="hover:text-white transition-colors">Cookie Settings</Link>
            <Link href="/en/ads" className="hover:text-white transition-colors">Ad Specifications</Link>
            <Link href="/en/help" className="hover:text-white transition-colors">Help Center</Link>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        .unselectable { -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-touch-callout: none; }
        img { pointer-events: none !important; -webkit-user-drag: none !important; }
        body { -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }
      `}</style>
    </div>
  );
};

export default JesusEN_PC;
