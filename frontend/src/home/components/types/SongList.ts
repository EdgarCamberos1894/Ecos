export interface SongList {
  id: number;
  title: string;
  genre: string;
  audioUrl: string;
  spotifyUrl: string | null;
  youtubeUrl: string;
  musicianInfo: {
    artistId: number;
    stageName: string;
    photoUrl: string | null;
    artistName: string;
    spotifyUrl: string;
    youtubeUrl: string | null;
  };
}
