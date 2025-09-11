"use client";
import { useState, useEffect, useMemo } from "react";

interface Product {
  _id: string;
  itemNo: string;
  itemName: string;
  itemCategory: string;
  design?: string;
  finish?: string;
  colors?: string[];
  images: string[];
}

interface SearchAPIResponse {
  products: Product[];
  success: boolean;
  hasMore?: boolean;
  error?: string;
}

export function useGlobalSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.trim()) {
        performSearch(searchTerm.trim(), true);
      } else {
        setResults([]);
        setHasMore(false);
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const performSearch = async (term: string, isNewSearch: boolean = false, offset: number = 0) => {
    if (isNewSearch) {
      setIsLoading(true);
      setResults([]);
    } else {
      setIsLoadingMore(true);
    }
    setError(null);

    try {
      console.log("Searching for:", term, "offset:", offset);
      
      // Call our API endpoint with pagination
      const response = await fetch(`/api/search?q=${encodeURIComponent(term)}&offset=${offset}&limit=10`);
      
      if (!response.ok) {
        throw new Error(`Search API returned ${response.status}`);
      }
      
      const data: SearchAPIResponse = await response.json();
      
      if (data.success) {
        console.log("Search results:", data.products);
        if (isNewSearch) {
          setResults(data.products);
        } else {
          setResults(prev => [...prev, ...data.products]);
        }
        setHasMore(data.hasMore || false);
      } else {
        throw new Error(data.error || "Search failed");
      }
    } catch (err) {
      console.error("Search error details:", err);
      setError("Search temporarily unavailable");
      if (isNewSearch) {
        setResults([]);
      }
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  const loadMore = () => {
    if (searchTerm.trim() && hasMore && !isLoadingMore) {
      performSearch(searchTerm.trim(), false, results.length);
    }
  };

  // Popular categories for empty state
  const popularCategories = useMemo(() => [
    { name: "Brass Incense", slug: "brass-incense-fragrance-burners" },
    { name: "Wooden Holders", slug: "wooden-incense-holders-grids" },
    { name: "Altar Tools", slug: "altar-tools" },
    { name: "Singing Bowls", slug: "singing-bowls" },
  ], []);

  const clearSearch = () => {
    setSearchTerm("");
    setResults([]);
    setError(null);
    setHasMore(false);
  };

  return {
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
    hasResults: results.length > 0,
  };
}