// SearchBar.tsx (Client Component)
"use client";
import React from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  searchTerm: string;
}

export function SearchBar({ onSearch, searchTerm }: SearchBarProps) {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    onSearch(newSearchTerm);
  };

  const clearSearch = () => {
    onSearch('');
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search products..."
          className="w-full px-4 py-2 pl-10 pr-10 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400"
          size={20}
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
            type="button"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
