"use client";
import React, { useState, useCallback, useDeferredValue, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchBar } from "./SearchBar";
import { ProductGrid } from "./ProductGrid";
import { SortOptions, SortOption } from "./SortOptions";

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

interface CategoryProductsWrapperProps {
  products: Product[];
}

export function CategoryProductsWrapper({
  products,
}: CategoryProductsWrapperProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state from URL parameters
  const getInitialSortOption = useCallback((): SortOption => {
    const sortParam = searchParams.get("sort");
    const validSortOptions: SortOption[] = [
      "name-asc",
      "name-desc",
      "itemno-asc",
      "itemno-desc",
    ];
    return validSortOptions.includes(sortParam as SortOption)
      ? (sortParam as SortOption)
      : "name-asc";
  }, [searchParams]);

  const getInitialSearchTerm = useCallback((): string => {
    return searchParams.get("search") || "";
  }, [searchParams]);

  const [sortOption, setSortOption] =
    useState<SortOption>(getInitialSortOption);
  const [searchTerm, setSearchTerm] = useState(getInitialSearchTerm);

  // Use deferred value for search term to prevent flickering during filtering
  const deferredSearchTerm = useDeferredValue(searchTerm);
  const deferredSortOption = useDeferredValue(sortOption);

  const sortProducts = (
    productsToSort: Product[],
    sortOption: SortOption
  ): Product[] => {
    const sorted = [...productsToSort];

    switch (sortOption) {
      case "name-asc":
        return sorted.sort((a, b) => a.itemName.localeCompare(b.itemName));
      case "name-desc":
        return sorted.sort((a, b) => b.itemName.localeCompare(a.itemName));
      case "itemno-asc":
        return sorted.sort((a, b) =>
          a.itemNo.localeCompare(b.itemNo, undefined, { numeric: true })
        );
      case "itemno-desc":
        return sorted.sort((a, b) =>
          b.itemNo.localeCompare(a.itemNo, undefined, { numeric: true })
        );
      default:
        return sorted;
    }
  };

  // Memoize filtered and sorted products using deferred values
  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (deferredSearchTerm.trim()) {
      const searchTermLower = deferredSearchTerm.toLowerCase();
      filtered = products.filter((product: Product) => {
        return (
          product.itemName.toLowerCase().includes(searchTermLower) ||
          product.design?.toLowerCase().includes(searchTermLower) ||
          product.finish?.toLowerCase().includes(searchTermLower) ||
          product.colors?.some((color: string) =>
            color.toLowerCase().includes(searchTermLower)
          )
        );
      });
    }

    return sortProducts(filtered, deferredSortOption);
  }, [products, deferredSearchTerm, deferredSortOption]);

  const updateURL = (newSearchTerm: string, newSortOption: SortOption) => {
    const params = new URLSearchParams();

    if (newSearchTerm.trim()) {
      params.set("search", newSearchTerm);
    }

    if (newSortOption !== "name-asc") {
      params.set("sort", newSortOption);
    }

    const newURL = params.toString()
      ? `?${params.toString()}`
      : window.location.pathname;
    router.push(newURL, { scroll: false });
  };

  const handleSearch = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    updateURL(newSearchTerm, sortOption);
  };

  const handleSortChange = (newSortOption: SortOption) => {
    setSortOption(newSortOption);
    updateURL(searchTerm, newSortOption);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-6 mb-8 max-w-5xl mx-auto">
        <div className="flex-1 lg:max-w-xl">
          <label className="block text-sm font-medium text-stone-700 mb-2 font-body">
            Search products
          </label>
          <SearchBar onSearch={handleSearch} searchTerm={searchTerm} />
        </div>
        <div className="lg:w-72">
          <SortOptions
            sortOption={sortOption}
            onSortChange={handleSortChange}
          />
        </div>
      </div>
      <ProductGrid
        products={filteredProducts}
        searchTerm={searchTerm}
        sortOption={sortOption}
      />
    </>
  );
}
