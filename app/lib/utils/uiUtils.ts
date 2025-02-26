export type ToastType = "success" | "rating" | "recording" | "sharing" | "info";

/**
 * Returns the appropriate background color for each toast type
 * @param type - Type of toast notification
 * @returns The CSS class for the background color
 */

export const getToastBgColor = (type: ToastType): string => {
  switch (type) {
    case "success":
      return "bg-emerald-600";
    case "rating":
      return "bg-yellow-500";
    case "recording":
      return "bg-red-600";
    case "sharing":
      return "bg-blue-600";
    default:
      return "bg-gray-800";
  }
};

/**
 * Scrolls a carousel element left or right
 * @param carouselRef - Reference to the carousel element
 * @param direction - Direction to scroll (left or right)
 * @param onScrollComplete - Optional callback to execute after scrolling
 */

export const scrollCarousel = (
  carouselRef: React.RefObject<HTMLDivElement | null>,
  direction: "left" | "right",
  onScrollComplete?: () => void
): void => {
  if (!carouselRef.current) return;

  const scrollAmount = 280;
  const currentScroll = carouselRef.current.scrollLeft;
  const newScroll =
    direction === "left"
      ? currentScroll - scrollAmount
      : currentScroll + scrollAmount;

  carouselRef.current.scrollTo({
    left: newScroll,
    behavior: "smooth",
  });

  if (onScrollComplete) {
    setTimeout(onScrollComplete, 300);
  }
};
