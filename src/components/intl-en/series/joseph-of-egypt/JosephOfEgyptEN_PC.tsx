import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoCloseOutline, IoChevronBack, IoChevronForward, IoList, IoClose, IoCheckmarkCircle } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
// Importamos la base de datos en inglés para el buscador
import { allSeriesEn } from '../../../../data/en/seriesEn';

const josephEpisodes = [
  { 
    id: 1, 
    title: "The Birth Of Joseph", 
    dur: "01:04:56", 
    desc: "Joseph’s story begins with his birth, an event that stirs unease and expectation within his family. His arrival marks a profound change in his parents’ destiny and foreshadows a future filled with challenges.", 
    thumb: "https://static.wixstatic.com/media/859174_b44bad1703f7498ab87ffc2899850ed7~mv2.jpg", 
    url: "https://ok.ru/videoembed/15168075008512" 
  },
  { 
    id: 25, 
    title: "Threatened Rise", 
    dur: "00:37:18", 
    desc: "As Egypt celebrates Joseph’s rise, a silent threat begins to take shape. Power attracts enemies willing to do anything.", 
    thumb: "https://static.wixstatic.com/media/859174_d4e8dbf5e22a40a2ad7eadf1361388c0~mv2.jpg", 
    url: "https://ok.ru/videoembed/15168208046592" 
  }
];

