import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoMenuOutline, IoCloseOutline, IoChevronBack, IoChevronForward, IoList, IoClose } from 'react-icons/io5';
import Footer from '../../Footer';

const Navbar = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Series Bíblicas', href: '/series-biblicas' },
    { name: 'Series TV', href: '/series-tv' },
    { name: 'Películas', href: '/peliculas' },
  ];
  const languages = [
    { name: 'ESP', img: "https://static.wixstatic.com/media/859174_367960b11c1c44ba89cd1582fd1b5776~mv2.png" },
    { name: 'ENG', img: "https://static.wixstatic.com/media/859174_35112d9ffe234d6f9dcef16cf8f7544e~mv2.png" },
    { name: 'PT', img: "https://static.wixstatic.com/media/859174_830f1c20656e4d44a819bedfc13a22cc~mv2.png" }
  ];
  return (
    <>
      <nav className={`fixed top-0 w-full z-[100] px-4 py-3 flex items-center gap-4 transition-all duration-300 ${isScrolled ? 'bg-black shadow-lg' : 'bg-gradient-to-b from-black/90 to-transparent'}`}>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="text-white text-3xl z-[110]" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <IoCloseOutline /> : <IoMenuOutline />}</button>
          <Link href="/"><div className="relative w-[110px] h-[30px]"><Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" fill className="object-contain" priority /></div></Link>
        </div>
        <div className="flex-grow relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><IoSearchOutline size={16} /></div>
          <input type="text" placeholder="Buscar..." className="w-full bg-white/10 border border-white/20 rounded-full py-1.5 pl-9 pr-4 text-xs text-white outline-none focus:bg-white/20 focus:border-[#F09800] transition-all" />
        </div>
        <div className="flex-shrink-0"><Image src="https://static.wixstatic.com/media/859174_26ca840644ce4f519c0458c649f44f34~mv2.png" alt="User" width={32} height={32} className="rounded-full ring-2 ring-white/10" /></div>
      </nav>
      <div className={`fixed inset-0 bg-black/98 z-[90] transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full pt-24 px-8 gap-8">
          <div className="flex flex-col gap-6">
            <p className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/10 pb-2">Navegación</p>
            {navLinks.map((link) => (<Link key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className={`text-xl font-bold ${router.pathname === link.href ? 'text-[#F09800]' : 'text-white'}`}>{link.name}</Link>))}
          </div>
          <div className="flex flex-col gap-6 mt-4">
            <p className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/10 pb-2">Idioma</p>
            <div className="flex gap-6">
              {languages.map((lang) => (<button key={lang.name} className="flex flex-col items-center gap-2 active:scale-95 transition-transform"><img src={lang.img} alt={lang.name} className="w-10 h-10 object-contain" /><span className="text-[10px] text-white font-bold">{lang.name}</span></button>))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const genesisEpisodes = [
  { id: 1, title: "El Edén", dur: "43:16", thumb: "https://static.wixstatic.com/media/859174_c53ccb92b54b4aafb86c104d6f72e589~mv2.jpg", url: "https://ok.ru/videoembed/13888818973184" },
  { id: 2, title: "Las Consecuencias", dur: "43:09", thumb: "https://static.wixstatic.com/media/859174_ecc4e327ec1b460aaa9939ab537584f2~mv2.jpg", url: "https://ok.ru/videoembed/13888837454336" },
  { id: 3, title: "Hermanos", dur: "42:59", thumb: "https://static.wixstatic.com/media/859174_bb68e238fa014ecfada9c2468e0cdd7f~mv2.jpg", url: "https://ok.ru/videoembed/13888884902400" },
  { id: 4, title: "La Opción", dur: "43:00", thumb: "https://static.wixstatic.com/media/859174_766dd812e5ed40beb8d7a2520e797b6b~mv2.jpg", url: "https://ok.ru/videoembed/13888885230080" },
  { id: 5, title: "Una Idea", dur: "43:08", thumb: "https://static.wixstatic.com/media/859174_a96889e87ab8424c9e72f665c45af4dc~mv2.jpg", url: "https://ok.ru/videoembed/13889027836416" },
  { id: 6, title: "El Arca", dur: "43:10", thumb: "https://static.wixstatic.com/media/859174_6e462903bfa94004aa1ac07c2c929f08~mv2.jpg", url: "https://ok.ru/videoembed/14047823858176" },
  { id: 7, title: "Diversión", dur: "43:17", thumb: "https://static.wixstatic.com/media/859174_d469b477a1934dbca44c93001dbcc677~mv2.jpg", url: "https://ok.ru/videoembed/14047824251392" },
  { id: 8, title: "El Diluvio", dur: "43:13", thumb: "https://static.wixstatic.com/media/859174_1b0e1a7eccee4d7aaf17fdc70a7995f6~mv2.jpg", url: "https://ok.ru/videoembed/14150140692992" },
  { id: 9, title: "En El Arca", dur: "43:23", thumb: "https://static.wixstatic.com/media/859174_73e1cf8e8bb34aaa9cee8a1849cf6ed6~mv2.jpg", url: "https://ok.ru/videoembed/14047825103360" },
  { id: 10, title: "El Cazador", dur: "44:01", thumb: "https://static.wixstatic.com/media/859174_67ba82bba9da42e7a37ebfec57fbb009~mv2.jpg", url: "https://ok.ru/videoembed/14047825234432" },
  { id: 11, title: "Una Torre", dur: "43:31", thumb: "https://static.wixstatic.com/media/859174_034a79b100044cd8a0d4da76448fd8d8~mv2.jpg", url: "https://ok.ru/videoembed/14047825562112" },
  { id: 12, title: "La Construcción", dur: "43:42", thumb: "https://static.wixstatic.com/media/859174_7413f099a7624093a77659454539a67c~mv2.jpg", url: "https://ok.ru/videoembed/14047825758720" },
  { id: 13, title: "Una Diosa", dur: "43:40", thumb: "https://static.wixstatic.com/media/859174_d3c7e37d9e014fed8acdff5de5c03bae~mv2.jpg", url: "https://ok.ru/videoembed/14047826020864" },
  { id: 14, title: "Mucho Peligro", dur: "43:54", thumb: "https://static.wixstatic.com/media/859174_33c3b809730740debf4a66d3f9cc68fa~mv2.jpg", url: "https://ok.ru/videoembed/14047826414080" },
  { id: 15, title: "Babel", dur: "43:14", thumb: "https://static.wixstatic.com/media/859174_474cfbdee86b48eda5a923d997a1f0fb~mv2.jpg", url: "https://ok.ru/videoembed/14047826610688" },
  { id: 16, title: "Varios Lenguajes", dur: "41:57", thumb: "https://static.wixstatic.com/media/859174_fdec34e0cc80490cb8cf66248832c8da~mv2.jpg", url: "https://ok.ru/videoembed/14047826807296" },
  { id: 17, title: "El Negociador", dur: "42:43", thumb: "https://static.wixstatic.com/media/859174_a7e6177c5a8c461097cf175721b1eba4~mv2.jpg", url: "https://ok.ru/videoembed/14150138399232" },
  { id: 18, title: "La Misión", dur: "42:57", thumb: "https://static.wixstatic.com/media/859174_86cbd42650ec49c3b82275a654f10d3b~mv2.jpg", url: "https://ok.ru/videoembed/14047827462656" },
  { id: 19, title: "La Prueba Del Queso", dur: "43:24", thumb: "https://static.wixstatic.com/media/859174_3d349902473c4c3aa3eb1db37163ae30~mv2.jpg", url: "https://ok.ru/videoembed/14047827659264" },
  { id: 20, title: "La Caravana", dur: "42:54", thumb: "https://static.wixstatic.com/media/859174_2c151c0038ae481ead043e2721dd5904~mv2.jpg", url: "https://ok.ru/videoembed/14047828249088" },
  { id: 21, title: "Dificultades", dur: "43:05", thumb: "https://static.wixstatic.com/media/859174_cb402528eb2649e998c3256095f379fc~mv2.jpg", url: "https://ok.ru/videoembed/14066036247040" },
  { id: 22, title: "Extraño Aliado", dur: "42:57", thumb: "https://static.wixstatic.com/media/859174_561eb375440a412c882b683bbf3c629e~mv2.jpg", url: "https://ok.ru/videoembed/14066242095616" },
  { id: 23, title: "Alta Traición", dur: "42:09", thumb: "https://static.wixstatic.com/media/859174_3016959269d74015b4a2b9ee6eaf102d~mv2.jpg", url: "https://ok.ru/videoembed/14066390534656" },
  { id: 24, title: "Negociación", dur: "42:39", thumb: "https://static.wixstatic.com/media/859174_f027174b1e9740e381f62b72a5d851f7~mv2.jpg", url: "https://ok.ru/videoembed/14066469833216" },
  { id: 25, title: "Seducción", dur: "43:43", thumb: "https://static.wixstatic.com/media/859174_ed1f3fc7f1cf4eb9a67196de41e183e2~mv2.jpg", url: "https://ok.ru/videoembed/14066543561216" },
  { id: 26, title: "Enemigos", dur: "43:02", thumb: "https://static.wixstatic.com/media/859174_c505a168f454441eadeba46953540f9f~mv2.jpg", url: "https://ok.ru/videoembed/14066831329792" },
  { id: 27, title: "El Dolor", dur: "42:52", thumb: "https://static.wixstatic.com/media/859174_5c847ca1398044b994cc21e84d87cfc8~mv2.jpg", url: "https://ok.ru/videoembed/14066832181760" },
  { id: 28, title: "Caída", dur: "43:04", thumb: "https://static.wixstatic.com/media/859174_b28c84e163b24e06857f74aa023413f7~mv2.jpg", url: "https://ok.ru/videoembed/14067043731968" },
  { id: 29, title: "Sin Piedad", dur: "42:59", thumb: "https://static.wixstatic.com/media/859174_1be3c318c2d14a85b780999e1aa04f8f~mv2.jpg", url: "https://ok.ru/videoembed/14067045501440" },
  { id: 30, title: "Niños Perdidos", dur: "43:08", thumb: "https://static.wixstatic.com/media/859174_c55d4d0dba08490aa82546bcd1cae062~mv2.jpg", url: "https://ok.ru/videoembed/14067047074304" },
  { id: 31, title: "Mal Presagio", dur: "43:04", thumb: "https://static.wixstatic.com/media/859174_e04880604ccd429b813074deb4d38609~mv2.jpg", url: "https://ok.ru/videoembed/14067248531968" },
  { id: 32, title: "Entrega", dur: "42:19", thumb: "https://static.wixstatic.com/media/859174_dc5707ef527e4998a2f921cfe124d53d~mv2.jpg", url: "https://ok.ru/videoembed/14067249515008" },
  { id: 33, title: "Ataque", dur: "42:59", thumb: "https://static.wixstatic.com/media/859174_3961218640c9482bb8a5bc79fee57983~mv2.jpg", url: "https://ok.ru/videoembed/14067250366976" },
  { id: 34, title: "Segunda Esposa", dur: "42:47", thumb: "https://static.wixstatic.com/media/859174_9cfd8cdf8ac74b9aa31ba142f99a01d2~mv2.jpg", url: "https://ok.ru/videoembed/14067690179072" },
  { id: 35, title: "Se Acabó", dur: "43:00", thumb: "https://static.wixstatic.com/media/859174_57f4a8a3b17d400391128d59b1d7d5b0~mv2.jpg", url: "https://ok.ru/videoembed/14067691293184" },
  { id: 36, title: "Sospecha", dur: "42:22", thumb: "https://static.wixstatic.com/media/859174_7fa905c17bbc47cfaee808f3f62ddf28~mv2.jpg", url: "https://ok.ru/videoembed/14067692341760" },
  { id: 37, title: "Veneno", dur: "43:08", thumb: "https://static.wixstatic.com/media/859174_fcc8aa477f354fdaa961832256e55c38~mv2.jpg", url: "https://ok.ru/videoembed/14067881478656" },
  { id: 38, title: "Los Juicios", dur: "43:04", thumb: "https://static.wixstatic.com/media/859174_d467764cd629419baebd8be1767cf99c~mv2.jpg", url: "https://ok.ru/videoembed/14068537297408" },
  { id: 39, title: "Testigo", dur: "41:46", thumb: "https://static.wixstatic.com/media/859174_89e2d5ec3ac84937849b6d3cac362763~mv2.jpg", url: "https://ok.ru/videoembed/14068537559552" },
  { id: 40, title: "La Juventud", dur: "42:53", thumb: "https://static.wixstatic.com/media/859174_62d406dd58b04b8d96225d94a3869a2e~mv2.jpg", url: "https://ok.ru/videoembed/14068537690624" },
  { id: 41, title: "Amor Con Beneficios", dur: "43:09", thumb: "https://static.wixstatic.com/media/859174_78091a18af9f40f4b1cf465aed6e5995~mv2.jpg", url: "https://ok.ru/videoembed/14150140692992" },
  { id: 42, title: "La Tercera Vez", dur: "43:07", thumb: "https://static.wixstatic.com/media/859174_b6aebdd084bc483ba65a860e0a28f295~mv2.jpg", url: "https://ok.ru/videoembed/14150141086208" },
  { id: 43, title: "Buscar Un Culpable", dur: "43:03", thumb: "https://static.wixstatic.com/media/859174_d98806cb671946f085ff53bae7377195~mv2.jpg", url: "https://ok.ru/videoembed/14150141348352" },
  { id: 44, title: "Decepciones", dur: "42:39", thumb: "https://static.wixstatic.com/media/859174_b914f9421c314013a6648acd7afb6d6d~mv2.jpg", url: "https://ok.ru/videoembed/14150798150144" },
  { id: 45, title: "Imperdonable", dur: "44:19", thumb: "https://static.wixstatic.com/media/859174_b69ef528d2564b3aba4fbb35e55a48e5~mv2.jpg", url: "https://ok.ru/videoembed/14150798936576" },
  { id: 46, title: "La Sucesión", dur: "42:40", thumb: "https://static.wixstatic.com/media/859174_56c54a373cb3410bbdc3695a8405bc56~mv2.jpg", url: "https://ok.ru/videoembed/14150799460864" },
  { id: 47, title: "Un Nuevo Capítulo", dur: "43:20", thumb: "https://static.wixstatic.com/media/859174_24fc049c298f415a98989861efcdb938~mv2.jpg", url: "https://ok.ru/videoembed/14150799460864" },
  { id: 48, title: "Éxito Relativo", dur: "42:56", thumb: "https://static.wixstatic.com/media/859174_d7c1453926994d6ba1b0dede3974e3bf~mv2.jpg", url: "https://ok.ru/videoembed/14161924459008" },
  { id: 49, title: "Duelo Profundo", dur: "42:48", thumb: "https://static.wixstatic.com/media/859174_b0c7558dc845455f9676e0ccf93e1eda~mv2.jpg", url: "https://ok.ru/videoembed/14150800902656" },
  { id: 50, title: "La Invasión", dur: "43:08", thumb: "https://static.wixstatic.com/media/859174_fad82a9a70b14cdbbfee2364d6518017~mv2.jpg", url: "https://ok.ru/videoembed/14150801361408" },
  { id: 51, title: "Dudar De Los Dioses", dur: "43:00", thumb: "https://static.wixstatic.com/media/859174_2a445413057a4f9bb5baee811007535a~mv2.jpg", url: "https://ok.ru/videoembed/14150803458560" },
  { id: 52, title: "El Incendio", dur: "42:50", thumb: "https://static.wixstatic.com/media/859174_987750ef18df440d99a987c8d79d437f~mv2.jpg", url: "https://ok.ru/videoembed/14150803851776" },
  { id: 53, title: "Un Nuevo Destino", dur: "42:22", thumb: "https://static.wixstatic.com/media/859174_cbfb83be62ef48b7ad789c3eac4066db~mv2.jpg", url: "https://ok.ru/videoembed/14150804376064" },
  { id: 54, title: "Aprendizaje", dur: "43:00", thumb: "https://static.wixstatic.com/media/859174_d5b086b8ddaa43b18ebeec9c4ba4f7f3~mv2.jpg", url: "https://ok.ru/videoembed/14150804834816" },
  { id: 55, title: "Locura Juvenil", dur: "42:17", thumb: "https://static.wixstatic.com/media/859174_444e73396b1c487e893f472050367411~mv2.jpg", url: "https://ok.ru/videoembed/14150805948928" },
  { id: 56, title: "Mensaje Divino", dur: "43:01", thumb: "https://static.wixstatic.com/media/859174_12dd1c8e2e5845c5b169f89714ae3098~mv2.jpg", url: "https://ok.ru/videoembed/14150807128576" },
  { id: 57, title: "Un Plan Riesgoso", dur: "43:09", thumb: "https://static.wixstatic.com/media/859174_5dc5720f58d8472b913f84c91ecdd84f~mv2.jpg", url: "https://ok.ru/videoembed/14150807718400" },
  { id: 58, title: "Escena Sangrienta", dur: "41:16", thumb: "https://static.wixstatic.com/media/859174_fd60d9d896024cac8bd9bc25f409731c~mv2.jpg", url: "https://ok.ru/videoembed/14150808177152" },
  { id: 59, title: "Sin Más Mensajes", dur: "43:15", thumb: "https://static.wixstatic.com/media/859174_a2e5bb0d4a914c08a7710ee008903a5b~mv2.jpg", url: "https://ok.ru/videoembed/14150808504832" },
  { id: 60, title: "Seguir Caminando", dur: "41:41", thumb: "https://static.wixstatic.com/media/859174_071a3992c2824fa5a093a5920ecd46d4~mv2.jpg", url: "https://ok.ru/videoembed/14150809029120" },
  { id: 61, title: "Llegada A Egipto", dur: "42:09", thumb: "https://static.wixstatic.com/media/859174_250cde97d0f9488cad04a39edc4c9142~mv2.jpg", url: "https://ok.ru/videoembed/14186560555520" },
  { id: 62, title: "Belleza Inigualable", dur: "43:09", thumb: "https://static.wixstatic.com/media/859174_23677e8d5aa44bc2942f9fd25bbb9372~mv2.jpg", url: "https://ok.ru/videoembed/14186561079808" },
  { id: 63, title: "Hermana Falsa", dur: "42:30", thumb: "https://static.wixstatic.com/media/859174_eb6a8218c12743caa70f9a253420f677~mv2.jpg", url: "https://ok.ru/videoembed/14186562259456" },
  { id: 64, title: "Ser Una Reina", dur: "42:45", thumb: "https://static.wixstatic.com/media/859174_0c72f3c869e54eb78847e7cffcccb10b~mv2.jpg", url: "https://ok.ru/videoembed/14186563570176" },
  { id: 65, title: "Pedir Piedad", dur: "42:49", thumb: "https://static.wixstatic.com/media/859174_5ba7ac7371dd42a68ac3c1446782920f~mv2.jpg", url: "https://ok.ru/videoembed/14186564815360" },
  { id: 66, title: "Dolor Insoportable", dur: "41:52", thumb: "https://static.wixstatic.com/media/859174_4ee1ae4e0c4e4359a042a5b2b60f6347~mv2.jpg", url: "https://ok.ru/videoembed/14186565667328" },
  { id: 67, title: "Una Boda Accidentada", dur: "43:12", thumb: "https://static.wixstatic.com/media/859174_50b0a554ae874405aff2ca6836130a15~mv2.jpg", url: "https://ok.ru/videoembed/14186566126080" },
  { id: 68, title: "Enfermedad Y Traición", dur: "41:35", thumb: "https://static.wixstatic.com/media/859174_1afbefdb27114202bb770e32a9d9e23a~mv2.jpg", url: "https://ok.ru/videoembed/14186567698944" },
  { id: 69, title: "Separación", dur: "41:00", thumb: "https://static.wixstatic.com/media/859174_da3ab92520634ab184cce4528da06dfb~mv2.jpg", url: "https://ok.ru/videoembed/14196580485632" },
  { id: 70, title: "Divididos", dur: "42:24", thumb: "https://static.wixstatic.com/media/859174_05e900292bfc48b38a09022c2802384b~mv2.jpg", url: "https://ok.ru/videoembed/14196587760128" },
  { id: 71, title: "Seguir En Movimiento", dur: "41:48", thumb: "https://static.wixstatic.com/media/859174_9ddabb73ea934d3087a22c02d5061603~mv2.jpg", url: "https://ok.ru/videoembed/14196588677632" },
  { id: 72, title: "Rumores Ciertos", dur: "42:06", thumb: "https://static.wixstatic.com/media/859174_af08a7d7708f4921a7259fce8c911281~mv2.jpg", url: "https://ok.ru/videoembed/14196589398528" },
  { id: 73, title: "Bebé En Brazos", dur: "41:19", thumb: "https://static.wixstatic.com/media/859174_d170024984e744cfa596babcf8023865~mv2.jpg", url: "https://ok.ru/videoembed/14196590447104" },
  { id: 74, title: "Ella Pide Guerra", dur: "42:29", thumb: "https://static.wixstatic.com/media/859174_fdf59cf096904e4f9f341d7cd6ae61ec~mv2.jpg", url: "https://ok.ru/videoembed/14196593134080" },
  { id: 75, title: "Pocas Probabilidades", dur: "38:24", thumb: "https://static.wixstatic.com/media/859174_beb0a002fd68474b8ce636481316a262~mv2.jpg", url: "https://ok.ru/videoembed/14196594117120" },
  { id: 76, title: "Llegó La Guerra", dur: "41:24", thumb: "https://static.wixstatic.com/media/859174_2e471f18cb0a473d9315efb1ecbe6042~mv2.jpg", url: "https://ok.ru/videoembed/14196594772480" },
  { id: 77, title: "Por Los Viejos Tiempos", dur: "40:07", thumb: "https://static.wixstatic.com/media/859174_ed46734a48ff47c7ba41a6019e2e8ab9~mv2.jpg", url: "https://ok.ru/videoembed/14196596083200" },
  { id: 78, title: "Ataque Sorpresa", dur: "42:13", thumb: "https://static.wixstatic.com/media/859174_357497e9d37740e881454778fbabae61~mv2.jpg", url: "https://ok.ru/videoembed/14196606896640" },
  { id: 79, title: "El Plan Perfecto", dur: "39:59", thumb: "https://static.wixstatic.com/media/859174_3494e79ef3334e408c3de33e8cdf0e63~mv2.jpg", url: "https://ok.ru/videoembed/14196609518080" },
  { id: 80, title: "Difícil Perdón", dur: "39:17", thumb: "https://static.wixstatic.com/media/859174_ac7c347f7fac42ee9178a647a2f0b733~mv2.jpg", url: "https://ok.ru/videoembed/14196639599104" },
  { id: 81, title: "Regreso de la guerra", dur: "40:26", thumb: "https://static.wixstatic.com/media/859174_3e03aa69f30b413c88cec9427cb02b2b~mv2.jpg", url: "https://ok.ru/videoembed/14196640909824" },
  { id: 82, title: "Una respuesta", dur: "40:46", thumb: "https://static.wixstatic.com/media/859174_e2712b60188844229659a65125a992ba~mv2.jpg", url: "https://ok.ru/videoembed/14196642417152" },
  { id: 83, title: "Una ofrenda especial", dur: "42:10", thumb: "https://static.wixstatic.com/media/859174_2cdc13b735ba45959b978fb4949ce817~mv2.jpg", url: "https://ok.ru/videoembed/14196643465728" },
  { id: 84, title: "Una familia extraña", dur: "39:29", thumb: "https://static.wixstatic.com/media/859174_eb27322957c14e6698068556e68d21ec~mv2.jpg", url: "https://ok.ru/videoembed/14196645693952" },
  { id: 85, title: "Decisión tomada", dur: "43:24", thumb: "https://static.wixstatic.com/media/859174_25c989f4adb04e93b274e9aff5ea6159~mv2.jpg", url: "https://ok.ru/videoembed/14198145288704" },
  { id: 86, title: "Total agonía", dur: "42:29", thumb: "https://static.wixstatic.com/media/859174_4a7bce1f410f47aea77059d7ec8fcfb7~mv2.jpg", url: "https://ok.ru/videoembed/14199523314176" },
  { id: 87, title: "El hijo tardío", dur: "40:05", thumb: "https://static.wixstatic.com/media/859174_7dc6a3b3d42647249b92c01eeab5b383~mv2.jpg", url: "https://ok.ru/videoembed/14199523969536" },
  { id: 88, title: "Incrédula", dur: "42:45", thumb: "https://static.wixstatic.com/media/859174_ca7b9733f4dd4b74bbc3000bc9ce5a5f~mv2.jpg", url: "https://ok.ru/videoembed/14199524755968" },
  { id: 89, title: "Los visitantes", dur: "42:36", thumb: "https://static.wixstatic.com/media/859174_9086a4408c6444ada7ba569d3c3aa316~mv2.jpg", url: "https://ok.ru/videoembed/14199526263296" },
  { id: 90, title: "Viejos amores", dur: "43:07", thumb: "https://static.wixstatic.com/media/859174_49e7d015848c4fdba6f7386725c74e85~mv2.jpg", url: "https://ok.ru/videoembed/14199527705088" },
  { id: 91, title: "Justos desamparados", dur: "40:51", thumb: "https://static.wixstatic.com/media/859174_5d471f64db6242fdafecbddc44b71576~mv2.jpg", url: "https://ok.ru/videoembed/14199529146880" },
  { id: 92, title: "Sin mirar atrás", dur: "39:29", thumb: "https://static.wixstatic.com/media/859174_8b14b9f12908451ab8911dac49c7a359~mv2.jpg", url: "https://ok.ru/videoembed/14199530260992" },
  { id: 93, title: "Sodoma y Gomorra", dur: "40:32", thumb: "https://static.wixstatic.com/media/859174_be775f3452244071ab75a8e2dcf2231d~mv2.jpg", url: "https://ok.ru/videoembed/14199531309568" },
  { id: 94, title: "Noche sin fin", dur: "39:50", thumb: "https://static.wixstatic.com/media/859174_01b27579a964492f966b7ae07a853365~mv2.jpg", url: "https://ok.ru/videoembed/14200585652736" },
  { id: 95, title: "Pieza de bronce", dur: "39:51", thumb: "https://static.wixstatic.com/media/859174_14b9f3c66a3a4b87aceb638ab9424813~mv2.jpg", url: "https://ok.ru/videoembed/14200600398336" },
  { id: 96, title: "Descendencia", dur: "38:46", thumb: "https://static.wixstatic.com/media/859174_1e143774d08a4f8a80acd2419dedae8c~mv2.jpg", url: "https://ok.ru/videoembed/14200600529408" },
  { id: 97, title: "Parte del harem", dur: "38:48", thumb: "https://static.wixstatic.com/media/859174_ba29cfedcbe44574bf694840d653b620~mv2.jpg", url: "https://ok.ru/videoembed/14200600726016" },
  { id: 98, title: "Escorpiones", dur: "41:01", thumb: "https://static.wixstatic.com/media/859174_6e284abd57474fd3ac80d420bb6e78f8~mv2.jpg", url: "https://ok.ru/videoembed/14200601119232" },
  { id: 99, title: "Maldecidos", dur: "39:32", thumb: "https://static.wixstatic.com/media/859174_092facabef0a47dda929e428fc9ca870~mv2.jpg", url: "https://ok.ru/videoembed/14200601315840" },
  { id: 100, title: "Un hijo", dur: "39:36", thumb: "https://static.wixstatic.com/media/859174_6ad00fc986694644b9e5d9d9eaf56d1c~mv2.jpg", url: "https://ok.ru/videoembed/14200601905664" },
  { id: 101, title: "Historia larga", dur: "41:26", thumb: "https://static.wixstatic.com/media/859174_06bc60c0419d46d58b22e7d4b8d6c691~mv2.jpg", url: "https://ok.ru/videoembed/14219419060736" },
  { id: 102, title: "Malcriado", dur: "40:55", thumb: "https://static.wixstatic.com/media/859174_7ff68c1b0e2d404a8bd213dcf6913b55~mv2.jpg", url: "https://ok.ru/videoembed/14219419716096" },
  { id: 103, title: "Dios lo mandó", dur: "40:21", thumb: "https://static.wixstatic.com/media/859174_7c929675c8324c32aed3d3a328f68907~mv2.jpg", url: "https://ok.ru/videoembed/14219420043776" },
  { id: 104, title: "Alianzas", dur: "41:49", thumb: "https://static.wixstatic.com/media/859174_3456708fcdb64d4281cee6b232fafab8~mv2.jpg", url: "https://ok.ru/videoembed/14219420240384" },
  { id: 105, title: "Construir", dur: "41:28", thumb: "https://static.wixstatic.com/media/859174_89bfde6efcea4958ad104b3055cb1fb6~mv2.jpg", url: "https://ok.ru/videoembed/14219420895744" },
  { id: 106, title: "Tu único hijo", dur: "42:11", thumb: "https://static.wixstatic.com/media/859174_5391ce117b674a56a3f3362d96691a37~mv2.jpg", url: "https://ok.ru/videoembed/14219421420032" },
  { id: 107, title: "El amor de mi vida", dur: "41:09", thumb: "https://static.wixstatic.com/media/859174_2dcf1a3e17c04a95bc284602f4bfc82e~mv2.jpg", url: "https://ok.ru/videoembed/14219421878784" },
  { id: 108, title: "Mujer especial", dur: "43:26", thumb: "https://static.wixstatic.com/media/859174_c0659b5dae9f475e83adcd4745af6fd4~mv2.jpg", url: "https://ok.ru/videoembed/14219422337536" },
  { id: 109, title: "Futura esposa", dur: "42:23", thumb: "https://static.wixstatic.com/media/859174_5098fd0a55e24592888b7f49704a8f3c~mv2.jpg", url: "https://ok.ru/videoembed/14219422861824" },
  { id: 110, title: "Elegida por Dios", dur: "42:27", thumb: "https://static.wixstatic.com/media/859174_b94b4884829240c0a9f424d6738e4745~mv2.jpg", url: "https://ok.ru/videoembed/14219423123968" },
  { id: 111, title: "Mentiras", dur: "41:35", thumb: "https://static.wixstatic.com/media/859174_337e9a7de6f34e2aa62f83b013913529~mv2.jpg", url: "https://ok.ru/videoembed/14219423975936" },
  { id: 112, title: "La promesa", dur: "41:44", thumb: "https://static.wixstatic.com/media/859174_fc0b4787cb054e31a523091d8459236e~mv2.jpg", url: "https://ok.ru/videoembed/14219428760064" },
  { id: 113, title: "Intrigas", dur: "42:38", thumb: "https://static.wixstatic.com/media/859174_1426ad88248c404ca0f3c06878c9d59b~mv2.jpg", url: "https://ok.ru/videoembed/14219428956672" },
  { id: 114, title: "El padre se ha ido", dur: "40:27", thumb: "https://static.wixstatic.com/media/859174_7537c0c097124c79a5d07214ef99ac9a~mv2.jpg", url: "https://ok.ru/videoembed/14219429480960" },
  { id: 115, title: "Dos naciones", dur: "39:41", thumb: "https://static.wixstatic.com/media/859174_a1b2c73199ac4911b291048996d9eb66~mv2.jpg", url: "https://ok.ru/videoembed/14219429808640" },
  { id: 116, title: "Gemelos", dur: "39:28", thumb: "https://static.wixstatic.com/media/859174_d42b0f441e59467090aadc02d9680bf4~mv2.jpg", url: "https://ok.ru/videoembed/14219430136320" },
  { id: 117, title: "Arqueros", dur: "42:48", thumb: "https://static.wixstatic.com/media/859174_2e311e46eeee432f978a9d770b84dab1~mv2.jpg", url: "https://ok.ru/videoembed/14219430398464" },
  { id: 118, title: "Competencia", dur: "42:29", thumb: "https://static.wixstatic.com/media/859174_2f76ca636cad44eb8c570ecc208dbd94~mv2.jpg", url: "https://ok.ru/videoembed/14219430529536" },
  { id: 119, title: "La peor sequía", dur: "39:41", thumb: "https://static.wixstatic.com/media/859174_db06941c990340c5a5fb472bf61e0f15~mv2.jpg", url: "https://ok.ru/videoembed/14219431119360" },
  { id: 120, title: "Mezquindad", dur: "39:52", thumb: "https://static.wixstatic.com/media/859174_51209f528d7344ea8fff16721471ee2e~mv2.jpg", url: "https://ok.ru/videoembed/14219431512576" },
  { id: 121, title: "Conspiración", dur: "42:06", thumb: "https://static.wixstatic.com/media/859174_128bcf6068184561a20fbb13ffa65ee8~mv2.jpg", url: "https://ok.ru/videoembed/14219432102400" },
  { id: 122, title: "Engañado", dur: "40:14", thumb: "https://static.wixstatic.com/media/859174_ada67f1273a241e3b80ac4ea2e4fd392~mv2.jpg", url: "https://ok.ru/videoembed/14219432495616" },
  { id: 123, title: "La envidia", dur: "41:42", thumb: "https://static.wixstatic.com/media/859174_3d19e8ebf96746c6a830da3e9ed36552~mv2.jpg", url: "https://ok.ru/videoembed/14219432888832" },
  { id: 124, title: "Alianza de paz", dur: "42:10", thumb: "https://static.wixstatic.com/media/859174_935c88c7c3214f6a902b76500b092d0a~mv2.jpg", url: "https://ok.ru/videoembed/14219433871872" },
  { id: 125, title: "Polos opuestos", dur: "40:10", thumb: "https://static.wixstatic.com/media/859174_03134a1eae7849bfab055060c9e1db19~mv2.jpg", url: "https://ok.ru/videoembed/14219435444736" },
  { id: 126, title: "Una locura", dur: "41:47", thumb: "https://static.wixstatic.com/media/859174_8e717893cdec422f93d5acef64540391~mv2.jpg", url: "https://ok.ru/videoembed/14219435969024" },
  { id: 127, title: "El destino", dur: "42:31", thumb: "https://static.wixstatic.com/media/859174_58795716f25048ad80d7bb93c604151c~mv2.jpg", url: "https://ok.ru/videoembed/14219436558848" },
  { id: 128, title: "El elegido", dur: "39:37", thumb: "https://static.wixstatic.com/media/859174_f0caecc3d75247e58f77e13db8e958fc~mv2.jpg", url: "https://ok.ru/videoembed/14219437017600" },
  { id: 129, title: "Cuidarás de mí", dur: "40:17", thumb: "https://static.wixstatic.com/media/859174_d4877cf95aa34eabaa07b4b7a6ee86cc~mv2.jpg", url: "https://ok.ru/videoembed/14219437279744" },
  { id: 130, title: "Contra el padre", dur: "41:51", thumb: "https://static.wixstatic.com/media/859174_d33bab06bf14419396076a684024e237~mv2.jpg", url: "https://ok.ru/videoembed/14219437738496" },
  { id: 131, title: "Proposición", dur: "41:25", thumb: "https://static.wixstatic.com/media/859174_514cb5fa687742338c1e56aa257e958b~mv2.jpg", url: "https://ok.ru/videoembed/14219439114752" },
  { id: 132, title: "Alternativa", dur: "42:42", thumb: "https://static.wixstatic.com/media/859174_3da8e2931a4041e79d61fe27271378f1~mv2.jpg", url: "https://ok.ru/videoembed/14219439704576" },
  { id: 133, title: "De nuevo en familia", dur: "41:02", thumb: "https://static.wixstatic.com/media/859174_6aa643c5e0e84f2ba3c77feec1bc82b3~mv2.jpg", url: "https://ok.ru/videoembed/14219440294400" },
  { id: 134, title: "Boda desastrosa", dur: "41:45", thumb: "https://static.wixstatic.com/media/859174_1982b17fc33c4ff98f5ea8f1130c3799~mv2.jpg", url: "https://ok.ru/videoembed/14219440687616" },
  { id: 135, title: "Irresponsable", dur: "43:06", thumb: "https://static.wixstatic.com/media/859174_2421222b50444a06aca9930a53f8acea~mv2.jpg", url: "https://ok.ru/videoembed/14219441211904" },
  { id: 136, title: "La razón real", dur: "42:08", thumb: "https://static.wixstatic.com/media/859174_f32c2184fe7f4cab9a7b0a604d89c1c0~mv2.jpg", url: "https://ok.ru/videoembed/14219441605120" },
  { id: 137, title: "Vergüenza", dur: "42:39", thumb: "https://static.wixstatic.com/media/859174_6be46e86c93d49a68a3b06599625abb6~mv2.jpg", url: "https://ok.ru/videoembed/14219442129408" },
  { id: 138, title: "Siete años", dur: "40:13", thumb: "https://static.wixstatic.com/media/859174_94838aee72f7422ba7b64507e91db6a5~mv2.jpg", url: "https://ok.ru/videoembed/14219443309056" },
  { id: 139, title: "Herederos", dur: "42:38", thumb: "https://static.wixstatic.com/media/859174_6a5e18548b4a4a77a79983d2a96c2792~mv2.jpg", url: "https://ok.ru/videoembed/14219443833344" },
  { id: 140, title: "Dos mujeres", dur: "42:57", thumb: "https://static.wixstatic.com/media/859174_41e45ccfc04140ed87c0289387efcc1b~mv2.jpg", url: "https://ok.ru/videoembed/14219444423168" },
  { id: 141, title: "Engaño", dur: "41:53", thumb: "https://static.wixstatic.com/media/859174_d1c5b4f54ec94a70bd2ee234a0d9bdf7~mv2.jpg", url: "https://ok.ru/videoembed/14260448135680" },
  { id: 142, title: "Matrimonios", dur: "41:17", thumb: "https://static.wixstatic.com/media/859174_bb024ea99bcb447fb33aab6ca7a8c31b~mv2.jpg", url: "https://ok.ru/videoembed/14273913555456" },
  { id: 143, title: "Amor de verdad", dur: "39:12", thumb: "https://static.wixstatic.com/media/859174_b962ebf331ef46559d6e823404e4f317~mv2.jpg", url: "https://ok.ru/videoembed/14275125709312" },
  { id: 144, title: "Celos", dur: "41:09", thumb: "https://static.wixstatic.com/media/859174_e6608c5b1b084c099f47943b70c2c3ef~mv2.jpg", url: "https://ok.ru/videoembed/14276358703616" },
  { id: 145, title: "La hechicera", dur: "40:39", thumb: "https://static.wixstatic.com/media/859174_57c22ae4779f4e64b2c6d070e2fd2d6c~mv2.jpg", url: "https://ok.ru/videoembed/14219439704576" },
  { id: 146, title: "Actitud", dur: "41:59", thumb: "https://static.wixstatic.com/media/859174_c3705230bf03496fa215af8361072947~mv2.jpg", url: "https://ok.ru/videoembed/14277308516864" },
  { id: 147, title: "Toda la alegría", dur: "41:64", thumb: "https://static.wixstatic.com/media/859174_614c5a52286346b6b23441fca000ab79~mv2.jpg", url: "https://ok.ru/videoembed/14277306550784" },
  { id: 148, title: "Muerte extraña", dur: "40:11", thumb: "https://static.wixstatic.com/media/859174_20fd3ffafb074cb8aa7fe1a72a9334b2~mv2.jpg", url: "https://ok.ru/videoembed/14277309958656" },
  { id: 149, title: "Sin consecuencias", dur: "41:56", thumb: "https://static.wixstatic.com/media/859174_7f360d9074ce4e0f8d2e2928d2187b21~mv2.jpg", url: "https://ok.ru/videoembed/14277311007232" },
  { id: 150, title: "Historia repetida", dur: "40:23", thumb: "https://static.wixstatic.com/media/859174_53a19cb4bebc42d1b86c3588449ef55f~mv2.jpg", url: "https://ok.ru/videoembed/14277311990272" },
  { id: 151, title: "Mujeres", dur: "41:14", thumb: "https://static.wixstatic.com/media/859174_16f19e4c9687415fb6b09712944b29a9~mv2.jpg", url: "https://ok.ru/videoembed/14278723045888" },
  { id: 152, title: "Padre de todos", dur: "42:13", thumb: "https://static.wixstatic.com/media/859174_e9a570bfca5b4d98bac17eaa8ba795a8~mv2.jpg", url: "https://ok.ru/videoembed/14278856935936" },
  { id: 153, title: "Acercamiento", dur: "41:06", thumb: "https://static.wixstatic.com/media/859174_1a7b9045798146fbb1e531f9e30122d3~mv2.jpg", url: "https://ok.ru/videoembed/14219439704576" },
  { id: 154, title: "La prosperidad", dur: "42:59", thumb: "https://static.wixstatic.com/media/859174_237e076c90c0424596fa20fe0dc4bdd5~mv2.jpg", url: "https://ok.ru/videoembed/14278934268416" },
  { id: 155, title: "Mudanza", dur: "42:27", thumb: "https://static.wixstatic.com/media/859174_8cbee3628d99436f9bbc6d6bf377624a~mv2.jpg", url: "https://ok.ru/videoembed/14278934530560" },
  { id: 156, title: "Cuentas claras", dur: "41:49", thumb: "https://static.wixstatic.com/media/859174_29fbf08e67ed4127bc9fe2d48bda3bdd~mv2.jpg", url: "https://ok.ru/videoembed/14278936234496" },
  { id: 157, title: "Más cerca", dur: "40:58", thumb: "https://static.wixstatic.com/media/859174_126d5df02ea440c6856797c8339d4f07~mv2.jpg", url: "https://ok.ru/videoembed/14278937086464" },
  { id: 158, title: "Un cambio", dur: "44:13", thumb: "https://static.wixstatic.com/media/859174_59292774119048d385ab99a40bbc1ce1~mv2.jpg", url: "https://ok.ru/videoembed/14278937741824" },
  { id: 159, title: "Hija inquieta", dur: "41:31", thumb: "https://static.wixstatic.com/media/859174_cadad575c9164377bee632910c9549e1~mv2.jpg", url: "https://ok.ru/videoembed/14278938135040" },
  { id: 160, title: "Honor", dur: "40:59", thumb: "https://static.wixstatic.com/media/859174_a52c617395564e568b7fd914278bdb83~mv2.jpg", url: "https://ok.ru/videoembed/14278939183616" },
  { id: 161, title: "Betel", dur: "40:05", thumb: "https://static.wixstatic.com/media/859174_0f3d0a5c5fbb48cb8e662273e6d7e6ee~mv2.jpg", url: "https://ok.ru/videoembed/14278939511296" },
  { id: 162, title: "Futuro patriarca", dur: "40:16", thumb: "https://static.wixstatic.com/media/859174_809eb540b72b4e3e93a4e3826a58b416~mv2.jpg", url: "https://ok.ru/videoembed/14279395641856" },
  { id: 163, title: "Líder", dur: "41:25", thumb: "https://static.wixstatic.com/media/859174_8b17008969d54d4a850223946241a2dc~mv2.jpg", url: "https://ok.ru/videoembed/14279396166144" },
  { id: 164, title: "El sueño", dur: "42:49", thumb: "https://static.wixstatic.com/media/859174_fc874e552d51481abdcec35079764bb5~mv2.jpg", url: "https://ok.ru/videoembed/14279396428288" },
  { id: 165, title: "El mal perdió", dur: "41:31", thumb: "https://static.wixstatic.com/media/859174_074c55e74ecc44ea855db57e374c1ad8~mv2.jpg", url: "https://ok.ru/videoembed/14279396755968" },
  { id: 166, title: "Esclavo", dur: "42:22", thumb: "https://static.wixstatic.com/media/859174_2af807e854464cb9aeb7e4685c4eb3b8~mv2.jpg", url: "https://ok.ru/videoembed/14279397804544" },
  { id: 167, title: "La túnica", dur: "42:22", thumb: "https://static.wixstatic.com/media/859174_b1f9546cf3704ed996973ec6a18ad662~mv2.jpg", url: "https://ok.ru/videoembed/14279398394368" },
  { id: 168, title: "Jamás lo olvidaré", dur: "42:28", thumb: "https://static.wixstatic.com/media/859174_266220a0ce7b4b1fa72aeda6fc3ea102~mv2.jpg", url: "https://ok.ru/videoembed/14279398853120" },
  { id: 169, title: "El faraón", dur: "41:38", thumb: "https://static.wixstatic.com/media/859174_0de88cd8964b4a1ab4afac05566f6d2e~mv2.jpg", url: "https://ok.ru/videoembed/14279399049728" },
  { id: 170, title: "El arquero", dur: "42:13", thumb: "https://static.wixstatic.com/media/859174_127c9f2b64a145c097e36bdc4fffdea8~mv2.jpg", url: "https://ok.ru/videoembed/14279399377408" },
  { id: 171, title: "Soy hebreo", dur: "40:40", thumb: "https://static.wixstatic.com/media/859174_2dab2bc53b21465ea04bc181b6d72046~mv2.jpg", url: "https://ok.ru/videoembed/14280187447808" },
  { id: 172, title: "Padre rico", dur: "41:43", thumb: "https://static.wixstatic.com/media/859174_b40774fefbb7413083d4999b851867a6~mv2.jpg", url: "https://ok.ru/videoembed/14280188692992" },
  { id: 173, title: "Cómplice", dur: "42:57", thumb: "https://static.wixstatic.com/media/859174_9742269f86744bf09b1e146db066df4f~mv2.jpg", url: "https://ok.ru/videoembed/14280188824064" },
  { id: 174, title: "Panadero", dur: "41:48", thumb: "https://static.wixstatic.com/media/859174_006ad833cae7499faa18b7728928d7a3~mv2.jpg", url: "https://ok.ru/videoembed/14280189151744" },
  { id: 175, title: "Inexistente", dur: "42:52", thumb: "https://static.wixstatic.com/media/859174_7f511784714349669a921d187a57d100~mv2.jpg", url: "https://ok.ru/videoembed/14280190069248" },
  { id: 176, title: "Mi pequeña", dur: "40:43", thumb: "https://static.wixstatic.com/media/859174_9cd1891378d14914a1d2ba97ee4a0153~mv2.jpg", url: "https://ok.ru/videoembed/14280190462464" },
  { id: 177, title: "Confianza", dur: "42:17", thumb: "https://static.wixstatic.com/media/859174_22d1affd5c104aea9cc0b13ca92e6731~mv2.jpg", url: "https://ok.ru/videoembed/14280190790144" },
  { id: 178, title: "Sospechas", dur: "41:18", thumb: "https://static.wixstatic.com/media/859174_62641762b8c343b88888f9bb0f989b7a~mv2.jpg", url: "https://ok.ru/videoembed/14280190921216" },
  { id: 179, title: "Inocente", dur: "42:27", thumb: "https://static.wixstatic.com/media/859174_5169055bf83643e3b3520440732ef3bc~mv2.jpg", url: "https://ok.ru/videoembed/14280191183360" },
  { id: 180, title: "Tentación", dur: "42:21", thumb: "https://static.wixstatic.com/media/859174_9ae837fec5e94a59bcb9a6c8e462eb60~mv2.jpg", url: "https://ok.ru/videoembed/14280191445504" },
  { id: 181, title: "Un error", dur: "40:31", thumb: "https://static.wixstatic.com/media/859174_2f33689c630444be9d5f9056cf1b86de~mv2.jpg", url: "https://ok.ru/videoembed/14280191838720" },
  { id: 182, title: "La familia", dur: "41:07", thumb: "https://static.wixstatic.com/media/859174_7dcea61e7ece40eab943eaf7b5fbf2b1~mv2.jpg", url: "https://ok.ru/videoembed/14280192363008" },
  { id: 183, title: "Pesadillas", dur: "41:20", thumb: "https://static.wixstatic.com/media/859174_b67a1753db2a4171b2ed4925e8071aca~mv2.jpg", url: "https://ok.ru/videoembed/14280194853376" },
  { id: 184, title: "Posesiva", dur: "41:35", thumb: "https://static.wixstatic.com/media/859174_cbb833aa3ccb4d58bb1549054fb7457b~mv2.jpg", url: "https://ok.ru/videoembed/14280195181056" },
  { id: 185, title: "Guerra", dur: "41:56", thumb: "https://static.wixstatic.com/media/859174_25fdbb96b5e9452f8371ce1b743214fa~mv2.jpg", url: "https://ok.ru/videoembed/14280195508736" },
  { id: 186, title: "El reflejo", dur: "39:41", thumb: "https://static.wixstatic.com/media/859174_d2eadbdcf9e746059c6ccac6d68c732f~mv2.jpg", url: "https://ok.ru/videoembed/14280196491776" },
  { id: 187, title: "Seducción", dur: "42:17", thumb: "https://static.wixstatic.com/media/859174_e8585c0098554d85a69c31ee714acbb9~mv2.jpg", url: "https://ok.ru/videoembed/14280196688384" },
  { id: 188, title: "Escape", dur: "41:31", thumb: "https://static.wixstatic.com/media/859174_efac71d5ebe74587aac50b54208a5ae7~mv2.jpg", url: "https://ok.ru/videoembed/14280197278208" },
  { id: 189, title: "Deseo", dur: "41:56", thumb: "https://static.wixstatic.com/media/859174_10cf3c9b4a8241a0b4c77644694daa1a~mv2.jpg", url: "https://ok.ru/videoembed/14280199113216" },
  { id: 190, title: "Equipo", dur: "41:47", thumb: "https://static.wixstatic.com/media/859174_c43a33ac0a544c429c7a14ecb5390872~mv2.jpg", url: "https://ok.ru/videoembed/14280199309824" },
  { id: 191, title: "Gran favor", dur: "41:19", thumb: "https://static.wixstatic.com/media/859174_fc126b458f3c4474872569c7b84ce80c~mv2.jpg", url: "https://ok.ru/videoembed/14280199506432" },
  { id: 192, title: "Sombras", dur: "41:48", thumb: "https://static.wixstatic.com/media/859174_539e06c4ff1e4cacbddaa757072a8800~mv2.jpg", url: "https://ok.ru/videoembed/14280199637504" },
  { id: 193, title: "Acusación", dur: "41:29", thumb: "https://static.wixstatic.com/media/859174_95af3b5d93854460a42141fe766946a3~mv2.jpg", url: "https://ok.ru/videoembed/14280199965184" },
  { id: 194, title: "Postergado", dur: "41:38", thumb: "https://static.wixstatic.com/media/859174_011925f9c24844f8b112e4c8c6981b7f~mv2.jpg", url: "https://ok.ru/videoembed/14280200161792" },
  { id: 195, title: "Dos años más", dur: "41:39", thumb: "https://static.wixstatic.com/media/859174_af48a50b1b2a46f4a19e4fe67e256b7b~mv2.jpg", url: "https://ok.ru/videoembed/14280200489472" },
  { id: 196, title: "Interpretación", dur: "40:34", thumb: "https://static.wixstatic.com/media/859174_e72a902e653a4b068db1d84bbb9c69c2~mv2.jpg", url: "https://ok.ru/videoembed/14280201406976" },
  { id: 197, title: "Traductor", dur: "42:54", thumb: "https://static.wixstatic.com/media/859174_c7c01ea8c2c4417986a797f21a15fee7~mv2.jpg", url: "https://ok.ru/videoembed/14280201669120" },
  { id: 198, title: "Ejecución", dur: "40:36", thumb: "https://static.wixstatic.com/media/859174_4e7419a7a86849738d3d534d60ceef82~mv2.jpg", url: "https://ok.ru/videoembed/14280202390016" },
  { id: 199, title: "Amor", dur: "42:12", thumb: "https://static.wixstatic.com/media/859174_df8f20d80dd54b33aa63e546bf9b778f~mv2.jpg", url: "https://ok.ru/videoembed/14280202848768" },
  { id: 200, title: "Secuestro", dur: "41:27", thumb: "https://static.wixstatic.com/media/859174_62bda78381904a909eff4ac5eba249ba~mv2.jpg", url: "https://ok.ru/videoembed/14280204290560" },
  { id: 201, title: "Voto", dur: "41:03", thumb: "https://static.wixstatic.com/media/859174_4d9b21c7709c4596ac8d9dc912ff5e7b~mv2.jpg", url: "https://ok.ru/videoembed/14280204749312" },
  { id: 202, title: "Ceder", dur: "41:30", thumb: "https://static.wixstatic.com/media/859174_9d48d1f661404fb8a8f7002e67fb6ffc~mv2.jpg", url: "https://ok.ru/videoembed/14280205339136" },
  { id: 203, title: "Correr", dur: "41:22", thumb: "https://static.wixstatic.com/media/859174_450655acc60849a18c9328bf8ce91054~mv2.jpg", url: "https://ok.ru/videoembed/14280206387712" },
  { id: 204, title: "Amistad", dur: "41:38", thumb: "https://static.wixstatic.com/media/859174_13236c763ffe449f84a8bd2f8b1e326a~mv2.jpg", url: "https://ok.ru/videoembed/14280207108608" },
  { id: 205, title: "Momento", dur: "40:05", thumb: "https://static.wixstatic.com/media/859174_787f43c614374208835ef785542e5155~mv2.jpg", url: "https://ok.ru/videoembed/14280207698432" },
  { id: 206, title: "Matrimonio", dur: "40:02", thumb: "https://static.wixstatic.com/media/859174_c0262be52392445cbda6a230704d66b9~mv2.jpg", url: "https://ok.ru/videoembed/14280209074688" },
  { id: 207, title: "Solución", dur: "40:58", thumb: "https://static.wixstatic.com/media/859174_79ef2425d5f243daa48088ec3ecd730a~mv2.jpg", url: "https://ok.ru/videoembed/14280209664512" },
  { id: 208, title: "Decisión", dur: "40:38", thumb: "https://static.wixstatic.com/media/859174_351625059d564c7eb1c99af2bc988eaa~mv2.jpg", url: "https://ok.ru/videoembed/14280209992192" },
  { id: 209, title: "Enviada", dur: "41:23", thumb: "https://static.wixstatic.com/media/859174_d4248b6368fc4af9ab75fb5bfd075c3a~mv2.jpg", url: "https://ok.ru/videoembed/14280210385408" },
  { id: 210, title: "Pasado", dur: "42:32", thumb: "https://static.wixstatic.com/media/859174_777758bac8e24addb38a5b6c1b261884~mv2.jpg", url: "https://ok.ru/videoembed/14280210582016" },
  { id: 211, title: "Embarazo", dur: "42:45", thumb: "https://static.wixstatic.com/media/859174_1a8e5b948b37444781ddef1315c9158a~mv2.jpg", url: "https://ok.ru/videoembed/14280211892736" },
  { id: 212, title: "Pasado", dur: "42:19", thumb: "https://static.wixstatic.com/media/859174_c2aa8eea90de4d90bdbe3710df24cca8~mv2.jpg", url: "https://ok.ru/videoembed/14280212023808" },
  { id: 213, title: "El hambre", dur: "42:30", thumb: "https://static.wixstatic.com/media/859174_de1cfdc22b5e41eca0d1b74d760cb270~mv2.jpg", url: "https://ok.ru/videoembed/14280212154880" },
  { id: 214, title: "Rencor", dur: "44:10", thumb: "https://static.wixstatic.com/media/859174_0920a85d8b854d3d8be404e132ce7518~mv2.jpg", url: "https://ok.ru/videoembed/14280212351488" },
  { id: 215, title: "Honesta", dur: "43:40", thumb: "https://static.wixstatic.com/media/859174_1072b72e12b34785a017eae7494fed11~mv2.jpg", url: "https://ok.ru/videoembed/14280212482560" },
  { id: 216, title: "Comida", dur: "42:46", thumb: "https://static.wixstatic.com/media/859174_db99e47a0e254e87af912d7f922ff287~mv2.jpg", url: "https://ok.ru/videoembed/14280212548096" },
  { id: 217, title: "Castigo", dur: "43:06", thumb: "https://static.wixstatic.com/media/859174_e49c50ee66474dab83dcf0d4ca148219~mv2.jpg", url: "https://ok.ru/videoembed/14280212875776" },
  { id: 218, title: "Pobladores", dur: "39:33", thumb: "https://static.wixstatic.com/media/859174_6d043dafd6644d908f065230bad97fd0~mv2.jpg", url: "https://ok.ru/videoembed/14280213072384" },
  { id: 219, title: "Antes de morir", dur: "43:40", thumb: "https://static.wixstatic.com/media/859174_96f482dc4ea0452dbecb5a2e2f2aed42~mv2.jpg", url: "https://ok.ru/videoembed/14280213203456" },
  { id: 220, title: "Caricia", dur: "42:00", thumb: "https://static.wixstatic.com/media/859174_e26b65ee655a40f48a00fb5efdffe2fe~mv2.jpg", url: "https://ok.ru/videoembed/14280213268992" },
  { id: 221, title: "Todos unidos", dur: "43:54", thumb: "https://static.wixstatic.com/media/859174_ac6e61ae8f7b46fd91b24fe79a1b6cda~mv2.jpg", url: "https://ok.ru/videoembed/14280213531136" }
];
const GenesisMobile = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const openEpisode = (idx: number) => { setSelectedVideo(genesisEpisodes[idx].url); setCurrentIdx(idx); };

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-[#F09800]">
      <Head><title>Génesis — Móvil</title></Head>
      <Navbar />
      <div className="relative w-full pt-12 bg-black">
        <div className="w-full aspect-[4/3] relative">
          <img src="https://static.wixstatic.com/media/859174_264be00ba6d14e699767e79c49297e5c~mv2.jpg" className="w-full h-full object-contain" alt="Banner" />
        </div>
        <div className="px-4 py-2 flex flex-col gap-3">
          <button onClick={() => openEpisode(currentIdx)} className="w-full bg-white text-black font-bold py-3.5 rounded-md text-sm active:scale-95 transition-transform uppercase tracking-widest">
            {currentIdx === 0 ? "▶ VER AHORA" : `▶ CONTINUAR EP. ${genesisEpisodes[currentIdx].id}`}
          </button>
          <div className="flex gap-3">
            <button className="flex-1 bg-white/10 py-3 rounded-md text-[10px] font-bold border border-white/5 active:bg-white/20 uppercase tracking-widest">+ MI LISTA</button>
            <button onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS', '_blank')} className="flex-1 bg-white/10 py-3 rounded-md text-[10px] font-bold border border-white/5 active:bg-white/20 uppercase tracking-widest">❤ DONAR</button>
          </div>
        </div>
      </div>
      <div className="px-4 mt-4 mb-20">
        <h2 className="text-xs font-bold mb-4 text-gray-500 tracking-widest uppercase border-b border-white/10 pb-2">Capítulos Disponibles</h2>
        <div className="grid grid-cols-2 gap-4">
          {genesisEpisodes.map((ep, index) => (
            <div key={ep.id} className="flex flex-col gap-2 active:opacity-70 transition-opacity" onClick={() => openEpisode(index)}>
              <div className={`relative aspect-video rounded-md overflow-hidden border ${currentIdx === index ? 'border-[#F09800]' : 'border-white/5'} shadow-lg`}>
                <img src={ep.thumb} className="w-full h-full object-cover" loading="lazy" />
                <span className="absolute bottom-1 right-1 bg-black/90 px-1.5 py-0.5 text-[7px] font-black rounded uppercase">{ep.dur}</span>
              </div>
              <h3 className="font-bold text-[10px] truncate uppercase tracking-tighter">EP. {ep.id} {ep.title}</h3>
            </div>
          ))}
        </div>
      </div>
      {selectedVideo && (
        <div className="fixed inset-0 z-[2000] bg-black flex flex-col">
          <div className="p-4 flex justify-between items-center bg-black/80 backdrop-blur-md">
            <span className="text-[9px] font-black text-[#F09800] uppercase tracking-widest">Génesis — Cap. {genesisEpisodes[currentIdx].id}</span>
            <button onClick={() => setSelectedVideo(null)} className="text-3xl font-light">&times;</button>
          </div>
          <div className="flex-grow flex flex-col relative bg-[#050608]">
            <iframe src={selectedVideo + "?autoplay=1"} className="w-full h-full border-none" allow="autoplay; fullscreen" />
            <div className="absolute inset-x-0 bottom-6 flex justify-around px-4">
              <button disabled={currentIdx === 0} onClick={() => openEpisode(currentIdx - 1)} className="bg-black/80 text-white text-[9px] py-3 px-5 rounded-full border border-white/10 active:bg-[#F09800] uppercase font-bold tracking-widest">Anterior</button>
              <button onClick={() => setSelectedVideo(null)} className="bg-black/80 text-white text-[9px] py-3 px-5 rounded-full border border-white/10 active:bg-white active:text-black uppercase font-bold tracking-widest">Cerrar</button>
              <button disabled={currentIdx === genesisEpisodes.length - 1} onClick={() => openEpisode(currentIdx + 1)} className="bg-black/80 text-white text-[9px] py-3 px-5 rounded-full border border-white/10 active:bg-[#F09800] uppercase font-bold tracking-widest">Siguiente</button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};
export default GenesisMobile;
