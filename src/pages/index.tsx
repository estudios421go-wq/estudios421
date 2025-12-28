import Head from 'next/head';
import { useState, useEffect } from 'react';
import DesktopNavbar from '../components/desktop/Navbar';
import MobileNavbar from '../components/mobile/Navbar';
import TVNavbar from '../components/tv/Navbar';
import DesktopHero from '../components/desktop/HeroBanner';
import MobileHero from '../components/mobile/HeroBanner';
import TVHero from '../components/tv/HeroBanner';
import DesktopRow from '../components/desktop/MovieRow';
import MobileRow from '../components/mobile/MovieRow';
import TVRow from '../components/tv/MovieRow';
import Footer from '../components/Footer';

export default function Home() {
  const [device, setDevice] = useState<'desktop' | 'mobile' | 'tv'>('desktop');
  const [myList, setMyList] = useState([]); // Para el carrusel oculto de "Mi Lista"

  useEffect(() => {
    const detect = () => {
      const w = window.innerWidth;
      if (w >= 1920) setDevice('tv');
      else if (w <= 768) setDevice('mobile');
      else setDevice('desktop');
    };
    detect();
    window.addEventListener('resize', detect);
    return () => window.removeEventListener('resize', detect);
  }, []);

  // DATOS COMPLETOS
  const estrenos = [
    { id: 1, title: "Reyes La Decadencia", image: "https://static.wixstatic.com/media/859174_844bdbe858b74adab24665964be596b1~mv2.jpg", isLatino: true },
    { id: 2, title: "Pablo El Apóstol", image: "https://static.wixstatic.com/media/859174_1a4c34a2bb8a495bad6ea09b5da366dd~mv2.jpg", isLatino: true },
    { id: 3, title: "La Casa De David", image: "https://static.wixstatic.com/media/859174_bc1b97a10d3247e097ff4bbdda56e973~mv2.jpg", isLatino: false },
    { id: 4, title: "La Reina De Persia", image: "https://static.wixstatic.com/media/859174_25430a5b5d74415f8a6ad729958081d2~mv2.jpg", isLatino: true },
    { id: 5, title: "La Vida De Job", image: "https://static.wixstatic.com/media/859174_d0095ad0db584be09c815e43b4bd1c39~mv2.jpg", isLatino: false },
    { id: 6, title: "El Señor Y La Sierva", image: "https://static.wixstatic.com/media/859174_9e32bbc02d864ed9842fb43173bfd1e3~mv2.jpg", isLatino: false },
    { id: 7, title: "Reyes La Sucesión", image: "https://static.wixstatic.com/media/859174_2960f93a729e41df96813820c93b80eb~mv2.jpg", isLatino: true },
    { id: 8, title: "Nehemías", image: "https://static.wixstatic.com/media/859174_fb1b30a68bcd427fa813140bd095f259~mv2.jpg", isLatino: true },
  ];

  const seriesBiblicas = [
    { id: 9, title: "Génesis", image: "https://static.wixstatic.com/media/859174_018cfcb041814b67bd52c6a4359b3cbc~mv2.jpg", isLatino: true },
    { id: 10, title: "Lea", image: "https://static.wixstatic.com/media/859174_dae68737adf0429d906c00ccd6312b48~mv2.jpg", isLatino: true },
    { id: 11, title: "La Vida de Job", image: "https://static.wixstatic.com/media/859174_bf0ed28131784482ae405ea82eea4c97~mv2.jpg", isLatino: false },
    { id: 12, title: "José de Egipto", image: "https://static.wixstatic.com/media/859174_e4bd49f00d5d4377a7e404ae7246d696~mv2.jpg", isLatino: true },
    { id: 13, title: "Los Diez Mandamientos", image: "https://static.wixstatic.com/media/859174_0e75860e77094dbf9f210a7822ba7f5e~mv2.jpg", isLatino: true },
    { id: 14, title: "La Tierra Prometida", image: "https://static.wixstatic.com/media/859174_e4d2a3d4cbe04efc8a90f9d17a3466e3~mv2.jpg", isLatino: true },
    { id: 15, title: "Sansón y Dalila", image: "https://static.wixstatic.com/media/859174_4b72ddf27fd9425f890afa32a6f0f29b~mv2.jpg", isLatino: true },
    { id: 16, title: "Rey David", image: "https://static.wixstatic.com/media/859174_e0555531e40c4362ad8d1e06f243af08~mv2.jpg", isLatino: true },
  ];

  const seriesTv = [
    { id: 17, title: "La Casa De David", image: "https://static.wixstatic.com/media/859174_cc2c878f7a0a4fffa5b63ef31048fb75~mv2.jpg", isLatino: true },
    { id: 18, title: "La Biblia", image: "https://static.wixstatic.com/media/859174_aa4a8425d9714f0aa2f96b418a408747~mv2.jpg", isLatino: true },
    { id: 19, title: "La Biblia Continúa", image: "https://static.wixstatic.com/media/859174_e096b3d265a049d98bb882e620efb771~mv2.jpg", isLatino: true },
  ];

  const peliculas = [
    { id: 20, title: "La Pasón De Cristo", image: "https://static.wixstatic.com/media/859174_68e2caed65fb48f482bead90d49ac07a~mv2.jpg", isLatino: true },
    { id: 21, title: "Ben Hur 1959", image: "https://static.wixstatic.com/media/859174_e3ac4cc159834b3693529ae55a7e0301~mv2.jpg", isLatino: true },
  ];

  const renderContent = (ComponentRow: any, isTv = false) => (
    <>
      <ComponentRow title="Estrenos" movies={estrenos} rowIndex={1} />
      {myList.length > 0 && <ComponentRow title="Mi Lista" movies={myList} rowIndex={2} />}
      <ComponentRow title="Series Bíblicas" movies={seriesBiblicas} rowIndex={3} />
      <ComponentRow title="Recomendados" movies={seriesTv} rowIndex={4} />
      <ComponentRow title="Series TV" movies={seriesTv} rowIndex={5} />
      <ComponentRow title="Películas" movies={peliculas} rowIndex={6} />
    </>
  );

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <Head><title>Estudios 421 | La Fe en Pantalla</title></Head>

      {device === 'desktop' && (
        <>
          <DesktopNavbar />
          <main><DesktopHero />
            <div className="relative z-30 -mt-14 pb-20 space-y-6">
              {renderContent(DesktopRow)}
            </div>
          </main>
        </>
      )}

      {device === 'mobile' && (
        <>
          <MobileNavbar />
          <main><MobileHero />
            <div className="relative z-30 space-y-1 pb-10">
              {renderContent(MobileRow)}
            </div>
          </main>
        </>
      )}

      {device === 'tv' && (
        <>
          <TVNavbar />
          <main><TVHero />
            <div className="relative z-30 space-y-10 pb-20">
              {renderContent(TVRow, true)}
            </div>
          </main>
        </>
      )}
      <Footer />
    </div>
  );
}