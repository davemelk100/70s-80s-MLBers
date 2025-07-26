import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Calendar, MapPin, Trophy } from "lucide-react";
import Image from "next/image";

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
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-[3/4] relative bg-gray-100">
        <Image
          src={player.image_url || "/placeholder.svg"}
          alt={`${player.name} baseball card`}
          fill
          className="object-cover"
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
