import React, { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import { BiDonateHeart } from 'react-icons/bi';

const banners = [
  { id: 1, bg: "https://static.wixstatic.com/media/859174_8880c8a667894fd1af103a0336171721~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_6eb0c42c44e340d2a314f7be009d6e8a~mv2.png", desc: "Inspirada en el libro de Ester, esta historia revela cómo una joven guiada por su fe es llevada al corazón del imperio persa para cumplir un propósito divino." },
  { id: 2, bg: "https://static.wixstatic.com/media/859174_298156d13007436bade3f3219dac7771~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_373d72b97d7e49c6a2ed99da442b8e5a~mv2.png", desc: "En una etapa de corrupción espiritual, el reino de Israel se hunde bajo decisiones alejadas de Dios. Idolatría y guerras se entrelazan." },
  { id: 3, bg: "https://static.wixstatic.com/media/859174_3f7434c3c97d4ed982befff72cfdbd27~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_90bd74be414340e29671df248bade4a3~mv2.png", desc: "De perseguidor implacable a mensajero de Cristo, vive la transformación radical de Pablo de Tarso. Una fe inquebrantable que desafía imperios." },
  { id: 4, bg: "https://static.wixstatic.com/media/859174_b9159dfbf8cc403eb180531c8338589e~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_57a3f59e3dc44abc96ad1508f1ecf6db~mv2.png", desc: "La fe de un hombre justo es llevada al límite tras perderlo todo. En medio del dolor, Job enfrenta preguntas profundas sobre el sufrimiento." },
  { id: 5, bg: "https://static.wixstatic.com/media/859174_25f3802c3bc0432b85c91bed4f588599~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_483e446bb507429694def615b148509d~mv2.png", desc: "De pastor de ovejas al trono de Israel, sigue la vida de David. Gigantes y batallas marcan el camino de un líder conforme al corazón de Dios." },
  { id: 6, bg: "https://static.wixstatic.com/media/859174_d16e8080cf4043e5a7b17a2538f8dcf5~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_4f27eb2a8b7741f69eccead2e7fd0dcf~mv2.png", desc: "En el Imperio romano, surge un amor imposible entre Elisa y Cayo. Las persecuciones ponen a prueba su relación y su esperanza." }
];

export default function HeroBanner() {
  const sliderRef = useRef<Slider | null>(null);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const stopAndRestartAutoplay = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsAutoplay(false);
    timerRef.current = setTimeout(() => setIsAutoplay(true), 10000);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    stopAndRestartAutoplay();
    const elements = document.querySelectorAll<HTMLElement>('.hero-focusable');
    if (e.key === 'ArrowRight' && index < elements.length - 1) {
      e.preventDefault(); e.stopPropagation();
      elements[index + 1].focus();
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault(); e.stopPropagation();
      elements[index - 1].focus();
    }
  };

  const settings = {
    dots: false, infinite: true, speed: 1000,
    autoplay: isAutoplay, autoplaySpeed: 5000,
    pauseOnHover: false, arrows: false,
  };

  return (
    <section className="relative w-full h-[85vh] bg-black overflow-hidden">
      <Slider ref={sliderRef} {...settings}>
        {banners.map((item) => (
          <div key={item.id} className="relative w-full h-[85vh] outline-none">
            <Image src={item.bg} alt="Banner" fill className="object-cover opacity-100" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent z-10 w-2/3" />
            
            <div className="absolute inset-0 z-20 flex flex-col justify-center px-24">
              <div className="relative w-[500px] h-[180px] mb-6 drop-shadow-2xl">
                <Image src={item.logo} alt="Logo" fill className="object-contain object-left" />
              </div>
              <p className="max-w-[650px] text-white text-[22px] font-medium mb-8 leading-relaxed text-justify opacity-95">
                {item.desc}
              </p>
              <div className="flex items-center gap-6">
                <button onKeyDown={(e) => handleKeyDown(e, 0)} className="hero-focusable flex items-center justify-center gap-3 bg-[#F09800] text-white px-9 py-4 rounded-lg font-bold text-xl outline-none focus:scale-105 focus:ring-4 focus:ring-white transition-all">
                  <FaPlay className="text-sm" /> Ver Ahora
                </button>
                <button onKeyDown={(e) => handleKeyDown(e, 1)} className="hero-focusable flex items-center justify-center gap-3 bg-white/10 text-white px-9 py-4 rounded-lg font-bold border border-white/20 text-xl outline-none focus:scale-105 focus:ring-4 focus:ring-white transition-all">
                  <HiOutlineInformationCircle className="text-2xl" /> Más Información
                </button>
                <button onKeyDown={(e) => handleKeyDown(e, 2)} className="hero-focusable flex items-center justify-center gap-3 bg-[#F09800] text-white px-9 py-4 rounded-lg font-bold text-xl outline-none focus:scale-105 focus:ring-4 focus:ring-white transition-all">
                  <BiDonateHeart className="text-2xl" /> Donar
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      {/* Dots manuales para TV */}
      <div className="absolute bottom-10 left-24 z-30 flex gap-4">
        {banners.map((_, i) => (
          <button key={i} onKeyDown={(e) => handleKeyDown(e, i + 3)} onClick={() => sliderRef.current?.slickGoTo(i)}
            className="hero-focusable w-3 h-3 rounded-full bg-white/30 outline-none focus:bg-[#F09800] focus:scale-125 transition-all" />
        ))}
      </div>
    </section>
  );
}
