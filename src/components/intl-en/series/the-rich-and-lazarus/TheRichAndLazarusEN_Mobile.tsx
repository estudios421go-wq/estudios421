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
const RichAndLazarusEpisodes = [
  "https://ok.ru/videoembed/8598078163472", "https://ok.ru/videoembed/8598734768656", "https://ok.ru/videoembed/8598734965264",
  "https://ok.ru/videoembed/8606142040592", "https://ok.ru/videoembed/10370466712080", "https://ok.ru/videoembed/10370479753744",
  "https://ok.ru/videoembed/10370515667472", "https://ok.ru/videoembed/10370516060688", "https://ok.ru/videoembed/10370516388368",
  "https://ok.ru/videoembed/10370516716048", "https://ok.ru/videoembed/10372375251472", "https://ok.ru/videoembed/10372375317008",
  "https://ok.ru/videoembed/10372375513616", "https://ok.ru/videoembed/10372375906832", "https://ok.ru/videoembed/10372376103440",
  "https://ok.ru/videoembed/10374624578064", "https://ok.ru/videoembed/10374624971280", "https://ok.ru/videoembed/10372376627728",
  "https://ok.ru/videoembed/10372376955408", "https://ok.ru/videoembed/10372377152016", "https://ok.ru/videoembed/10372476963344",
  "https://ok.ru/videoembed/10372490201616", "https://ok.ru/videoembed/10372490332688", "https://ok.ru/videoembed/10372490660368",
  "https://ok.ru/videoembed/10372490791440", "https://ok.ru/videoembed/10372490988048", "https://ok.ru/videoembed/10372491315728",
  "https://ok.ru/videoembed/10374628051472", "https://ok.ru/videoembed/10374628510224", "https://ok.ru/videoembed/10374628837904",
  "https://ok.ru/videoembed/10374629231120", "https://ok.ru/videoembed/10374629427728", "https://ok.ru/videoembed/10374629624336",
  "https://ok.ru/videoembed/10374629689872", "https://ok.ru/videoembed/10374629886480", "https://ok.ru/videoembed/10374630672912",
  "https://ok.ru/videoembed/10374631066128", "https://ok.ru/videoembed/10374631131664", "https://ok.ru/videoembed/10374631459344",
  "https://ok.ru/videoembed/10374632114704", "https://ok.ru/videoembed/10378912074256", "https://ok.ru/videoembed/10378912991760",
  "https://ok.ru/videoembed/10378913319440", "https://ok.ru/videoembed/10378913909264", "https://ok.ru/videoembed/10378914564624",
  "https://ok.ru/videoembed/10378915023376", "https://ok.ru/videoembed/10378915416592", "https://ok.ru/videoembed/10378915940880",
  "https://ok.ru/videoembed/10378916268560", "https://ok.ru/videoembed/10378916334096", "https://ok.ru/videoembed/10378917120528",
  "https://ok.ru/videoembed/10378917317136", "https://ok.ru/videoembed/10452182764048", "https://ok.ru/videoembed/10452186171920",
  "https://ok.ru/videoembed/10452186237456", "https://ok.ru/videoembed/10452186302992", "https://ok.ru/videoembed/10452186434064",
  "https://ok.ru/videoembed/10452186630672", "https://ok.ru/videoembed/10452186696208", "https://ok.ru/videoembed/10452186761744",
  "https://ok.ru/videoembed/10454120794640", "https://ok.ru/videoembed/10454120925712", "https://ok.ru/videoembed/10454121253392",
  "https://ok.ru/videoembed/10454121384464", "https://ok.ru/videoembed/10454121712144", "https://ok.ru/videoembed/10454122105360",
  "https://ok.ru/videoembed/10454122170896", "https://ok.ru/videoembed/10454122301968", "https://ok.ru/videoembed/10454122498576",
  "https://ok.ru/videoembed/10454122760720", "https://ok.ru/videoembed/10455677536784", "https://ok.ru/videoembed/10455677930000",
  "https://ok.ru/videoembed/10455678061072", "https://ok.ru/videoembed/10455678454288", "https://ok.ru/videoembed/10455678978576",
  "https://ok.ru/videoembed/10455679175184", "https://ok.ru/videoembed/10455679699472", "https://ok.ru/videoembed/10455679896080",
  "https://ok.ru/videoembed/10455680223760", "https://ok.ru/videoembed/10455680485904", "https://ok.ru/videoembed/10457745984016",
  "https://ok.ru/videoembed/10457746967056", "https://ok.ru/videoembed/10457747294736", "https://ok.ru/videoembed/10457748081168",
  "https://ok.ru/videoembed/10457748474384", "https://ok.ru/videoembed/10457748802064", "https://ok.ru/videoembed/10457750047248",
  "https://ok.ru/videoembed/10457751030288", "https://ok.ru/videoembed/10457751882256", "https://ok.ru/videoembed/10457752013328",
  "https://ok.ru/videoembed/10457976343056", "https://ok.ru/videoembed/10457976670736", "https://ok.ru/videoembed/10457976867344",
  "https://ok.ru/videoembed/10457977391632", "https://ok.ru/videoembed/10457978505744", "https://ok.ru/videoembed/10457978767888",
  "https://ok.ru/videoembed/10457979423248", "https://ok.ru/videoembed/10457979750928", "https://ok.ru/videoembed/10457980078608",
  "https://ok.ru/videoembed/10458259786256", "https://ok.ru/videoembed/10460032010768", "https://ok.ru/videoembed/10460034107920",
  "https://ok.ru/videoembed/10460035287568", "https://ok.ru/videoembed/10460036270608", "https://ok.ru/videoembed/10460036860432",
  "https://ok.ru/videoembed/10460038171152", "https://ok.ru/videoembed/10460038367760", "https://ok.ru/videoembed/10460039416336",
  "https://ok.ru/videoembed/10460039940624", "https://ok.ru/videoembed/10460040727056", "https://ok.ru/videoembed/10460041710096",
  "https://ok.ru/videoembed/10460042168848", "https://ok.ru/videoembed/10460043414032", "https://ok.ru/videoembed/10460044134928",
  "https://ok.ru/videoembed/10460044397072", "https://ok.ru/videoembed/1046004462608", "https://ok.ru/videoembed/10460048525840",
  "https://ok.ru/videoembed/10460049443344", "https://ok.ru/videoembed/10460049967632", "https://ok.ru/videoembed/10460050229776",
  "https://ok.ru/videoembed/10460050557456", "https://ok.ru/videoembed/10460050950672", "https://ok.ru/videoembed/10460051278352",
  "https://ok.ru/videoembed/10460051540496", "https://ok.ru/videoembed/10460051671568", "https://ok.ru/videoembed/10460052392464",
  "https://ok.ru/videoembed/10460052654608", "https://ok.ru/videoembed/10460054030864", "https://ok.ru/videoembed/10460054489616",
  "https://ok.ru/videoembed/10460054620688", "https://ok.ru/videoembed/10472059963920", "https://ok.ru/videoembed/10472060029456",
  "https://ok.ru/videoembed/10472060160528", "https://ok.ru/videoembed/10472060619280", "https://ok.ru/videoembed/10472060750352",
  "https://ok.ru/videoembed/10472060946960", "https://ok.ru/videoembed/10472061143568", "https://ok.ru/videoembed/10472061536784",
  "https://ok.ru/videoembed/10472062126608", "https://ok.ru/videoembed/10472062781968", "https://ok.ru/videoembed/10473371798032",
  "https://ok.ru/videoembed/10473372453392", "https://ok.ru/videoembed/10473372846608", "https://ok.ru/videoembed/10473373764112",
  "https://ok.ru/videoembed/10473423505936", "https://ok.ru/videoembed/10473423702544", "https://ok.ru/videoembed/10473424095760",
  "https://ok.ru/videoembed/10473424620048", "https://ok.ru/videoembed/10473424816656", "https://ok.ru/videoembed/10473424947728",
  "https://ok.ru/videoembed/10473425406480", "https://ok.ru/videoembed/10473425668624", "https://ok.ru/videoembed/10473426258448",
  "https://ok.ru/videoembed/10473427110416", "https://ok.ru/videoembed/10473427175952", "https://ok.ru/videoembed/10473427503632",
  "https://ok.ru/videoembed/10473427634704", "https://ok.ru/videoembed/10473427896848", "https://ok.ru/videoembed/10473428224528",
  "https://ok.ru/videoembed/10473428421136", "https://ok.ru/videoembed/10473429600784", "https://ok.ru/videoembed/10473429731856",
  "https://ok.ru/videoembed/10473430780432", "https://ok.ru/videoembed/10473430977040", "https://ok.ru/videoembed/10473431697936",
  "https://ok.ru/videoembed/10473432549904", "https://ok.ru/videoembed/10473433270800", "https://ok.ru/videoembed/10473434122768",
  "https://ok.ru/videoembed/10473434384912", "https://ok.ru/videoembed/10473434843664", "https://ok.ru/videoembed/10473436547600",
  "https://ok.ru/videoembed/10473437006352", "https://ok.ru/videoembed/10473437137424", "https://ok.ru/videoembed/10473437334032",
  "https://ok.ru/videoembed/10473437989392", "https://ok.ru/videoembed/10473438382608", "https://ok.ru/videoembed/10473438710288",
  "https://ok.ru/videoembed/10473439103504", "https://ok.ru/videoembed/10473439431184", "https://ok.ru/videoembed/10473439693328",
  "https://ok.ru/videoembed/10473440152080", "https://ok.ru/videoembed/10473440348688", "https://ok.ru/videoembed/10473441004048",
  "https://ok.ru/videoembed/10473441135120", "https://ok.ru/videoembed/10473441462800", "https://ok.ru/videoembed/10473441659408",
  "https://ok.ru/videoembed/10473441856016"
];

