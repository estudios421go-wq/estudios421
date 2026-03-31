import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoChevronBack, IoChevronForward, IoList, IoClose, IoCheckmarkCircle } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { allSeries } from '../../../data/series';

// --- CONFIGURACIÓN DE EPISODIOS (ID: 46) ---
const chosenEpisodes = [
  // TEMPORADA 1
  { id: 1, season: 1, title: "T1 E1 — Te llamé por tu nombre", desc: "Dos hermanos tienen problemas con los impuestos que deben a Roma; y una mujer en el barrio rojo lucha contra sus demonios.", thumb: "https://static.wixstatic.com/media/859174_5f63429ca9ad46bfb9985ef6920f973b~mv2.jpg", url: "https://drive.google.com/file/d/1vr_79yKpRJH0iyvtbtil-_y3jZ83Qaqw/preview" },
  { id: 2, season: 1, title: "T1 E2 — Sabbat", desc: "Mateo valida el reclamo de Simón con el pretor Quinto. Nicodemo investiga el milagro reportado en el barrio rojo y María recibe invitados inesperados.", thumb: "https://static.wixstatic.com/media/859174_f5d1006bc7b6468ebe0c5d6977da510a~mv2.jpg", url: "https://drive.google.com/file/d/1O_dX84viLF1D1vtrSL5ZCx_tzx8JscXQ/preview" },
  { id: 3, season: 1, title: "T1 E3 — Jesús ama a los niños", desc: "Jesús entabla una amistad con un grupo de niños que descubre su campamento en las afueras de Cafarnaúm y les imparte sus enseñanzas.", thumb: "https://static.wixstatic.com/media/859174_fcdd3a3408bc4a9f9d3e29b055af1446~mv2.jpg", url: "https://drive.google.com/file/d/1dr18c0Oa2-JUmB95R-eaaFjhbBMKZ9jo/preview" },
  { id: 4, season: 1, title: "T1 E4 — La roca sobre la cual se construye", desc: "Simón sale a pescar una última noche en un intento desesperado por saldar sus deudas. Andrés observa un rostro familiar en las costas de Galilea.", thumb: "https://static.wixstatic.com/media/859174_18a2a22ce0a4457185a2f3232a06a73b~mv2.jpg", url: "https://drive.google.com/file/d/1Pnvzs7SxM1QWjRdiBze-XWBKRv0vIFE8/preview" },
  { id: 5, season: 1, title: "T1 E5 — El regalo de boda", desc: "Nicodemo interroga a Juan el Bautista; mientras Jesús y sus alumnos se dirigen a la celebración de una boda en Caná. El vino comienza a acabarse.", thumb: "https://static.wixstatic.com/media/859174_47a03d8ffe34421380b94e84329a14b3~mv2.jpg", url: "https://drive.google.com/file/d/1FGJNAeywTlSZ8pr0m-F513NpRsdNaiwo/preview" },
  { id: 6, season: 1, title: "T1 E6 — Compasión indescriptible", desc: "Tras ser testigo de la sanación de un leproso; una mujer atraviesa la multitud con su amigo paralítico para conocer a Jesús.", thumb: "https://static.wixstatic.com/media/859174_cf3c45031e3a4da59794a922c19dd240~mv2.jpg", url: "https://drive.google.com/file/d/1TOL1tDyoPK0O_xbfFZdyG7C23Qzgl2WC/preview" },
  { id: 7, season: 1, title: "T1 E7 — Invitaciones", desc: "Mateo tiene problemas para conciliar los milagros que observó con la realidad. Nicodemo se reúne con Jesús de noche.", thumb: "https://static.wixstatic.com/media/859174_d31adafb238c4eb7a90587e22f1becf2~mv2.jpg", url: "https://drive.google.com/file/d/1Kvv-678YUj7YtWWmLxiN8eYc3vVenE6S/preview" },
  { id: 8, season: 1, title: "T1 E8 — Yo soy Él", desc: "Jesús conoce a una mujer dolorida en el pozo de Jacob y anuncia que Él es el Mesías.", thumb: "https://static.wixstatic.com/media/859174_3d76d9776dce431a9c1ad97879d1a128~mv2.jpg", url: "https://drive.google.com/file/d/1b-rp0298Ov0SXzN39h00xj0eh6amdKbI/preview" },

  // TEMPORADA 2
  { id: 9, season: 2, title: "T2 E1 — Trueno", desc: "Jesús regaña a Santiago el Mayor y a Juan por sus prejuicios y; tras un enfrentamiento casi violento; les da un apodo nuevo.", thumb: "https://static.wixstatic.com/media/859174_537d781664ca4d2ea43fa922df151aee~mv2.jpg", url: "https://drive.google.com/file/d/1s_Lv1smKUoO8z06CxftcVqXQUj8iDc7R/preview" },
  { id: 10, season: 2, title: "T2 E2 — Te vi", desc: "Una persona misteriosa desea conocer a Jesús; pero sus discípulos tienen dudas. La fama de Jesús aumenta.", thumb: "https://static.wixstatic.com/media/859174_2eee141f2b1a423cb58e365ff1af16fd~mv2.jpg", url: "https://drive.google.com/file/d/1FVx3QX7tTlRxbU7XEfzgTLKFhWSMNQRE/preview" },
  { id: 11, season: 2, title: "T2 E3 — Mateo 4:24", desc: "Los discípulos ayudan a Jesús a lidiar con la multitud que espera ser sanada. En la fogata; la tensión explota.", thumb: "https://static.wixstatic.com/media/859174_0e59ed117bca471e8f06efcda0047e70~mv2.jpg", url: "https://drive.google.com/file/d/1SmjiGIoNdGs6mVBGigCscpUkj8x4tvL7/preview" },
  { id: 12, season: 2, title: "T2 E4 — La oportunidad perfecta", desc: "Jesús y sus discípulos se dirigen a Jerusalén. Un nuevo enemigo los sigue; y un enemigo familiar espera.", thumb: "https://static.wixstatic.com/media/859174_77e2d14a7edd466db70d9c1f815d557f~mv2.jpg", url: "https://drive.google.com/file/d/19F_sZaf8hLd-qsZYOCF7PLBjdC5kUjGJ/preview" },
  { id: 13, season: 2, title: "T2 E5 — Espíritu", desc: "Juan el Bautista visita al grupo. María Magdalena queda devastada tras el encuentro con un extraño misterioso.", thumb: "https://static.wixstatic.com/media/859174_8f1eb55aa6bc4e789affbb9cc9396658~mv2.jpg", url: "https://drive.google.com/file/d/1xvTO4BKuACHs5jrIVMIACYd5RVyscrSo/preview" },
  { id: 14, season: 2, title: "T2 E6 — Ilegal", desc: "Mateo y Simón buscan a María en lugares oscuros. Jesús sigue perturbando a los fariseos.", thumb: "https://static.wixstatic.com/media/859174_15e010af0e134644b9a0db8c5041f71d~mv2.jpg", url: "https://drive.google.com/file/d/1h8OfzxZr2FMrmTrdD8b6qKaQtNTnc8eZ/preview" },
  { id: 15, season: 2, title: "T2 E7 — Enfrentamiento", desc: "Quinto envía a Gaius para arrestar a Jesús. Los discípulos pierden el control al discutir sobre cómo responder.", thumb: "https://static.wixstatic.com/media/859174_f7437509c5f54fe6a3cf5689ccf39bf3~mv2.jpg", url: "https://drive.google.com/file/d/1kuThzchyQ-YQ0BKjVtcN7UWjn5JqIPi5/preview" },
  { id: 16, season: 2, title: "T2 E8 — Más allá de las montañas", desc: "Jesús y Mateo preparan el gran sermón. Miles de personas llegan para el sermón.", thumb: "https://static.wixstatic.com/media/859174_15bbfda48dce4725b1b3a52f76dc671a~mv2.jpg", url: "https://drive.google.com/file/d/1waouC96jCrJ7eTQ7vlxv1ZEJkdXILrCW/preview" },

  // TEMPORADA 3
  { id: 17, season: 3, title: "T3 E1 — Bienvenida", desc: "Jesús brinda el sermón más revolucionario de la historia. Simón y Edén se reencuentran.", thumb: "https://static.wixstatic.com/media/859174_44469e1b65b34a449d5486b7954fbce1~mv2.jpg", url: "https://drive.google.com/file/d/13ykl6PLvchJ4uHjIted3hrSwI3aBVM5N/preview" },
  { id: 18, season: 3, title: "T3 E2 — De dos en dos", desc: "Jesús envía oficialmente a los doce apóstoles en una misión emocionante pero peligrosa.", thumb: "https://static.wixstatic.com/media/859174_1edf6b4750b94a3b8fa858ac11fef44f~mv2.jpg", url: "https://drive.google.com/file/d/1j4PMA_xOqzo8zE4IGwa0_sA1GRoKkIAB/preview" },
  { id: 19, season: 3, title: "T3 E3 — Médico; sánate a ti mismo", desc: "Jesús regresa al hogar de su infancia para celebrar el Año Nuevo judío.", thumb: "https://static.wixstatic.com/media/859174_2847057a452d4ae3ac57b331b77dacc6~mv2.jpg", url: "https://drive.google.com/file/d/1Hw9417h-40tqwcT8ajwA0JO7dMDiOFWS/preview" },
  { id: 20, season: 3, title: "T3 E4 — Limpios", desc: "Los discípulos llevan a cabo la misión de Jesús de sanar y predicar su palabra.", thumb: "https://static.wixstatic.com/media/859174_bc6bee5df38448e198d1669f679a09a9~mv2.jpg", url: "https://drive.google.com/file/d/1J3jIRljPOXt3Q7BLySIo8gGprmBMIqFp/preview" },
  { id: 21, season: 3, title: "T3 E5 — Limpios (Parte II)", desc: "Simón y Gaius trabajan juntos. Jairo y Verónica buscan desesperados a Jesús.", thumb: "https://static.wixstatic.com/media/859174_39648f03968a4049ab33c2c3663b7b7f~mv2.jpg", url: "https://drive.google.com/file/d/1QaXXp0k6TDFQqXAwy0ANzm-wE-Y8ZIJA/preview" },
  { id: 22, season: 3, title: "T3 E6 — Intensidad en el campamento", desc: "Andrés y Felipe descubren un desastre. Dos discípulos de Juan el Bautista llegan con una pregunta.", thumb: "https://static.wixstatic.com/media/859174_4af841f241e74b6ab63dbfb51a9f2ee8~mv2.jpg", url: "https://drive.google.com/file/d/1GUgx39Rh5fRlEi89c3Jt_4Z_dP7q2RsM/preview" },
  { id: 23, season: 3, title: "T3 E7 — Oídos para oír", desc: "Andrés y Felipe regresan con noticias desesperadas. Jesús los guía a la Decápolis.", thumb: "https://static.wixstatic.com/media/859174_62fceadb7155401fadcdfd034036e25d~mv2.jpg", url: "https://drive.google.com/file/d/1_YiyDGCeRmNu6Far3lp3rL32nBKBClBd/preview" },
  { id: 24, season: 3, title: "T3 E8 — Sustento", desc: "Miles de personas tienen hambre; pero no hay comida. Jesús realiza el milagro.", thumb: "https://static.wixstatic.com/media/859174_c822b114835a40ff96be3d1bfdad4e41~mv2.jpg", url: "https://drive.google.com/file/d/1JFc4ceUHwkAvPT0q1OQXglku4t6mla18/preview" },

  // TEMPORADA 4
  { id: 25, season: 4, title: "T4 E1 — Promesas", desc: "Herodes pone fin a la vida de Juan el Bautista; pero nadie puede detener a quien acaba de llegar.", thumb: "https://static.wixstatic.com/media/859174_78f11d7d91264c3094db84a6f679ee92~mv2.jpg", url: "https://drive.google.com/file/d/1b7kd8tlWHHxHT2Vs3U4zbwriw2yVA3TO/preview" },
  { id: 26, season: 4, title: "T4 E2 — Confesiones", desc: "Simón revela la verdadera identidad de Jesús y recibe un nombre nuevo: Pedro.", thumb: "https://static.wixstatic.com/media/859174_02b49dd5020541d7923662cc3ba8b599~mv2.jpg", url: "https://drive.google.com/file/d/1AtYRE3zFgnAmrE9TL6ogkKja_COk1cDk/preview" },
  { id: 27, season: 4, title: "T4 E3 — Luna y sangre", desc: "Jesús sana a un hombre ciego en el Sabbat; Quinto toma cartas en el asunto.", thumb: "https://static.wixstatic.com/media/859174_e4252cd71fe6443a862429d4c1f588b2~mv2.jpg", url: "https://drive.google.com/file/d/12k_ZRjSlv6MkSnK5GLlTrcfBGh7AI_oU/preview" },
  { id: 28, season: 4, title: "T4 E4 — La calma previa", desc: "Un cortejo fúnebre marca el inicio de los últimos días del ministerio de Jesús.", thumb: "https://static.wixstatic.com/media/859174_cec76b31d2d141f890e33956fb650700~mv2.jpg", url: "https://drive.google.com/file/d/1O0pnNIY0cfXw5jcPD433JKmAltDQ-qGd/preview" },
  { id: 29, season: 4, title: "T4 E5 — Sentarse; servir; confabular", desc: "Judas visita a un viejo amigo para pedirle consejos ante su frustración.", thumb: "https://static.wixstatic.com/media/859174_8117841842c443baa6eb465d06dd684a~mv2.jpg", url: "https://drive.google.com/file/d/1CROg-G4lM1vDCLF7oZR7pYifv1TyznKn/preview" },
  { id: 30, season: 4, title: "T4 E6 — Dedicación", desc: "Jesús y los discípulos celebran Janucá. Un amigo no tuvo mucha suerte.", thumb: "https://static.wixstatic.com/media/859174_bde1f30ceeea41938f34eaa7315f4b06~mv2.jpg", url: "https://drive.google.com/file/d/1LJ_kybMsSrRInbUujm4h-xfzE4VIk3rD/preview" },
  { id: 31, season: 4, title: "T4 E7 — La última señal", desc: "Jesús revive a Lázaro y desencadena la secuencia de eventos final.", thumb: "https://static.wixstatic.com/media/859174_b1420ed1552d4154bc337dbd5f946d8b~mv2.jpg", url: "https://drive.google.com/file/d/1kkhIENurh5oEqHOLKzlxBAsPSm4S8sIm/preview" },
  { id: 32, season: 4, title: "T4 E8 — Humildad", desc: "Jesús llega como un cordero montado sobre un burro a Jerusalén.", thumb: "https://static.wixstatic.com/media/859174_556982894cf44506a5d0ca4119639aa8~mv2.jpg", url: "https://drive.google.com/file/d/1tXfoBq2WHWE_ZlGHwaHvRfpfL6p9EKax/preview" },

  // TEMPORADA 5
  { id: 33, season: 5, title: "T5 E1 — Llegada", desc: "Jesús entra a la ciudad santa y limpia el templo de los mercaderes.", thumb: "https://static.wixstatic.com/media/859174_740d36b6579d4693a75004b641587b6c~mv2.jpg", url: "https://drive.google.com/file/d/1eC0sJBpfaVRmd3nQiOBl8bNVgqjvdkYe/preview" },
  { id: 34, season: 5, title: "T5 E2 — Juego de poder", desc: "Caifás conspira para derrotar a Jesús, pero Él ataca primero.", thumb: "https://static.wixstatic.com/media/859174_20e2da631f88461dbf2daf9b885983f3~mv2.jpg", url: "https://drive.google.com/file/d/1mtJF-i4sGnQvS496spfC7ZmYkv50oPq2/preview" },
  { id: 35, season: 5, title: "T5 E3 — Penas", desc: "Jesús da un último sermón en Pascua ante la mirada de sus enemigos.", thumb: "https://static.wixstatic.com/media/859174_c68f06adff594a27b519f9168185b0c5~mv2.jpg", url: "https://drive.google.com/file/d/1VdGxjRCT-D_dQVdLG6mA7OlQr20KSz4j/preview" },
  { id: 36, season: 5, title: "T5 E4 — La misma moneda", desc: "Caifás decide arrestar a Jesús en la noche para evitar protestas.", thumb: "https://static.wixstatic.com/media/859174_ff47aae2fcab4e31819e7d47c0b4f3db~mv2.jpg", url: "https://drive.google.com/file/d/1gtxAqMu9WNju8BgycFgn3yH5d7-sbB34/preview" },
  { id: 37, season: 5, title: "T5 E5 — Por culpa mía", desc: "La decisión de arrestar a Jesús resulta en un debate intenso en el Sanedrín.", thumb: "https://static.wixstatic.com/media/859174_969c322581a141fda6343a46b67789b9~mv2.jpg", url: "https://drive.google.com/file/d/14urv7yH4IPkahAlypKjePfrfc5S9iQ5T/preview" },
  { id: 38, season: 5, title: "T5 E6 — Reuniones", desc: "Sus enemigos se unen para ir de cacería. Judas tiene una reunión secreta.", thumb: "https://static.wixstatic.com/media/859174_419515ba35444e0789b10b6de0e63b8e~mv2.jpg", url: "https://drive.google.com/file/d/1SSzngVIAFfFNllIrKUZf6hITO5EcsLGL/preview" },
  { id: 39, season: 5, title: "T5 E7 — La habitación de arriba - Parte I", desc: "Jesús llega a la Última Cena. Los discípulos temen por su seguridad.", thumb: "https://static.wixstatic.com/media/859174_aafbb24f1532420cb559269543686c01~mv2.jpg", url: "https://drive.google.com/file/d/1JNgAeJdTw5t11Hjc65fe5GH7ChpDZPlp/preview" },
  { id: 40, season: 5, title: "T5 E8 — La habitación de arriba - Parte II", desc: "La Última Cena termina y el destino se pone en marcha.", thumb: "https://static.wixstatic.com/media/859174_8dedc068d2c54b2297c5834d5e8c9431~mv2.jpg", url: "https://drive.google.com/file/d/14eRBHaROua4YCQdCqeXenua68uYZDQRe/preview" },
];

