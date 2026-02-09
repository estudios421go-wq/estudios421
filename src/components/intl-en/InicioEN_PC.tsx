import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Slider from 'react-slick';
import { IoSearchOutline, IoCloseOutline, IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { FaPlay, FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import { BiDonateHeart } from 'react-icons/bi';
// Importamos la base de datos en inglés que creamos previamente
import { allSeriesEn } from '../../data/en/seriesEn';

const InicioEN_PC = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [myList, setMyList] = useState<any[]>([]);
  const [recommended, setRecommended] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [activeTrailer, setActiveTrailer] = useState({ url: "", path: "" });

  // --- FULL PAGE SHIELDING ---
  useEffect(() => {
    const handleGlobalPrevent = (e: any) => e.preventDefault();
    document.addEventListener('contextmenu', handleGlobalPrevent);
    document.addEventListener('dragstart', handleGlobalPrevent);
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && (e.key === 'u' || e.key === 's')) || (e.metaKey && (e.key === 'u' || e.key === 's'))) {
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleGlobalPrevent);
      document.removeEventListener('dragstart', handleGlobalPrevent);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Punto 10: Carruseles - Data Reemplazada
  const dataNewReleases = [
    { title: "Kings", banner: "https://static.wixstatic.com/media/859174_fb929d31093a4103aa377a28c0a00864~mv2.jpg", path: "/en/series/kings", audio: "English" },
    { title: "The Queen of Persia", banner: "https://static.wixstatic.com/media/859174_7cf266bc052643c79d5565165e53c403~mv2.jpg", path: "/en/series/the-queen-of-persia", audio: "English" },
    { title: "The Rich and Lazarus", banner: "https://static.wixstatic.com/media/859174_4bbb9c439b3648e3baaf9be321aad0ef~mv2.jpg", path: "/en/series/the-rich-and-lazarus", audio: "English" },
    { title: "Moses and the Ten Commandments", banner: "https://static.wixstatic.com/media/859174_63faa7f280dc4ddd9aff9f5d9a04be7d~mv2.jpg", path: "/en/series/moses-and-the-ten-commandments", audio: "English" },
    { title: "The Promised Land", banner: "https://static.wixstatic.com/media/859174_0821f5e39e5647f49da82ac7bae0a28d~mv2.jpg", path: "/en/series/the-promised-land", audio: "English" },
    { title: "Genesis", banner: "https://static.wixstatic.com/media/859174_e4155c0a6f4247c7a60122ee46a007ad~mv2.jpg", path: "/en/series/genesis", audio: "English" },
    { title: "King David", banner: "https://static.wixstatic.com/media/859174_5e4e785c4fc64d9fb333f9c909ea7104~mv2.jpg", path: "/en/series/king-david", audio: "English" },
    { title: "Miracles of Jesus", banner: "https://static.wixstatic.com/media/859174_976d351ca0534524accf061412935918~mv2.jpg", path: "/en/series/miracles-of-jesus", audio: "English" },
    { title: "Jesus", banner: "https://static.wixstatic.com/media/859174_846425df07e34823bd397e66392443c6~mv2.jpg", path: "/en/series/jesus", audio: "English" },
    { title: "The Story of Queen Esther", banner: "https://static.wixstatic.com/media/859174_8be99383aa3544f78f6c1cf43922e535~mv2.jpg", path: "/en/series/the-story-of-queen-esther", audio: "English" },
    { title: "Paul the Apostle", banner: "https://static.wixstatic.com/media/859174_ebfbd11e7f36474fb3ea41e11c4139ba~mv2.jpg", path: "/en/series/paul-the-apostle", audio: "Subtitled" },
    { title: "The Life of Job", banner: "https://static.wixstatic.com/media/859174_2150ab161f9e454c86514bd207a58946~mv2.jpg", path: "/en/series/the-life-of-job", audio: "Subtitled" },
    { title: "The Lord and the Handmaid", banner: "https://static.wixstatic.com/media/859174_dde6bc5f283c4ac3b0275b0872c49eda~mv2.jpg", path: "/en/series/the-lord-and-the-handmaid", audio: "Subtitled" }
  ];

  const dataBiblical = [
    { title: "Genesis", banner: "https://static.wixstatic.com/media/859174_9085a904d152495bb28d646a0008d545~mv2.jpg", path: "/en/series/genesis", audio: "English" },
    { title: "Leah", banner: "https://static.wixstatic.com/media/859174_7c2a70bbc834445080d5e766bdbede85~mv2.jpg", path: "/en/series/leah", audio: "Soon" },
    { title: "The Life of Job", banner: "https://static.wixstatic.com/media/859174_fcd6cc01ecfc4a0abddcd5de84f34ed5~mv2.png", path: "/en/series/the-life-of-job", audio: "Subtitled" },
    { title: "Joseph of Egypt", banner: "https://static.wixstatic.com/media/859174_bc24808a34974a11b96a36a0eb55ac41~mv2.jpg", path: "/en/series/joseph-of-egypt", audio: "Soon" },
    { title: "The Ten Commandments", banner: "https://static.wixstatic.com/media/859174_bb89fe35d7044bb1bb0d66a1cc84e3f1~mv2.jpg", path: "/en/series/the-ten-commandments", audio: "English" },
    { title: "The Promised Land", banner: "https://static.wixstatic.com/media/859174_163f17ddceb64833a51f70657759a927~mv2.jpg", path: "/en/series/the-promised-land", audio: "English" },
    { title: "Samson and Delilah", banner: "https://static.wixstatic.com/media/859174_c7b91353c78d412299b8f5793fcb831f~mv2.jpg", path: "/en/series/samson-and-delilah", audio: "Soon" },
    { title: "King David", banner: "https://static.wixstatic.com/media/859174_5a421ba28d1946c18e7c842966b62cb8~mv2.jpg", path: "/en/series/king-david", audio: "English" },
    { title: "Kings", banner: "https://static.wixstatic.com/media/859174_894368fbe68b4d28b4b31c6728f761b3~mv2.jpg", path: "/en/series/kings", audio: "English" },
    { title: "Jezebel", banner: "https://static.wixstatic.com/media/859174_50027fec42b743af8c1724585177c61e~mv2.jpg", path: "/en/series/jezebel", audio: "Soon" },
    { title: "The Rich and Lazarus", banner: "https://static.wixstatic.com/media/859174_ffda22a45f434031afd644142a7e78b6~mv2.jpg", path: "/en/series/the-rich-and-lazarus", audio: "English" },
    { title: "The Story of Esther", banner: "https://static.wixstatic.com/media/859174_6c177962893542a2a8678209eed2137a~mv2.jpg", path: "/en/series/the-story-of-ester", audio: "English" },
    { title: "The Queen of Persia", banner: "https://static.wixstatic.com/media/859174_502004722dce43acbd470f783c66dcb5~mv2.jpg", path: "/en/series/the-queen-of-persia", audio: "English" },
    { title: "Nehemiah", banner: "https://static.wixstatic.com/media/859174_eb789314c8524d72b959f57af0541687~mv2.jpg", path: "/en/series/nehemiah", audio: "Soon" },
    { title: "Miracles of Jesus", banner: "https://static.wixstatic.com/media/859174_3eb35e22d64b49eb821e1e34d0a47e54~mv2.jpg", path: "/en/series/miracles-of-jesus", audio: "English" },
    { title: "Jesus", banner: "https://static.wixstatic.com/media/859174_f34317eac9bf4788b016b16300ba36f3~mv2.jpg", path: "/en/series/jesus", audio: "English" },
    { title: "Paul The Apostle", banner: "https://static.wixstatic.com/media/859174_fcaa4a7069d2442fb5aa6953cd12b38c~mv2.jpg", path: "/en/series/paul-the-apostle", audio: "Subtitled" },
    { title: "The Lord and The Handmaid", banner: "https://static.wixstatic.com/media/859174_eb000d78f8234aa1a39c0f5f013241c9~mv2.png", path: "/en/series/the-lord-and-the-handmaid", audio: "Subtitled" },
    { title: "Apocalypse", banner: "https://static.wixstatic.com/media/859174_db076459678240f2bbb96912137b2c6a~mv2.jpg", path: "/en/series/apocalypse", audio: "Soon" }
  ];

  const poolRecommended = allSeriesEn;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    // Recommended logic: 10 random posters from English pool
    const filteredPool = poolRecommended.filter(p => !dataNewReleases.map(e => e.title).includes(p.title));
    setRecommended([...filteredPool].sort(() => 0.5 - Math.random()).slice(0, 10));
    
    const saved = JSON.parse(localStorage.getItem('myList') || '[]');
    setMyList(allSeriesEn.filter(s => saved.includes(s.id)));
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Punto 3: Buscador adaptado a English Database
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

  const openTrailer = (url: string, path: string) => {
    setActiveTrailer({ url, path });
    setShowModal(true);
  };

  const NextArrow = ({ onClick }: any) => (
    <div className="absolute right-0 top-0 bottom-0 z-50 flex items-center justify-center w-12 hover:bg-[#F09800] cursor-pointer group/arrow transition-all duration-300" onClick={onClick}>
      <IoChevronForward className="text-white group-hover:scale-125 transition-transform" size={45} />
    </div>
  );

  const PrevArrow = ({ onClick }: any) => (
    <div className="absolute left-0 top-0 bottom-0 z-50 flex items-center justify-center w-12 hover:bg-[#F09800] cursor-pointer group/arrow transition-all duration-300" onClick={onClick}>
      <IoChevronBack className="text-white group-hover:scale-125 transition-transform" size={45} />
    </div>
  );

  const MovieRow = ({ title, movies }: any) => {
    if (movies.length === 0) return null;
    const settings = { dots: false, infinite: movies.length > 6, speed: 500, slidesToShow: 6, slidesToScroll: 4, nextArrow: <NextArrow />, prevArrow: <PrevArrow /> };
    return (
      <div className="mb-14 px-4 md:px-16 relative group/row overflow-hidden">
        <h2 className="text-white text-xl font-bold mb-4 uppercase tracking-wider ml-2 flex items-center gap-3">
          <span className="w-1.5 h-6 bg-[#FF8A00]" />{title}
        </h2>
        <Slider {...settings} className="movie-slider">
          {movies.map((m: any, idx: number) => (
            <div key={idx} className="px-1.5 outline-none py-4">
              <Link href={m.path || '#'}>
                <div className="relative aspect-[2/3] rounded-lg transition-all duration-300 hover:scale-110 hover:z-[100] cursor-pointer shadow-2xl group/poster">
                  <div className="relative w-full h-full rounded-lg overflow-hidden ring-1 ring-white/10 group-hover/poster:ring-2 group-hover/poster:ring-[#FF8A00]/50">
                    <Image src={m.banner} alt={m.title} fill className="object-cover" unoptimized />
                  </div>
                  <div className="absolute bottom-2 left-2 z-20">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border border-white/10 ${m.audio === 'English' || m.audio === 'Soon' ? 'bg-[#F09800] text-white' : 'bg-black/70 text-white backdrop-blur-md'}`}>
                        {m.audio === 'English' ? 'ENG' : m.audio === 'Soon' ? 'SOON' : 'SUB'}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    );
  };

  // Punto 1 y 2: Navbar y Traducción de Idiomas
  const Navbar = (
    <nav className={`fixed top-0 w-full z-[130] transition-all duration-500 px-8 py-4 flex items-center justify-between ${isScrolled || searchQuery.length > 0 ? 'bg-black shadow-lg' : 'bg-gradient-to-b from-black via-black/60 to-transparent'}`}>
      <div className="flex items-center gap-10">
        <Link href="/en"><div className="relative w-[160px] h-[45px] cursor-pointer"><Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" fill className="object-contain" priority /></div></Link>
        <div className="flex gap-8">
          <Link href="/en" className="relative group text-white text-[15px] font-medium tracking-wide">Home<span className={`absolute -bottom-1 left-0 h-[3px] bg-[#FF8A00] transition-all duration-500 ${router.pathname === '/en' ? 'w-full' : 'w-0 group-hover:w-full'}`} /></Link>
          <Link href="/en/biblical-series" className="relative group text-white text-[15px] font-medium tracking-wide">Biblical Series<span className="absolute -bottom-1 left-0 h-[3px] bg-[#FF8A00] transition-all duration-500 w-0 group-hover:w-full" /></Link>
          <Link href="/en/tv-shows" className="relative group text-white text-[15px] font-medium tracking-wide">TV Shows<span className="absolute -bottom-1 left-0 h-[3px] bg-[#FF8A00] transition-all duration-500 w-0 group-hover:w-full" /></Link>
          <Link href="/en/movies" className="relative group text-white text-[15px] font-medium tracking-wide">Movies<span className="absolute -bottom-1 left-0 h-[3px] bg-[#FF8A00] transition-all duration-500 w-0 group-hover:w-full" /></Link>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex gap-4 mr-4">
          {[{ n: '', img: '367960b11c1c44ba89cd1582fd1b5776' }, { n: 'en', img: '35112d9ffe234d6f9dcef16cf8f7544e' }, { n: 'pt', img: '830f1c20656e4d44a819bedfc13a22cc' }].map((l) => (
            <Link key={l.n} href={l.n === '' ? '/' : `/${l.n}`}><img src={`https://static.wixstatic.com/media/859174_${l.img}~mv2.png`} className="w-7 h-7 object-contain cursor-pointer hover:scale-110 transition-transform" /></Link>
          ))}
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="flex items-center bg-white/10 rounded-full px-4 py-1 border border-white/5 focus-within:border-[#FF8A00]">
          <IoSearchOutline className="text-white text-xl" />
          <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent border-none outline-none text-white text-sm ml-2 w-32 placeholder:text-gray-400" />
        </form>
        <Image src="https://static.wixstatic.com/media/859174_26ca840644ce4f519c0458c649f44f34~mv2.png" alt="User" width={30} height={30} className="rounded-full ring-1 ring-white/20 hover:ring-[#FF8A00] cursor-pointer" />
      </div>
    </nav>
  );

  // Puntos 4, 5, 6, 7 y 8: Banners, Logos, Descripciones y Enlaces
  const bannersEN = [
    { id: 1, path: "/en/series/genesis", trailer: "https://ok.ru/videoembed/9124099918432", bg: "https://static.wixstatic.com/media/859174_0f949fed1b134ebe8771e5618e1cc7d4~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_ba56ec9be4c84e42a6211d7c5f790846~mv2.png", desc: "The epic origin of humanity. From the Garden of Eden to the Great Flood and Abraham’s faith. A monumental saga of family, trials, and the promise that changed the world. Discover the beginning of everything." },
    { id: 2, path: "/en/series/moses-and-the-ten-commandments", trailer: "https://ok.ru/videoembed/12477207874064", bg: "https://static.wixstatic.com/media/859174_18b2e14021084c40866506e1dfed7b94~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_5a53ea4f070945e4996431cabc5bb334~mv2.png", desc: "The journey of a prince turned deliverer. Witness the plagues of Egypt, the parting of the Red Sea, and the sacred laws on Mount Sinai. A story of faith, courage, and freedom. Discover the man who changed history." },
    { id: 3, path: "/en/series/the-promised-land", trailer: "https://ok.ru/videoembed/9124099590752", bg: "https://static.wixstatic.com/media/859174_80f707c1c8b844b298871bb9055c3e6c~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_4745b93fef974800b5f098af369feb7f~mv2.png", desc: "The legendary conquest of Canaan begins. Follow Joshua as he leads Israel through miraculous battles, falling walls, and trials of faith. A saga of courage, war, and the fulfillment of God's promise. The journey continues." },
    { id: 4, path: "/en/series/kings", trailer: "https://ok.ru/videoembed/9600897518176", bg: "https://static.wixstatic.com/media/859174_05c88d2c1bde48d9a32fea29510f6a82~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_bfe9b2dc0ba345a98b04b3758600c5a0~mv2.png", desc: "A powerful saga about the rise and fall of Israel's monarchy. Experience the transition from judges to kings, filled with faith, betrayal, and the quest for power. Witness the lives of Saul, David, and Solomon. Every choice has a price." },
    { id: 5, path: "/en/series/jesus", trailer: "https://ok.ru/videoembed/9295702657632", bg: "https://static.wixstatic.com/media/859174_5b7278e25178455eab300b05f111362a~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_42199fc8b94d40a2a8de56a13a14b7e2~mv2.png", desc: "The most beautiful story ever told. Follow the life of Jesus from his humble birth to his glorious resurrection. A profound journey of love, miracles, and the message that changed the world forever. Experience the light of humanity." },
    { id: 6, path: "/en/series/paul-the-apostle", trailer: "https://ok.ru/videoembed/12477419227664", bg: "https://static.wixstatic.com/media/859174_3f7434c3c97d4ed982befff72cfdbd27~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_f8b8d8e3187d4dc38c6b60e39b86aa73~mv2.png", desc: "From a fierce persecutor to the greatest messenger of faith. Follow Saul’s radical transformation and his journey to spread the Gospel across nations. A story of sacrifice, courage, and a love that knows no borders. The mission begins." }
  ];

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-none unselectable">
      <Head>
        <title>Estudios 421 — Faith on Screen</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
      </Head>
      {Navbar}
      <main className="relative">
        {searchQuery.length > 0 && (
          <div className="fixed inset-0 bg-black z-[120] pt-24 px-8 md:px-16 overflow-y-auto pb-20">
             <h2 className="text-white text-2xl font-bold mb-10 uppercase tracking-widest flex items-center gap-3"><span className="w-1.5 h-6 bg-[#FF8A00]" />Results: "{searchQuery}"</h2>
             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-10">
               {searchResults.map((m) => (
                 <Link key={m.id} href={m.path}><div className="relative aspect-[2/3] rounded-md transition-all duration-500 hover:scale-110 hover:z-[110] cursor-pointer shadow-2xl group"><Image src={m.banner} alt={m.title} fill className="object-cover rounded-md" unoptimized /></div></Link>
               ))}
             </div>
          </div>
        )}

        <section className="relative w-full h-[95vh] bg-black overflow-hidden mb-12">
          <Slider {...{ fade: true, dots: true, infinite: true, speed: 1000, autoplay: true, autoplaySpeed: 6000, pauseOnHover: false, arrows: false, dotsClass: "slick-dots custom-dots" }}>
            {bannersEN.map((item) => (
              <div key={item.id} className="relative w-full h-[95vh] outline-none">
                <div className="relative w-full h-full"><Image src={item.bg} alt="Banner" fill className="object-cover" priority /></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent z-10 w-2/3" />
                <div className="absolute inset-0 z-20 flex flex-col justify-center px-20 pt-10">
                  <div className="relative w-[450px] h-[160px] mb-6 drop-shadow-2xl"><Image src={item.logo} alt="Logo" fill className="object-contain object-left" unoptimized /></div>
                  <p className="max-w-[550px] text-white text-[19px] font-medium mb-8 leading-relaxed text-justify opacity-95">{item.desc}</p>
                  <div className="flex items-center gap-5">
                    <button onClick={() => router.push(item.path)} style={{ backgroundColor: '#F09800' }} className="text-white px-9 py-3 rounded-md font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-lg uppercase"><FaPlay size={12} /> Watch Now</button>
                    <button onClick={() => openTrailer(item.trailer, item.path)} className="bg-white/10 text-white px-9 py-3 rounded-md font-bold backdrop-blur-md border border-white/20 hover:bg-white/20 hover:scale-105 transition-all flex items-center gap-2 uppercase"><HiOutlineInformationCircle size={22} /> More Info</button>
                    <a href="https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS" target="_blank" rel="noreferrer" className="bg-black/40 text-white px-6 py-3 rounded-md font-bold border border-[#F09800]/50 hover:scale-105 transition-all flex items-center gap-2 tracking-wider uppercase"><BiDonateHeart size={20} className="text-[#F09800]" /> Donate</a>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </section>

        <div className="relative z-30 pb-20 mt-[-110px]">
          {myList.length > 0 && (
            <MovieRow title="My List" movies={myList} />
          )}

          <MovieRow title="New Releases" movies={dataNewReleases} />
          <MovieRow title="Biblical Series" movies={dataBiblical} />
          <MovieRow title="Recommended" movies={recommended} />
          <MovieRow title="TV Shows" movies={allSeriesEn.filter(s => s.category === 'TV Show')} />
          <MovieRow title="Movies" movies={allSeriesEn.filter(s => s.category === 'Movie')} />
        </div>
      </main>

      {/* Punto 9: Footer Traducido */}
      <footer className="bg-[#0a0a0a] text-gray-400 py-12 px-8 md:px-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center md:justify-end gap-6 mb-10">
            <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xl"><FaFacebookF /></a>
            <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xl"><FaInstagram /></a>
            <a href="https://www.tiktok.com/@estudios421_com?_r=1&_t=ZS-93K0Cjg8TzM" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xl"><FaTiktok /></a>
            <a href="https://youtube.com/@estudios421max?si=IXSltDZuOmclG7KL" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xl"><FaYoutube /></a>
            <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xl"><FaXTwitter /></a>
          </div>
          <div className="mb-10 space-y-4 text-left">
            <p className="text-xs leading-relaxed max-w-4xl">© {new Date().getFullYear()} Estudios 421. All rights reserved on the design and editing of the platform.</p>
            <p className="text-[10px] md:text-xs leading-relaxed text-gray-500 max-w-5xl text-justify">Legal Notice: The audiovisual content shared on this site belongs to its respective owners and production companies (Record TV, Seriella Productions, Casablanca Productions, Amazon Content Services LLC, among others). Estudios 421 is a non-profit platform dedicated to the dissemination of biblical content for the community. We do not claim ownership over the series or movies shown.</p>
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

      {showModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-5xl aspect-video bg-[#0a0a0a] rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(255,138,0,0.3)] border border-white/10">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 z-[210] text-[#FF8A00]"><IoCloseOutline size={50} /></button>
            <iframe src={`${activeTrailer.url}?autoplay=1`} className="w-full h-full" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen />
            <div className="absolute bottom-6 left-8 z-[210]">
              <button onClick={() => router.push(activeTrailer.path)} className="bg-[#F09800] text-white px-8 py-3 rounded font-bold flex items-center gap-3 hover:scale-105 transition-all shadow-xl group uppercase">
                <FaPlay size={12} className="group-hover:translate-x-1 transition-transform" /> Watch Now
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .custom-dots { bottom: 65px !important; text-align: center !important; }
        .custom-dots li { margin: 0 6px !important; }
        .custom-dots li button:before { color: white !important; font-size: 8px !important; opacity: 0.4; }
        .custom-dots li.slick-active { width: 45px !important; }
        .custom-dots li.slick-active button:before { color: #F09800 !important; content: '' !important; background: #F09800; width: 45px; height: 5px; border-radius: 3px; top: 10px; opacity: 1; }
        .movie-slider .slick-list { overflow: hidden !important; margin: 0 50px !important; }
        .movie-slider .slick-track { display: flex !important; }
        .movie-slider .slick-prev, .movie-slider .slick-next { height: 100%; width: 50px; z-index: 100; top: 50%; transform: translateY(-50%); transition: all 0.3s ease; opacity: 0; background: rgba(0,0,0,0.8); position: absolute; }
        .group\/row:hover .movie-slider .slick-prev, .group\/row:hover .movie-slider .slick-next { opacity: 1; }
        .movie-slider .slick-prev:hover, .movie-slider .slick-next:hover { background: #F09800; }
        .movie-slider .slick-prev { left: 0 !important; }
        .movie-slider .slick-next { right: 0 !important; }
        .unselectable { -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-touch-callout: none; }
        img { pointer-events: none !important; -webkit-user-drag: none !important; }
        body { -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }
      `}</style>
    </div>
  );
};

export default InicioEN_PC;
