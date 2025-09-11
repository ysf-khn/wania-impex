"use client";
import React from "react";
import Link from "next/link";

interface BackToCategoryButtonProps {
  categorySlug: string;
  returnTo?: string;
}

export function BackToCategoryButton({ categorySlug, returnTo }: BackToCategoryButtonProps) {
  // Use returnTo URL if available, otherwise fallback to clean category URL
  const href = returnTo ? decodeURIComponent(returnTo) : `/${categorySlug}`;
  
  return (
    <Link
      href={href}
      className="text-stone-600 hover:text-amber-600 transition-colors font-body flex items-center gap-1"
    >
      &larr; Back to All Items
    </Link>
  );
}