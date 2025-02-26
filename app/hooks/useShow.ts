"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Show } from "../types";
import { getNumberOfSeasons } from "../lib/utils/episodeUtils";
import { transformShowData } from "../lib/transformers/dataTransformers";
import { SHOW_API, EPISODES_API } from "../lib/constants/api";

/**
 * Custom hook to fetch and transform show data
 * @returns Query result with show data
 */

export const useShow = () => {
  return useQuery<Show>({
    queryKey: ["show"],
    queryFn: async () => {
      try {
        const { data: showData } = await axios.get(SHOW_API);

        const { data: episodesData } = await axios.get(EPISODES_API);

        const seasonCount = getNumberOfSeasons(episodesData);

        return transformShowData(showData, seasonCount);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(
            `Falha ao buscar dados do programa: ${error.message}`
          );
        }
        throw new Error("Falha ao buscar dados do programa: Erro desconhecido");
      }
    },
  });
};
