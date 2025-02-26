"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Episode } from "../types";

// API endpoint for episodes data
const EPISODES_API =
  "https://agile-releases.s3.us-east-1.amazonaws.com/tests/episodes/SHOW123.json";

// Type definition for API response
interface EpisodeResponse {
  ID: number;
  Title: string;
  Synopsis: string | null;
  Duration: number;
  SeasonNumber: number;
  EpisodeNumber: number;
  Image: string;
}

/**
 * Generates a simulated progress value for each episode
 * @param seasonNumber - The season number
 * @param episodeNumber - The episode number
 * @returns A progress value between 0 and 1
 */
function generateProgressValue(
  seasonNumber: number,
  episodeNumber: number
): number {
  // Generates a value that depends on episode number (for demo purposes)
  return Math.min(episodeNumber / 10 + 0.1, 1);
}

/**
 * Transforms API episode data to our application model
 * @param response - The episode data from the API
 * @returns The transformed Episode object
 */
function transformEpisodeData(response: EpisodeResponse): Episode {
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
}

/**
 * Custom hook to fetch all episodes
 * @returns Query result with all episodes data
 */
export function useEpisodes() {
  return useQuery<Episode[]>({
    queryKey: ["episodes"],
    queryFn: async () => {
      try {
        const { data } = await axios.get<(EpisodeResponse | null)[]>(
          EPISODES_API
        );

        // Filter out null episodes and transform the data
        return data
          .filter((episode): episode is EpisodeResponse => episode !== null)
          .map(transformEpisodeData);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Falha ao buscar episódios: ${error.message}`);
        }
        throw new Error("Falha ao buscar episódios: Erro desconhecido");
      }
    },
  });
}

/**
 * Custom hook to fetch episodes for a specific season
 * @param seasonNumber - The season number to filter by
 * @returns Query result with filtered episodes for the specified season
 */
export function useSeasonEpisodes(seasonNumber: number) {
  const { data: episodes = [], ...rest } = useEpisodes();

  // Filter episodes by season number
  const seasonEpisodes = episodes.filter(
    (episode) => episode.seasonNumber === seasonNumber
  );

  return {
    ...rest,
    data: seasonEpisodes,
  };
}
