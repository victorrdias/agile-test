"use client";

import { motion } from "framer-motion";
import { PlusIcon, StarIcon, CheckIcon } from "@heroicons/react/24/outline";

interface ActionButtonsProps {
  inMyList: boolean;
  ratingValue: number;
  isRecording: boolean;
  shareOpen: boolean;
  onMyListClick: () => void;
  onRatingClick: () => void;
  onRecordingClick: () => void;
  onShareClick: () => void;
}

export const ActionButtons = ({
  inMyList,
  ratingValue,
  isRecording,
  shareOpen,
  onMyListClick,
  onRatingClick,
  onRecordingClick,
  onShareClick,
}: ActionButtonsProps) => {
  return (
    <div className="flex justify-center sm:justify-start gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-0 w-full sm:w-auto">
      <motion.button
        className="flex flex-col items-center gap-1"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onMyListClick}
      >
        <div
          className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border ${
            inMyList
              ? "border-emerald-500 bg-emerald-500/10"
              : "border-white/80"
          } flex items-center justify-center transition-colors`}
        >
          {inMyList ? (
            <CheckIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-emerald-500" />
          ) : (
            <PlusIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          )}
        </div>
        <span className="text-[10px] sm:text-xs font-medium tracking-wide">
          Minha Lista
        </span>
      </motion.button>

      <motion.button
        className="flex flex-col items-center gap-1"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRatingClick}
      >
        <div
          className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border ${
            ratingValue > 0
              ? "border-yellow-400 bg-yellow-400/10"
              : "border-white/80"
          } flex items-center justify-center transition-colors`}
        >
          <StarIcon
            className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 ${
              ratingValue > 0 ? "text-yellow-400 fill-yellow-400" : ""
            }`}
          />
        </div>
        <span className="text-[10px] sm:text-xs font-medium tracking-wide">
          Avaliar
        </span>
      </motion.button>

      <motion.button
        className="flex flex-col items-center gap-1"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRecordingClick}
      >
        <div
          className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border ${
            isRecording ? "border-red-500 bg-red-500/10" : "border-white/80"
          } flex items-center justify-center transition-colors`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke={isRecording ? "rgb(239, 68, 68)" : "currentColor"}
            className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
            />
          </svg>
        </div>
        <span className="text-[10px] sm:text-xs font-medium tracking-wide">
          Gravar
        </span>
      </motion.button>

      <motion.button
        className="flex flex-col items-center gap-1"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onShareClick}
      >
        <div
          className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border ${
            shareOpen ? "border-blue-400 bg-blue-400/10" : "border-white/80"
          } flex items-center justify-center transition-colors`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke={shareOpen ? "rgb(96, 165, 250)" : "currentColor"}
            className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Z"
            />
          </svg>
        </div>
        <span className="text-[10px] sm:text-xs font-medium tracking-wide">
          Compartilhar
        </span>
      </motion.button>
    </div>
  );
};
