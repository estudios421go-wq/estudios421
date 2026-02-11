import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoMenuOutline, IoCloseOutline, IoChevronBack, IoChevronForward, IoList, IoClose, IoCheckmarkCircle } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { BiDonateHeart } from 'react-icons/bi';
// Importamos la base de datos en inglés unificada
import { allSeriesEn } from '../../../../data/en/seriesEn';

const josephEpisodes = [
  { 
    id: 1, 
    title: "The Birth Of Joseph", 
    dur: "01:04:56", 
    thumb: "https://static.wixstatic.com/media/859174_b44bad1703f7498ab87ffc2899850ed7~mv2.jpg", 
    url: "https://ok.ru/videoembed/15168075008512" 
  },
  { 
    id: 25, 
    title: "Threatened Rise", 
    dur: "00:37:18", 
    thumb: "https://static.wixstatic.com/media/859174_d4e8dbf5e22a40a2ad7eadf1361388c0~mv2.jpg", 
    url: "https://ok.ru/videoembed/15168208046592" 
  }
];

const JosephOfEgyptEN_Mobile = () => {
  const router = useRouter();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inMyList, setInMyList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // ID UNIFICADO PARA JOSEPH OF EGYPT
  const SERIES_ID = 4;

  useEffect(() => {
    // --- BLINDAJE MÓVIL ---
    const handleContext = (e: any) => e.preventDefault();
    document.addEventListener('contextmenu', handleContext);
    
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    
    // Verificación de Mi Lista
    const list = JSON.parse(localStorage.getItem('myList') || '[]');
    if (list.includes(SERIES_ID)) setInMyList(true);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('contextmenu', handleContext);
    };
  }, []);

  // BUSCADOR INTERNACIONAL
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
    setSelectedVideo(josephEpisodes[idx].url);
    setCurrentIdx(idx);
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
        <Head><title>Watching: {josephEpisodes[currentIdx].title}</title></Head>
        <div className="px-6 h-[85px] flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent border-b border-white/5 z-10">
          <div className="flex flex-col border-l-4 border-[#FF8A00] pl-4 py-1 text-left">
            <span className="text-[9px] font-black text-[#FF8A00] uppercase tracking-[0.3em] mb-1">Series: Joseph of Egypt</span>
            <h2 className="text-sm font-black tracking-tight uppercase truncate max-w-[200px]">
              Ep. {josephEpisodes[currentIdx].id} <span className="text-white/20 mx-1">|</span> {josephEpisodes[currentIdx].title}
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
              <span className="text-[8px] font-black uppercase tracking-widest text-white/40">Sample List</span>
            </button>
            <button disabled={currentIdx === josephEpisodes.length - 1} onClick={() => openEpisode(currentIdx + 1)} className="flex flex-col items-center gap-2 group disabled:opacity-5">
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
      <Head><title>Joseph of Egypt — Estudios 421</title></Head>
      
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
            {[{l:'ESP', i:'367960b11c1c44ba89cd1582fd1b5776', p:'/serie/jose-de-egipto'}, {l:'ENG', i:'35112d9ffe234d6f9dcef16cf8f7544e', p:'/en/series/joseph-of-egypt'}].map((lang) => (
              <Link key={lang.l} href={lang.p} className="flex flex-col items-center gap-2 active:scale-95 transition-transform">
                <img src={`https://static.wixstatic.com/media/859174_${lang.i}~mv2.png`} alt={lang.l} className="w-10 h-10 object-contain" /><span className="text-[10px] text-white font-bold">{lang.l}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="relative w-full pt-0 bg-black shadow-2xl">
        <div className="w-full aspect-[4/3] relative">
          <img src="https://static.wixstatic.com/media/859174_dbbdb3b32512463db1dfc87c67308ba1~mv2.jpg" className="w-full h-full object-contain" alt="Banner Joseph of Egypt" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        </div>
        <div className="px-4 -mt-14 flex flex-col gap-3 relative z-20 text-left">
          <button onClick={() => openEpisode(currentIdx)} className="w-full bg-[#FF8A00] text-white font-black py-4 rounded-md text-sm active:scale-95 transition-transform uppercase tracking-[0.2em] shadow-2xl">
            ▶ Watch {josephEpisodes[currentIdx].id === 1 ? 'EP. 1' : 'Sample EP.'}
          </button>
          <div className="flex gap-3">
            <button onClick={toggleMyList} className={`flex-1 py-3.5 rounded-md text-[10px] font-black border transition-all tracking-widest ${inMyList ? 'bg-white border-white text-black' : 'bg-white/5 border-white/10 text-white active:bg-white/20'}`}>
              {inMyList ? <><IoCheckmarkCircle className="inline mr-1" /> IN MY LIST</> : '+ MY LIST'}
            </button>
            <button onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS', '_blank')} className="flex-1 bg-white/5 backdrop-blur-md py-3.5 rounded-md text-[10px] font-black border border-white/10 text-white active:bg-white/20 uppercase tracking-widest flex items-center justify-center gap-2"><BiDonateHeart className="text-[#FF8A00]"/> Donate</button>
          </div>
        </div>
      </div>

      <div className="px-5 mt-12 mb-10 text-left">
        <header className="flex items-center gap-3 mb-6 border-b border-white/5 pb-3">
          <div className="w-1 h-5 bg-[#FF8A00]"></div>
          <h2 className="text-[11px] font-black text-white/50 tracking-[0.3em] uppercase">Sample Episodes</h2>
        </header>
        <div className="grid grid-cols-2 gap-5 text-left mb-12">
          {josephEpisodes.map((ep, index) => (
            <div key={ep.id} className="flex flex-col gap-2.5 active:scale-95 transition-all text-left" onClick={() => openEpisode(index)}>
              <div className={`relative aspect-video rounded-lg overflow-hidden border-2 ${currentIdx === index ? 'border-[#FF8A00] shadow-[0_0_15px_rgba(255,138,0,0.2)]' : 'border-white/5'}`}>
                <img src={ep.thumb} className="w-full h-full object-cover" loading="lazy" />
                <span className="absolute bottom-1.5 right-1.5 bg-black/80 backdrop-blur-md px-2 py-0.5 text-[8px] font-black rounded border border-white/10 uppercase">{ep.dur}</span>
              </div>
              <h3 className="font-bold text-[10px] truncate uppercase tracking-tight text-white/90">EP. {ep.id} {ep.title}</h3>
            </div>
          ))}
        </div>

        {/* MENSAJE DE ESPERANZA MÓVIL */}
        <div className="bg-white/[0.03] border border-white/10 p-6 rounded-xl mb-16">
          <p className="text-gray-400 text-xs italic leading-relaxed mb-4">
            "Joseph's story reminds us that God's plan is always at work. Trust the process, 
            for your greatest triumph is near."
          </p>
          <p className="text-[#FF8A00] text-[9px] font-black uppercase tracking-wider mb-4 leading-tight">
            IF IT IS WITHIN YOUR MEANS, SUPPORT US WITH YOUR DONATION SO WE CAN CONTINUE SHARING THESE BEAUTIFUL SERIES.
          </p>
          <button onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS', '_blank')} className="w-full bg-[#FF8A00] text-black font-black py-3 rounded-lg text-[10px] uppercase shadow-lg active:scale-95 transition-transform">
            Support Our Work
          </button>
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
          <p className="text-[10px] leading-relaxed">© {new Date().getFullYear()} Estudios 421. All rights reserved.</p>
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

export default JosephOfEgyptEN_Mobile;
