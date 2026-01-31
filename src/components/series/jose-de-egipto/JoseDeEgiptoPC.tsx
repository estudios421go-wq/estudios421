import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoCloseOutline, IoChevronBack, IoChevronForward, IoList, IoClose, IoCheckmarkCircle } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { allSeries } from '../../../data/series';

const joseEpisodes = [
  { id: 1, title: "El nacimiento de José", dur: "00:42:50", desc: "La historia de José comienza con su nacimiento, un acontecimiento que provoca inquietud y expectativa en su familia. Su llegada marca un cambio profundo en el destino de sus padres y anticipa un futuro lleno de desafíos.", thumb: "https://static.wixstatic.com/media/859174_b44bad1703f7498ab87ffc2899850ed7~mv2.jpg", url: "https://ok.ru/videoembed/14201500797440" },
  { id: 2, title: "Espadas desaparecidas", dur: "00:41:20", desc: "La ciudad enfrenta dificultades tras descubrir la desaparición de armas del campamento. José se ve envuelto en tensiones crecientes mientras los conflictos internos comienzan a dividir a los hombres.", thumb: "https://static.wixstatic.com/media/859174_04e0e0290e5b4812a701e159ffdce225~mv2.jpg", url: "https://ok.ru/videoembed/14202233752064" },
  { id: 3, title: "Salvados por la tormenta", dur: "00:42:46", desc: "Hombres armados se acercan peligrosamente a la familia de José, pero una fuerte tormenta altera el curso de los acontecimientos. El peligro se disipa de manera inesperada, dejando una señal de protección divina.", thumb: "https://static.wixstatic.com/media/859174_fa024efd1a9242e6911adc037fc17058~mv2.jpg", url: "https://ok.ru/videoembed/14202488490496" },
  { id: 4, title: "Privilegios y celos", dur: "00:42:50", desc: "Jacob concede privilegios especiales a José, despertando celos entre sus hermanos. Las sospechas, los resentimientos y los sueños inquietantes de José comienzan a profundizar la división familiar.", thumb: "https://static.wixstatic.com/media/859174_d196ab94593b4992a2ec6fac714bb91e~mv2.jpg", url: "https://ok.ru/videoembed/14202491636224" },
  { id: 5, title: "Clemencia en el campo", dur: "00:42:08", desc: "En medio de un momento decisivo, la vida de José pende de un hilo. La intervención inesperada de Dina introduce la misericordia en una situación marcada por la traición y la violencia.", thumb: "https://static.wixstatic.com/media/859174_85bf93bcc19647e19992cd6ba83fc345~mv2.jpg", url: "https://ok.ru/videoembed/14202493209088" },
  { id: 6, title: "El pozo del sufrimiento", dur: "00:41:59", desc: "José es arrojado a un pozo por sus propios hermanos. Mientras enfrenta la oscuridad y el abandono, comprende que su sufrimiento apenas está comenzando.", thumb: "https://static.wixstatic.com/media/859174_f2232a43af444ac79066a4ebd9eabefc~mv2.jpg", url: "https://ok.ru/videoembed/14202495502848" },
  { id: 7, title: "Llegada a Egipto", dur: "00:43:36", desc: "José es llevado a Egipto como esclavo. El impacto de la gran ciudad, su cultura y su poder contrasta con la pérdida de su libertad y su pasado.", thumb: "https://static.wixstatic.com/media/859174_d7cce2bce30141f8b88197247ca7eae3~mv2.jpg", url: "https://ok.ru/videoembed/14202701548032" },
  { id: 8, title: "Huida inesperada", dur: "00:43:17", desc: "José huye desesperadamente y vive un encuentro inesperado que marcará su destino dentro de la tierra egipcia.", thumb: "https://static.wixstatic.com/media/859174_30fa53f8486c45f2ba234f081e926ecb~mv2.jpg", url: "https://ok.ru/videoembed/14202703710720" },
  { id: 9, title: "Confesiones ocultas", dur: "00:43:19", desc: "Las tensiones aumentan en la casa del faraón. Secretos salen a la luz, y una confesión inesperada amenaza con cambiar el destino de varias vidas.", thumb: "https://static.wixstatic.com/media/859174_d0cf09bdebe84778b1dc8c6594d77df7~mv2.jpg", url: "https://ok.ru/videoembed/14202705086976" },
  { id: 10, title: "Fidelidad puesta a prueba", dur: "00:42:42", desc: "José enfrenta una dura prueba de lealtad y fe. Al desafiar la autoridad y resistir la tentación, su integridad lo coloca en una situación peligrosa.", thumb: "https://static.wixstatic.com/media/859174_d4b83ba525714ddab298a831494f4dd1~mv2.jpg", url: "https://ok.ru/videoembed/14202726844928" },
  { id: 11, title: "Decisiones prohibidas", dur: "00:43:18", desc: "José se ve atrapado entre el deber, el deseo y las consecuencias de elegir el camino correcto.", thumb: "https://static.wixstatic.com/media/859174_56f0a2b0536f46eb96af799c073b4ae3~mv2.jpg", url: "https://ok.ru/videoembed/14540463606272" },
  { id: 12, title: "La verdad revelada", dur: "00:43:23", desc: "La aparente muerte de José provoca dolor y revelaciones. Mientras tanto, en Egipto, su esfuerzo y dedicación comienzan a darle reconocimiento.", thumb: "https://static.wixstatic.com/media/859174_4a4c48e7687c437d91f94f83438c726f~mv2.jpg", url: "https://ok.ru/videoembed/14540464916992" },
  { id: 13, title: "Planes de traición", dur: "00:43:21", desc: "Durante un día decisivo, antiguos planes de traición resurgen. Alianzas peligrosas y decisiones arriesgadas amenazan con destruir todo lo construido.", thumb: "https://static.wixstatic.com/media/859174_e49b213150b94ab987c2c960c2d3d89e~mv2.jpg", url: "https://ok.ru/videoembed/14540466620928" },
  { id: 14, title: "Sabiduría egipcia", dur: "00:41:21", desc: "José demuestra su inteligencia y capacidad al aprender los conocimientos de Egipto.", thumb: "https://static.wixstatic.com/media/859174_b740a577b4e241b1ab9352239a0bd135~mv2.jpg", url: "https://ok.ru/videoembed/14556467038720" },
  { id: 15, title: "Sin noticias del pasado", dur: "00:43:21", desc: "José enfrenta la tristeza de no tener noticias de su familia. El silencio del pasado se convierte en una carga constante.", thumb: "https://static.wixstatic.com/media/859174_8daae9eb494f435f8dc3a53b4a0eb9ee~mv2.jpg", url: "https://ok.ru/videoembed/14556484078080" },
  { id: 16, title: "Deseo y traición", dur: "00:42:11", desc: "Acusaciones falsas y decisiones impulsivas provocan una caída inesperada.", thumb: "https://static.wixstatic.com/media/859174_f4968b0eae3443ee95950fc5e79bc800~mv2.jpg", url: "https://ok.ru/videoembed/14556484536832" },
  { id: 17, title: "El significado de los sueños", dur: "00:42:34", desc: "José intenta convencer a otros de abandonar caminos equivocados mientras los sueños cobran un papel central.", thumb: "https://static.wixstatic.com/media/859174_e655497fab594a7dbb9dc56028484568~mv2.jpg", url: "https://ok.ru/videoembed/14556636449280" },
  { id: 18, title: "Caída en desgracia", dur: "00:42:09", desc: "José es llevado a prisión injustamente. El poder del faraón se impone.", thumb: "https://static.wixstatic.com/media/859174_8427e058b1df4ce594242b23cb33a0e9~mv2.jpg", url: "https://ok.ru/videoembed/14556636908032" },
  { id: 19, title: "El precio de la verdad", dur: "00:42:02", desc: "José demuestra su don para interpretar sueños. Sin embargo, decir la verdad tiene un costo elevado.", thumb: "https://static.wixstatic.com/media/859174_6c7fc3ce3dac41f0aa7703f486074ad1~mv2.jpg", url: "https://ok.ru/videoembed/14556762999296" },
  { id: 20, title: "De esclavo a gobernador", dur: "00:42:09", desc: "Su sabiduría lo eleva de prisionero a una posición de gran autoridad en Egipto.", thumb: "https://static.wixstatic.com/media/859174_74b0f8e6e0db46b69207a8a2f1046450~mv2.jpg", url: "https://ok.ru/videoembed/14556763654656" },
  { id: 21, title: "Revelaciones peligrosas", dur: "00:42:37", desc: "Revelaciones delicadas amenazan con desatar consecuencias imprevisibles.", thumb: "https://static.wixstatic.com/media/859174_2ce9f56b09984eeb92356e3dba4f472e~mv2.jpg", url: "https://ok.ru/videoembed/14556764310016" },
  { id: 22, title: "Dolor y confesiones", dur: "00:42:31", desc: "Confesiones largamente guardadas salen a la luz, marcando un antes y un después.", thumb: "https://static.wixstatic.com/media/859174_8ae4948f1b8f4332874878c7a4d90d6c~mv2.jpg", url: "https://ok.ru/videoembed/14556764703232" },
  { id: 23, title: "Juicio y pesadillas", dur: "00:41:42", desc: "Pesadillas atormentan al faraón. El destino de muchos depende de José.", thumb: "https://static.wixstatic.com/media/859174_65288823091c423ead0a40284889c330~mv2.jpg", url: "https://ok.ru/videoembed/14556765030912" },
  { id: 24, title: "El poder de los sueños", dur: "00:43:36", desc: "José demuestra que los sueños contienen advertencias divinas.", thumb: "https://static.wixstatic.com/media/859174_f4b598fae5914ee7a1bb1615b1889e4d~mv2.jpg", url: "https://ok.ru/videoembed/14540486609408" },
  { id: 25, title: "Ascenso amenazado", dur: "00:39:00", desc: "Mientras Egipto celebra, una amenaza silenciosa se gesta.", thumb: "https://static.wixstatic.com/media/859174_d4e8dbf5e22a40a2ad7eadf1361388c0~mv2.jpg", url: "https://ok.ru/videoembed/14540488313344" },
  { id: 26, title: "Objetivo del traidor", dur: "00:42:42", desc: "José se convierte en el blanco de un traidor decidido a eliminarlo.", thumb: "https://static.wixstatic.com/media/859174_018c912a00804ef9a9e7a7244f181428~mv2.jpg", url: "https://ok.ru/videoembed/14540489886208" },
  { id: 27, title: "Peligro en el palacio", dur: "00:42:25", desc: "Un incendio y una traición elevan la tensión.", thumb: "https://static.wixstatic.com/media/859174_770b78cf63b9488295dc20e0c0c4bd47~mv2.jpg", url: "https://ok.ru/videoembed/14540492507648" },
  { id: 28, title: "Hambre y castigo", dur: "00:42:37", desc: "La sequía se intensifica y el hambre se extiende.", thumb: "https://static.wixstatic.com/media/859174_d9cbbe9380894663bb2727450cda429f~mv2.jpg", url: "https://ok.ru/videoembed/14540494080512" },
  { id: 29, title: "En Egipto", dur: "00:42:29", desc: "La familia de José viaja a Egipto en busca de alimento.", thumb: "https://static.wixstatic.com/media/859174_21d59b65bd4a477b8e0afe08575a37f9~mv2.jpg", url: "https://ok.ru/videoembed/14556779842048" },
  { id: 30, title: "Reencuentro inesperado", dur: "00:42:29", desc: "Los hermanos de José llegan a Egipto y se produce un reencuentro cargado de emociones.", thumb: "https://static.wixstatic.com/media/859174_c7baf40be24d4bb2bf254f921f5c1f8d~mv2.jpg", url: "https://ok.ru/videoembed/14540497029632" },
  { id: 31, title: "El dilema de José", dur: "00:42:30", desc: "José busca en Dios la guía necesaria para decidir el destino de sus hermanos.", thumb: "https://static.wixstatic.com/media/859174_f850e4ca54b741b3ab0aa845734af9f3~mv2.jpg", url: "https://ok.ru/videoembed/14540498471424" },
  { id: 32, title: "Padre tu hijo esta vivo", dur: "00:41:46", desc: "La verdad finalmente es revelada. Jacob descubre que José sigue con vida.", thumb: "https://static.wixstatic.com/media/859174_8acdce69414d43d7af92b43fbeaedd17~mv2.jpg", url: "https://ok.ru/videoembed/14540500240896" },
  { id: 33, title: "Amor y despedida", dur: "00:38:56", desc: "José cierra un ciclo marcado por el sufrimiento y la redención.", thumb: "https://static.wixstatic.com/media/859174_aabf06782221457f8f48f03c18e4403e~mv2.jpg", url: "https://ok.ru/videoembed/14540502272512" }
];

