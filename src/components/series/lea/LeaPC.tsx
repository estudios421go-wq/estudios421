import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoChevronBack, IoChevronForward, IoList, IoClose, IoCheckmarkCircle } from 'react-icons/io5';
import Footer from '../../Footer';

const leaEpisodes = [
  { id: 1, title: "Hermanas del destino", dur: "00:40:09", desc: "Lía pierde a su madre siendo aún joven y comienza a criar a su hermana menor.", thumb: "https://static.wixstatic.com/media/859174_86a2172b057b4dbb8f9aad8c28163653~mv2.jpg", url: "https://ok.ru/videoembed/14199373957632" },
  { id: 2, title: "El voto sagrado", dur: "00:40:09", desc: "Jacó conhece Lia e é observado por Saul.", thumb: "https://static.wixstatic.com/media/859174_b2866dfb10364a52a6f6c4b1d0bd36b5~mv2.jpg", url: "https://ok.ru/videoembed/14199375071744" },
  { id: 3, title: "El engaño de Labán", dur: "00:42:09", desc: "Jacob se acerca a Lía, pero pide a Raquel en casamiento.", thumb: "https://static.wixstatic.com/media/859174_d7cfc67255f04256a593c369119ed86c~mv2.jpg", url: "https://ok.ru/videoembed/14199375989248" },
  { id: 4, title: "La boda equivocada", dur: "00:41:09", desc: "Lía es obligada a seguir los planes de Labán.", thumb: "https://static.wixstatic.com/media/859174_7e9da0e84f384be2ae32c853dbdeedcc~mv2.jpg", url: "https://ok.ru/videoembed/14199376972288" },
  { id: 5, title: "Solo para Raquel", dur: "00:43:09", desc: "Jacob le dice a Raquel que solo tendrá ojos para ella.", thumb: "https://static.wixstatic.com/media/859174_58e073319d26466a86e306f4691c9d96~mv2.jpg", url: "https://ok.ru/videoembed/14199377562112" },
  { id: 6, title: "Amor dividido", dur: "00:40:09", desc: "Las dos esposas quedan embarazadas.", thumb: "https://static.wixstatic.com/media/859174_eb250911b0bb4614b9deeb1b78769c02~mv2.jpg", url: "https://ok.ru/videoembed/14199378283008" },
  { id: 7, title: "El dolor de la primogénita", dur: "00:42:09", desc: "El nacimiento del hijo de Raquel.", thumb: "https://static.wixstatic.com/media/859174_7a07cdbacf0b4cf2a538a4a8058215e5~mv2.jpg", url: "https://ok.ru/videoembed/14199379134976" },
  { id: 8, title: "Bendecido para partir", dur: "00:40:09", desc: "Jacob decide irse con su familia.", thumb: "https://static.wixstatic.com/media/859174_192e07b145414120854d08fdfa103e40~mv2.jpg", url: "https://ok.ru/videoembed/14199380380160" },
  { id: 9, title: "La noche del encuentro", dur: "00:41:09", desc: "Un encuentro con Dios cambia la vida de Jacob.", thumb: "https://static.wixstatic.com/media/859174_02f250b13a77498c8de22760af9bb7b8~mv2.jpg", url: "https://ok.ru/videoembed/14199397812736" },
  { id: 10, title: "Juicio en la familia", dur: "00:41:09", desc: "Jacob descubre que Raquel adoraba ídolos.", thumb: "https://static.wixstatic.com/media/859174_24d955c28833450eae4d86e9b842a109~mv2.jpg", url: "https://ok.ru/videoembed/14199398861312" }
];

