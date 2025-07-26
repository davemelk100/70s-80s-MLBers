import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { getPrefetchProgress } from "@/utils/image-prefetcher";
import { Download, CheckCircle, XCircle } from "lucide-react";

interface PrefetchProgressProps {
  className?: string;
}

export function PrefetchProgress({ className = "" }: PrefetchProgressProps) {
  const [progress, setProgress] = useState(getPrefetchProgress());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkProgress = () => {
      const currentProgress = getPrefetchProgress();
      setProgress(currentProgress);
      
      // Show progress indicator if prefetch is in progress or recently completed
      if (currentProgress.inProgress || 
          (currentProgress.completed > 0 && currentProgress.total > 0)) {
        setIsVisible(true);
      } else {
        // Hide after a delay if completed
        setTimeout(() => setIsVisible(false), 3000);
      }
    };

    // Check progress immediately
    checkProgress();

    // Set up interval to check progress
    const interval = setInterval(checkProgress, 500);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) {
    return null;
  }

  const percentage = progress.total > 0 ? (progress.completed / progress.total) * 100 : 0;
  const isComplete = !progress.inProgress && progress.completed > 0;

  return (
    <div className={`fixed bottom-4 right-4 bg-white rounded-lg shadow-lg border p-4 w-80 z-50 ${className}`}>
      <div className="flex items-center gap-3 mb-3">
        {progress.inProgress ? (
          <Download className="h-5 w-5 text-blue-500 animate-pulse" />
        ) : isComplete ? (
          <CheckCircle className="h-5 w-5 text-green-500" />
        ) : (
          <XCircle className="h-5 w-5 text-red-500" />
        )}
        
        <div className="flex-1">
          <h4 className="text-sm font-medium text-gray-900">
            {progress.inProgress ? "Loading Images" : "Image Loading Complete"}
          </h4>
          <p className="text-xs text-gray-500">
            {progress.inProgress 
              ? `Loading player images from Wikimedia Commons...`
              : `Loaded ${progress.completed} of ${progress.total} images`
            }
          </p>
        </div>
      </div>

      {progress.inProgress && (
        <div className="space-y-2">
          <Progress value={percentage} className="h-2" />
          <div className="flex justify-between text-xs text-gray-500">
            <span>{progress.completed} / {progress.total}</span>
            <span>{Math.round(percentage)}%</span>
          </div>
        </div>
      )}

      {!progress.inProgress && progress.failed > 0 && (
        <div className="flex items-center gap-2 text-xs text-red-500">
          <XCircle className="h-4 w-4" />
          <span>{progress.failed} images failed to load</span>
        </div>
      )}
    </div>
  );
} 