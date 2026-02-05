import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoCloseOutline, IoChevronBack, IoChevronForward, IoList, IoClose, IoCheckmarkCircle } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { allSeries } from '../../../data/series';

// --- CONFIGURACIÓN DE EPISODIOS (ID: 13) ---
const persiaEpisodes = [
  { id: 1, title: "¿Cómo te llamas?", dur: "00:50:57", desc: "Para celebrar los primeros tres años del reinado del emperador Jerjes, una fiesta lujosa y extravagante revelará la verdadera realidad del palacio. En un hogar acogedor de Susa, una joven judía se alegra por un ...", thumb: "https://static.wixstatic.com/media/859174_bb24b7b013194cd48103df1e39666a8c~mv2.jpg", url: "https://ok.ru/videoembed/14939719141888" },
  { id: 2, title: "Está hecho", dur: "00:44:33", desc: "Al ver desvanecerse sus esperanzas sobre el futuro, Hadassah sufre una despedida forzada. Colocado en una situación humillante ante todos sus invitados, Jerjes se ve obligado a tomar una decisión definitiva.", thumb: "https://static.wixstatic.com/media/859174_b27c907cb6f44475a260677acfc56e95~mv2.jpg", url: "https://ok.ru/videoembed/14940330920448" },
  { id: 3, title: "La necesito", dur: "00:45:08", desc: "En el enfrentamiento entre los persas y los trescientos de Leónidas, una traición cambiará el rumbo de la guerra y otra cambiará la vida de algunos que se quedaron en Susa. Con el regreso del ejército a la capital, Ester y Yon...", thumb: "https://static.wixstatic.com/media/859174_d4a8295575144c0092eae77cd6776a7d~mv2.jpg", url: "https://ok.ru/videoembed/14940545223168" },
  { id: 4, title: "¿Y ahora?", dur: "00:49:55", desc: "Como recompensa por lo ocurrido en Grecia, Jerjes asciende a Amán. La llegada del primer grupo de candidatas agita el harén, entre ellas, Ester.", thumb: "https://static.wixstatic.com/media/859174_6bba3949853a4228a8ce7c7f2243ea43~mv2.jpg", url: "https://ok.ru/videoembed/14940738750976" },
  { id: 5, title: "¿Lo entendieron ahora?", dur: "00:48:27", desc: "Tras un enfrentamiento tenso, Ester intenta encontrarse con Mardoqueo, y una salida secreta podría arruinarlo todo. Curioso, Jerjes observa a las mujeres de su harén, y una candidata capta su atención.", thumb: "https://static.wixstatic.com/media/859174_060f835264d24e48987d7c0d1578a12c~mv2.jpg", url: "https://ok.ru/videoembed/14941476817408" },
  { id: 6, title: "Una de dos cosas", dur: "00:44:18", desc: "Sin aceptar las objeciones de las demás candidatas, Hegai mantiene su decisión de que Ester sea la primera en presentarse ante el emperador. Frente a la comitiva de Amestris, Jerjes se siente tentado a incumplir su propio ...", thumb: "https://static.wixstatic.com/media/859174_382cc0ab57fd4adcb3b3fe0e70c4021d~mv2.jpg", url: "https://ok.ru/videoembed/14941478324736" },
  { id: 7, title: "¿Has soñado alguna vez con el rey?", dur: "00:43:46", desc: "Mostrando sus habilidades ante el rey, las candidatas harán una presentación para que Jerjes elija personalmente a la próxima que irá a sus aposentos. Con prisa, Ester se ve sorprendida por una orden de Hegai.", thumb: "https://static.wixstatic.com/media/859174_e5c96fd4320440199aceeb2fe1203abc~mv2.jpg", url: "https://ok.ru/videoembed/14941479766528" },
  { id: 8, title: "Si lo conocieran de verdad", dur: "00:43:56", desc: "Encantado con Ester, Jerjes revela que ya la había conocido antes. En el trabajo, Mardoqueo sufre insultos y discriminación por ser judío.", thumb: "https://static.wixstatic.com/media/859174_9c57747bdefb410fa1a0197d59856ba7~mv2.jpg", url: "https://ok.ru/videoembed/14943377689088" },
  { id: 9, title: "¡He aquí la nueva reina!", dur: "00:40:27", desc: "En celebración de la coronación de Ester como la nueva reina de Persia ante todo Susa, Jerjes le declara su amor y el intercambio cariñoso entre ellos es admirado por todo el pueblo. Pero en medio de la fiesta, un ataque ...", thumb: "https://static.wixstatic.com/media/859174_ff7bc1f3ca734479b9e78fc6e4550149~mv2.jpg", url: "https://ok.ru/videoembed/14943378737664" },
  { id: 10, title: "Nadie tiene que saberlo", dur: "00:48:56", desc: "Sin poder dormir, Ester recibe la visita del rey en sus aposentos y un regalo atento como prueba de su amor. Por ser judíos, Mardoqueo y Yona son atacados por los hijos de Amán.", thumb: "https://static.wixstatic.com/media/859174_d8471ef5b07b4a01bdb31df5531168ec~mv2.jpg", url: "https://ok.ru/videoembed/14943382473216" },
  { id: 11, title: "No seas curiosa", dur: "00:44:40", desc: "Aún de viaje en Babilonia, Jerjes cae en otra trampa de Amestris. Aprovechando su libertad de movimiento, Ester se encuentra con Mardoqueo, quien la alerta sobre algunas de las personas que los rodean.", thumb: "https://static.wixstatic.com/media/859174_86d7dbfe40cc498cbf439a7130b1930f~mv2.jpg", url: "https://ok.ru/videoembed/14971640416768" },
  { id: 12, title: "Un caso de vida o muerte", dur: "00:47:41", desc: "Después de ser golpeado por Bigtán y Teres, Nehemías pide a Mardoqueo que advierta a Ester sobre el plan de los eunucos contra la vida del rey. En conflicto, Ester confronta a Jerjes sobre Elarré.", thumb: "https://static.wixstatic.com/media/859174_cc0e5052aa8b407ca3bf4bdd8afffb3c~mv2.jpg", url: "https://ok.ru/videoembed/14971641530880" },
  { id: 13, title: "¿Por qué eres así?", dur: "00:36:55", desc: "Desconfiado de la cercanía entre Ester y Mardoqueo, Jerjes la confronta y comienza un conflicto entre ellos. Amestris se rebela contra Artabano y una revelación a su hijo será su nuevo truco.", thumb: "https://static.wixstatic.com/media/859174_00cef21a70a246dba0ba13d77de578c7~mv2.jpg", url: "https://ok.ru/videoembed/14971643103744" },
  { id: 14, title: "Eres diferente", dur: "00:43:22", desc: "Después de una conversación conmovedora entre Jerjes y Ester, el rey concede su petición. Al llegar a Jerusalén con su familia, Mardoqueo se sorprende por la situación de la amada ciudad.", thumb: "https://static.wixstatic.com/media/859174_ab6a038a5e2040f68e49f8cae427366e~mv2.jpg", url: "https://ok.ru/videoembed/14971647035904" },
  { id: 15, title: "Estamos a mano", dur: "00:46:37", desc: "En Grecia, las provocaciones de Pericles contra Jerjes aumentan la tensión, dejando la expectativa de un conflicto inminente. Aprovechando la ausencia del rey y de Ester, Amestris hace una gran revelación.", thumb: "https://static.wixstatic.com/media/859174_18a1bd77ce504e0b93e4e89eb93d7407~mv2.jpg", url: "https://ok.ru/videoembed/14973197486592" },
  { id: 16, title: "Nunca lo vas a entender", dur: "00:53:37", desc: "Desde las aguas, una vieja aliada de Amestris regresa a Susá. Después de revelar a Ester la sorpresa que preparó, Jerjes y la reina discuten hasta llegar a un ultimátum.", thumb: "https://static.wixstatic.com/media/859174_4d1e71aef9d94f2a8682e5c2d51e3f95~mv2.jpg", url: "https://ok.ru/videoembed/14973197814272" },
  { id: 17, title: "En el decimotercer día", dur: "00:45:08", desc: "Llevando a las gemelas ante el rey, Amestris no esperaba la rápida reacción de Jerjes. Prometiendo asegurar el poder del rey de reyes, Amán pide la aniquilación de los judíos.", thumb: "https://static.wixstatic.com/media/859174_076a07d11152470b9c8dbf487e0aaf73~mv2.jpg", url: "https://ok.ru/videoembed/14973198141952" },
  { id: 18, title: "Entonces, ¿ eres Hadassah?", dur: "00:44:25", desc: "En rebelión y dolor, los judíos de Susá se reúnen frente al palacio. Contando con un nuevo aliado, Ester recibe noticias de Mardoqueo y con ellas se entera del último decreto del emperador.", thumb: "https://static.wixstatic.com/media/859174_8b1d9a993b734ac79d50d9149c7ba84f~mv2.jpg", url: "https://ok.ru/videoembed/14973198535168" },
  { id: 19, title: "No voy a morir", dur: "00:46:44", desc: "En un intento de provocar a la reina y llenar su ausencia, Jerjes llama a Amirah, pero su permanencia allí depende de una curiosa condición. Ayunando durante tres días, Ester se prepara para ir ante el rey.", thumb: "https://static.wixstatic.com/media/859174_9243597cb05b46a88014fd145b9b781c~mv2.jpg", url: "https://ok.ru/videoembed/14973198731776" },
  { id: 20, title: "¿Cuál es tu pedido?", dur: "00:45:06", desc: "Ante la gran sorpresa de Jerjes por tener a Ester en su presencia, la tensión de todos se concentra en la expectativa por la reacción del rey. En conversación con Mardoqueo, Hegai hace revelaciones sobre su pasado.", thumb: "https://static.wixstatic.com/media/859174_e71dfd724abf4442aa2e32775097f33c~mv2.jpg", url: "https://ok.ru/videoembed/14973199059456" },
  { id: 21, title: "No esperar nada", dur: "00:38:43", desc: "Después de rechazar a Aria, Jerjes es enfrentado por la concubina. Mientras se prepara para un ataque fatal, Amán celebra con sus hijos la finalización de la horca destinada a Mardoqueo.", thumb: "https://static.wixstatic.com/media/859174_997eecbb23864da48f48a46cfa8b2799~mv2.jpg", url: "https://ok.ru/videoembed/14973199190528" },
  { id: 22, title: "Es una larga historia", dur: "00:49:43", desc: "Al recordar el momento en que Mardoqueo le salvó la vida, Jerjes pregunta a Amán qué se debe hacer con el hombre a quien el rey desea honrar. Temerosa por la revelación que tendrá que hacer, Ester se prepara para ...", thumb: "https://static.wixstatic.com/media/859174_2b316ab7ccff4907921d3531b33c52e2~mv2.jpg", url: "https://ok.ru/videoembed/14973199518208" },
  { id: 23, title: "Vuelve a mí", dur: "00:43:41", desc: "El destino que Amán preparó para Mardoqueo recae sobre él mismo, y recibe su sentencia. Tras el final de los últimos acontecimientos, Jerjes y Ester tienen la oportunidad de estar a solas nuevamente.", thumb: "https://static.wixstatic.com/media/859174_046da0e08c794c33b1c93b07d28db11f~mv2.jpg", url: "https://ok.ru/videoembed/14973199911424" },
  { id: 24, title: "¿Cómo voy a soportar esto?", dur: "00:40:55", desc: "En un ambiente alegre y romántico, Ester le hace un anuncio importante a Jerjes, sin imaginar que el peligro estaba muy cerca. Llenos de ira, los hijos de Amán envían un mensaje cruel a los judíos.", thumb: "https://static.wixstatic.com/media/859174_2290f046f1b548ef8a76435987a623cf~mv2.jpg", url: "https://ok.ru/videoembed/14973200370176" },
  { id: 25, title: "Aún no lo sabes", dur: "00:51:32", desc: "A solas con Artainte, una revelación del pasado traerá a la luz la verdad sobre una estrategia astuta del emperador. Mientras cae una fuerte lluvia sobre Susa, una inundación arrasa con la capital.", thumb: "https://static.wixstatic.com/media/859174_83a0eb5648294c1cb14e2f707b49649c~mv2.jpg", url: "https://ok.ru/videoembed/14973200566784" },
  { id: 26, title: "¡Auxilio!", dur: "00:44:47", desc: "En medio de la belleza del jardín secreto, Jerjes disfruta un momento especial con dos pequeñas invitadas. Tomando por sorpresa a Ester, los hijos de Amán encuentran la oportunidad de vengarse.", thumb: "https://static.wixstatic.com/media/859174_479ea1c0b7e64f94bd2860011c178159~mv2.jpg", url: "https://ok.ru/videoembed/14973200828928" },
  { id: 27, title: "Sucedió lo contrario", dur: "00:41:09", desc: "Recordando un momento con Ester, Jerjes habla con Dios por primera vez. Al llegar al decisivo trece de Adar, los judíos enfrentan a sus enemigos en todo el imperio, pero no sin la providencia divina.", thumb: "https://static.wixstatic.com/media/859174_6dc176dd45b9494eb320a698ae97e493~mv2.jpg", url: "https://ok.ru/videoembed/14973200894464" },
  { id: 28, title: "Tengo que irme", dur: "00:43:16", desc: "Después de dos días de enfrentamientos, el pueblo judío celebra con alegría la victoria sobre sus enemigos y el rescate divino. Años después, el inminente enfrentamiento entre Darío y Jerjes desata una tragedia.", thumb: "https://static.wixstatic.com/media/859174_3ea091c141164d378d5176f59dccada1~mv2.jpg", url: "https://ok.ru/videoembed/14973201025536" },
  { id: 29, title: "Me engañaron", dur: "00:54:10", desc: "Con la muerte de Jerjes, el enfrentamiento entre Darío y Artajerjes trae un giro inesperado para Susá y para todo el imperio. Sin más razones para quedarse en la capital, Ester parte hacia un antiguo sueño.", thumb: "https://static.wixstatic.com/media/859174_6d1125235d20420ca6c3e621bf635b07~mv2.jpg", url: "https://ok.ru/videoembed/14973201549824" },
  { id: 30, title: "Mi rey león", dur: "00:50:34", desc: "Reunidos de nuevo, Jerjes le cuenta a Ester cómo llegó hasta ahí. Viendo al nuevo rey devastado por sus últimas decisiones, Nehemías lo lleva hasta alguien del pasado.", thumb: "https://static.wixstatic.com/media/859174_289d76ff709647cba249df69d39ab5f9~mv2.jpg", url: "https://ok.ru/videoembed/14973201746432" }
];

