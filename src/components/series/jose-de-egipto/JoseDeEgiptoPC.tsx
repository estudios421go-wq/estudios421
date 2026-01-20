import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoChevronBack, IoChevronForward, IoList, IoClose, IoCheckmarkCircle } from 'react-icons/io5';
import Footer from '../../Footer';

const joseEpisodes = [
  { id: 1, title: "El nacimiento de José", dur: "00:42:50", desc: "La historia de José comienza con su nacimiento, un acontecimiento que provoca inquietud y expectativa en su familia.", thumb: "https://static.wixstatic.com/media/859174_b44bad1703f7498ab87ffc2899850ed7~mv2.jpg", url: "https://ok.ru/videoembed/14201500797440" },
  { id: 2, title: "Espadas desaparecidas", dur: "00:41:20", desc: "La ciudad enfrenta dificultades tras descubrir la desaparición de armas del campamento.", thumb: "https://static.wixstatic.com/media/859174_04e0e0290e5b4812a701e159ffdce225~mv2.jpg", url: "https://ok.ru/videoembed/14202233752064" },
  { id: 3, title: "Salvados por la tormenta", dur: "00:42:46", desc: "Hombres armados se acercan peligrosamente a la familia de José, pero una fuerte tormenta altera el curso.", thumb: "https://static.wixstatic.com/media/859174_fa024efd1a9242e6911adc037fc17058~mv2.jpg", url: "https://ok.ru/videoembed/14202488490496" },
  { id: 4, title: "Privilegios y celos", dur: "00:42:50", desc: "Jacob concede privilegios especiales a José, despertando celos entre sus hermanos.", thumb: "https://static.wixstatic.com/media/859174_d196ab94593b4992a2ec6fac714bb91e~mv2.jpg", url: "https://ok.ru/videoembed/14202491636224" },
  { id: 5, title: "Clemencia en el campo", dur: "00:42:08", desc: "En medio de un momento decisivo, la vida de José pende de un hilo. La intervención de Dina introduce la misericordia.", thumb: "https://static.wixstatic.com/media/859174_85bf93bcc19647e19992cd6ba83fc345~mv2.jpg", url: "https://ok.ru/videoembed/14202493209088" },
  { id: 6, title: "El pozo del sufrimiento", dur: "00:41:59", desc: "José es arrojado a un pozo por sus propios hermanos. Comprende que su sufrimiento apenas comienza.", thumb: "https://static.wixstatic.com/media/859174_f2232a43af444ac79066a4ebd9eabefc~mv2.jpg", url: "https://ok.ru/videoembed/14202495502848" },
  { id: 7, title: "Llegada a Egipto", dur: "00:43:36", desc: "José es llevado a Egipto como esclavo. El impacto de la gran ciudad contrasta con la pérdida de libertad.", thumb: "https://static.wixstatic.com/media/859174_d7cce2bce30141f8b88197247ca7eae3~mv2.jpg", url: "https://ok.ru/videoembed/14202701548032" },
  { id: 8, title: "Huida inesperada", dur: "00:43:17", desc: "Perseguido por el mercader Jetur, José huye desesperadamente y vive un encuentro que marcará su destino.", thumb: "https://static.wixstatic.com/media/859174_30fa53f8486c45f2ba234f081e926ecb~mv2.jpg", url: "https://ok.ru/videoembed/14202703710720" },
  { id: 9, title: "Confesiones ocultas", dur: "00:43:19", desc: "Las tensiones aumentan en la casa del faraón. Secretos salen a la luz amenazando cambiar el destino.", thumb: "https://static.wixstatic.com/media/859174_d0cf09bdebe84778b1dc8c6594d77df7~mv2.jpg", url: "https://ok.ru/videoembed/14202705086976" },
  { id: 10, title: "Fidelidad puesta a prueba", dur: "00:42:42", desc: "José enfrenta una dura prueba de lealtad y fe. Su integridad lo coloca en una situación peligrosa.", thumb: "https://static.wixstatic.com/media/859174_d4b83ba525714ddab298a831494f4dd1~mv2.jpg", url: "https://ok.ru/videoembed/14202726844928" },
  { id: 11, title: "Decisiones prohibidas", dur: "00:43:18", desc: "Planes secretos y decisiones prohibidas se entrelazan. José se atrapado entre el deber y el deseo.", thumb: "https://static.wixstatic.com/media/859174_56f0a2b0536f46eb96af799c073b4ae3~mv2.jpg", url: "https://ok.ru/videoembed/14540463606272" },
  { id: 12, title: "La verdad revelada", dur: "00:43:23", desc: "La aparente muerte de José provoca dolor. Mientras, en Egipto, su esfuerzo comienza a darle reconocimiento.", thumb: "https://static.wixstatic.com/media/859174_4a4c48e7687c437d91f94f83438c726f~mv2.jpg", url: "https://ok.ru/videoembed/14540464916992" },
  { id: 13, title: "Planes de traición", dur: "00:43:21", desc: "Durante un día decisivo, antiguos planes de traición resurgen amenazando con destruir todo lo construido.", thumb: "https://static.wixstatic.com/media/859174_e49b213150b94ab987c2c960c2d3d89e~mv2.jpg", url: "https://ok.ru/videoembed/14540466620928" },
  { id: 14, title: "Sabiduría egipcia", dur: "00:41:21", desc: "José demuestra su inteligencia al aprender los conocimientos de Egipto. Despierta admiración y sospechas.", thumb: "https://static.wixstatic.com/media/859174_b740a577b4e241b1ab9352239a0bd135~mv2.jpg", url: "https://ok.ru/videoembed/14556467038720" },
  { id: 15, title: "Sin noticias del pasado", dur: "00:43:21", desc: "A pesar de sus avances, José enfrenta la tristeza de no tener noticias de su familia.", thumb: "https://static.wixstatic.com/media/859174_8daae9eb494f435f8dc3a53b4a0eb9ee~mv2.jpg", url: "https://ok.ru/videoembed/14556484078080" },
  { id: 16, title: "Deseo y traición", dur: "00:42:11", desc: "La traición y el deseo se cruzan nuevamente. Acusaciones falsas provocan una caída inesperada.", thumb: "https://static.wixstatic.com/media/859174_f4968b0eae3443ee95950fc5e79bc800~mv2.jpg", url: "https://ok.ru/videoembed/14556484536832" },
  { id: 17, title: "El significado de los sueños", dur: "00:42:34", desc: "Los sueños cobran un papel central, revelando verdades ocultas y futuros posibles para José.", thumb: "https://static.wixstatic.com/media/859174_e655497fab594a7dbb9dc56028484568~mv2.jpg", url: "https://ok.ru/videoembed/14556636449280" },
  { id: 18, title: "Caída en desgracia", dur: "00:42:09", desc: "José es llevado a prisión injustamente. El poder del faraón se impone y parece no tener salida.", thumb: "https://static.wixstatic.com/media/859174_8427e058b1df4ce594242b23cb33a0e9~mv2.jpg", url: "https://ok.ru/videoembed/14556636908032" },
  { id: 19, title: "El precio de la verdad", dur: "00:42:02", desc: "José demuestra su don para interpretar sueños en prisión. Sin embargo, la verdad tiene un costo elevado.", thumb: "https://static.wixstatic.com/media/859174_6c7fc3ce3dac41f0aa7703f486074ad1~mv2.jpg", url: "https://ok.ru/videoembed/14556762999296" },
  { id: 20, title: "De esclavo a gobernador", dur: "00:42:09", desc: "Un giro inesperado cambia la vida de José. Su sabiduría lo eleva a una posición de gran autoridad.", thumb: "https://static.wixstatic.com/media/859174_74b0f8e6e0db46b69207a8a2f1046450~mv2.jpg", url: "https://ok.ru/videoembed/14556763654656" },
  { id: 21, title: "Revelaciones peligrosas", dur: "00:42:37", desc: "Viejas verdades resurgen amenazando con desatar consecuencias imprevisibles en Egipto.", thumb: "https://static.wixstatic.com/media/859174_2ce9f56b09984eeb92356e3dba4f472e~mv2.jpg", url: "https://ok.ru/videoembed/14556764310016" },
  { id: 22, title: "Dolor y confesiones", dur: "00:42:31", desc: "El dolor se extiende. Confesiones largamente guardadas salen a la luz, marcando un antes y un después.", thumb: "https://static.wixstatic.com/media/859174_8ae4948f1b8f4332874878c7a4d90d6c~mv2.jpg", url: "https://ok.ru/videoembed/14556764703232" },
  { id: 23, title: "Juicio y pesadillas", dur: "00:41:42", desc: "Un juicio crucial se aproxima mientras pesadillas atormentan al faraón. El destino depende de José.", thumb: "https://static.wixstatic.com/media/859174_65288823091c423ead0a40284889c330~mv2.jpg", url: "https://ok.ru/videoembed/14556765030912" },
  { id: 24, title: "El poder de los sueños", dur: "00:43:36", desc: "José demuestra que los sueños contienen advertencias divinas reforzando su influencia en el reino.", thumb: "https://static.wixstatic.com/media/859174_f4b598fae5914ee7a1bb1615b1889e4d~mv2.jpg", url: "https://ok.ru/videoembed/14540486609408" },
  { id: 25, title: "Ascenso amenazado", dur: "00:39:00", desc: "Mientras Egipto celebra el ascenso de José, una amenaza silenciosa se gesta entre sus enemigos.", thumb: "https://static.wixstatic.com/media/859174_d4e8dbf5e22a40a2ad7eadf1361388c0~mv2.jpg", url: "https://ok.ru/videoembed/14540488313344" },
  { id: 26, title: "Objetivo del traidor", dur: "00:42:42", desc: "José se convierte en el blanco de un traidor decidido a eliminarlo de su nueva posición.", thumb: "https://static.wixstatic.com/media/859174_018c912a00804ef9a9e7a7244f181428~mv2.jpg", url: "https://ok.ru/videoembed/14540489886208" },
  { id: 27, title: "Peligro en el palacio", dur: "00:42:25", desc: "Conflictos familiares y conspiraciones ponen en riesgo la estabilidad. Un incendio eleva la tensión.", thumb: "https://static.wixstatic.com/media/859174_770b78cf63b9488295dc20e0c0c4bd47~mv2.jpg", url: "https://ok.ru/videoembed/14540492507648" },
  { id: 28, title: "Hambre y castigo", dur: "00:42:37", desc: "La sequía se intensifica y el hambre se extiende. Muchos lo interpretan como un castigo divino.", thumb: "https://static.wixstatic.com/media/859174_d9cbbe9380894663bb2727450cda429f~mv2.jpg", url: "https://ok.ru/videoembed/14540494080512" },
  { id: 29, title: "En Egipto", dur: "00:42:29", desc: "La familia de José viaja a Egipto en busca de alimento, sin imaginar lo que allí les espera.", thumb: "https://static.wixstatic.com/media/859174_21d59b65bd4a477b8e0afe08575a37f9~mv2.jpg", url: "https://ok.ru/videoembed/14556779842048" },
  { id: 30, title: "Reencuentro inesperado", dur: "00:42:29", desc: "Los hermanos de José llegan a Egipto y se produce un reencuentro cargado de emociones y secretos.", thumb: "https://static.wixstatic.com/media/859174_c7baf40be24d4bb2bf254f921f5c1f8d~mv2.jpg", url: "https://ok.ru/videoembed/14540497029632" },
  { id: 31, title: "El dilema de José", dur: "00:42:30", desc: "José enfrenta un profundo dilema moral y busca guía divina para decidir el destino de sus hermanos.", thumb: "https://static.wixstatic.com/media/859174_f850e4ca54b741b3ab0aa845734af9f3~mv2.jpg", url: "https://ok.ru/videoembed/14540498471424" },
  { id: 32, title: "Padre tu hijo esta vivo", dur: "00:41:46", desc: "La verdad es revelada. Jacob descubre que José vive y la esperanza renace en la familia.", thumb: "https://static.wixstatic.com/media/859174_8acdce69414d43d7af92b43fbeaedd17~mv2.jpg", url: "https://ok.ru/videoembed/14540500240896" },
  { id: 33, title: "Amor y despedida", dur: "00:38:56", desc: "La familia se reúne por completo. José cierra un ciclo marcado por el sufrimiento y la redención.", thumb: "https://static.wixstatic.com/media/859174_aabf06782221457f8f48f03c18e4403e~mv2.jpg", url: "https://ok.ru/videoembed/14540502272512" }
];