const LeaPC = () => {
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.toLowerCase().trim();
    if (q === "lea") router.push('/serie/lea');
    else if (q === "genesis") router.push('/serie/genesis');
  };

  const toggleMyList = () => {
    let list = JSON.parse(localStorage.getItem('myList') || '[]');
    if (inMyList) { list = list.filter((i: string) => i !== 'lea'); setInMyList(false); }
    else { list.push('lea'); setInMyList(true); }
    localStorage.setItem('myList', JSON.stringify(list));
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-[#FF8A00] overflow-x-hidden">
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 px-8 py-4 flex items-center justify-between ${isScrolled ? 'bg-black shadow-lg' : 'bg-gradient-to-b from-black via-black/60 to-transparent'}`}>
        <div className="flex items-center gap-10">
          <Link href="/"><div className="relative w-[160px] h-[45px] cursor-pointer"><Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" fill className="object-contain" priority /></div></Link>
          <div className="flex gap-8">
            {['Inicio', 'Series Bíblicas', 'Series TV', 'Películas'].map(n => (
              <Link key={n} href={n==='Inicio'?'/':`/${n.toLowerCase().replace(' ','-')}`} className="relative group text-white text-[15px] font-medium tracking-wide">
                {n}<span className="absolute -bottom-1 left-0 w-0 h-[3px] bg-[#FF8A00] transition-all duration-500 group-hover:w-full" />
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex gap-4 mr-4">
            {['', 'en', 'pt'].map(l => (
              <Link key={l} href={l===''?'/serie/lea':`/${l}/serie/lea`}>
                <img src={`https://static.wixstatic.com/media/859174_${l===''?'367960b11c1c44ba89cd1582fd1b5776':l==='en'?'35112d9ffe234d6f9dcef16cf8f7544e':'830f1c20656e4d44a819bedfc13a22cc'}~mv2.png`} className="w-7 h-7 cursor-pointer hover:scale-110 transition-transform" />
              </Link>
            ))}
          </div>
          <form onSubmit={handleSearch} className="flex items-center bg-white/10 rounded-full px-4 py-1 border border-white/5 focus-within:border-[#FF8A00]">
            <IoSearchOutline className="text-white text-xl" />
            <input type="text" placeholder="Buscar..." value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} className="bg-transparent outline-none text-white text-sm ml-2 w-32" />
          </form>
          <Image src="https://static.wixstatic.com/media/859174_26ca840644ce4f519c0458c649f44f34~mv2.png" alt="User" width={30} height={30} className="rounded-full ring-1 ring-white/20" />
        </div>
      </nav>

      <div className="relative w-full h-[88vh]">
        <img src="https://static.wixstatic.com/media/859174_394a43598162462980999d535f5ab55a~mv2.jpg" className="w-full h-full object-cover" alt="Banner" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/10 opacity-70" />
        <div className="absolute bottom-[-30px] left-16 flex gap-6 z-20 items-center">
          <button onClick={() => openEpisode(currentIdx)} className="bg-white text-black font-black py-4 px-12 rounded-sm text-lg hover:bg-[#FF8A00] hover:text-white transition-all transform hover:scale-105 shadow-2xl uppercase">
            {currentIdx === 0 ? "▶ Ver Ahora" : `▶ Continuar Ep. ${leaEpisodes[currentIdx].id}`}
          </button>
          <button onClick={toggleMyList} className={`border py-4 px-10 rounded-sm transition-all uppercase font-bold ${inMyList ? 'bg-[#FF8A00] border-[#FF8A00]' : 'bg-white/10 border-white/20 hover:bg-white/20'}`}>
            {inMyList ? <><IoCheckmarkCircle className="inline mr-2" />En Mi Lista</> : '+ Mi Lista'}
          </button>
          <button onClick={() => {setDonated(true); window.open('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS','_blank')}} className={`border py-4 px-10 rounded-sm transition-all uppercase font-bold ${donated?'bg-green-600 border-green-500':'bg-white/10 border-white/20 hover:bg-white/20'}`}>❤ Donar</button>
        </div>
      </div>

      <div className="h-20 bg-black" />
      <div className="px-16 mb-32 relative z-10">
        <header className="flex items-center gap-4 mb-10 border-b border-white/10 pb-4">
          <div className="w-1.5 h-8 bg-[#FF8A00]" /><h2 className="text-2xl font-bold uppercase">Episodios Disponibles</h2>
        </header>
        <div className="grid grid-cols-4 gap-8">
          {leaEpisodes.map((ep, idx) => (
            <div key={ep.id} ref={el=>{episodeRefs.current[idx]=el}} className={`group cursor-pointer rounded-xl overflow-hidden transition-all bg-[#2C2F33] border-2 ${currentIdx===idx?'border-[#FF8A00] ring-4 ring-[#FF8A00]/20':'border-transparent hover:border-white/30'}`} onClick={()=>openEpisode(idx)}>
              <div className="relative aspect-video overflow-hidden"><img src={ep.thumb} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" /></div>
              <div className="p-5 flex flex-col gap-1">
                <h3 className="font-bold text-base truncate uppercase">{ep.title}</h3>
                <p className="text-[11px] text-gray-400 line-clamp-2 h-8">{ep.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedVideo && (
        <div className="fixed inset-0 z-[1000] bg-black flex flex-col">
          <div className="px-8 py-5 flex justify-between bg-black border-b border-white/5">
            <h2 className="text-xl font-bold uppercase">Episodio {leaEpisodes[currentIdx].id} — {leaEpisodes[currentIdx].title}</h2>
            <button onClick={()=>setSelectedVideo(null)} className="text-2xl hover:rotate-90 transition-transform"><IoClose /></button>
          </div>
          <iframe src={selectedVideo+"?autoplay=1"} className="w-full flex-grow border-none" allow="autoplay; fullscreen" />
        </div>
      )}
      <Footer />
    </div>
  );
};
export default LeaPC;
