"use client";

import { Show } from "../../types";
import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { RefObject } from "react";

interface ElencoTabContentProps {
  show: Show;
  carouselRef: RefObject<HTMLDivElement | null>;
  showLeftNav: boolean;
  showRightNav: boolean;
  onScrollLeft: () => void;
  onScrollRight: () => void;
  onScroll: () => void;
}

export const ElencoTabContent = ({
  show,
  carouselRef,
  showLeftNav,
  showRightNav,
  onScrollLeft,
  onScrollRight,
  onScroll,
}: ElencoTabContentProps) => {
  return (
    <div className="relative w-full">
      {showLeftNav && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/60 rounded-full p-1 hover:bg-black/80"
          onClick={onScrollLeft}
          aria-label="Navegar para a esquerda"
        >
          <ChevronLeftIcon className="h-8 w-8 text-white" />
        </motion.button>
      )}

      <div
        ref={carouselRef}
        className="overflow-x-auto scrollbar-hide py-5 px-8"
        onScroll={onScroll}
      >
        <div className="flex space-x-4">
          {show.cast.map((actor) => (
            <motion.div
              key={actor.id}
              className="bg-zinc-900/80 rounded overflow-hidden flex-shrink-0 w-[135px] h-[100px] flex flex-col justify-center p-3"
              whileHover={{
                scale: 1.03,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
                backgroundColor: "rgba(39, 39, 42, 0.9)",
              }}
            >
              <div className="text-center">
                <p className="text-sm font-medium mb-1.5">{actor.name}</p>
                <p className="text-xs text-gray-400">{actor.character}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {showRightNav && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/60 rounded-full p-1 hover:bg-black/80"
          onClick={onScrollRight}
          aria-label="Navegar para a direita"
        >
          <ChevronRightIcon className="h-8 w-8 text-white" />
        </motion.button>
      )}
    </div>
  );
};
