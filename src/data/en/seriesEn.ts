export interface SerieEn {
  id: number;
  title: string;
  path: string;
  banner: string;
  category: 'Biblical Series' | 'Movie' | 'TV Show';
  audio: 'English' | 'Spanish' | 'Portuguese' | 'Subtitled';
}

export const allSeriesEn: SerieEn[] = [
  // --- BIBLICAL SERIES ---
  { id: 1, title: "Genesis", path: "/en/series/genesis", audio: 'English', category: 'Biblical Series', banner: "https://static.wixstatic.com/media/859174_9085a904d152495bb28d646a0008d545~mv2.jpg" },
  { id: 2, title: "Leah", path: "/en/series/leah", audio: 'English', category: 'Biblical Series', banner: "https://static.wixstatic.com/media/859174_7c2a70bbc834445080d5e766bdbede85~mv2.jpg" },
  { id: 3, title: "The Life of Job", path: "/en/series/the-life-of-job", audio: 'English', category: 'Biblical Series', banner: "https://static.wixstatic.com/media/859174_fcd6cc01ecfc4a0abddcd5de84f34ed5~mv2.png" },
  { id: 4, title: "Joseph of Egypt", path: "/en/series/joseph-of-egypt", audio: 'English', category: 'Biblical Series', banner: "https://static.wixstatic.com/media/859174_bc24808a34974a11b96a36a0eb55ac41~mv2.jpg" },
  { id: 5, title: "The Ten Commandments", path: "/en/series/moses-and-the-ten-commandments", audio: 'English', category: 'Biblical Series', banner: "https://static.wixstatic.com/media/859174_bb89fe35d7044bb1bb0d66a1cc84e3f1~mv2.jpg" },
  { id: 6, title: "The Promised Land", path: "/en/series/the-promised-land", audio: 'English', category: 'Biblical Series', banner: "https://static.wixstatic.com/media/859174_163f17ddceb64833a51f70657759a927~mv2.jpg" },
  { id: 7, title: "Samson and Delilah", path: "/en/series/samson-and-delilah", audio: 'English', category: 'Biblical Series', banner: "https://static.wixstatic.com/media/859174_c7b91353c78d412299b8f5793fcb831f~mv2.jpg" },
  { id: 8, title: "King David", path: "/en/series/king-david", audio: 'English', category: 'Biblical Series', banner: "https://static.wixstatic.com/media/859174_5a421ba28d1946c18e7c842966b62cb8~mv2.jpg" },
  { id: 9, title: "Kings", path: "/en/series/kings", audio: 'English', category: 'Biblical Series', banner: "https://static.wixstatic.com/media/859174_894368fbe68b4d28b4b31c6728f761b3~mv2.jpg" },
  { id: 10, title: "Jezebel", path: "/en/series/jezebel", audio: 'English', category: 'Biblical Series', banner: "https://static.wixstatic.com/media/859174_50027fec42b743af8c1724585177c61e~mv2.jpg" },
  { id: 11, title: "The Rich and Lazarus", path: "/en/series/the-rich-and-lazarus", audio: 'English', category: 'Biblical Series', banner: "https://static.wixstatic.com/media/859174_ffda22a45f434031afd644142a7e78b6~mv2.jpg" },
  { id: 12, title: "The Story of Esther", path: "/en/series/the-story-of-ester", audio: 'English', category: 'Biblical Series', banner: "https://static.wixstatic.com/media/859174_6c177962893542a2a8678209eed2137a~mv2.jpg" },
  { id: 13, title: "The Queen of Persia", path: "/en/series/the-queen-of-persia", audio: 'English', category: 'Biblical Series', banner: "https://static.wixstatic.com/media/859174_502004722dce43acbd470f783c66dcb5~mv2.jpg" },
  { id: 14, title: "Nehemiah", path: "/en/series/nehemiah", audio: 'English', category: 'Biblical Series', banner: "https://static.wixstatic.com/media/859174_eb789314c8524d72b959f57af0541687~mv2.jpg" },
  { id: 15, title: "Miracles of Jesus", path: "/en/series/miracles-of-jesus", audio: 'English', category: 'Biblical Series', banner: "https://static.wixstatic.com/media/859174_3eb35e22d64b49eb821e1e34d0a47e54~mv2.jpg" },
  { id: 16, title: "Jesus", path: "/en/series/jesus", audio: 'English', category: 'Biblical Series', banner: "https://static.wixstatic.com/media/859174_f34317eac9bf4788b016b16300ba36f3~mv2.jpg" },
  { id: 17, title: "Paul The Apostle", path: "/en/series/paul-the-apostle", audio: 'English', category: 'Biblical Series', banner: "https://static.wixstatic.com/media/859174_fcaa4a7069d2442fb5aa6953cd12b38c~mv2.jpg" },
  { id: 18, title: "The Lord and The Handmaid", path: "/en/series/the-lord-and-the-handmaid", audio: 'English', category: 'Biblical Series', banner: "https://static.wixstatic.com/media/859174_eb000d78f8234aa1a39c0f5f013241c9~mv2.png" },
  { id: 19, title: "Apocalypse", path: "/en/series/apocalypse", audio: 'English', category: 'Biblical Series', banner: "https://static.wixstatic.com/media/859174_db076459678240f2bbb96912137b2c6a~mv2.jpg" },

  // --- KINGS PHASES ---
  { id: 20, title: "Kings: The Deception", path: "/en/series/kings-the-deception", audio: 'English', category: 'Biblical Series', banner: "https://static.wixstatic.com/media/859174_43243c9fdfa24436844b970f7880ed25~mv2.jpg" },
  { id: 21, title: "Kings: The Ingratitude", path: "/en/series/kings-the-ingratitude", audio: 'English', category: 'Biblical Series', banner: "https://static.wixstatic.com/media/859174_9823391a2bf143a9a1ce8a186c7a8253~mv2.jpg" },
  { id: 22, title: "Kings: The Rejection", path: "/en/series/kings-the-rejection", audio: 'English', category: 'Biblical Series', banner: "https://static.wixstatic.com/media/859174_dff32c6ef8dc4e4b8893c0b871c911ac~mv2.jpg" },
  { id: 23, title: "Kings: The Choosing", path: "/en/series/kings-the-choosing", audio: 'English', category: 'Biblical Series', banner: "https://static.wixstatic.com/media/859174_6cbf6a301aba4f3cb95313051a34588c~mv2.jpg" },
  { id: 24, title: "Kings: The Persecution", path: "/en/series/kings-the-persecution", audio: 'English', category: 'Biblical Series', banner: "https://static.wixstatic.com/media/859174_91fbd06f99ed45b69a7574ea0e36a831~mv2.jpg" },
  { id: 25, title: "Kings: The Conquest", path: "/en/series/kings-the-conquest", audio: 'English', category: 'Biblical Series', banner: "https://static.wixstatic.com/media/859174_89fb9189454e4e83a11d32fe92e74656~mv2.jpg" },
  { id: 26, title: "Kings: The Sin", path: "/en/series/kings-the-sin", audio: 'English', category: 'Biblical Series', banner: "https://static.wixstatic.com/media/859174_58dadb2f6dfd43fa9ba44ee580cd8bdf~mv2.jpg" },
  { id: 27, title: "Kings: The Consequence", path: "/en/series/kings-the-consequence", audio: 'English', category: 'Biblical Series', banner: "https://static.wixstatic.com/media/859174_691f632cd46740eabb80c44c1f64b100~mv2.jpg" },
  { id: 28, title: "Kings: The Succession", path: "/en/series/kings-the-succession", audio: 'English', category: 'Biblical Series', banner: "https://static.wixstatic.com/media/859174_f50d26aa570b4d75b2c922df5cb6f33b~mv2.jpg" },
  { id: 29, title: "Kings: The Decadence", path: "/en/series/kings-the-decadence", audio: 'English', category: 'Biblical Series', banner: "https://static.wixstatic.com/media/859174_617d8f42ad904a77b14ddd32ff0ab46f~mv2.jpg" },
  { id: 30, title: "Kings: The Division", path: "/en/series/kings-the-division", audio: 'English', category: 'Biblical Series', banner: "https://static.wixstatic.com/media/859174_f7b2f1a65e074b1cae8c6b744d0f5fe1~mv2.jpg" },
  { id: 31, title: "Kings: The Ambush", path: "/en/series/kings-the-ambush", audio: 'English', category: 'Biblical Series', banner: "https://static.wixstatic.com/media/859174_9d4ff333524c4410ba8cdbe7a8d2edac~mv2.jpg" },
  { id: 32, title: "Kings: The Hope", path: "/en/series/kings-the-hope", audio: 'English', category: 'Biblical Series', banner: "https://static.wixstatic.com/media/859174_51623856c2f04094b94a0be313f6e426~mv2.jpg" },

  // --- TV SHOWS ---
  { id: 33, title: "The House of David", path: "/en/tv-shows/the-house-of-david", audio: 'English', category: 'TV Show', banner: "https://static.wixstatic.com/media/859174_b9b5e80c5e454bd0a992111da4f64b15~mv2.jpg" },
  { id: 34, title: "The Chosen", path: "/en/tv-shows/the-chosen", audio: 'English', category: 'TV Show', banner: "https://static.wixstatic.com/media/859174_d393d3a8b1a24579b03c1cb50e8efaa5~mv2.jpg" },
  { id: 35, title: "The Bible", path: "/en/tv-shows/the-bible", audio: 'English', category: 'TV Show', banner: "https://static.wixstatic.com/media/859174_bb4f60e5d1be4ca3a2b77db4f891d456~mv2.jpg" },
  { id: 36, title: "The Bible Continues", path: "/en/tv-shows/the-bible-continues", audio: 'English', category: 'TV Show', banner: "https://static.wixstatic.com/media/859174_e4ff56caecdb429fba5276737a4240bd~mv2.jpg" },
  { id: 37, title: "Mary Magdalene", path: "/en/tv-shows/mary-magdalene", audio: 'English', category: 'TV Show', banner: "https://static.wixstatic.com/media/859174_d1adb195ded2459ba471391fed045952~mv2.jpg" },
  { id: 38, title: "Testament: The Story of Moses", path: "/en/tv-shows/testament-the-story-of-moses", audio: 'English', category: 'TV Show', banner: "https://static.wixstatic.com/media/859174_4c301157c6554ace95b9992261658eeb~mv2.jpg" },
  { id: 39, title: "Jesus of Nazareth", path: "/en/tv-shows/jesus-of-nazareth", audio: 'English', category: 'TV Show', banner: "https://static.wixstatic.com/media/859174_41eed8234cce4391ac606988aa1df5b1~mv2.jpg" },

  // --- MOVIES ---
  { id: 40, title: "The Passion of the Christ", path: "/en/movie/the-passion-of-the-christ", audio: 'English', category: 'Movie', banner: "https://static.wixstatic.com/media/859174_1d380fda8a6c4b4f84c526aba56eb7c3~mv2.jpg" },
  { id: 41, title: "Ben Hur 1959", path: "/en/movie/ben-hur-1959", audio: 'English', category: 'Movie', banner: "https://static.wixstatic.com/media/859174_1295f60f570e49f2b64a15856e939752~mv2.jpg" },
  { id: 42, title: "The Ten Commandments", path: "/en/movie/the-ten-commandments", audio: 'English', category: 'Movie', banner: "https://static.wixstatic.com/media/859174_a62b319ef69049dea94662b42b26ff74~mv2.jpg" },
  { id: 43, title: "Jesus", path: "/en/movie/jesus", audio: 'English', category: 'Movie', banner: "https://static.wixstatic.com/media/859174_0c6e720ff5a64dde97a7b3938baff542~mv2.jpg" },
  { id: 44, title: "His Only Son", path: "/en/movie/his-only-son", audio: 'English', category: 'Movie', banner: "https://static.wixstatic.com/media/859174_234f34ac8cc340d7a03600b4f4bd479e~mv2.jpg" },
  { id: 45, title: "Mary", path: "/en/movie/mary", audio: 'English', category: 'Movie', banner: "https://static.wixstatic.com/media/859174_f54b3dabb0bc487aaac27d1019f95c41~mv2.jpg" },
  { id: 46, title: "Son of God", path: "/en/movie/son-of-god", audio: 'English', category: 'Movie', banner: "https://static.wixstatic.com/media/859174_db09434d503a486fa705d7259dea1f49~mv2.jpg" },
  { id: 47, title: "Paul: Apostle of Christ", path: "/en/movie/paul-apostle-of-christ", audio: 'English', category: 'Movie', banner: "https://static.wixstatic.com/media/859174_3e0b90b6a14a4dbf9bcad97fa6a5a9f5~mv2.jpg" },
  { id: 48, title: "Mary Magdalene", path: "/en/movie/mary-magdalene", audio: 'English', category: 'Movie', banner: "https://static.wixstatic.com/media/859174_954341479d0e4ec2a76c2c1249a3f8b3~mv2.jpg" },
  { id: 49, title: "Ben Hur 2016", path: "/en/movie/ben-hur-2016", audio: 'English', category: 'Movie', banner: "https://static.wixstatic.com/media/859174_70719307a1624b99b65970eb6067af6a~mv2.jpg" },
  { id: 50, title: "The Apocalypse of Saint John", path: "/en/movie/the-apocalypse-of-st-john", audio: 'English', category: 'Movie', banner: "https://static.wixstatic.com/media/859174_d05cfb7f32a842bc9f741432a5c1c28a~mv2.jpg" },
];
