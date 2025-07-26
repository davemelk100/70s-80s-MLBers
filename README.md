# Baseball Legends Database

A React application showcasing baseball players from the 1970s and 1980s with their statistics and images.

## Tech Stack

- **Vite** - Fast build tool and development server
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible UI components
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd 70s-80s-MLBers
```

2. Install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Building for Production

Build the application:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

The preview will be available at `http://localhost:4173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── player-image.tsx
│   └── theme-provider.tsx
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## Features

- Browse baseball players from the 1970s and 1980s
- Search players by name or team
- Filter by decade (1970s, 1980s, or both)
- Filter by position
- View player statistics and career information
- **Wikimedia Commons Integration** - Player images sourced from Wikimedia Commons under open license
- Responsive design for mobile and desktop

## Image Sources

This application uses **Wikimedia Commons** as the primary source for player images. All images are:

- **Open License**: Available under Creative Commons licenses
- **Legally Compliant**: Properly attributed and freely usable
- **High Quality**: Sourced from Wikimedia's extensive baseball image collection
- **Fallback System**: Includes local images and placeholders when Wikimedia images aren't available

### Wikimedia Commons Attribution

Images from Wikimedia Commons are automatically attributed with a small "Wikimedia Commons" label on each image. The application also includes a footer link to Wikimedia Commons for proper attribution.

## Migration from Next.js

This project was migrated from Next.js to Vite for improved build performance and development experience. Key changes:

- Replaced Next.js with Vite build system
- Converted Next.js Image component to standard img tags
- Updated import paths to use src directory structure
- Removed Next.js specific directives like "use client"
- Updated TypeScript configuration for Vite
