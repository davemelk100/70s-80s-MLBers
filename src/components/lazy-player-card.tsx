import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { MapPin, Trophy, Calendar } from "lucide-react";
import { PlayerImage } from "./player-image";
import { Player } from "@/App";

interface LazyPlayerCardProps {
  player: Player;
}

export function LazyPlayerCard({ player }: LazyPlayerCardProps) {
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
        className={`overflow-hidden hover:shadow-lg transition-all duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="aspect-[3/4] relative bg-gray-100">
          <PlayerImage
            src={player.image_url}
            alt={`${player.name} baseball card`}
            className="rounded-t-lg"
            playerName={player.name}
            onLoad={handleLoad}
            onError={handleImageError}
          />
        </div>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold text-gray-900 leading-tight">
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
                          : value}
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
