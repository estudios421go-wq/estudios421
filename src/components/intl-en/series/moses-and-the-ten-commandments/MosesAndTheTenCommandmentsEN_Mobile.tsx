import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoMenuOutline, IoCloseOutline, IoChevronBack, IoChevronForward, IoList, IoClose, IoCheckmarkCircle, IoChevronDown } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { BiDonateHeart } from 'react-icons/bi';
// Cloned Step 3: International Search Logic
import { allSeriesEn } from '../../../../data/en/seriesEn';

// --- EPISODE CONFIGURATION (STEP 2: REPLACED LINKS) ---
const MosesS1 = [
  "https://ok.ru/videoembed/8980406536720", "https://ok.ru/videoembed/9640336493239", "https://ok.ru/videoembed/9640336558775",
  "https://ok.ru/videoembed/9640336624311", "https://ok.ru/videoembed/9640336689847", "https://ok.ru/videoembed/9642627435191",
  "https://ok.ru/videoembed/9642627697335", "https://ok.ru/videoembed/9642627828407", "https://ok.ru/videoembed/9642628025015",
  "https://ok.ru/videoembed/9642628221623", "https://ok.ru/videoembed/9645061376695", "https://ok.ru/videoembed/9645061442231",
  "https://ok.ru/videoembed/9645061507767", "https://ok.ru/videoembed/9645061638839", "https://ok.ru/videoembed/9645061835447",
  "https://ok.ru/videoembed/9645061966519", "https://ok.ru/videoembed/9645062228663", "https://ok.ru/videoembed/9645062359735",
  "https://ok.ru/videoembed/9645363104439", "https://ok.ru/videoembed/9645363169975", "https://ok.ru/videoembed/9659569670839",
  "https://ok.ru/videoembed/9659569736375", "https://ok.ru/videoembed/9659569867447", "https://ok.ru/videoembed/9659569932983",
  "https://ok.ru/videoembed/9659570064055", "https://ok.ru/videoembed/9659570260663", "https://ok.ru/videoembed/9659570326199",
  "https://ok.ru/videoembed/9659570457271", "https://ok.ru/videoembed/9659570588343", "https://ok.ru/videoembed/9659570850487",
  "https://ok.ru/videoembed/9662153296567", "https://ok.ru/videoembed/9662153427639", "https://ok.ru/videoembed/9662153558711",
  "https://ok.ru/videoembed/9662153689783", "https://ok.ru/videoembed/9662153755319", "https://ok.ru/videoembed/9662153951927",
  "https://ok.ru/videoembed/9662154017463", "https://ok.ru/videoembed/9662154279607", "https://ok.ru/videoembed/9662154607287",
  "https://ok.ru/videoembed/9662154934967", "https://ok.ru/videoembed/2514380655257", "https://ok.ru/videoembed/2534132026009",
  "https://ok.ru/videoembed/2651896875673", "https://ok.ru/videoembed/2543602174617", "https://ok.ru/videoembed/2557563308697",
  "https://ok.ru/videoembed/2559745657497", "https://ok.ru/videoembed/2566498618009", "https://ok.ru/videoembed/2571048258201",
  "https://ok.ru/videoembed/2572078680729", "https://ok.ru/videoembed/2587912768153", "https://ok.ru/videoembed/2592605473433",
  "https://ok.ru/videoembed/2597021158041", "https://ok.ru/videoembed/2628395928217", "https://ok.ru/videoembed/2651892091545",
  "https://ok.ru/videoembed/2670279133849", "https://ok.ru/videoembed/2688696322713", "https://ok.ru/videoembed/2765985680025",
  "https://ok.ru/videoembed/2943074568857", "https://ok.ru/videoembed/3017081424537", "https://ok.ru/videoembed/3294994434713",
  "https://ok.ru/videoembed/3326166895257", "https://ok.ru/videoembed/3333365566105", "https://ok.ru/videoembed/3390255139481",
  "https://ok.ru/videoembed/3393639221913", "https://ok.ru/videoembed/3401368603289", "https://ok.ru/videoembed/3407105952409",
  "https://ok.ru/videoembed/3412782877337", "https://ok.ru/videoembed/3431579191961", "https://ok.ru/videoembed/3447830022809",
  "https://ok.ru/videoembed/3455607638681", "https://ok.ru/videoembed/3467651910297", "https://ok.ru/videoembed/3481582176921",
  "https://ok.ru/videoembed/3486531127961", "https://ok.ru/videoembed/3490131937945", "https://ok.ru/videoembed/3494343871129",
  "https://ok.ru/videoembed/3498529000089", "https://ok.ru/videoembed/3507578276505", "https://ok.ru/videoembed/3511745120921",
  "https://ok.ru/videoembed/3512208853657", "https://ok.ru/videoembed/3512289921689", "https://ok.ru/videoembed/3524785736345",
  "https://ok.ru/videoembed/3539221809817", "https://ok.ru/videoembed/3553415137945", "https://ok.ru/videoembed/3582507813529",
  "https://ok.ru/videoembed/3610648054425", "https://ok.ru/videoembed/3642488261273", "https://ok.ru/videoembed/3670397422233",
  "https://ok.ru/videoembed/3686895848089", "https://ok.ru/videoembed/3704829119129", "https://ok.ru/videoembed/3721114684057",
  "https://ok.ru/videoembed/3729112566425", "https://ok.ru/videoembed/3728518220441", "https://ok.ru/videoembed/3729237215897",
  "https://ok.ru/videoembed/3731281808025", "https://ok.ru/videoembed/3733480475289", "https://ok.ru/videoembed/3735452912281",
  "https://ok.ru/videoembed/3736738400921", "https://ok.ru/videoembed/3736934288025", "https://ok.ru/videoembed/3737208294041",
  "https://ok.ru/videoembed/3739093895833", "https://ok.ru/videoembed/3740320664217", "https://ok.ru/videoembed/3740437449369",
  "https://ok.ru/videoembed/3740988344985", "https://ok.ru/videoembed/3741055191705", "https://ok.ru/videoembed/3742077946521",
  "https://ok.ru/videoembed/3742193420953", "https://ok.ru/videoembed/3742999120537", "https://ok.ru/videoembed/3744247909017",
  "https://ok.ru/videoembed/3744443861657", "https://ok.ru/videoembed/3744631884441", "https://ok.ru/videoembed/3744699517593",
  "https://ok.ru/videoembed/3745115474585", "https://ok.ru/videoembed/3745225640601", "https://ok.ru/videoembed/3745226492569",
  "https://ok.ru/videoembed/3746438515353", "https://ok.ru/videoembed/3747130444441", "https://ok.ru/videoembed/3749194959513",
  "https://ok.ru/videoembed/3749195745945", "https://ok.ru/videoembed/3749408869017", "https://ok.ru/videoembed/3749422500505",
  "https://ok.ru/videoembed/3751037307545", "https://ok.ru/videoembed/3751227624089", "https://ok.ru/videoembed/3751345785497",
  "https://ok.ru/videoembed/3751347423897", "https://ok.ru/videoembed/3752707558041", "https://ok.ru/videoembed/3753095662233",
  "https://ok.ru/videoembed/3753148025497", "https://ok.ru/videoembed/3753193900697", "https://ok.ru/videoembed/3755449453209",
  "https://ok.ru/videoembed/3755467672217", "https://ok.ru/videoembed/3758690667161", "https://ok.ru/videoembed/3758946650777",
  "https://ok.ru/videoembed/3759456193177", "https://ok.ru/videoembed/3759461042841", "https://ok.ru/videoembed/3762521639577",
  "https://ok.ru/videoembed/3762745576089", "https://ok.ru/videoembed/3765934426777", "https://ok.ru/videoembed/3766103640729",
  "https://ok.ru/videoembed/3766388591257", "https://ok.ru/videoembed/3766445214361", "https://ok.ru/videoembed/3770445335193",
  "https://ok.ru/videoembed/3770527517337", "https://ok.ru/videoembed/3770602097305", "https://ok.ru/videoembed/3770604849817",
  "https://ok.ru/videoembed/3772621130393", "https://ok.ru/videoembed/3772676770457", "https://ok.ru/videoembed/3774748101273",
  "https://ok.ru/videoembed/3774819666585", "https://ok.ru/videoembed/3780496591513", "https://ok.ru/videoembed/3782235196057",
  "https://ok.ru/videoembed/3782307744409", "https://ok.ru/videoembed/3782310300313", "https://ok.ru/videoembed/3786585934489",
  "https://ok.ru/videoembed/3787691068057", "https://ok.ru/videoembed/3788460329625", "https://ok.ru/videoembed/3788507908761",
  "https://ok.ru/videoembed/3790299728537", "https://ok.ru/videoembed/3790526089881", "https://ok.ru/videoembed/3794604001945",
  "https://ok.ru/videoembed/3796424788633", "https://ok.ru/videoembed/3797301463705", "https://ok.ru/videoembed/3798729427609",
  "https://ok.ru/videoembed/3800881236633", "https://ok.ru/videoembed/3803558972057", "https://ok.ru/videoembed/3812199172761",
  "https://ok.ru/videoembed/3815259769497", "https://ok.ru/videoembed/3819820616345", "https://ok.ru/videoembed/3821674629785",
  "https://ok.ru/videoembed/3826045094553", "https://ok.ru/videoembed/3826080942745", "https://ok.ru/videoembed/3829285980825",
  "https://ok.ru/videoembed/3829648984729", "https://ok.ru/videoembed/3831871179417", "https://ok.ru/videoembed/3831938157209",
  "https://ok.ru/videoembed/3833521834649", "https://ok.ru/videoembed/3833806654105"
];