const JosephOfEgyptEN_PC = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [inMyList, setInMyList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const episodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  const SERIES_ID = 4; // ID unificado para Joseph of Egypt

  useEffect(() => {
    // --- BLINDAJE TOTAL ---
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

    // Persistencia de progreso
    const savedEp = localStorage.getItem('en_joseph_last_ep');
    if (savedEp) {
      const idx = parseInt(savedEp);
      if (idx < josephEpisodes.length) setCurrentIdx(idx);
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

  // Buscador Internacional
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
    setCurrentIdx(idx);
    setSelectedVideo(josephEpisodes[idx].url);
    localStorage.setItem('en_joseph_last_ep', idx.toString());
  };

  const closePlayer = () => {
    setSelectedVideo(null);
    setTimeout(() => {
      episodeRefs.current[currentIdx]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

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
      <Head><title>Joseph of Egypt — Estudios 421</title></Head>

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
            {[{ n: '', img: '367960b11c1c44ba89cd1582fd1b5776' }, { n: 'en', img: '35112d9ffe234d6f9dcef16cf8f7544e' }, { n: 'pt', img: '830f1c20656e4d44a819bedfc13a22cc' }].map((l) => (
              <Link key={l.n} href={l.n === '' ? '/serie/jose-de-egipto' : `/${l.n}/series/joseph-of-egypt`}><img src={`https://static.wixstatic.com/media/859174_${l.img}~mv2.png`} className="w-7 h-7 object-contain cursor-pointer hover:scale-110 transition-transform" /></Link>
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
        <img src="https://static.wixstatic.com/media/859174_dbbdb3b32512463db1dfc87c67308ba1~mv2.jpg" className="w-full h-full object-cover" alt="Banner Joseph of Egypt" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/10 opacity-70" />
        <div className="absolute bottom-[-30px] left-16 flex gap-6 z-20 items-center">
          <button onClick={() => openEpisode(currentIdx)} className="bg-white text-black font-black py-4 px-12 rounded-sm text-lg hover:bg-[#FF8A00] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-2xl uppercase tracking-wider">
            ▶ Watch {josephEpisodes[currentIdx].id === 1 ? 'First Episode' : 'Sample Episode'}
          </button>
          <button onClick={toggleMyList} className={`border py-4 px-10 rounded-sm transition-all uppercase font-bold ${inMyList ? 'bg-[#FF8A00] border-[#FF8A00] text-white' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}>
            {inMyList ? <><IoCheckmarkCircle className="inline mr-2" /> In My List</> : '+ My List'}
          </button>
          <button onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS', '_blank')} className="border py-4 px-10 rounded-sm bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all uppercase font-bold">❤ Donate</button>
        </div>
      </div>

      <div className="h-20 bg-black"></div>

      <div className="px-16 mb-20 relative z-10 text-left">
        <header className="flex items-center gap-4 mb-10 border-b border-white/10 pb-4">
          <div className="w-1.5 h-8 bg-[#FF8A00]"></div>
          <h2 className="text-2xl font-bold tracking-tight uppercase">Sample Episodes</h2>
        </header>

        <div className="grid grid-cols-4 gap-8">
          {josephEpisodes.map((ep, index) => (
            <div key={ep.id} ref={(el) => { episodeRefs.current[index] = el; }} className={`group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 bg-[#2C2F33] border-2 ${currentIdx === index ? 'border-[#FF8A00] ring-4 ring-[#FF8A00]/20' : 'border-transparent hover:border-white/20 hover:shadow-2xl'}`} onClick={() => openEpisode(index)}>
              <div className="relative aspect-video overflow-hidden">
                <img src={ep.thumb} className="w-full h-full object-cover group-hover:scale-110 transition duration-700 pointer-events-none" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C2F33] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-2 left-2 flex items-center">
                  <div className="bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1 rounded-md shadow-lg">
                    <span className="text-[11px] font-black uppercase text-white">Episode <span className="text-[#FF8A00]">{ep.id}</span></span>
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 shadow-lg">
                  <span className="text-[10px] font-bold text-white tracking-widest tabular-nums">{ep.dur}</span>
                </div>
              </div>
              <div className="p-5 flex flex-col gap-1 text-left">
                <h3 className="font-bold text-base truncate uppercase transition-colors group-hover:text-[#FF8A00]">{ep.title}</h3>
                <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed h-8">{ep.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MENSAJE DE ESPERANZA */}
      <div className="px-16 mb-32">
        <div className="max-w-4xl bg-white/[0.02] border border-white/5 p-10 rounded-2xl">
          <p className="text-gray-400 italic text-lg leading-relaxed mb-6">
            "Joseph's journey from a pit to a palace reminds us that no matter the hardship, God's plan is always at work. 
            Trust the process, for your greatest triumph might be just around the corner."
          </p>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <p className="text-[#FF8A00] font-bold text-sm uppercase tracking-wider">
              IF IT IS WITHIN YOUR MEANS, SUPPORT US WITH YOUR DONATION SO WE CAN CONTINUE SHARING THESE BEAUTIFUL SERIES.
            </p>
            <button onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS', '_blank')} className="bg-[#FF8A00] text-black font-black py-3 px-8 rounded-full hover:scale-105 transition-all text-xs uppercase shadow-lg">
              Support Our Work
            </button>
          </div>
        </div>
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 z-[1000] bg-[#050608] flex flex-col animate-fade-in overflow-hidden">
          <div className="h-[12vh] min-h-[85px] px-12 flex items-center justify-between bg-gradient-to-b from-[#0a0b0d] to-[#050608] border-b border-white/5 relative shadow-2xl">
            <div className="flex items-center gap-8">
              <div className="flex flex-col border-l-4 border-[#FF8A00] pl-6 py-1 text-left">
                <span className="text-[10px] font-black text-[#FF8A00]/80 uppercase tracking-[0.5em] mb-1">Series: Joseph of Egypt</span>
                <h2 className="text-2xl font-black tracking-tighter uppercase">Episode {josephEpisodes[currentIdx].id} <span className="text-white/10 mx-3">/</span> {josephEpisodes[currentIdx].title}</h2>
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
                <span className="text-sm font-bold uppercase text-white/80">Ep. {josephEpisodes[currentIdx === 0 ? 0 : currentIdx - 1].id}</span>
              </div>
            </button>
            <button onClick={closePlayer} className="flex items-center gap-4 bg-white/[0.03] px-10 py-4 rounded-2xl border border-white/5 hover:bg-white/[0.08] transition-all group scale-95 hover:scale-100">
              <IoList className="text-2xl text-[#FF8A00]" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-white/60">Sample List</span>
            </button>
            <button disabled={currentIdx === josephEpisodes.length - 1} onClick={() => openEpisode(currentIdx + 1)} className="group flex items-center gap-6 disabled:opacity-5 transition-all">
              <div className="flex flex-col items-end text-right">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FF8A00]">Next</span>
                <span className="text-sm font-bold uppercase text-white/80">Ep. {josephEpisodes[currentIdx === josephEpisodes.length - 1 ? 0 : currentIdx + 1].id}</span>
              </div>
              <div className="w-16 h-16 rounded-[22px] bg-[#FF8A00] flex items-center justify-center text-black shadow-2xl group-hover:scale-110 transition-all">
                <IoChevronForward className="text-4xl" />
              </div>
            </button>
          </div>
        </div>
      )}

      {/* FOOTER */}
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

export default JosephOfEgyptEN_PC;
