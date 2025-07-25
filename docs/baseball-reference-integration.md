# Baseball Reference Integration Guide

## Legal Considerations

**⚠️ IMPORTANT**: Before implementing Baseball Reference integration, you must:

1. **Review Terms of Service**: Baseball Reference has specific terms regarding data usage
2. **Contact for Permission**: Reach out to Baseball Reference for commercial use
3. **Respect Rate Limits**: Implement proper delays between requests
4. **Attribution**: Credit Baseball Reference appropriately
5. **Copyright**: Ensure you have rights to use their images

## Implementation Approaches

### Option 1: Official API (Recommended)

Baseball Reference offers an official API for subscribers:
- Contact them at: https://www.baseball-reference.com/contact/
- Request API access for your use case
- Follow their documentation and rate limits

### Option 2: Web Scraping (Use with Caution)

If you must scrape their website:

```javascript
// Example implementation (NOT RECOMMENDED without permission)
async function searchBaseballReference(playerName) {
  const searchUrl = `https://www.baseball-reference.com/search/search.fcgi?search=${encodeURIComponent(playerName)}`;
  
  // Add proper headers and respect robots.txt
  const response = await fetch(searchUrl, {
    headers: {
      'User-Agent': 'Your App Name - Contact: your@email.com',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    }
  });
  
  // Parse HTML and extract image URLs
  // Implement proper error handling and rate limiting
}
```

### Option 3: Alternative Sources

Consider these legal alternatives:

1. **Wikimedia Commons**: Public domain images
2. **Creative Commons**: Licensed images
3. **Public Domain**: Historical photos
4. **Your Own Collection**: Self-hosted images

## Recommended Implementation

```javascript
// src/utils/baseball-reference.ts
export class BaseballReferenceAPI {
  private apiKey: string;
  private baseUrl: string;
  private rateLimitDelay: number = 1000; // 1 second between requests

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.baseball-reference.com'; // Example
  }

  async searchPlayer(playerName: string) {
    // Implement with proper authentication and rate limiting
    await this.delay(this.rateLimitDelay);
    
    // Make authenticated API request
    // Return player data and image URLs
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

## Best Practices

1. **Rate Limiting**: Always implement delays between requests
2. **Error Handling**: Gracefully handle failed requests
3. **Caching**: Cache results to reduce API calls
4. **Fallbacks**: Always have fallback image sources
5. **Monitoring**: Track API usage and errors
6. **Documentation**: Keep records of your integration

## Alternative Image Sources

### Wikimedia Commons
```javascript
import { getPlayerImageFromWikimedia } from '@/utils/wikimedia-images';

const imageUrl = await getPlayerImageFromWikimedia("Reggie Jackson");
```

### Local Images
```javascript
// Store images locally in public/images/players/
const localImageUrl = `/images/players/${playerName.toLowerCase().replace(/\s+/g, '-')}.png`;
```

### Placeholder System
```javascript
// Generate baseball-themed placeholders
const placeholderUrl = `/api/placeholder?name=${encodeURIComponent(playerName)}`;
```

## Next Steps

1. **Contact Baseball Reference** for official API access
2. **Implement Wikimedia Commons** as a fallback
3. **Create local image collection** for common players
4. **Set up proper error handling** and fallback system
5. **Monitor usage** and respect rate limits

## Resources

- [Baseball Reference Contact](https://www.baseball-reference.com/contact/)
- [Wikimedia Commons API](https://commons.wikimedia.org/w/api.php)
- [Creative Commons Search](https://search.creativecommons.org/)
- [Public Domain Baseball Images](https://www.loc.gov/pictures/search/?q=baseball&st=gallery) 