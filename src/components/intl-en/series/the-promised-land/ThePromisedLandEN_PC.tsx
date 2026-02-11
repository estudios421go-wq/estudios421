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
  "https://ok.ru/videoembed/10369898646032", "https://ok.ru/videoembed/10369898777104", "https://ok.ru/videoembed/1036989842640", // Fix 144
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

const ThePromisedLandEN_PC = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [inMyList, setInMyList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const episodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const SERIES_ID = 6; // Replaced ID

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

    const savedIdx = localStorage.getItem('promised_land_last_idx_en');
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
    const url = PromisedLandEpisodes[idx];
    setCurrentIdx(idx);
    setSelectedVideo(url);
    localStorage.setItem('promised_land_last_idx_en', idx.toString());
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
      <Head><title>The Promised Land — Estudios 421</title></Head>

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
            {[{ n: '', img: '367960b11c1c44ba89cd1582fd1b5776', p: '/serie/la-tierra-prometida' }, 
              { n: 'en', img: '35112d9ffe234d6f9dcef16cf8f7544e', p: '/en/series/the-promised-land' }, 
              { n: 'pt', img: '830f1c20656e4d44a819bedfc13a22cc', p: '/pt/series/a-terra-prometida' }].map((l) => (
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
        <img src="https://static.wixstatic.com/media/859174_78e030706bd24f2fafb540a0fd6000a0~mv2.jpg" className="w-full h-full object-cover" alt="Banner Promised Land" />
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
            {PromisedLandEpisodes.map((_, i) => (
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
                <span className="text-[10px] font-black text-[#FF8A00]/80 uppercase tracking-[0.5em] mb-1">Series: The Promised Land</span>
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
              disabled={currentIdx === PromisedLandEpisodes.length - 1} 
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

export default ThePromisedLandEN_PC;
