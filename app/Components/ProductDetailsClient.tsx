"use client";

import React, { useState } from "react";
import { Heart, Share2, ZoomIn, ShoppingCart } from "lucide-react";
// import { Alert, AlertDescription } from "@/components/ui/alert";

interface ProductDetailsProps {
  sizes: Array<{
    size: string;
    price: number;
  }>;
}

export function ProductDetailsClient({ sizes }: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState("");

  return (
    <div className="space-y-6">
      <div className="absolute top-4 right-4 space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-2 bg-white rounded-full shadow-lg hover:bg-amber-50 transition-colors">
          <ZoomIn className="w-5 h-5 text-stone-600" />
        </button>
        <button className="p-2 bg-white rounded-full shadow-lg hover:bg-amber-50 transition-colors">
          <Share2 className="w-5 h-5 text-stone-600" />
        </button>
        <button className="p-2 bg-white rounded-full shadow-lg hover:bg-amber-50 transition-colors">
          <Heart className="w-5 h-5 text-stone-600" />
        </button>
      </div>

      <div>
        <h2 className="text-xl font-heading font-bold text-stone-800 mb-4">
          Select Size
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {sizes.map((size) => (
            <button
              key={size.size}
              onClick={() => setSelectedSize(size.size)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedSize === size.size
                  ? "border-amber-600 bg-amber-50"
                  : "border-stone-200 hover:border-amber-300"
              }`}
            >
              <div className="text-lg font-medium">{size.size}</div>
              <div className="text-amber-600 font-bold">
                USD {size.price.toFixed(2)}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t">
        <button
          className="w-full bg-amber-600 text-white py-4 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-amber-700 transition-colors"
          onClick={() =>
            selectedSize && console.log(`Added size ${selectedSize} to cart`)
          }
        >
          <ShoppingCart className="w-5 h-5" />
          <span>Add to Cart</span>
        </button>
      </div>

      {/* <Alert className="bg-stone-100 border-stone-200">
        <AlertDescription>
          Free shipping on orders over $50. Easy returns within 30 days.
        </AlertDescription>
      </Alert> */}
    </div>
  );
}
