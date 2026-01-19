import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  IoChevronBack,
  IoChevronForward,
  IoList
} from 'react-icons/io5';
import Footer from '../../Footer';

const LeaMobile = () => {
  const router = useRouter();

  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);

  const leaEpisodes = [
    { id: 1, title: "Hermanas del destino", dur: "00:40:06", thumb: "https://static.wixstatic.com/media/859174_86a2172b057b4dbb8f9aad8c28163653~mv2.jpg", url: "https://ok.ru/videoembed/14199373957632" },
    { id: 2, title: "El voto sagrado", dur: "00:39:26", thumb: "https://static.wixstatic.com/media/859174_b2866dfb10364a52a6f6c4b1d0bd36b5~mv2.jpg", url: "https://ok.ru/videoembed/14199375071744" },
    { id: 3, title: "El engaño de Labán", dur: "00:41:00", thumb: "https://static.wixstatic.com/media/859174_d7cfc67255f04256a593c369119ed86c~mv2.jpg", url: "https://ok.ru/videoembed/14199375989248" },
    { id: 4, title: "La boda equivocada", dur: "00:41:22", thumb: "https://static.wixstatic.com/media/859174_7e9da0e84f384be2ae32c853dbdeedcc~mv2.jpg", url: "https://ok.ru/videoembed/14199376972288" },
    { id: 5, title: "Solo para Raquel", dur: "00:42:42", thumb: "https://static.wixstatic.com/media/859174_58e073319d26466a86e306f4691c9d96~mv2.jpg", url: "https://ok.ru/videoembed/14199377562112" },
    { id: 6, title: "Amor dividido", dur: "00:40:34", thumb: "https://static.wixstatic.com/media/859174_eb250911b0bb4614b9deeb1b78769c02~mv2.jpg", url: "https://ok.ru/videoembed/14199378283008" },
    { id: 7, title: "El dolor de la primogénita", dur: "00:42:16", thumb: "https://static.wixstatic.com/media/859174_7a07cdbacf0b4cf2a538a4a8058215e5~mv2.jpg", url: "https://ok.ru/videoembed/14199379134976" },
    { id: 8, title: "Bendecido para partir", dur: "00:40:14", thumb: "https://static.wixstatic.com/media/859174_192e07b145414120854d08fdfa103e40~mv2.jpg", url: "https://ok.ru/videoembed/14199380380160" },
    { id: 9, title: "La noche del encuentro", dur: "00:40:36", thumb: "https://static.wixstatic.com/media/859174_02f250b13a77498c8de22760af9bb7b8~mv2.jpg", url: "https://ok.ru/videoembed/14199397812736" },
    { id: 10, title: "Juicio en la familia", dur: "00:40:38", thumb: "https://static.wixstatic.com/media/859174_24d955c28833450eae4d86e9b842a109~mv2.jpg", url: "https://ok.ru/videoembed/14199398861312" }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('lea_last_ep');
    if (saved) setCurrentIdx(parseInt(saved));
  }, []);

  const openEpisode = (idx: number) => {
    setSelectedVideo(leaEpisodes[idx].url);
    setCurrentIdx(idx);
    localStorage.setItem('lea_last_ep', idx.toString());
    window.scrollTo(0, 0);
  };

  if (selectedVideo) {
    return (
      <div className="bg-black min-h-screen w-full flex flex-col">

        {/* HEADER */}
        <div className="h-[10vh] min-h-[60px] px-6 flex items-center justify-between border-b border-white/5">
          <div className="flex flex-col border-l-2 border-[#F09800] pl-3">
            <span className="text-[8px] text-[#F09800] uppercase font-black">Estudios 421</span>
            <span className="text-xs font-bold uppercase truncate">
              Ep. {leaEpisodes[currentIdx].id} — {leaEpisodes[currentIdx].title}
            </span>
          </div>
          <button onClick={() => setSelectedVideo(null)} className="text-3xl">✕</button>
        </div>

        {/* VIDEO — CONTENEDOR ESTABLE */}
        <div className="bg-black flex items-center justify-center flex-grow">
          <iframe
            src={selectedVideo + '?autoplay=1'}
            className="w-full aspect-video border-none"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>

        {/* CONTROLES */}
        <div className="px-6 py-6 bg-black border-t border-white/5 space-y-4">
          <div className="flex justify-between">
            <button disabled={currentIdx === 0} onClick={() => openEpisode(currentIdx - 1)}>
              <IoChevronBack size={28} className="text-[#F09800]" />
            </button>

            <button onClick={() => setSelectedVideo(null)}>
              <IoList size={26} />
            </button>

            <button disabled={currentIdx === leaEpisodes.length - 1} onClick={() => openEpisode(currentIdx + 1)}>
              <IoChevronForward size={28} className="text-[#F09800]" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head><title>Lea — Estudios 421</title></Head>
      <div className="bg-black text-white min-h-screen">
        <Footer />
      </div>
    </>
  );
};

export default LeaMobile;
