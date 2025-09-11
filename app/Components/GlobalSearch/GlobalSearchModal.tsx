"use client";
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Search, X, Loader2, TrendingUp } from "lucide-react";
import Link from "next/link";
import { ProductSearchCard } from "./ProductSearchCard";
import { useGlobalSearch } from "./useGlobalSearch";

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
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

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  const handleClose = () => {
    clearSearch();
    onClose();
  };

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative max-w-2xl mx-auto mt-20 bg-white rounded-xl shadow-2xl overflow-hidden z-[101]">
        {/* Search Header */}
        <div className="flex items-center gap-3 p-4 border-b border-stone-200">
          <Search className="w-5 h-5 text-stone-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products, categories, materials..."
            className="flex-1 text-lg font-body placeholder:text-stone-400 focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="p-1 hover:bg-stone-100 rounded-full transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4 text-stone-400" />
            </button>
          )}
          <button
            onClick={handleClose}
            className="p-1 hover:bg-stone-100 rounded-full transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5 text-stone-500" />
          </button>
        </div>

        {/* Search Results */}
        <div className="max-h-96 overflow-y-auto">
          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-amber-600" />
              <span className="ml-2 text-stone-600 font-body">
                Searching...
              </span>
            </div>
          )}

          {error && (
            <div className="p-4 text-center text-red-600 font-body">
              {error}
            </div>
          )}

          {!isLoading && !error && searchTerm && !hasResults && (
            <div className="p-4 text-center">
              <p className="text-stone-600 font-body mb-4">
                No products found for &quot;{searchTerm}&quot;
              </p>
              <Link
                href="/all-categories"
                onClick={handleClose}
                className="text-amber-600 hover:text-amber-700 font-body underline"
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
                    onSelect={handleClose}
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
              <h3 className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-3 font-body">
                <TrendingUp className="w-4 h-4" />
                Popular Categories
              </h3>
              <div className="space-y-1">
                {popularCategories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/${category.slug}`}
                    onClick={handleClose}
                    className="block p-2 rounded-lg hover:bg-stone-50 transition-colors font-body text-stone-700 hover:text-amber-600"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Render modal in a portal to ensure it's outside the navbar's DOM tree
  return typeof window !== 'undefined' 
    ? createPortal(modalContent, document.body)
    : null;
}
