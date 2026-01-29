import { useEffect, useRef, useState } from "react";

interface UseTrendingCarouselProps<T> {
  items: T[];
  interval?: number;
  pause?: boolean;
  resetKey?: string | number;
}

export function useTrendingCarousel<T>({
  items,
  interval = 5000,
  pause = false,
  resetKey,
}: UseTrendingCarouselProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);

  // Reset when data or currency changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [resetKey, items.length]);

  useEffect(() => {
    if (items.length === 0 || pause) return;

    intervalRef.current = window.setInterval(() => {
      setCurrentIndex((prev) =>
        prev === items.length - 1 ? 0 : prev + 1
      );
    }, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [items.length, interval, pause]);

  return {
    currentItem: items[currentIndex],
    currentIndex,
  };
}
