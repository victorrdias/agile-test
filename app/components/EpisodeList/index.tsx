"use client";

import { Episode } from "../../types";
import { motion, AnimatePresence } from "framer-motion";
import { useEpisodeList } from "../../hooks/useEpisodeList";
import { EpisodeItem } from "./EpisodeItem";
import { EpisodeDetails } from "./EpisodeDetails";
import { EpisodeSkeleton } from "./EpisodeSkeleton";

interface EpisodeListProps {
  episodes: Episode[];
  onEpisodeClick: (episode: Episode) => void;
  isLoading?: boolean;
  selectedEpisode: Episode | null;
}

export const EpisodeList = ({
  episodes,
  onEpisodeClick,
  isLoading = false,
  selectedEpisode: externalSelectedEpisode,
}: EpisodeListProps) => {
  const { selectedEpisode, showDetails, handleEpisodeClick } = useEpisodeList({
    episodes,
    initialSelectedEpisode: externalSelectedEpisode,
    onEpisodeSelect: onEpisodeClick,
  });

  if (isLoading) {
    return (
      <div>
        {[...Array(4)].map((_, i) => (
          <EpisodeSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {episodes.map((episode) => (
        <motion.div
          key={episode.id}
          className="group border-b border-white/10 pb-3 last:border-0"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          layout={false}
        >
          <EpisodeItem
            episode={episode}
            isSelected={selectedEpisode?.id === episode.id}
            onEpisodeClick={handleEpisodeClick}
          />

          <AnimatePresence>
            {selectedEpisode?.id === episode.id && (
              <EpisodeDetails episode={episode} show={showDetails} />
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default EpisodeList;
