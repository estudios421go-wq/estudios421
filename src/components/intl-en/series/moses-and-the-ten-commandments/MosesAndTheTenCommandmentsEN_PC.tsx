import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoChevronBack, IoChevronForward, IoList, IoClose, IoCheckmarkCircle, IoChevronDown } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
// Step 3: International Search Database
import { allSeriesEn } from '../../../../data/en/seriesEn';

// --- EPISODE CONFIGURATION ---
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

const MosesAndTheTenCommandmentsEN_PC = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [currentSeason, setCurrentSeason] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [inMyList, setInMyList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const episodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const [openS1, setOpenS1] = useState(true);
  const [openS2, setOpenS2] = useState(false);

  const SERIES_ID = 5;

  useEffect(() => {
    // --- BLINDAJE TOTAL (CLONED FROM GENESIS) ---
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

    // Persistence
    const savedPos = localStorage.getItem('moses_last_pos_en');
    if (savedPos) {
      const { s, i } = JSON.parse(savedPos);
      setCurrentSeason(s);
      setCurrentIdx(i);
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

  // International Search Logic (Cloned Step 3)
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
    setCurrentSeason(season);
    setCurrentIdx(idx);
    setSelectedVideo(url);
    localStorage.setItem('moses_last_pos_en', JSON.stringify({ s: season, i: idx }));
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
      <Head><title>Moses and the Ten Commandments — Estudios 421</title></Head>

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
            {[{ n: '', img: '367960b11c1c44ba89cd1582fd1b5776', p: '/serie/moises-y-los-diez-mandamientos' }, 
              { n: 'en', img: '35112d9ffe234d6f9dcef16cf8f7544e', p: '/en/series/moses-and-the-ten-commandments' }, 
              { n: 'pt', img: '830f1c20656e4d44a819bedfc13a22cc', p: '/pt/series/moises-os-dez-mandamentos' }].map((l) => (
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
        <img src="https://static.wixstatic.com/media/859174_c880bb44e3764bef9a5e8cf5992752ea~mv2.jpg" className="w-full h-full object-cover" alt="Banner Moses" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/10 opacity-70" />
        <div className="absolute bottom-[-30px] left-16 flex gap-6 z-20 items-center">
          <button onClick={() => openEpisode(currentSeason, currentIdx)} className="bg-white text-black font-black py-4 px-12 rounded-sm text-lg hover:bg-[#FF8A00] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-2xl uppercase">
            {currentIdx === 0 && currentSeason === 1 ? "▶ Watch Now" : `▶ Continue S${currentSeason} Ep.${currentIdx + 1}`}
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

        <div className="flex flex-col gap-6 max-w-6xl mx-auto">
          {/* Season 1 */}
          <div className="border border-white/10 rounded-xl overflow-hidden bg-white/[0.02]">
            <button onClick={() => setOpenS1(!openS1)} className="w-full px-8 py-6 flex items-center justify-between hover:bg-white/[0.05] transition-all group">
              <span className="text-xl font-black uppercase tracking-widest group-hover:text-[#FF8A00]">Season 1</span>
              <IoChevronDown size={24} className={`transition-transform duration-500 ${openS1 ? 'rotate-180 text-[#FF8A00]' : ''}`} />
            </button>
            <div className={`transition-all duration-700 ease-in-out ${openS1 ? 'max-h-[5000px] opacity-100 py-8 px-8' : 'max-h-0 opacity-0 overflow-hidden'}`}>
              <div className="grid grid-cols-8 gap-4">
                {MosesS1.map((_, i) => (
                  <button key={i} onClick={() => openEpisode(1, i)} className={`aspect-square rounded-lg font-bold text-sm transition-all border ${currentSeason === 1 && currentIdx === i ? 'bg-[#FF8A00] border-[#FF8A00] text-white' : 'bg-white/5 border-white/10 hover:border-[#FF8A00] hover:text-[#FF8A00]'}`}>
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Season 2 */}
          <div className="border border-white/10 rounded-xl overflow-hidden bg-white/[0.02]">
            <button onClick={() => setOpenS2(!openS2)} className="w-full px-8 py-6 flex items-center justify-between hover:bg-white/[0.05] transition-all group">
              <span className="text-xl font-black uppercase tracking-widest group-hover:text-[#FF8A00]">Season 2</span>
              <IoChevronDown size={24} className={`transition-transform duration-500 ${openS2 ? 'rotate-180 text-[#FF8A00]' : ''}`} />
            </button>
            <div className={`transition-all duration-700 ease-in-out ${openS2 ? 'max-h-[2000px] opacity-100 py-8 px-8' : 'max-h-0 opacity-0 overflow-hidden'}`}>
              <div className="grid grid-cols-8 gap-4">
                {MosesS2.map((_, i) => (
                  <button key={i} onClick={() => openEpisode(2, i)} className={`aspect-square rounded-lg font-bold text-sm transition-all border ${currentSeason === 2 && currentIdx === i ? 'bg-[#FF8A00] border-[#FF8A00] text-white' : 'bg-white/5 border-white/10 hover:border-[#FF8A00] hover:text-[#FF8A00]'}`}>
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 z-[1000] bg-[#050608] flex flex-col animate-fade-in overflow-hidden">
          <div className="h-[12vh] min-h-[85px] px-12 flex items-center justify-between bg-gradient-to-b from-[#0a0b0d] to-[#050608] border-b border-white/5 relative shadow-2xl">
            <div className="flex items-center gap-8">
              <div className="flex flex-col border-l-4 border-[#FF8A00] pl-6 py-1 text-left">
                <span className="text-[10px] font-black text-[#FF8A00]/80 uppercase tracking-[0.5em] mb-1">Series: Moses and the Ten Commandments</span>
                <h2 className="text-2xl font-black tracking-tighter uppercase leading-none">
                  S{currentSeason} <span className="text-white/20 mx-3">/</span> Episode {currentIdx + 1}
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
            <button disabled={currentIdx === 0} onClick={() => openEpisode(currentSeason, currentIdx - 1)} className="group flex items-center gap-5 disabled:opacity-5 transition-all">
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
              disabled={currentSeason === 1 ? currentIdx === MosesS1.length - 1 : currentIdx === MosesS2.length - 1} 
              onClick={() => openEpisode(currentSeason, currentIdx + 1)} 
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

      {/* FOOTER (CLONED FROM GENESIS) */}
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

export default MosesAndTheTenCommandmentsEN_PC;
