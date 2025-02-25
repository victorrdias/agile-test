"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Show } from "../types";

// API endpoint for show data
const SHOW_API =
  "https://agile-releases.s3.us-east-1.amazonaws.com/tests/tv-shows/SHOW123.json";

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

/**
 * Transforms API response data to our application data model
 * @param response - The response from the API
 * @returns The transformed Show object
 */

function transformShowData(response: TVShowResponse): Show {
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
    duration: "3 Seasons", // Hardcoded based on the episodes data
    backgroundImage: response.Images.Background,
    seasons: 3, // Hardcoded based on the available seasons
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
        const { data } = await axios.get<TVShowResponse>(SHOW_API);
        return transformShowData(data);
      } catch (error) {
        // Log error for debugging but throw for handling in UI
        if (error instanceof Error) {
          throw new Error(`Failed to fetch show data: ${error.message}`);
        }
        throw new Error("Failed to fetch show data: Unknown error");
      }
    },
  });
}
