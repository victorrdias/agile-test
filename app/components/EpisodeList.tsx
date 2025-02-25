import { Episode } from "../types";
import { PlayIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface EpisodeListProps {
  episodes: Episode[];
  onEpisodeClick: (episode: Episode) => void;
  isLoading?: boolean;
  selectedEpisode: Episode | null;
}

function EpisodeSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex items-center gap-4 px-4 py-2">
        <div className="w-4 text-white/40 text-base">1</div>
        <div className="flex-1">
          <div className="h-5 w-3/4 bg-white/10 rounded" />
        </div>
        <div className="w-8 h-8 bg-white/10 rounded-full" />
      </div>
    </div>
  );
}

export default function EpisodeList({
  episodes,
  onEpisodeClick,
  isLoading = false,
  selectedEpisode,
}: EpisodeListProps) {
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
          <motion.button
            onClick={() => onEpisodeClick(episode)}
            className={clsx(
              "w-full text-left flex items-center gap-4 py-3 transition-colors duration-200",
              selectedEpisode?.id === episode.id
                ? "text-white"
                : "text-white/90"
            )}
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-white/60 text-base min-w-[20px]">
              {episode.episodeNumber}
            </span>
            <span className="flex-1 text-base truncate font-semibold">
              {episode.title}
            </span>
            <motion.div
              className="text-white/80"
              whileHover={{ scale: 1.2, rotate: 10 }}
            >
              <PlayIcon className="w-6 h-6" />
            </motion.div>
          </motion.button>

          {/* Only animate when opening */}
          {selectedEpisode?.id === episode.id && showDetails && (
            <motion.div
              className="overflow-hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{
                height: {
                  duration: 0.3,
                  ease: "easeInOut",
                },
                opacity: { duration: 0.2 },
              }}
            >
              <div className="mt-3 px-6">
                <div className="relative aspect-video rounded overflow-hidden">
                  <motion.div
                    className="w-full h-full"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <Image
                      src={episode.thumbnail}
                      alt={episode.title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  {/* Progress bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/30">
                    <motion.div
                      className="h-full bg-emerald-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${(episode.progress || 0) * 100}%` }}
                      transition={{
                        duration: 0.8,
                        delay: 0.3,
                        ease: "easeOut",
                      }}
                    />
                  </div>
                </div>
                <motion.p
                  className="text-base text-white/80 mt-3 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {episode.description}
                </motion.p>
              </div>
            </motion.div>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}
