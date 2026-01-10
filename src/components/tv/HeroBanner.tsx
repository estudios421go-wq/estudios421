import React, { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import { BiDonateHeart } from 'react-icons/bi';

const banners = [
  { id: 1, bg: "https://static.wixstatic.com/media/859174_8880c8a667894fd1af103a0336171721~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_6eb0c42c44e340d2a314f7be009d6e8a~mv2.png", desc: "Inspirada en el libro de Ester, esta historia revela cómo una joven guiada por su fe es llevada al corazón del imperio persa para cumplir un propósito divino. Una producción de alta calidad que nos transporta a los tiempos bíblicos con una narrativa poderosa." },
  { id: 2, bg: "https://static.wixstatic.com/media/859174_298156d13007436bade3f3219dac7771~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_373d72b97d7e49c6a2ed99da442b8e5a~mv2.png", desc: "En una etapa de corrupción espiritual, el reino de Israel se hunde bajo decisiones alejadas de Dios. Idolatría y guerras se entrelazan en una lucha desesperada por recuperar la fe perdida en los tiempos de los grandes profetas." },
  { id: 3, bg: "https://static.wixstatic.com/media/859174_3f7434c3c97d4ed982befff72cfdbd27~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_90bd74be414340e29671df248bade4a3~mv2.png", desc: "De perseguidor implacable a mensajero de Cristo, vive la transformación radical de Pablo de Tarso. Una fe inquebrantable que desafía imperios y cambia el rumbo de la historia de la humanidad para siempre." },
  { id: 4, bg: "https://static.wixstatic.com/media/859174_b9159dfbf8cc403eb180531c8338589e~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_57a3f59e3dc44abc96ad1508f1ecf6db~mv2.png", desc: "La fe de un hombre justo es llevada al límite tras perderlo todo. En medio del dolor, Job enfrenta preguntas profundas sobre el sufrimiento humano y la soberanía divina en una historia que ha conmovido generaciones." },
  { id: 5, bg: "https://static.wixstatic.com/media/859174_25f3802c3bc0432b85c91bed4f588599~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_483e446bb507429694def615b148509d~mv2.png", desc: "De pastor de ovejas al trono de Israel, sigue la vida de David. Gigantes, traiciones y batallas marcan el camino de un líder conforme al corazón de Dios en una épica inolvidable." },
  { id: 6, bg: "https://static.wixstatic.com/media/859174_d16e8080cf4043e5a7b17a2538f8dcf5~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_4f27eb2a8b7741f69eccead2e7fd0dcf~mv2.png", desc: "En el Imperio romano, surge un amor imposible entre Elisa y Cayo. Las persecuciones ponen a prueba su relación y su esperanza en un mundo que intenta apagar la luz de su nueva fe." }
];

export default function HeroBanner() {
  const sliderRef = useRef<Slider | null>(null);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // ⏱️ Lógica de 10 segundos para retomar rotación
  const startAutoplayTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsAutoplay(false);
    timerRef.current = setTimeout(() => {
      setIsAutoplay(true);
    }, 10000);
  };

  const handleBtnKeyDown = (e: React.KeyboardEvent, btnIndex: number) => {
    startAutoplayTimer();
    const buttons = document.querySelectorAll<HTMLElement>('.hero-focusable');
    
    // Navegación horizontal entre botones y puntos
    if (e.key === 'ArrowRight' && btnIndex < buttons.length - 1) {
      e.preventDefault();
      e.stopPropagation(); // Bloquea el cambio de banner con flechas
      buttons[btnIndex + 1].focus();
    }
    if (e.key === 'ArrowLeft' && btnIndex > 0) {
      e.preventDefault();
      e.stopPropagation(); // Bloquea el cambio de banner con flechas
      buttons[btnIndex - 1].focus();
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: isAutoplay,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    arrows: false,
    dotsClass: "slick-dots custom-dots",
  };

  return (
    <section className="relative w-full h-[95vh] bg-black overflow-hidden">
      <Slider ref={sliderRef} {...settings}>
        {banners.map((item) => (
          <div key={item.id} className="relative w-full h-[95vh] outline-none">
            <div className="relative w-full h-full">
               <Image src={item.bg} alt="Banner" fill className="object-cover opacity-100" priority />
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent z-10 w-2/3" />
            
            <div className="absolute inset-0 z-20 flex flex-col justify-center px-24 pt-10">
              {/* Logo Escalado para TV */}
              <div className="relative w-[550px] h-[200px] mb-8 drop-shadow-2xl">
                <Image src={item.logo} alt="Logo" fill className="object-contain object-left" />
              </div>
              
              {/* Descripción Completa y Grande */}
              <p className="max-w-[850px] text-white text-[24px] font-medium mb-12 leading-relaxed opacity-95 text-justify drop-shadow-lg">
                {item.desc}
              </p>
              
              <div className="flex items-center gap-8">
                <button 
                  onKeyDown={(e) => handleBtnKeyDown(e, 0)}
                  className="hero-focusable flex items-center justify-center gap-4 bg-[#F09800] text-white px-12 py-5 rounded-xl font-black text-2xl shadow-2xl transition-all outline-none focus:scale-110 focus:ring-4 focus:ring-white"
                >
                  <FaPlay /> Ver Ahora
                </button>

                <button 
                  onKeyDown={(e) => handleBtnKeyDown(e, 1)}
                  className="hero-focusable flex items-center justify-center gap-4 bg-white/10 text-white px-12 py-5 rounded-xl font-black backdrop-blur-md border border-white/20 text-2xl transition-all outline-none focus:scale-110 focus:ring-4 focus:ring-white"
                >
                  <HiOutlineInformationCircle className="text-3xl" /> Más Información
                </button>

                <button 
                  onKeyDown={(e) => handleBtnKeyDown(e, 2)}
                  className="hero-focusable flex items-center justify-center gap-4 bg-[#F09800] text-white px-12 py-5 rounded-xl font-black text-2xl shadow-lg transition-all outline-none focus:scale-110 focus:ring-4 focus:ring-white"
                >
                  <BiDonateHeart className="text-3xl" /> Donar
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Puntos de navegación manual (Dots) integrados al flujo del control */}
      <div className="absolute bottom-16 left-24 z-30 flex gap-4">
         {banners.map((_, i) => (
           <button 
             key={i} 
             onKeyDown={(e) => handleBtnKeyDown(e, i + 3)}
             onClick={() => sliderRef.current?.slickGoTo(i)}
             className="hero-focusable w-4 h-4 rounded-full bg-white/30 outline-none focus:bg-[#F09800] focus:scale-150 transition-all"
           />
         ))}
      </div>

      <style jsx global>{`
        .custom-dots { display: none !important; }
      `}</style>
    </section>
  );
}
