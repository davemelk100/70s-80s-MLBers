"use client"

import Image from "next/image"
import { useState } from "react"

interface PlayerImageProps {
  src: string
  alt: string
  className?: string
}

export function PlayerImage({ src, alt, className = "" }: PlayerImageProps) {
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleError = () => {
    console.log(`Failed to load image: ${src}`)
    setImageError(true)
    setIsLoading(false)
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  if (imageError) {
    return (
      <div className={`bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center ${className}`}>
        <div className="text-center p-4">
          <div className="text-4xl mb-2">⚾</div>
          <div className="text-sm text-gray-600 font-medium">Baseball Legend</div>
          <div className="text-xs text-gray-500 mt-1">
            {alt.split(" ")[0]} {alt.split(" ")[1]}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className={`absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse ${className}`} />
      )}
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        fill
        className={`${className} ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-500 object-cover`}
        onError={handleError}
        onLoad={handleLoad}
        quality={90}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  )
}
