import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoMenuOutline, IoCloseOutline, IoChevronBack, IoChevronForward, IoList, IoClose, IoCheckmarkCircle } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { BiDonateHeart } from 'react-icons/bi';
// Cloned Step 3: International Search Logic
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

const JesusEN_Mobile = () => {
  const router = useRouter();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inMyList, setInMyList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const SERIES_ID = 16;

  useEffect(() => {
    const handleContext = (e: any) => e.preventDefault();
    document.addEventListener('contextmenu', handleContext);

    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    
    const savedIdx = localStorage.getItem('jesus_mobile_last_idx_en');
    if (savedIdx) setCurrentIdx(parseInt(savedIdx));
    
    const list = JSON.parse(localStorage.getItem('myList') || '[]');
    if (list.includes(SERIES_ID)) setInMyList(true);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('contextmenu', handleContext);
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
    setSelectedVideo(JesusEpisodes[idx]);
    setCurrentIdx(idx);
    localStorage.setItem('jesus_mobile_last_idx_en', idx.toString());
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
        <Head><title>Watching: Episode {currentIdx + 1} — Jesus</title></Head>
        <div className="px-6 h-[85px] flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent border-b border-white/5 z-10">
          <div className="flex flex-col border-l-4 border-[#FF8A00] pl-4 py-1 text-left">
            <span className="text-[9px] font-black text-[#FF8A00] uppercase tracking-[0.3em] mb-1">Jesus</span>
            <h2 className="text-sm font-black tracking-tight uppercase truncate max-w-[200px]">
              Episode {currentIdx + 1}
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
              <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center active:bg-[#FF8A00] transition-all"><IoChevronBack size={20} /></div>
              <span className="text-[8px] font-black uppercase tracking-widest text-gray-500">Previous</span>
            </button>
            <button onClick={() => setSelectedVideo(null)} className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center active:bg-white active:text-black transition-all"><IoList size={24} className="text-[#FF8A00]" /></div>
              <span className="text-[8px] font-black uppercase tracking-widest text-white/40">Episodes</span>
            </button>
            <button disabled={currentIdx === JesusEpisodes.length - 1} onClick={() => openEpisode(currentIdx + 1)} className="flex flex-col items-center gap-2 group disabled:opacity-5">
              <div className="w-12 h-12 rounded-full bg-[#FF8A00] text-black flex items-center justify-center shadow-[0_0_20px_rgba(255,138,0,0.3)] active:scale-110 transition-all"><IoChevronForward size={24} /></div>
              <span className="text-[8px] font-black uppercase tracking-widest text-[#FF8A00]">Next</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-[#FF8A00] text-left unselectable">
      <Head><title>Jesus — Estudios 421</title></Head>
      
      <nav className={`fixed top-0 w-full z-[110] px-4 py-3 flex items-center gap-4 transition-all duration-300 ${isScrolled || isMenuOpen || searchQuery.length > 0 ? 'bg-black shadow-lg' : 'bg-gradient-to-b from-black/90 to-transparent'}`}>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="text-white text-3xl active:scale-90 transition-transform" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <IoCloseOutline /> : <IoMenuOutline />}
          </button>
          <Link href="/en"><div className="relative w-[110px] h-[30px]"><Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" fill className="object-contain" priority /></div></Link>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="flex-grow relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><IoSearchOutline size={16} /></div>
          <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-full py-1.5 pl-9 pr-4 text-xs text-white outline-none focus:bg-white/20 focus:border-[#FF8A00] transition-all" />
        </form>
        <div className="flex-shrink-0"><Image src="https://static.wixstatic.com/media/859174_26ca840644ce4f519c0458c649f44f34~mv2.png" alt="User" width={32} height={32} className="rounded-full ring-2 ring-white/10" /></div>
      </nav>

      {searchQuery.length > 0 && (
        <div className="fixed inset-0 bg-black z-[105] pt-24 px-4 overflow-y-auto pb-20 text-left">
          <h2 className="text-white text-sm font-black mb-6 uppercase tracking-widest flex items-center gap-2"><span className="w-1 h-4 bg-[#FF8A00]" />Results: "{searchQuery}"</h2>
          <div className="grid grid-cols-2 gap-4">
            {searchResults.map((m) => (
              <Link key={m.id} href={m.path} onClick={() => setSearchQuery("")}><div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-2xl"><Image src={m.banner} alt={m.title} fill className="object-cover" unoptimized /></div></Link>
            ))}
          </div>
        </div>
      )}

      <div className={`fixed inset-0 bg-black/98 z-[100] transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full pt-24 px-8 gap-8 text-left">
          <p className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/10 pb-2">Navigation</p>
          <Link href="/en" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white">Home</Link>
          <Link href="/en/biblical-series" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white">Biblical Series</Link>
          <Link href="/en/tv-shows" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white">TV Shows</Link>
          <Link href="/en/movies" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white">Movies</Link>
          <p className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/10 pb-2 mt-4">Language</p>
          <div className="flex gap-6">
            {[{l:'ESP', i:'367960b11c1c44ba89cd1582fd1b5776', p:'/serie/jesus'}, {l:'ENG', i:'35112d9ffe234d6f9dcef16cf8f7544e', p:'/en/series/jesus'}, {l:'PT', i:'830f1c20656e4d44a819bedfc13a22cc', p:'/pt/series/jesus'}].map((lang) => (
              <Link key={lang.l} href={lang.p} className="flex flex-col items-center gap-2 active:scale-95 transition-transform">
                <img src={`https://static.wixstatic.com/media/859174_${lang.i}~mv2.png`} alt={lang.l} className="w-10 h-10 object-contain" /><span className="text-[10px] text-white font-bold">{lang.l}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="relative w-full pt-0 bg-black shadow-2xl">
        <div className="w-full aspect-[4/3] relative">
          <img src="https://static.wixstatic.com/media/859174_4c5c745df2904499a6a52369668a6262~mv2.jpg" className="w-full h-full object-contain" alt="Jesus Banner" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        </div>
        <div className="px-4 -mt-14 flex flex-col gap-3 relative z-20">
          <button onClick={() => openEpisode(currentIdx)} className="w-full bg-white text-black font-black py-4 rounded-md text-sm active:scale-95 transition-transform uppercase tracking-[0.2em] shadow-2xl">
            {currentIdx === 0 ? "▶ Watch Now" : `▶ Continue Ep. ${currentIdx + 1}`}
          </button>
          <div className="flex gap-3">
            <button onClick={toggleMyList} className={`flex-1 py-3.5 rounded-md text-[10px] font-black border transition-all tracking-widest ${inMyList ? 'bg-[#FF8A00] border-[#FF8A00] text-white' : 'bg-white/5 border-white/10 text-white active:bg-white/20'}`}>
              {inMyList ? <><IoCheckmarkCircle className="inline mr-1" /> IN MY LIST</> : '+ MY LIST'}
            </button>
            <button onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS', '_blank')} className="flex-1 bg-white/5 backdrop-blur-md py-3.5 rounded-md text-[10px] font-black border border-white/10 text-white active:bg-white/20 uppercase tracking-widest flex items-center justify-center gap-2"><BiDonateHeart className="text-[#FF8A00]"/> Donate</button>
          </div>
        </div>
      </div>

      <div className="px-5 mt-12 mb-20 text-left">
        <header className="flex items-center gap-3 mb-6 border-b border-white/5 pb-3">
          <div className="w-1 h-5 bg-[#FF8A00]"></div>
          <h2 className="text-[11px] font-black text-white/50 tracking-[0.3em] uppercase">Available Episodes</h2>
        </header>
        <div className="grid grid-cols-5 gap-3">
          {JesusEpisodes.map((_, i) => (
            <button key={i} onClick={() => openEpisode(i)} className={`aspect-square rounded-md text-[10px] font-bold border transition-all ${currentIdx === i ? 'bg-[#FF8A00] border-[#FF8A00] text-white' : 'bg-white/5 border-white/10 text-white/60'}`}>
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      <footer className="bg-[#0a0a0a] text-gray-500 py-10 px-6 border-t border-white/5 text-left">
        <div className="flex justify-start gap-6 mb-8 text-xl">
          <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="active:text-[#FF8A00] transition-colors"><FaFacebookF /></a>
          <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="active:text-[#FF8A00] transition-colors"><FaInstagram /></a>
          <a href="https://www.tiktok.com/@estudios421_com?_r=1&_t=ZS-93K0Cjg8TzM" target="_blank" rel="noreferrer" className="active:text-[#FF8A00] transition-colors"><FaTiktok /></a>
          <a href="https://youtube.com/@estudios421max?si=IXSltDZuOmclG7KL" target="_blank" rel="noreferrer" className="active:text-[#FF8A00] transition-colors"><FaYoutube /></a>
          <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="active:text-[#FF8A00] transition-colors"><FaXTwitter /></a>
        </div>
        <div className="space-y-4 mb-8">
          <p className="text-[10px] leading-relaxed">© {new Date().getFullYear()} Estudios 421. All rights reserved on the design and editing of the platform.</p>
          <p className="text-[9px] leading-relaxed text-gray-600 text-justify">Legal Notice: The audiovisual content shared on this site belongs to its respective owners and production companies. Estudios 421 is a non-profit platform destined to the dissemination of biblical content.</p>
        </div>
        <div className="flex flex-col gap-4 text-[10px] font-bold uppercase tracking-widest border-t border-white/5 pt-8">
          <Link href="/en/privacy-policy">Privacy Policy</Link>
          <Link href="/en/terms-of-use">Terms of Use</Link>
          <Link href="/en/cookies">Cookie Settings</Link>
          <Link href="/en/ads">Ad Specifications</Link>
          <Link href="/en/help">Help Center</Link>
        </div>
      </footer>

      <style jsx global>{`
        .unselectable { -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-touch-callout: none; }
        img { pointer-events: none !important; -webkit-user-drag: none !important; }
        body { -webkit-user-select: none; user-select: none; }
      `}</style>
    </div>
  );
};

export default JesusEN_Mobile;
