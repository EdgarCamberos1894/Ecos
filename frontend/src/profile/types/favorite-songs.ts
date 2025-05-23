export interface Musician {
  artistId: number;
  stageName: string;
  photoUrl: string | null;
}

interface Song {
  id: number;
  title: string;
  audioUrl: string;
  musicianInfo: Musician;
}

export interface ResponseListOfFavoriteSongs {
  items: Song[];
}
