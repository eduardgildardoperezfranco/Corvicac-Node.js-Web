// Tipos estrictos para metadatos de Next.js

// Tipo para OpenGraph con valores literales
export type StrictOpenGraph = {
  type: 'website' | 'article' | 'book' | 'profile' | 
        'music.song' | 'music.album' | 'music.playlist' | 'music.radio_station' |
        'video.movie' | 'video.episode' | 'video.tv_show' | 'video.other';
  locale: string;
  url: string;
  title: string;
  description: string;
  siteName: string;
  images: {
    url: string;
    width: number;
    height: number;
    alt: string;
  }[];
};

// Tipo para Twitter con valores literales
export type StrictTwitter = {
  card: 'summary' | 'summary_large_image' | 'app' | 'player';
  title: string;
  description: string;
  images: string[];
  creator: string;
  site: string;
};

// Función para crear metadatos OpenGraph seguros
export function createOpenGraphMetadata(data: {
  type: 'website' | 'article' | 'book' | 'profile' | 
        'music.song' | 'music.album' | 'music.playlist' | 'music.radio_station' |
        'video.movie' | 'video.episode' | 'video.tv_show' | 'video.other';
  locale: string;
  url: string;
  title: string;
  description: string;
  siteName: string;
  images: {
    url: string;
    width: number;
    height: number;
    alt: string;
  }[];
}): StrictOpenGraph {
  return data;
}

// Función para crear metadatos Twitter seguros
export function createTwitterMetadata(data: {
  card: 'summary' | 'summary_large_image' | 'app' | 'player';
  title: string;
  description: string;
  images: string[];
  creator: string;
  site: string;
}): StrictTwitter {
  return data;
}
