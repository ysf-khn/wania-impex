"use client";
import React, { useState, useRef, useEffect } from "react";
import { ArrowUpDown, ChevronDown, Check } from "lucide-react";

export type SortOption = "name-asc" | "name-desc" | "itemno-asc" | "itemno-desc";

interface SortOptionsProps {
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
}

const sortConfig: Record<SortOption, { label: string; shortLabel: string }> = {
  "name-asc": { 
    label: "Name (A-Z)", 
    shortLabel: "Name A-Z"
  },
  "name-desc": { 
    label: "Name (Z-A)", 
    shortLabel: "Name Z-A"
  },
  "itemno-asc": { 
    label: "Item No. (Ascending)", 
    shortLabel: "Item No. ↑"
  },
  "itemno-desc": { 
    label: "Item No. (Descending)", 
    shortLabel: "Item No. ↓"
  },
};

export function SortOptions({ sortOption, onSortChange }: SortOptionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: SortOption) => {
    onSortChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-stone-700 mb-2 font-body">
        Sort by
      </label>
      
      {/* Custom dropdown trigger */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2 pl-10 pr-10 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white font-body text-stone-800 shadow-sm hover:border-stone-300 transition-all duration-200 text-left relative"
        >
          {sortConfig[sortOption].label}
        </button>
        
        {/* Sort icon */}
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 pointer-events-none">
          <ArrowUpDown size={18} />
        </div>
        
        {/* Dropdown arrow */}
        <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-transform duration-200 pointer-events-none ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown className="h-4 w-4 text-stone-500" />
        </div>
      </div>

      {/* Custom dropdown menu */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-stone-200 rounded-lg shadow-lg overflow-hidden">
          {Object.entries(sortConfig).map(([value, config]) => (
            <button
              key={value}
              type="button"
              onClick={() => handleOptionClick(value as SortOption)}
              className={`w-full px-4 py-3 text-left font-body hover:bg-amber-50 transition-colors duration-150 flex items-center justify-between ${
                sortOption === value ? 'bg-amber-50 text-amber-800' : 'text-stone-800'
              }`}
            >
              <span>{config.label}</span>
              {sortOption === value && (
                <Check className="h-4 w-4 text-amber-600" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}