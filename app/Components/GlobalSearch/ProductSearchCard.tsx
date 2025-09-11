import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Tag } from "lucide-react";

interface Product {
  _id: string;
  itemNo: string;
  itemName: string;
  itemCategory: string;
  images: string[];
}

interface ProductSearchCardProps {
  product: Product;
  onSelect?: () => void;
}

export function ProductSearchCard({ product, onSelect }: ProductSearchCardProps) {
  const categoryLabel = product.itemCategory
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <Link
      href={`/products/${product.itemNo}`}
      onClick={onSelect}
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-stone-50 transition-colors group"
    >
      {/* Product Image */}
      <div className="relative w-12 h-12 flex-shrink-0 bg-white rounded-md overflow-hidden border border-stone-200">
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.itemName}
            fill
            className="object-contain p-1"
            sizes="48px"
          />
        ) : (
          <div className="w-full h-full bg-stone-100 flex items-center justify-center">
            <Tag className="w-5 h-5 text-stone-400" />
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-stone-800 text-sm group-hover:text-amber-600 transition-colors truncate">
          {product.itemName}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-xs text-stone-500">#{product.itemNo}</p>
          <span className="w-1 h-1 bg-stone-300 rounded-full"></span>
          <span className="text-xs text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
            {categoryLabel}
          </span>
        </div>
      </div>
    </Link>
  );
}