const MosesS2 = [
  "https://ok.ru/videoembed/8486458755600", "https://ok.ru/videoembed/8486475860496", "https://ok.ru/videoembed/8821616282128",
  "https://ok.ru/videoembed/8821616937488", "https://ok.ru/videoembed/8821617789456", "https://ok.ru/videoembed/8821618772496",
  "https://ok.ru/videoembed/8821619886608", "https://ok.ru/videoembed/8821620476432", "https://ok.ru/videoembed/8829453797904",
  "https://ok.ru/videoembed/8829454846480", "https://ok.ru/videoembed/9724578892471", "https://ok.ru/videoembed/8829456747024",
  "https://ok.ru/videoembed/8829894986256", "https://ok.ru/videoembed/8831949605392", "https://ok.ru/videoembed/8831950850576",
  "https://ok.ru/videoembed/8834957249040", "https://ok.ru/videoembed/8834957445648", "https://ok.ru/videoembed/8840097565200",
  "https://ok.ru/videoembed/8840097827344", "https://ok.ru/videoembed/8840097892880", "https://ok.ru/videoembed/8840098089488",
  "https://ok.ru/videoembed/8840098220560", "https://ok.ru/videoembed/8840098613776", "https://ok.ru/videoembed/8840098941456",
  "https://ok.ru/videoembed/8840099072528", "https://ok.ru/videoembed/8897525975568", "https://ok.ru/videoembed/8897526172176",
  "https://ok.ru/videoembed/8897526368784", "https://ok.ru/videoembed/8897526696464", "https://ok.ru/videoembed/8897526958608",
  "https://ok.ru/videoembed/8900251683344", "https://ok.ru/videoembed/8900251748880", "https://ok.ru/videoembed/8900251814416",
  "https://ok.ru/videoembed/8900251879952", "https://ok.ru/videoembed/8900251945488", "https://ok.ru/videoembed/8900252011024",
  "https://ok.ru/videoembed/8900252076560", "https://ok.ru/videoembed/8900252207632", "https://ok.ru/videoembed/8900252404240",
  "https://ok.ru/videoembed/8900252469776", "https://ok.ru/videoembed/8902526503440", "https://ok.ru/videoembed/8903025822224",
  "https://ok.ru/videoembed/8903370213904", "https://ok.ru/videoembed/8903370279440", "https://ok.ru/videoembed/8903370410512",
  "https://ok.ru/videoembed/8914001988112", "https://ok.ru/videoembed/8914002971152", "https://ok.ru/videoembed/8914003626512",
  "https://ok.ru/videoembed/8914004806160", "https://ok.ru/videoembed/8914005527056", "https://ok.ru/videoembed/8963537177104",
  "https://ok.ru/videoembed/8963537242640", "https://ok.ru/videoembed/8963537504784", "https://ok.ru/videoembed/8963537635856",
  "https://ok.ru/videoembed/8963537832464", "https://ok.ru/videoembed/8963537898000", "https://ok.ru/videoembed/8963537963536",
  "https://ok.ru/videoembed/8963538094608", "https://ok.ru/videoembed/8963538225680", "https://ok.ru/videoembed/8963538291216",
  "https://ok.ru/videoembed/8963538815504", "https://ok.ru/videoembed/8967720077840", "https://ok.ru/videoembed/8967720471056",
  "https://ok.ru/videoembed/8967720602128", "https://ok.ru/videoembed/8967720733200", "https://ok.ru/videoembed/8979260770832"
];

