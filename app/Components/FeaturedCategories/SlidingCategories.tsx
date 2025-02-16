"use client";
import React, { useState } from "react";

const SlidingCategories = () => {
  const categories = [
    [
      "Aluminium Incense Holders",
      "Brass Incense & Fragrance Burners",
      "T-Light Holders & Incense Burners",
      "Wooden Incense Holders & Grids",
      "Incense Accessories",
      "Altar Tables",
      "Altar Tools",
    ],
    [
      "Offering Bowls",
      "Cauldrons",
      "Copper Bracelets",
      "Brass Grids & Altar Grids",
      "Copper Grids",
      "Wooden Wall Hangings",
      "Metal Wall Hangings",
    ],
  ];

  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="pt-12 mt-12 overflow-hidden">
      <div className="mb-8 text-center">
        <h3 className="text-2xl font-bold font-heading text-stone-800 mb-2">
          Explore All Categories
        </h3>
        <p className="text-stone-600 font-body">
          Find the perfect ritual tools for your practice
        </p>
      </div>

      {/* First Row - Sliding Left */}
      <div
        className="mb-8 relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className={`flex gap-8 slide-left ${isPaused ? "paused" : ""}`}>
          {[...categories[0], ...categories[0]].map((category, index) => (
            <button
              key={`${category}-${index}`}
              className="px-6 py-3 whitespace-nowrap bg-white rounded-lg shadow-sm border border-stone-200 hover:shadow-md transition-shadow text-stone-700 hover:text-orange-700 font-body"
              onClick={() => console.log(`Navigating to ${category}`)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Second Row - Sliding Right */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className={`flex gap-8 slide-right ${isPaused ? "paused" : ""}`}>
          {[...categories[1], ...categories[1]].map((category, index) => (
            <button
              key={`${category}-${index}`}
              className="px-6 py-3 whitespace-nowrap bg-white rounded-lg shadow-sm border border-stone-200 hover:shadow-md transition-shadow text-stone-700 hover:text-orange-700 font-body"
              onClick={() => console.log(`Navigating to ${category}`)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideLeft {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @keyframes slideRight {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }

        .slide-left {
          display: flex;
          width: max-content;
          animation: slideLeft 50s linear infinite;
        }

        .slide-right {
          display: flex;
          width: max-content;
          animation: slideRight 45s linear infinite;
        }

        .paused {
          animation-play-state: paused;
        }

        ::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default SlidingCategories;
