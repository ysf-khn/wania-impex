"use client";
import React, { useState, useRef, useEffect } from "react";
import { Search, X, Loader2 } from "lucide-react";
import Link from "next/link";
import { ProductSearchCard } from "./ProductSearchCard";
import { useGlobalSearch } from "./useGlobalSearch";

export function MobileSearchBar() {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    searchTerm,
    setSearchTerm,
    results,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    clearSearch,
    loadMore,
    popularCategories,
    hasResults,
  } = useGlobalSearch();

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFocus = () => setIsFocused(true);

  const handleClear = () => {
    clearSearch();
    setIsFocused(false);
    inputRef.current?.blur();
  };

  const showResults = isFocused && (searchTerm || hasResults);

  return (
    <div ref={containerRef} className="relative w-full max-w-md mx-auto mb-6">
      {/* Search Input */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={handleFocus}
          placeholder="Search products..."
          className="w-full px-4 py-3 pl-12 pr-10 rounded-full border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white/90 backdrop-blur-sm font-body shadow-sm"
        />

        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-400" />

        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-stone-100 rounded-full transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4 text-stone-400" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-stone-200 overflow-hidden z-50 max-h-80 overflow-y-auto">
          {isLoading && (
            <div className="flex items-center justify-center py-6">
              <Loader2 className="w-5 h-5 animate-spin text-amber-600" />
              <span className="ml-2 text-stone-600 font-body text-sm">
                Searching...
              </span>
            </div>
          )}

          {error && (
            <div className="p-4 text-center text-red-600 font-body text-sm">
              {error}
            </div>
          )}

          {!isLoading && !error && searchTerm && !hasResults && (
            <div className="p-4 text-center">
              <p className="text-stone-600 font-body text-sm mb-3">
                No products found for &quot;{searchTerm}&quot;
              </p>
              <Link
                href="/all-categories"
                onClick={() => setIsFocused(false)}
                className="text-amber-600 hover:text-amber-700 font-body text-sm underline"
              >
                Browse all categories
              </Link>
            </div>
          )}

          {hasResults && (
            <div className="p-2">
              <div className="space-y-1">
                {results.map((product) => (
                  <ProductSearchCard
                    key={product._id}
                    product={product}
                    onSelect={() => setIsFocused(false)}
                  />
                ))}
              </div>

              {hasMore && (
                <div className="p-3 text-center border-t border-stone-200 mt-2">
                  <button
                    onClick={loadMore}
                    disabled={isLoadingMore}
                    className="text-amber-600 hover:text-amber-700 font-body text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoadingMore ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Loading more...
                      </>
                    ) : (
                      "Show more results"
                    )}
                  </button>
                </div>
              )}
            </div>
          )}

          {!searchTerm && !isLoading && (
            <div className="p-4">
              <h3 className="text-sm font-medium text-stone-700 mb-3 font-body">
                Popular Categories
              </h3>
              <div className="space-y-1">
                {popularCategories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/${category.slug}`}
                    onClick={() => setIsFocused(false)}
                    className="block p-2 rounded-lg hover:bg-stone-50 transition-colors font-body text-stone-700 hover:text-amber-600 text-sm"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
