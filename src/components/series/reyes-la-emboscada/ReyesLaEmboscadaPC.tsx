import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoChevronBack, IoChevronForward, IoList, IoClose, IoCheckmarkCircle } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { allSeries } from '../../../data/series';

// --- CONFIGURACIÓN DE EPISODIOS REYES: LA EMBOSCADA (ID: 31) ---
const reyesEmboscadaEpisodes = [
  { id: 1, title: "EP. 01 | Disfruta la guerra", dur: "00:56:00", desc: "Revelando lo que el futuro depara, Jesús carga, además de la culpa, con un cuerpo sin vida. Amenazado por Meetabel, Omri es atormentado por el recuerdo de un acto impulsivo que está a punto de ser revelado.", thumb: "https://static.wixstatic.com/media/859174_6e0d5c47c9f948d39d19b95f12527b56~mv2.jpg", url: "https://ok.ru/videoembed/16991211555328", available: true },
  { id: 2, title: "EP. 02 | Fue intencional", dur: "00:47:00", desc: "Indignado por la ruptura del acuerdo, Zinri hace una revelación a Jesús sobre uno de los hermanos. Sin rumbo y afligido, un encuentro inesperado lleva a Omri a un seductor conflicto.", thumb: "https://static.wixstatic.com/media/859174_f82875db82e1495bb405e518a86b049a~mv2.jpg", url: "https://ok.ru/videoembed/16991212603904", available: true },
  { id: 3, title: "EP. 03 | Prefiero pensar", dur: "00:39:00", desc: "Mientras espera la decisión de Azel, Elías es franco en su conversación con Omri. Acorralados por una trampa astuta, Abías y sus hermanos se desesperan ante una inminente aniquilación.", thumb: "https://static.wixstatic.com/media/859174_c011aff0d1434a5bb67309584260397f~mv2.jpg", url: "https://ok.ru/videoembed/16991213521408", available: true },
  { id: 4, title: "EP. 04 | Pobrecita, la niña huérfana", dur: "00:42:00", desc: "Sin misericordia, Maaca expulsa a los levitas de Jerusalén. En el campo de batalla, el reino del sur y el reino del norte se enfrentan por primera vez.", thumb: "https://static.wixstatic.com/media/859174_dd9d0783ff8d4a7cb1de48c915b65a55~mv2.jpg", url: "https://ok.ru/videoembed/16991213980160", available: true },
  { id: 5, title: "EP. 05 | Somos hermanos", dur: "00:44:00", desc: "Como recompensa por su acción, Jeroboam hace una oferta irrecusable a Omri. Un asesinato en el palacio amenaza la paz entre Abías y sus hermanos.", thumb: "https://static.wixstatic.com/media/859174_251f9073cb0942b6a6f02eb5c64425aa~mv2.jpg", url: "https://ok.ru/videoembed/16991257954816", available: true },
  { id: 6, title: "EP. 06 | ¿Y luchar por qué?", dur: "00:51:00", desc: "Semaías confronta al rey sobre la expulsión de los levitas, y Maaca lo obliga a elegir entre ellos o ella. Zinri llega al campamento de los beduinos, pero teme la revelación de una mujer misteriosa.", thumb: "https://static.wixstatic.com/media/859174_4b1813b07b434f3a8c1962218d02389c~mv2.jpg", url: "https://t.me/mis_videos_421/5?embed=1", available: true },
  { id: 7, title: "EP. 07 | ¿Cuáles son las reglas?", dur: "00:49:00", desc: "Más allá de los límites de Israel, Tibni y Omri se aventuran en un caluroso y prometedor enfrentamiento. Impulsado por sentimientos ambiguos, Abías toma una decisión sobre los hermanos.", thumb: "https://static.wixstatic.com/media/859174_d4c95152daaa46a3a2d7c22ac3896d9e~mv2.jpg", url: "https://ok.ru/videoembed/16991211525328", available: true },
  { id: 8, title: "EP. 08 Gran error", dur: "00:49:00", desc: "Mostrando su verdadero rostro, Abías hace una gran revelación a los hermanos.", thumb: "https://static.wixstatic.com/media/859174_24bb3c23d23549f99729a153533d49ed~mv2.jpg", url: "https://ok.ru/videoembed/16991211535328", available: true },
  { id: 9, title: "EP. 09 | Acepta el cumplido", dur: "00:51:00", desc: "En un ambiente festivo, se celebra el matrimonio de Omri y Silóe, aunque no por todos. Con un castigo público, Maaca envía a Jeconías al cepo.", thumb: "https://static.wixstatic.com/media/859174_4453e15055ce431a8acda8a46c8e0c57~mv2.jpg", url: "https://ok.ru/videoembed/16991211545328", available: true },
  { id: 10, title: "EP. 10 | Ni siquiera lo disimula", dur: "01:02:00", desc: "Con planes de llevar a Asa de vuelta a Jerusalén, Abías se sorprende con la visita de Mijael. Sin rodeos, Silóe confronta a Efá sobre Omri.", thumb: "https://static.wixstatic.com/media/859174_f18929c887e340bca2c9118f33ba911c~mv2.jpg", url: "https://ok.ru/videoembed/16991211565328", available: true },
  { id: 11, title: "EP. 11 | No parece", dur: "00:50:00", desc: "Con máscaras, danza y segundas intenciones, Maacá organiza una fiesta con el reino del norte y las naciones vecinas en Jerusalén. Conmovido, Jeroboam recibe una amenaza anónima.", thumb: "https://static.wixstatic.com/media/859174_a78e9f2ea1bb445db3bd21fbd3fa49d6~mv2.jpg", url: "https://ok.ru/videoembed/16991211575328", available: true },
  { id: 12, title: "EP. 12 | Entonces es verdad...", dur: "00:44:00", desc: "Causando revuelo entre los habitantes de Jerusalén, Semaías confronta a Abías y Maacá. Afectado por la cercanía de Efá, Omri hace una confesión.", thumb: "https://static.wixstatic.com/media/859174_f08f660cc00c4c208347066e399e219a~mv2.jpg", url: "https://ok.ru/videoembed/16991211585328", available: true },
  { id: 13, title: "EP. 13 | Sé bien cómo es", dur: "00:52:00", desc: "Trastornado por la fuga de Jeús, Abías ordena una sentencia cruel. Confundido por la culpa, Omri conversa con Ula, hasta que son interrumpidos por una amenaza.", thumb: "https://static.wixstatic.com/media/859174_507402a4d37f473480669fc3d291d750~mv2.jpg", url: "https://ok.ru/videoembed/16991211595328", available: true },
  { id: 14, title: "EP. 14 | Ayúdame", dur: "00:43:00", desc: "En una reunión con Jeroboán, Omri y Nadab se sorprenden con la revelación de un espía. Causando tensión en Jerusalén, se inicia una caza de los sacerdotes.", thumb: "https://static.wixstatic.com/media/859174_daf5a9ffa5574146a3b5d210cf1f7ed9~mv2.jpg", url: "https://ok.ru/videoembed/16991211551328", available: true },
  { id: 15, title: "EP. 15 | No debía ser así", dur: "00:37:00", desc: "Decididos a traer de vuelta a Asa, Maaca y Abías parten hacia el campamento. Coaccionado por Zinri, Efá da la confirmación que él necesitaba.", thumb: "https://static.wixstatic.com/media/859174_df84be8d5cb542dfa94900889b8dcf8e~mv2.jpg", url: "https://ok.ru/videoembed/16991211552328", available: true },
  { id: 16, title: "EP. 16 | ¿Quién eres tú?", dur: "00:46:00", desc: "Confrontada por Jeroboán, Naara hace una gran revelación sobre Silóe. En un intenso enfrentamiento con Abías, Jeús se ve obligado a una reacción drástica.", thumb: "https://static.wixstatic.com/media/859174_552ecd4c2ab34ddba76d68add523bdc2~mv2.jpg", url: "https://ok.ru/videoembed/16991211553328", available: true },
  { id: 17, title: "EP. 17 | Bésame", dur: "00:43:00", desc: "De vuelta en Jerusalén, Maaca se sorprenden con la llegada de un invitado especial de Sabá. En busca de los fugitivos, Nadab inicia una cacería sin misericordia.", thumb: "https://static.wixstatic.com/media/859174_2bfa035dd54d45e3b00d780e07fac2ed~mv2.jpg", url: "https://ok.ru/videoembed/16991211555428", available: true },
  { id: 18, title: "EP. 18 | Tu luz", dur: "00:51:00", desc: "Conmovida por el nacimiento de la hija de Omri, Efá hace un anuncio importante. Mijaíl visita al nuevo rey de Judá.", thumb: "https://static.wixstatic.com/media/859174_4b3918cb0b344a1bad44d18eaddb828b~mv2.jpg", url: "https://ok.ru/videoembed/16991211553328", available: true },
  { id: 19, title: "EP. 19 | Solo tú", dur: "00:55:00", desc: "Con el resurgimiento de un antiguo habitante del reino del norte, se cumple una profecía en la casa de Jeroboam. Decidida a encontrar una esposa para el rey, Maaca presenta a sus candidatas.", thumb: "https://static.wixstatic.com/media/859174_6c35d20aec0b41378ded779b53bd972e~mv2.jpg", url: "https://ok.ru/videoembed/16991211556328", available: true },
  { id: 20, title: "EP. 20 | No es una mala idea", dur: "00:43:00", desc: "Distraer la atención de su madre le da a Asa la oportunidad de acercarse a Azuba. Sorprendido por la amante secreta de Omri, Tibni siente curiosidad por la identidad de la mujer.", thumb: "https://static.wixstatic.com/media/859174_b9f4d47b4d5b4a9a9dda22f56424407b~mv2.jpg", url: "https://ok.ru/videoembed/16991211557328", available: true },
  { id: 21, title: "EP. 21 | ¡Me traicionaste!", dur: "00:46:00", desc: "Celoso, Omri confronta a Silóe sobre su cercanía con Zinri. Al entender todo mal, Azuba pone en riesgo el plan de Asa.", thumb: "https://static.wixstatic.com/media/859174_66e3e7970c254620aeca8e0a564961d5~mv2.jpg", url: "https://ok.ru/videoembed/16991211558328", available: true },
  { id: 22, title: "EP. 22 | Yo te quería", dur: "00:59:00", desc: "Debilitado por su estado de salud, Asa manda llamar a Azuba a sus aposentos. Mientras cuidaba la ropa de Omri, Silóe encuentra un pequeño papiro que contiene una gran declaración.", thumb: "https://static.wixstatic.com/media/859174_b1f9984d20e74fe6b636e2f1faf42870~mv2.jpg", url: "https://ok.ru/videoembed/16991211559328", available: true },
  { id: 23, title: "EP. 23 | Es solo un niño", dur: "00:57:00", desc: "Viendo el consejo de Ula como la única opción que le queda, Omri toma una decisión devastadora. Ahora, sabiendo toda la verdad, Asa se enfrenta a una elección definitiva.", thumb: "https://static.wixstatic.com/media/859174_f19fa43997234e299b97e5c55597f139~mv2.jpg", url: "https://ok.ru/videoembed/16991211551028", available: true },
];

