import { Episode, Show } from "../../types";
import { generateProgressValue } from "../utils/episodeUtils";

interface TVShowResponse {
  ID: number;
  Title: string;
  Synopsis: string;
  Year: number;
  Genres: { Title: string }[];
  Images: { Background: string };
  Cast: { ID: string; Name: string }[];
}

interface EpisodeResponse {
  ID: number;
  Title: string;
  Synopsis: string | null;
  Duration: number;
  SeasonNumber: number;
  EpisodeNumber: number;
  Image: string;
}

export const transformShowData = (
  response: TVShowResponse,
  seasonCount: number
): Show => {
  const cast = response.Cast.map((castMember) => ({
    id:
      parseInt(castMember.ID.replace("PER-", "")) ||
      Math.floor(Math.random() * 1000),
    name: castMember.Name,
    character: "Unknown Character", // Since API doesn't provide character names
  }));

  return {
    id: response.ID,
    title: response.Title,
    description: response.Synopsis,
    releaseYear: response.Year,
    genre: response.Genres.map((g) => g.Title).join(", "),
    rating: "4.35 estrelas", // Hardcoded as it's not in the API
    duration: `${seasonCount} Temporadas`,
    backgroundImage: response.Images.Background,
    seasons: seasonCount,
    cast: cast,
  };
};

/**
 * Transforms API episode data to our application model
 * @param response - The episode data from the API
 * @returns The transformed Episode object
 */

export const transformEpisodeData = (response: EpisodeResponse): Episode => {
  return {
    id: response.ID,
    title: response.Title,
    description: response.Synopsis || "",
    duration: `${response.Duration}min`,
    seasonNumber: response.SeasonNumber,
    episodeNumber: response.EpisodeNumber,
    thumbnail: response.Image,
    progress: generateProgressValue(
      response.SeasonNumber,
      response.EpisodeNumber
    ),
  };
};
