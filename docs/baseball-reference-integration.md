# Legal Image Sources for Baseball Players

## Important Note: Baseball Reference Limitations

**⚠️ CRITICAL**: Baseball Reference does **NOT** provide a public API, and scraping their website violates their terms of service. This document focuses on legal, accessible alternatives.

## Legal Image Sources

### 1. Wikimedia Commons (Recommended)

- **Status**: ✅ Legal and accessible
- **License**: Public domain and Creative Commons
- **API**: Available and well-documented
- **Implementation**: Already integrated in this project

```javascript
import { getPlayerImageFromWikimedia } from "@/utils/wikimedia-images";

const imageUrl = await getPlayerImageFromWikimedia("Reggie Jackson");
```

### 2. Creative Commons Search

- **Status**: ✅ Legal with proper attribution
- **License**: Various Creative Commons licenses
- **Sources**: Flickr, Google Images, etc.
- **Requirement**: Check and respect individual licenses

### 3. Public Domain Sources

- **Status**: ✅ Legal and free to use
- **Sources**:
  - Library of Congress
  - National Archives
  - Historical baseball photos
- **Note**: Many vintage baseball photos are public domain

### 4. Your Own Image Collection

- **Status**: ✅ Legal (if you own the rights)
- **Approach**: Purchase or create your own images
- **Storage**: Host locally in `public/images/players/`

## Implementation in This Project

### Current Setup

The project includes:

1. **Wikimedia Commons Integration** (`src/utils/wikimedia-images.ts`)

   - Automatic search for player images
   - Public domain and CC-licensed images
   - API-based fetching

2. **Fallback System** (`src/utils/player-images.ts`)

   - Multiple source support
   - Graceful degradation
   - Placeholder images

3. **Download Script** (`scripts/download-player-images.js`)
   - Batch downloading from Wikimedia
   - Rate limiting and error handling
   - Legal compliance

### Usage Example

```javascript
// The PlayerImage component automatically tries:
// 1. Local images first
// 2. Wikimedia Commons if local fails
// 3. Placeholder if all else fails

<PlayerImage
  src={player.image_url}
  alt={`${player.name} baseball card`}
  playerName={player.name} // Enables fallback search
/>
```

## Alternative Approaches

### 1. Manual Image Collection

```bash
# Download images manually and place in:
public/images/players/
├── reggie-jackson.png
├── pete-rose.png
├── nolan-ryan.png
└── ...
```

### 2. AI-Generated Images

- Use AI services to generate baseball player images
- Ensure you have rights to use the generated images
- Consider ethical implications

### 3. Stock Photo Services

- Purchase images from stock photo services
- Ensure proper licensing for your use case
- Examples: Shutterstock, Getty Images, iStock

## Best Practices

1. **Always verify licensing** before using any image
2. **Provide proper attribution** for Creative Commons images
3. **Respect rate limits** when using APIs
4. **Cache images** to reduce API calls
5. **Have fallbacks** for when images fail to load
6. **Document your sources** for compliance

## Resources

### Legal Image Sources

- [Wikimedia Commons](https://commons.wikimedia.org/) - Public domain and CC images
- [Creative Commons Search](https://search.creativecommons.org/) - CC-licensed content
- [Library of Congress](https://www.loc.gov/pictures/) - Historical photos
- [National Archives](https://www.archives.gov/) - Public domain materials

### APIs and Tools

- [Wikimedia Commons API](https://commons.wikimedia.org/w/api.php)
- [Creative Commons API](https://api.creativecommons.org/)
- [Flickr API](https://www.flickr.com/services/api/) (with CC filtering)

### Legal Information

- [Creative Commons Licenses](https://creativecommons.org/licenses/)
- [Public Domain Resources](https://creativecommons.org/share-your-work/public-domain/)
- [Fair Use Guidelines](https://www.copyright.gov/fair-use/)

## Next Steps

1. **Test Wikimedia Commons integration** (already implemented)
2. **Create local image collection** for common players
3. **Set up proper caching** for performance
4. **Implement Creative Commons search** if needed
5. **Add attribution system** for CC images

## Why Not Baseball Reference?

Baseball Reference:

- ❌ No public API available
- ❌ Terms of service prohibit scraping
- ❌ Images are copyrighted
- ❌ No official partnership program for small projects

**Focus on legal, accessible alternatives instead!**
