import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Slider from 'react-slick';
import { IoSearchOutline, IoMenuOutline, IoCloseOutline, IoChevronBack, IoChevronForward, IoList, IoClose } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube, FaPlay } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import { BiDonateHeart } from 'react-icons/bi';
// Importamos la base de datos en inglés
import { allSeriesEn } from '../../data/en/seriesEn';

const InicioEN_Mobile = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [myList, setMyList] = useState<any[]>([]);
  const [recommended, setRecommended] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [activeTrailer, setActiveTrailer] = useState({ url: "", path: "" });

  const dataNewReleases = [
    { title: "Kings", banner: "https://static.wixstatic.com/media/859174_fb929d31093a4103aa377a28c0a00864~mv2.jpg", path: "/en/series/kings", audio: "English" },
    { title: "The Queen of Persia", banner: "https://static.wixstatic.com/media/859174_7cf266bc052643c79d5565165e53c403~mv2.jpg", path: "/en/series/the-queen-of-persia", audio: "English" },
    { title: "The Rich and Lazarus", banner: "https://static.wixstatic.com/media/859174_4bbb9c439b3648e3baaf9be321aad0ef~mv2.jpg", path: "/en/series/the-rich-and-lazarus", audio: "English" },
    { title: "Moses and the Ten Commandments", banner: "https://static.wixstatic.com/media/859174_63faa7f280dc4ddd9aff9f5d9a04be7d~mv2.jpg", path: "/en/series/moses-and-the-ten-commandments", audio: "English" },
    { title: "The Promised Land", banner: "https://static.wixstatic.com/media/859174_0821f5e39e5647f49da82ac7bae0a28d~mv2.jpg", path: "/en/series/the-promised-land", audio: "English" },
    { title: "Genesis", banner: "https://static.wixstatic.com/media/859174_e4155c0a6f4247c7a60122ee46a007ad~mv2.jpg", path: "/en/series/genesis", audio: "English" },
    { title: "King David", banner: "https://static.wixstatic.com/media/859174_5e4e785c4fc64d9fb333f9c909ea7104~mv2.jpg", path: "/en/series/king-david", audio: "English" },
    { title: "Miracles of Jesus", banner: "https://static.wixstatic.com/media/859174_976d351ca0534524accf061412935918~mv2.jpg", path: "/en/series/miracles-of-jesus", audio: "English" }
  ];

  const bannersEN = [
    { id: 1, path: "/en/series/genesis", trailer: "https://ok.ru/videoembed/9124099918432", bg: "https://static.wixstatic.com/media/859174_0f949fed1b134ebe8771e5618e1cc7d4~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_ba56ec9be4c84e42a6211d7c5f790846~mv2.png", desc: "The epic origin of humanity. From the Garden of Eden to the Great Flood and Abraham’s faith. A monumental saga of family, trials, and the promise that changed the world." },
    { id: 2, path: "/en/series/moses-and-the-ten-commandments", trailer: "https://ok.ru/videoembed/12477207874064", bg: "https://static.wixstatic.com/media/859174_18b2e14021084c40866506e1dfed7b94~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_4d1aeabc2855464f9ab9fd129a80ca28~mv2.png", desc: "The journey of a prince turned deliverer. Witness the plagues of Egypt, the parting of the Red Sea, and the sacred laws on Mount Sinai. A story of faith, courage, and freedom." },
    { id: 3, path: "/en/series/the-promised-land", trailer: "https://ok.ru/videoembed/9124099590752", bg: "https://static.wixstatic.com/media/859174_80f707c1c8b844b298871bb9055c3e6c~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_11066f006ed64f3080572cdf4371827c~mv2.png", desc: "The legendary conquest of Canaan begins. Follow Joshua as he leads Israel through miraculous battles, falling walls, and trials of faith. A saga of courage and fulfillment." },
    { id: 4, path: "/en/series/kings", trailer: "https://ok.ru/videoembed/9600897518176", bg: "https://static.wixstatic.com/media/859174_05c88d2c1bde48d9a32fea29510f6a82~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_bfe9b2dc0ba345a98b04b3758600c5a0~mv2.png", desc: "A powerful saga about the rise and fall of Israel's monarchy. Experience the transition from judges to kings, filled with faith, betrayal, and the quest for power." },
    { id: 5, path: "/en/series/jesus", trailer: "https://ok.ru/videoembed/9295702657632", bg: "https://static.wixstatic.com/media/859174_5b7278e25178455eab300b05f111362a~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_42199fc8b94d40a2a8de56a13a14b7e2~mv2.png", desc: "The most beautiful story ever told. Follow the life of Jesus from his humble birth to his glorious resurrection. A profound journey of love and miracles." },
    { id: 6, path: "/en/series/paul-the-apostle", trailer: "https://ok.ru/videoembed/12477419227664", bg: "https://static.wixstatic.com/media/859174_3f7434c3c97d4ed982befff72cfdbd27~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_f8b8d8e3187d4dc38c6b60e39b86aa73~mv2.png", desc: "From a fierce persecutor to the greatest messenger of faith. Follow Saul’s radical transformation and his journey to spread the Gospel across nations." }
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    setRecommended([...allSeriesEn].sort(() => 0.5 - Math.random()).slice(0, 8));
    const saved = JSON.parse(localStorage.getItem('myList') || '[]');
    setMyList(allSeriesEn.filter(s => saved.includes(s.id)));
    return () => window.removeEventListener('scroll', handleScroll);
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

  const MovieRow = ({ title, movies }: any) => {
    if (movies.length === 0) return null;
    return (
      <div className="mb-10 px-4 overflow-hidden text-left">
        <h2 className="text-white text-[11px] font-black mb-4 uppercase tracking-[0.3em] flex items-center gap-2">
          <span className="w-1 h-4 bg-[#FF8A00]" />{title}
        </h2>
        <Slider dots={false} infinite={false} speed={500} slidesToShow={3.2} slidesToScroll={3} arrows={false}>
          {movies.map((m: any, idx: number) => (
            <div key={idx} className="px-1 outline-none active:scale-95 transition-transform">
              <Link href={m.path || '#'}>
                <div className="relative aspect-[2/3] rounded-md overflow-hidden border border-white/5">
                  <Image src={m.banner} alt={m.title} fill className="object-cover" unoptimized />
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    );
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-[#FF8A00] text-left unselectable">
      <Head>
        <title>Estudios 421 — Faith on Screen</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
      </Head>

      <nav className={`fixed top-0 w-full z-[110] px-4 py-3 flex items-center gap-4 transition-all duration-500 ${isScrolled || isMenuOpen || searchQuery.length > 0 ? 'bg-black shadow-lg' : 'bg-gradient-to-b from-black/90 via-black/40 to-transparent'}`}>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="text-white text-3xl active:scale-90" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <IoCloseOutline /> : <IoMenuOutline />}
          </button>
          <Link href="/en"><div className="relative w-[110px] h-[30px]"><Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" fill className="object-contain" priority /></div></Link>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="flex-grow relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><IoSearchOutline size={16} /></div>
          <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-full py-1.5 pl-9 pr-4 text-xs text-white outline-none focus:border-[#FF8A00]" />
        </form>
        <div className="flex-shrink-0"><Image src="https://static.wixstatic.com/media/859174_26ca840644ce4f519c0458c649f44f34~mv2.png" alt="User" width={32} height={32} className="rounded-full ring-2 ring-white/10" /></div>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/98 z-[100] flex flex-col pt-24 px-8 gap-8 animate-fade-in text-left">
          <p className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/10 pb-2">Navigation</p>
          <Link href="/en" onClick={() => setIsMenuOpen(false)} className={`text-xl font-bold ${router.pathname === '/en' ? 'text-[#FF8A00]' : 'text-white'}`}>Home</Link>
          <Link href="/en/biblical-series" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white">Biblical Series</Link>
          <Link href="/en/tv-shows" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white">TV Shows</Link>
          <Link href="/en/movies" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white">Movies</Link>
          <p className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/10 pb-2 mt-4">Language</p>
          <div className="flex gap-6">
            {[{l:'ESP', i:'367960b11c1c44ba89cd1582fd1b5776', p:'/'}, {l:'ENG', i:'35112d9ffe234d6f9dcef16cf8f7544e', p:'/en'}, {l:'PT', i:'830f1c20656e4d44a819bedfc13a22cc', p:'/pt'}].map((lang) => (
              <Link key={lang.l} href={lang.p} className="flex flex-col items-center gap-2"><img src={`https://static.wixstatic.com/media/859174_${lang.i}~mv2.png`} className="w-10 h-10 object-contain" /><span className="text-[10px] text-white font-bold">{lang.l}</span></Link>
            ))}
          </div>
        </div>
      )}

      {searchQuery.length > 0 && (
        <div className="fixed inset-0 bg-black z-[105] pt-24 px-4 overflow-y-auto pb-20">
          <h2 className="text-white text-sm font-black mb-6 uppercase tracking-widest flex items-center gap-2"><span className="w-1 h-4 bg-[#FF8A00]" />Results: "{searchQuery}"</h2>
          <div className="grid grid-cols-2 gap-4">
            {searchResults.map((m) => (
              <Link key={m.id} href={m.path} onClick={() => setSearchQuery("")}><div className="relative aspect-[2/3] rounded-lg overflow-hidden"><Image src={m.banner} alt={m.title} fill className="object-cover" unoptimized /></div></Link>
            ))}
          </div>
        </div>
      )}

      <section className="relative w-full aspect-[4/3] bg-black mb-14 overflow-hidden">
        <Slider dots={true} infinite={true} speed={800} autoplay={true} autoplaySpeed={5000} arrows={false} dotsClass="slick-dots mobile-dots">
          {bannersEN.map((item) => (
            <div key={item.id} className="relative w-full aspect-[4/3] outline-none bg-black">
              <Image src={item.bg} alt="Banner" fill className="object-contain" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
              <div className="absolute inset-0 flex flex-col justify-end px-5 pb-8">
                <div className="relative w-[140px] h-[55px] mb-1.5"><Image src={item.logo} alt="Logo" fill className="object-contain object-left" unoptimized /></div>
                <p className="text-[9px] leading-tight text-gray-300 mb-4 max-w-[55%] text-left font-medium opacity-90">{item.desc}</p>
                <div className="flex gap-2">
                  <button onClick={() => router.push(item.path)} className="bg-[#FF8A00] text-white px-5 py-2 rounded font-black text-[9px] flex items-center gap-1.5 active:scale-95">WATCH</button>
                  <button onClick={() => {setActiveTrailer({url: item.trailer, path: item.path}); setShowModal(true)}} className="bg-white/10 backdrop-blur-md text-white px-5 py-2 rounded font-black text-[9px] border border-white/20 active:scale-95">INFO</button>
                  <button onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS', '_blank')} className="bg-black/40 text-white px-4 py-2 rounded font-black text-[9px] border border-[#FF8A00]/50 active:scale-95 flex items-center gap-1.5 uppercase">Donate</button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      <div className="relative z-30 -mt-12 pb-10">
        {myList.length > 0 && <MovieRow title="My List" movies={myList} />}
        <MovieRow title="New Releases" movies={dataNewReleases} />
        <MovieRow title="Biblical Series" movies={allSeriesEn.filter(s => s.category === 'Biblical Series')} />
        <MovieRow title="Recommended" movies={recommended} />
        <MovieRow title="TV Shows" movies={allSeriesEn.filter(s => s.category === 'TV Show')} />
        <MovieRow title="Movies" movies={allSeriesEn.filter(s => s.category === 'Movie')} />
      </div>

      <footer className="bg-[#0a0a0a] text-gray-400 py-12 px-8 border-t border-white/5 text-left">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-start gap-6 mb-10">
            <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xl"><FaFacebookF /></a>
            <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xl"><FaInstagram /></a>
            <a href="https://www.tiktok.com/@estudios421_com?_r=1&_t=ZS-93K0Cjg8TzM" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xl"><FaTiktok /></a>
            <a href="https://youtube.com/@estudios421max?si=IXSltDZuOmclG7KL" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xl"><FaYoutube /></a>
            <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xl"><FaXTwitter /></a>
          </div>
          <div className="mb-10 space-y-4">
            <p className="text-[10px] leading-relaxed">© {new Date().getFullYear()} Estudios 421. All rights reserved on the design and editing of the platform.</p>
            <p className="text-[9px] leading-relaxed text-gray-500 text-justify">Legal Notice: The audiovisual content shared on this site belongs to its respective owners and production companies. Estudios 421 is a non-profit platform destined to the dissemination of biblical content.</p>
          </div>
          <div className="flex flex-col gap-y-4 text-[11px] font-medium uppercase tracking-widest border-t border-white/5 pt-8">
            <Link href="/en/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/en/terms-of-use" className="hover:text-white transition-colors">Terms of Use</Link>
            <Link href="/en/cookies" className="hover:text-white transition-colors">Cookie Settings</Link>
            <Link href="/en/ads" className="hover:text-white transition-colors">Ad Specifications</Link>
            <Link href="/en/help" className="hover:text-white transition-colors">Help Center</Link>
          </div>
        </div>
      </footer>

      {showModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => setShowModal(false)} />
          <div className="relative w-full aspect-video bg-[#0a0a0a] rounded-lg border border-white/10 flex flex-col">
            <button onClick={() => setShowModal(false)} className="absolute top-2 right-2 text-[#FF8A00] z-[220]"><IoCloseOutline size={30} /></button>
            <div className="flex-grow relative">
              <iframe src={`${activeTrailer.url}?autoplay=1`} className="w-full h-full" frameBorder="0" allowFullScreen />
            </div>
            <div className="p-4 flex justify-center bg-black">
               <button onClick={() => router.push(activeTrailer.path)} className="w-full bg-[#FF8A00] text-white py-3 rounded-md font-black text-xs flex items-center justify-center gap-3 active:scale-95 transition-all shadow-lg uppercase">
                 <FaPlay size={10} /> Watch Full Series
               </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .mobile-dots { bottom: 10px !important; }
        .mobile-dots li button:before { color: white !important; font-size: 6px !important; }
        .mobile-dots li.slick-active button:before { color: #FF8A00 !important; }
        .unselectable { -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; }
        img { pointer-events: none !important; -webkit-user-drag: none !important; }
        body { -webkit-user-select: none; user-select: none; }
      `}</style>
    </div>
  );
};

export default InicioEN_Mobile;
