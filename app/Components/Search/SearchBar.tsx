// SearchBar.tsx (Client Component)
"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm);
  };

  return (
    <div className="relative mb-8 max-w-xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search products..."
          className="w-full px-4 py-2 pl-10 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400"
          size={20}
        />
      </div>
    </div>
  );
}