const TheChosenPC = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0); 
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [inMyList, setInMyList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const SERIES_ID = 46;

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

    const savedEp = localStorage.getItem('chosen_last_ep');
    if (savedEp) {
      const idx = parseInt(savedEp);
      if (idx < chosenEpisodes.length) setCurrentIdx(idx);
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
      const themeMap: { [key: string]: string[] } = {
        moises: ['moises', 'diez mandamientos', 'egipto'],
        jesus: ['jesus', 'milagros', 'pasion', 'elegidos', 'the chosen'],
        reyes: ['reyes', 'david', 'saul', 'salomon', 'ester', 'persia', 'casa de david'],
        david: ['david', 'casa de david', 'reyes', 'goliat', 'saul'],
        biblia: ['biblia', 'milagros']
      };
      const relatedTerms = new Set<string>();
      relatedTerms.add(term);
      Object.entries(themeMap).forEach(([key, values]) => {
        if (term.includes(key) || key.includes(term)) values.forEach(v => relatedTerms.add(v));
      });
      const filtered = allSeries.filter(serie => {
        const titleNormalized = normalize(serie.title);
        const categoryNormalized = normalize(serie.category || "");
        return Array.from(relatedTerms).some(t => titleNormalized.includes(t)) || categoryNormalized.includes(term);
      });
      setSearchResults(filtered);
    } else { setSearchResults([]); }
  }, [searchQuery]);

  const openEpisode = (idx: number) => {
    setCurrentIdx(idx);
    setSelectedVideo(chosenEpisodes[idx].url);
    localStorage.setItem('chosen_last_ep', idx.toString());
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
      <Head><title>The Chosen — Estudios 421</title></Head>

      <nav className={`fixed top-0 w-full z-[130] transition-all duration-500 px-8 py-4 flex items-center justify-between ${isScrolled || searchQuery.length > 0 ? 'bg-black shadow-lg' : 'bg-gradient-to-b from-black via-black/60 to-transparent'}`}>
        <div className="flex items-center gap-10">
          <Link href="/"><div className="relative w-[160px] h-[45px] cursor-pointer"><Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" fill className="object-contain" priority /></div></Link>
          <div className="flex gap-8">
            <Link href="/" className="relative group text-white text-[15px] font-medium tracking-wide">Inicio<span className="absolute -bottom-1 left-0 h-[3px] bg-[#FF8A00] transition-all duration-500 w-0 group-hover:w-full" /></Link>
            <Link href="/series-biblicas" className="relative group text-white text-[15px] font-medium tracking-wide">Series Bíblicas<span className="absolute -bottom-1 left-0 h-[3px] bg-[#FF8A00] transition-all duration-500 w-0 group-hover:w-full" /></Link>
            <Link href="/series-tv" className="relative group text-white text-[15px] font-medium tracking-wide">Series TV<span className="absolute -bottom-1 left-0 h-[3px] bg-[#FF8A00] transition-all duration-500 w-0 group-hover:w-full" /></Link>
            <Link href="/peliculas" className="relative group text-white text-[15px] font-medium tracking-wide">Películas<span className="absolute -bottom-1 left-0 h-[3px] bg-[#FF8A00] transition-all duration-500 w-0 group-hover:w-full" /></Link>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex gap-4 mr-4">
            {[{ n: '', img: '367960b11c1c44ba89cd1582fd1b5776', p: '/series-tv/the-chosen' }, { n: 'en', img: '35112d9ffe234d6f9dcef16cf8f7544e', p: '/en/serie/the-choosen' }, { n: 'pt', img: '830f1c20656e4d44a819bedfc13a22cc', p: '/pt/serie/os-escolhidos' }].map((l) => (
              <Link key={l.n} href={l.p}><img src={`https://static.wixstatic.com/media/859174_${l.img}~mv2.png`} className="w-7 h-7 object-contain cursor-pointer hover:scale-110 transition-transform" alt="idioma" /></Link>
            ))}
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="flex items-center bg-white/10 rounded-full px-4 py-1 border border-white/5 focus-within:border-[#FF8A00]">
            <IoSearchOutline className="text-white text-xl" />
            <input type="text" placeholder="Buscar..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent border-none outline-none text-white text-sm ml-2 w-32 placeholder:text-gray-400" />
          </form>
          <Image src="https://static.wixstatic.com/media/859174_26ca840644ce4f519c0458c649f44f34~mv2.png" alt="User" width={30} height={30} className="rounded-full ring-1 ring-white/20 hover:ring-[#FF8A00] cursor-pointer" />
        </div>
      </nav>

      {searchQuery.length > 0 && (
        <div className="fixed inset-0 bg-black z-[120] pt-24 px-16 overflow-y-auto pb-20">
          <h2 className="text-white text-2xl font-bold mb-10 uppercase tracking-widest flex items-center gap-3"><span className="w-1.5 h-6 bg-[#FF8A00]" />Resultados: "{searchQuery}"</h2>
          <div className="grid grid-cols-6 gap-x-4 gap-y-10">
            {searchResults.map((m) => (
              <Link key={m.id} href={m.path}><div className="relative aspect-[2/3] rounded-md transition-all duration-500 hover:scale-110 hover:z-[110] cursor-pointer shadow-2xl group"><Image src={m.banner} alt={m.title} fill className="object-cover rounded-md" unoptimized /></div></Link>
            ))}
          </div>
        </div>
      )}

      <div className="relative w-full h-[88vh]">
        <img src="https://static.wixstatic.com/media/859174_15eead65a9a54011b14ad274056ecd56~mv2.jpg" className="w-full h-full object-cover" alt="Banner The Chosen" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/10 opacity-70" />
        <div className="absolute bottom-[-30px] left-16 flex gap-6 z-20 items-center">
          <button onClick={() => openEpisode(currentIdx)} className="bg-white text-black font-black py-4 px-12 rounded-sm text-lg hover:bg-[#FF8A00] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-2xl uppercase">
            {currentIdx === 0 ? "▶ Ver Ahora" : `▶ Continuar Ep. ${chosenEpisodes[currentIdx].id}`}
          </button>
          <button onClick={toggleMyList} className={`border py-4 px-10 rounded-sm transition-all uppercase font-bold ${inMyList ? 'bg-[#FF8A00] border-[#FF8A00] text-white' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}>
            {inMyList ? <><IoCheckmarkCircle className="inline mr-2" /> En Mi Lista</> : '+ Mi Lista'}
          </button>
          <button onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS', '_blank')} className="border py-4 px-10 rounded-sm bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all uppercase font-bold">❤ Donar</button>
        </div>
      </div>

      <div className="h-20 bg-black"></div>

      <div className="px-16 mb-32 relative z-10">
        <header className="flex items-center gap-4 mb-10 border-b border-white/10 pb-4">
          <div className="w-1.5 h-8 bg-[#FF8A00]"></div>
          <h2 className="text-2xl font-bold tracking-tight uppercase">Episodios Disponibles</h2>
        </header>

        <div className="grid grid-cols-4 gap-8">
          {chosenEpisodes.map((ep, index) => (
            <div key={index} className={`group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 bg-black border-2 ${currentIdx === index ? 'border-[#FF8A00] ring-4 ring-[#FF8A00]/20' : 'border-white/5 hover:border-white/20'}`} onClick={() => openEpisode(index)}>
              <div className="relative aspect-video overflow-hidden">
                <img src={ep.thumb} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" loading="lazy" alt={ep.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black opacity-80" />
                <div className="absolute bottom-2 left-2 bg-black/40 backdrop-blur-md px-3 py-1 rounded-md border border-white/10">
                    <span className="text-[11px] font-black uppercase text-white">Temporada <span className="text-[#FF8A00]">{ep.season}</span></span>
                </div>
              </div>
              <div className="p-5 flex flex-col gap-1">
                <h3 className="font-bold text-base truncate uppercase group-hover:text-[#FF8A00]">{ep.title}</h3>
                <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed h-8 text-justify">{ep.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 z-[1000] bg-[#050608] flex flex-col animate-fade-in text-left">
          <div className="h-[12vh] min-h-[85px] px-12 flex items-center justify-between bg-gradient-to-b from-[#0a0b0d] to-[#050608] border-b border-white/5">
            <div className="flex flex-col border-l-4 border-[#FF8A00] pl-6 py-1">
              <span className="text-[10px] font-black text-[#FF8A00]/80 uppercase tracking-[0.5em] mb-1">Serie: The Chosen</span>
              <h2 className="text-2xl font-black tracking-tighter uppercase leading-none">{chosenEpisodes[currentIdx].title}</h2>
            </div>
            <button onClick={closePlayer} className="group flex items-center gap-4 bg-white/[0.03] px-8 py-3.5 rounded-full border border-white/10 hover:bg-[#FF8A00] hover:scale-105 transition-all">
              <span className="text-[11px] font-black uppercase tracking-[0.2em] group-hover:text-black">Salir del video</span>
              <IoClose className="text-2xl group-hover:rotate-90 group-hover:text-black transition-all" />
            </button>
          </div>
          <div className="flex-grow bg-black relative">
            <iframe src={selectedVideo} className="absolute inset-0 w-full h-full border-none" allow="autoplay; fullscreen" allowFullScreen />
          </div>
          <div className="h-[13vh] min-h-[100px] px-16 bg-gradient-to-t from-[#0a0b0d] border-t border-white/5 flex items-center justify-between">
            <button disabled={currentIdx === 0} onClick={() => openEpisode(currentIdx - 1)} className="group flex items-center gap-5 disabled:opacity-5 transition-all">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] group-hover:bg-white group-hover:text-black transition-all shadow-xl shadow-black">
                <IoChevronBack className="text-2xl" />
              </div>
              <div className="flex flex-col items-start text-left">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FF8A00]/60">Anterior</span>
                <span className="text-sm font-bold uppercase text-white/80">Episodio {currentIdx}</span>
              </div>
            </button>
            <button onClick={closePlayer} className="flex items-center gap-4 bg-white/[0.03] px-10 py-4 rounded-2xl border border-white/5 hover:bg-white/[0.08] transition-all">
              <IoList size={28} className="text-[#FF8A00]" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-white/60">Capítulos</span>
            </button>
            <button disabled={currentIdx === chosenEpisodes.length - 1} onClick={() => openEpisode(currentIdx + 1)} className="group flex items-center gap-6 disabled:opacity-5 transition-all">
              <div className="flex flex-col items-end text-right">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FF8A00]">Siguiente</span>
                <span className="text-sm font-bold uppercase text-white/80">Episodio {currentIdx + 2}</span>
              </div>
              <div className="w-16 h-16 rounded-[22px] bg-[#FF8A00] flex items-center justify-center text-black shadow-2xl group-hover:scale-110 transition-all shadow-black">
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
        .unselectable { -webkit-user-select: none; user-select: none; }
        img { pointer-events: none !important; }
      `}</style>
    </div>
  );
};

export default TheChosenPC;
