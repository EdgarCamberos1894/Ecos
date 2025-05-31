export interface BannerUrl {
  bannerUrl: string | null;
}

export interface MusicianProfile {
  isSuccess: boolean;
  message: string;
  data: BandData;
}

interface BandData {
  id: number;
  stageName: string;
  genre: string;
  country: string;
  description: string;
  photoUrl: string | null;
  whatsapp: string | null;
  paymentLink: string;
  paymentAlias: string;
  cbu: string;
  spotifyUrl: string | null;
  youtubeUrl: string | null;
  instagramUrl: string | null;
  tiktokUrl: string | null;
}

export interface ApiSongs {
  items: Item[];
  page: number;
  size: number;
  totalPages: number;
  totalItems: number;
  first: boolean;
  last: boolean;
}

interface Item {
  id: number;
  title: string;
  genre: string;
  audioUrl: string;
  spotifyUrl: string | null;
  youtubeUrl: string;
  musicianInfo: MusicianInfo;
}

interface MusicianInfo {
  artistId: number;
  stageName: string | null;
  photoUrl: string | null;
  artistName: string;
  spotifyUrl: string | null;
  youtubeUrl: string | null;
}

export interface FavoriteMusic {
  isSuccess: boolean;
  message: string;
  data: null;
}

interface Musician {
  artistId: number;
  stageName: string | null;
  photoUrl: string | null;
  artistName: string | null;
  spotifyUrl: string | null;
  youtubeUrl: string | null;
}

interface Event {
  id: number;
  name: string;
  category: string;
  date: string;
  description: string;
  image: string;
  musician: Musician;
}

export interface ApiEvents {
  items: Event[];
  page: number;
  size: number;
  totalPages: number;
  totalItems: number;
  first: boolean;
  last: boolean;
}
