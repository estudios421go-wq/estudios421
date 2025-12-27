import React, { useRef } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import { BiDonateHeart } from 'react-icons/bi';

const banners = [
  { id: 1, bg: "https://static.wixstatic.com/media/859174_8880c8a667894fd1af103a0336171721~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_6eb0c42c44e340d2a314f7be009d6e8a~mv2.png", desc: "Inspirada en el libro de Ester, esta historia revela cómo una joven guiada por su fe es llevada al corazón del imperio persa para cumplir un propósito divino. Entre intrigas y amenazas, su valentía demuestra que Dios actúa incluso en los momentos más oscuros." },
  { id: 2, bg: "https://static.wixstatic.com/media/859174_298156d13007436bade3f3219dac7771~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_373d72b97d7e49c6a2ed99da442b8e5a~mv2.png", desc: "En una etapa de corrupción espiritual, el reino de Israel se hunde bajo decisiones alejadas de Dios. Idolatría y guerras se entrelazan mientras los profetas alzan su voz llamando al arrepentimiento antes de la ruina inminente." },
  { id: 3, bg: "https://static.wixstatic.com/media/859174_3f7434c3c97d4ed982befff72cfdbd27~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_90bd74be414340e29671df248bade4a3~mv2.png", desc: "De perseguidor implacable a mensajero de Cristo, vive la transformación radical de Pablo de Tarso. Una fe inquebrantable que desafía imperios y demuestra que ninguna vida está fuera del alcance de la gracia de Dios." },
  { id: 4, bg: "https://static.wixstatic.com/media/859174_b9159dfbf8cc403eb180531c8338589e~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_57a3f59e3dc44abc96ad1508f1ecf6db~mv2.png", desc: "La fe de un hombre justo es llevada al límite tras perderlo todo. En medio del dolor y el silencio divino, Job enfrenta preguntas profundas sobre el sufrimiento, aprendiendo que la soberanía de Dios nunca abandona al que confía." },
  { id: 5, bg: "https://static.wixstatic.com/media/859174_25f3802c3bc0432b85c91bed4f588599~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_483e446bb507429694def615b148509d~mv2.png", desc: "De pastor de ovejas al trono de Israel, sigue la vida de David. Gigantes, batallas y errores personales marcan el camino de un líder conforme al corazón de Dios, dispuesto a obedecer a pesar de sus propias imperfecciones." },
  { id: 6, bg: "https://static.wixstatic.com/media/859174_d16e8080cf4043e5a7b17a2538f8dcf5~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_4f27eb2a8b7741f69eccead2e7fd0dcf~mv2.png", desc: "En el Imperio romano, surge un amor imposible entre Elisa y Cayo. Las persecuciones ponen a prueba su relación, mientras la esperanza revela que el amor de Dios tiene el poder de restaurar y redimir cualquier vida rota." }
];

export default function HeroBanner() {
  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 4500, // Un poco más de tiempo para leer en móvil
    pauseOnHover: false,
    pauseOnFocus: false,
    arrows: false,
    dotsClass: "slick-dots custom-dots",
    appendDots: (dots: any) => (
      <div>
        <ul className="m-0"> {dots} </ul>
      </div>
    ),
  };

  return (
    <section className="relative w-full h-[85vh] md:h-[95vh] bg-black overflow-hidden">
      <Slider ref={sliderRef} {...settings}>
        {banners.map((item) => (
          <div key={item.id} className="relative w-full h-[85vh] md:h-[95vh] outline-none">
            {/* Imagen de fondo con ajuste de brillo */}
            <Image src={item.bg} alt="Banner" fill className="object-cover opacity-80 md:opacity-85" priority />
            
            {/* Gradientes corregidos para profundidad */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent z-10" />
            
            <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-20 lg:px-32 mt-10 md:mt-12">
              {/* Logo: Tamaño responsivo */}
              <div className="relative w-[180px] h-[70px] md:w-[380px] md:h-[140px] mb-4 md:mb-6">
                <Image src={item.logo} alt="Logo" fill className="object-contain object-left" />
              </div>
              
              {/* Descripción: Límite de líneas en móvil */}
              <p className="max-w-[480px] text-white text-[13px] md:text-[17px] font-medium mb-6 md:mb-8 leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] line-clamp-4 md:line-clamp-none">
                {item.desc}
              </p>
              
              {/* Botones: Reorganizados para móvil */}
              <div className="flex flex-wrap gap-3 md:gap-4 max-w-[350px] md:max-w-none">
                <button style={{ backgroundColor: '#F09800' }} className="flex items-center justify-center gap-2 text-white px-5 md:px-7 py-2 md:py-2.5 rounded font-bold hover:scale-105 transition transform text-xs md:text-base shadow-xl flex-1 md:flex-none">
                  <FaPlay className="text-[10px]" /> Ver Ahora
                </button>
                <button className="flex items-center justify-center gap-2 bg-white/10 text-white px-5 md:px-7 py-2 md:py-2.5 rounded font-bold backdrop-blur-md border border-white/20 hover:bg-white/30 transition text-xs md:text-base flex-1 md:flex-none">
                  <HiOutlineInformationCircle className="text-lg md:text-xl" /> Info
                </button>
                <button style={{ backgroundColor: '#F09800' }} className="flex items-center justify-center gap-2 text-white px-5 md:px-7 py-2 md:py-2.5 rounded font-bold hover:scale-105 transition transform text-xs md:text-base shadow-lg shadow-orange-500/20 w-full md:w-auto">
                  <BiDonateHeart className="text-lg md:text-xl" /> Donar
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <style jsx global>{`
        .custom-dots { 
          bottom: 60px !important; 
          z-index: 50 !important;
        }
        @media (min-width: 768px) {
          .custom-dots { bottom: 70px !important; }
        }
        .custom-dots li {
          margin: 0 4px !important;
        }
        .custom-dots li button:before { 
          color: white !important; 
          font-size: 10px !important; 
          opacity: 0.4; 
          transition: all 0.3s ease;
        }
        @media (min-width: 768px) {
          .custom-dots li button:before { font-size: 14px !important; }
        }
        .custom-dots li.slick-active button:before { 
          color: #F09800 !important; 
          opacity: 1; 
          font-size: 12px !important;
        }
        @media (min-width: 768px) {
          .custom-dots li.slick-active button:before { font-size: 16px !important; }
        }
      `}</style>
    </section>
  );
}