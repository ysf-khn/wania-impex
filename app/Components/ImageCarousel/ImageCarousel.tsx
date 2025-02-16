"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageCarouselProps {
  images: string[];
  productName: string;
}

export function ImageCarousel({ images, productName }: ImageCarouselProps) {
  const [currentImage, setCurrentImage] = useState(0);

  const goToNextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const goToPreviousImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative aspect-square rounded-lg overflow-hidden group">
      <div className="relative w-full h-full">
        <Image
          src={images[currentImage]}
          alt={`${productName} - Image ${currentImage + 1}`}
          fill
          className="object-contain p-2"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          {/* Previous Button */}
          <button
            onClick={goToPreviousImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 text-stone-600" />
          </button>

          {/* Next Button */}
          <button
            onClick={goToNextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 text-stone-600" />
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 px-3 py-1 rounded-full text-sm font-medium text-stone-600">
            {currentImage + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
}
