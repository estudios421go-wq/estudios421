export interface Serie {
  id: number;
  title: string;
  path: string;
  banner: string;
  category: 'Serie Bíblica' | 'Película' | 'Serie de TV';
  audio: 'Latino' | 'Subtitulado';
}

export const allSeries: Serie[] = [
  // --- SERIES BÍBLICAS ---
  { id: 1, title: "Génesis", path: "/serie/genesis", audio: 'Latino', category: 'Serie Bíblica', banner: "https://static.wixstatic.com/media/859174_018cfcb041814b67bd52c6a4359b3cbc~mv2.jpg" },
  { id: 2, title: "Lea", path: "/serie/lea", audio: 'Latino', category: 'Serie Bíblica', banner: "https://static.wixstatic.com/media/859174_dae68737adf0429d906c00ccd6312b48~mv2.jpg" },
  { id: 3, title: "La Vida de Job", path: "/serie/la-vida-de-job", audio: 'Subtitulado', category: 'Serie Bíblica', banner: "https://static.wixstatic.com/media/859174_bf0ed28131784482ae405ea82eea4c97~mv2.jpg" },
  { id: 4, title: "José de Egipto", path: "/serie/jose-de-egipto", audio: 'Latino', category: 'Serie Bíblica', banner: "https://static.wixstatic.com/media/859174_e4bd49f00d5d4377a7e404ae7246d696~mv2.jpg" },
  { id: 5, title: "Los Diez Mandamientos", path: "/serie/moises-y-los-diez-mandamientos", audio: 'Latino', category: 'Serie Bíblica', banner: "https://static.wixstatic.com/media/859174_0e75860e77094dbf9f210a7822ba7f5e~mv2.jpg" },
  { id: 6, title: "La Tierra Prometida", path: "/serie/la-tierra-prometida", audio: 'Latino', category: 'Serie Bíblica', banner: "https://static.wixstatic.com/media/859174_e4d2a3d4cbe04efc8a90f9d17a3466e3~mv2.jpg" },
  { id: 7, title: "Sansón y Dalila", path: "/serie/sanson-y-dalila", audio: 'Latino', category: 'Serie Bíblica', banner: "https://static.wixstatic.com/media/859174_4b72ddf27fd9425f890afa32a6f0f29b~mv2.jpg" },
  { id: 8, title: "Rey David", path: "/serie/rey-david", audio: 'Latino', category: 'Serie Bíblica', banner: "https://static.wixstatic.com/media/859174_e0555531e40c4362ad8d1e06f243af08~mv2.jpg" },
  { id: 9, title: "Reyes", path: "/serie/reyes", audio: 'Latino', category: 'Serie Bíblica', banner: "https://static.wixstatic.com/media/859174_72102f14890f4c5b97cd1ba680dc700a~mv2.jpg" },
  { id: 10, title: "Jezabel", path: "/serie/jezabel", audio: 'Latino', category: 'Serie Bíblica', banner: "https://static.wixstatic.com/media/859174_e64b24afc6174b53b7682529f7184069~mv2.jpg" },
  { id: 11, title: "El Rico y Lázaro", path: "/serie/el-rico-y-lazaro", audio: 'Latino', category: 'Serie Bíblica', banner: "https://static.wixstatic.com/media/859174_4a207a35843047c7aa4400dff1a8bc68~mv2.jpg" },
  { id: 12, title: "La Historia de Ester", path: "/serie/la-historia-de-la-reina-ester", audio: 'Latino', category: 'Serie Bíblica', banner: "https://static.wixstatic.com/media/859174_08a0b7968f0f48a4acbb8c58805d387e~mv2.jpg" },
  { id: 13, title: "La Reina de Persia", path: "/serie/la-reina-de-persia", audio: 'Latino', category: 'Serie Bíblica', banner: "https://static.wixstatic.com/media/859174_f4ecd0fc68ec45a598afcdd9344cba79~mv2.jpg" },
  { id: 14, title: "Nehemías", path: "/serie/nehemias", audio: 'Subtitulado', category: 'Serie Bíblica', banner: "https://static.wixstatic.com/media/859174_2fa68ebd2b22447889e85bf3cebe4c75~mv2.jpg" },
  { id: 15, title: "Milagros de Jesús", path: "/serie/los-milagros-de-jesus", audio: 'Latino', category: 'Serie Bíblica', banner: "https://static.wixstatic.com/media/859174_0d01d04096d144b7821f7c6438bc281d~mv2.jpg" },
  { id: 16, title: "Jesús", path: "/serie/jesus", audio: 'Latino', category: 'Serie Bíblica', banner: "https://static.wixstatic.com/media/859174_d9ce32069d954bc99d5db05bb90fc924~mv2.jpg" },
  { id: 17, title: "Pablo El Apóstol", path: "/serie/pablo-el-apostol", audio: 'Latino', category: 'Serie Bíblica', banner: "https://static.wixstatic.com/media/859174_c43f668e3a914d29b7c5e9f90e722641~mv2.jpg" },
  { id: 18, title: "El Señor y La Sierva", path: "/serie/el-senor-y-la-sierva", audio: 'Subtitulado', category: 'Serie Bíblica', banner: "https://static.wixstatic.com/media/859174_b3605a85f77244c3a348ae3561ce49bb~mv2.jpg" },
  { id: 19, title: "Apocalipsis", path: "/serie/apocalipsis", audio: 'Latino', category: 'Serie Bíblica', banner: "https://static.wixstatic.com/media/859174_3187cee73d2e4cd9bc1aa7971fd2c117~mv2.jpg" },

  // --- FASES DE REYES ---
  { id: 20, title: "Reyes: La Decepción", path: "/serie/reyes-la-decepcion", audio: 'Latino', category: 'Serie Bíblica', banner: "https://static.wixstatic.com/media/859174_e6a7e56fc1d3456c80a1be6c93eaa3ea~mv2.jpg" },
  { id: 21, title: "Reyes: La Ingratitud", path: "/serie/reyes-la-ingratitud", audio: 'Latino', category: 'Serie Bíblica', banner: "https://static.wixstatic.com/media/859174_3d91ac6e844d44d8bffb32092627dbda~mv2.jpg" },
  { id: 22, title: "Reyes: El Rechazo", path: "/serie/reyes-el-rechazo", audio: 'Latino', category: 'Serie Bíblica', banner: "https://static.wixstatic.com/media/859174_c985cb257e8c4ecda4c6d65350ecac28~mv2.jpg" },
  { id: 23, title: "Reyes: La Elección", path: "/serie/reyes-la-eleccion", audio: 'Latino', category: 'Serie Bíblica', banner: "https://static.wixstatic.com/media/859174_5f33898f282846f08fa1620174bd9d3c~mv2.jpg" },
  { id: 24, title: "Reyes: La Persecución", path: "/serie/reyes-la-persecucion", audio: 'Latino', category: 'Serie Bíblica', banner: "https://static.wixstatic.com/media/859174_9099a7c94e674d1e83ce2081947bff00~mv2.jpg" },
  { id: 25, title: "Reyes: La Conquista", path: "/serie/reyes-la-conquista", audio: 'Latino', category: 'Serie Bíblica', banner: "https://static.wixstatic.com/media/859174_526cf86e23c34ed9bc04c3bbdf9d7951~mv2.jpg" },
  { id: 26, title: "Reyes: El Pecado", path: "/serie/reyes-el-pecado", audio: 'Latino', category: 'Serie Bíblica', banner: "https://static.wixstatic.com/media/859174_d98983c9052e40d7aa442c34b9938000~mv2.jpg" },
  { id: 27, title: "Reyes: La Consecuencia", path: "/serie/reyes-la-consecuencia", audio: 'Latino', category: 'Serie Bíblica', banner: "https://static.wixstatic.com/media/859174_66a23566aff847558bf6e3fa8782d928~mv2.jpg" },
  { id: 28, title: "Reyes: La Sucesión", path: "/serie/reyes-la-sucesion", audio: 'Latino', category: 'Serie Bíblica', banner: "https://static.wixstatic.com/media/859174_ed886b756c5e4af0957049482e1e7720~mv2.jpg" },
  { id: 29, title: "Reyes: La Decadencia", path: "/serie/reyes-la-decadencia", audio: 'Latino', category: 'Serie Bíblica', banner: "https://static.wixstatic.com/media/859174_793aae8af28a45229328711f6c433a38~mv2.jpg" },
  { id: 30, title: "Reyes: La División", path: "/serie/reyes-la-division", audio: 'Latino', category: 'Serie Bíblica', banner: "https://static.wixstatic.com/media/859174_e15961653ab64369aca7f708e8b7054f~mv2.jpg" },
  { id: 31, title: "Reyes: La Emboscada", path: "/serie/reyes-la-emboscada", audio: 'Latino', category: 'Serie Bíblica', banner: "https://static.wixstatic.com/media/859174_4e8c5fa2864842e0bb7e7566ae595076~mv2.jpg" },
  { id: 32, title: "Reyes: La Esperanza", path: "/serie/reyes-la-esperanza", audio: 'Latino', category: 'Serie Bíblica', banner: "https://static.wixstatic.com/media/859174_5333427811fa4d8c94d72a12b17b231f~mv2.jpg" },

  // --- SERIES TV ---
  { id: 40, title: "La Casa De David", path: "/serie-tv/la-casa-de-david", audio: 'Latino', category: 'Serie de TV', banner: "https://static.wixstatic.com/media/859174_cc2c878f7a0a4fffa5b63ef31048fb75~mv2.jpg" },
  { id: 41, title: "La Biblia", path: "/serie-tv/la-biblia", audio: 'Latino', category: 'Serie de TV', banner: "https://static.wixstatic.com/media/859174_aa4a8425d9714f0aa2f96b418a408747~mv2.jpg" },
  { id: 42, title: "La Biblia Continúa", path: "/serie-tv/la-biblia-continua", audio: 'Latino', category: 'Serie de TV', banner: "https://static.wixstatic.com/media/859174_e096b3d265a049d98bb882e620efb771~mv2.jpg" },
  { id: 43, title: "María Magdalena", path: "/serie-tv/maria-magdalena", audio: 'Latino', category: 'Serie de TV', banner: "https://static.wixstatic.com/media/859174_a6c8755b0d7f42d2b8ad21009f75c4e3~mv2.jpg" },
  { id: 44, title: "Testamento: La Historia De Moisés", path: "/serie-tv/testamento-la-historia-de-moises", audio: 'Latino', category: 'Serie de TV', banner: "https://static.wixstatic.com/media/859174_2eabf33760ca467895f9edd4646b2bbe~mv2.jpg" },
  { id: 45, title: "Jesús De Nazaret", path: "/serie-tv/jesus-de-nazaret", audio: 'Latino', category: 'Serie de TV', banner: "https://static.wixstatic.com/media/859174_a9d3a4a2dcaa4de4bd5c4d0be6d47613~mv2.jpg" },

  // --- PELÍCULAS ---
  { id: 60, title: "La Pasión De Cristo", path: "/pelicula/la-pasion-de-cristo", audio: 'Latino', category: 'Película', banner: "https://static.wixstatic.com/media/859174_68e2caed65fb48f482bead90d49ac07a~mv2.jpg" },
  { id: 61, title: "Ben Hur 1959", path: "/pelicula/ben-hur-1959", audio: 'Latino', category: 'Película', banner: "https://static.wixstatic.com/media/859174_e3ac4cc159834b3693529ae55a7e0301~mv2.jpg" },
  { id: 62, title: "Los Diez Mandamientos", path: "/pelicula/los-diez-mandamientos", audio: 'Latino', category: 'Película', banner: "https://static.wixstatic.com/media/859174_bf2a773d1afe438dbd337595d26f4ea4~mv2.jpg" },
  { id: 63, title: "La Vida Pública De Jesús", path: "/pelicula/la-vida-publica-de-jesus", audio: 'Latino', category: 'Película', banner: "https://static.wixstatic.com/media/859174_38220362bde44213a0e94d65b00ee5c5~mv2.jpg" },
  { id: 64, title: "Su Único Hijo", path: "/pelicula/su-unico-hijo", audio: 'Latino', category: 'Película', banner: "https://static.wixstatic.com/media/859174_9434fb1fb91a4d09a9bcf2a0bdc85b08~mv2.jpg" },
  { id: 65, title: "María", path: "/pelicula/maria", audio: 'Latino', category: 'Película', banner: "https://static.wixstatic.com/media/859174_2e4a16bf3a734176986ef81b8f9cd486~mv2.jpg" },
  { id: 66, title: "Hijo De Dios", path: "/pelicula/hijo-de-dios", audio: 'Latino', category: 'Película', banner: "https://static.wixstatic.com/media/859174_285f0efa7e074594acae3f60be33db6b~mv2.jpg" },
  { id: 67, title: "Pablo El Apóstol De Cristo", path: "/pelicula/pablo-el-apostol-de-cristo", audio: 'Latino', category: 'Película', banner: "https://static.wixstatic.com/media/859174_c7361566c7fe41fab5de85fd9806d223~mv2.jpg" },
  { id: 68, title: "María Magdalena", path: "/pelicula/maria-magdalena", audio: 'Latino', category: 'Película', banner: "https://static.wixstatic.com/media/859174_019343e65be24760870af76aa4dd9d7e~mv2.jpg" },
  { id: 69, title: "Ben Hur 2016", path: "/pelicula/ben-hur-2016", audio: 'Latino', category: 'Película', banner: "https://static.wixstatic.com/media/859174_3c33afd52cfa42c1966ee45ac42c694a~mv2.jpg" },
  { id: 70, title: "El Apocalipsis De San Juan", path: "/pelicula/el-apocalipsis-de-san-juan", audio: 'Latino', category: 'Película', banner: "https://static.wixstatic.com/media/859174_392444e4313943e8903983ff7a5601b6~mv2.jpg" },
];
