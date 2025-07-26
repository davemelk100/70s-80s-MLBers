// Utility functions for handling player images from Wikimedia Commons (Open License)

import { getPlayerImageFromWikimedia } from "./wikimedia-images";

export const getPlayerImageUrl = async (
  playerName: string
): Promise<string> => {
  try {
    // First try to get image from Wikimedia Commons
    const wikimediaImage = await getPlayerImageFromWikimedia(playerName);
    if (wikimediaImage && wikimediaImage !== "/placeholder.svg") {
      return wikimediaImage;
    }
  } catch (error) {
    console.log(`Wikimedia search failed for ${playerName}:`, error);
  }

  // Fallback to local images if Wikimedia doesn't have it
  const localImageUrl = `/images/players/${playerName
    .toLowerCase()
    .replace(/\s+/g, "-")}.png`;

  try {
    // Test if the local image exists
    const response = await fetch(localImageUrl, { method: "HEAD" });
    if (response.ok) {
      return localImageUrl;
    }
  } catch (error) {
    console.log(`Local image not found for ${playerName}:`, error);
  }

  // Final fallback
  return "/placeholder.svg";
};

export const getPlayerImageWithFallback = async (
  playerName: string
): Promise<string> => {
  return await getPlayerImageUrl(playerName);
};

// Cache for Wikimedia images to avoid repeated API calls
const imageCache = new Map<string, string>();

export const getCachedPlayerImage = async (
  playerName: string
): Promise<string> => {
  if (imageCache.has(playerName)) {
    return imageCache.get(playerName)!;
  }

  const imageUrl = await getPlayerImageUrl(playerName);
  imageCache.set(playerName, imageUrl);
  return imageUrl;
};
