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
  stageName: string | null;
  artistName: string;
  spotifyUrl: string | null;
  youtubeUrl: string | null;
}

export interface FavoriteMusic {
  isSuccess: boolean;
  message: string;
  data: null;
}
