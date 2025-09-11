"use client";
import React, { useState, useRef, useEffect } from "react";
import { Search, X, Loader2, TrendingUp } from "lucide-react";
import Link from "next/link";
import { ProductSearchCard } from "./ProductSearchCard";
import { useGlobalSearch } from "./useGlobalSearch";

export function ResponsiveInlineSearch() {
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

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsFocused(false);
        inputRef.current?.blur();
      }
    };

    if (isFocused) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isFocused]);

  const handleFocus = () => setIsFocused(true);

  const handleClear = () => {
    clearSearch();
    inputRef.current?.focus();
  };

  const handleResultClick = () => {
    setIsFocused(false);
    clearSearch();
  };

  const showResults = isFocused && (searchTerm || hasResults);

  return (
    <div
      ref={containerRef}
      className="relative flex-1 md:max-w-lg mx-2 md:mx-8"
    >
      {/* Search Input */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={handleFocus}
          placeholder="Search products..."
          className="w-full px-3 py-2.5 md:px-4 md:py-2 pl-9 md:pl-10 pr-9 md:pr-8 rounded-full border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white/95 backdrop-blur-sm font-body text-sm md:text-sm shadow-sm"
        />

        <Search className="absolute left-2.5 md:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-stone-400" />

        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-stone-100 rounded-full transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4 md:w-3 md:h-3 text-stone-400" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showResults && (
        <div className="absolute top-full left-[calc(-50vw+50%)] md:left-0 right-[calc(-50vw+50%)] md:right-0 mt-2 mx-4 md:mx-0 bg-white rounded-xl shadow-xl border border-stone-200 overflow-hidden z-[60] max-h-[70vh] md:max-h-96 overflow-y-auto w-[calc(100vw-2rem)] md:w-auto">
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
                onClick={handleResultClick}
                className="text-amber-600 hover:text-amber-700 font-body text-sm underline"
              >
                Browse all categories
              </Link>
            </div>
          )}

          {hasResults && (
            <div className="p-2 md:p-2">
              <div className="space-y-1">
                {results.map((product) => (
                  <ProductSearchCard
                    key={product._id}
                    product={product}
                    onSelect={handleResultClick}
                  />
                ))}
              </div>

              {hasMore && (
                <div className="p-3 text-center border-t border-stone-200 mt-2">
                  <button
                    onClick={loadMore}
                    disabled={isLoadingMore}
                    className="text-amber-600 hover:text-amber-700 font-body text-sm md:text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 py-2 md:py-1"
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
            <div className="p-3 md:p-4">
              <h3 className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-3 font-body">
                <TrendingUp className="w-4 h-4" />
                Popular Categories
              </h3>
              <div className="space-y-1">
                {popularCategories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/${category.slug}`}
                    onClick={handleResultClick}
                    className="block p-3 md:p-2 rounded-lg hover:bg-stone-50 transition-colors font-body text-stone-700 hover:text-amber-600 text-sm"
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
