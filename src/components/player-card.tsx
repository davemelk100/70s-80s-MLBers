import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Calendar, MapPin, Trophy, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Player {
  id: number;
  name: string;
  team: string;
  position: string;
  years_active: string;
  decade: string;
  image_url: string;
  description: string;
  stats: Record<string, any>;
}

interface PlayerCardProps {
  player: Player;
}

export function PlayerCard({ player }: PlayerCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 rounded-none">
      <div className="aspect-[3/4] relative bg-gray-100">
        {imageError ? (
          // Placeholder for missing image
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 p-4">
            <ImageIcon className="h-12 w-12 text-gray-400 mb-2" />
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600 mb-1">
                {player.name}
              </p>
              <p className="text-xs text-gray-500">
                {player.team} • {player.position}
              </p>
            </div>
          </div>
        ) : (
          <Image
            src={player.image_url || "/placeholder.svg"}
            alt={`${player.name} baseball card`}
            fill
            className={`object-cover transition-opacity duration-300 ${
              imageLoading ? "opacity-0" : "opacity-100"
            }`}
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        )}

        {/* Loading overlay */}
        {imageLoading && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse flex items-center justify-center">
            <div className="text-center">
              <div className="h-4 bg-gray-300 rounded mb-2 w-16 mx-auto"></div>
              <div className="h-3 bg-gray-300 rounded w-12 mx-auto"></div>
            </div>
          </div>
        )}
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
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Key Stats
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {Object.entries(player.stats)
                .slice(0, 4)
                .map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-500 capitalize">
                      {key.replace(/_/g, " ")}:
                    </span>
                    <span className="font-medium">
                      {typeof value === "number" && value < 1 && value > 0
                        ? value.toFixed(3)
                        : value.toLocaleString()}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
