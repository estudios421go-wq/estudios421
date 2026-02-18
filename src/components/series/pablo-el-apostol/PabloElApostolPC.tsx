import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoCloseOutline, IoChevronBack, IoChevronForward, IoList, IoClose, IoCheckmarkCircle } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { allSeries } from '../../../data/series';

// --- CONFIGURACIÓN DE EPISODIOS (ID: 17) ---
const pabloEpisodes = [
  { id: 1, title: "Yo soy fariseo", dur: "00:48:15", desc: "De regreso en Jerusalén, Saulo descubre algo sobre su prometida. En una acalorada discusión, Caifás incita al sanedrín contra Pedro, Santiago y Bernabé.", thumb: "https://static.wixstatic.com/media/859174_bc7bb5bca3b945679b42140b328190bb~mv2.jpg", url: "https://ok.ru/videoembed/15046009489920" },
  { id: 2, title: "No te culpes por eso", dur: "00:46:45", desc: "Con intenciones cuestionables, Caifás le hace una propuesta a Saulo. La sanidad de un paralítico provoca un gran alboroto y marca un gran giro para Esteban.", thumb: "https://static.wixstatic.com/media/859174_e02a7db2f26647ddafb20e721182fb56~mv2.jpg", url: "https://ok.ru/videoembed/15046314297856" },
  { id: 3, title: "Ir en contra de Dios", dur: "00:45:09", desc: "Sabiendo dónde encontrar al novio, Gabriela va a su encuentro para confrontarlo. Con las cartas entregadas por Caifás, Saulo parte hacia Damasco.", thumb: "https://static.wixstatic.com/media/859174_59d8754b1047471cab6eb4e2e4bc5ed9~mv2.jpg", url: "https://ok.ru/videoembed/15055683062272" },
  { id: 4, title: "¿Por qué me persigues?", dur: "00:45:03", desc: "Al caer del caballo, Saulo es abordado de manera inesperada. En Damasco, Ananías se sorprende con una orden divina.", thumb: "https://static.wixstatic.com/media/859174_ef5088ba6ca04f129a6929e2a35d69b4~mv2.jpg", url: "https://ok.ru/videoembed/15055683521024" },
  { id: 5, title: "Nuestro pan de cada día", dur: "00:52:30", desc: "Al notar un movimiento extraño en la ciudad, Ananías y Bernabé se ponen en alerta. En Jerusalén, el regreso de Saulo provoca reacciones encontradas.", thumb: "https://static.wixstatic.com/media/859174_75104984b2d342f2b2560964c0288ce4~mv2.jpg", url: "https://ok.ru/videoembed/15055762885120" },
  { id: 6, title: "Llámame Pablo", dur: "00:50:08", desc: "Frente a frente con los apóstoles, Pablo es interrogado por ellos. En una discusión dolorosa, Gabriela es sorprendida por una confesión.", thumb: "https://static.wixstatic.com/media/859174_fdd82b41ec0c444a9a8a64590cd46f63~mv2.jpg", url: "https://ok.ru/videoembed/15055987870208" },
  { id: 7, title: "A mi lado", dur: "00:36:47", desc: "Acompañando a los apóstoles por Jerusalén, Pablo se encuentra con visitantes griegos que entran en un debate. Animada, Gabriela toma una decisión impulsiva.", thumb: "https://static.wixstatic.com/media/859174_5bd0d8d2c6684bc6971655334e95e6ca~mv2.jpg", url: "https://ok.ru/videoembed/15055988394496" },
  { id: 8, title: "¿Puedo explicar, familia?", dur: "00:41:09", desc: "De vuelta en casa, Pablo enfrenta la reacción de sus familiares. En un ambiente romántico, Rode es sorprendida con una revelación.", thumb: "https://static.wixstatic.com/media/859174_ed162d2336b94bacaecaa933701e29b2~mv2.jpg", url: "https://ok.ru/videoembed/15055988656640" },
  { id: 9, title: "Petición de perdón", dur: "00:43:45", desc: "Saliendo de Tarso, Pablo y Bernabé se enfrentan a una invitada inesperada. En Jerusalén, el discurso de Santiago provoca un enfrentamiento peligroso.", thumb: "https://static.wixstatic.com/media/859174_0c91524b65a74f5e87f3cb50e7148d2f~mv2.jpg", url: "https://ok.ru/videoembed/15055988853248" },
  { id: 10, title: "Yo llegaré primero", dur: "00:41:44", desc: "Frente a Herodes, los apóstoles intentan calmar la situación en el pórtico. Al ser confrontado sobre sus sentimientos, Pablo aconseja a Rode.", thumb: "https://static.wixstatic.com/media/859174_6a22ea0a0917448cbbd5c91f19310a48~mv2.jpg", url: "https://ok.ru/videoembed/15055989049856" },
  { id: 11, title: "Hay una criatura en él", dur: "00:45:14", desc: "En medio de la animación y la euforia, los juegos en Cesarea se interrumpen por un incidente peculiar. Predicando con valentía en las sinagogas, Pablo gana un nuevo opositor.", thumb: "https://static.wixstatic.com/media/859174_a78129abb97d4917b2c0b91474280bb5~mv2.jpg", url: "https://ok.ru/videoembed/15055989312000" },
  { id: 12, title: "Júpiter y Mercurio", dur: "00:39:39", desc: "Incitados por los religiosos, el pueblo de Antioquía toma una actitud definitiva contra los apóstoles. Víctimas de un malentendido, Pablo y Bernabé sufren una reacción violenta.", thumb: "https://static.wixstatic.com/media/859174_e3c3ca6abe4c405ebf6635963912faa9~mv2.jpg", url: "https://ok.ru/videoembed/15055989639680" },
  { id: 13, title: "La cuestión de la circuncisión", dur: "00:48:11", desc: "Movida por buenas intenciones, Gabriela acepta una invitación cuestionable de Rode. De regreso en Jerusalén, Pablo y Bernabé se reúnen con la iglesia.", thumb: "https://static.wixstatic.com/media/859174_3268d80fdb63432c8c0ccd51e454d005~mv2.jpg", url: "https://ok.ru/videoembed/15055989770752" },
  { id: 14, title: "¿Por qué, Pedro?", dur: "00:44:51", desc: "Después de pedir explicaciones, Cumano le hace una solicitud a Gamaliel. Sin rodeos, Pablo confronta a Pedro delante de todos.", thumb: "https://static.wixstatic.com/media/859174_fd5467fe1e384aa3be14dabf9baecce7~mv2.jpg", url: "https://ok.ru/videoembed/15080759822848" },
  { id: 15, title: "¡Marcos no va!", dur: "00:45:05", desc: "Con los ánimos a flor de piel, Rode hace una revelación impactante. En una discusión sobre el próximo viaje, la situación entre Pablo y Bernabé llega a un punto decisivo.", thumb: "https://static.wixstatic.com/media/859174_351a542876c048278d86c2989359d880~mv2.jpg", url: "https://ok.ru/videoembed/15080760084992" },
  { id: 16, title: "Hola, Lucas", dur: "00:49:03", desc: "Resuelta, Rode toma una decisión definitiva sobre Agripa. De regreso en Tarso, Pablo se sorprende por el estado de Nadiel.", thumb: "https://static.wixstatic.com/media/859174_77aa8aba96ab45f78dab6118caa7e65c~mv2.jpg", url: "https://ok.ru/videoembed/15080760347136" },
  { id: 17, title: "Sí, yo soy Nero", dur: "00:48:09", desc: "Al compartir una parte de su pasado, Lucas le hace una petición a Pablo. Gabriela es confrontada por sus sentimientos hacia Prócor.", thumb: "https://static.wixstatic.com/media/859174_264ee56696b042dba62dbf6470cd9456~mv2.jpg", url: "https://ok.ru/videoembed/15080760478208" },
  { id: 18, title: "Quita de mí este deseo", dur: "00:48:09", desc: "Después de un ultimátum, Pablo acepta la invitación hospitalaria de Lidia. Poniendo a todos en alerta, la comitiva de Rode y Fabio sufre un ataque.", thumb: "https://static.wixstatic.com/media/859174_b57dbd2a47ff485d8c32d6f278adb6be~mv2.jpg", url: "https://ok.ru/videoembed/15080760674816" },
  { id: 19, title: "¡Un terremoto!", dur: "00:58:16", desc: "Prisionero en la cárcel de Filipos con Silas, Pablo impide que Epafrodito cometa un acto drástico. Con toda pompa, el palacio de Roma celebra una boda real.", thumb: "https://static.wixstatic.com/media/859174_2d7e61bd557a49e4810bc6f0bd04dc10~mv2.jpg", url: "https://ok.ru/videoembed/15166752164352" },
  { id: 20, title: "¿Me amas?", dur: "00:51:15", desc: "En Tesalónica, Pablo se sorprende con la aparición de un viejo perseguidor. Hablando con Susana, Gabriela descubre una verdad sobre sus sentimientos.", thumb: "https://static.wixstatic.com/media/859174_80645a67b00a47e78cfb1442d995dbad~mv2.jpg", url: "https://ok.ru/videoembed/15166754130432" },
  { id: 21, title: "Pablo en Atenas", dur: "00:51:12", desc: "Al debatir con los filósofos, Pablo es convocado al Areópago. En Roma, Nerón se sorprende con una noticia sobre Acte.", thumb: "https://static.wixstatic.com/media/859174_b39b759c2fed4959aaee0dac58a773be~mv2.jpg", url: "https://ok.ru/videoembed/15231880333824" },
  { id: 22, title: "¡Vive para mí!", dur: "00:56:06", desc: "Con la persecución impulsada por Eliasafe llegando a un punto crítico, Pablo toma una decisión sobre los judíos. En el palacio, un acontecimiento trágico interrumpe la reunión familiar del emperador.", thumb: "https://static.wixstatic.com/media/859174_02a5725c44af4de986b52eb8b185a279~mv2.jpg", url: "https://ok.ru/videoembed/15231880530432" },
  { id: 23, title: "Juegos ístmicos", dur: "00:43:03", desc: "Al ver la agitación de la ciudad por los juegos, Pablo decide seguir una inspiración audaz. En Jerusalén, Gabriela es confrontada por su hermano y se toma una decisión crucial.", thumb: "https://static.wixstatic.com/media/859174_89ece7d660e94146af8d1438b75b6d80~mv2.jpg", url: "https://ok.ru/videoembed/15231881054720" },
  { id: 24, title: "Reunión en Corinto", dur: "00:55:19", desc: "En medio de teatro lleno de gente, Pablo se sorprende con un reencuentro inesperado. Cara a cara con Nerón, Acte intenta posicionarse sobre la situación entre ellos.", thumb: "https://static.wixstatic.com/media/859174_430ad0ce03d64760a9ecccd910045005~mv2.jpg", url: "https://ok.ru/videoembed/15231881972224" },
  { id: 25, title: "Pascua", dur: "00:35:38", desc: "Con los apóstoles reunidos en Jerusalén, el regreso de Pablo no tarda en causar reacciones. En Antioquía, Tito se encuentra en una posición delicada con los judíos.", thumb: "https://static.wixstatic.com/media/859174_7356ff96dba440aa960a5364d0599986~mv2.jpg", url: "https://ok.ru/videoembed/15231882562048" },
  { id: 26, title: "Espina en la carne", dur: "00:40:58", desc: "Mientras Pablo está acorralado por la guardia del templo, una intervención inesperada pone los ánimos al límite. En Roma, Acte es sorprendida con una visita.", thumb: "https://static.wixstatic.com/media/859174_8e5469e76e894c4296dfda6af10010e3~mv2.jpg", url: "https://ok.ru/videoembed/15231882955264" },
  { id: 27, title: "Hechos de los Apóstoles", dur: "00:47:03", desc: "Santiago es confrontado por Susana acerca de su postura respecto a la iglesia en Jerusalén. Después de darle una misión, Pablo hace una petición a Lucas.", thumb: "https://static.wixstatic.com/media/859174_80e260df21454203a7b0d4b8210b7c88~mv2.jpg", url: "https://ok.ru/videoembed/15231883282944" },
  { id: 28, title: "¿Quién es Apolo?", dur: "00:41:08", desc: "En el palacio, Agripina intenta un acercamiento sospechoso. Despertado en medio de la noche, Pablo se sorprende con un visitante y malas noticias.", thumb: "https://static.wixstatic.com/media/859174_b9340379a4f24c1699182b5994ceb466~mv2.jpg", url: "https://ok.ru/videoembed/15231883676160" },
  { id: 29, title: "Iglesia de Corinto", dur: "00:38:40", desc: "Molesta por haber sido confrontada, Rode le revela su secreto a su esposo. Después de escuchar el relato de Timoteo, Pablo pide un momento a solas.", thumb: "https://static.wixstatic.com/media/859174_e95ac02e68e941b0a3ca28e0b43ae94b~mv2.jpg", url: "https://ok.ru/videoembed/15231945083392" },
  { id: 30, title: "Arena de los leones", dur: "00:31:55", desc: "En un evento dedicado a Diana, Pablo y otros prisioneros son la atracción principal. Antes de un momento crucial, Trófimo hace una promesa.", thumb: "https://static.wixstatic.com/media/859174_7cfcde08f3f445db92ae3652870dc2e3~mv2.jpg", url: "https://ok.ru/videoembed/15231946197504" },
  { id: 31, title: "Más grande que Diana", dur: "00:40:51", desc: "De regreso en la arena, Pablo habla con el pueblo de Éfeso hasta que una interrupción alborotada desvía la atención de todos. En Troade, Lucas y Gabriela se ven sorprendidos por un incidente inusual.", thumb: "https://static.wixstatic.com/media/859174_43ef8a2b33244ca0816e6b980d28ed98~mv2.jpg", url: "https://ok.ru/videoembed/15232133040640" },
  { id: 32, title: "Carta a los Corintios", dur: "00:43:57", desc: "Causando alboroto en Jerusalén, un ejemplo cruel llega acompañado de un mensaje a Roma. Aún recuperándose, Pablo hace una petición importante a Sóstenes.", thumb: "https://static.wixstatic.com/media/859174_b2c28dc377934cf89c42837aed4e487e~mv2.jpg", url: "https://ok.ru/videoembed/15232133564928" },
  { id: 33, title: "Los hijos de Ceva", dur: "00:40:03", desc: "Con nobles y siervos en roles invertidos, Roma celebra la Saturnalia. Al ser confrontado por Ceva y sus hijos, Pablo hace una prueba.", thumb: "https://static.wixstatic.com/media/859174_4b8209c89f82418bb2ce47ca9d1d05b1~mv2.jpg", url: "https://ok.ru/videoembed/15232133827072" },
  { id: 34, title: "Pablo y Apolos", dur: "00:47:50", desc: "En conversación con Apolos, Pablo le hace una pregunta crucial. Para aclarar las cosas, Lucas tiene una conversación sincera con Gabriela.", thumb: "https://static.wixstatic.com/media/859174_577dbc6820bd4b9fa6d07bf5a4ec5e31~mv2.jpg", url: "https://ok.ru/videoembed/15232539429376" },
  { id: 35, title: "Motín en Éfeso", dur: "00:48:13", desc: "En conversación con Pablo, Apolos hace una revelación. De regreso en Jerusalén, Rode arriesga un reencuentro.", thumb: "https://static.wixstatic.com/media/859174_715571cdfabe40d3bef042e9801f1b9d~mv2.jpg", url: "https://ok.ru/videoembed/15232540150272" },
  { id: 36, title: "Bernabé y Marcos", dur: "00:47:49", desc: "Con todos reunidos a la orilla del río, Pablo es interrumpido por una confesión. Tomando a todos por sorpresa, Marcos reaparece en Jerusalén.", thumb: "https://static.wixstatic.com/media/859174_1582217171704cb7b41f1223b3a59e27~mv2.jpg", url: "https://ok.ru/videoembed/15232540477952" },
  { id: 37, title: "Caída de Eutico", dur: "00:46:31", desc: "En un viaje, Pablo y Lucas conversan acerca de Gabriela. Durante la reunión en el cenáculo de Carpo, un incidente impactante deja a todos sin reacción.", thumb: "https://static.wixstatic.com/media/859174_4343e13148d64f1d8ca6e2cf64ac00d2~mv2.jpg", url: "https://ok.ru/videoembed/15232541329920" },
  { id: 38, title: "Como el címbalo", dur: "00:43:31", desc: "Ante toda Roma, Nerón ofrece una representación teatral. Al ser cuestionado por Gabriela, Pablo le hace saber acerca de un plan suyo.", thumb: "https://static.wixstatic.com/media/859174_7577484f57334c70a1a7de9469da6a29~mv2.jpg", url: "https://ok.ru/videoembed/15232541919744" },
  { id: 39, title: "Despedida en Mileto", dur: "00:42:27", desc: "Reunido con los cristianos de Asia, Pablo hace un anuncio doloroso. En Roma, la reacción del pueblo respecto a Octavia obliga a Nerón a tomar una decisión.", thumb: "https://static.wixstatic.com/media/859174_b7d5d69cc8cc4db79d529226ca2954cf~mv2.jpg", url: "https://ok.ru/videoembed/15232542247424" },
  { id: 40, title: "Llegada a Jerusalén", dur: "00:46:21", desc: "Con el fin de aclarar el trabajo con los gentiles, Pablo solicita una reunión. Aún en busca de Acte, Nerón utiliza uno de sus talentos para ayudar en la búsqueda.", thumb: "https://static.wixstatic.com/media/859174_d2a0b4e69cc7427bb54ecda2b2657732~mv2.jpg", url: "https://ok.ru/videoembed/15232542640640" },
  { id: 41, title: "Prisión en Jerusalén", dur: "00:56:12", desc: "Ya bajo el dominio de los guardias, Pablo es acusado por Alejandro y Himeneo. En medio de la confusión en las calles de Jerusalén, Jonatán recibe un ultimátum.", thumb: "https://static.wixstatic.com/media/859174_50e8cdd261a541ff83a77abd4ea64edb~mv2.jpg", url: "https://ok.ru/videoembed/15232686164480" },
  { id: 42, title: "Ante el Sanedrín", dur: "00:50:13", desc: "En la cárcel de Jerusalén, Pablo recibe un visitante inesperado. Llegando sin avisar, Nerón aparece en la casa de Rode en busca de respuestas.", thumb: "https://static.wixstatic.com/media/859174_e5776b3e3033427982e2440dc7c3e6c4~mv2.jpg", url: "https://ok.ru/videoembed/10109018966591" },
  { id: 43, title: "Prisión en Cesarea", dur: "00:55:36", desc: "En la cárcel, Pablo es sorprendido con una visita. En Roma, Rode se emociona con un reencuentro.", thumb: "https://static.wixstatic.com/media/859174_e4cedfffe1f840629952b7e9ba6aa64d~mv2.jpg", url: "https://ok.ru/videoembed/10109019621951" },
  { id: 44, title: "Dos años después", dur: "00:50:42", desc: "Aún en Cesarea, Félix disfruta al hacer una revelación sobre Gabriela a Pablo. Visitando a Octavia, Agripina encuentra el triunfo que necesitaba.", thumb: "https://static.wixstatic.com/media/859174_012d0754ca9e46d98445548726b4c460~mv2.jpg", url: "https://ok.ru/videoembed/10221071501887" },
  { id: 45, title: "Agripa y Pablo", dur: "00:39:57", desc: "En juicio ante las principales autoridades de Judea, Pablo hace su defensa. Por boca de Popea, Nerón recibe una dolorosa noticia.", thumb: "https://static.wixstatic.com/media/859174_dae6f69bc28c4ef88b3208a86d9fe8d5~mv2.jpg", url: "https://ok.ru/videoembed/10221072419391" },
  { id: 46, title: "Naufragio", dur: "00:36:05", desc: "En contra de las advertencias de Pablo, el capitán del barco decide continuar el viaje hacia Roma. Sin poder seguir esperando noticias, Gabriela decide partir de Jerusalén.", thumb: "https://static.wixstatic.com/media/859174_132383fd0c584ed7b3f3fc55f08e265d~mv2.jpg", url: "https://ok.ru/videoembed/10221073140287" },
  { id: 47, title: "La víbora", dur: "00:37:03", desc: "Hace tiempo que no hay noticias, y todos se preocupan por el paradero de Pablo. Bajo la atenta mirada de Popea, Nerón hace una pregunta inesperada a Rode.", thumb: "https://static.wixstatic.com/media/859174_5c1999eb78184a6caa74be444eb8aeb7~mv2.jpg", url: "https://ok.ru/videoembed/10221074057791" },
  { id: 48, title: "Muerte en Jerusalén", dur: "00:46:21", desc: "Confesando sus motivos, Nerón hace una petición a Pablo. En Jerusalén, se cumple una antigua amenaza del Sanedrín.", thumb: "https://static.wixstatic.com/media/859174_969d22d6b7db4bd588c753b8348bbac2~mv2.jpg", url: "https://ok.ru/videoembed/10221075630655" },
  { id: 49, title: "El juicio de Pablo", dur: "00:54:23", desc: "Durante una conversación con Nerón, Pablo se sorprende por el regalo traído por Popea. Con crueldad, los sicarios proponen un intercambio a Albino y Ananías.", thumb: "https://static.wixstatic.com/media/859174_8e0784c1cc3b46e5b765f7a38372444c~mv2.jpg", url: "https://ok.ru/videoembed/10221145623103" },
  { id: 50, title: "El fin", dur: "01:10:07", desc: "Reunido con los senadores para tratar sobre el incendio, Nerón se ve en una posición conflictiva. Contrariando sus sentimientos, Pablo toma una decisión arriesgada.", thumb: "https://static.wixstatic.com/media/859174_feda1b846fad4ae0b3a7aec08be13a76~mv2.jpg", url: "https://ok.ru/videoembed/10221146540607" }
];

