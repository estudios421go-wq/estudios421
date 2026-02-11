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
const PromisedLandEpisodes = [
  "https://ok.ru/videoembed/8467766643216", "https://ok.ru/videoembed/8467766774288", "https://ok.ru/videoembed/8467766970896",
  "https://ok.ru/videoembed/8476583725584", "https://ok.ru/videoembed/8476588968464", "https://ok.ru/videoembed/8476874508816",
  "https://ok.ru/videoembed/8476874639888", "https://ok.ru/videoembed/8520907164176", "https://ok.ru/videoembed/8520910637584",
  "https://ok.ru/videoembed/8523920640528", "https://ok.ru/videoembed/8523920706064", "https://ok.ru/videoembed/8523920837136",
  "https://ok.ru/videoembed/8523920968208", "https://ok.ru/videoembed/8549014243856", "https://ok.ru/videoembed/8549014309392",
  "https://ok.ru/videoembed/8548997532176", "https://ok.ru/videoembed/8548997597712", "https://ok.ru/videoembed/8548997728784",
  "https://ok.ru/videoembed/8572809251344", "https://ok.ru/videoembed/8572907358736", "https://ok.ru/videoembed/8573057829392",
  "https://ok.ru/videoembed/8573057894928", "https://ok.ru/videoembed/8573058026000", "https://ok.ru/videoembed/8592304835088",
  "https://ok.ru/videoembed/8599449831952", "https://ok.ru/videoembed/8599456909840", "https://ok.ru/videoembed/8606142237200",
  "https://ok.ru/videoembed/9815629826576", "https://ok.ru/videoembed/9840672311824", "https://ok.ru/videoembed/9840673753616",
  "https://ok.ru/videoembed/9855989058064", "https://ok.ru/videoembed/9855989844496", "https://ok.ru/videoembed/9869454805520",
  "https://ok.ru/videoembed/9869456443920", "https://ok.ru/videoembed/9877821000208", "https://ok.ru/videoembed/9877822442000",
  "https://ok.ru/videoembed/10348491639312", "https://ok.ru/videoembed/10347964140048", "https://ok.ru/videoembed/10347964205584",
  "https://ok.ru/videoembed/10347964271120", "https://ok.ru/videoembed/10352641837584", "https://ok.ru/videoembed/10352642099728",
  "https://ok.ru/videoembed/10352642230800", "https://ok.ru/videoembed/10352642361872", "https://ok.ru/videoembed/10352642427408",
  "https://ok.ru/videoembed/10352642558480", "https://ok.ru/videoembed/10352642624016", "https://ok.ru/videoembed/10352642820624",
  "https://ok.ru/videoembed/10352642886160", "https://ok.ru/videoembed/10352642951696", "https://ok.ru/videoembed/10356638681616",
  "https://ok.ru/videoembed/10356638878224", "https://ok.ru/videoembed/10356639009296", "https://ok.ru/videoembed/10356639205904",
  "https://ok.ru/videoembed/10356639533584", "https://ok.ru/videoembed/10356639795728", "https://ok.ru/videoembed/10356639861264",
  "https://ok.ru/videoembed/10356639926800", "https://ok.ru/videoembed/10356639992336", "https://ok.ru/videoembed/10356640254480",
  "https://ok.ru/videoembed/10356640385552", "https://ok.ru/videoembed/10356640647696", "https://ok.ru/videoembed/10356640778768",
  "https://ok.ru/videoembed/10356640975376", "https://ok.ru/videoembed/10356641171984", "https://ok.ru/videoembed/10356641565200",
  "https://ok.ru/videoembed/1035664161808", "https://ok.ru/videoembed/10356641892880", "https://ok.ru/videoembed/10356641958416",
  "https://ok.ru/videoembed/10356642155024", "https://ok.ru/videoembed/10356642548240", "https://ok.ru/videoembed/10356642875920",
  "https://ok.ru/videoembed/10356643138064", "https://ok.ru/videoembed/10356643400208", "https://ok.ru/videoembed/10356643662352",
  "https://ok.ru/videoembed/10356643793424", "https://ok.ru/videoembed/10356643858960", "https://ok.ru/videoembed/10356644055568",
  "https://ok.ru/videoembed/10356644383248", "https://ok.ru/videoembed/10356644579856", "https://ok.ru/videoembed/10361608931856",
  "https://ok.ru/videoembed/10361609194000", "https://ok.ru/videoembed/10361609456144", "https://ok.ru/videoembed/10361609652752",
  "https://ok.ru/videoembed/10361609783824", "https://ok.ru/videoembed/10361610045968", "https://ok.ru/videoembed/10361610242576",
  "https://ok.ru/videoembed/10361610504720", "https://ok.ru/videoembed/10361610635792", "https://ok.ru/videoembed/10361610701328",
  "https://ok.ru/videoembed/10361610963472", "https://ok.ru/videoembed/10361611094544", "https://ok.ru/videoembed/10361611291152",
  "https://ok.ru/videoembed/10361611749904", "https://ok.ru/videoembed/10361612143120", "https://ok.ru/videoembed/10361612470800",
  "https://ok.ru/videoembed/10361612601872", "https://ok.ru/videoembed/10361612732944", "https://ok.ru/videoembed/10361612929552",
  "https://ok.ru/videoembed/10361613126160", "https://ok.ru/videoembed/10361613257232", "https://ok.ru/videoembed/10361613322768",
  "https://ok.ru/videoembed/10361613453840", "https://ok.ru/videoembed/10361613584912", "https://ok.ru/videoembed/10361613781520",
  "https://ok.ru/videoembed/10361613847056", "https://ok.ru/videoembed/10361613978128", "https://ok.ru/videoembed/10361614043664",
  "https://ok.ru/videoembed/10361614240272", "https://ok.ru/videoembed/10361614436880", "https://ok.ru/videoembed/10364975778320",
  "https://ok.ru/videoembed/10364975909392", "https://ok.ru/videoembed/10364976106000", "https://ok.ru/videoembed/10364976302608",
  "https://ok.ru/videoembed/10364976433680", "https://ok.ru/videoembed/10364976499216", "https://ok.ru/videoembed/10364976630288",
  "https://ok.ru/videoembed/10364976761360", "https://ok.ru/videoembed/10364976892432", "https://ok.ru/videoembed/10364977023504",
  "https://ok.ru/videoembed/10364977220112", "https://ok.ru/videoembed/10364977285648", "https://ok.ru/videoembed/10364977351184",
  "https://ok.ru/videoembed/10364977482256", "https://ok.ru/videoembed/10364977678864", "https://ok.ru/videoembed/10364977809936",
  "https://ok.ru/videoembed/10364978006544", "https://ok.ru/videoembed/10364978137616", "https://ok.ru/videoembed/10364978203152",
  "https://ok.ru/videoembed/10364978334224", "https://ok.ru/videoembed/10364978399760", "https://ok.ru/videoembed/10364978530832",
  "https://ok.ru/videoembed/10364978661904", "https://ok.ru/videoembed/10364978792976", "https://ok.ru/videoembed/10364978924048",
  "https://ok.ru/videoembed/10364979055120", "https://ok.ru/videoembed/10364979186192", "https://ok.ru/videoembed/10364979251728",
  "https://ok.ru/videoembed/10364979513872", "https://ok.ru/videoembed/10364979579408", "https://ok.ru/videoembed/10369898580496",
  "https://ok.ru/videoembed/10369898646032", "https://ok.ru/videoembed/10369898777104", "https://ok.ru/videoembed/1036989842640",
  "https://ok.ru/videoembed/10369899039248", "https://ok.ru/videoembed/10369899104784", "https://ok.ru/videoembed/10369899301392",
  "https://ok.ru/videoembed/10369899432464", "https://ok.ru/videoembed/10369899498000", "https://ok.ru/videoembed/10369899563536",
  "https://ok.ru/videoembed/10369899629072", "https://ok.ru/videoembed/10369899694608", "https://ok.ru/videoembed/10369899760144",
  "https://ok.ru/videoembed/10369899956752", "https://ok.ru/videoembed/10369900153360", "https://ok.ru/videoembed/10369900218896",
  "https://ok.ru/videoembed/10369900284432", "https://ok.ru/videoembed/10369900349968", "https://ok.ru/videoembed/10369900481040",
  "https://ok.ru/videoembed/10369900546576", "https://ok.ru/videoembed/10369900743184", "https://ok.ru/videoembed/10369900808720",
  "https://ok.ru/videoembed/10369900874256", "https://ok.ru/videoembed/10369900939792", "https://ok.ru/videoembed/10369901070864",
  "https://ok.ru/videoembed/10369901136400", "https://ok.ru/videoembed/10369901267472", "https://ok.ru/videoembed/10369901333008",
  "https://ok.ru/videoembed/10369901398544", "https://ok.ru/videoembed/10369901464080", "https://ok.ru/videoembed/10369901529616",
  "https://ok.ru/videoembed/10369901595152", "https://ok.ru/videoembed/10369901660688", "https://ok.ru/videoembed/10369901791760",
  "https://ok.ru/videoembed/10369901857296", "https://ok.ru/videoembed/10369901922832", "https://ok.ru/videoembed/10369902119440",
  "https://ok.ru/videoembed/10369902250512", "https://ok.ru/videoembed/10370188773904"
];

