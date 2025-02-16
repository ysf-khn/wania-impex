import React from "react";
import Link from "next/link";
import { groq } from "next-sanity";
import { categories } from "@/lib/categories";
import { LayoutGrid } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { CategoryProductsWrapper } from "../Components/Search/CategoryProductsWrapper";

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
        <div className="container mx-auto px-4 md:px-8 flex flex-col items-center">
          {/* Back button added here */}
          <div className="self-start mb-4">
            <Link
              href="/all-categories"
              className="text-stone-600 hover:text-amber-600 transition-colors font-body flex items-center gap-1"
            >
              &larr; Back to All Categories
            </Link>
          </div>

          <h1 className="text-3xl md:text-4xl font-heading font-bold text-stone-800 mb-4 flex items-center justify-center gap-2">
            <LayoutGrid className="text-amber-600" size={32} />
            {category.name}
          </h1>
          <p className="text-stone-600 font-body max-w-3xl mx-auto mb-8">
            {category.description}
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
              No products found in this category.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