const ReyesEmboscadaPC = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [inMyList, setInMyList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const SERIES_ID = 31;

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

    const savedEp = localStorage.getItem('reyes_emboscada_last_ep');
    if (savedEp) {
      const idx = parseInt(savedEp);
      if (idx < reyesEmboscadaEpisodes.length) setCurrentIdx(idx);
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
        reyes: ['reyes', 'david', 'saul', 'salomon', 'emboscada', 'omri', 'asa', 'abias'],
        jesus: ['jesus', 'milagros', 'pasion']
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
    setSelectedVideo(reyesEmboscadaEpisodes[idx].url || null);
    localStorage.setItem('reyes_emboscada_last_ep', idx.toString());
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
      <Head><title>Reyes: La Emboscada — Estudios 421</title></Head>

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
            <Link href="/serie/reyes-la-emboscada"><img src="https://static.wixstatic.com/media/859174_367960b11c1c44ba89cd1582fd1b5776~mv2.png" className="w-7 h-7 object-contain cursor-pointer hover:scale-110 transition-transform" /></Link>
            <Link href="/en/serie/kings-the-ambush"><img src="https://static.wixstatic.com/media/859174_35112d9ffe234d6f9dcef16cf8f7544e~mv2.png" className="w-7 h-7 object-contain cursor-pointer hover:scale-110 transition-transform" /></Link>
            <Link href="/pt/serie/reis-a-emboscada"><img src="https://static.wixstatic.com/media/859174_830f1c20656e4d44a819bedfc13a22cc~mv2.png" className="w-7 h-7 object-contain cursor-pointer hover:scale-110 transition-transform" /></Link>
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
        <img src="https://static.wixstatic.com/media/859174_8cf0f9b25c744e5aba0410d6687b1821~mv2.jpg" className="w-full h-full object-cover" alt="Banner Reyes: La Emboscada" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/10 opacity-70" />
        <div className="absolute bottom-[-30px] left-16 flex gap-6 z-20 items-center">
          <button onClick={() => openEpisode(currentIdx)} className="bg-white text-black font-black py-4 px-12 rounded-sm text-lg hover:bg-[#FF8A00] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-2xl uppercase">
            {currentIdx === 0 ? "▶ Ver Ahora" : `▶ Continuar Ep. ${currentIdx + 1}`}
          </button>
          <button onClick={toggleMyList} className={`border py-4 px-10 rounded-sm transition-all uppercase font-bold ${inMyList ? 'bg-[#FF8A00] border-[#FF8A00] text-white' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}>
            {inMyList ? <><IoCheckmarkCircle className="inline mr-2" /> En Mi Lista</> : '+ Mi Lista'}
          </button>
          <button onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS', '_blank')} className="border py-4 px-10 rounded-sm bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all uppercase font-bold">❤ Donar</button>
        </div>
      </div>

      <div className="h-20 bg-black"></div>

      <div className="px-16 mb-20 relative z-10 text-left">
        <header className="flex items-center gap-4 mb-10 border-b border-white/10 pb-4">
          <div className="w-1.5 h-8 bg-[#FF8A00]"></div>
          <h2 className="text-2xl font-bold tracking-tight uppercase">Episodios Disponibles</h2>
        </header>

        <div className="grid grid-cols-4 gap-8 text-left">
          {reyesEmboscadaEpisodes.map((ep, index) => (
            <div key={ep.id} className={`group rounded-xl overflow-hidden transition-all duration-300 bg-[#2C2F33] border-2 ${currentIdx === index ? 'border-[#FF8A00] ring-4 ring-[#FF8A00]/20 cursor-pointer' : 'border-transparent hover:border-white/20 cursor-pointer'}`} 
                 onClick={() => openEpisode(index)}>
              <div className="relative aspect-video overflow-hidden">
                <img src={ep.thumb} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C2F33] opacity-60" />
                <div className="absolute bottom-2 left-2 bg-black/40 backdrop-blur-md px-3 py-1 rounded-md border border-white/10 text-left">
                    <span className="text-[11px] font-black uppercase text-white">Episodio <span className="text-[#FF8A00]">{ep.id}</span></span>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                  <span className="text-[10px] font-bold text-white">{ep.dur}</span>
                </div>
              </div>
              <div className="p-5 flex flex-col gap-1 text-left">
                <h3 className="font-bold text-base truncate uppercase group-hover:text-[#FF8A00]">{ep.title}</h3>
                <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed h-8 text-justify">
                  {ep.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-16 mb-32 flex justify-center">
          <Link href="/serie/reyes-la-esperanza">
            <button className="group relative bg-[#FF8A00] text-black font-black py-6 px-20 rounded-xl text-xl uppercase tracking-tighter hover:scale-110 transition-all shadow-[0_0_50px_rgba(255,138,0,0.4)] overflow-hidden">
                <span className="relative z-10">Ver Siguiente Temporada</span>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
            </button>
          </Link>
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 z-[1000] bg-[#050608] flex flex-col animate-fade-in text-left">
          <div className="h-[12vh] min-h-[85px] px-12 flex items-center justify-between bg-gradient-to-b from-[#0a0b0d] to-[#050608] border-b border-white/5">
            <div className="flex flex-col border-l-4 border-[#FF8A00] pl-6 py-1 text-left">
              <span className="text-[10px] font-black text-[#FF8A00]/80 uppercase tracking-[0.5em] mb-1">Reyes: La Emboscada</span>
              <h2 className="text-2xl font-black tracking-tighter uppercase leading-none">{reyesEmboscadaEpisodes[currentIdx].title}</h2>
            </div>
            <button onClick={closePlayer} className="group flex items-center gap-4 bg-white/[0.03] px-8 py-3.5 rounded-full border border-white/10 hover:bg-[#FF8A00] hover:scale-105 transition-all">
              <span className="text-[11px] font-black uppercase tracking-[0.2em] group-hover:text-black">Cerrar</span>
              <IoClose size={24} className="group-hover:rotate-90 group-hover:text-black transition-all" />
            </button>
          </div>
          <div className="flex-grow bg-black relative">
            <iframe src={selectedVideo + "?autoplay=1"} className="absolute inset-0 w-full h-full border-none" allow="autoplay; fullscreen" allowFullScreen />
          </div>
          <div className="h-[13vh] min-h-[100px] px-16 bg-gradient-to-t from-[#0a0b0d] border-t border-white/5 flex items-center justify-between">
            <button disabled={currentIdx === 0} onClick={() => openEpisode(currentIdx - 1)} className="group flex items-center gap-5 disabled:opacity-5 transition-all">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] group-hover:bg-white group-hover:text-black transition-all shadow-xl">
                <IoChevronBack size={24} />
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
            <button disabled={currentIdx === reyesEmboscadaEpisodes.length - 1} onClick={() => openEpisode(currentIdx + 1)} className="group flex items-center gap-6 disabled:opacity-5 transition-all">
              <div className="flex flex-col items-end text-right">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FF8A00]">Siguiente</span>
                <span className="text-sm font-bold uppercase text-white/80">Episodio {currentIdx + 2}</span>
              </div>
              <div className="w-16 h-16 rounded-[22px] bg-[#FF8A00] flex items-center justify-center text-black shadow-2xl group-hover:scale-110 transition-all">
                <IoChevronForward size={32} />
              </div>
            </button>
          </div>
        </div>
      )}

      <footer className="bg-[#0a0a0a] text-gray-400 py-12 px-8 md:px-16 border-t border-white/5 text-left">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-start md:justify-end gap-6 mb-10 text-left">
            <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xl"><FaFacebookF /></a>
            <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xl"><FaInstagram /></a>
            <a href="https://www.tiktok.com/@estudios421_com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xl"><FaTiktok /></a>
            <a href="https://youtube.com/@estudios421max" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xl"><FaYoutube /></a>
            <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xl"><FaXTwitter /></a>
          </div>
          <div className="mb-10 space-y-4 text-left">
            <p className="text-xs leading-relaxed max-w-4xl">© {new Date().getFullYear()} Estudios 421. Todos los derechos reservados sobre el diseño y edición de la plataforma.</p>
            <p className="text-[10px] md:text-xs leading-relaxed text-gray-500 max-w-5xl text-justify">Aviso Legal: El contenido audiovisual compartido en este sitio pertenece a sus respectivos propietarios y productoras (Record TV, Seriella Productions, Casablanca Productions, Amazon Content Services LLC, entre otros). Estudios 421 es una plataforma sin fines de lucro destinada a la difusión de contenido bíblico para la comunidad. No reclamamos propiedad sobre las series o películas mostradas.</p>
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
        .animate-fade-in { animation: fadeIn 0.5s ease-in forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
};

export default ReyesEmboscadaPC;
