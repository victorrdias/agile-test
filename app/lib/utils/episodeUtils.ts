interface EpisodeResponse {
  Duration: number;
  EpisodeNumber: number;
  ID: string;
  Image: string;
  SeasonNumber: number;
  Synopsis?: string;
  Title: string;
}

/**
 * Calculates the number of seasons from episode data
 * @param episodes - Array of episodes from the API
 * @returns The highest season number found
 */

export const getNumberOfSeasons = (
  episodes: (EpisodeResponse | null)[]
): number => {
  const validEpisodes = episodes.filter(
    (episode): episode is EpisodeResponse => episode !== null
  );

  if (validEpisodes.length === 0) {
    return 0;
  }

  const seasonNumbers = validEpisodes.map((episode) => episode.SeasonNumber);
  return Math.max(...seasonNumbers);
};

/**
 * Generates a simulated progress value for each episode
 * @param seasonNumber - The season number
 * @param episodeNumber - The episode number
 * @returns A progress value between 0 and 1
 */

export const generateProgressValue = (
  seasonNumber: number,
  episodeNumber: number
): number => {
  return Math.min(episodeNumber / 10 + 0.1, 1);
};
