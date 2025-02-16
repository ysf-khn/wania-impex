"use client";
import React, { useState } from "react";
import { Search, LayoutGrid } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { categories } from "@/lib/categories";

const Page = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter categories based on search query
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Centered Heading and Search Bar */}
      <div className="pt-28 pb-12 bg-white border-b border-stone-200">
        <div className="container mx-auto px-4 md:px-8 text-center">
          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-stone-800 mb-4 flex items-center justify-center gap-2">
            <LayoutGrid className="text-amber-600" size={32} />
            All Categories
          </h1>
          {/* Subheading */}
          <p className="text-stone-600 font-body max-w-3xl mx-auto mb-8">
            Explore our complete collection of spiritual artifacts, carefully
            curated for your rituals and spaces.
          </p>
          {/* Search Bar */}
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
              />
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                size={20}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <main className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className={`flex flex-col p-6 rounded-2xl ${
                category.isHighlighted
                  ? "bg-amber-50 border-2 border-amber-500"
                  : "bg-white border border-gray-300"
              }`}
            >
              {/* Image */}
              <div className="relative w-full h-48 mb-6">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h2 className="text-xl font-heading font-bold text-stone-800 mb-2">
                  {category.name}
                </h2>
                <p className="text-stone-600 font-body mb-4">
                  {category.description}
                </p>
                <Link
                  href={`/${category.slug}`} // Replace with your actual category route
                  className={`font-cta px-6 py-2 rounded-lg transition-colors inline-block ${
                    category.isHighlighted
                      ? "bg-amber-500 hover:bg-amber-600 text-stone-900"
                      : "bg-stone-100 hover:bg-stone-200 text-stone-800"
                  }`}
                >
                  Explore All
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-stone-600 font-body">
              No categories found for "{searchQuery}". Please try another
              search.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Page;