const ReinaPersiaPC = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [inMyList, setInMyList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const SERIES_ID = 13; 

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

    const savedEp = localStorage.getItem('persia_last_ep');
    if (savedEp) {
      const idx = parseInt(savedEp);
      if (idx < persiaEpisodes.length) setCurrentIdx(idx);
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
        jesus: ['jesus', 'milagros', 'pasion'],
        reyes: ['reyes', 'david', 'saul', 'salomon', 'ester', 'persia'],
        ester: ['ester', 'reina de persia', 'persia', 'nehemias', 'jerjes', 'hadassah'],
        biblia: ['biblia', 'milagros', 'testamento']
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
    setSelectedVideo(persiaEpisodes[idx].url);
    localStorage.setItem('persia_last_ep', idx.toString());
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
      <Head><title>La Reina de Persia — Estudios 421</title></Head>

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
              <Link key={l.n} href={l.n === '' ? '/serie/la-reina-de-persia' : `/${l.n}/serie/la-reina-de-persia`}><img src={`https://static.wixstatic.com/media/859174_${l.img}~mv2.png`} className="w-7 h-7 object-contain cursor-pointer hover:scale-110 transition-transform" /></Link>
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
        <img src="https://static.wixstatic.com/media/859174_9077120f20214a278326945924df896d~mv2.jpg" className="w-full h-full object-cover" alt="Banner La Reina de Persia" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/10 opacity-70" />
        <div className="absolute bottom-[-30px] left-16 flex gap-6 z-20 items-center">
          <button onClick={() => openEpisode(currentIdx)} className="bg-white text-black font-black py-4 px-12 rounded-sm text-lg hover:bg-[#FF8A00] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-2xl uppercase">
            {currentIdx === 0 ? "▶ Ver Ahora" : `▶ Continuar Ep. ${persiaEpisodes[currentIdx].id}`}
          </button>
          <button toggleMyList onClick={toggleMyList} className={`border py-4 px-10 rounded-sm transition-all uppercase font-bold ${inMyList ? 'bg-[#FF8A00] border-[#FF8A00] text-white' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}>
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
          {persiaEpisodes.map((ep, index) => (
            <div key={ep.id} className={`group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 bg-[#2C2F33] border-2 ${currentIdx === index ? 'border-[#FF8A00] ring-4 ring-[#FF8A00]/20' : 'border-transparent hover:border-white/20'}`} onClick={() => openEpisode(index)}>
              <div className="relative aspect-video overflow-hidden">
                <img src={ep.thumb} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C2F33] opacity-60" />
                <div className="absolute bottom-2 left-2 bg-black/40 backdrop-blur-md px-3 py-1 rounded-md border border-white/10">
                    <span className="text-[11px] font-black uppercase text-white">Episodio <span className="text-[#FF8A00]">{ep.id}</span></span>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                  <span className="text-[10px] font-bold text-white">{ep.dur}</span>
                </div>
              </div>
              <div className="p-5 flex flex-col gap-1">
                <h3 className="font-bold text-base truncate uppercase group-hover:text-[#FF8A00]">{ep.title}</h3>
                <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed h-8">{ep.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 z-[1000] bg-[#050608] flex flex-col animate-fade-in">
          <div className="h-[12vh] min-h-[85px] px-12 flex items-center justify-between bg-gradient-to-b from-[#0a0b0d] to-[#050608] border-b border-white/5">
            <div className="flex flex-col border-l-4 border-[#FF8A00] pl-6 py-1 text-left">
              <span className="text-[10px] font-black text-[#FF8A00]/80 uppercase tracking-[0.5em] mb-1">Serie: La Reina de Persia</span>
              <h2 className="text-2xl font-black tracking-tighter uppercase leading-none">Capítulo {persiaEpisodes[currentIdx].id} <span className="text-white/10 mx-3">/</span> {persiaEpisodes[currentIdx].title}</h2>
            </div>
            <button onClick={closePlayer} className="group flex items-center gap-4 bg-white/[0.03] px-8 py-3.5 rounded-full border border-white/10 hover:bg-[#FF8A00] hover:scale-105 transition-all">
              <span className="text-[11px] font-black uppercase tracking-[0.2em] group-hover:text-black">Salir del video</span>
              <IoClose className="text-2xl group-hover:rotate-90 group-hover:text-black transition-all" />
            </button>
          </div>
          <div className="flex-grow bg-black relative">
            <iframe src={selectedVideo + "?autoplay=1"} className="absolute inset-0 w-full h-full border-none" allow="autoplay; fullscreen" allowFullScreen />
          </div>
          <div className="h-[13vh] min-h-[100px] px-16 bg-gradient-to-t from-[#0a0b0d] border-t border-white/5 flex items-center justify-between">
            <button disabled={currentIdx === 0} onClick={() => openEpisode(currentIdx - 1)} className="group flex items-center gap-5 disabled:opacity-5 transition-all">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] group-hover:bg-white group-hover:text-black transition-all">
                <IoChevronBack className="text-xl" />
              </div>
              <div className="flex flex-col items-start text-left">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FF8A00]/60">Anterior</span>
                <span className="text-sm font-bold uppercase text-white/80">Episodio {currentIdx}</span>
              </div>
            </button>
            <button onClick={closePlayer} className="flex items-center gap-4 bg-white/[0.03] px-10 py-4 rounded-2xl border border-white/5 hover:bg-white/[0.08] transition-all">
              <IoList className="text-2xl text-[#FF8A00]" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-white/60">Capítulos</span>
            </button>
            <button disabled={currentIdx === persiaEpisodes.length - 1} onClick={() => openEpisode(currentIdx + 1)} className="group flex items-center gap-6 disabled:opacity-5 transition-all">
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

export default ReinaPersiaPC;
