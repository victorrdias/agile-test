interface CastMember {
  ID: string;
  Name: string;
}

interface Genre {
  ID: string;
  Title: string;
}

interface Images {
  Background: string;
}

export interface TVShowResponse {
  Cast: CastMember[];
  Genres: Genre[];
  ID: number;
  Images: Images;
  Synopsis: string;
  Title: string;
  Year: number;
}

export interface EpisodeResponse {
  Duration: number;
  EpisodeNumber: number;
  ID: string;
  Image: string;
  SeasonNumber: number;
  Synopsis?: string;
  Title: string;
}

export interface TVShow {
  id: string;
  title: string;
  description: string;
  releaseYear: number;
  genre: string;
  rating: string;
  duration: string;
  cast: Array<{
    name: string;
    role: string;
    image: string;
  }>;
  seasons: number;
  backgroundImage: string;
}

export interface Episode {
  id: string;
  title: string;
  description: string;
  duration: string;
  season: number;
  episodeNumber: number;
  thumbnail: string;
}
