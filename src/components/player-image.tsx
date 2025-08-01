import { useState, useEffect } from "react";
import { getCachedPlayerImage } from "@/utils/player-images";
import { Image as ImageIcon } from "lucide-react";

interface PlayerImageProps {
  src: string;
  alt: string;
  className?: string;
  playerName?: string; // Optional player name for Wikimedia search
  onLoad?: () => void; // Optional callback when image loads
  onError?: () => void; // Optional callback when image fails to load
}

export function PlayerImage({
  src,
  alt,
  className = "",
  playerName,
  onLoad,
  onError,
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

      if (playerName && playerName !== "Checklist") {
        try {
          // Try to get image from Wikimedia Commons in the background
          const wikimediaImage = await getCachedPlayerImage(playerName);
          if (
            wikimediaImage &&
            wikimediaImage !== "/placeholder.svg" &&
            wikimediaImage !== ""
          ) {
            setCurrentSrc(wikimediaImage);
            // Check if this is a Wikimedia image (not local or placeholder)
            setIsWikimediaImage(
              wikimediaImage !== src &&
                !wikimediaImage.includes("/images/players/") &&
                wikimediaImage !== "/placeholder.svg"
            );
          } else {
            // If no image found, try the original src
            console.log(
              `No image found for ${playerName}, using original src: ${src}`
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
    onError?.(); // Call the optional onError callback
  };

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.(); // Call the optional onLoad callback
  };

  if (imageError || !currentSrc) {
    return (
      <div
        className={`bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center ${className}`}
      >
        <div className="text-center p-4 w-full">
          <ImageIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <div className="text-xs text-gray-500">
            <p className="font-medium">Image Not Available</p>
            <p className="text-gray-400">Player card placeholder</p>
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
        src={currentSrc}
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
