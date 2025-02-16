// ProductGrid.tsx (Client Component)
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Size {
  price: number;
}

interface Product {
  _id: string;
  itemNo: string;
  itemName: string;
  itemCategory: string;
  sizes: Size[];
  design?: string;
  finish?: string;
  colors?: string[];
  images: string[];
}

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.map((product) => {
        const minPrice = Math.min(...product.sizes.map((size) => size.price));

        return (
          <div
            key={product._id}
            className="flex flex-col p-6 rounded-2xl bg-white border border-stone-200 shadow-sm hover:shadow-md transition-shadow h-full"
          >
            <div className="relative w-full aspect-square mb-6 bg-white rounded-lg overflow-hidden">
              {product.images[0] && (
                <Image
                  src={product.images[0]}
                  alt={product.itemName}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              )}
            </div>

            <div className="flex flex-col flex-1">
              <div>
                <h2 className="text-xl font-heading font-bold text-stone-800 mb-2">
                  {product.itemName}
                </h2>
                {(product.design || product.finish) && (
                  <div className="text-stone-600 font-body mb-2">
                    {product.design && (
                      <p>
                        <span className="text-amber-600 font-semibold">
                          Design:
                        </span>{" "}
                        {product.design}
                      </p>
                    )}
                    {product.finish && (
                      <p>
                        <span className="text-amber-600 font-semibold">
                          Finish:
                        </span>{" "}
                        {product.finish}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-auto">
                <p className="text-md font-bold text-amber-600 my-4">
                  {product.sizes.length > 1 ? "From " : ""}
                  USD {minPrice.toFixed(2)}
                </p>
                <Link
                  href={`/products/${product.itemNo}`}
                  className="font-cta px-6 py-2 rounded-lg transition-colors inline-block bg-amber-600 hover:bg-amber-700 text-white font-bold"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