const JoseDeEgiptoPC = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [inMyList, setInMyList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const episodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  // SERIES_ID según data/series.ts para José de Egipto
  const SERIES_ID = 4; 

  useEffect(() => {
    // --- BLINDAJE TOTAL ACTIVADO ---
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

    const savedEp = localStorage.getItem('jose_last_ep');
    if (savedEp) {
      const idx = parseInt(savedEp);
      if (idx < joseEpisodes.length) setCurrentIdx(idx);
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

  // BUSCADOR COMPLETO Y PROFESIONAL
  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      const normalize = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      const term = normalize(searchQuery);
      const themeMap: { [key: string]: string[] } = {
        moises: ['moises', 'diez mandamientos', 'testamento', 'egipto', 'exodo', 'tierra prometida', 'sanson', 'david'],
        egipto: ['jose', 'moises', 'diez mandamientos', 'egipto'],
        jesus: ['jesus', 'milagros', 'pasion', 'nazaret', 'hijo de dios', 'vida publica', 'magdalena', 'pablo', 'apocalipsis'],
        reyes: ['reyes', 'david', 'saul', 'salomon', 'jerusalen', 'division', 'jezabel', 'el rico', 'ester', 'persia'],
        ester: ['ester', 'reina de persia', 'persia', 'nehemias', 'artajerjes'],
        pablo: ['pablo', 'apostol', 'cristo', 'saulo'],
        biblia: ['biblia', 'continua', 'testamento', 'milagros']
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
    setSelectedVideo(joseEpisodes[idx].url);
    localStorage.setItem('jose_last_ep', idx.toString());
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
      <Head><title>José de Egipto — Estudios 421</title></Head>

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
            {[{ n: '', img: '367960b11c1c44ba89cd1582fd1b5776' }, { n: 'en', img: '35112d9ffe234d6f9dcef16cf8f7544e' }, { n: 'pt', img: '830f1c20656e4d44a819bedfc13a22cc' }].map((l) => (
              <Link key={l.n} href={l.n === '' ? '/serie/jose-de-egipto' : `/${l.n}/serie/jose-de-egipto`}><img src={`https://static.wixstatic.com/media/859174_${l.img}~mv2.png`} className="w-7 h-7 object-contain cursor-pointer hover:scale-110 transition-transform" /></Link>
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
        <img src="https://static.wixstatic.com/media/859174_a13b7e8011764b4f815ab2438e7e0853~mv2.jpg" className="w-full h-full object-cover" alt="Banner José" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/10 opacity-70" />
        <div className="absolute bottom-[-30px] left-16 flex gap-6 z-20 items-center">
          <button onClick={() => openEpisode(currentIdx)} className="bg-white text-black font-black py-4 px-12 rounded-sm text-lg hover:bg-[#FF8A00] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-2xl uppercase">
            {currentIdx === 0 ? "▶ Ver Ahora" : `▶ Continuar Ep. ${joseEpisodes[currentIdx].id}`}
          </button>
          <button onClick={toggleMyList} className={`border py-4 px-10 rounded-sm transition-all uppercase font-bold ${inMyList ? 'bg-[#FF8A00] border-[#FF8A00] text-white' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}>
            {inMyList ? <><IoCheckmarkCircle className="inline mr-2" /> En Mi Lista</> : '+ Mi Lista'}
          </button>
          <button onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS', '_blank')} className="border py-4 px-10 rounded-sm bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all uppercase font-bold">❤ Donar</button>
        </div>
      </div>

      <div className="h-20 bg-black"></div>

      <div className="px-16 mb-32 relative z-10 text-left">
        <header className="flex items-center gap-4 mb-10 border-b border-white/10 pb-4">
          <div className="w-1.5 h-8 bg-[#FF8A00]"></div>
          <h2 className="text-2xl font-bold tracking-tight uppercase">Episodios Disponibles</h2>
        </header>

        <div className="grid grid-cols-4 gap-8">
          {joseEpisodes.map((ep, index) => (
            <div key={ep.id} ref={(el) => { episodeRefs.current[index] = el; }} className={`group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 bg-[#2C2F33] border-2 ${currentIdx === index ? 'border-[#FF8A00] ring-4 ring-[#FF8A00]/20' : 'border-transparent hover:border-white/20 hover:shadow-2xl'}`} onClick={() => openEpisode(index)}>
              <div className="relative aspect-video overflow-hidden">
                <img src={ep.thumb} className="w-full h-full object-cover group-hover:scale-110 transition duration-700 pointer-events-none" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C2F33] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-2 left-2 flex items-center">
                  <div className="bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1 rounded-md shadow-lg">
                    <span className="text-[11px] font-black uppercase text-white">Episodio <span className="text-[#FF8A00]">{ep.id}</span></span>
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 shadow-lg">
                  <span className="text-[10px] font-bold text-white tracking-widest">{ep.dur}</span>
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

      {selectedVideo && (
        <div className="fixed inset-0 z-[1000] bg-[#050608] flex flex-col animate-fade-in overflow-hidden">
          <div className="h-[12vh] min-h-[85px] px-12 flex items-center justify-between bg-gradient-to-b from-[#0a0b0d] to-[#050608] border-b border-white/5 relative shadow-2xl">
            <div className="flex items-center gap-8">
              <div className="flex flex-col border-l-4 border-[#FF8A00] pl-6 py-1 text-left">
                <span className="text-[10px] font-black text-[#FF8A00]/80 uppercase tracking-[0.5em] mb-1">Serie: José de Egipto</span>
                <h2 className="text-2xl font-black tracking-tighter uppercase">Capítulo {joseEpisodes[currentIdx].id} <span className="text-white/10 mx-3">/</span> {joseEpisodes[currentIdx].title}</h2>
              </div>
            </div>
            <button onClick={closePlayer} className="group flex items-center gap-4 bg-white/[0.03] px-8 py-3.5 rounded-full border border-white/10 hover:bg-[#FF8A00] hover:scale-105 transition-all">
              <span className="text-[11px] font-black uppercase tracking-[0.2em] group-hover:text-black">Salir del video</span>
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
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FF8A00]/60">Anterior</span>
                <span className="text-sm font-bold uppercase text-white/80">Episodio {currentIdx}</span>
              </div>
            </button>
            <button onClick={closePlayer} className="flex items-center gap-4 bg-white/[0.03] px-10 py-4 rounded-2xl border border-white/5 hover:bg-white/[0.08] transition-all group scale-95 hover:scale-100">
              <IoList className="text-2xl text-[#FF8A00]" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-white/60">Capítulos</span>
            </button>
            <button disabled={currentIdx === joseEpisodes.length - 1} onClick={() => openEpisode(currentIdx + 1)} className="group flex items-center gap-6 disabled:opacity-5 transition-all">
              <div className="flex flex-col items-end text-right">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FF8A00]">Siguiente</span>
                <span className="text-sm font-bold uppercase text-white/80">Episodio {currentIdx + 2}</span>
              </div>
              <div className="w-16 h-16 rounded-[22px] bg-[#FF8A00] flex items-center justify-center text-black shadow-2xl group-hover:scale-110 transition-all">
                <IoChevronForward className="text-4xl" />
              </div>
            </button>
          </div>
        </div>
      )}

      {/* --- FOOTER BLINDADO Y ENLAZADO --- */}
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
        .unselectable { -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }
        img { pointer-events: none !important; }
      `}</style>
    </div>
  );
};

export default JoseDeEgiptoPC;