const ThePromisedLandEN_Mobile = () => {
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
    const handleContext = (e: any) => e.preventDefault();
    document.addEventListener('contextmenu', handleContext);

    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    
    const savedIdx = localStorage.getItem('promised_land_mobile_last_idx_en');
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
    setSelectedVideo(PromisedLandEpisodes[idx]);
    setCurrentIdx(idx);
    localStorage.setItem('promised_land_mobile_last_idx_en', idx.toString());
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
        <Head><title>Watching: Episode {currentIdx + 1} — Promised Land</title></Head>
        <div className="px-6 h-[85px] flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent border-b border-white/5 z-10">
          <div className="flex flex-col border-l-4 border-[#FF8A00] pl-4 py-1 text-left">
            <span className="text-[9px] font-black text-[#FF8A00] uppercase tracking-[0.3em] mb-1">The Promised Land</span>
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
            <button disabled={currentIdx === PromisedLandEpisodes.length - 1} onClick={() => openEpisode(currentIdx + 1)} className="flex flex-col items-center gap-2 group disabled:opacity-5">
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
      <Head><title>The Promised Land — Estudios 421</title></Head>
      
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
            {[{l:'ESP', i:'367960b11c1c44ba89cd1582fd1b5776', p:'/serie/la-tierra-prometida'}, {l:'ENG', i:'35112d9ffe234d6f9dcef16cf8f7544e', p:'/en/series/the-promised-land'}, {l:'PT', i:'830f1c20656e4d44a819bedfc13a22cc', p:'/pt/series/a-terra-prometida'}].map((lang) => (
              <Link key={lang.l} href={lang.p} className="flex flex-col items-center gap-2 active:scale-95 transition-transform">
                <img src={`https://static.wixstatic.com/media/859174_${lang.i}~mv2.png`} alt={lang.l} className="w-10 h-10 object-contain" /><span className="text-[10px] text-white font-bold">{lang.l}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="relative w-full pt-0 bg-black shadow-2xl">
        <div className="w-full aspect-[4/3] relative">
          <img src="https://static.wixstatic.com/media/859174_78e030706bd24f2fafb540a0fd6000a0~mv2.jpg" className="w-full h-full object-contain" alt="Promised Land Banner" />
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
          {PromisedLandEpisodes.map((_, i) => (
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

export default ThePromisedLandEN_Mobile;
