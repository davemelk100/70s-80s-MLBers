import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { MapPin, Trophy, Calendar, Heart } from "lucide-react";
import { PlayerImage } from "./player-image";
import { Player } from "@/App";

interface LazyPlayerCardProps {
  player: Player;
  isSaved?: boolean;
  onToggleSave?: (playerId: number) => void;
}

export function LazyPlayerCard({ player, isSaved = false, onToggleSave }: LazyPlayerCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set visible immediately for now to debug
    setIsVisible(true);

    // Uncomment this for proper lazy loading once we confirm cards show up
    /*
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "100px",
        threshold: 0.1,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
    */
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleImageError = () => {
    // Make card visible even if image fails to load
    setIsLoaded(true);
  };

  if (!isVisible) {
    return (
      <div
        ref={cardRef}
        className="h-96 bg-gray-100 rounded-lg animate-pulse"
        style={{ minHeight: "400px" }}
      />
    );
  }

  return (
    <div ref={cardRef}>
      <Card
        className={`overflow-hidden hover:shadow-lg transition-all duration-300 rounded-none ${isLoaded ? "opacity-100" : "opacity-0"
          }`}
      >
        <div className="aspect-[3/4] relative bg-gray-100">
          <PlayerImage
            src={player.image_url}
            alt={`${player.name} baseball card`}
            className=""
            playerName={player.name}
            onLoad={handleLoad}
            onError={handleImageError}
          />

          {/* Save button */}
          {onToggleSave && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(player.id);
              }}
              className="absolute top-2 right-2 p-2 rounded-full bg-white/90 hover:bg-white shadow-md transition-all duration-200 hover:scale-110 z-10"
              aria-label={isSaved ? "Unsave player" : "Save player"}
            >
              <Heart
                className={`h-5 w-5 transition-colors ${isSaved ? "fill-red-500 text-red-500" : "text-gray-600"
                  }`}
              />
            </button>
          )}
        </div>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold text-gray-900 leading-tight">
            {player.id > 0 && (
              <span className="text-sm text-gray-500 mr-2">#{player.id}</span>
            )}
            {player.name}
          </CardTitle>
          <CardDescription className="text-sm text-gray-600">
            {player.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span className="font-medium">{player.team}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Trophy className="h-4 w-4 text-gray-400" />
              <span>{player.position}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span>{player.years_active}</span>
            </div>

            {/* Key Stats */}
            <div className="pt-2 border-t">
              <div className="grid grid-cols-2 gap-2 text-xs">
                {Object.entries(player.stats)
                  .slice(0, 4)
                  .map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-500 capitalize">
                        {key.replace(/_/g, " ")}:
                      </span>
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
