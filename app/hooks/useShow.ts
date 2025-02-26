"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Show } from "../types";

// API endpoint for show data
const SHOW_API =
  "https://agile-releases.s3.us-east-1.amazonaws.com/tests/tv-shows/SHOW123.json";

// API endpoint for episodes data
const EPISODES_API =
  "https://agile-releases.s3.us-east-1.amazonaws.com/tests/episodes/SHOW123.json";

// Type definition for the API response
interface TVShowResponse {
  ID: number;
  Title: string;
  Synopsis: string;
  Year: number;
  Genres: { Title: string }[];
  Images: { Background: string };
  Cast: { ID: string; Name: string }[];
}

// Type definition for episode API response
interface EpisodeResponse {
  Duration: number;
  EpisodeNumber: number;
  ID: string;
  Image: string;
  SeasonNumber: number;
  Synopsis?: string;
  Title: string;
}

/**
 * Calculates the number of seasons from episode data
 * @param episodes - Array of episodes from the API
 * @returns The highest season number found
 */
function getNumberOfSeasons(episodes: (EpisodeResponse | null)[]): number {
  // Filter out null entries
  const validEpisodes = episodes.filter(
    (episode): episode is EpisodeResponse => episode !== null
  );

  // If there are no valid episodes, return 0
  if (validEpisodes.length === 0) {
    return 0;
  }

  // Extract all season numbers and find the maximum
  const seasonNumbers = validEpisodes.map((episode) => episode.SeasonNumber);
  return Math.max(...seasonNumbers);
}

/**
 * Transforms API response data to our application data model
 * @param response - The response from the API
 * @param seasonCount - The number of seasons
 * @returns The transformed Show object
 */
function transformShowData(
  response: TVShowResponse,
  seasonCount: number
): Show {
  // Transform cast data from API
  const cast = response.Cast.map((castMember) => ({
    id:
      parseInt(castMember.ID.replace("PER-", "")) ||
      Math.floor(Math.random() * 1000),
    name: castMember.Name,
    character: "Unknown Character", // Since API doesn't provide character names
    // No image property as it's now optional
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
}

/**
 * Custom hook to fetch and transform show data
 * @returns Query result with show data
 */
export function useShow() {
  return useQuery<Show>({
    queryKey: ["show"],
    queryFn: async () => {
      try {
        // Fetch show data
        const { data: showData } = await axios.get<TVShowResponse>(SHOW_API);

        // Fetch episodes data to calculate seasons
        const { data: episodesData } = await axios.get<
          (EpisodeResponse | null)[]
        >(EPISODES_API);

        // Calculate number of seasons
        const seasonCount = getNumberOfSeasons(episodesData);

        // Transform show data with accurate season count
        return transformShowData(showData, seasonCount);
      } catch (error) {
        // Log error for debugging but throw for handling in UI
        if (error instanceof Error) {
          throw new Error(
            `Falha ao buscar dados do programa: ${error.message}`
          );
        }
        throw new Error("Falha ao buscar dados do programa: Erro desconhecido");
      }
    },
  });
}
