import React from "react";
import Image from "next/image";
import Link from "next/link";
import { groq } from "next-sanity";
import { categories } from "@/lib/categories";
import { LayoutGrid } from "lucide-react";
import { client } from "@/sanity/lib/client";

const productsQuery = groq`
  *[_type == "product" && itemCategory == $slug]{
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

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export const revalidate = 60;

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

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

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params;
  const category = categories.find((cat) => cat.slug === slug);

  if (!category) {
    return <div>Category Not Found</div>;
  }

  const products: Product[] = await client.fetch(productsQuery, { slug });

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Category Hero Section */}
      <div className="pt-28 pb-12 bg-white border-b border-stone-200">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-stone-800 mb-4 flex items-center justify-center gap-2">
            <LayoutGrid className="text-amber-600" size={32} />
            {category.name}
          </h1>
          <p className="text-stone-600 font-body max-w-3xl mx-auto mb-8">
            {category.description}
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <main className="container mx-auto px-4 md:px-8 py-12">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => {
              // Calculate the minimum price from the sizes array
              const minPrice = Math.min(
                ...product.sizes.map((size) => size.price)
              );

              return (
                <div
                  key={product._id}
                  className="flex flex-col p-6 rounded-2xl bg-white border border-stone-200 shadow-sm hover:shadow-md transition-shadow h-full"
                >
                  {/* Product Image */}
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

                  {/* Product Content - Using flex-col and justify-between */}
                  <div className="flex flex-col flex-1">
                    {/* Upper content */}
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

                    {/* Bottom content - Will stick to bottom */}
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
        ) : (
          <div className="text-center py-12">
            <p className="text-stone-600 font-body">
              No products found in this category.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