const MosesAndTheTenCommandmentsEN_Mobile = () => {
  const router = useRouter();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentSeason, setCurrentSeason] = useState(1);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inMyList, setInMyList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Accordions
  const [openS1, setOpenS1] = useState(true);
  const [openS2, setOpenS2] = useState(false);

  const SERIES_ID = 5;

  useEffect(() => {
    // --- BLINDAJE MÓVIL (CLONED FROM GENESIS) ---
    const handleContext = (e: any) => e.preventDefault();
    document.addEventListener('contextmenu', handleContext);

    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    
    // Progress Persistence
    const savedPos = localStorage.getItem('moses_mobile_last_pos_en');
    if (savedPos) {
      const { s, i } = JSON.parse(savedPos);
      setCurrentSeason(s);
      setCurrentIdx(i);
    }
    
    // My List verification
    const list = JSON.parse(localStorage.getItem('myList') || '[]');
    if (list.includes(SERIES_ID)) setInMyList(true);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('contextmenu', handleContext);
    };
  }, []);

  // International Search Logic (Cloned)
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

  const openEpisode = (season: number, idx: number) => {
    const url = season === 1 ? MosesS1[idx] : MosesS2[idx];
    setSelectedVideo(url);
    setCurrentSeason(season);
    setCurrentIdx(idx);
    localStorage.setItem('moses_mobile_last_pos_en', JSON.stringify({ s: season, i: idx }));
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
        <Head><title>Watching: S{currentSeason} Ep. {currentIdx + 1} — Moses</title></Head>
        <div className="px-6 h-[85px] flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent border-b border-white/5 z-10">
          <div className="flex flex-col border-l-4 border-[#FF8A00] pl-4 py-1 text-left">
            <span className="text-[9px] font-black text-[#FF8A00] uppercase tracking-[0.3em] mb-1">Moses and the Ten Commandments</span>
            <h2 className="text-sm font-black tracking-tight uppercase truncate max-w-[200px]">
              S{currentSeason} <span className="text-white/20 mx-1">|</span> Episode {currentIdx + 1}
            </h2>
          </div>
          <button onClick={() => setSelectedVideo(null)} className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full border border-white/10 active:scale-90 transition-all">
            <IoClose className="text-2xl" />
          </button>
        </div>
        <div className="flex-grow flex flex-col relative bg-black items-center justify-center">
          <iframe src={selectedVideo + "?autoplay=1"} className="w-full aspect-video border-none shadow-[0_0_50px_rgba(0,0,0,1)]" allow="autoplay; fullscreen" allowFullScreen />
          <div className="absolute inset-x-0 bottom-8 flex justify-around items-center px-6">
            <button disabled={currentIdx === 0} onClick={() => openEpisode(currentSeason, currentIdx - 1)} className="flex flex-col items-center gap-2 group disabled:opacity-5">
              <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center active:bg-[#FF8A00] transition-all"><IoChevronBack size={20} /></div>
              <span className="text-[8px] font-black uppercase tracking-widest text-gray-500">Previous</span>
            </button>
            <button onClick={() => setSelectedVideo(null)} className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center active:bg-white active:text-black transition-all"><IoList size={24} className="text-[#FF8A00]" /></div>
              <span className="text-[8px] font-black uppercase tracking-widest text-white/40">Chapters</span>
            </button>
            <button 
              disabled={currentSeason === 1 ? currentIdx === MosesS1.length - 1 : currentIdx === MosesS2.length - 1} 
              onClick={() => openEpisode(currentSeason, currentIdx + 1)} 
              className="flex flex-col items-center gap-2 group disabled:opacity-5"
            >
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
      <Head><title>Moses and the Ten Commandments — Estudios 421</title></Head>
      
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

      {/* CLONED SIDE MENU */}
      <div className={`fixed inset-0 bg-black/98 z-[100] transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full pt-24 px-8 gap-8 text-left">
          <p className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/10 pb-2">Navigation</p>
          <Link href="/en" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white">Home</Link>
          <Link href="/en/biblical-series" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white">Biblical Series</Link>
          <Link href="/en/tv-shows" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white">TV Shows</Link>
          <Link href="/en/movies" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white">Movies</Link>
          <p className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/10 pb-2 mt-4">Language</p>
          <div className="flex gap-6">
            {[{l:'ESP', i:'367960b11c1c44ba89cd1582fd1b5776', p:'/serie/moises-y-los-diez-mandamientos'}, {l:'ENG', i:'35112d9ffe234d6f9dcef16cf8f7544e', p:'/en/series/moses-and-the-ten-commandments'}, {l:'PT', i:'830f1c20656e4d44a819bedfc13a22cc', p:'/pt/series/moises-os-dez-mandamentos'}].map((lang) => (
              <Link key={lang.l} href={lang.p} className="flex flex-col items-center gap-2 active:scale-95 transition-transform">
                <img src={`https://static.wixstatic.com/media/859174_${lang.i}~mv2.png`} alt={lang.l} className="w-10 h-10 object-contain" /><span className="text-[10px] text-white font-bold">{lang.l}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="relative w-full pt-0 bg-black shadow-2xl">
        <div className="w-full aspect-[4/3] relative">
          {/* REPLACED BANNER (STEP 2) */}
          <img src="https://static.wixstatic.com/media/859174_c880bb44e3764bef9a5e8cf5992752ea~mv2.jpg" className="w-full h-full object-contain" alt="Moses Banner" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        </div>
        <div className="px-4 -mt-14 flex flex-col gap-3 relative z-20">
          <button onClick={() => openEpisode(currentSeason, currentIdx)} className="w-full bg-white text-black font-black py-4 rounded-md text-sm active:scale-95 transition-transform uppercase tracking-[0.2em] shadow-2xl">
            {currentIdx === 0 && currentSeason === 1 ? "▶ Watch Now" : `▶ Continue S${currentSeason} Ep. ${currentIdx + 1}`}
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
        <header className="flex items-center gap-3 mb-6 border-b border-white/5 pb-3 text-left">
          <div className="w-1 h-5 bg-[#FF8A00]"></div>
          <h2 className="text-[11px] font-black text-white/50 tracking-[0.3em] uppercase">Available Episodes</h2>
        </header>

        <div className="space-y-4">
          {/* SEASON 1 */}
          <div className="border border-white/5 rounded-lg bg-white/[0.02] overflow-hidden">
            <button onClick={() => setOpenS1(!openS1)} className="w-full px-5 py-4 flex items-center justify-between active:bg-white/5">
              <span className="text-xs font-black uppercase tracking-widest text-white/80">Season 1</span>
              <IoChevronDown size={18} className={`transition-transform ${openS1 ? 'rotate-180 text-[#FF8A00]' : ''}`} />
            </button>
            <div className={`transition-all ${openS1 ? 'h-auto py-6 px-4' : 'h-0 overflow-hidden'}`}>
              <div className="grid grid-cols-5 gap-3">
                {MosesS1.map((_, i) => (
                  <button key={i} onClick={() => openEpisode(1, i)} className={`aspect-square rounded-md text-[10px] font-bold border transition-all ${currentSeason === 1 && currentIdx === i ? 'bg-[#FF8A00] border-[#FF8A00] text-white' : 'bg-white/5 border-white/10 text-white/60'}`}>
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* SEASON 2 */}
          <div className="border border-white/5 rounded-lg bg-white/[0.02] overflow-hidden">
            <button onClick={() => setOpenS2(!openS2)} className="w-full px-5 py-4 flex items-center justify-between active:bg-white/5">
              <span className="text-xs font-black uppercase tracking-widest text-white/80">Season 2</span>
              <IoChevronDown size={18} className={`transition-transform ${openS2 ? 'rotate-180 text-[#FF8A00]' : ''}`} />
            </button>
            <div className={`transition-all ${openS2 ? 'h-auto py-6 px-4' : 'h-0 overflow-hidden'}`}>
              <div className="grid grid-cols-5 gap-3">
                {MosesS2.map((_, i) => (
                  <button key={i} onClick={() => openEpisode(2, i)} className={`aspect-square rounded-md text-[10px] font-bold border transition-all ${currentSeason === 2 && currentIdx === i ? 'bg-[#FF8A00] border-[#FF8A00] text-white' : 'bg-white/5 border-white/10 text-white/60'}`}>
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CLONED FOOTER */}
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

export default MosesAndTheTenCommandmentsEN_Mobile;
