import React from "react";
import Link from "next/link";
import { groq } from "next-sanity";
import { WarehouseIcon } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { CategoryProductsWrapper } from "../../Components/Search/CategoryProductsWrapper";

const netherlandsProductsQuery = groq`
  *[_type == "product" && itemCategory == "netherlands"]{
    _id,
    itemNo,
    itemName,
    itemCategory,
    sizes,
    design,
    finish,
    colors,
    "images": images[].asset->url
  }
`;

export const revalidate = 60;

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

interface Size {
  size: string;
  price: number;
}

export default async function NetherlandsPage() {
  const products: Product[] = await client.fetch(netherlandsProductsQuery);

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Netherlands Warehouse Hero Section */}
      <div className="pt-24 sm:pt-28 md:pt-28 pb-8 sm:pb-10 md:pb-12 bg-white border-b border-stone-200">
        <div className="container mx-auto px-4 md:px-8 flex flex-col items-center">
          {/* Back button with improved mobile appearance */}
          <div className="self-start mb-8 sm:mb-8">
            <Link
              href="/"
              className="text-sm sm:text-base text-stone-600 hover:text-amber-600 transition-colors font-body flex items-center gap-1"
            >
              &larr; Back to Home
            </Link>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-stone-800 mb-3 sm:mb-4 text-center flex flex-wrap items-center justify-center gap-2">
            <WarehouseIcon className="text-amber-600 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
            Netherlands Warehouse
          </h1>
          <p className="text-sm sm:text-base text-stone-600 font-body max-w-3xl mx-auto mb-6 sm:mb-8 text-center px-2">
            Browse our collection of products available for immediate shipping
            from our Netherlands warehouse.
          </p>
        </div>
      </div>

      {/* Products Section with Search */}
      <main className="container mx-auto px-4 md:px-8 py-12">
        {products.length > 0 ? (
          <CategoryProductsWrapper products={products} />
        ) : (
          <div className="text-center py-12">
            <p className="text-stone-600 font-body">
              No products currently available in the Netherlands warehouse.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
