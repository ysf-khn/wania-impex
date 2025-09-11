"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { GlobalSearchModal } from "./GlobalSearchModal";

export function GlobalSearchButton() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsSearchOpen(true)}
        className="p-2 text-black hover:text-amber-600 transition-colors rounded-full hover:bg-white/50"
        aria-label="Search products"
      >
        <Search className="w-5 h-5" />
      </button>
      
      <GlobalSearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
}