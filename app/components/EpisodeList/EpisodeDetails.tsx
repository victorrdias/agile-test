"use client";

import { Episode } from "../../types";
import { motion } from "framer-motion";
import Image from "next/image";

interface EpisodeDetailsProps {
  episode: Episode;
  show: boolean;
}

export const EpisodeDetails = ({ episode, show }: EpisodeDetailsProps) => {
  if (!show) return null;

  return (
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
      <div className="mt-2 md:mt-3 px-2 sm:px-4 md:px-6">
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
          <div className="absolute bottom-0 left-0 right-0 h-1 md:h-1.5 bg-black/30">
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
          className="text-sm md:text-base text-white/80 mt-2 md:mt-3 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {episode.description}
        </motion.p>
      </div>
    </motion.div>
  );
};
