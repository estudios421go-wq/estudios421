import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoChevronBack, IoChevronForward, IoList, IoClose } from 'react-icons/io5';
import Footer from '../../Footer';

// BASE DE DATOS COMPLETA
const genesisEpisodes = [
  { id: 1, title: "El edén", dur: "43:16", desc: "Historia de la creación y el inicio de la humanidad con Adán y Eva.", thumb: "https://static.wixstatic.com/media/859174_34318cd5b639416e9f54aac740e60a84~mv2.jpg", url: "https://ok.ru/videoembed/13888818973184" },
  { id: 2, title: "Las consecuencias", dur: "43:09", desc: "Adán y Eva enfrentan la expulsión del paraíso tras el fruto prohibido.", thumb: "https://static.wixstatic.com/media/859174_40d433337bf542d68b9965dccb4f0ecd~mv2.jpg", url: "https://ok.ru/videoembed/13888837454336" },
  { id: 3, title: "Hermanos", dur: "42:59", desc: "La historia de Caín y Abel, hijos de Adán y Eva, y sus naturalezas opuestas.", thumb: "https://static.wixstatic.com/media/859174_244fa62379ba4682a6cc03815f3891f6~mv2.jpg", url: "https://ok.ru/videoembed/13888884902400" },
  { id: 4, title: "La opción", dur: "43:00", desc: "Los celos de Caín lo llevan a tomar una decisión trágica sobre su hermano.", thumb: "https://static.wixstatic.com/media/859174_461f6b43b4a7488fb1eca919f954f145~mv2.jpg", url: "https://ok.ru/videoembed/13888885230080" },
  { id: 5, title: "Una idea", dur: "43:08", desc: "Caín encuentra el lugar donde todas sus hermanas se instalaron después de abandonar a su padre.", thumb: "https://static.wixstatic.com/media/859174_dbef8b4ca19a4d868ee8a1903c6e2266~mv2.jpg", url: "https://ok.ru/videoembed/13889027836416" },
  { id: 6, title: "El arca", dur: "43:10", desc: "Noé es hombre bueno entre todas las personas corruptas. Dios le dice que tendrá una misión importante.", thumb: "https://static.wixstatic.com/media/859174_9f5d8e059c484939b2b0dab7b5507dcc~mv2.jpg", url: "https://ok.ru/videoembed/14047823858176" },
  { id: 7, title: "Diversión", dur: "43:17", desc: "Cam es uno de los hijos de Noé y está casado con Tali, una joven mujer que anhela más diversión.", thumb: "https://static.wixstatic.com/media/859174_2392fed4b52547639e8a7c715c24053b~mv2.jpg", url: "https://ok.ru/videoembed/14047824251392" },
  { id: 8, title: "El diluvio", dur: "43:13", desc: "Noé está muy preocupado por Cam y Tali, ya que todos han visto volar a las aves.", thumb: "https://static.wixstatic.com/media/859174_ccedf26c92af4a2ebb28622d2a3f97e6~mv2.jpg", url: "https://ok.ru/videoembed/14150140692992" },
  { id: 9, title: "En el arca", dur: "43:23", desc: "Noé y su familia permanecen en el arca por cuarenta días y noches.", thumb: "https://static.wixstatic.com/media/859174_2fe22f1a0cc848a0bd2b738564c5677e~mv2.jpg", url: "https://ok.ru/videoembed/14047825103360" },
  { id: 10, title: "El cazador", dur: "44:01", desc: "Después de muchos años, las comunidades vuelven a construirse y en una de ellas hay un gran cazador, Nimrod.", thumb: "https://static.wixstatic.com/media/859174_ce86e737968e44c9bd36e646d83851b8~mv2.jpg", url: "https://ok.ru/videoembed/14047825234432" },
  { id: 11, title: "Una torre", dur: "43:31", desc: "Nimrod tiene una idea: construir una torre, tan alta que todo el mundo pueda verla.", thumb: "https://static.wixstatic.com/media/859174_f4f66373b8f440d9b7a63ce06c75fc22~mv2.jpg", url: "https://ok.ru/videoembed/14047825562112" },
  { id: 12, title: "La construcción", dur: "43:42", desc: "Comienza la construcción de la torre y Nimrod trata de convencer a todos de trabajar muy duro.", thumb: "https://static.wixstatic.com/media/859174_10f2d191f7824755918d684f759dd5d1~mv2.jpg", url: "https://ok.ru/videoembed/14047825758720" },
  { id: 13, title: "Una diosa", dur: "43:40", desc: "Guiada por las fuerzas de la maldad, Semiramis comienza a obtener extraños poderes.", thumb: "https://static.wixstatic.com/media/859174_7922e780a36d48c08cc6545cb2aa269e~mv2.jpg", url: "https://ok.ru/videoembed/14047826020864" },
  { id: 14, title: "Mucho peligro", dur: "43:54", desc: "Nimrod decide alejar a su amada Liba, para evitar que su madre le pueda hacer daño.", thumb: "https://static.wixstatic.com/media/859174_e21ef51160c74d4a8942c3c516f59b21~mv2.jpg", url: "https://ok.ru/videoembed/14047826414080" },
  { id: 15, title: "Babel", dur: "43:14", desc: "Nimrod es hechizado por su madre y él está cansado de la enferma relación que tienen.", thumb: "https://static.wixstatic.com/media/859174_7dacb459702d4d13a4ea6cf4e7cec3e2~mv2.jpg", url: "https://ok.ru/videoembed/14047826610688" },
  { id: 16, title: "Varios lenguajes", dur: "41:57", desc: "Tras la caída de la torre de Babel, las personas crearon diferentes sitios para vivir.", thumb: "https://static.wixstatic.com/media/859174_66158e2f7e384ee48002082e65f05f0c~mv2.jpg", url: "https://ok.ru/videoembed/14047826807296" },
  { id: 17, title: "El negociador", dur: "42:43", desc: "Taré visita al sacerdote real en el templo de Ur y ahí recibe una misión.", thumb: "https://static.wixstatic.com/media/859174_8bc61a7bf93a4016990f95d39558f86d~mv2.jpg", url: "https://ok.ru/videoembed/14150138399232" },
  { id: 18, title: "La misión", dur: "42:57", desc: "Taré va a visitar a un viejo hurán al que tiene que convencer de entregarle sus cabras.", thumb: "https://static.wixstatic.com/media/859174_fe6259ef71b843729b677782cc0d2609~mv2.jpg", url: "https://ok.ru/videoembed/14047827462656" },
  { id: 19, title: "La prueba del queso", dur: "43:24", desc: "Taré ahora tiene que demostrar en el palacio que logró conseguir la receta del ermitaño.", thumb: "https://static.wixstatic.com/media/859174_a66235e1f80c403c890c4721147d8c9a~mv2.jpg", url: "https://ok.ru/videoembed/14047827659264" },
  { id: 20, title: "La caravana", dur: "42:54", desc: "Una nueva prueba le es asignada a Taré: tiene que llevar su primera caravana.", thumb: "https://static.wixstatic.com/media/859174_2dd63647f20d49dbacbf644c0ca802fb~mv2.jpg", url: "https://ok.ru/videoembed/14047828249088" },
  { id: 21, title: "Dificultades", dur: "43:05", desc: "Taré sabe que su tarea no es sencilla y que tendrá que enfrentarse a extraños.", thumb: "https://static.wixstatic.com/media/859174_35b0f74d7cf843e8b65392357aaaf80c~mv2.jpg", url: "https://ok.ru/videoembed/14066036247040" },
  { id: 22, title: "Extraño aliado", dur: "42:57", desc: "Los sacerdotes han enviado a un asesino para que se deshaga de Taré en su misión.", thumb: "https://static.wixstatic.com/media/859174_dcbc50c5bab2441dacfdca8d565b3403~mv2.jpg", url: "https://ok.ru/videoembed/14066242095616" },
  { id: 23, title: "Alta traición", dur: "42:09", desc: "La reina de Ur tiene planes que atentan en contra del Rey, ahora que tendrá nueva esposa.", thumb: "https://static.wixstatic.com/media/859174_b40774fefbb7413083d4999b851867a6~mv2.jpg", url: "https://ok.ru/videoembed/14066390534656" },
  { id: 24, title: "Negociación", dur: "42:39", desc: "Taré logra capturar a uno de los sacerdotes que lo quiere muerto y le dice que tiene que irse.", thumb: "https://static.wixstatic.com/media/859174_e69d267882804bd4a2cb85f3453ec1cf~mv2.jpg", url: "https://ok.ru/videoembed/14066469833216" },
  { id: 25, title: "Seducción", dur: "43:43", desc: "Taré se siente seducido por Nadi y no solo eso, también por el poder y la riqueza.", thumb: "https://static.wixstatic.com/media/859174_909e1717b6e1483c9391d48a2461831f~mv2.jpg", url: "https://ok.ru/videoembed/14066543561216" },
  { id: 26, title: "Enemigos", dur: "43:02", desc: "Los amoritas son los enemigos del reino de Ur que han comenzado a realizar ataques.", thumb: "https://static.wixstatic.com/media/859174_93341eab3ef34cce8e6bae72aff863a5~mv2.jpg", url: "https://ok.ru/videoembed/14066831329792" },
  { id: 27, title: "El dolor", dur: "42:52", desc: "Amat descubre que Taré y Nadi son amantes y él le pide que no revele nada.", thumb: "https://static.wixstatic.com/media/859174_800edbe576aa41b4990f330a94822b82~mv2.jpg", url: "https://ok.ru/videoembed/14066832181760" },
  { id: 28, title: "Caída", dur: "43:04", desc: "Kissare, el sumo sacerdote de Ur cae por las escaleras y tiene lesiones graves.", thumb: "https://static.wixstatic.com/media/859174_5524828b2abb4838b95e214f85a1a8bc~mv2.jpg", url: "https://ok.ru/videoembed/14067043731968" },
  { id: 29, title: "Sin piedad", dur: "42:59", desc: "Morabi, el sacerdote que quiere asesinar a Kissare, no se detiene e intenta quitarle la vida.", thumb: "https://static.wixstatic.com/media/859174_f5bb9fde41594532b402d5b699ef1d4f~mv2.jpg", url: "https://ok.ru/videoembed/14067045501440" },
  { id: 30, title: "Niños perdidos", dur: "43:08", desc: "Abraham y Dnin Sim fueron secuestrados por los amoritas y piensan negociar.", thumb: "https://static.wixstatic.com/media/859174_191d180c9c7e441d9272e79467ac15f4~mv2.jpg", url: "https://ok.ru/videoembed/14067047074304" },
  { id: 31, title: "Mal presagio", dur: "43:04", desc: "El rey de Ur tiene una pesadilla y está seguro que es un mensaje de los dioses.", thumb: "https://static.wixstatic.com/media/859174_718e52de8b9c4f498bdc1465bd0c4e29~mv2.jpg", url: "https://ok.ru/videoembed/14067248531968" },
  { id: 32, title: "Entrega", dur: "42:19", desc: "El rey de Ur y el líder de los amoritas acuerdan hacer el intercambio de sus familiares.", thumb: "https://static.wixstatic.com/media/859174_47ae0a7fda8d42049a840d2db866dacd~mv2.jpg", url: "https://ok.ru/videoembed/14067249515008" },
  { id: 33, title: "Ataque", dur: "42:59", desc: "La ciudad de Ur recibe un ataque sorpresa por parte de los amoritas y muchos mueren.", thumb: "https://static.wixstatic.com/media/859174_0cdbb1aecc55442491a137e97ba414fb~mv2.jpg", url: "https://ok.ru/videoembed/14067250366976" },
  { id: 34, title: "Segunda esposa", dur: "42:47", desc: "Taré se casará con Nadi y oficialmente se convertirá en su segunda esposa.", thumb: "https://static.wixstatic.com/media/859174_c7168a3e57c54c819bbf926f23645b6c~mv2.jpg", url: "https://ok.ru/videoembed/14067690179072" },
  { id: 35, title: "Se acabó", dur: "43:00", desc: "Taré y Nadi discuten, ya que él piensa que su matrimonio ha sido un error.", thumb: "https://static.wixstatic.com/media/859174_79e0ec9105d842d8bb5529060755b1ab~mv2.jpg", url: "https://ok.ru/videoembed/14067691293184" },
  { id: 36, title: "Sospecha", dur: "42:22", desc: "El rey de Ur comienza a sospechar que su mujer lo quiere traicionar.", thumb: "https://static.wixstatic.com/media/859174_cb41d4d6d53e4dcd9b87f24edf506a80~mv2.jpg", url: "https://ok.ru/videoembed/14067692341760" },
  { id: 37, title: "Veneno", dur: "43:08", desc: "El rey de Ur enfrenta a su reina y le demuestra que ella es quien envenenó personas.", thumb: "https://static.wixstatic.com/media/859174_d62e279cf7de43748058692e3c2b46c2~mv2.jpg", url: "https://ok.ru/videoembed/14067881478656" },
  { id: 38, title: "Los juicios", dur: "43:04", desc: "Se llevan a cabo dos juicios, el de la reina de Ur y el de Morabi.", thumb: "https://static.wixstatic.com/media/859174_1c236e99cd6c4a66a1630b5c2cfe7a14~mv2.jpg", url: "https://ok.ru/videoembed/14068537297408" },
  { id: 39, title: "Testigo", dur: "41:46", desc: "El rey de Ur recibe a un testigo clave para poder acusar a su esposa de traición.", thumb: "https://static.wixstatic.com/media/859174_c0ae198909f34adb9a084a5ab4c66c2a~mv2.jpg", url: "https://ok.ru/videoembed/14068537559552" },
  { id: 40, title: "La juventud", dur: "42:53", desc: "Abraham ya es un joven y no cumple las expectativas de su padre Taré.", thumb: "https://static.wixstatic.com/media/859174_f822f043d46e45cbb15d2b52f80bd941~mv2.jpg", url: "https://ok.ru/videoembed/14068537690624" }
];

