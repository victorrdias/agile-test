"use client";

import { Show } from "../../types";
import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import { StarIcon, PlusIcon } from "@heroicons/react/24/outline";

interface GeneralTabContentProps {
  show: Show;
  actionButtons: ReactNode;
  showFullDescription: boolean;
  myListOpen: boolean;
  showRating: boolean;
  recordingOpen: boolean;
  shareOpen: boolean;
  onShowFullDescription: () => void;
  onCloseFullDescription: () => void;
  onAddToList: () => void;
  onRemoveFromList: () => void;
  onRatingSelection: (value: number) => void;
  onStartRecording: () => void;
  onCancelRecording: () => void;
  onSharePlatform: (platform: string) => void;
}

export const GeneralTabContent = ({
  show,
  actionButtons,
  showFullDescription,
  myListOpen,
  showRating,
  recordingOpen,
  shareOpen,
  onShowFullDescription,
  onCloseFullDescription,
  onAddToList,
  onRatingSelection,
  onStartRecording,
  onSharePlatform,
}: GeneralTabContentProps) => {
  return (
    <motion.div
      className="flex flex-col sm:flex-row w-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      {/* Action buttons - left side */}
      {actionButtons}

      {/* Mi Lista panel */}
      <AnimatePresence>
        {myListOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute left-0 right-0 mx-auto bottom-20 sm:bottom-32 md:bottom-44 bg-gray-900 p-3 sm:p-4 rounded-lg shadow-lg z-50"
            style={{
              width: "fit-content",
              maxWidth: "calc(100% - 32px)",
            }}
          >
            <div className="flex flex-col gap-2 items-center">
              <span className="text-white/90 text-xs sm:text-sm mb-1 sm:mb-2 text-center">
                Adicionar à sua lista:
              </span>
              <div className="flex gap-2 sm:gap-4">
                <button
                  onClick={onAddToList}
                  className="bg-emerald-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded text-xs flex items-center gap-2"
                >
                  <PlusIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Adicionar à Minha Lista</span>
                </button>
                <button
                  onClick={onCloseFullDescription}
                  className="bg-gray-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded text-xs"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rating panel */}
      <AnimatePresence>
        {showRating && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute left-0 right-0 mx-auto bottom-20 sm:bottom-32 md:bottom-44 bg-gray-900 p-3 sm:p-4 rounded-lg shadow-lg z-50"
            style={{
              width: "fit-content",
              maxWidth: "calc(100% - 32px)",
            }}
          >
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
              <span className="text-white/90 text-xs sm:text-sm">
                Avalie este título:
              </span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => onRatingSelection(star)}
                    className="p-1"
                  >
                    <StarIcon
                      className={`w-5 h-5 sm:w-6 sm:h-6 ${
                        star <= 0
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-white/60"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recording panel */}
      <AnimatePresence>
        {recordingOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute left-0 right-0 mx-auto bottom-20 sm:bottom-32 md:bottom-44 bg-gray-900 p-3 sm:p-4 rounded-lg shadow-lg z-50"
            style={{
              width: "fit-content",
              maxWidth: "calc(100% - 32px)",
            }}
          >
            <div className="flex flex-col gap-2 items-center">
              <span className="text-white/90 text-xs sm:text-sm mb-1 sm:mb-2 text-center">
                Programar gravação:
              </span>
              <div className="flex gap-2 sm:gap-4">
                <button
                  onClick={onStartRecording}
                  className="bg-red-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded text-xs flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-3 h-3 sm:w-4 sm:h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
                    />
                  </svg>
                  <span>Programar Gravação</span>
                </button>
                <button
                  onClick={onCloseFullDescription}
                  className="bg-gray-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded text-xs"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share panel */}
      <AnimatePresence>
        {shareOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute left-0 right-0 mx-auto bottom-20 sm:bottom-32 md:bottom-44 bg-gray-900 p-3 sm:p-4 rounded-lg shadow-lg z-50"
            style={{
              width: "fit-content",
              maxWidth: "calc(100% - 32px)",
            }}
          >
            <div className="flex flex-col gap-2">
              <span className="text-white/90 text-xs sm:text-sm mb-1 sm:mb-2 text-center">
                Compartilhar com:
              </span>
              <div className="flex gap-2 sm:gap-4">
                <button
                  onClick={() => onSharePlatform("Facebook")}
                  className="bg-blue-600 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded text-xs"
                >
                  Facebook
                </button>
                <button
                  onClick={() => onSharePlatform("Twitter")}
                  className="bg-sky-500 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded text-xs"
                >
                  Twitter
                </button>
                <button
                  onClick={() => onSharePlatform("Email")}
                  className="bg-gray-600 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded text-xs"
                >
                  Email
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Synopsis section - right side */}
      <div className="hidden sm:block ml-auto max-w-[50%]">
        <h3 className="text-sm uppercase tracking-wide mb-1 text-white/80">
          SINOPSE
        </h3>
        <div className="relative">
          <p className="text-base leading-relaxed overflow-hidden text-white/90 line-clamp-2">
            {show.description}
          </p>
          <button
            onClick={onShowFullDescription}
            className="text-emerald-500 font-medium text-sm mt-1 hover:text-emerald-400 transition-colors"
          >
            Ler mais
          </button>
        </div>
      </div>

      {/* Mobile synopsis */}
      <div className="sm:hidden w-full mt-1">
        <h3 className="text-xs uppercase tracking-wide mb-1 text-white/80">
          SINOPSE
        </h3>
        <div className="relative">
          <p className="text-sm leading-tight text-white/90 line-clamp-2">
            {show.description}
          </p>
          <button
            onClick={onShowFullDescription}
            className="text-emerald-500 font-medium text-xs mt-1 hover:text-emerald-400 transition-colors"
          >
            Ler mais
          </button>
        </div>
      </div>

      {/* Full Description Overlay */}
      <AnimatePresence>
        {showFullDescription && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={onCloseFullDescription}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="bg-black p-5 rounded-lg max-w-2xl mx-auto max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-lg font-medium mb-3 text-white/90">
                {show.title}
              </h2>
              <p className="text-base leading-relaxed text-white/90">
                {show.description}
              </p>
              <button
                onClick={onCloseFullDescription}
                className="mt-5 bg-emerald-600 text-white px-4 py-2 rounded-md text-sm hover:bg-emerald-700 transition-colors"
              >
                Fechar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
