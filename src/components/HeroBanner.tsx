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
    autoplaySpeed: 3500,
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
    <section className="relative w-full h-[95vh] bg-black overflow-hidden">
      <Slider ref={sliderRef} {...settings}>
        {banners.map((item) => (
          <div key={item.id} className="relative w-full h-[95vh] outline-none">
            {/* Aumento de opacidad para mayor brillo */}
            <Image src={item.bg} alt="Banner" fill className="object-cover opacity-85" priority />
            
            {/* Gradientes suavizados para no oscurecer demasiado la imagen */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent z-10" />
            
            <div className="absolute inset-0 z-20 flex flex-col justify-center px-10 md:px-20 lg:px-32 mt-12">
              <div className="relative w-[280px] h-[90px] md:w-[380px] md:h-[140px] mb-6">
                <Image src={item.logo} alt="Logo" fill className="object-contain object-left" />
              </div>
              
              <p className="max-w-[480px] text-white text-[15px] md:text-[17px] font-medium mb-8 leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {item.desc}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button style={{ backgroundColor: '#F09800' }} className="flex items-center gap-2 text-white px-7 py-2.5 rounded font-bold hover:scale-105 transition transform text-sm md:text-base shadow-xl">
                  <FaPlay className="text-xs" /> Ver Ahora
                </button>
                <button className="flex items-center gap-2 bg-white/10 text-white px-7 py-2.5 rounded font-bold backdrop-blur-md border border-white/20 hover:bg-white/30 transition text-sm md:text-base">
                  <HiOutlineInformationCircle className="text-xl" /> Más Información
                </button>
                <button style={{ backgroundColor: '#F09800' }} className="flex items-center gap-2 text-white px-7 py-2.5 rounded font-bold hover:scale-105 transition transform text-sm md:text-base shadow-lg shadow-orange-500/20">
                  <BiDonateHeart className="text-xl" /> Donar
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <style jsx global>{`
        .custom-dots { 
          bottom: 70px !important; 
          z-index: 50 !important;
        }
        .custom-dots li {
          margin: 0 4px !important;
        }
        .custom-dots li button:before { 
          color: white !important; 
          font-size: 14px !important; 
          opacity: 0.4; 
          transition: all 0.3s ease;
        }
        .custom-dots li.slick-active button:before { 
          color: #F09800 !important; 
          opacity: 1; 
          font-size: 16px !important;
        }
        .custom-dots li button {
          width: 20px !important;
          height: 20px !important;
          cursor: pointer !important;
        }
      `}</style>
    </section>
  );
}