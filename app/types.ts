export interface Episode {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  episodeNumber: number;
  seasonNumber: number;
  duration: string;
  progress: number;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  image?: string;
}

export interface Award {
  id: number;
  name: string;
  description: string;
  year: number;
}

export interface Show {
  id: number;
  title: string;
  description: string;
  backgroundImage: string;

  releaseYear: number;
  genre: string;
  duration: string;
  seasons: number;
  rating: string;
  cast: CastMember[];
  awards?: Award[];
}
