// src/data/series.ts

export interface Episode {
  id: number;
  title: string;
  dur: string;
  desc: string;
  thumb: string;
  url: string;
}

export interface Serie {
  id: string;
  title: string;
  path: string; // La URL de la página (ej: /lea)
  banner: string;
  logo?: string;
  episodes: Episode[];
}

export const allSeries: Serie[] = [
  {
    id: 'lea',
    title: 'Lea',
    path: '/serie/lea',
    banner: 'https://static.wixstatic.com/media/859174_394a43598162462980999d535f5ab55a~mv2.jpg',
    episodes: [
      { id: 1, title: "Hermanas del destino", dur: "00:40:09", desc: "Lía pierde a su madre...", thumb: "...", url: "..." },
      // ... aquí irían todos los episodios que ya tenemos de Lea
    ]
  },
  {
    id: 'genesis',
    title: 'Génesis',
    path: '/serie/genesis',
    banner: 'https://static.wixstatic.com/media/859174_264be00ba6d14e699767e79c49297e5c~mv2.jpg',
    episodes: [
      { id: 1, title: "El Edén", dur: "00:43:16", desc: "El inicio de todo...", thumb: "...", url: "..." },
    ]
  }
];
