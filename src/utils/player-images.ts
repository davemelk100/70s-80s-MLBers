// Utility functions for handling player images from Wikimedia Commons (Open License)

import { getPlayerImageFromWikimedia } from "./wikimedia-images";

// Function to generate local image URL with JPG preference
export const getLocalPlayerImageUrl = (playerName: string): string => {
  const formattedName = playerName.toLowerCase().replace(/\s+/g, "-");
  // Try JPG first, then PNG as fallback
  return `/images/players/${formattedName}.jpg`;
};

// Function to get all possible image URLs for a player
export const getPlayerImageUrls = (playerName: string): string[] => {
  const formattedName = playerName.toLowerCase().replace(/\s+/g, "-");
  return [
    `/images/players/${formattedName}.jpg`,
    `/images/players/${formattedName}.png`,
  ];
};

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

  // Try local images with JPG preference
  const imageUrls = getPlayerImageUrls(playerName);

  for (const imageUrl of imageUrls) {
    try {
      // Test if the local image exists
      const response = await fetch(imageUrl, { method: "HEAD" });
      if (response.ok) {
        return imageUrl;
      }
    } catch (error) {
      console.log(`Local image not found: ${imageUrl}`, error);
    }
  }

  // Return empty string to trigger skeleton loading
  return "";
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
