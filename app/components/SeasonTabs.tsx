import clsx from "clsx";

interface SeasonTabsProps {
  totalSeasons: number;
  currentSeason: number;
  onSeasonChange: (season: number) => void;
}

export default function SeasonTabs({
  totalSeasons,
  currentSeason,
  onSeasonChange,
}: SeasonTabsProps) {
  return (
    <div className="flex gap-6 mb-4">
      {Array.from({ length: totalSeasons }, (_, i) => i + 1).map((season) => (
        <button
          key={season}
          onClick={() => onSeasonChange(season)}
          className={clsx(
            "text-sm font-medium transition-all duration-200 px-1",
            currentSeason === season
              ? "text-white border-b-2 border-white"
              : "text-white/50 hover:text-white/80"
          )}
        >
          T{season}
        </button>
      ))}
    </div>
  );
}
