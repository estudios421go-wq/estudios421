import Head from 'next/head';
import Navbar from '../components/Navbar';
import HeroBanner from '../components/HeroBanner';
import MovieRow from '../components/MovieRow';
import Footer from '../components/Footer';

export default function Home() {
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
    { id: 1, title: "Génesis", image: "https://static.wixstatic.com/media/859174_018cfcb041814b67bd52c6a4359b3cbc~mv2.jpg", isLatino: true },
    { id: 2, title: "Lea", image: "https://static.wixstatic.com/media/859174_dae68737adf0429d906c00ccd6312b48~mv2.jpg", isLatino: true },
    { id: 3, title: "La Vida de Job", image: "https://static.wixstatic.com/media/859174_bf0ed28131784482ae405ea82eea4c97~mv2.jpg", isLatino: false },
    { id: 4, title: "José de Egipto", image: "https://static.wixstatic.com/media/859174_e4bd49f00d5d4377a7e404ae7246d696~mv2.jpg", isLatino: true },
    { id: 5, title: "Los Diez Mandamientos", image: "https://static.wixstatic.com/media/859174_0e75860e77094dbf9f210a7822ba7f5e~mv2.jpg", isLatino: true },
    { id: 6, title: "La Tierra Prometida", image: "https://static.wixstatic.com/media/859174_e4d2a3d4cbe04efc8a90f9d17a3466e3~mv2.jpg", isLatino: true },
    { id: 7, title: "Sansón y Dalila", image: "https://static.wixstatic.com/media/859174_4b72ddf27fd9425f890afa32a6f0f29b~mv2.jpg", isLatino: true },
    { id: 8, title: "Rey David", image: "https://static.wixstatic.com/media/859174_e0555531e40c4362ad8d1e06f243af08~mv2.jpg", isLatino: true },
    { id: 9, title: "Reyes", image: "https://static.wixstatic.com/media/859174_72102f14890f4c5b97cd1ba680dc700a~mv2.jpg", isLatino: true },
    { id: 10, title: "Jezabel", image: "https://static.wixstatic.com/media/859174_e64b24afc6174b53b7682529f7184069~mv2.jpg", isLatino: true },
    { id: 11, title: "El Rico y Lázaro", image: "https://static.wixstatic.com/media/859174_4a207a35843047c7aa4400dff1a8bc68~mv2.jpg", isLatino: true },
    { id: 12, title: "La Historia de Ester", image: "https://static.wixstatic.com/media/859174_08a0b7968f0f48a4acbb8c58805d387e~mv2.jpg", isLatino: true },
    { id: 13, title: "La Reina de Persia", image: "https://static.wixstatic.com/media/859174_f4ecd0fc68ec45a598afcdd9344cba79~mv2.jpg", isLatino: true },
    { id: 14, title: "Nehemías", image: "https://static.wixstatic.com/media/859174_2fa68ebd2b22447889e85bf3cebe4c75~mv2.jpg", isLatino: false },
    { id: 15, title: "Milagros de Jesús", image: "https://static.wixstatic.com/media/859174_0d01d04096d144b7821f7c6438bc281d~mv2.jpg", isLatino: true },
    { id: 16, title: "Jesús", image: "https://static.wixstatic.com/media/859174_d9ce32069d954bc99d5db05bb90fc924~mv2.jpg", isLatino: true },
    { id: 17, title: "Pablo El Apóstol", image: "https://static.wixstatic.com/media/859174_c43f668e3a914d29b7c5e9f90e722641~mv2.jpg", isLatino: true },
    { id: 18, title: "El Señor y La Sierva", image: "https://static.wixstatic.com/media/859174_b3605a85f77244c3a348ae3561ce49bb~mv2.jpg", isLatino: false },
    { id: 19, title: "Apocalipsis", image: "https://static.wixstatic.com/media/859174_3187cee73d2e4cd9bc1aa7971fd2c117~mv2.jpg", isLatino: true },
  ];

  const seriesTv = [
    { id: 1, title: "La Casa De David", image: "https://static.wixstatic.com/media/859174_cc2c878f7a0a4fffa5b63ef31048fb75~mv2.jpg", isLatino: true },
    { id: 2, title: "La Biblia", image: "https://static.wixstatic.com/media/859174_aa4a8425d9714f0aa2f96b418a408747~mv2.jpg", isLatino: true },
    { id: 3, title: "La Biblia Continúa", image: "https://static.wixstatic.com/media/859174_e096b3d265a049d98bb882e620efb771~mv2.jpg", isLatino: true },
    { id: 4, title: "María Magdalena", image: "https://static.wixstatic.com/media/859174_a6c8755b0d7f42d2b8ad21009f75c4e3~mv2.jpg", isLatino: true },
    { id: 5, title: "Testamento La Historia De Moisés", image: "https://static.wixstatic.com/media/859174_2eabf33760ca467895f9edd4646b2bbe~mv2.jpg", isLatino: true },
    { id: 6, title: "Jesús De Nazaret", image: "https://static.wixstatic.com/media/859174_a9d3a4a2dcaa4de4bd5c4d0be6d47613~mv2.jpg", isLatino: true },
  ];

  const peliculas = [
    { id: 1, title: "La Pasón De Cristo", image: "https://static.wixstatic.com/media/859174_68e2caed65fb48f482bead90d49ac07a~mv2.jpg", isLatino: true },
    { id: 2, title: "Ben Hur 1959", image: "https://static.wixstatic.com/media/859174_e3ac4cc159834b3693529ae55a7e0301~mv2.jpg", isLatino: true },
    { id: 3, title: "Los Diez Mandamientos", image: "https://static.wixstatic.com/media/859174_bf2a773d1afe438dbd337595d26f4ea4~mv2.jpg", isLatino: true },
    { id: 4, title: "La Vida Pública De Jesús", image: "https://static.wixstatic.com/media/859174_38220362bde44213a0e94d65b00ee5c5~mv2.jpg", isLatino: true },
    { id: 5, title: "Su Único Hijo", image: "https://static.wixstatic.com/media/859174_9434fb1fb91a4d09a9bcf2a0bdc85b08~mv2.jpg", isLatino: true },
    { id: 6, title: "María", image: "https://static.wixstatic.com/media/859174_2e4a16bf3a734176986ef81b8f9cd486~mv2.jpg", isLatino: true },
    { id: 7, title: "Hijo De Dios", image: "https://static.wixstatic.com/media/859174_285f0efa7e074594acae3f60be33db6b~mv2.jpg", isLatino: true },
    { id: 8, title: "Pablo El Apóstol De Cristo", image: "https://static.wixstatic.com/media/859174_c7361566c7fe41fab5de85fd9806d223~mv2.jpg", isLatino: true },
    { id: 9, title: "María Magdalena", image: "https://static.wixstatic.com/media/859174_019343e65be24760870af76aa4dd9d7e~mv2.jpg", isLatino: true },
    { id: 10, title: "Ben Hur 2016", image: "https://static.wixstatic.com/media/859174_3c33afd52cfa42c1966ee45ac42c694a~mv2.jpg", isLatino: true },
    { id: 11, title: "Apocalipsis Edit", image: "https://static.wixstatic.com/media/859174_392444e4313943e8903983ff7a5601b6~mv2.jpg", isLatino: true },
  ];

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <Head>
        <title>Estudios 421 | La Fe en Pantalla</title>
      </Head>

      <Navbar />

      <main>
        <HeroBanner />
        
        {/* Contenedor de Carruseles con solapamiento al Banner */}
        <div className="relative z-30 -mt-14 pb-20 space-y-6">
          <MovieRow title="Estrenos" movies={estrenos} />
          <MovieRow title="Series Bíblicas" movies={seriesBiblicas} />
          <MovieRow title="Series TV" movies={seriesTv} />
          <MovieRow title="Películas" movies={peliculas} />
        </div>
      </main>

      {/* Footer Profesional configurado con disclaimer legal */}
      <Footer />
    </div>
  );
}