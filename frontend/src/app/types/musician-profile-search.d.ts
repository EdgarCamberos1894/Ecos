interface MusicianItem {
  id: number;
  photoUrl: string;
  stageName: string;
  genre: string;
  description: string;
}

export interface MusicianApiResponse {
  items: MusicianItem[];
  page: number;
  size: number;
  totalPages: number;
  totalItems: number;
  first: boolean;
  last: boolean;
}
