// Utility for fetching baseball player images from Wikimedia Commons

// These interfaces are used internally but not exported
type WikimediaSearchResult = {
  title: string;
  pageid: number;
  snippet: string;
  url: string;
};

type WikimediaImageInfo = {
  title: string;
  imageinfo: Array<{
    url: string;
    descriptionurl: string;
    size: number;
    width: number;
    height: number;
  }>;
};

export const searchWikimediaImages = async (
  playerName: string
): Promise<string | null> => {
  try {
    // Search for the player on Wikimedia Commons
    const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
      playerName + " baseball"
    )}&format=json&origin=*`;

    const response = await fetch(searchUrl);
    const data = await response.json();

    if (data.query?.search?.length > 0) {
      // Get the first result
      const firstResult = data.query.search[0];

      // Get image info for the first result
      const imageInfoUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(
        firstResult.title
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
