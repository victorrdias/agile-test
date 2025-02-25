"use client";

export const EpisodeSkeleton = () => {
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
};
