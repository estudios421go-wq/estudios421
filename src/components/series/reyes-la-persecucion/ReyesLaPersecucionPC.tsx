import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoChevronBack, IoChevronForward, IoList, IoClose, IoCheckmarkCircle } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { allSeries } from '../../../data/series';

// --- CONFIGURACIÓN DE EPISODIOS (ID: 24) ---
const reyesPersecucionEpisodes = [
  { id: 1, title: "Ya no existe", dur: "00:44:23", desc: "En un intento de arreglar las cosas, Ainoã le pide a Saúl que pase la noche con ella. Buscando a Zeruia en la posada, David la encuentra desmayada.", thumb: "https://static.wixstatic.com/media/859174_8e7b3ed6fcd04385acf8958f9e968ef6~mv2.jpg", url: "https://ok.ru/videoembed/15744937888256" },
  { id: 2, title: "Serán reducidos a nada", dur: "00:46:01", desc: "Reunidos con la familia del rey, David y todos los presentes se sorprenden por un ataque de Saúl. En su intento de conquistar a Betseba, Urias le regala un presente.", thumb: "https://static.wixstatic.com/media/859174_5ba427b26112409981dc467ca6dd0b14~mv2.jpg", url: "https://ok.ru/videoembed/15745014761984" },
  { id: 3, title: "Con una condición", dur: "00:45:02", desc: "Por orden de Saúl, David lidera un ataque contra la guarnición filistea. Con Zeruya de regreso en Belén, Haviva revela la verdad sobre Naás.", thumb: "https://static.wixstatic.com/media/859174_854072f3864b457f91f277d18ee10e62~mv2.jpg", url: "https://ok.ru/videoembed/16051222415872" },
  { id: 4, title: "Como si fuera fácil", dur: "00:45:31", desc: "Pidiendo una nueva oportunidad a Jéter, Zeruia se enfrenta a una condición. Después de un ataque dirigido por David, Aquis envía un mensaje a Saúl.", thumb: "https://static.wixstatic.com/media/859174_cc923f56a9ca4088acf9afb0814c18a5~mv2.jpg", url: "https://ok.ru/videoembed/16051224250880" },
  { id: 5, title: "Siempre aquí para ti", dur: "00:45:06", desc: "Conversando con Abner, Ainoã se sorprende con su propia reacción. Durante una misión con sus soldados, David se reencuentra con una persona del pasado.", thumb: "https://static.wixstatic.com/media/859174_31439bd81678475cb888dddc619695c9~mv2.jpg", url: "https://ok.ru/videoembed/16051226085888" },
  { id: 6, title: "Él es una amenaza", dur: "00:44:28", desc: "Después de un ataque sorpresa, David envía un mensaje a Aquis. Con sus sospechas alimentadas por Abner, Saúl y el comandante elaboran un plan.", thumb: "https://static.wixstatic.com/media/859174_8c31f2fbb1b9400392526684c900fbb9~mv2.jpg", url: "https://ok.ru/videoembed/16051229428224" },
  { id: 7, title: "¿Nos das una oportunidad?", dur: "00:45:18", desc: "En una discusión acalorada, Queila e Irán desvelan las verdades del pasado a Nabal. En un intento de casar a sus hijas, Asher brinda una oportunidad.", thumb: "https://static.wixstatic.com/media/859174_5d143dc73e6040ff878d10ff595a051c~mv2.jpg", url: "https://ok.ru/videoembed/16051230870016" },
  { id: 8, title: "¡Vamos a circuncidarlos!", dur: "00:46:02", desc: "Como dote por Mical, David recibe una petición inusual del rey. Lejos de todos, Abner prepara una sorpresa para Ainoam.", thumb: "https://static.wixstatic.com/media/859174_7352090196c84af9857be7de8f090d95~mv2.jpg", url: "https://ok.ru/videoembed/16051235260928" },
  { id: 9, title: "No es gracias a ti", dur: "00:44:37", desc: "Pidiendo perdón a Joab, Zeruia y el hijo se sorprenden por una amenaza de reaparición. Victorioso, David regresa a Gibea con la dote pedida – y más.", thumb: "https://static.wixstatic.com/media/859174_47638a391ad04496b727f31efc339dd3~mv2.jpg", url: "https://ok.ru/videoembed/16051237095936" },
  { id: 10, title: "Marido y mujer", dur: "00:45:40", desc: "En la fiesta, todos celebran el matrimonio de David y Mical. Después de un comentario imprudente de Isaí, se confirman las sospechas de Saúl.", thumb: "https://static.wixstatic.com/media/859174_375d0dd276f54ad49502a842c2468d7c~mv2.jpg", url: "https://ok.ru/videoembed/16051238799872" },
  { id: 11, title: "Matarlo", dur: "00:44:41", desc: "Tras un acto de provocación de Irán, Nabal se ve ante una decisión. Declarando a David un traidor, Saúl ordena su muerte.", thumb: "https://static.wixstatic.com/media/859174_ae69cdf4befa4a30a35c72aa8e555e59~mv2.jpg", url: "https://ok.ru/videoembed/16051242142208" },
  { id: 12, title: "¿Listo?", dur: "00:45:41", desc: "En el campo de batalla, los hombres de Israel luchan contra los filisteos. Después de intentar nuevamente matar a David, Saúl tiende una emboscada.", thumb: "https://static.wixstatic.com/media/859174_7756e45ace91413f9368c85f5e5d014f~mv2.jpg", url: "https://ok.ru/videoembed/16128596183552" },
  { id: 13, title: "Estuvo cerca", dur: "00:45:07", desc: "Huyendo de Saúl, David busca refugio con el profeta Samuel. Inconsolable, Mical recibe la noticia de que será dada en matrimonio a otro hombre.", thumb: "https://static.wixstatic.com/media/859174_ce66d2a0492947969811b403406f8d30~mv2.jpg", url: "https://ok.ru/videoembed/16128596642304" },
  { id: 14, title: "¿Estás seguro?", dur: "00:44:07", desc: "Tratando de interceder por David, Zeruia va al campamento militar en busca de Abner. En la escuela de profetas, David y los presentes se sorprenden por una providencia divina.", thumb: "https://static.wixstatic.com/media/859174_03eaf21b3d484d8db5d0eb5c8a6e9ef0~mv2.jpg", url: "https://ok.ru/videoembed/16128597297664" },
  { id: 15, title: "¿Por qué volviste?", dur: "00:45:52", desc: "Al llegar al límite de sus fuerzas, Abigail pide ayuda a Dios. Al reencontrarse con Mical, David hace una promesa.", thumb: "https://static.wixstatic.com/media/859174_19403403816e467da89fd320ac7aa32a~mv2.jpg", url: "https://ok.ru/videoembed/16128597494272" },
  { id: 16, title: "Mi hermano", dur: "00:45:58", desc: "Ante la invitación de Jonatán en nombre de Saúl, David propone una prueba. Agotado por las actitudes de Zeruia, Jéter confronta a su esposa.", thumb: "https://static.wixstatic.com/media/859174_5f14534379264f269bc640e69ab39e2e~mv2.jpg", url: "https://ok.ru/videoembed/16128599329280" },
  { id: 17, title: "Tiene que morir", dur: "00:44:31", desc: "Con la ausencia de David en la fiesta de la cosecha Saúl asusta a todos con una reacción violenta. Mientras huye, David es sorprendido por un grupo de soldados.", thumb: "https://static.wixstatic.com/media/859174_70be94cc28b74698818da4c0b8df77ac~mv2.jpg", url: "https://ok.ru/videoembed/16128599656960" },
  { id: 18, title: "Idea descabellada", dur: "00:44:54", desc: "Después de la traición de Sama, Adriel va a las tierras de Agé – y no para conversar. Sin tener a dónde huir, David sugiere una idea arriesgada.", thumb: "https://static.wixstatic.com/media/859174_c2dee7ebb1a64efab5549909303e2461~mv2.jpg", url: "https://ok.ru/videoembed/16128600312320" },
  { id: 19, title: "¡Este hombre está loco!", dur: "00:45:59", desc: "Rendido ante Aquis y sus soldados, David improvisa una solución. Considerando a los sacerdotes como traidores, Saúl toma una medida cruel.", thumb: "https://static.wixstatic.com/media/859174_68f1f9c811364ee0869b7edad1669a3a~mv2.jpg", url: "https://ok.ru/videoembed/16128600640000" },
  { id: 20, title: "Estamos contigo", dur: "00:45:56", desc: "Abrigado por aquellos que decidieron seguirlo, David se sorprende con la llegada de un nuevo grupo. Débil, Samuel pide que llamen a Joel.", thumb: "https://static.wixstatic.com/media/859174_d3e87ac3f0284bb1abdd5e6c57247499~mv2.jpg", url: "https://ok.ru/videoembed/16128601098752" },
  { id: 21, title: "El famoso David", dur: "00:45:54", desc: "Declarándose a Mical, Paltiel se arriesga a un acercamiento. Buscando un lugar seguro para su familia, David se presenta ante el rey de Moab.", thumb: "https://static.wixstatic.com/media/859174_5468906674404f9e8f1c48ddd2be447d~mv2.jpg", url: "https://ok.ru/videoembed/16128601623040" },
  { id: 22, title: "Pobre de ti", dur: "00:45:28", desc: "Con los ojos en Ainoã, David intenta superar la barrera que ella ha impuesto. En un ambiente de despedida, Samuel aconseja a Jonatán.", thumb: "https://static.wixstatic.com/media/859174_fba73b78a0234bc1bebef0f433fcf120~mv2.jpg", url: "https://ok.ru/videoembed/16128602343936" },
  { id: 23, title: "¿Quién vendrá conmigo?", dur: "00:45:59", desc: "Seguro de lo que debe hacerse, David llama a sus hombres para luchar contra los filisteos. Ante el pueblo reunido para el entierro de Samuel, Joel hace una solicitud importante.", thumb: "https://static.wixstatic.com/media/859174_cce3f7f39ea74b2eb36e3ec5ab405db2~mv2.jpg", url: "https://ok.ru/videoembed/16128602999296" },
  { id: 24, title: "¿Todavía me ama?", dur: "00:45:56", desc: "Consumida por la culpa, Zeruia se confiesa con Jéter. A solas, David hace una petición a Ainoã.", thumb: "https://static.wixstatic.com/media/859174_6c4fb5cf042040ff95f3a51da0a702d5~mv2.jpg", url: "https://ok.ru/videoembed/16128717949440" },
  { id: 25, title: "Este es tu problema", dur: "00:44:53", desc: "Decidido en su búsqueda, Saúl finalmente tiene la oportunidad de vengarse. David confronta a Joab sobre Mizpa.", thumb: "https://static.wixstatic.com/media/859174_48166a8ce11341b0802ad88e6306b633~mv2.jpg", url: "https://ok.ru/videoembed/16128718342656" },
  { id: 26, title: "Piensa un poco", dur: "00:45:31", desc: "En un ambiente romántico con Ainoã, David es sorprendido por una pregunta. Ante la prueba de que su vida fue perdonada, Saúl toma una decisión sobre David.", thumb: "https://static.wixstatic.com/media/859174_609e69ac4f9c4820b6d8e18bbabd99e1~mv2.jpg", url: "https://ok.ru/videoembed/16148645808640" },
  { id: 27, title: "A mi manera, o nada", dur: "00:46:02", desc: "En una conversación entre hermanos, Is-boset expresa su dolor a Jonatán. Mientras tanto, sin provisiones en el campamento, David recibe la noticia de que Nabal le ha negado ayuda.", thumb: "https://static.wixstatic.com/media/859174_5e2ff8d308e442c2b820989c0ecc328b~mv2.jpg", url: "https://ok.ru/videoembed/16148648036864" },
  { id: 28, title: "Recuérdame", dur: "00:45:41", desc: "Listo para levantarse contra la casa de Nabal, David se detiene ante una actitud intrigante. Reconciliados, Zeruya comparte con Jéter una experiencia especial.", thumb: "https://static.wixstatic.com/media/859174_789cfbd8dee64fc8aaada3d4462c3677~mv2.jpg", url: "https://ok.ru/videoembed/16148650723840" },
  { id: 29, title: "Como siempre lo mereciste", dur: "00:46:35", desc: "Al tomar conocimiento de la situación de Abigail, David hace una propuesta a Asher y Jora. El momento de lectura de la Narradora y su hijo es interrumpido por un mensaje del rey.", thumb: "https://static.wixstatic.com/media/859174_1581a16af6cd4422819a567a67417be5~mv2.jpg", url: "https://ok.ru/videoembed/16148652034560" },
  { id: 30, title: "Peligroso, ¿por qué?", dur: "00:49:00", desc: "Con David ahorrando su vida una vez más, Saúl se enfrenta a una decisión. Cansado de huir del rey, David acepta la propuesta de los filisteos.", thumb: "https://static.wixstatic.com/media/859174_551f0f5a2df340fa8d71a73982dd7617~mv2.jpg", url: "https://ok.ru/videoembed/16148653935104" },
  { id: 31, title: "Como siempre hemos sido", dur: "00:47:16", desc: "Mientras atendía a Abigail, David intenta reconectarse con Ainoã. Angustiado por el inminente enfrentamiento con los filisteos, Abner se sorprende por una solicitud de Ainoã.", thumb: "https://static.wixstatic.com/media/859174_aa9324c9801445229d235726eb467c45~mv2.jpg", url: "https://ok.ru/videoembed/16148656818688" },
  { id: 32, title: "Fuiste todo para mí", dur: "00:47:09", desc: "Reunidos con Aquis, David y sus hombres reciben una misión para demostrar su lealtad. Frente al aterrador ejército filisteo, Saúl decide buscar dirección por medios dudosos.", thumb: "https://static.wixstatic.com/media/859174_737ef9c43b764a3c8c31a3784842cf3a~mv2.jpg", url: "https://ok.ru/videoembed/16148659177984" },
  { id: 33, title: "Hasta el final", dur: "00:47:36", desc: "Consultando a la hechicera, Saúl queda atónito con las respuestas. Al regresar a Siclag, David salva a una hermosa mujer en el camino.", thumb: "https://static.wixstatic.com/media/859174_3292733ad6034e8bb15111587c0bf966~mv2.jpg", url: "https://ok.ru/videoembed/16148660750848" },
  { id: 34, title: "¿Arrebatando más corazones?", dur: "00:48:30", desc: "Acorralado por los filisteos, Saúl toma una decisión irreversible. Señalando a David como culpable, los hombres de Siclag amenazan con apedrearlo.", thumb: "https://static.wixstatic.com/media/859174_346ae00844be48f5b2bb29525f76506d~mv2.jpg", url: "https://ok.ru/videoembed/16148662848000" },
  { id: 35, title: "Seamos creativos", dur: "00:49:56", desc: "Encontrando al siervo de un amalecita que fue dejado atrás, David acepta hacer un trato. Aún afectados por el luto, Abner confirma la hipótesis de Is-boset.", thumb: "https://static.wixstatic.com/media/859174_de1ebedf235e42b084e8fc702fee9979~mv2.jpg", url: "https://ok.ru/videoembed/16148667501056" },
  { id: 36, title: "Volvamos a casa", dur: "00:48:44", desc: "Tras reencontrarse con toda su familia en Hebrón, David es ungido rey sobre la casa de Judá. Con el resto del pueblo, Abner proclama a Is-boset como el nuevo rey de Israel.", thumb: "https://static.wixstatic.com/media/859174_074ba78482044f8ba6f0dd6cd11838a5~mv2.jpg", url: "https://ok.ru/videoembed/16148669598208" },
];

