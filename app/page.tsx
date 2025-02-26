"use client";

import { useState } from "react";
import { useShow } from "./hooks/useShow";
import { useSeasonEpisodes } from "./hooks/useEpisodes";
import { Episode } from "./types";
import LoadingSpinner from "./components/LoadingSpinner";
import EpisodeList from "./components/EpisodeList/index";
import SeasonTabs from "./components/SeasonTabs";
import { ShowInfo } from "./components/ShowInfo/index";

const CloseButton = () => (
  <button className="text-white/80 hover:text-white">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  </button>
);

export default function Home() {
  const [selectedSeason, setSelectedSeason] = useState<number>(1);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);

  const { data: show, isLoading: isLoadingShow } = useShow();
  const { data: episodes, isLoading: isLoadingEpisodes } =
    useSeasonEpisodes(selectedSeason);

  const handleSeasonChange = (season: number) => {
    setSelectedSeason(season);
    setSelectedEpisode(null);
  };

  if (isLoadingShow) {
    return <LoadingSpinner />;
  }

  if (!show) {
    return (
      <div className="h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            Dados do Programa Indisponíveis
          </h1>
        </div>
      </div>
    );
  }

  return (
    <main className="h-screen bg-black text-white overflow-hidden">
      <div className="relative flex w-full h-full">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${show.backgroundImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/30 to-black/70" />

            <div className="absolute right-0 top-0 bottom-0 w-full sm:w-[50%] md:w-[600px] bg-gradient-to-l from-black/80 via-black/40 to-transparent pointer-events-none" />
          </div>

          <div className="absolute top-0 left-0 ml-3 sm:ml-6 md:ml-10 p-4 sm:p-6 md:p-10 z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              {show.title}
            </h1>
            <p className="text-white/80 text-xs sm:text-sm mt-1">
              {show.genre.toUpperCase()} / {show.releaseYear} / {show.rating} /{" "}
              {show.duration}
            </p>
          </div>

          <div className="absolute bottom-[150px] sm:bottom-[180px] md:bottom-[225px] left-0 right-0 h-[80px] sm:h-[100px] bg-gradient-to-b from-transparent to-black" />

          <div className="absolute bottom-0 left-0 pb-4 base:pb-0 md:pb-0 lg:pb-0 right-0 bg-black h-[250px] z-30">
            <ShowInfo show={show} />
          </div>
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-full sm:w-[80%] md:w-[600px] flex flex-col pointer-events-auto z-20 transform transition-transform duration-300 ease-in-out">
          <div className="absolute top-3 sm:top-4 md:top-6 right-3 sm:right-4 md:right-6 z-40">
            <CloseButton />
          </div>

          <div className="h-full flex flex-col">
            <div className="flex justify-between items-center px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 mt-10 sm:mt-12 md:mt-14">
              <div className="px-4 sm:px-8 md:px-14 mt-20  lg:mt-0">
                <SeasonTabs
                  totalSeasons={show.seasons}
                  currentSeason={selectedSeason}
                  onSeasonChange={handleSeasonChange}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 sm:px-10 md:px-20 pb-[200px] sm:pb-[220px] md:pb-[250px]">
              <EpisodeList
                episodes={episodes || []}
                onEpisodeClick={setSelectedEpisode}
                isLoading={isLoadingEpisodes}
                selectedEpisode={selectedEpisode}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
