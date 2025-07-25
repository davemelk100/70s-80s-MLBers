import { useState, useEffect } from "react";
import { getPlayerImageWithFallback } from "@/utils/player-images";

interface PlayerImageProps {
  src: string;
  alt: string;
  className?: string;
  playerName?: string; // Optional player name for fallback search
}

export function PlayerImage({ src, alt, className = "", playerName }: PlayerImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
    setImageError(false);
    setIsLoading(true);
  }, [src]);

  const handleError = async () => {
    console.log(`Failed to load image: ${currentSrc}`);
    
    // If we have a player name, try to find an alternative image
    if (playerName && currentSrc === src) {
      try {
        const fallbackSrc = await getPlayerImageWithFallback(playerName);
        if (fallbackSrc !== src) {
          setCurrentSrc(fallbackSrc);
          return; // Don't set error yet, try the fallback
        }
      } catch (error) {
        console.log('Fallback image search failed:', error);
      }
    }
    
    setImageError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  if (imageError) {
    return (
      <div
        className={`bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center ${className}`}
      >
        <div className="text-center p-4">
          <div className="text-4xl mb-2">⚾</div>
          <div className="text-sm text-gray-600 font-medium">
            Baseball Legend
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {alt.split(" ")[0]} {alt.split(" ")[1]}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div
          className={`absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse ${className}`}
        />
      )}
      <img
        src={currentSrc || "/placeholder.svg"}
        alt={alt}
        className={`w-full h-full ${className} ${
          isLoading ? "opacity-0" : "opacity-100"
        } transition-opacity duration-500 object-cover`}
        onError={handleError}
        onLoad={handleLoad}
      />
    </div>
  );
}
