import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { IoSearchOutline, IoChevronBack, IoChevronForward, IoList, IoClose } from 'react-icons/io5';
// Importaciones corregidas para evitar fallos en Render
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { allSeries } from '../../../data/series';

const pabloEpisodes = [
  { id: 1, title: "Yo soy fariseo", dur: "00:48:15", desc: "De regreso en Jerusalén, Saulo descubre algo sobre su prometida...", thumb: "https://static.wixstatic.com/media/859174_bc7bb5bca3b945679b42140b328190bb~mv2.jpg", url: "https://ok.ru/videoembed/15046009489920" },
  { id: 2, title: "No te culpes por eso", dur: "00:46:45", desc: "Con intenciones cuestionables, Caifás le hace una propuesta a Saulo...", thumb: "https://static.wixstatic.com/media/859174_e02a7db2f26647ddafb20e721182fb56~mv2.jpg", url: "https://ok.ru/videoembed/15046314297856" },
  { id: 3, title: "Ir en contra de Dios", dur: "00:45:09", desc: "Sabiendo dónde encontrar al novio, Gabriela va a su encuentro para confrontarlo...", thumb: "https://static.wixstatic.com/media/859174_59d8754b1047471cab6eb4e2e4bc5ed9~mv2.jpg", url: "https://ok.ru/videoembed/15055683062272" },
  { id: 4, title: "¿Por qué me persigues?", dur: "00:45:03", desc: "Al caer del caballo, Saulo es abordado de manera inesperada...", thumb: "https://static.wixstatic.com/media/859174_ef5088ba6ca04f129a6929e2a35d69b4~mv2.jpg", url: "https://ok.ru/videoembed/15055683521024" },
  { id: 5, title: "Nuestro pan de cada día", dur: "00:52:30", desc: "Al notar un movimiento extraño en la ciudad, Ananías y Bernabé se ponen en alerta...", thumb: "https://static.wixstatic.com/media/859174_75104984b2d342f2b2560964c0288ce4~mv2.jpg", url: "https://ok.ru/videoembed/15055762885120" },
  { id: 6, title: "Llámame Pablo", dur: "00:50:08", desc: "Frente a frente con los apóstoles, Pablo es interrogado por ellos...", thumb: "https://static.wixstatic.com/media/859174_fdd82b41ec0c444a9a8a64590cd46f63~mv2.jpg", url: "https://ok.ru/videoembed/15055987870208" },
  { id: 7, title: "A mi lado", dur: "00:36:47", desc: "Acompañando a los apóstoles por Jerusalén, Pablo se encuentra con visitantes griegos...", thumb: "https://static.wixstatic.com/media/859174_5bd0d8d2c6684bc6971655334e95e6ca~mv2.jpg", url: "https://ok.ru/videoembed/15055988394496" },
  { id: 8, title: "¿Puedo explicar, familia?", dur: "00:41:09", desc: "De vuelta en casa, Pablo enfrenta la reacción de sus familiares...", thumb: "https://static.wixstatic.com/media/859174_ed162d2336b94bacaecaa933701e29b2~mv2.jpg", url: "https://ok.ru/videoembed/15055988656640" },
  { id: 9, title: "Petición de perdón", dur: "00:43:45", desc: "Saliendo de Tarso, Pablo y Bernabé se enfrentan a una invitada inesperada...", thumb: "https://static.wixstatic.com/media/859174_0c91524b65a74f5e87f3cb50e7148d2f~mv2.jpg", url: "https://ok.ru/videoembed/15055988853248" },
  { id: 10, title: "Yo llegaré primero", dur: "00:41:44", desc: "Frente a Herodes, los apóstoles intentan calmar la situación en el pórtico...", thumb: "https://static.wixstatic.com/media/859174_6a22ea0a0917448cbbd5c91f19310a48~mv2.jpg", url: "https://ok.ru/videoembed/15055989049856" },
  { id: 11, title: "Hay una criatura en él", dur: "00:45:14", desc: "En medio de la animación y la euforia, los juegos en Cesarea se interrumpen...", thumb: "https://static.wixstatic.com/media/859174_a78129abb97d4917b2c0b91474280bb5~mv2.jpg", url: "https://ok.ru/videoembed/15055989312000" },
  { id: 12, title: "Júpiter y Mercurio", dur: "00:39:39", desc: "Incitados por los religiosos, el pueblo de Antioquía toma una actitud definitiva...", thumb: "https://static.wixstatic.com/media/859174_e3c3ca6abe4c405ebf6635963912faa9~mv2.jpg", url: "https://ok.ru/videoembed/15055989639680" },
  { id: 13, title: "La cuestión de la circuncisión", dur: "00:48:11", desc: "Movida por buenas intenciones, Gabriela acepta una invitación cuestionable...", thumb: "https://static.wixstatic.com/media/859174_3268d80fdb63432c8c0ccd51e454d005~mv2.jpg", url: "https://ok.ru/videoembed/15055989770752" },
  { id: 14, title: "¿Por qué, Pedro?", dur: "00:44:51", desc: "Después de pedir explicaciones, Cumano le hace una solicitud a Gamaliel...", thumb: "https://static.wixstatic.com/media/859174_fd5467fe1e384aa3be14dabf9baecce7~mv2.jpg", url: "https://ok.ru/videoembed/15080759822848" },
  { id: 15, title: "¡Marcos no va!", dur: "00:45:05", desc: "Con los ánimos a flor de piel, Rode hace una revelación impactante...", thumb: "https://static.wixstatic.com/media/859174_351a542876c048278d86c2989359d880~mv2.jpg", url: "https://ok.ru/videoembed/15080760084992" },
  { id: 16, title: "Hola, Lucas", dur: "00:49:03", desc: "Resuelta, Rode toma una decisión definitiva sobre Agripa...", thumb: "https://static.wixstatic.com/media/859174_77aa8aba96ab45f78dab6118caa7e65c~mv2.jpg", url: "https://ok.ru/videoembed/15080760347136" },
  { id: 17, title: "Sí, yo soy Nero", dur: "00:48:09", desc: "Al compartir una parte de su pasado, Lucas le hace una petición a Pablo...", thumb: "https://static.wixstatic.com/media/859174_264ee56696b042dba62dbf6470cd9456~mv2.jpg", url: "https://ok.ru/videoembed/15460298328576" },
  { id: 18, title: "Quita de mí este deseo", dur: "00:48:09", desc: "Después de un ultimátum, Pablo acepta la invitación hospitalaria de Lidia...", thumb: "https://static.wixstatic.com/media/859174_b57dbd2a47ff485d8c32d6f278adb6be~mv2.jpg", url: "https://ok.ru/videoembed/15080760674816" },
  { id: 19, title: "¡Un terremoto!", dur: "00:58:16", desc: "Prisionero en la cárcel de Filipos con Silas, Pablo impide un acto drástico...", thumb: "https://static.wixstatic.com/media/859174_2d7e61bd557a49e4810bc6f0bd04dc10~mv2.jpg", url: "https://ok.ru/videoembed/15166752164352" },
  { id: 20, title: "¿Me amas?", dur: "00:51:15", desc: "En Tesalónica, Pablo se sorprende con la aparición de un viejo perseguidor...", thumb: "https://static.wixstatic.com/media/859174_80645a67b00a47e78cfb1442d995dbad~mv2.jpg", url: "https://ok.ru/videoembed/15166754130432" },
  { id: 21, title: "Pablo en Atenas", dur: "00:51:12", desc: "Al debatir con los filósofos, Pablo es convocado al Areópago...", thumb: "https://static.wixstatic.com/media/859174_b39b759c2fed4959aaee0dac58a773be~mv2.jpg", url: "https://ok.ru/videoembed/15231880333824" },
  { id: 22, title: "¡Vive para mí!", dur: "00:56:06", desc: "Con la persecución llegando a un punto crítico, Pablo toma una decisión...", thumb: "https://static.wixstatic.com/media/859174_02a5725c44af4de986b52eb8b185a279~mv2.jpg", url: "https://ok.ru/videoembed/15231880530432" },
  { id: 23, title: "Juegos ístmicos", dur: "00:43:03", desc: "Al ver la agitación de la ciudad, Pablo decide seguir una inspiración audaz...", thumb: "https://static.wixstatic.com/media/859174_89ece7d660e94146af8d1438b75b6d80~mv2.jpg", url: "https://ok.ru/videoembed/15231881054720" },
  { id: 24, title: "Reunión en Corinto", dur: "00:55:19", desc: "En medio de teatro lleno de gente, Pablo se sorprende con un reencuentro...", thumb: "https://static.wixstatic.com/media/859174_430ad0ce03d64760a9ecccd910045005~mv2.jpg", url: "https://ok.ru/videoembed/15231881972224" },
  { id: 25, title: "Pascua", dur: "00:35:38", desc: "Con los apóstoles reunidos, el regreso de Pablo causa reacciones...", thumb: "https://static.wixstatic.com/media/859174_7356ff96dba440aa960a5364d0599986~mv2.jpg", url: "https://ok.ru/videoembed/15231882562048" },
  { id: 26, title: "Espina en la carne", dur: "00:40:58", desc: "Mientras Pablo está acorralado, una intervención inesperada pone los ánimos al límite...", thumb: "https://static.wixstatic.com/media/859174_8e5469e76e894c4296dfda6af10010e3~mv2.jpg", url: "https://ok.ru/videoembed/15231882955264" },
  { id: 27, title: "Hechos de los Apóstoles", dur: "00:47:03", desc: "Santiago es confrontado por Susana acerca de su postura...", thumb: "https://static.wixstatic.com/media/859174_80e260df21454203a7b0d4b8210b7c88~mv2.jpg", url: "https://ok.ru/videoembed/15231883282944" },
  { id: 28, title: "¿Quién es Apolo?", dur: "00:41:08", desc: "Despertado en medio de la noche, Pablo se sorprende con un visitante...", thumb: "https://static.wixstatic.com/media/859174_b9340379a4f24c1699182b5994ceb466~mv2.jpg", url: "https://ok.ru/videoembed/15231883676160" },
  { id: 29, title: "Iglesia de Corinto", dur: "00:38:40", desc: "Rode le revela su secreto a su esposo. Pablo pide un momento a solas...", thumb: "https://static.wixstatic.com/media/859174_e95ac02e68e941b0a3ca28e0b43ae94b~mv2.jpg", url: "https://ok.ru/videoembed/15231945083392" },
  { id: 30, title: "Arena de los leones", dur: "00:31:55", desc: "Pablo y otros prisioneros son la atracción principal en un evento dedicado a Diana...", thumb: "https://static.wixstatic.com/media/859174_7cfcde08f3f445db92ae3652870dc2e3~mv2.jpg", url: "https://ok.ru/videoembed/15231946197504" },
  { id: 31, title: "Más grande que Diana", dur: "00:40:51", desc: "De regreso en la arena, Pablo habla con el pueblo de Éfeso...", thumb: "https://static.wixstatic.com/media/859174_43ef8a2b33244ca0816e6b980d28ed98~mv2.jpg", url: "https://ok.ru/videoembed/15232133040640" },
  { id: 32, title: "Carta a los Corintios", dur: "00:43:57", desc: "Pablo hace una petición importante a Sóstenes...", thumb: "https://static.wixstatic.com/media/859174_b2c28dc377934cf89c42837aed4e487e~mv2.jpg", url: "https://ok.ru/videoembed/15232133564928" },
  { id: 33, title: "Los hijos de Ceva", dur: "00:40:03", desc: "Roma celebra la Saturnalia. Pablo hace una prueba ante los hijos de Ceva...", thumb: "https://static.wixstatic.com/media/859174_4b8209c89f82418bb2ce47ca9d1d05b1~mv2.jpg", url: "https://ok.ru/videoembed/15232133827072" },
  { id: 34, title: "Pablo y Apolos", dur: "00:47:50", desc: "Pablo le hace una pregunta crucial a Apolos...", thumb: "https://static.wixstatic.com/media/859174_577dbc6820bd4b9fa6d07bf5a4ec5e31~mv2.jpg", url: "https://ok.ru/videoembed/15232539429376" },
  { id: 35, title: "Motín en Éfeso", dur: "00:48:13", desc: "De regreso en Jerusalén, Rode arriesga un reencuentro...", thumb: "https://static.wixstatic.com/media/859174_715571cdfabe40d3bef042e9801f1b9d~mv2.jpg", url: "https://ok.ru/videoembed/15232540150272" },
  { id: 36, title: "Bernabé y Marcos", dur: "00:47:49", desc: "Pablo es interrumpido por una confesión. Marcos reaparece en Jerusalén...", thumb: "https://static.wixstatic.com/media/859174_1582217171704cb7b41f1223b3a59e27~mv2.jpg", url: "https://ok.ru/videoembed/15232540477952" },
  { id: 37, title: "Caída de Eutico", dur: "00:46:31", desc: "Un incidente impactante deja a todos sin reacción durante la reunión...", thumb: "https://static.wixstatic.com/media/859174_4343e13148d64f1d8ca6e2cf64ac00d2~mv2.jpg", url: "https://ok.ru/videoembed/15232541329920" },
  { id: 38, title: "Como el címbalo", dur: "00:43:31", desc: "Al ser cuestionado por Gabriela, Pablo revela su plan...", thumb: "https://static.wixstatic.com/media/859174_7577484f57334c70a1a7de9469da6a29~mv2.jpg", url: "https://ok.ru/videoembed/15232541919744" },
  { id: 39, title: "Despedida en Mileto", dur: "00:42:27", desc: "Reunido con los cristianos de Asia, Pablo hace un anuncio doloroso...", thumb: "https://static.wixstatic.com/media/859174_b7d5d69cc8cc4db79d529226ca2954cf~mv2.jpg", url: "https://ok.ru/videoembed/15232542247424" },
  { id: 40, title: "Llegada a Jerusalén", dur: "00:46:21", desc: "Pablo solicita una reunión para aclarar el trabajo con los gentiles...", thumb: "https://static.wixstatic.com/media/859174_d2a0b4e69cc7427bb54ecda2b2657732~mv2.jpg", url: "https://ok.ru/videoembed/15232542640640" },
  { id: 41, title: "Prisión en Jerusalén", dur: "00:56:12", desc: "Pablo es acusado por Alejandro y Himeneo bajo el dominio de los guardias...", thumb: "https://static.wixstatic.com/media/859174_50e8cdd261a541ff83a77abd4ea64edb~mv2.jpg", url: "https://ok.ru/videoembed/15232686164480" },
  { id: 42, title: "Ante el Sanedrín", dur: "00:50:13", desc: "Pablo recibe un visitante inesperado en la cárcel de Jerusalén...", thumb: "https://static.wixstatic.com/media/859174_e5776b3e3033427982e2440dc7c3e6c4~mv2.jpg", url: "https://ok.ru/videoembed/15323825637888" },
  { id: 43, title: "Prisión en Cesarea", dur: "00:55:36", desc: "En Roma, Rode se emociona con un reencuentro...", thumb: "https://static.wixstatic.com/media/859174_e4cedfffe1f840629952b7e9ba6aa64d~mv2.jpg", url: "https://ok.ru/videoembed/15323826227712" },
  { id: 44, title: "Dos años después", dur: "00:50:42", desc: "Aún en Cesarea, Félix disfruta al hacer una revelación a Pablo...", thumb: "https://static.wixstatic.com/media/859174_012d0754ca9e46d98445548726b4c460~mv2.jpg", url: "https://ok.ru/videoembed/15392795986432" },
  { id: 45, title: "Agripa y Pablo", dur: "00:39:57", desc: "En juicio ante las autoridades de Judea, Pablo hace su defensa...", thumb: "https://static.wixstatic.com/media/859174_dae6f69bc28c4ef88b3208a86d9fe8d5~mv2.jpg", url: "https://ok.ru/videoembed/15392796248576" },
  { id: 46, title: "Naufragio", dur: "00:36:05", desc: "Contra las advertencias de Pablo, el barco decide continuar el viaje...", thumb: "https://static.wixstatic.com/media/859174_132383fd0c584ed7b3f3fc55f08e265d~mv2.jpg", url: "https://ok.ru/videoembed/15392796707328" },
  { id: 47, title: "La víbora", dur: "00:37:03", desc: "Todos se preocupan por el paradero de Pablo. Nerón interroga a Rode...", thumb: "https://static.wixstatic.com/media/859174_5c1999eb78184a6caa74be444eb8aeb7~mv2.jpg", url: "https://ok.ru/videoembed/15392796969472" },
  { id: 48, title: "Muerte en Jerusalén", dur: "00:46:21", desc: "Se cumple una antigua amenaza del Sanedrín en Jerusalén...", thumb: "https://static.wixstatic.com/media/859174_969d22d6b7db4bd588c753b8348bbac2~mv2.jpg", url: "https://ok.ru/videoembed/15392797362688" },
  { id: 49, title: "El juicio de Pablo", dur: "00:54:23", desc: "Pablo se sorprende por el regalo traído por Popea durante su conversación con Nerón...", thumb: "https://static.wixstatic.com/media/859174_8e0784c1cc3b46e5b765f7a38372444c~mv2.jpg", url: "https://ok.ru/videoembed/15460301146624" },
  { id: 50, title: "El fin", dur: "01:10:07", desc: "Contrariando sus sentimientos, Pablo toma una decisión arriesgada...", thumb: "https://static.wixstatic.com/media/859174_feda1b846fad4ae0b3a7aec08be13a76~mv2.jpg", url: "https://ok.ru/videoembed/15460341975552" }
];

