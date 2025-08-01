# RetroSeasons Image Scraping Documentation

## Overview

This document describes the process of scraping baseball card images from [RetroSeasons](https://www.retroseasons.com/teams/los-angeles-angels/1978/sports-cards/) and integrating them into the 70s-80s MLBers application.

## Source

- **Website**: RetroSeasons - 1978 California Angels Baseball Cards
- **URL**: https://www.retroseasons.com/teams/los-angeles-angels/1978/sports-cards/
- **Content**: 1978 Topps baseball cards for California Angels players

## Scraping Process

### 1. Initial Scraping (`scripts/scrape-retroseasons.js`)

The first script performed basic scraping of the RetroSeasons page:

- Fetched the HTML content from the RetroSeasons page
- Extracted image URLs using regex patterns
- Downloaded 29 images as `retroseasons-card-1.jpg` through `retroseasons-card-29.jpg`
- Identified 58 player cards from the page content

### 2. Enhanced Scraping (`scripts/scrape-retroseasons-enhanced.js`)

The enhanced script improved the scraping process:

- Better player name extraction using regex patterns
- Organized images by player name (e.g., `bob-grich.jpg`, `don-baylor.jpg`)
- Created a mapping file (`retroseasons-mapping.json`) with player information
- Successfully mapped 28 unique players

### 3. Integration (`scripts/integrate-retroseasons-players.js`)

The integration script:

- Read the mapping file and created TypeScript player data
- Generated `src/data/retroseasons-players.ts` with 27 player entries
- Created proper player objects with team, position, and stats information
- Excluded the team card, keeping only individual player cards

### 4. App Integration (`scripts/add-retroseasons-to-app.js`)

The final script:

- Updated `src/App.tsx` to include the new RetroSeasons players
- Replaced the existing `mockPlayers` array with the 27 new players
- Added proper player information including positions and career stats
- Created a backup of the original App.tsx file

## Results

### Downloaded Images

Successfully downloaded 57 images total:

- 29 original `retroseasons-card-*.jpg` files
- 28 organized player images (e.g., `bob-grich.jpg`, `don-baylor.jpg`)

### Player Data

The following 27 players were successfully scraped and integrated:

1. **Bob Grich** - Second Base
2. **Don Baylor** - Left Field
3. **Terry Humphrey** - Catcher
4. **Gary Nolan** - Pitcher
5. **Bobby Bonds** - Right Field
6. **Dave Chalk** - Shortstop
7. **Dyar Miller** - Pitcher
8. **Gil Flores** - Center Field
9. **Gary Ross** - Pitcher
10. **Andy Etchebarren** - Catcher
11. **Mario Guerrero** - Shortstop
12. **Balor Moore** - Pitcher
13. **Nolan Ryan** - Pitcher (Hall of Fame)
14. **Mike Barlow** - Pitcher
15. **Dave LaRoche** - Pitcher
16. **Jerry Remy** - Second Base
17. **Ike Hampton** - Catcher
18. **Paul Hartzell** - Pitcher
19. **Tony Solaita** - First Base
20. **Rance Mulliniks** - Third Base
21. **Frank Tanana** - Pitcher
22. **Thad Bosley** - Outfield
23. **Joe Rudi** - Left Field
24. **Lyman Bostock** - Center Field
25. **Dave Garcia** - Manager
26. **Ken Brett** - Pitcher
27. **Ron Jackson** - First Base

### Files Created

- `public/images/players/retroseasons-mapping.json` - Player mapping data
- `public/images/players/integration-summary.json` - Integration summary
- `src/data/retroseasons-players.ts` - TypeScript player data
- `src/App.tsx.backup` - Backup of original App.tsx

## Technical Details

### Image Processing

- Images were downloaded using Node.js `https` and `http` modules
- Respectful delays (1 second) were added between downloads
- Error handling was implemented for failed downloads
- Images were saved to `public/images/players/` directory

### Data Structure

Each player object includes:

```typescript
{
  id: number,
  name: string,
  team: "California Angels",
  position: string,
  years_active: string,
  decade: "1970s",
  image_url: string,
  description: string,
  stats: {
    card_number: "1978",
    set_year: 1978,
    team: "California Angels"
  }
}
```

### Regex Patterns Used

- Player extraction: `/(\d{4})\s+Topps\s+([^<]+?)\s+Baseball\s+Card/gi`
- Image extraction: `/<img[^>]+src="([^"]+)"[^>]*>/gi`

## Usage

To run the scraping process:

```bash
# 1. Initial scraping
node scripts/scrape-retroseasons.js

# 2. Enhanced scraping with organization
node scripts/scrape-retroseasons-enhanced.js

# 3. Integration
node scripts/integrate-retroseasons-players.js

# 4. App integration
node scripts/add-retroseasons-to-app.js

# 5. View summary
node scripts/scraping-summary.js
```

## Legal Considerations

- Images were scraped for educational/demo purposes
- RetroSeasons content is used for historical baseball card display
- Respectful scraping practices were followed (delays, error handling)
- Images are stored locally and not redistributed

## Future Enhancements

- Add more teams and years from RetroSeasons
- Implement position-specific filtering
- Add card condition and rarity information
- Create a dedicated RetroSeasons integration module
- Add support for other baseball card websites

## Notes

- The scraping process successfully extracted 27 unique players from the 1978 California Angels roster
- All images are properly organized and integrated into the application
- The app now displays authentic 1978 Topps baseball cards for California Angels players
- The process can be repeated for other teams and years available on RetroSeasons
