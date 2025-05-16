"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

interface ProductDetailsProps {
  sizes: Array<{
    size: string;
    price: number;
  }>;
  itemNo: string;
  itemName: string;
}

export function ProductDetailsClient({
  sizes,
  itemNo,
  itemName,
}: ProductDetailsProps) {
  const whatsappMessage =
    encodeURIComponent(`Hi, I would like to inquire about the product:

Item Number: ${itemNo}
Product Name: ${itemName}`);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Action buttons - better visibility on small screens */}
      {/* <div className="absolute top-2 sm:top-4 right-2 sm:right-4 space-x-1 sm:space-x-2 opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-1.5 sm:p-2 bg-white rounded-full shadow-md hover:bg-amber-50 transition-colors">
          <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5 text-stone-600" />
        </button>
        <button className="p-1.5 sm:p-2 bg-white rounded-full shadow-md hover:bg-amber-50 transition-colors">
          <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-stone-600" />
        </button>
        <button className="p-1.5 sm:p-2 bg-white rounded-full shadow-md hover:bg-amber-50 transition-colors">
          <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-stone-600" />
        </button>
      </div> */}

      {/* Sizes section */}
      {sizes && (
        <div>
          <h2 className="text-lg sm:text-xl font-heading font-bold text-stone-800 mb-2 sm:mb-4">
            Available Sizes
          </h2>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {sizes.map((size) => (
              <span
                key={size.size}
                className="px-2 sm:px-3 py-0.5 sm:py-1 bg-stone-100 text-stone-700 rounded-full text-xs sm:text-sm"
              >
                {size.size}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* WhatsApp button */}
      <div className="pt-4 sm:pt-6 border-t">
        <button
          className="w-full bg-amber-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-amber-700 transition-colors"
          onClick={() =>
            window.open(`https://wa.me/+919355254435?text=${whatsappMessage}`)
          }
        >
          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">Inquire on WhatsApp</span>
        </button>
      </div>
    </div>
  );
}
