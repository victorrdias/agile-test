"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Episode } from "../types";
import { EPISODES_API } from "../lib/constants/api";
import { transformEpisodeData } from "../lib/transformers/dataTransformers";

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
 * Custom hook to fetch all episodes
 * @returns Query result with all episodes data
 */
export const useEpisodes = () => {
  return useQuery<Episode[]>({
    queryKey: ["episodes"],
    queryFn: async () => {
      try {
        const { data } = await axios.get<(EpisodeResponse | null)[]>(
          EPISODES_API
        );

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
};

/**
 * Custom hook to fetch episodes for a specific season
 * @param seasonNumber - The season number to filter by
 * @returns Query result with filtered episodes for the specified season
 */
export const useSeasonEpisodes = (seasonNumber: number) => {
  const { data: episodes = [], ...rest } = useEpisodes();

  const seasonEpisodes = episodes.filter(
    (episode) => episode.seasonNumber === seasonNumber
  );

  return {
    ...rest,
    data: seasonEpisodes,
  };
};
