"use client";

import { Episode } from "../../types";
import { PlayIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import clsx from "clsx";

interface EpisodeItemProps {
  episode: Episode;
  isSelected: boolean;
  onEpisodeClick: (episode: Episode) => void;
}

export const EpisodeItem = ({
  episode,
  isSelected,
  onEpisodeClick,
}: EpisodeItemProps) => {
  return (
    <motion.button
      onClick={() => onEpisodeClick(episode)}
      className={clsx(
        "w-full text-left flex items-center gap-2 sm:gap-3 md:gap-4 py-2 md:py-3 transition-colors duration-200",
        isSelected ? "text-white" : "text-white/90"
      )}
      whileHover={{ x: 3 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="text-white/60 text-sm md:text-base min-w-[16px] md:min-w-[20px]">
        {episode.episodeNumber}
      </span>
      <span className="flex-1 text-sm md:text-base truncate font-semibold">
        {episode.title}
      </span>
      <motion.div
        className="text-white/80"
        whileHover={{ scale: 1.2, rotate: 10 }}
      >
        <PlayIcon className="w-5 h-5 md:w-6 md:h-6" />
      </motion.div>
    </motion.button>
  );
};
