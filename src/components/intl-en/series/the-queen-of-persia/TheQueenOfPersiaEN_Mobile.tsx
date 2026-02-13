import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoMenuOutline, IoCloseOutline, IoChevronBack, IoChevronForward, IoList, IoClose, IoCheckmarkCircle } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { BiDonateHeart } from 'react-icons/bi';
// Cloned Step 3: International Search Logic (Master English Database)
import { allSeriesEn } from '../../../../data/en/seriesEn';

// --- EPISODE CONFIGURATION (ID: 13 | REPLACED LINKS & TRANSLATED) ---
const persiaEpisodes = [
  { id: 1, title: "WHAT IS YOUR NAME?", dur: "50:57", thumb: "https://static.wixstatic.com/media/859174_bb24b7b013194cd48103df1e39666a8c~mv2.jpg", url: "https://ok.ru/videoembed/9889136118455" },
  { id: 2, title: "IT IS DONE", dur: "44:33", thumb: "https://static.wixstatic.com/media/859174_b27c907cb6f44475a260677acfc56e95~mv2.jpg", url: "https://ok.ru/videoembed/9889136183991" },
  { id: 3, title: "I NEED HER", dur: "45:08", thumb: "https://static.wixstatic.com/media/859174_d4a8295575144c0092eae77cd6776a7d~mv2.jpg", url: "https://ok.ru/videoembed/9892179741367" },
  { id: 4, title: "NOW WHAT?", dur: "49:55", thumb: "https://static.wixstatic.com/media/859174_6bba3949853a4228a8ce7c7f2243ea43~mv2.jpg", url: "https://ok.ru/videoembed/9892179806903" },
  { id: 5, title: "DO YOU UNDERSTAND NOW?", dur: "48:27", thumb: "https://static.wixstatic.com/media/859174_060f835264d24e48987d7c0d1578a12c~mv2.jpg", url: "https://ok.ru/videoembed/9892179937975" },
  { id: 6, title: "ONE OF TWO THINGS", dur: "44:18", thumb: "https://static.wixstatic.com/media/859174_382cc0ab57fd4adcb3b3fe0e70c4021d~mv2.jpg", url: "https://ok.ru/videoembed/9892180134583" },
  { id: 7, title: "HAVE YOU EVER DREAMED OF THE KING?", dur: "43:46", thumb: "https://static.wixstatic.com/media/859174_e5c96fd4320440199aceeb2fe1203abc~mv2.jpg", url: "https://ok.ru/videoembed/9892180200119" },
  { id: 8, title: "IF YOU REALLY KNEW HIM", dur: "43:56", thumb: "https://static.wixstatic.com/media/859174_9c57747bdefb410fa1a0197d59856ba7~mv2.jpg", url: "https://ok.ru/videoembed/9892180331191" },
  { id: 9, title: "BEHOLD THE NEW QUEEN!", dur: "40:27", thumb: "https://static.wixstatic.com/media/859174_ff7bc1f3ca734479b9e78fc6e4550149~mv2.jpg", url: "https://ok.ru/videoembed/9892180462263" },
  { id: 10, title: "NOBODY HAS TO KNOW", dur: "48:56", thumb: "https://static.wixstatic.com/media/859174_d8471ef5b07b4a01bdb31df5531168ec~mv2.jpg", url: "https://ok.ru/videoembed/9892180593335" },
  { id: 11, title: "DON'T BE CURIOUS", dur: "44:40", thumb: "https://static.wixstatic.com/media/859174_86d7dbfe40cc498cbf439a7130b1930f~mv2.jpg", url: "https://ok.ru/videoembed/9898450553527" },
  { id: 12, title: "A MATTER OF LIFE AND DEATH", dur: "47:41", thumb: "https://static.wixstatic.com/media/859174_cc0e5052aa8b407ca3bf4bdd8afffb3c~mv2.jpg", url: "https://ok.ru/videoembed/9898450684599" },
  { id: 13, title: "WHY ARE YOU LIKE THIS?", dur: "36:55", thumb: "https://static.wixstatic.com/media/859174_00cef21a70a246dba0ba13d77de578c7~mv2.jpg", url: "https://ok.ru/videoembed/9898450881207" },
  { id: 14, title: "YOU ARE DIFFERENT", dur: "43:22", thumb: "https://static.wixstatic.com/media/859174_ab6a038a5e2040f68e49f8cae427366e~mv2.jpg", url: "https://ok.ru/videoembed/9898451405495" },
  { id: 15, title: "WE ARE EVEN", dur: "46:37", thumb: "https://static.wixstatic.com/media/859174_18a1bd77ce504e0b93e4e89eb93d7407~mv2.jpg", url: "https://ok.ru/videoembed/9898451798711" },
  { id: 16, title: "YOU WILL NEVER UNDERSTAND", dur: "53:37", thumb: "https://static.wixstatic.com/media/859174_4d1e71aef9d94f2a8682e5c2d51e3f95~mv2.jpg", url: "https://ok.ru/videoembed/9898452126391" },
  { id: 17, title: "ON THE THIRTEENTH DAY", dur: "45:08", thumb: "https://static.wixstatic.com/media/859174_076a07d11152470b9c8dbf487e0aaf73~mv2.jpg", url: "https://ok.ru/videoembed/9898452454071" },
  { id: 18, title: "SO, ARE YOU HADASSAH?", dur: "44:25", thumb: "https://static.wixstatic.com/media/859174_8b1d9a993b734ac79d50d9149c7ba84f~mv2.jpg", url: "https://ok.ru/videoembed/9898452716215" },
  { id: 19, title: "I WILL NOT DIE", dur: "46:44", thumb: "https://static.wixstatic.com/media/859174_9243597cb05b46a88014fd145b9b781c~mv2.jpg", url: "https://ok.ru/videoembed/9898452847287" },
  { id: 20, title: "WHAT IS YOUR REQUEST?", dur: "45:06", thumb: "https://static.wixstatic.com/media/859174_e71dfd724abf4442aa2e32775097f33c~mv2.jpg", url: "https://ok.ru/videoembed/9898453174967" },
  { id: 21, title: "EXPECT NOTHING", dur: "38:43", thumb: "https://static.wixstatic.com/media/859174_997eecbb23864da48f48a46cfa8b2799~mv2.jpg", url: "https://ok.ru/videoembed/9898453895863" },
  { id: 22, title: "IT'S A LONG STORY", dur: "49:43", thumb: "https://static.wixstatic.com/media/859174_2b316ab7ccff4907921d3531b33c52e2~mv2.jpg", url: "https://ok.ru/videoembed/9898454026935" },
  { id: 23, title: "RETURN TO ME", dur: "43:41", thumb: "https://static.wixstatic.com/media/859174_046da0e08c794c33b1c93b07d28db11f~mv2.jpg", url: "https://ok.ru/videoembed/9898454420151" },
  { id: 24, title: "HOW WILL I BEAR THIS?", dur: "40:55", thumb: "https://static.wixstatic.com/media/859174_2290f046f1b548ef8a76435987a623cf~mv2.jpg", url: "https://ok.ru/videoembed/9898455009975" },
  { id: 25, title: "YOU STILL DON'T KNOW", dur: "51:32", thumb: "https://static.wixstatic.com/media/859174_83a0eb5648294c1cb14e2f707b49649c~mv2.jpg", url: "https://ok.ru/videoembed/9898455337655" },
  { id: 26, title: "HELP!", dur: "44:47", thumb: "https://static.wixstatic.com/media/859174_479ea1c0b7e64f94bd2860011c178159~mv2.jpg", url: "https://ok.ru/videoembed/9898455468727" },
  { id: 27, title: "THE OPPOSITE HAPPENED", dur: "41:09", thumb: "https://static.wixstatic.com/media/859174_6dc176dd45b9494eb320a698ae97e493~mv2.jpg", url: "https://ok.ru/videoembed/9898456189623" },
  { id: 28, title: "I HAVE TO GO", dur: "43:16", thumb: "https://static.wixstatic.com/media/859174_3ea091c141164d378d5176f59dccada1~mv2.jpg", url: "https://ok.ru/videoembed/9898456320695" },
  { id: 29, title: "THEY DECEIVED ME", dur: "54:10", thumb: "https://static.wixstatic.com/media/859174_6d1125235d20420ca6c3e621bf635b07~mv2.jpg", url: "https://ok.ru/videoembed/9898456451767" },
  { id: 30, title: "MY LION KING", dur: "50:34", thumb: "https://static.wixstatic.com/media/859174_289d76ff709647cba249df69d39ab5f9~mv2.jpg", url: "https://ok.ru/videoembed/9898456648375" }
];

