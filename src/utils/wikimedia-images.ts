// Utility for fetching baseball player images from Wikimedia Commons

export const searchWikimediaImages = async (
  playerName: string
): Promise<string | null> => {
  try {
    // Search for the player on Wikimedia Commons with multiple search terms
    const searchTerms = [
      `${playerName} baseball`,
      `${playerName} MLB`,
      `${playerName} player`,
      playerName,
    ];

    for (const searchTerm of searchTerms) {
      const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
        searchTerm
      )}&format=json&origin=*&srlimit=10`;

      const response = await fetch(searchUrl);
      const data = await response.json();

      if (data.query?.search?.length > 0) {
        // Look for the best result (prefer baseball-related images)
        const results = data.query.search;
        let bestResult = results[0];

        // Try to find a result that mentions baseball or has image in the title
        for (const result of results) {
          if (
            result.snippet.toLowerCase().includes("baseball") ||
            result.title.toLowerCase().includes("baseball") ||
            result.title.toLowerCase().includes(".jpg") ||
            result.title.toLowerCase().includes(".png")
          ) {
            bestResult = result;
            break;
          }
        }

        // Get image info for the best result
        const imageInfoUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(
          bestResult.title
        )}&prop=imageinfo&iiprop=url|size|dimensions&format=json&origin=*`;

        const imageResponse = await fetch(imageInfoUrl);
        const imageData = await imageResponse.json();

        const pages = imageData.query?.pages;
        const pageId = Object.keys(pages)[0];
        const pageInfo = pages[pageId];

        if (pageInfo.imageinfo?.[0]?.url) {
          return pageInfo.imageinfo[0].url;
        }
      }
    }
  } catch (error) {
    console.error("Error searching Wikimedia:", error);
  }

  return null;
};

export const getPlayerImageFromWikimedia = async (
  playerName: string
): Promise<string> => {
  const imageUrl = await searchWikimediaImages(playerName);
  return imageUrl || "/placeholder.svg";
};

// Example usage:
// const imageUrl = await getPlayerImageFromWikimedia("Reggie Jackson");
