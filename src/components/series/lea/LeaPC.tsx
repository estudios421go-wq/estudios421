import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoChevronBack, IoChevronForward, IoList, IoClose } from 'react-icons/io5';
import Footer from '../../Footer';

const leaEpisodes = [
  { id: 1, title: "Hermanas del destino", dur: "00:40:09", desc: "Lía pierde a su madre siendo aún joven y comienza a criar a su hermana menor. Raquel se convierte en una adulta fría y egoísta. Lía es rescatada por Jacob.", thumb: "https://static.wixstatic.com/media/859174_86a2172b057b4dbb8f9aad8c28163653~mv2.jpg", url: "https://ok.ru/videoembed/14199373957632" },
  { id: 2, title: "El voto sagrado", dur: "00:40:09", desc: "Jacó conhece Lia e é observado por Saul. Jacó fala a todos sobre o voto que fez com Deus. Lia e Raquel se desentendem.", thumb: "https://static.wixstatic.com/media/859174_b2866dfb10364a52a6f6c4b1d0bd36b5~mv2.jpg", url: "https://ok.ru/videoembed/14199375071744" },
  { id: 3, title: "El engaño de Labán", dur: "00:42:09", desc: "Jacob se acerca a Lía, pero pide a Raquel en casamiento. Para que Jacob no se vaya, Labán obliga a Lía a casarse en lugar de Raquel.", thumb: "https://static.wixstatic.com/media/859174_d7cfc67255f04256a593c369119ed86c~mv2.jpg", url: "https://ok.ru/videoembed/14199375989248" },
  { id: 4, title: "La boda equivocada", dur: "00:41:09", desc: "Lía es obligada a seguir los planes de Labán. La joven termina casándose con Jacob en lugar de Raquel.", thumb: "https://static.wixstatic.com/media/859174_7e9da0e84f384be2ae32c853dbdeedcc~mv2.jpg", url: "https://ok.ru/videoembed/14199376972288" },
  { id: 5, title: "Solo para Raquel", dur: "00:43:09", desc: "Jacob le dice a Raquel que solo tendrá ojos para ella y, en la primera noche de casados, rechaza a Lía.", thumb: "https://static.wixstatic.com/media/859174_58e073319d26466a86e306f4691c9d96~mv2.jpg", url: "https://ok.ru/videoembed/14199377562112" },
  { id: 6, title: "Amor dividido", dur: "00:40:09", desc: "Las dos esposas quedan embarazadas, pero Jacob solo le da atención a Raquel, y Lía se siente desamparada.", thumb: "https://static.wixstatic.com/media/859174_eb250911b0bb4614b9deeb1b78769c02~mv2.jpg", url: "https://ok.ru/videoembed/14199378283008" },
  { id: 7, title: "El dolor de la primogénita", dur: "00:42:09", desc: "El nacimiento del hijo de Raquel hace que Jacob rechace aún más a Lía, quien da a luz a una niña.", thumb: "https://static.wixstatic.com/media/859174_7a07cdbacf0b4cf2a538a4a8058215e5~mv2.jpg", url: "https://ok.ru/videoembed/14199379134976" },
  { id: 8, title: "Bendecido para partir", dur: "00:40:09", desc: "Jacob es ayudado por Dios y logra tener su propio rebaño. Poco después, decide irse con su familia.", thumb: "https://static.wixstatic.com/media/859174_192e07b145414120854d08fdfa103e40~mv2.jpg", url: "https://ok.ru/videoembed/14199380380160" },
  { id: 9, title: "La noche del encuentro", dur: "00:41:09", desc: "Un encuentro con Dios cambia la vida de Jacob, que planea reencontrarse con Esaú. Dina intenta resistir, pero termina entregándose a Siquem.", thumb: "https://static.wixstatic.com/media/859174_02f250b13a77498c8de22760af9bb7b8~mv2.jpg", url: "https://ok.ru/videoembed/14199397812736" },
  { id: 10, title: "Juicio en la familia", dur: "00:41:09", desc: "Jacob y Lía cuidan de Dina después de que sus hijos cometieran una masacre. Jacob descubre que Raquel adoraba ídolos y la condena.", thumb: "https://static.wixstatic.com/media/859174_24d955c28833450eae4d86e9b842a109~mv2.jpg", url: "https://ok.ru/videoembed/14199398861312" }
];

