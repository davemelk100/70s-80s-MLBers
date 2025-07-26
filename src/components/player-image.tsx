import { useState, useEffect } from "react";
import { getCachedPlayerImage } from "@/utils/player-images";

interface PlayerImageProps {
  src: string;
  alt: string;
  className?: string;
  playerName?: string; // Optional player name for Wikimedia search
}

export function PlayerImage({
  src,
  alt,
  className = "",
  playerName,
}: PlayerImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isWikimediaImage, setIsWikimediaImage] = useState(false);

  useEffect(() => {
    const loadImage = async () => {
      setImageError(false);
      setIsLoading(true);

      // Start with the original src immediately
      setCurrentSrc(src);
      setIsWikimediaImage(false);

      if (playerName) {
        try {
          // Try to get image from Wikimedia Commons in the background
          const wikimediaImage = await getCachedPlayerImage(playerName);
          if (wikimediaImage && wikimediaImage !== "/placeholder.svg") {
            setCurrentSrc(wikimediaImage);
            // Check if this is a Wikimedia image (not local or placeholder)
            setIsWikimediaImage(
              wikimediaImage !== src &&
                !wikimediaImage.includes("/images/players/") &&
                wikimediaImage !== "/placeholder.svg"
            );
          }
        } catch (error) {
          console.log("Failed to load Wikimedia image:", error);
          // Keep the original src if Wikimedia fails
        }
      }
    };

    loadImage();
  }, [src, playerName]);

  const handleError = async () => {
    console.log(`Failed to load image: ${currentSrc}`);

    // If we have a player name and the current image failed, try the original src
    if (playerName && currentSrc !== src) {
      setCurrentSrc(src);
      return; // Don't set error yet, try the original source
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

      {/* Wikimedia Commons attribution */}
      {isWikimediaImage && !isLoading && !imageError && (
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          Wikimedia Commons
        </div>
      )}
    </div>
  );
}
