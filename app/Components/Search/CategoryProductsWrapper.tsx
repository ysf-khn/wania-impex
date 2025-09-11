"use client";
import React, { useState, useEffect, useCallback } from "react";
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
    const sortParam = searchParams.get('sort');
    const validSortOptions: SortOption[] = ['name-asc', 'name-desc', 'itemno-asc', 'itemno-desc'];
    return validSortOptions.includes(sortParam as SortOption) 
      ? (sortParam as SortOption) 
      : 'name-asc';
  }, [searchParams]);
  
  const getInitialSearchTerm = useCallback((): string => {
    return searchParams.get('search') || '';
  }, [searchParams]);

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortOption, setSortOption] = useState<SortOption>(getInitialSortOption);
  const [searchTerm, setSearchTerm] = useState(getInitialSearchTerm);

  const sortProducts = (productsToSort: Product[], sortOption: SortOption): Product[] => {
    const sorted = [...productsToSort];
    
    switch (sortOption) {
      case "name-asc":
        return sorted.sort((a, b) => a.itemName.localeCompare(b.itemName));
      case "name-desc":
        return sorted.sort((a, b) => b.itemName.localeCompare(a.itemName));
      case "itemno-asc":
        return sorted.sort((a, b) => a.itemNo.localeCompare(b.itemNo, undefined, { numeric: true }));
      case "itemno-desc":
        return sorted.sort((a, b) => b.itemNo.localeCompare(a.itemNo, undefined, { numeric: true }));
      default:
        return sorted;
    }
  };

  const filterAndSortProducts = useCallback((searchTerm: string, sortOption: SortOption) => {
    let filtered = products;
    
    if (searchTerm.trim()) {
      const searchTermLower = searchTerm.toLowerCase();
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
    
    const sorted = sortProducts(filtered, sortOption);
    setFilteredProducts(sorted);
  }, [products]);

  const updateURL = (newSearchTerm: string, newSortOption: SortOption) => {
    const params = new URLSearchParams();
    
    if (newSearchTerm.trim()) {
      params.set('search', newSearchTerm);
    }
    
    if (newSortOption !== 'name-asc') {
      params.set('sort', newSortOption);
    }
    
    const newURL = params.toString() ? `?${params.toString()}` : window.location.pathname;
    router.push(newURL, { scroll: false });
  };

  const handleSearch = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    filterAndSortProducts(newSearchTerm, sortOption);
    updateURL(newSearchTerm, sortOption);
  };

  const handleSortChange = (newSortOption: SortOption) => {
    setSortOption(newSortOption);
    filterAndSortProducts(searchTerm, newSortOption);
    updateURL(searchTerm, newSortOption);
  };

  // Sync component state with URL parameters when they change (handles browser navigation)
  useEffect(() => {
    const urlSortOption = getInitialSortOption();
    const urlSearchTerm = getInitialSearchTerm();
    
    // Only update if values are different to avoid unnecessary re-renders
    if (urlSortOption !== sortOption) {
      setSortOption(urlSortOption);
    }
    if (urlSearchTerm !== searchTerm) {
      setSearchTerm(urlSearchTerm);
    }
    
    // Apply filtering and sorting with URL parameters
    filterAndSortProducts(urlSearchTerm, urlSortOption);
  }, [searchParams, getInitialSortOption, getInitialSearchTerm, filterAndSortProducts, sortOption, searchTerm]); // Listen to URL parameter changes

  // Apply default sorting when products change
  useEffect(() => {
    filterAndSortProducts(searchTerm, sortOption);
  }, [products, filterAndSortProducts, searchTerm, sortOption]);

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
          <SortOptions sortOption={sortOption} onSortChange={handleSortChange} />
        </div>
      </div>
      <ProductGrid products={filteredProducts} />
    </>
  );
}