const PabloElApostol_PC = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [inMyList, setInMyList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const SERIES_ID = 17; 

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

    const savedEp = localStorage.getItem('pablo_last_ep');
    if (savedEp) {
      const idx = parseInt(savedEp);
      if (idx < pabloEpisodes.length) setCurrentIdx(idx);
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
      const filtered = allSeries.filter(serie => {
        const titleNormalized = normalize(serie.title);
        const categoryNormalized = normalize(serie.category || "");
        return titleNormalized.includes(term) || categoryNormalized.includes(term);
      });
      setSearchResults(filtered);
    } else { setSearchResults([]); }
  }, [searchQuery]);

  const openEpisode = (idx: number) => {
    setCurrentIdx(idx);
    setSelectedVideo(pabloEpisodes[idx].url);
    localStorage.setItem('pablo_last_ep', idx.toString());
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
      <Head><title>Pablo, El Apóstol — Estudios 421</title></Head>

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
            {[{ n: '', img: '367960b11c1c44ba89cd1582fd1b5776', p: '/serie/pablo-el-apostol' }, 
              { n: 'en', img: '35112d9ffe234d6f9dcef16cf8f7544e', p: '/en/series/paul-the-apostle' }, 
              { n: 'pt', img: '830f1c20656e4d44a819bedfc13a22cc', p: '/pt/serie/paulo-o-apostolo' }].map((l) => (
              <Link key={l.n} href={l.p}><img src={`https://static.wixstatic.com/media/859174_${l.img}~mv2.png`} className="w-7 h-7 object-contain cursor-pointer hover:scale-110 transition-transform" /></Link>
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
        <img src="https://static.wixstatic.com/media/859174_f01cdd77f3ed433d994505ae828c5db1~mv2.jpg" className="w-full h-full object-cover" alt="Banner Pablo El Apóstol" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/10 opacity-70" />
        <div className="absolute bottom-[-30px] left-16 flex gap-6 z-20 items-center">
          <button onClick={() => openEpisode(currentIdx)} className="bg-white text-black font-black py-4 px-12 rounded-sm text-lg hover:bg-[#FF8A00] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-2xl uppercase">
            {currentIdx === 0 ? "▶ Ver Ahora" : `▶ Continuar Ep. ${pabloEpisodes[currentIdx].id}`}
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
          {pabloEpisodes.map((ep, index) => (
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
                <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed h-8 text-justify">{ep.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 z-[1000] bg-[#050608] flex flex-col animate-fade-in">
          <div className="h-[12vh] min-h-[85px] px-12 flex items-center justify-between bg-gradient-to-b from-[#0a0b0d] to-[#050608] border-b border-white/5">
            <div className="flex flex-col border-l-4 border-[#FF8A00] pl-6 py-1 text-left">
              <span className="text-[10px] font-black text-[#FF8A00]/80 uppercase tracking-[0.5em] mb-1">Serie: Pablo, El Apóstol</span>
              <h2 className="text-2xl font-black tracking-tighter uppercase leading-none">Capítulo {pabloEpisodes[currentIdx].id} <span className="text-white/10 mx-3">/</span> {pabloEpisodes[currentIdx].title}</h2>
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
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] group-hover:bg-white group-hover:text-black transition-all shadow-xl">
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
            <button disabled={currentIdx === pabloEpisodes.length - 1} onClick={() => openEpisode(currentIdx + 1)} className="group flex items-center gap-6 disabled:opacity-5 transition-all">
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
        .unselectable { -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-touch-callout: none; }
        img { pointer-events: none !important; -webkit-user-drag: none !important; }
        body { -webkit-user-select: none; user-select: none; }
      `}</style>
    </div>
  );
};

export default PabloElApostol_PC;
