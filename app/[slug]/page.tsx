import React from "react";
import Link from "next/link";
import { groq } from "next-sanity";
import { categories } from "@/lib/categories";
import { LayoutGrid } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { CategoryProductsWrapper } from "../Components/Search/CategoryProductsWrapper";
import type { Metadata } from "next";
import { 
  generateCategoryTitle, 
  generateCategoryDescription, 
  generateCategoryKeywords 
} from "@/lib/seo-utils";

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

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = params;
  const category = categories.find((cat) => cat.slug === slug);

  if (!category) {
    return {
      title: "Category Not Found | Wania Impex",
      description: "The requested category could not be found."
    };
  }

  return {
    title: generateCategoryTitle(category),
    description: generateCategoryDescription(category),
    keywords: generateCategoryKeywords(category),
  };
}

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
      <div className="pt-24 sm:pt-28 md:pt-28 pb-8 sm:pb-10 md:pb-12 bg-white border-b border-stone-200">
        <div className="container  mx-auto px-4 md:px-8 flex flex-col items-center">
          {/* Back button with improved mobile appearance */}
          <div className="self-start mb-8 sm:mb-8">
            <Link
              href="/all-categories"
              className="text-sm sm:text-base text-stone-600 hover:text-amber-600 transition-colors font-body flex items-center gap-1"
            >
              &larr; Back to All Categories
            </Link>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-stone-800 mb-3 sm:mb-4 text-center flex flex-wrap items-center justify-center gap-2">
            <LayoutGrid className="text-amber-600 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
            {category.name}
          </h1>
          <p className="text-sm sm:text-base text-stone-600 font-body max-w-3xl mx-auto mb-6 sm:mb-8 text-center px-2">
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
