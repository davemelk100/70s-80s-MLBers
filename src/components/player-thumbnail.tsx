import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PlayerImage } from "./player-image";
import { Player } from "@/App";

interface PlayerThumbnailProps {
  player: Player;
}

export function PlayerThumbnail({ player }: PlayerThumbnailProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleImageError = () => {
    setIsLoaded(true);
  };

  return (
    <div>
      <Card
        className={`overflow-hidden hover:shadow-md transition-all duration-300 rounded-none ${
          isLoaded ? "opacity-100" : "opacity-0"
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
    </div>
  );
}
