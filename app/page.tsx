"use client";

import { useState } from "react";
import { useShow } from "./hooks/useShow";
import { useSeasonEpisodes } from "./hooks/useEpisodes";
import { Episode, Show } from "./types";
import LoadingSpinner from "./components/LoadingSpinner";
import EpisodeList from "./components/EpisodeList";
import ShowInfo from "./components/ShowInfo";

// Types for the tabs and seasons
type TabType = "general" | "elenco" | "premios";
type SeasonNumber = 1 | 2 | 3;

// Component for the show title and metadata
const ShowTitleSection = ({ show }: { show: Show }) => (
  <div className="absolute top-0 left-0 ml-10 p-10 z-10">
    <h1 className="text-5xl font-bold text-white">{show.title}</h1>
    <p className="text-white/80 text-sm mt-1">
      {show.genre.toUpperCase()} / {show.releaseYear} / {show.rating}
    </p>
  </div>
);

// Component for season tabs
const SeasonTabs = ({
  selectedSeason,
  onSeasonChange,
}: {
  selectedSeason: SeasonNumber;
  onSeasonChange: (season: SeasonNumber) => void;
}) => (
  <div className="flex space-x-2 font-bold px-14">
    {[1, 2, 3].map((season) => (
      <button
        key={season}
        className={`${
          selectedSeason === season
            ? "text-white border-b-2 border-emerald-500"
            : "text-white/60"
        } px-3 text-base`}
        onClick={() => onSeasonChange(season as SeasonNumber)}
      >
        T{season}
      </button>
    ))}
  </div>
);

// Component for the close button
const CloseButton = () => (
  <button className="text-white/80 hover:text-white">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8"
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
  // State management
  const [selectedSeason, setSelectedSeason] = useState<SeasonNumber>(1);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("general");

  // Data fetching with React Query hooks
  const { data: show, isLoading: isLoadingShow } = useShow();
  const { data: episodes, isLoading: isLoadingEpisodes } =
    useSeasonEpisodes(selectedSeason);

  // Handle season change
  const handleSeasonChange = (season: SeasonNumber) => {
    setSelectedSeason(season);
    setSelectedEpisode(null); // Reset selected episode when changing seasons
  };

  // Loading state
  if (isLoadingShow) {
    return <LoadingSpinner />;
  }

  // Error state
  if (!show) {
    return (
      <div className="h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">No Show Data Available</h1>
        </div>
      </div>
    );
  }

  return (
    <main className="h-screen bg-black text-white overflow-hidden">
      {/* Content */}
      <div className="relative flex w-full h-full">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${show.backgroundImage})` }}
          >
            {/* Dark overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/30 to-black/70" />

            {/* Additional right side dark gradient for text readability */}
            <div className="absolute right-0 top-0 bottom-0 w-[600px] bg-gradient-to-l from-black/80 via-black/40 to-transparent pointer-events-none" />
          </div>

          {/* Show Title and Metadata */}
          <ShowTitleSection show={show} />

          {/* Gradient transition to black footer */}
          <div className="absolute bottom-[225px] left-0 right-0 h-[100px] bg-gradient-to-b from-transparent to-black" />

          {/* Show info section at bottom */}
          <div className="absolute bottom-0 left-0 right-0 bg-black h-[225px] z-30">
            <ShowInfo
              show={show}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>
        </div>

        {/* Episode list sidebar */}
        <div className="absolute right-0 top-0 bottom-0 w-[600px] flex flex-col pointer-events-auto z-20">
          {/* Close button at top right */}
          <div className="absolute top-6 right-6 z-40">
            <CloseButton />
          </div>

          {/* Content directly on the background */}
          <div className="h-full flex flex-col">
            {/* Header with season tabs */}
            <div className="flex justify-between items-center px-4 py-4 mt-14">
              {/* Season tabs */}
              <SeasonTabs
                selectedSeason={selectedSeason}
                onSeasonChange={handleSeasonChange}
              />
            </div>

            {/* Episodes list with padding to prevent overlap with footer */}
            <div className="flex-1 overflow-y-auto px-20 pb-[250px]">
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