const TheRichAndLazarusEN_Mobile = () => {
  const router = useRouter();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inMyList, setInMyList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const SERIES_ID = 11;

  useEffect(() => {
    const handleContext = (e: any) => e.preventDefault();
    document.addEventListener('contextmenu', handleContext);

    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    
    const savedIdx = localStorage.getItem('rich_lazarus_mobile_last_idx_en');
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
    setSelectedVideo(RichAndLazarusEpisodes[idx]);
    setCurrentIdx(idx);
    localStorage.setItem('rich_lazarus_mobile_last_idx_en', idx.toString());
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
        <Head><title>Watching: Episode {currentIdx + 1} — The Rich and Lazarus</title></Head>
        <div className="px-6 h-[85px] flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent border-b border-white/5 z-10">
          <div className="flex flex-col border-l-4 border-[#FF8A00] pl-4 py-1 text-left">
            <span className="text-[9px] font-black text-[#FF8A00] uppercase tracking-[0.3em] mb-1">The Rich and Lazarus</span>
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
            <button disabled={currentIdx === RichAndLazarusEpisodes.length - 1} onClick={() => openEpisode(currentIdx + 1)} className="flex flex-col items-center gap-2 group disabled:opacity-5">
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
      <Head><title>The Rich and Lazarus — Estudios 421</title></Head>
      
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
            {[{l:'ESP', i:'367960b11c1c44ba89cd1582fd1b5776', p:'/serie/el-rico-y-lazaro'}, {l:'ENG', i:'35112d9ffe234d6f9dcef16cf8f7544e', p:'/en/series/the-rich-and-lazarus'}, {l:'PT', i:'830f1c20656e4d44a819bedfc13a22cc', p:'/pt/series/o-rico-e-lazaro'}].map((lang) => (
              <Link key={lang.l} href={lang.p} className="flex flex-col items-center gap-2 active:scale-95 transition-transform">
                <img src={`https://static.wixstatic.com/media/859174_${lang.i}~mv2.png`} alt={lang.l} className="w-10 h-10 object-contain" /><span className="text-[10px] text-white font-bold">{lang.l}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="relative w-full pt-0 bg-black shadow-2xl">
        <div className="w-full aspect-[4/3] relative">
          <img src="https://static.wixstatic.com/media/859174_74f9b0591b18434591a959b546f20906~mv2.jpg" className="w-full h-full object-contain" alt="Rich and Lazarus Banner" />
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
          {RichAndLazarusEpisodes.map((_, i) => (
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

export default TheRichAndLazarusEN_Mobile;
