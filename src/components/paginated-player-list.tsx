import { useState, useEffect } from "react";
import { PlayerListItem } from "./player-list-item";
import { Pagination } from "./pagination";
import { Player } from "@/App";

interface PaginatedPlayerListProps {
  players: Player[];
  itemsPerPage?: number;
}

export function PaginatedPlayerList({
  players,
  itemsPerPage = 10,
}: PaginatedPlayerListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(itemsPerPage);
  const totalPages = Math.ceil(players.length / pageSize);

  // Reset to page 1 when players change (e.g., when filters are applied)
  useEffect(() => {
    setCurrentPage(1);
  }, [players.length]);

  // Reset to page 1 when page size changes
  useEffect(() => {
    setCurrentPage(1);
  }, [pageSize]);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPlayers = players.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    // Scroll to top when page size changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-6">
      {/* Player List */}
      <div className="space-y-3">
        {currentPlayers.map((player) => (
          <PlayerListItem key={player.id} player={player} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="bg-white rounded-lg shadow-sm border">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          itemsPerPage={pageSize}
          totalItems={players.length}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>
    </div>
  );
}