const JoseDeEgiptoPC = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [inMyList, setInMyList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const episodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && (e.key === 's' || e.key === 'u' || e.key === 'i')) || e.key === 'F12') e.preventDefault();
    };
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    const savedEp = localStorage.getItem('jose_last_ep');
    if (savedEp) setCurrentIdx(parseInt(savedEp));
    const myList = JSON.parse(localStorage.getItem('myList') || '[]');
    if (myList.includes('jose-de-egipto')) setInMyList(true);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const openEpisode = (idx: number) => {
    setCurrentIdx(idx);
    setSelectedVideo(joseEpisodes[idx].url);
    localStorage.setItem('jose_last_ep', idx.toString());
  };

  const toggleMyList = () => {
    let list = JSON.parse(localStorage.getItem('myList') || '[]');
    if (inMyList) { list = list.filter((i: string) => i !== 'jose-de-egipto'); setInMyList(false); }
    else { list.push('jose-de-egipto'); setInMyList(true); }
    localStorage.setItem('myList', JSON.stringify(list));
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans select-none overflow-x-hidden">
      <Head><title>José de Egipto — Estudios 421</title></Head>
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 px-8 py-4 flex items-center justify-between ${isScrolled ? 'bg-black shadow-lg' : 'bg-gradient-to-b from-black via-black/60 to-transparent'}`}>
        <div className="flex items-center gap-10">
          <Link href="/"><div className="relative w-[160px] h-[45px] cursor-pointer"><Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" fill className="object-contain pointer-events-none" priority /></div></Link>
          <div className="flex gap-8">
            {['Inicio', 'Series Bíblicas', 'Series TV', 'Películas'].map((n) => (
              <Link key={n} href={n === 'Inicio' ? '/' : `/${n.toLowerCase().replace(' ', '-')}`} className="text-white text-[15px] font-medium tracking-wide hover:text-[#FF8A00] transition-colors">{n}</Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center bg-white/10 rounded-full px-4 py-1 border border-white/5 focus-within:border-[#FF8A00]">
            <IoSearchOutline className="text-white text-xl" />
            <input type="text" placeholder="Buscar..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent border-none outline-none text-white text-sm ml-2 w-32" />
          </div>
          <Image src="https://static.wixstatic.com/media/859174_26ca840644ce4f519c0458c649f44f34~mv2.png" alt="User" width={30} height={30} className="rounded-full" />
        </div>
      </nav>

      <div className="relative w-full h-[88vh]">
        <img src="https://static.wixstatic.com/media/859174_a13b7e8011764b4f815ab2438e7e0853~mv2.jpg" className="w-full h-full object-cover pointer-events-none" alt="Banner" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/10 opacity-70" />
        <div className="absolute bottom-[-30px] left-16 flex gap-6 z-20 items-center">
          <button onClick={() => openEpisode(currentIdx)} className="bg-white text-black font-black py-4 px-12 rounded-sm text-lg hover:bg-[#FF8A00] transition-all uppercase tracking-widest">
            {currentIdx === 0 ? "▶ Ver Ahora" : `▶ Continuar Ep. ${joseEpisodes[currentIdx].id}`}
          </button>
          <button onClick={toggleMyList} className={`border py-4 px-10 rounded-sm transition-all uppercase font-bold ${inMyList ? 'bg-[#FF8A00] border-[#FF8A00] text-white' : 'bg-white/10 border-white/20 text-white'}`}>
            {inMyList ? <IoCheckmarkCircle className="inline mr-2" /> : '+ Mi Lista'}
          </button>
        </div>
      </div>

      <div className="px-16 mt-32 mb-32 relative z-10 text-left">
        <header className="flex items-center gap-4 mb-10 border-b border-white/10 pb-4">
          <div className="w-1.5 h-8 bg-[#FF8A00]"></div>
          <h2 className="text-2xl font-bold tracking-tight uppercase">Episodios Disponibles</h2>
        </header>
        <div className="grid grid-cols-4 gap-8">
          {joseEpisodes.map((ep, index) => (
            <div key={ep.id} ref={(el) => { episodeRefs.current[index] = el; }} className={`group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 bg-[#2C2F33] border-2 ${currentIdx === index ? 'border-[#FF8A00]' : 'border-transparent'}`} onClick={() => openEpisode(index)}>
              <div className="relative aspect-video overflow-hidden">
                <img src={ep.thumb} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" loading="lazy" />
                <div className="absolute bottom-2 left-2 bg-black/40 backdrop-blur-md px-3 py-1 rounded-md shadow-lg">
                  <span className="text-[11px] font-black uppercase text-white">Episodio <span className="text-[#FF8A00]">{ep.id}</span></span>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md">
                  <span className="text-[10px] font-bold text-white">{ep.dur}</span>
                </div>
              </div>
              <div className="p-5 flex flex-col gap-1">
                <h3 className="font-bold text-base truncate uppercase group-hover:text-[#FF8A00] transition-colors">{ep.title}</h3>
                <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed h-8">{ep.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 z-[1000] bg-[#050608] flex flex-col overflow-hidden">
          <div className="h-[12vh] min-h-[85px] px-12 flex items-center justify-between bg-gradient-to-b from-black to-transparent border-b border-white/5 relative">
            <div className="flex flex-col border-l-4 border-[#FF8A00] pl-6 py-1 text-left">
              <span className="text-[10px] font-black text-[#FF8A00] uppercase tracking-[0.5em] mb-1">Serie: José de Egipto</span>
              <h2 className="text-2xl font-black tracking-tighter uppercase leading-none">Capítulo {joseEpisodes[currentIdx].id} <span className="text-white/10 mx-3">/</span> {joseEpisodes[currentIdx].title}</h2>
            </div>
            <button onClick={() => setSelectedVideo(null)} className="flex items-center gap-4 bg-white/5 px-8 py-3.5 rounded-full border border-white/10 hover:bg-[#FF8A00] transition-all group">
              <span className="text-[11px] font-black uppercase group-hover:text-black">Salir del video</span>
              <IoClose className="text-2xl group-hover:text-black" />
            </button>
          </div>
          <div className="flex-grow bg-black relative">
            <iframe src={selectedVideo + "?autoplay=1"} className="absolute inset-0 w-full h-full border-none" allow="autoplay; fullscreen" allowFullScreen />
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default JoseDeEgiptoPC;
