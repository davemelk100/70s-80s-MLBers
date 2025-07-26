import { useState, useEffect, useRef, useCallback } from "react";
import { LazyPlayerCard } from "./lazy-player-card";
import { Player } from "@/App";

interface VirtualizedPlayerGridProps {
  players: Player[];
}

export function VirtualizedPlayerGrid({ players }: VirtualizedPlayerGridProps) {
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 12 });
  const [containerHeight, setContainerHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemHeight = 500; // Approximate height of each card
  const itemsPerRow = 4; // Number of cards per row
  const rowsPerView = 3; // Number of rows visible at once

  const updateVisibleRange = useCallback(() => {
    if (!containerRef.current) return;

    const scrollTop = containerRef.current.scrollTop;
    const containerHeight = containerRef.current.clientHeight;

    const startRow = Math.floor(scrollTop / itemHeight);
    const endRow = Math.ceil((scrollTop + containerHeight) / itemHeight);

    const start = Math.max(0, startRow * itemsPerRow);
    const end = Math.min(players.length, (endRow + rowsPerView) * itemsPerRow);

    setVisibleRange({ start, end });
  }, [players.length]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      requestAnimationFrame(updateVisibleRange);
    };

    const handleResize = () => {
      setContainerHeight(container.clientHeight);
      updateVisibleRange();
    };

    container.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    setContainerHeight(container.clientHeight);
    updateVisibleRange();

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [updateVisibleRange]);

  const totalHeight = Math.ceil(players.length / itemsPerRow) * itemHeight;
  const visiblePlayers = players.slice(visibleRange.start, visibleRange.end);

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-auto"
      style={{ height: "calc(100vh - 300px)" }}
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: (visibleRange.start / itemsPerRow) * itemHeight,
            left: 0,
            right: 0,
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {visiblePlayers.map((player, index) => (
              <LazyPlayerCard key={player.id} player={player} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
