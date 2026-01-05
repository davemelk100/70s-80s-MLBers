import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PlayerImage } from "./player-image";
import { Player } from "@/App";
import { Heart } from "lucide-react";

interface PlayerThumbnailProps {
  player: Player;
  isSaved?: boolean;
  onToggleSave?: (playerId: number) => void;
}

export function PlayerThumbnail({ player, isSaved = false, onToggleSave }: PlayerThumbnailProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleImageError = () => {
    setIsLoaded(true);
  };

  return (
    <div className="relative">
      <Card
        className={`overflow-hidden hover:shadow-md transition-all duration-300 rounded-none ${isLoaded ? "opacity-100" : "opacity-0"
          }`}
      >
        <CardContent className="p-2">
          <div className="flex flex-col items-center text-center">
            {/* Player Image */}
            <div className="w-16 h-20 relative bg-gray-100 overflow-hidden mb-2">
              <PlayerImage
                src={player.image_url}
                alt={`${player.name} baseball card`}
                className=""
                playerName={player.name}
                onLoad={handleLoad}
                onError={handleImageError}
              />
            </div>

            {/* Player Name */}
            <h3 className="text-xs font-semibold text-gray-900 leading-tight mb-1 line-clamp-2">
              {player.id > 0 && (
                <span className="text-xs text-gray-500 mr-1">#{player.id}</span>
              )}
              {player.name}
            </h3>

            {/* Team */}
            <p className="text-xs text-gray-600 mb-1 truncate w-full">
              {player.team}
            </p>

            {/* Position */}
            <p className="text-xs text-gray-500">{player.position}</p>
          </div>
        </CardContent>
      </Card>

      {/* Save button - positioned outside card for better visibility */}
      {onToggleSave && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(player.id);
          }}
          className="absolute top-1 right-1 p-1 rounded-full bg-white/90 hover:bg-white shadow-sm transition-all duration-200 hover:scale-110 z-10"
          aria-label={isSaved ? "Unsave player" : "Save player"}
        >
          <Heart
            className={`h-3 w-3 transition-colors ${isSaved ? "fill-red-500 text-red-500" : "text-gray-600"
              }`}
          />
        </button>
      )}
    </div>
  );
}