const PabloElApostol_TV = () => {
  const [section, setSection] = useState(0); // 0: Nav, 1: Hero, 2: Episodios, 3: Modal
  const [index, setIndex] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (section === 0) {
      if (e.key === 'ArrowRight') setIndex((prev) => Math.min(prev + 1, 7));
      if (e.key === 'ArrowLeft') setIndex((prev) => Math.max(prev - 1, 0));
      if (e.key === 'ArrowDown') { setSection(1); setIndex(0); }
    } 
    else if (section === 1) {
      if (e.key === 'ArrowRight') setIndex((prev) => Math.min(prev + 1, 2));
      if (e.key === 'ArrowLeft') setIndex((prev) => Math.max(prev - 1, 0));
      if (e.key === 'ArrowUp') { setSection(0); setIndex(0); }
      if (e.key === 'ArrowDown') { setSection(2); setIndex(0); }
    } 
    else if (section === 2) {
      if (e.key === 'ArrowRight') setIndex((prev) => Math.min(prev + 1, pabloEpisodes.length - 1));
      if (e.key === 'ArrowLeft') setIndex((prev) => Math.max(prev - 1, 0));
      if (e.key === 'ArrowUp') {
        if (index < 4) { setSection(1); setIndex(0); }
        else setIndex((prev) => prev - 4);
      }
      if (e.key === 'ArrowDown' && index + 4 < pabloEpisodes.length) setIndex((prev) => prev + 4);
      const row = Math.floor(index / 4);
      window.scrollTo({ top: 500 + row * 300, behavior: 'smooth' });
    }
    else if (section === 3) {
      if (e.key === 'ArrowRight') setIndex((prev) => Math.min(prev + 1, 3));
      if (e.key === 'ArrowLeft') setIndex((prev) => Math.max(prev - 1, 0));
    }

    if (e.key === 'Enter') {
      if (section === 1 && index === 0) openEpisode(currentIdx);
      if (section === 2) openEpisode(index);
      if (section === 3) {
        if (index === 0) closePlayer();
        if (index === 1 && currentIdx > 0) openEpisode(currentIdx - 1);
        if (index === 3 && currentIdx < pabloEpisodes.length - 1) openEpisode(currentIdx + 1);
      }
    }
    if (e.key === 'Backspace' || e.key === 'Escape') closePlayer();
  }, [section, index, currentIdx]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const openEpisode = (idx: number) => {
    setCurrentIdx(idx);
    setSelectedVideo(pabloEpisodes[idx].url);
    setSection(3); setIndex(3);
  };

  const closePlayer = () => { setSelectedVideo(null); setSection(2); };

  return (
    <div className="bg-black min-h-screen text-white font-sans overflow-hidden">
      <Head><title>Smart TV - Pablo El Apóstol</title></Head>

      <nav className={`fixed top-0 w-full z-[130] p-8 flex items-center justify-between transition-all ${section === 0 ? 'bg-black/90' : 'bg-transparent'}`}>
        <div className="flex items-center gap-10">
          <img src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" className="w-[180px] object-contain" alt="Logo" />
          <div className="flex gap-8">
            {['Inicio', 'Series Bíblicas', 'Series TV', 'Películas'].map((item, i) => (
              <span key={item} className={`text-xl font-bold transition-all ${section === 0 && index === i ? 'text-[#FF8A00] scale-125 border-b-4 border-[#FF8A00]' : 'text-white/60'}`}>{item}</span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex gap-4">
            {['ES', 'EN', 'PT'].map((lang, i) => (
              <div key={lang} className={`p-1 rounded-full border-4 transition-all ${section === 0 && index === (i + 4) ? 'border-[#FF8A00] scale-125' : 'border-transparent'}`}>
                <img src={`https://static.wixstatic.com/media/859174_${i === 0 ? '367960b11c1c44ba89cd1582fd1b5776' : i === 1 ? '35112d9ffe234d6f9dcef16cf8f7544e' : '830f1c20656e4d44a819bedfc13a22cc'}~mv2.png`} className="w-8 h-8" />
              </div>
            ))}
          </div>
          <div className={`flex items-center bg-white/10 rounded-full px-6 py-2 border-4 transition-all ${section === 0 && index === 7 ? 'border-[#FF8A00] bg-white/20 scale-110' : 'border-transparent'}`}>
            <IoSearchOutline className="text-2xl mr-2" />
            <span className="text-lg">Buscar...</span>
          </div>
        </div>
      </nav>

      <div className="relative w-full h-[85vh]">
        <img src="https://static.wixstatic.com/media/859174_f01cdd77f3ed433d994505ae828c5db1~mv2.jpg" className="w-full h-full object-cover opacity-60" />
        <div className="absolute bottom-20 left-20 z-20 text-left">
          <h1 className="text-7xl font-black uppercase mb-8 italic">Pablo, El Apóstol</h1>
          <div className="flex gap-6">
            <button className={`py-5 px-14 rounded-xl text-2xl font-black uppercase transition-all ${section === 1 && index === 0 ? 'bg-[#FF8A00] text-white scale-110 shadow-[0_0_40px_rgba(255,138,0,0.5)]' : 'bg-white text-black'}`}>▶ Ver Ahora</button>
            <button className={`py-5 px-10 rounded-xl text-2xl font-black uppercase transition-all border-4 ${section === 1 && index === 1 ? 'border-[#FF8A00] bg-white/20 scale-110' : 'border-white/20 bg-white/5'}`}>+ Mi Lista</button>
            <button className={`py-5 px-10 rounded-xl text-2xl font-black uppercase transition-all border-4 ${section === 1 && index === 2 ? 'border-[#FF8A00] bg-white/20 scale-110' : 'border-white/20 bg-white/5'}`}>❤ Donar</button>
          </div>
        </div>
      </div>

      <div className="p-20 text-left">
        <h2 className="text-4xl font-bold mb-10 border-l-8 border-[#FF8A00] pl-6 uppercase tracking-tighter">Episodios Disponibles</h2>
        <div className="grid grid-cols-4 gap-12">
          {pabloEpisodes.map((ep, i) => (
            <div key={ep.id} className={`bg-[#1a1a1a] rounded-3xl overflow-hidden border-8 transition-all duration-300 ${section === 2 && index === i ? 'border-[#FF8A00] scale-110 z-50 shadow-2xl' : 'border-transparent'}`}>
              <div className="relative aspect-video">
                <img src={ep.thumb} className="w-full h-full object-cover" />
                <div className="absolute bottom-4 left-4 bg-black/80 px-4 py-2 rounded-lg text-xl font-black">EP {ep.id}</div>
                <div className="absolute bottom-4 right-4 bg-black/80 px-4 py-2 rounded-lg text-sm font-bold">{ep.dur}</div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold uppercase truncate">{ep.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-2 mt-2">{ep.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 z-[1000] bg-black flex flex-col">
          <div className="h-[15vh] p-12 flex items-center justify-between bg-gradient-to-b from-black to-transparent text-left">
            <div className="border-l-8 border-[#FF8A00] pl-8">
              <span className="text-xl font-bold text-[#FF8A00] uppercase tracking-widest">Serie: Pablo, El Apóstol</span>
              <h2 className="text-4xl font-black uppercase">Capítulo {pabloEpisodes[currentIdx].id}: {pabloEpisodes[currentIdx].title}</h2>
            </div>
            <div className={`p-4 rounded-full border-4 transition-all ${section === 3 && index === 0 ? 'border-[#FF8A00] bg-white/10 scale-125' : 'border-transparent opacity-50'}`}>
                <IoClose size={50} />
            </div>
          </div>
          <div className="flex-grow">
            <iframe src={selectedVideo + "?autoplay=1"} className="w-full h-full border-none" allow="autoplay; fullscreen" />
          </div>
          <div className="h-[15vh] px-20 flex items-center justify-between bg-black">
            <div className={`flex items-center gap-4 p-6 rounded-2xl transition-all ${section === 3 && index === 1 ? 'bg-[#FF8A00] scale-110 shadow-xl' : 'opacity-40'}`}>
                <IoChevronBack size={40} /> <span className="text-2xl font-black">ANTERIOR</span>
            </div>
            <div className={`flex items-center gap-4 p-6 rounded-2xl transition-all ${section === 3 && index === 2 ? 'bg-white/20 border-4 border-[#FF8A00] scale-110' : 'opacity-40'}`}>
                <IoList size={40} /> <span className="text-2xl font-black">CAPÍTULOS</span>
            </div>
            <div className={`flex items-center gap-4 p-6 rounded-2xl transition-all ${section === 3 && index === 3 ? 'bg-[#FF8A00] scale-110 shadow-xl' : 'opacity-40'}`}>
                <span className="text-2xl font-black">SIGUIENTE</span> <IoChevronForward size={40} />
            </div>
          </div>
        </div>
      )}

      <footer className="p-20 bg-[#0a0a0a] border-t border-white/10 flex justify-between text-left">
          <div className="max-w-4xl">
              <p className="text-xl mb-4 text-gray-400">© {new Date().getFullYear()} Estudios 421. Todos los derechos reservados.</p>
              <p className="text-sm text-gray-600 text-justify">Aviso Legal: El contenido audiovisual compartido en este sitio pertenece a sus respectivos propietarios. Estudios 421 es una plataforma sin fines de lucro destinada a la difusión de contenido bíblico.</p>
          </div>
          <div className="flex gap-10 text-4xl text-gray-600">
              <FaFacebookF /> <FaInstagram /> <FaTiktok /> <FaYoutube /> <FaXTwitter />
          </div>
      </footer>
    </div>
  );
};

export default PabloElApostol_TV;
