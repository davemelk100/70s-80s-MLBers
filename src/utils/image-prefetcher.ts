// Image prefetching utility for Wikimedia Commons images
import { getCachedPlayerImage } from './player-images';

interface PrefetchProgress {
  total: number;
  completed: number;
  failed: number;
  inProgress: boolean;
}

class ImagePrefetcher {
  private progress: PrefetchProgress = {
    total: 0,
    completed: 0,
    failed: 0,
    inProgress: false,
  };

  private onProgressCallback?: (progress: PrefetchProgress) => void;

  setProgressCallback(callback: (progress: PrefetchProgress) => void) {
    this.onProgressCallback = callback;
  }

  private updateProgress() {
    if (this.onProgressCallback) {
      this.onProgressCallback({ ...this.progress });
    }
  }

  async prefetchImages(playerNames: string[]): Promise<void> {
    if (this.progress.inProgress) {
      console.log('Prefetch already in progress');
      return;
    }

    this.progress = {
      total: playerNames.length,
      completed: 0,
      failed: 0,
      inProgress: true,
    };

    this.updateProgress();

    console.log(`Starting to prefetch ${playerNames.length} player images...`);

    // Prefetch images in batches to avoid overwhelming the API
    const batchSize = 5;
    const batches = [];
    
    for (let i = 0; i < playerNames.length; i += batchSize) {
      batches.push(playerNames.slice(i, i + batchSize));
    }

    for (const batch of batches) {
      await Promise.allSettled(
        batch.map(async (playerName) => {
          try {
            await getCachedPlayerImage(playerName);
            this.progress.completed++;
          } catch (error) {
            console.log(`Failed to prefetch image for ${playerName}:`, error);
            this.progress.failed++;
          }
          this.updateProgress();
        })
      );

      // Small delay between batches to be respectful to the API
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    this.progress.inProgress = false;
    this.updateProgress();

    console.log(`Prefetch completed: ${this.progress.completed} successful, ${this.progress.failed} failed`);
  }

  getProgress(): PrefetchProgress {
    return { ...this.progress };
  }

  isInProgress(): boolean {
    return this.progress.inProgress;
  }

  clearCache(): void {
    // Clear the image cache to force fresh downloads
    this.progress = {
      total: 0,
      completed: 0,
      failed: 0,
      inProgress: false,
    };
    this.updateProgress();
  }
}

// Export singleton instance
export const imagePrefetcher = new ImagePrefetcher();

// Helper function to prefetch images for a list of players
export const prefetchPlayerImages = async (playerNames: string[]): Promise<void> => {
  return imagePrefetcher.prefetchImages(playerNames);
};

// Helper function to get current progress
export const getPrefetchProgress = (): PrefetchProgress => {
  return imagePrefetcher.getProgress();
};

// Helper function to check if prefetch is in progress
export const isPrefetchInProgress = (): boolean => {
  return imagePrefetcher.isInProgress();
};

// Helper function to clear the cache
export const clearImageCache = (): void => {
  imagePrefetcher.clearCache();
}; 