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
import { allSeries } from '../../data/series';

const InicioPC = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [myList, setMyList] = useState<any[]>([]);
  const [recommended, setRecommended] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [activeTrailer, setActiveTrailer] = useState({ url: "", path: "" });

  // Listas de Datos Específicas por Carrusel (Fidelidad Total a tus imágenes)
  const dataEstrenos = [
    { title: "Reyes La Decadencia", banner: "https://static.wixstatic.com/media/859174_844bdbe858b74adab24665964be596b1~mv2.jpg", path: "serie/reyes-la-decadencia", audio: "Latino" },
    { title: "Pablo El Apóstol", banner: "https://static.wixstatic.com/media/859174_1a4c34a2bb8a495bad6ea09b5da366dd~mv2.jpg", path: "serie/pablo-el-apostol", audio: "Latino" },
    { title: "La Casa De David", banner: "https://static.wixstatic.com/media/859174_bc1b97a10d3247e097ff4bbdda56e973~mv2.jpg", path: "serie-tv/la-casa-de-david", audio: "Subtitulado" },
    { title: "La Reina De Persia", banner: "https://static.wixstatic.com/media/859174_25430a5b5d74415f8a6ad729958081d2~mv2.jpg", path: "serie/la-reina-de-persia", audio: "Latino" },
    { title: "La Vida De Job", banner: "https://static.wixstatic.com/media/859174_d0095ad0db584be09c815e43b4bd1c39~mv2.jpg", path: "serie/la-vida-de-job", audio: "Subtitulado" },
    { title: "El Señor Y La Sierva", banner: "https://static.wixstatic.com/media/859174_9e32bbc02d864ed9842fb43173bfd1e3~mv2.jpg", path: "serie/el-senor-y-la-sierva", audio: "Subtitulado" },
    { title: "Reyes La Sucesión", banner: "https://static.wixstatic.com/media/859174_2960f93a729e41df96813820c93b80eb~mv2.jpg", path: "serie/reyes-la-sucesion", audio: "Latino" },
    { title: "Nehemías", banner: "https://static.wixstatic.com/media/859174_fb1b30a68bcd427fa813140bd095f259~mv2.jpg", path: "serie/nehemias", audio: "Latino" }
  ];

  const dataBiblicas = [
    { title: "Génesis", banner: "https://static.wixstatic.com/media/859174_018cfcb041814b67bd52c6a4359b3cbc~mv2.jpg", path: "serie/genesis", audio: "Latino" },
    { title: "Lea", banner: "https://static.wixstatic.com/media/859174_dae68737adf0429d906c00ccd6312b48~mv2.jpg", path: "serie/lea", audio: "Latino" },
    { title: "La Vida de Job", banner: "https://static.wixstatic.com/media/859174_bf0ed28131784482ae405ea82eea4c97~mv2.jpg", path: "serie/la-vida-de-job", audio: "Subtitulado" },
    { title: "José de Egipto", banner: "https://static.wixstatic.com/media/859174_e4bd49f00d5d4377a7e404ae7246d696~mv2.jpg", path: "serie/jose-de-egipto", audio: "Latino" },
    { title: "Los Diez Mandamientos", banner: "https://static.wixstatic.com/media/859174_0e75860e77094dbf9f210a7822ba7f5e~mv2.jpg", path: "serie/moises-y-los-diez-mandamientos", audio: "Latino" },
    { title: "La Tierra Prometida", banner: "https://static.wixstatic.com/media/859174_e4d2a3d4cbe04efc8a90f9d17a3466e3~mv2.jpg", path: "serie/la-tierra-prometida", audio: "Latino" },
    { title: "Sansón y Dalila", banner: "https://static.wixstatic.com/media/859174_4b72ddf27fd9425f890afa32a6f0f29b~mv2.jpg", path: "serie/sanson-y-dalila", audio: "Latino" },
    { title: "Rey David", banner: "https://static.wixstatic.com/media/859174_e0555531e40c4362ad8d1e06f243af08~mv2.jpg", path: "serie/rey-david", audio: "Latino" },
    { title: "Reyes", banner: "https://static.wixstatic.com/media/859174_72102f14890f4c5b97cd1ba680dc700a~mv2.jpg", path: "serie/reyes", audio: "Latino" },
    { title: "Jezabel", banner: "https://static.wixstatic.com/media/859174_e64b24afc6174b53b7682529f7184069~mv2.jpg", path: "serie/jezabel", audio: "Latino" },
    { title: "El Rico y Lázaro", banner: "https://static.wixstatic.com/media/859174_4a207a35843047c7aa4400dff1a8bc68~mv2.jpg", path: "serie/el-rico-y-lazaro", audio: "Latino" },
    { title: "La Historia de Ester", banner: "https://static.wixstatic.com/media/859174_08a0b7968f0f48a4acbb8c58805d387e~mv2.jpg", path: "serie/la-historia-de-la-reina-ester", audio: "Latino" },
    { title: "La Reina de Persia", banner: "https://static.wixstatic.com/media/859174_f4ecd0fc68ec45a598afcdd9344cba79~mv2.jpg", path: "serie/la-reina-de-persia", audio: "Latino" },
    { title: "Nehemías", banner: "https://static.wixstatic.com/media/859174_2fa68ebd2b22447889e85bf3cebe4c75~mv2.jpg", path: "serie/nehemias", audio: "Subtitulado" },
    { title: "Milagros de Jesús", banner: "https://static.wixstatic.com/media/859174_0d01d04096d144b7821f7c6438bc281d~mv2.jpg", path: "serie/los-milagros-de-jesus", audio: "Latino" },
    { title: "Jesús", banner: "https://static.wixstatic.com/media/859174_d9ce32069d954bc99d5db05bb90fc924~mv2.jpg", path: "serie/jesus", audio: "Latino" },
    { title: "Pablo El Apóstol", banner: "https://static.wixstatic.com/media/859174_c43f668e3a914d29b7c5e9f90e722641~mv2.jpg", path: "serie/pablo-el-apostol", audio: "Latino" },
    { title: "El Señor y La Sierva", banner: "https://static.wixstatic.com/media/859174_b3605a85f77244c3a348ae3561ce49bb~mv2.jpg", path: "serie/el-senor-y-la-sierva", audio: "Subtitulado" },
    { title: "Apocalipsis", banner: "https://static.wixstatic.com/media/859174_3187cee73d2e4cd9bc1aa7971fd2c117~mv2.jpg", path: "serie/apocalipsis", audio: "Latino" }
  ];

  const poolRecomendados = [
    ...dataBiblicas,
    { title: "La Casa De David", banner: "https://static.wixstatic.com/media/859174_cc2c878f7a0a4fffa5b63ef31048fb75~mv2.jpg", path: "serie-tv/la-casa-de-david", audio: "Latino" },
    { title: "La Biblia", banner: "https://static.wixstatic.com/media/859174_aa4a8425d9714f0aa2f96b418a408747~mv2.jpg", path: "serie-tv/la-biblia", audio: "Latino" },
    { title: "La Pasión De Cristo", banner: "https://static.wixstatic.com/media/859174_68e2caed65fb48f482bead90d49ac07a~mv2.jpg", path: "pelicula/la-pasion-de-cristo", audio: "Latino" },
    { title: "Reyes La Decepción", banner: "https://static.wixstatic.com/media/859174_e6a7e56fc1d3456c80a1be6c93eaa3ea~mv2.jpg", path: "/serie/reyes-la-decepcion", audio: "Latino" },
    { title: "Reyes La Esperanza", banner: "https://static.wixstatic.com/media/859174_5333427811fa4d8c94d72a12b17b231f~mv2.jpg", path: "/serie/reyes-la-esperanza", audio: "Latino" }
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    // Recomendados: 10 aleatorios sin estrenos
    const filteredPool = poolRecomendados.filter(p => !dataEstrenos.map(e => e.title).includes(p.title));
    setRecommended([...filteredPool].sort(() => 0.5 - Math.random()).slice(0, 10));

    const saved = JSON.parse(localStorage.getItem('myList') || '[]');
    setMyList(allSeries.filter(s => saved.includes(s.id)));
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openTrailer = (url: string, path: string) => {
    setActiveTrailer({ url, path });
    setShowModal(true);
  };

  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      const normalize = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      const term = normalize(searchQuery);
      setSearchResults(allSeries.filter(s => normalize(s.title).includes(term)));
    } else { setSearchResults([]); }
  }, [searchQuery]);

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
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border border-white/10 ${m.audio === 'Latino' ? 'bg-[#F09800] text-white' : 'bg-black/70 text-white backdrop-blur-md'}`}>{m.audio === 'Latino' ? 'LAT' : 'SUB'}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    );
  };

  // BARRA DE NAVEGACIÓN (Ubicación blindada)
  const Navbar = (
    <nav className={`fixed top-0 w-full z-[130] transition-all duration-500 px-8 py-4 flex items-center justify-between ${isScrolled || searchQuery.length > 0 ? 'bg-black shadow-lg' : 'bg-gradient-to-b from-black via-black/60 to-transparent'}`}>
      <div className="flex items-center gap-10">
        <Link href="/"><div className="relative w-[160px] h-[45px] cursor-pointer"><Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" fill className="object-contain" priority /></div></Link>
        <div className="flex gap-8">
          <Link href="/" className="relative group text-white text-[15px] font-medium tracking-wide">Inicio<span className={`absolute -bottom-1 left-0 h-[3px] bg-[#FF8A00] transition-all duration-500 ${router.pathname === '/' ? 'w-full' : 'w-0 group-hover:w-full'}`} /></Link>
          <Link href="/series-biblicas" className="relative group text-white text-[15px] font-medium tracking-wide">Series Bíblicas<span className="absolute -bottom-1 left-0 h-[3px] bg-[#FF8A00] transition-all duration-500 w-0 group-hover:w-full" /></Link>
          <Link href="/series-tv" className="relative group text-white text-[15px] font-medium tracking-wide">Series TV<span className="absolute -bottom-1 left-0 h-[3px] bg-[#FF8A00] transition-all duration-500 w-0 group-hover:w-full" /></Link>
          <Link href="/peliculas" className="relative group text-white text-[15px] font-medium tracking-wide">Películas<span className="absolute -bottom-1 left-0 h-[3px] bg-[#FF8A00] transition-all duration-500 w-0 group-hover:w-full" /></Link>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <form onSubmit={(e) => e.preventDefault()} className="flex items-center bg-white/10 rounded-full px-4 py-1 border border-white/5 focus-within:border-[#FF8A00]">
          <IoSearchOutline className="text-white text-xl" />
          <input type="text" placeholder="Buscar..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent border-none outline-none text-white text-sm ml-2 w-32 placeholder:text-gray-400" />
        </form>
        <Image src="https://static.wixstatic.com/media/859174_26ca840644ce4f519c0458c649f44f34~mv2.png" alt="User" width={30} height={30} className="rounded-full ring-1 ring-white/20 hover:ring-[#FF8A00] cursor-pointer" />
      </div>
    </nav>
  );

  const banners = [
    { id: 1, path: "/serie/la-reina-de-persia", trailer: "https://ok.ru/videoembed/14703414348288", bg: "https://static.wixstatic.com/media/859174_8880c8a667894fd1af103a0336171721~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_6eb0c42c44e340d2a314f7be009d6e8a~mv2.png", desc: "Inspirada en el libro de Ester, esta historia revela cómo una joven guiada por su fe es llevada al corazón del imperio persa para cumplir un propósito divino." },
    { id: 2, path: "/serie/reyes-la-decadencia", trailer: "https://ok.ru/videoembed/14703415134720", bg: "https://static.wixstatic.com/media/859174_298156d13007436bade3f3219dac7771~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_373d72b97d7e49c6a2ed99da442b8e5a~mv2.png", desc: "En una etapa de corrupción espiritual, el reino de Israel se hunde bajo decisiones alejadas de Dios. Idolatría y guerras se entrelazan." },
    { id: 3, path: "/serie/pablo-el-apostol", trailer: "https://ok.ru/videoembed/14703417887232", bg: "https://static.wixstatic.com/media/859174_3f7434c3c97d4ed982befff72cfdbd27~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_90bd74be414340e29671df248bade4a3~mv2.png", desc: "De perseguidor implacable a mensajero de Cristo, vive la transformación radical de Pablo de Tarso. Una fe inquebrantable que desafía imperios." },
    { id: 4, path: "/serie/la-vida-de-job", trailer: "https://ok.ru/videoembed/14703420508672", bg: "https://static.wixstatic.com/media/859174_b9159dfbf8cc403eb180531c8338589e~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_57a3f59e3dc44abc96ad1508f1ecf6db~mv2.png", desc: "La fe de un hombre justo es llevada al límite tras perderlo todo. En medio del dolor, Job enfrenta preguntas profundas sobre el sufrimiento." },
    { id: 5, path: "/serie-tv/la-casa-de-david", trailer: "https://ok.ru/videoembed/14703421032960", bg: "https://static.wixstatic.com/media/859174_25f3802c3bc0432b85c91bed4f588599~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_483e446bb507429694def615b148509d~mv2.jpg", desc: "De pastor de ovejas al trono de Israel, sigue la vida de David. Gigantes y batallas marcan el camino de un líder conforme al corazón de Dios." },
    { id: 6, path: "/serie/el-senor-y-la-sierva", trailer: "https://ok.ru/videoembed/14703422867968", bg: "https://static.wixstatic.com/media/859174_d16e8080cf4043e5a7b17a2538f8dcf5~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_4f27eb2a8b7741f69eccead2e7fd0dcf~mv2.png", desc: "En el Imperio romano, surge un amor imposible entre Elisa y Cayo. Las persecuciones ponen a prueba su relación y su esperanza." }
  ];

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-[#FF8A00]">
      <Head><title>Estudios 421 — La Fe En Pantalla</title></Head>
      
      {Navbar}
      
      <main className="relative">
        {/* BUSCADOR OVERLAY ORIGINAL */}
        {searchQuery.length > 0 && (
          <div className="fixed inset-0 bg-black z-[120] pt-24 px-8 md:px-16 overflow-y-auto pb-20">
             <h2 className="text-white text-2xl font-bold mb-10 uppercase tracking-widest flex items-center gap-3"><span className="w-1.5 h-6 bg-[#FF8A00]" />Resultados: "{searchQuery}"</h2>
             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-10">
               {searchResults.map((m) => (
                 <Link key={m.id} href={m.path}><div className="relative aspect-[2/3] rounded-md transition-all duration-500 hover:scale-110 hover:z-[110] cursor-pointer shadow-2xl group"><Image src={m.banner} alt={m.title} fill className="object-cover rounded-md" unoptimized /></div></Link>
               ))}
             </div>
          </div>
        )}

        {/* MODAL DE TRAILER */}
        {showModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setShowModal(false)} />
            <div className="relative w-full max-w-5xl aspect-video bg-[#0a0a0a] rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(255,138,0,0.25)] border border-white/10">
              <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 z-[210] text-[#FF8A00] hover:scale-110 transition-transform"><IoCloseOutline size={50} /></button>
              <iframe src={`${activeTrailer.url}?autoplay=1`} className="w-full h-full" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen />
              <div className="absolute bottom-8 left-10 z-[210] flex gap-4"><button onClick={() => router.push(activeTrailer.path)} className="bg-[#F09800] text-white px-10 py-3 rounded-md font-bold flex items-center gap-3 hover:scale-105 transition-transform"><FaPlay size={14} /> VER AHORA</button></div>
            </div>
          </div>
        )}

        <section className="relative w-full h-[95vh] bg-black overflow-hidden mb-12">
          <Slider {...{ fade: true, dots: true, infinite: true, speed: 1000, autoplay: true, autoplaySpeed: 6000, pauseOnHover: false, arrows: false, dotsClass: "slick-dots custom-dots" }}>
            {banners.map((item) => (
              <div key={item.id} className="relative w-full h-[95vh] outline-none">
                <div className="relative w-full h-full"><Image src={item.bg} alt="Banner" fill className="object-cover" priority /></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent z-10 w-2/3" />
                <div className="absolute inset-0 z-20 flex flex-col justify-center px-20 pt-10">
                  <div className="relative w-[450px] h-[160px] mb-6 drop-shadow-2xl"><Image src={item.logo} alt="Logo" fill className="object-contain object-left" /></div>
                  <p className="max-w-[550px] text-white text-[19px] font-medium mb-8 leading-relaxed text-justify opacity-90">{item.desc}</p>
                  <div className="flex items-center gap-5">
                    <button onClick={() => router.push(item.path)} style={{ backgroundColor: '#F09800' }} className="text-white px-9 py-3 rounded-md font-bold shadow-[0_0_20px_rgba(240,152,0,0.4)] hover:scale-105 transition-all flex items-center gap-2"><FaPlay size={12} /> Ver Ahora</button>
                    <button onClick={() => openTrailer(item.trailer, item.path)} className="bg-white/10 text-white px-9 py-3 rounded-md font-bold backdrop-blur-md border border-white/20 hover:bg-white/20 hover:scale-105 transition-all flex items-center gap-2"><HiOutlineInformationCircle size={22} /> Más Información</button>
                    <a href="https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS" target="_blank" rel="noreferrer" className="bg-black/40 text-white px-6 py-3 rounded-md font-bold border border-[#F09800]/50 hover:scale-105 transition-all flex items-center gap-2 text-sm uppercase tracking-wider"><BiDonateHeart size={20} className="text-[#F09800]" /> Donar</a>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </section>

        <div className="relative z-30 pb-20 mt-[-60px]">
          <MovieRow title="Mi Lista" movies={myList} />
          <MovieRow title="Estrenos" movies={dataEstrenos} />
          <MovieRow title="Series Bíblicas" movies={dataBiblicas} />
          <MovieRow title="Recomendados" movies={recommended} />
          <MovieRow title="Series TV" movies={allSeries.filter(s => s.category === 'Serie de TV')} />
          <MovieRow title="Películas" movies={allSeries.filter(s => s.category === 'Película')} />
        </div>
      </main>

      <footer className="bg-[#0a0a0a] text-gray-400 py-12 px-8 md:px-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center md:justify-end gap-6 mb-10">
            <a href="#" className="hover:text-white transition-colors text-xl"><FaFacebookF /></a>
            <a href="#" className="hover:text-white transition-colors text-xl"><FaInstagram /></a>
            <a href="#" className="hover:text-white transition-colors text-xl"><FaTiktok /></a>
            <a href="#" className="hover:text-white transition-colors text-xl"><FaYoutube /></a>
            <a href="#" className="hover:text-white transition-colors text-xl"><FaXTwitter /></a>
          </div>
          <div className="mb-10 space-y-4">
            <p className="text-xs leading-relaxed max-w-4xl">© {new Date().getFullYear()} Estudios 421. Todos los derechos reservados sobre el diseño y edición de la plataforma.</p>
            <p className="text-[10px] md:text-xs leading-relaxed text-gray-500 max-w-5xl">Aviso Legal: El contenido audiovisual compartido en este sitio pertenece a sus respectivos propietarios y productoras (Record TV, Seriella Productions, Casablanca Productions, Amazon Content Services LLC, entre otros). Estudios 421 es una plataforma sin fines de lucro destinada a la difusión de contenido bíblico para la comunidad. No reclamamos propiedad sobre las series o películas mostradas.</p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-[11px] md:text-xs font-medium uppercase tracking-widest border-t border-white/5 pt-8">
            <Link href="/politica-de-privacidad" className="hover:text-white transition-colors">Política de privacidad</Link>
            <Link href="/terminos-de-uso" className="hover:text-white transition-colors">Términos de uso</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">Configuración de cookies</Link>
            <Link href="/anuncios" className="hover:text-white transition-colors">Especificaciones de anuncios</Link>
            <Link href="/ayuda" className="hover:text-white transition-colors">Centro de ayuda</Link>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        .custom-dots { bottom: 65px !important; text-align: center !important; }
        .custom-dots li { margin: 0 6px !important; }
        .custom-dots li button:before { color: white !important; font-size: 8px !important; opacity: 0.4; }
        .custom-dots li.slick-active { width: 45px !important; }
        .custom-dots li.slick-active button:before { color: #F09800 !important; content: '' !important; background: #F09800; width: 45px; height: 5px; border-radius: 3px; top: 10px; opacity: 1; }
        .movie-slider .slick-list { overflow: visible !important; }
        .movie-slider .slick-prev, .movie-slider .slick-next { height: 100%; width: 48px; z-index: 100; top: 50%; transform: translateY(-50%); transition: all 0.3s ease; opacity: 0; }
        .group\/row:hover .movie-slider .slick-prev, .group\/row:hover .movie-slider .slick-next { opacity: 1; }
        .movie-slider .slick-prev { left: 0 !important; }
        .movie-slider .slick-next { right: 0 !important; }
      `}</style>
    </div>
  );
};

export default InicioPC;
