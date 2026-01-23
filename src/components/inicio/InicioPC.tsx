import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Slider from 'react-slick';
import { IoSearchOutline, IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { FaPlay, FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import { BiDonateHeart } from 'react-icons/bi';
import { allSeries, Serie } from '../../data/series';

// --- COMPONENTE INTERNO: NAVBAR ---
const Navbar = ({ searchQuery, setSearchQuery, handleSearch }: any) => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 px-10 py-5 flex items-center justify-between ${isScrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/5' : 'bg-gradient-to-b from-black via-black/40 to-transparent'}`}>
      <div className="flex items-center gap-12">
        <Link href="/"><div className="relative w-[165px] h-[48px] cursor-pointer"><Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" fill className="object-contain" priority /></div></Link>
        <div className="flex gap-9">
          {['Inicio', 'Series Bíblicas', 'Series TV', 'Películas'].map((name) => (
            <Link key={name} href={name === 'Inicio' ? '/' : `/${name.toLowerCase().replace(' ', '-')}`} className="relative group text-white text-[14px] font-bold uppercase tracking-[0.15em]">
              <span className="group-hover:text-[#FF8A00] transition-colors">{name}</span>
              <span className="absolute -bottom-2 left-0 h-[3px] bg-[#FF8A00] transition-all duration-500 w-0 group-hover:w-full shadow-[0_0_10px_#FF8A00]" />
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-8">
        <div className="flex gap-4 border-r border-white/10 pr-6">
          {[{ n: 'ESP', h: '/' }, { n: 'ENG', h: '/en' }, { n: 'PT', h: '/pt' }].map((l) => (
            <Link key={l.n} href={l.h}><img src={`https://static.wixstatic.com/media/859174_${l.n === 'ESP' ? '367960b11c1c44ba89cd1582fd1b5776' : l.n === 'ENG' ? '35112d9ffe234d6f9dcef16cf8f7544e' : '830f1c20656e4d44a819bedfc13a22cc'}~mv2.png`} className="w-7 h-7 object-contain hover:scale-125 transition-all" /></Link>
          ))}
        </div>
        <form onSubmit={handleSearch} className="flex items-center bg-white/5 rounded-full px-5 py-2 border border-white/10 focus-within:border-[#FF8A00] focus-within:shadow-[0_0_15px_rgba(255,138,0,0.3)] transition-all">
          <IoSearchOutline className="text-xl text-gray-400" />
          <input type="text" placeholder="Buscar..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent border-none outline-none text-white text-[13px] ml-3 w-44" />
        </form>
        <div className="w-10 h-10 rounded-full border-2 border-white/10 overflow-hidden hover:border-[#FF8A00] transition-all cursor-pointer">
          <Image src="https://static.wixstatic.com/media/859174_26ca840644ce4f519c0458c649f44f34~mv2.png" alt="User" width={40} height={40} />
        </div>
      </div>
    </nav>
  );
};

// --- COMPONENTE INTERNO: MOVIEROW ---
const MovieRow = ({ title, movies }: { title: string, movies: any[] }) => {
  const sliderRef = useRef<Slider | null>(null);
  if (movies.length === 0) return null;
  const settings = { dots: false, infinite: movies.length > 6, speed: 600, slidesToShow: 6, slidesToScroll: 4, arrows: false };
  return (
    <div className="mb-12 px-16 relative group/row">
      <h2 className="text-white text-[22px] font-black mb-4 uppercase italic tracking-tighter ml-2 flex items-center gap-3">
        <span className="w-1.5 h-6 bg-[#F09800]" />{title}
      </h2>
      <div className="relative">
        <button onClick={() => sliderRef.current?.slickPrev()} className="absolute left-[-50px] top-0 bottom-0 w-[50px] z-[50] bg-black/60 opacity-0 group-hover/row:opacity-100 transition-all hover:bg-[#F09800] text-white flex items-center justify-center"><IoChevronBack size={30} /></button>
        <Slider ref={sliderRef} {...settings}>
          {movies.map((m) => (
            <div key={m.id} className="px-1.5 py-6 outline-none">
              <Link href={m.path}>
                <div className="relative aspect-[2/3] rounded-xl transition-all duration-500 hover:scale-115 hover:z-[40] cursor-pointer shadow-2xl group/p">
                  <div className="relative w-full h-full rounded-xl overflow-hidden ring-1 ring-white/10 group-hover/p:ring-[#F09800]/50">
                    <Image src={m.banner} alt={m.title} fill className="object-cover" unoptimized />
                  </div>
                  <div className="absolute bottom-2 left-2 z-20"><span className={`text-[9px] font-black px-2 py-0.5 rounded-sm ${m.audio === 'Latino' ? 'bg-[#F09800]' : 'bg-black/80'} text-white`}>{m.audio === 'Latino' ? 'LATINO' : 'SUB'}</span></div>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
        <button onClick={() => sliderRef.current?.slickNext()} className="absolute right-[-50px] top-0 bottom-0 w-[50px] z-[50] bg-black/60 opacity-0 group-hover/row:opacity-100 transition-all hover:bg-[#F09800] text-white flex items-center justify-center"><IoChevronForward size={30} /></button>
      </div>
    </div>
  );
};

// --- COMPONENTE MAESTRO: INICIOPC ---
const InicioPC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [myList, setMyList] = useState<Serie[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('myList') || '[]');
    setMyList(allSeries.filter(s => saved.includes(s.id)));
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) router.push(`/buscar?q=${encodeURIComponent(searchQuery)}`);
  };

  const banners = [
    { id: 1, bg: "https://static.wixstatic.com/media/859174_8880c8a667894fd1af103a0336171721~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_6eb0c42c44e340d2a314f7be009d6e8a~mv2.png", path: "/series/la-reina-de-persia", desc: "Inspirada en el libro de Ester, esta historia revela cómo una joven guiada por su fe es llevada al corazón del imperio persa para cumplir un propósito divino." },
    { id: 2, bg: "https://static.wixstatic.com/media/859174_298156d13007436bade3f3219dac7771~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_373d72b97d7e49c6a2ed99da442b8e5a~mv2.png", path: "/series/reyes-la-decadencia", desc: "En una etapa de corrupción espiritual, el reino de Israel se hunde bajo decisiones alejadas de Dios. Idolatría y guerras se entrelazan." },
    { id: 3, bg: "https://static.wixstatic.com/media/859174_3f7434c3c97d4ed982befff72cfdbd27~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_90bd74be414340e29671df248bade4a3~mv2.png", path: "/series/pablo-el-apostol", desc: "De perseguidor implacable a mensajero de Cristo, vive la transformación radical de Pablo de Tarso. Una fe inquebrantable que desafía imperios." },
    { id: 4, bg: "https://static.wixstatic.com/media/859174_b9159dfbf8cc403eb180531c8338589e~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_57a3f59e3dc44abc96ad1508f1ecf6db~mv2.png", path: "/series/la-vida-de-job", desc: "La fe de un hombre justo es llevada al límite tras perderlo todo. En medio del dolor, Job enfrenta preguntas profundas sobre el sufrimiento." },
    { id: 5, bg: "https://static.wixstatic.com/media/859174_25f3802c3bc0432b85c91bed4f588599~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_483e446bb507429694def615b148509d~mv2.png", path: "/series-tv/la-casa-de-david", desc: "De pastor de ovejas al trono de Israel, sigue la vida de David. Gigantes y batallas marcan el camino de un líder conforme al corazón de Dios." },
    { id: 6, bg: "https://static.wixstatic.com/media/859174_d16e8080cf4043e5a7b17a2538f8dcf5~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_4f27eb2a8b7741f69eccead2e7fd0dcf~mv2.png", path: "/series/el-senor-y-la-sierva", desc: "En el Imperio romano, surge un amor imposible entre Elisa y Cayo. Las persecuciones ponen a prueba su relación y su esperanza." }
  ];

  const bannerSettings = { dots: true, infinite: true, speed: 1200, autoplay: true, autoplaySpeed: 6000, arrows: false, dotsClass: "slick-dots custom-dots" };

  return (
    <div className="bg-black min-h-screen text-white select-none overflow-x-hidden font-sans">
      <Head><title>Estudios 421 — Plataforma Bíblica</title></Head>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch} />
      
      <main className="pb-20">
        <section className="h-[95vh] relative">
          <Slider {...bannerSettings}>
            {banners.map((b) => (
              <div key={b.id} className="h-[95vh] relative outline-none">
                <Image src={b.bg} alt="bg" fill className="object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent w-2/3" />
                <div className="absolute inset-0 flex flex-col justify-center px-20 pt-20">
                  <div className="relative w-[480px] h-[180px] mb-8 drop-shadow-2xl"><Image src={b.logo} alt="logo" fill className="object-contain object-left" /></div>
                  <p className="max-w-[580px] text-[19px] mb-10 text-justify drop-shadow-lg">{b.desc}</p>
                  <div className="flex gap-5">
                    <Link href={b.path}><button className="bg-[#F09800] px-9 py-3 rounded-md font-black text-sm uppercase tracking-widest flex items-center gap-3 hover:scale-105 transition-all"><FaPlay size={12}/> Ver Ahora</button></Link>
                    <Link href={b.path}><button className="bg-white/10 backdrop-blur-md border border-white/20 px-9 py-3 rounded-md font-black text-sm uppercase tracking-widest flex items-center gap-3 hover:scale-105 transition-all"><HiOutlineInformationCircle size={20}/> Información</button></Link>
                    <a href="https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS" target="_blank" rel="noreferrer"><button className="bg-[#F09800] px-9 py-3 rounded-md font-black text-sm uppercase tracking-widest flex items-center gap-3 hover:scale-105 transition-all"><BiDonateHeart size={20}/> Donar</button></a>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </section>

        <div className="relative z-30 -mt-32">
          {myList.length > 0 && <MovieRow title="Mi Lista" movies={myList} />}
          <MovieRow title="Estrenos" movies={allSeries.filter(s => s.title.includes('Reyes') || s.title === 'La Reina de Persia')} />
          <MovieRow title="Series Bíblicas" movies={allSeries.filter(s => s.category === 'Serie Bíblica')} />
          <MovieRow title="Películas" movies={allSeries.filter(s => s.category === 'Película')} />
        </div>
      </main>

      <footer className="bg-[#0a0a0a] py-16 px-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          <div className="flex justify-end gap-8 text-xl">
             <FaFacebookF className="hover:text-[#F09800] cursor-pointer"/> <FaInstagram className="hover:text-[#F09800] cursor-pointer"/> <FaTiktok className="hover:text-[#F09800] cursor-pointer"/> <FaYoutube className="hover:text-[#F09800] cursor-pointer"/> <FaXTwitter className="hover:text-[#F09800] cursor-pointer"/>
          </div>
          <div className="space-y-4 text-[11px] text-gray-500 uppercase tracking-widest">
            <p className="text-white/60 font-bold">© {new Date().getFullYear()} Estudios 421. Todos los derechos reservados.</p>
            <p className="normal-case italic">Aviso Legal: El contenido audiovisual pertenece a sus respectivos propietarios (Record TV, Seriella, etc).</p>
          </div>
          <div className="flex gap-10 text-[10px] font-black uppercase tracking-widest border-t border-white/5 pt-10">
            {['Privacidad', 'Términos', 'Cookies', 'Anuncios', 'Ayuda'].map(t => (
              <Link key={t} href={`/${t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`} className="hover:text-[#F09800]">{t}</Link>
            ))}
          </div>
        </div>
      </footer>

      <style jsx global>{`
        .custom-dots { bottom: 120px !important; left: 80px !important; width: auto !important; z-index: 50 !important; }
        .custom-dots li button:before { color: white !important; font-size: 8px !important; opacity: 0.4 !important; }
        .custom-dots li.slick-active button:before { color: #F09800 !important; opacity: 1 !important; font-size: 11px !important; }
      `}</style>
    </div>
  );
};

export default InicioPC;