const ReyesPersecucionPC = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [inMyList, setInMyList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const SERIES_ID = 24;

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

    const savedEp = localStorage.getItem('reyes_persecucion_last_ep');
    if (savedEp) {
      const idx = parseInt(savedEp);
      if (idx < reyesPersecucionEpisodes.length) setCurrentIdx(idx);
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
      const filtered = allSeries.filter(serie => normalize(serie.title).includes(term) || normalize(serie.category || "").includes(term));
      setSearchResults(filtered);
    } else { setSearchResults([]); }
  }, [searchQuery]);

  const openEpisode = (idx: number) => {
    setCurrentIdx(idx);
    setSelectedVideo(reyesPersecucionEpisodes[idx].url);
    localStorage.setItem('reyes_persecucion_last_ep', idx.toString());
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
      <Head><title>Reyes: La Persecución — Estudios 421</title></Head>

      <nav className={`fixed top-0 w-full z-[130] transition-all duration-500 px-8 py-4 flex items-center justify-between ${isScrolled || searchQuery.length > 0 ? 'bg-black shadow-lg' : 'bg-gradient-to-b from-black via-black/60 to-transparent'}`}>
        <div className="flex items-center gap-10">
          <Link href="/"><div className="relative w-[160px] h-[45px] cursor-pointer"><Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" fill className="object-contain" priority /></div></Link>
          <div className="flex gap-8">
            <Link href="/" className="relative group text-white text-[15px] font-medium tracking-wide">Inicio<span className="absolute -bottom-1 left-0 h-[3px] bg-[#FF8A00] transition-all duration-500 w-0 group-hover:w-full" /></Link>
            <Link href="/series-biblicas" className="relative group text-white text-[15px] font-medium tracking-wide">Series Biblicas<span className="absolute -bottom-1 left-0 h-[3px] bg-[#FF8A00] transition-all duration-500 w-0 group-hover:w-full" /></Link>
            <Link href="/series-tv" className="relative group text-white text-[15px] font-medium tracking-wide">Series TV<span className="absolute -bottom-1 left-0 h-[3px] bg-[#FF8A00] transition-all duration-500 w-0 group-hover:w-full" /></Link>
            <Link href="/peliculas" className="relative group text-white text-[15px] font-medium tracking-wide">Peliculas<span className="absolute -bottom-1 left-0 h-[3px] bg-[#FF8A00] transition-all duration-500 w-0 group-hover:w-full" /></Link>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex gap-4 mr-4">
            {[{ n: '', img: '367960b11c1c44ba89cd1582fd1b5776', p: '/serie/reyes-la-persecucion' }, 
              { n: 'en', img: '35112d9ffe234d6f9dcef16cf8f7544e', p: '/en/serie/kings-the-persecution' }, 
              { n: 'pt', img: '830f1c20656e4d44a819bedfc13a22cc', p: '/pt/serie/reis-a-perseguicao' }].map((l) => (
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
        <img src="https://static.wixstatic.com/media/859174_cbbb6c8a10cf48608758b692d9de48a9~mv2.jpg" className="w-full h-full object-cover" alt="Banner Reyes: La Persecución" />
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

      <div className="px-16 mb-20 relative z-10">
        <header className="flex items-center gap-4 mb-10 border-b border-white/10 pb-4">
          <div className="w-1.5 h-8 bg-[#FF8A00]"></div>
          <h2 className="text-2xl font-bold tracking-tight uppercase">Episodios Disponibles</h2>
        </header>
        <div className="grid grid-cols-4 gap-8">
          {reyesPersecucionEpisodes.map((ep, index) => (
            <div key={ep.id} className={`group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 bg-[#2C2F33] border-2 ${currentIdx === index ? 'border-[#FF8A00] ring-4 ring-[#FF8A00]/20' : 'border-transparent hover:border-white/20'}`} onClick={() => openEpisode(index)}>
              <div className="relative aspect-video overflow-hidden">
                <img src={ep.thumb} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" loading="lazy" alt={ep.title} />
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
                <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed h-8 text-justify">{ep.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-16 mb-32 flex justify-center">
          <Link href="/serie/reyes-la-conquista">
            <button className="group relative bg-[#FF8A00] text-black font-black py-6 px-20 rounded-xl text-xl uppercase tracking-tighter hover:scale-110 transition-all shadow-[0_0_50px_rgba(255,138,0,0.4)] overflow-hidden">
                <span className="relative z-10">Ver Siguiente Temporada</span>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
            </button>
          </Link>
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 z-[1000] bg-[#050608] flex flex-col animate-fade-in text-left">
          <div className="h-[12vh] min-h-[85px] px-12 flex items-center justify-between bg-gradient-to-b from-[#0a0b0d] to-[#050608] border-b border-white/5">
            <div className="flex flex-col border-l-4 border-[#FF8A00] pl-6 py-1">
              <span className="text-[10px] font-black text-[#FF8A00]/80 uppercase tracking-[0.5em] mb-1">Serie: Reyes: La Persecución</span>
              <h2 className="text-2xl font-black tracking-tighter uppercase leading-none">Capítulo {reyesPersecucionEpisodes[currentIdx].id} <span className="text-white/10 mx-3">/</span> {reyesPersecucionEpisodes[currentIdx].title}</h2>
            </div>
            <button onClick={closePlayer} className="group flex items-center gap-4 bg-white/[0.03] px-8 py-3.5 rounded-full border border-white/10 hover:bg-[#FF8A00] hover:scale-105 transition-all">
              <span className="text-[11px] font-black uppercase tracking-[0.2em] group-hover:text-black">Cerrar</span>
              <IoClose size={24} className="group-hover:rotate-90 group-hover:text-black transition-all" />
            </button>
          </div>
          <div className="flex-grow bg-black relative">
            <iframe src={selectedVideo + "?autoplay=1"} className="absolute inset-0 w-full h-full border-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" allow="autoplay; fullscreen" allowFullScreen />
          </div>
          <div className="h-[13vh] min-h-[100px] px-16 bg-gradient-to-t from-[#0a0b0d] border-t border-white/5 flex items-center justify-between">
            <button disabled={currentIdx === 0} onClick={() => openEpisode(currentIdx - 1)} className="group flex items-center gap-5 disabled:opacity-5 transition-all">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] group-hover:bg-white group-hover:text-black transition-all shadow-xl shadow-black">
                <IoChevronBack size={24} />
              </div>
              <div className="flex flex-col items-start text-left">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FF8A00]/60">Anterior</span>
                <span className="text-sm font-bold uppercase text-white/80">Episodio {currentIdx}</span>
              </div>
            </button>
            <button onClick={closePlayer} className="flex items-center gap-4 bg-white/[0.03] px-10 py-4 rounded-2xl border border-white/5 hover:bg-white/[0.08] transition-all">
              <IoList size={28} className="text-[#FF8A00]" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-white/60">Lista de Capítulos</span>
            </button>
            <button disabled={currentIdx === reyesPersecucionEpisodes.length - 1} onClick={() => openEpisode(currentIdx + 1)} className="group flex items-center gap-6 disabled:opacity-5 transition-all">
              <div className="flex flex-col items-end text-right">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FF8A00]">Siguiente</span>
                <span className="text-sm font-bold uppercase text-white/80">Episodio {currentIdx + 2}</span>
              </div>
              <div className="w-16 h-16 rounded-[22px] bg-[#FF8A00] flex items-center justify-center text-black shadow-2xl group-hover:scale-110 transition-all shadow-black">
                <IoChevronForward size={32} />
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
            <a href="https://www.tiktok.com/@estudios421_com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xl"><FaTiktok /></a>
            <a href="https://youtube.com/@estudios421max" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xl"><FaYoutube /></a>
            <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xl"><FaXTwitter /></a>
          </div>
          <div className="mb-10 space-y-4">
            <p className="text-xs leading-relaxed max-w-4xl">© {new Date().getFullYear()} Estudios 421. Todos los derechos reservados sobre el diseño y edición de la plataforma.</p>
            <p className="text-[10px] md:text-xs leading-relaxed text-gray-500 max-w-5xl text-justify uppercase">Aviso Legal: El contenido audiovisual compartido en este sitio pertenece a sus respectivos propietarios y productoras. Estudios 421 es una plataforma sin fines de lucro destinada a la difusión de contenido bíblico.</p>
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

export default ReyesPersecucionPC;