const TheQueenOfPersiaEN_Mobile = () => {
  const router = useRouter();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inMyList, setInMyList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const SERIES_ID = 13;

  useEffect(() => {
    const handleContext = (e: any) => e.preventDefault();
    document.addEventListener('contextmenu', handleContext);

    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    
    const savedIdx = localStorage.getItem('queen_persia_mobile_last_idx_en');
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
    setSelectedVideo(persiaEpisodes[idx].url);
    setCurrentIdx(idx);
    localStorage.setItem('queen_persia_mobile_last_idx_en', idx.toString());
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
        <Head><title>Watching: {persiaEpisodes[currentIdx].title} — Queen of Persia</title></Head>
        <div className="px-6 h-[85px] flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent border-b border-white/5 z-10">
          <div className="flex flex-col border-l-4 border-[#FF8A00] pl-4 py-1">
            <span className="text-[9px] font-black text-[#FF8A00] uppercase tracking-[0.3em] mb-1">SERIES: THE QUEEN OF PERSIA</span>
            <h2 className="text-sm font-black tracking-tight uppercase truncate max-w-[200px]">
              EP. {persiaEpisodes[currentIdx].id} <span className="text-white/20 mx-1">|</span> {persiaEpisodes[currentIdx].title}
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
              <span className="text-[8px] font-black uppercase tracking-widest text-gray-500">PREVIOUS</span>
            </button>
            <button onClick={() => setSelectedVideo(null)} className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center active:bg-white active:text-black transition-all"><IoList size={24} className="text-[#FF8A00]" /></div>
              <span className="text-[8px] font-black uppercase tracking-widest text-white/40">EPISODES</span>
            </button>
            <button disabled={currentIdx === persiaEpisodes.length - 1} onClick={() => openEpisode(currentIdx + 1)} className="flex flex-col items-center gap-2 group disabled:opacity-5">
              <div className="w-12 h-12 rounded-full bg-[#FF8A00] text-black flex items-center justify-center shadow-[0_0_20px_rgba(255,138,0,0.3)] active:scale-110 transition-all"><IoChevronForward size={24} /></div>
              <span className="text-[8px] font-black uppercase tracking-widest text-[#FF8A00]">NEXT</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-[#FF8A00] text-left unselectable">
      <Head><title>THE QUEEN OF PERSIA — ESTUDIOS 421</title></Head>
      
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
          <h2 className="text-white text-sm font-black mb-6 uppercase tracking-widest flex items-center gap-2"><span className="w-1 h-4 bg-[#FF8A00]" />RESULTS: "{searchQuery}"</h2>
          <div className="grid grid-cols-2 gap-4">
            {searchResults.map((m) => (
              <Link key={m.id} href={m.path} onClick={() => setSearchQuery("")}><div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-2xl"><Image src={m.banner} alt={m.title} fill className="object-cover" unoptimized /></div></Link>
            ))}
          </div>
        </div>
      )}

      <div className={`fixed inset-0 bg-black/98 z-[100] transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full pt-24 px-8 gap-8 text-left">
          <p className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/10 pb-2">NAVIGATION</p>
          <Link href="/en" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white">Home</Link>
          <Link href="/en/biblical-series" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white">Biblical Series</Link>
          <Link href="/en/tv-shows" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white">TV Shows</Link>
          <Link href="/en/movies" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white">Movies</Link>
          <p className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/10 pb-2 mt-4">LANGUAGE</p>
          <div className="flex gap-6">
            {[{l:'ESP', i:'367960b11c1c44ba89cd1582fd1b5776', p:'/serie/la-reina-de-persia'}, 
              {l:'ENG', i:'35112d9ffe234d6f9dcef16cf8f7544e', p:'/en/series/the-queen-of-persia'}, 
              {l:'PT', i:'830f1c20656e4d44a819bedfc13a22cc', p:'/pt/series/a-rainha-da-persia'}].map((lang) => (
              <Link key={lang.l} href={lang.p} className="flex flex-col items-center gap-2 active:scale-95 transition-transform">
                <img src={`https://static.wixstatic.com/media/859174_${lang.i}~mv2.png`} alt={lang.l} className="w-10 h-10 object-contain" /><span className="text-[10px] text-white font-bold">{lang.l}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="relative w-full pt-0 bg-black shadow-2xl">
        <div className="w-full aspect-[4/3] relative">
          <img src="https://static.wixstatic.com/media/859174_c62c588e86eb48b9a5d073089de5b868~mv2.jpg" className="w-full h-full object-contain" alt="Banner" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        </div>
        <div className="px-4 -mt-14 flex flex-col gap-3 relative z-20">
          <button onClick={() => openEpisode(currentIdx)} className="w-full bg-white text-black font-black py-4 rounded-md text-sm active:scale-95 transition-transform uppercase tracking-[0.2em] shadow-2xl">
            {currentIdx === 0 ? "▶ WATCH NOW" : `▶ CONTINUE EP. ${persiaEpisodes[currentIdx].id}`}
          </button>
          <div className="flex gap-3">
            <button onClick={toggleMyList} className={`flex-1 py-3.5 rounded-md text-[10px] font-black border transition-all tracking-widest ${inMyList ? 'bg-[#FF8A00] border-[#FF8A00] text-white' : 'bg-white/5 border-white/10 text-white active:bg-white/20'}`}>
              {inMyList ? <><IoCheckmarkCircle className="inline mr-1" /> IN MY LIST</> : '+ MY LIST'}
            </button>
            <button onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS', '_blank')} className="flex-1 bg-white/5 backdrop-blur-md py-3.5 rounded-md text-[10px] font-black border border-white/10 text-white active:bg-white/20 uppercase tracking-widest flex items-center justify-center gap-2"><BiDonateHeart className="text-[#FF8A00]"/> DONATE</button>
          </div>
        </div>
      </div>

      <div className="px-5 mt-12 mb-20">
        <header className="flex items-center gap-3 mb-6 border-b border-white/5 pb-3">
          <div className="w-1 h-5 bg-[#FF8A00]"></div>
          <h2 className="text-[11px] font-black text-white/50 tracking-[0.3em] uppercase">AVAILABLE EPISODES</h2>
        </header>
        <div className="grid grid-cols-2 gap-5 text-left">
          {persiaEpisodes.map((ep, index) => (
            <div key={ep.id} className="flex flex-col gap-2.5 active:scale-95 transition-all" onClick={() => openEpisode(index)}>
              <div className={`relative aspect-video rounded-lg overflow-hidden border-2 ${currentIdx === index ? 'border-[#FF8A00] shadow-[0_0_15px_rgba(255,138,0,0.2)]' : 'border-white/5'}`}>
                <img src={ep.thumb} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-black/20" />
                <span className="absolute bottom-1.5 right-1.5 bg-black/80 backdrop-blur-md px-2 py-0.5 text-[8px] font-black rounded border border-white/10 uppercase">{ep.dur}</span>
              </div>
              <h3 className="font-bold text-[10px] truncate uppercase tracking-tight text-white/90">EP. {ep.id} {ep.title}</h3>
            </div>
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
        <div className="space-y-4 mb-8 text-left">
          <p className="text-[10px] leading-relaxed">© {new Date().getFullYear()} Estudios 421. All rights reserved on the design and editing of the platform.</p>
          <p className="text-[9px] leading-relaxed text-gray-600 font-medium tracking-tight text-justify">Legal Notice: The audiovisual content shared on this site belongs to its respective owners and production companies. Estudios 421 is a non-profit platform dedicated to the dissemination of biblical content.</p>
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

export default TheQueenOfPersiaEN_Mobile;
