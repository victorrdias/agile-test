"use client";

import { useState, useEffect } from "react";
import { Episode } from "../types";
import { useQuery } from "@tanstack/react-query";

interface UseEpisodeListProps {
  episodes: Episode[];
  initialSelectedEpisode?: Episode | null;
  onEpisodeSelect?: (episode: Episode) => void;
}

export function useEpisodeList({
  episodes,
  initialSelectedEpisode = null,
  onEpisodeSelect,
}: UseEpisodeListProps) {
  // Track the selected episode
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(
    initialSelectedEpisode
  );

  // Track if we're showing content to handle animations
  const [showDetails, setShowDetails] = useState(false);

  // When selected episode changes, handle animation
  useEffect(() => {
    if (selectedEpisode) {
      setShowDetails(true);
    } else {
      setShowDetails(false);
    }
  }, [selectedEpisode]);

  // Function to handle episode click
  const handleEpisodeClick = (episode: Episode) => {
    setSelectedEpisode(episode);
    if (onEpisodeSelect) {
      onEpisodeSelect(episode);
    }
  };

  // Query for episodes data - useful if you want to fetch this data dynamically
  const episodesQuery = useQuery({
    queryKey: ["episodes"],
    queryFn: async () => {
      // This is a mock implementation - in a real app, you would fetch from an API
      // In this case, we're just returning the episodes passed as props
      return episodes;
    },
    enabled: false, // Disabled by default as we're using props for now
  });

  // Update selected episode if initialSelectedEpisode changes
  useEffect(() => {
    if (initialSelectedEpisode) {
      setSelectedEpisode(initialSelectedEpisode);
    }
  }, [initialSelectedEpisode]);

  return {
    // State
    selectedEpisode,
    showDetails,

    // Actions
    handleEpisodeClick,
    setSelectedEpisode,

    // Query results
    episodesQuery,
  };
}
