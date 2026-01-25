import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Slider from 'react-slick';
import { IoSearchOutline, IoCloseOutline, IoChevronBack, IoChevronForward, IoLanguageOutline } from 'react-icons/io5';
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

  // Listas Manuales (Fidelidad 100% a tus imágenes)
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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    // Recomendados aleatorios (10)
    const pool = [...dataBiblicas, ...allSeries.filter(s => s.category === 'Película' || s.category === 'Serie de TV')];
    const filteredPool = pool.filter(p => !dataEstrenos.map(e => e.title).includes(p.title));
    setRecommended([...filteredPool].sort(() => 0.5 - Math.random()).slice(0, 10));

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openTrailer = (url: string, path: string) => {
    setActiveTrailer({ url, path });
    setShowModal(true);
  };

  const NextArrow = ({ onClick }: any) => (
    <div className="absolute right-0 top-0 bottom-0 z-50 flex items-center justify-center w-12 hover:bg-[#FF8A00] cursor-pointer transition-all duration-300 group" onClick={onClick}>
      <IoChevronForward className="text-white group-hover:scale-125" size={40} />
    </div>
  );

  const PrevArrow = ({ onClick }: any) => (
    <div className="absolute left-0 top-0 bottom-0 z-50 flex items-center justify-center w-12 hover:bg-[#FF8A00] cursor-pointer transition-all duration-300 group" onClick={onClick}>
      <IoChevronBack className="text-white group-hover:scale-125" size={40} />
    </div>
  );

  const MovieRow = ({ title, movies }: any) => {
    if (movies.length === 0) return null;
    const settings = { dots: false, infinite: movies.length > 6, speed: 500, slidesToShow: 6, slidesToScroll: 4, nextArrow: <NextArrow />, prevArrow: <PrevArrow /> };
    return (
      <div className="mb-14 px-4 md:px-16 relative overflow-hidden group/row">
        <h2 className="text-white text-xl font-bold mb-4 uppercase tracking-wider ml-2 flex items-center gap-3">
          <span className="w-1.5 h-6 bg-[#FF8A00]" />{title}
        </h2>
        <Slider {...settings} className="movie-slider">
          {movies.map((m: any, idx: number) => (
            <div key={idx} className="px-1.5 outline-none py-4">
              <Link href={m.path || '#'}>
                <div className="relative aspect-[2/3] rounded-lg transition-all duration-300 hover:scale-110 hover:z-[100] cursor-pointer group/poster">
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

  const banners = [
    { id: 1, path: "/serie/la-reina-de-persia", trailer: "https://ok.ru/videoembed/14703414348288", bg: "https://static.wixstatic.com/media/859174_8880c8a667894fd1af103a0336171721~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_6eb0c42c44e340d2a314f7be009d6e8a~mv2.png", desc: "Inspirada en el libro de Ester..." },
    { id: 2, path: "/serie/reyes-la-decadencia", trailer: "https://ok.ru/videoembed/14703415134720", bg: "https://static.wixstatic.com/media/859174_298156d13007436bade3f3219dac7771~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_373d72b97d7e49c6a2ed99da442b8e5a~mv2.png", desc: "En una etapa de corrupción espiritual..." },
    { id: 3, path: "/serie-tv/la-casa-de-david", trailer: "https://ok.ru/videoembed/14703421032960", bg: "https://static.wixstatic.com/media/859174_25f3802c3bc0432b85c91bed4f588599~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_483e446bb507429694def615b148509d~mv2.jpg", desc: "De pastor de ovejas al trono de Israel..." }
  ];

  return (
    <div className="bg-black min-h-screen text-white font-sans">
      <Head><title>Estudios 421 — La Fe En Pantalla</title></Head>
      
      {/* NAVBAR RESTAURADO CON IDIOMAS */}
      <nav className={`fixed top-0 w-full z-[130] transition-all duration-500 px-8 py-4 flex items-center justify-between ${isScrolled || searchQuery.length > 0 ? 'bg-black shadow-lg' : 'bg-gradient-to-b from-black via-black/60 to-transparent'}`}>
        <div className="flex items-center gap-10">
          <Link href="/"><div className="relative w-[160px] h-[45px] cursor-pointer"><Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" fill className="object-contain" priority /></div></Link>
          <div className="flex gap-8 font-medium">
            <Link href="/" className="hover:text-[#FF8A00] transition-colors">Inicio</Link>
            <Link href="/series-biblicas" className="hover:text-[#FF8A00] transition-colors">Series Bíblicas</Link>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-xs font-bold border-r border-white/20 pr-4 mr-2">
            <IoLanguageOutline size={18} className="text-[#FF8A00]" />
            <span className="cursor-pointer hover:text-[#FF8A00]">ES</span>
            <span className="text-white/20">|</span>
            <span className="cursor-pointer hover:text-[#FF8A00]">PT</span>
          </div>
          <form className="flex items-center bg-white/10 rounded-full px-4 py-1 border border-white/5 focus-within:border-[#FF8A00]">
            <IoSearchOutline className="text-white text-xl" />
            <input type="text" placeholder="Buscar..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent border-none outline-none text-white text-sm ml-2 w-32" />
          </form>
          <Image src="https://static.wixstatic.com/media/859174_26ca840644ce4f519c0458c649f44f34~mv2.png" alt="User" width={30} height={30} className="rounded-full cursor-pointer" />
        </div>
      </nav>

      <main className="relative">
        <section className="relative w-full h-[95vh] bg-black overflow-hidden mb-12">
          <Slider {...{ fade: true, dots: true, infinite: true, speed: 1000, autoplay: true, autoplaySpeed: 6000, dotsClass: "slick-dots custom-dots" }}>
            {banners.map((item) => (
              <div key={item.id} className="relative w-full h-[95vh] outline-none">
                <div className="relative w-full h-full"><Image src={item.bg} alt="Banner" fill className="object-cover" priority /></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent z-10" />
                <div className="absolute inset-0 z-20 flex flex-col justify-center px-20">
                  <div className="relative w-[450px] h-[160px] mb-6"><Image src={item.logo} alt="Logo" fill className="object-contain object-left" /></div>
                  <p className="max-w-[550px] text-white text-[19px] mb-8">{item.desc}</p>
                  <div className="flex items-center gap-5">
                    <button onClick={() => router.push(item.path)} className="bg-[#F09800] text-white px-9 py-3 rounded-md font-bold flex items-center gap-2"><FaPlay size={12} /> Ver Ahora</button>
                    <button onClick={() => openTrailer(item.trailer, item.path)} className="bg-white/10 px-9 py-3 rounded-md font-bold border border-white/20 flex items-center gap-2"><HiOutlineInformationCircle size={22} /> Más Información</button>
                    <a href="#" className="bg-black/40 px-6 py-3 rounded-md font-bold border border-[#F09800]/50 flex items-center gap-2"><BiDonateHeart size={20} className="text-[#F09800]" /> Donar</a>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </section>

        {/* CONTENEDOR DE CARRUSELES SUBIDO */}
        <div className="relative z-30 pb-20 mt-[-110px]">
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
            <p className="text-xs">© {new Date().getFullYear()} Estudios 421. Todos los derechos reservados.</p>
            <p className="text-[10px] text-gray-500">Aviso Legal: El contenido pertenece a sus respectivos propietarios...</p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        .custom-dots { bottom: 65px !important; }
        .custom-dots li button:before { color: white !important; }
        .custom-dots li.slick-active button:before { color: #F09800 !important; }
        .movie-slider .slick-list { overflow: visible !important; }
        .movie-slider .slick-prev, .movie-slider .slick-next { opacity: 0; transition: opacity 0.3s; }
        .group\/row:hover .movie-slider .slick-prev, .group\/row:hover .movie-slider .slick-next { opacity: 1; }
      `}</style>
    </div>
  );
};

export default InicioPC;
