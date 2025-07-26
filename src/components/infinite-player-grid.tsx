import { useState, useEffect, useRef, useCallback } from "react";
import { LazyPlayerCard } from "./lazy-player-card";
import { Player } from "@/App";

interface InfinitePlayerGridProps {
  players: Player[];
  getDecadeBadgeColor: (decade: string) => string;
}

export function InfinitePlayerGrid({ players, getDecadeBadgeColor }: InfinitePlayerGridProps) {
  const [visibleCount, setVisibleCount] = useState(20); // Start with 20 cards
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    if (isLoading) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + 20, players.length));
      setIsLoading(false);
    }, 300);
  }, [isLoading, players.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < players.length) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => observer.disconnect();
  }, [loadMore, visibleCount, players.length]);

  const visiblePlayers = players.slice(0, visibleCount);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {visiblePlayers.map((player) => (
          <LazyPlayerCard
            key={player.id}
            player={player}
            getDecadeBadgeColor={getDecadeBadgeColor}
          />
        ))}
      </div>
      
      {visibleCount < players.length && (
        <div
          ref={loadingRef}
          className="flex justify-center items-center py-8"
        >
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="text-gray-600">Loading more cards...</span>
          </div>
        </div>
      )}
      
      {visibleCount >= players.length && players.length > 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>All {players.length} cards loaded</p>
        </div>
      )}
    </div>
  );
} 