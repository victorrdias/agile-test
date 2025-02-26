"use client";

import { useState, useEffect } from "react";
import { Episode } from "../types";
import { useQuery } from "@tanstack/react-query";

interface UseEpisodeListProps {
  episodes: Episode[];
  initialSelectedEpisode?: Episode | null;
  onEpisodeSelect?: (episode: Episode) => void;
}

export const useEpisodeList = ({
  episodes,
  initialSelectedEpisode = null,
  onEpisodeSelect,
}: UseEpisodeListProps) => {
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(
    initialSelectedEpisode
  );

  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (selectedEpisode) {
      setShowDetails(true);
    } else {
      setShowDetails(false);
    }
  }, [selectedEpisode]);

  const handleEpisodeClick = (episode: Episode) => {
    setSelectedEpisode(episode);
    if (onEpisodeSelect) {
      onEpisodeSelect(episode);
    }
  };

  const episodesQuery = useQuery({
    queryKey: ["episodes"],
    queryFn: async () => {
      return episodes;
    },
    enabled: false,
  });

  useEffect(() => {
    if (initialSelectedEpisode) {
      setSelectedEpisode(initialSelectedEpisode);
    }
  }, [initialSelectedEpisode]);

  return {
    selectedEpisode,
    showDetails,
    handleEpisodeClick,
    setSelectedEpisode,
    episodesQuery,
  };
};
