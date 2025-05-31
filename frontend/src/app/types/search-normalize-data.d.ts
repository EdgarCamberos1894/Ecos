export type SearchResult =
  | {
      type: "musician";
      id: number;
      photoUrl: string;
      stageName: string;
      genre: string;
      description: string;
    }
  | {
      type: "song";
      id: number;
      title: string | null;
      genre: string;
      photoUrl: string | null;
      stageName: string | null;
      artistId: number;
    };