const LeaPC = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const episodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    const savedEp = localStorage.getItem('lea_last_ep');
    if (savedEp) setCurrentIdx(parseInt(savedEp));
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openEpisode = (idx: number) => {
    setCurrentIdx(idx);
    setSelectedVideo(leaEpisodes[idx].url);
    localStorage.setItem('lea_last_ep', idx.toString());
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-[#FF8A00]">
      <Head><title>Lea — Estudios 421</title></Head>

      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 px-8 py-4 flex items-center justify-between ${isScrolled ? 'bg-black shadow-lg' : 'bg-gradient-to-b from-black via-black/60 to-transparent'}`}>
         <Link href="/"><div className="relative w-[160px] h-[45px] cursor-pointer"><Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" fill className="object-contain" priority /></div></Link>
         <div className="flex gap-8">
            {['Inicio', 'Series Bíblicas', 'Series TV', 'Películas'].map((name) => (
              <span key={name} className="text-white text-[15px] font-medium tracking-wide cursor-pointer hover:text-[#FF8A00] transition-colors">{name}</span>
            ))}
         </div>
         <div className="flex items-center gap-6">
            <IoSearchOutline className="text-white text-xl cursor-pointer" />
            <Image src="https://static.wixstatic.com/media/859174_26ca840644ce4f519c0458c649f44f34~mv2.png" alt="User" width={30} height={30} className="rounded-full cursor-pointer" />
         </div>
      </nav>

      <div className="relative w-full h-[88vh]">
        <img src="https://static.wixstatic.com/media/859174_394a43598162462980999d535f5ab55a~mv2.jpg" className="w-full h-full object-cover" alt="Banner Lea" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/10 opacity-70" />
        <div className="absolute bottom-10 left-16 flex gap-6 z-20 items-center">
          <button onClick={() => openEpisode(currentIdx)} className="bg-white text-black font-black py-4 px-12 rounded-sm text-lg hover:bg-[#FF8A00] hover:text-white transition-all uppercase">
            {currentIdx === 0 ? "▶ Ver Ahora" : `▶ Continuar Ep. ${leaEpisodes[currentIdx].id}`}
          </button>
          <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold py-4 px-10 rounded-sm hover:bg-white/20 transition-all uppercase">+ Mi Lista</button>
        </div>
      </div>

      <div className="px-16 py-20 mb-32 relative z-10">
        <header className="flex items-center gap-4 mb-10 border-b border-white/10 pb-4">
            <div className="w-1.5 h-8 bg-[#FF8A00]"></div>
            <h2 className="text-2xl font-bold uppercase tracking-tighter">Episodios de Lea</h2>
        </header>

        <div className="grid grid-cols-4 gap-8">
          {leaEpisodes.map((ep, index) => (
            <div key={ep.id} ref={(el) => { episodeRefs.current[index] = el; }} className={`group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 bg-[#1a1a1a] border-2 ${currentIdx === index ? 'border-[#FF8A00]' : 'border-transparent hover:border-white/20'}`} onClick={() => openEpisode(index)}>
              <div className="relative aspect-video">
                <img src={ep.thumb} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <span className="absolute bottom-2 left-2 bg-black/80 px-2 py-0.5 text-[10px] font-black rounded text-[#FF8A00]">EPISODIO {ep.id}</span>
                <span className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 text-[10px] font-bold rounded">{ep.dur}</span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-base truncate mb-2">{ep.title}</h3>
                <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed h-8">{ep.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 z-[1000] bg-black flex flex-col">
          <div className="px-8 py-5 flex items-center justify-between border-b border-white/5">
            <h2 className="text-xl font-bold uppercase tracking-widest text-[#FF8A00]">Lea — Ep. {leaEpisodes[currentIdx].id}</h2>
            <button onClick={() => setSelectedVideo(null)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all"><IoClose className="text-2xl" /></button>
          </div>
          <div className="flex-grow bg-black relative">
            <iframe src={selectedVideo + "?autoplay=1"} className="absolute inset-0 w-full h-full" allow="autoplay; fullscreen" />
          </div>
          <div className="px-8 py-6 flex items-center justify-between bg-[#050608]">
             <button disabled={currentIdx === 0} onClick={() => openEpisode(currentIdx - 1)} className="bg-white/5 hover:bg-white/10 px-8 py-3 rounded-full text-xs font-bold transition-all uppercase tracking-widest border border-white/5">Anterior</button>
             <button disabled={currentIdx === leaEpisodes.length - 1} onClick={() => openEpisode(currentIdx + 1)} className="bg-[#FF8A00] text-black px-8 py-3 rounded-full text-xs font-black transition-all uppercase tracking-widest shadow-lg">Siguiente</button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default LeaPC;
