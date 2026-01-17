import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoChevronBack, IoChevronForward, IoList, IoClose, IoCheckmarkCircle } from 'react-icons/io5';
import Footer from '../../Footer';

const LeaPC = () => {
  const leaEpisodes = [
    { id: 1, title: "Hermanas del destino", dur: "00:40:06", desc: "Lía pierde a su madre siendo aún joven y comienza a criar a su hermana menor. Raquel se convierte en una adulta fría y egoísta. Lía es rescatada por Jacob.", thumb: "https://static.wixstatic.com/media/859174_86a2172b057b4dbb8f9aad8c28163653~mv2.jpg", url: "https://ok.ru/videoembed/14199373957632" },
    { id: 2, title: "El voto sagrado", dur: "00:39:26", desc: "Jacó conhece Lia e é observado por Saul. Jacó fala a todos sobre o voto que fez com Deus. Lia e Raquel se desentendem.", thumb: "https://static.wixstatic.com/media/859174_b2866dfb10364a52a6f6c4b1d0bd36b5~mv2.jpg", url: "https://ok.ru/videoembed/14199375071744" },
    { id: 3, title: "El engaño de Labán", dur: "00:41:00", desc: "Jacob se acerca a Lía, pero pide a Raquel en casamiento. Para que Jacob no se vaya, Labán obliga a Lía a casarse en lugar de Raquel.", thumb: "https://static.wixstatic.com/media/859174_d7cfc67255f04256a593c369119ed86c~mv2.jpg", url: "https://ok.ru/videoembed/14199375989248" },
    { id: 4, title: "La boda equivocada", dur: "00:41:22", desc: "Lía es obligada a seguir los planes de Labán. La joven termina casándose con Jacob en lugar de Raquel.", thumb: "https://static.wixstatic.com/media/859174_7e9da0e84f384be2ae32c853dbdeedcc~mv2.jpg", url: "https://ok.ru/videoembed/14199376972288" },
    { id: 5, title: "Solo para Raquel", dur: "00:42:42", desc: "Jacob le dice a Raquel que solo tendrá ojos para ella y, en la primera noche de casados, rechaza a Lía.", thumb: "https://static.wixstatic.com/media/859174_58e073319d26466a86e306f4691c9d96~mv2.jpg", url: "https://ok.ru/videoembed/14199377562112" },
    { id: 6, title: "Amor dividido", dur: "00:40:34", desc: "Las dos esposas quedan embarazadas, pero Jacob solo le da atención a Raquel, y Lía se siente desamparada.", thumb: "https://static.wixstatic.com/media/859174_eb250911b0bb4614b9deeb1b78769c02~mv2.jpg", url: "https://ok.ru/videoembed/14199378283008" },
    { id: 7, title: "El dolor de la primogénita", dur: "00:42:16", desc: "El nacimiento del hijo de Raquel hace que Jacob rechace aún más a Lía, quien da a luz a una niña.", thumb: "https://static.wixstatic.com/media/859174_7a07cdbacf0b4cf2a538a4a8058215e5~mv2.jpg", url: "https://ok.ru/videoembed/14199379134976" },
    { id: 8, title: "Bendecido para partir", dur: "00:40:14", desc: "Jacob es ayudado por Dios y logra tener su propio rebaño. Poco después, decide irse con su familia.", thumb: "https://static.wixstatic.com/media/859174_192e07b145414120854d08fdfa103e40~mv2.jpg", url: "https://ok.ru/videoembed/14199380380160" },
    { id: 9, title: "La noche del encuentro", dur: "00:40:36", desc: "Un encuentro con Dios cambia la vida de Jacob, que planea reencontrarse con Esaú. Dina intenta resistir, pero termina entregándose a Siquem.", thumb: "https://static.wixstatic.com/media/859174_02f250b13a77498c8de22760af9bb7b8~mv2.jpg", url: "https://ok.ru/videoembed/14199397812736" },
    { id: 10, title: "Juicio en la familia", dur: "00:40:38", desc: "Jacob y Lía cuidan de Dina después de que sus hijos cometieran una masacre. Jacob descubre que Raquel adoraba ídolos y la condena.", thumb: "https://static.wixstatic.com/media/859174_24d955c28833450eae4d86e9b842a109~mv2.jpg", url: "https://ok.ru/videoembed/14199398861312" }
  ];

  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [inMyList, setInMyList] = useState(false);
  const [donated, setDonated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const episodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    const savedEp = localStorage.getItem('lea_last_ep');
    if (savedEp) setCurrentIdx(parseInt(savedEp));
    const myList = JSON.parse(localStorage.getItem('myList') || '[]');
    if (myList.includes('lea')) setInMyList(true);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openEpisode = (idx: number) => {
    setCurrentIdx(idx);
    setSelectedVideo(leaEpisodes[idx].url);
    localStorage.setItem('lea_last_ep', idx.toString());
  };

  const closePlayer = () => {
    setSelectedVideo(null);
    setTimeout(() => {
      episodeRefs.current[currentIdx]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const toggleMyList = () => {
    let list = JSON.parse(localStorage.getItem('myList') || '[]');
    if (inMyList) { list = list.filter((i: string) => i !== 'lea'); setInMyList(false); }
    else { list.push('lea'); setInMyList(true); }
    localStorage.setItem('myList', JSON.stringify(list));
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-[#FF8A00] overflow-x-hidden">
      <Head><title>Lea — Estudios 421</title></Head>

      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 px-8 py-4 flex items-center justify-between ${isScrolled ? 'bg-black shadow-lg' : 'bg-gradient-to-b from-black via-black/60 to-transparent'}`}>
        <div className="flex items-center gap-10">
          <Link href="/"><div className="relative w-[160px] h-[45px] cursor-pointer"><Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" fill className="object-contain" priority /></div></Link>
          <div className="flex gap-8">
            {['Inicio', 'Series Bíblicas', 'Series TV', 'Películas'].map((name) => (
              <Link key={name} href={name === 'Inicio' ? '/' : `/${name.toLowerCase().replace(' ', '-')}`} className="relative group text-white text-[15px] font-medium tracking-wide">
                {name}
                <span className={`absolute -bottom-1 left-0 h-[3px] bg-[#FF8A00] transition-all duration-500 ${router.pathname === (name === 'Inicio' ? '/' : `/${name.toLowerCase().replace(' ', '-')}`) ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex gap-4 mr-4">
            {['', 'en', 'pt'].map((l) => (
              <Link key={l} href={l === '' ? '/serie/lea' : `/${l}/serie/lea`}>
                <img src={`https://static.wixstatic.com/media/859174_${l === '' ? '367960b11c1c44ba89cd1582fd1b5776' : l === 'en' ? '35112d9ffe234d6f9dcef16cf8f7544e' : '830f1c20656e4d44a819bedfc13a22cc'}~mv2.png`} className="w-7 h-7 object-contain cursor-pointer hover:scale-110 transition-transform" />
              </Link>
            ))}
          </div>
          <div className="flex items-center bg-white/10 rounded-full px-4 py-1 border border-white/5 focus-within:border-[#FF8A00]">
            <IoSearchOutline className="text-white text-xl" />
            <input type="text" placeholder="Buscar..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent border-none outline-none text-white text-sm ml-2 w-32 placeholder:text-gray-400" />
          </div>
          <Image src="https://static.wixstatic.com/media/859174_26ca840644ce4f519c0458c649f44f34~mv2.png" alt="User" width={30} height={30} className="rounded-full ring-1 ring-white/20 hover:ring-[#FF8A00] cursor-pointer" />
        </div>
      </nav>

      <div className="relative w-full h-[88vh]">
        <img src="https://static.wixstatic.com/media/859174_394a43598162462980999d535f5ab55a~mv2.jpg" className="w-full h-full object-cover" alt="Banner" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/10 opacity-70" />
        <div className="absolute bottom-[-30px] left-16 flex gap-6 z-20 items-center">
          <button onClick={() => openEpisode(currentIdx)} className="bg-white text-black font-black py-4 px-12 rounded-sm text-lg hover:bg-[#FF8A00] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-2xl uppercase">
            {currentIdx === 0 ? "▶ Ver Ahora" : `▶ Continuar Ep. ${leaEpisodes[currentIdx].id}`}
          </button>
          <button onClick={toggleMyList} className={`border py-4 px-10 rounded-sm transition-all uppercase font-bold ${inMyList ? 'bg-[#FF8A00] border-[#FF8A00] text-white' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}>
            {inMyList ? <><IoCheckmarkCircle className="inline mr-2" /> En Mi Lista</> : '+ Mi Lista'}
          </button>
          <button onClick={() => { setDonated(true); window.open('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS', '_blank'); }} className={`border py-4 px-10 rounded-sm transition-all uppercase font-bold ${donated ? 'bg-green-600 border-green-500 text-white' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}>❤ Donar</button>
        </div>
      </div>

      <div className="h-20 bg-black"></div>

      <div className="px-16 mb-32 relative z-10 text-left">
        <header className="flex items-center gap-4 mb-10 border-b border-white/10 pb-4">
          <div className="w-1.5 h-8 bg-[#FF8A00]"></div>
          <h2 className="text-2xl font-bold tracking-tight uppercase">Episodios Disponibles</h2>
        </header>

        <div className="grid grid-cols-4 gap-8">
          {leaEpisodes.map((ep, index) => (
            <div 
              key={ep.id} 
              ref={(el) => { episodeRefs.current[index] = el; }} 
              className={`group cursor-pointer rounded-xl overflow-hidden transition-all duration-500 bg-[#161718] border ${currentIdx === index ? 'border-[#FF8A00] shadow-[0_0_30px_rgba(255,138,0,0.15)]' : 'border-white/5 hover:border-white/20 hover:shadow-2xl'}`} 
              onClick={() => openEpisode(index)}
            >
              <div className="relative aspect-video overflow-hidden">
                <img src={ep.thumb} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                
                {/* DISEÑO MEJORADO: NÚMERO DE EPISODIO (Sutil y Profesional) */}
                <div className="absolute top-3 left-3">
                  <div className="bg-black/60 backdrop-blur-xl border border-white/10 px-3 py-1 rounded-lg shadow-xl">
                    <span className="text-[10px] font-black uppercase tracking-[0.1em] text-white">
                      Episodio <span className="text-[#FF8A00]">{ep.id}</span>
                    </span>
                  </div>
                </div>

                {/* DISEÑO MEJORADO: TIEMPO DE DURACIÓN (Elegante y Moderno) */}
                <div className="absolute bottom-3 right-3">
                  <div className="bg-white/10 backdrop-blur-md border border-white/10 px-2 py-1 rounded-md">
                    <span className="text-[10px] font-medium text-white tracking-widest tabular-nums">
                      {ep.dur}
                    </span>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#161718] via-transparent to-transparent opacity-80" />
              </div>
              
              <div className="p-5 flex flex-col gap-2">
                <h3 className="font-bold text-[15px] truncate uppercase tracking-tight transition-colors group-hover:text-[#FF8A00]">{ep.title}</h3>
                <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed h-8 font-medium">{ep.desc}</p>
                <div className="mt-2 pt-3 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${currentIdx === index ? 'bg-[#FF8A00] animate-pulse' : 'bg-white/20'}`}></div>
                    <span className="text-[9px] uppercase font-bold text-gray-500 tracking-[0.2em]">HD Disponible</span>
                  </div>
                </div>
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
                <span className="text-[10px] font-black text-[#FF8A00]/80 uppercase tracking-[0.5em] mb-1">Serie: Lea</span>
                <h2 className="text-2xl font-black tracking-tighter uppercase leading-none">
                  Capítulo {leaEpisodes[currentIdx].id} <span className="text-white/10 mx-3">/</span> <span className="text-white/90">{leaEpisodes[currentIdx].title}</span>
                </h2>
              </div>
            </div>
            <button onClick={closePlayer} className="group flex items-center gap-4 bg-white/[0.03] px-8 py-3.5 rounded-full border border-white/10 hover:bg-[#FF8A00] hover:border-[#FF8A00] hover:scale-105 transition-all duration-500">
              <span className="text-[11px] font-black uppercase tracking-[0.2em] group-hover:text-black transition-colors">Salir del video</span>
              <div className="w-px h-4 bg-white/20 group-hover:bg-black/20" />
              <IoClose className="text-2xl group-hover:rotate-90 group-hover:text-black transition-all" />
            </button>
          </div>

          <div className="flex-grow bg-black relative flex items-center justify-center">
            <div className="absolute inset-0 z-10 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]" />
            <iframe src={selectedVideo + "?autoplay=1"} className="absolute inset-0 w-full h-full border-none" allow="autoplay; fullscreen" allowFullScreen />
          </div>

          <div className="h-[13vh] min-h-[100px] px-16 bg-gradient-to-t from-[#0a0b0d] to-[#050608] border-t border-white/5 flex items-center justify-between shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
            <button disabled={currentIdx === 0} onClick={() => openEpisode(currentIdx - 1)} className="group flex items-center gap-5 disabled:opacity-5 disabled:pointer-events-none transition-all duration-500">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] group-hover:bg-white group-hover:text-black group-hover:scale-110 transition-all shadow-xl">
                <IoChevronBack className="text-xl" />
              </div>
              <div className="flex flex-col items-start text-left">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FF8A00]/60">Anterior</span>
                <span className="text-sm font-bold uppercase text-white/80 group-hover:text-white">Episodio {currentIdx}</span>
              </div>
            </button>
            <button onClick={closePlayer} className="flex items-center gap-4 bg-white/[0.03] px-10 py-4 rounded-2xl border border-white/5 hover:bg-white/[0.08] hover:border-white/20 transition-all group scale-95 hover:scale-100">
              <IoList className="text-2xl text-[#FF8A00] group-hover:scale-125 transition-transform" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-white/60 group-hover:text-white transition-colors">Ver todos los capítulos</span>
            </button>
            <button disabled={currentIdx === leaEpisodes.length - 1} onClick={() => openEpisode(currentIdx + 1)} className="group flex items-center gap-6 disabled:opacity-5 disabled:pointer-events-none transition-all duration-500">
              <div className="flex flex-col items-end text-right">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FF8A00]">Siguiente</span>
                <span className="text-sm font-bold uppercase text-white/80 group-hover:text-white">Episodio {currentIdx + 2}</span>
              </div>
              <div className="w-16 h-16 rounded-[22px] bg-[#FF8A00] flex items-center justify-center text-black shadow-[0_15px_35px_rgba(255,138,0,0.2)] group-hover:scale-110 transition-all">
                <IoChevronForward className="text-4xl" />
              </div>
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default LeaPC;
