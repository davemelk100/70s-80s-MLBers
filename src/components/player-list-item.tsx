import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Trophy, Calendar, Heart } from "lucide-react";
import { PlayerImage } from "./player-image";
import { Player } from "@/App";

interface PlayerListItemProps {
  player: Player;
  isSaved?: boolean;
  onToggleSave?: (playerId: number) => void;
}

export function PlayerListItem({ player, isSaved = false, onToggleSave }: PlayerListItemProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleImageError = () => {
    setIsLoaded(true);
  };

  if (!isVisible) {
    return (
      <div
        ref={cardRef}
        className="h-20 bg-gray-100 rounded-lg animate-pulse"
      />
    );
  }

  return (
    <div ref={cardRef}>
      <Card
        className={`hover:shadow-md transition-all duration-300 ${isLoaded ? "opacity-100" : "opacity-0"
          }`}
      >
        <CardContent className="p-3">
          <div className="flex items-center gap-3 relative">
            {/* Player Image */}
            <div className="w-12 h-12 relative bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              <PlayerImage
                src={player.image_url}
                alt={`${player.name} baseball card`}
                className="rounded-lg"
                playerName={player.name}
                onLoad={handleLoad}
                onError={handleImageError}
              />
            </div>

            {/* Player Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-gray-900 truncate">
                    {player.id > 0 && (
                      <span className="text-sm text-gray-500 mr-2">
                        #{player.id}
                      </span>
                    )}
                    {player.name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-1">
                    {player.description}
                  </p>
                </div>
              </div>

              {/* Player Details */}
              <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{player.team}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Trophy className="h-3 w-3" />
                  <span>{player.position}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{player.years_active}</span>
                </div>
              </div>

              {/* Key Stats */}
              <div className="flex gap-3 mt-1">
                {Object.entries(player.stats)
                  .slice(0, 3)
                  .map(([key, value]) => (
                    <div key={key} className="text-xs">
                      <span className="text-gray-500 capitalize">
                        {key.replace(/_/g, " ")}:
                      </span>{" "}
                      <span className="font-medium">
                        {typeof value === "number" &&
                          value < 10 &&
                          key !== "era" &&
                          key !== "batting_average"
                          ? value.toFixed(1)
                          : typeof value === "number" &&
                            (key === "era" || key === "batting_average")
                            ? value.toFixed(3)
                            : String(value)}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Save button */}
            {onToggleSave && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleSave(player.id);
                }}
                className="ml-3 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200 hover:scale-110 flex-shrink-0"
                aria-label={isSaved ? "Unsave player" : "Save player"}
              >
                <Heart
                  className={`h-5 w-5 transition-colors ${isSaved ? "fill-red-500 text-red-500" : "text-gray-600"
                    }`}
                />
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
