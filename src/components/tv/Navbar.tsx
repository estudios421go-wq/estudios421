import Image from 'next/image';
import { IoSearchOutline } from 'react-icons/io5';

const TVNavbar = () => {
  const navLinks = ['Inicio', 'Series Bíblicas', 'Series TV', 'Películas'];
  const languages = [
    { name: 'ESP', img: "https://static.wixstatic.com/media/859174_367960b11c1c44ba89cd1582fd1b5776~mv2.png" },
    { name: 'ENG', img: "https://static.wixstatic.com/media/859174_35112d9ffe234d6f9dcef16cf8f7544e~mv2.png" },
    { name: 'PT', img: "https://static.wixstatic.com/media/859174_830f1c20656e4d44a819bedfc13a22cc~mv2.png" }
  ];

  return (
    <nav className="fixed top-0 w-full z-[100] bg-gradient-to-b from-black via-black/90 to-transparent px-16 py-10 flex items-center justify-between">
      <div className="flex items-center gap-12">
        <div className="relative w-[220px] h-[60px]">
          <Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" fill className="object-contain" priority />
        </div>
        <div className="flex gap-4">
          {navLinks.map((link) => (
            <button key={link} className="px-8 py-3 text-white text-2xl font-bold rounded-md border-4 border-transparent focus:border-[#F09800] focus:bg-white/10 outline-none transition-all duration-300">
              {link}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-10">
        <div className="flex gap-4 p-2 bg-white/5 rounded-xl">
          {languages.map((lang) => (
            <button key={lang.name} className="p-1 rounded-full border-4 border-transparent focus:border-[#F09800] outline-none transition-all transform focus:scale-125">
              <img src={lang.img} alt={lang.name} className="w-10 h-10 object-contain" />
            </button>
          ))}
        </div>
        <button className="flex items-center gap-4 bg-white/10 px-8 py-3 rounded-full border-4 border-transparent focus:border-[#F09800] focus:bg-white/20 outline-none text-white transition-all shadow-lg">
          <IoSearchOutline className="text-3xl" />
          <span className="text-xl font-medium">Buscar</span>
        </button>
        <button className="rounded-full border-4 border-transparent focus:border-[#F09800] outline-none transition-all transform focus:scale-110">
          <Image src="https://static.wixstatic.com/media/859174_26ca840644ce4f519c0458c649f44f34~mv2.png" alt="User" width={55} height={55} className="rounded-full ring-2 ring-white/20" />
        </button>
      </div>
    </nav>
  );
};
export default TVNavbar;