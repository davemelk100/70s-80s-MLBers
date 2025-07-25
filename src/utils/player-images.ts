// Utility functions for handling player images from various sources

interface ImageSource {
  name: string;
  url: string;
  fallback?: string;
}

export const getPlayerImageUrl = (playerName: string): string => {
  // Try multiple sources in order of preference
  const sources: ImageSource[] = [
    {
      name: "Local Images",
      url: `/images/players/${playerName
        .toLowerCase()
        .replace(/\s+/g, "-")}.png`,
    },
    {
      name: "Wikimedia Commons",
      url: `https://commons.wikimedia.org/wiki/Special:Filepath/${encodeURIComponent(
        playerName
      )}`,
    },
    {
      name: "Fallback",
      url: "/placeholder.svg",
    },
  ];

  // For now, return the local path - you can expand this later
  return sources[0].url;
};

export const getPlayerImageWithFallback = async (
  playerName: string
): Promise<string> => {
  const imageUrl = getPlayerImageUrl(playerName);

  try {
    // Test if the image exists
    const response = await fetch(imageUrl, { method: "HEAD" });
    if (response.ok) {
      return imageUrl;
    }
  } catch (error) {
    console.log(`Image not found for ${playerName}:`, error);
  }

  // Return fallback image
  return "/placeholder.svg";
};

// Note: Baseball Reference integration would require:
// 1. Proper API access or permission
// 2. Handling of their terms of service
// 3. Rate limiting and error handling
// 4. Caching to avoid repeated requests

export const getBaseballReferenceImage = (): string => {
  // This is a placeholder - actual implementation would require:
  // - API key or proper authentication
  // - Respect for rate limits
  // - Compliance with terms of service

  console.warn(
    "Baseball Reference integration not implemented - requires proper API access"
  );
  return "/placeholder.svg";
};
