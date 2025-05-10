export type Role = "FAN" | "MUSICIAN";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface Musician extends User {
  stageName: string;
  genre: string;
  country: string;
  photoUrl?: string;
  photoPublicId?: string;
  deletePhoto: boolean;
  whatsapp?: string;
  spotifyUrl?: string;
  youtubeUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
}
