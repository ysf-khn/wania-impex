"use client";
import React, { useState } from "react";
import { SearchBar } from "./SearchBar";
import { ProductGrid } from "./ProductGrid";

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
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredProducts(products);
      return;
    }

    const searchTermLower = searchTerm.toLowerCase();
    const filtered = products.filter((product: Product) => {
      return (
        product.itemName.toLowerCase().includes(searchTermLower) ||
        product.design?.toLowerCase().includes(searchTermLower) ||
        product.finish?.toLowerCase().includes(searchTermLower) ||
        product.colors?.some((color: string) =>
          color.toLowerCase().includes(searchTermLower)
        )
      );
    });
    setFilteredProducts(filtered);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <ProductGrid products={filteredProducts} />
    </>
  );
}