const GenesisPC = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [showQR, setShowQR] = useState(false);
  
  // Refs para Scroll y Memoria
  const episodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // 1. Navbar Scroll Logic
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    // 2. Cargar Episodio Guardado (Memoria)
    const savedEp = localStorage.getItem('genesis_last_ep');
    if (savedEp) {
      setCurrentIdx(parseInt(savedEp));
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función para abrir reproductor y guardar progreso
  const openEpisode = (idx: number) => {
    setCurrentIdx(idx);
    setSelectedVideo(genesisEpisodes[idx].url);
    localStorage.setItem('genesis_last_ep', idx.toString());
  };

  // Función para cerrar y hacer scroll al episodio
  const closePlayer = () => {
    setSelectedVideo(null);
    setTimeout(() => {
      episodeRefs.current[currentIdx]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Series Bíblicas', href: '/series-biblicas' },
    { name: 'Series TV', href: '/series-tv' },
    { name: 'Películas', href: '/peliculas' },
  ];

  const languages = [
    { name: 'ESP', img: "https://static.wixstatic.com/media/859174_367960b11c1c44ba89cd1582fd1b5776~mv2.png" },
    { name: 'ENG', img: "https://static.wixstatic.com/media/859174_35112d9ffe234d6f9dcef16cf8f7544e+mv2.png" },
    { name: 'PT', img: "https://static.wixstatic.com/media/859174_830f1c20656e4d44a819bedfc13a22cc+mv2.png" }
  ];

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-[#FF8A00]">
      <Head><title>Génesis — Estudios 421</title></Head>

      {/* NAVBAR OFICIAL (IDÉNTICO AL INICIO) */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 px-8 py-4 flex items-center justify-between ${isScrolled ? 'bg-black shadow-lg' : 'bg-gradient-to-b from-black via-black/60 to-transparent'}`}>
        <div className="flex items-center gap-10">
          <Link href="/"><div className="relative w-[160px] h-[45px] cursor-pointer"><Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" fill className="object-contain" priority /></div></Link>
          <div className="flex gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="relative group text-white text-[15px] font-medium tracking-wide">
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-[3px] bg-[#FF8A00] transition-all duration-500 ${router.pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex gap-4 mr-4">
            {languages.map((lang) => (<img key={lang.name} src={lang.img} alt={lang.name} className="w-7 h-7 object-contain cursor-pointer hover:scale-110 transition-transform" />))}
          </div>
          <div className="flex items-center bg-white/10 rounded-full px-4 py-1 border border-white/5">
            <IoSearchOutline className="text-white text-xl" />
            <input type="text" placeholder="Buscar..." className="bg-transparent border-none outline-none text-white text-sm ml-2 w-32 placeholder:text-gray-400" />
          </div>
          <Image src="https://static.wixstatic.com/media/859174_26ca840644ce4f519c0458c649f44f34~mv2.png" alt="User" width={30} height={30} className="rounded-full ring-1 ring-white/20 hover:ring-[#FF8A00] cursor-pointer" />
        </div>
      </nav>

      {/* HERO BANNER (CON BOTÓN DE CONTINUAR INTELIGENTE) */}
      <div className="relative w-full h-[88vh] overflow-hidden">
        <img src="https://static.wixstatic.com/media/859174_264be00ba6d14e699767e79c49297e5c~mv2.jpg" className="w-full h-full object-cover" alt="Banner" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
        
        {/* BOTONES BAJADOS (PARA NO TAPAR EL TEXTO DEL BANNER) */}
        <div className="absolute bottom-12 left-16 flex gap-6 z-10 items-center">
          <button 
            onClick={() => openEpisode(currentIdx)} 
            className="bg-white text-black font-black py-4 px-12 rounded-sm text-lg hover:bg-[#FF8A00] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-2xl uppercase"
          >
            {currentIdx === 0 ? "▶ Ver Ahora" : `▶ Continuar EP. ${genesisEpisodes[currentIdx].id}`}
          </button>
          <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold py-4 px-10 rounded-sm hover:bg-white/20 transition-all uppercase">+ Mi Lista</button>
          <button onClick={() => setShowQR(true)} className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold py-4 px-10 rounded-sm hover:bg-white/20 transition-all uppercase">❤ Donar</button>
        </div>
      </div>

      {/* GRILLA DE EPISODIOS (DISEÑO FADE GRIS #2C2F33) */}
      <div className="px-16 mt-20 mb-32">
        <header className="flex items-center gap-4 mb-10">
            <div className="w-1.5 h-10 bg-[#FF8A00]"></div>
            <h2 className="text-3xl font-bold tracking-tighter uppercase">Capítulos Completos en Audio Latino</h2>
        </header>

        <div className="grid grid-cols-6 gap-6">
          {genesisEpisodes.map((ep, index) => (
            <div 
              key={ep.id} 
              ref={el => episodeRefs.current[index] = el}
              className={`group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 bg-[#2C2F33] border-2 ${currentIdx === index ? 'border-[#FF8A00] ring-4 ring-[#FF8A00]/20' : 'border-transparent hover:border-white/30'}`}
              onClick={() => openEpisode(index)}
            >
              <div className="relative aspect-video overflow-hidden">
                <img src={ep.thumb} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C2F33] via-transparent to-transparent opacity-60" />
                <span className="absolute bottom-2 left-2 bg-black/80 px-2 py-0.5 text-[10px] font-black rounded border border-white/10 uppercase tracking-widest text-[#FF8A00]">Episodio {ep.id}</span>
                <span className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 text-[10px] font-bold rounded border border-white/10">{ep.dur}</span>
              </div>
              <div className="p-4 flex flex-col gap-1">
                <h3 className="font-bold text-sm truncate uppercase tracking-tight">{ep.title}</h3>
                <p className="text-[10px] text-gray-400 line-clamp-2 leading-relaxed h-8">{ep.desc}</p>
                <div className="mt-2 flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${currentIdx === index ? 'bg-[#FF8A00] animate-pulse' : 'bg-gray-600'}`}></div>
                    <span className="text-[9px] uppercase font-bold text-gray-500 tracking-widest">Disponible ahora</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* REPRODUCTOR FUSIONADO (TÍTULO ARRIBA, BOTONES ABAJO) */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="w-full max-w-[1280px] bg-[#050608] rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)]">
            
            {/* Header del Reproductor */}
            <div className="px-8 py-5 flex items-center justify-between border-b border-white/5 bg-gradient-to-r from-[#FF8A00]/10 to-transparent">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-[#FF8A00] uppercase tracking-[0.3em]">Serie: Génesis</span>
                <h2 className="text-xl font-bold tracking-tight">Capítulo {genesisEpisodes[currentIdx].id} — {genesisEpisodes[currentIdx].title}</h2>
              </div>
              <button onClick={closePlayer} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-600 transition-all group">
                <IoClose className="text-2xl group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Iframe del Video */}
            <div className="relative aspect-video bg-black">
              <iframe 
                src={selectedVideo + "?autoplay=1"} 
                className="absolute inset-0 w-full h-full" 
                allow="autoplay; fullscreen" 
              />
            </div>

            {/* Footer del Reproductor (Botones de Pablo Style) */}
            <div className="px-8 py-6 flex items-center justify-between border-t border-white/5 bg-[#050608]">
              <button 
                disabled={currentIdx === 0}
                onClick={() => openEpisode(currentIdx - 1)}
                className="flex items-center gap-3 bg-white/5 hover:bg-white/10 px-6 py-3 rounded-full text-xs font-bold transition-all disabled:opacity-20 uppercase tracking-widest border border-white/5"
              >
                <IoChevronBack className="text-lg" /> Episodio Anterior
              </button>
              
              <button 
                onClick={closePlayer}
                className="flex items-center gap-3 bg-white/5 hover:bg-white text-white hover:text-black px-8 py-3 rounded-full text-xs font-bold transition-all uppercase tracking-widest border border-white/5"
              >
                <IoList className="text-lg" /> Lista de Episodios
              </button>

              <button 
                disabled={currentIdx === genesisEpisodes.length - 1}
                onClick={() => openEpisode(currentIdx + 1)}
                className="flex items-center gap-3 bg-[#FF8A00] hover:bg-[#FF8A00]/90 text-black px-6 py-3 rounded-full text-xs font-black transition-all disabled:opacity-20 uppercase tracking-widest shadow-[0_0_20px_rgba(255,138,0,0.3)]"
              >
                Siguiente Episodio <IoChevronForward className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DONAR QR PC */}
      {showQR && (
        <div className="fixed inset-0 z-[1100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111] border border-white/10 p-10 rounded-2xl flex flex-col items-center max-w-sm text-center shadow-2xl">
            <h3 className="text-2xl font-bold mb-2">Apoya el proyecto</h3>
            <div className="bg-white p-4 rounded-xl mb-6">
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS')}`} alt="QR Donate" />
            </div>
            <button onClick={() => setShowQR(false)} className="bg-[#FF8A00] w-full py-3 rounded-lg font-bold text-black uppercase tracking-widest">Cerrar</button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default GenesisPC;
