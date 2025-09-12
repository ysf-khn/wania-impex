"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { SortOption } from "./SortOptions";

const ProductLink = ({ itemNo, itemCategory, searchTerm, sortOption, children }: { 
  itemNo: string; 
  itemCategory: string; 
  searchTerm: string;
  sortOption: SortOption;
  children: React.ReactNode 
}) => {
  // Build returnTo URL from current state instead of window.location to avoid race conditions
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const params = new URLSearchParams();
  
  if (searchTerm.trim()) {
    params.set('search', searchTerm);
  }
  
  if (sortOption !== 'name-asc') {
    params.set('sort', sortOption);
  }
  
  const queryString = params.toString();
  const currentUrl = currentPath + (queryString ? `?${queryString}` : '');
  const returnToParam = currentUrl ? encodeURIComponent(currentUrl) : '';
  
  const href = currentUrl 
    ? `/${itemCategory}/${itemNo}?returnTo=${returnToParam}`
    : `/${itemCategory}/${itemNo}`;
  
  return (
    <Link
      href={href}
      className="font-cta px-6 py-2 rounded-lg transition-colors inline-block bg-amber-600 hover:bg-amber-700 text-white font-bold"
    >
      {children}
    </Link>
  );
};

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

interface ProductGridProps {
  products: Product[];
  productsPerPage?: number;
  searchTerm: string;
  sortOption: SortOption;
}

const ProductCard = ({
  product,
  isDesktop,
  searchTerm,
  sortOption,
}: {
  product: Product;
  isDesktop: boolean;
  searchTerm: string;
  sortOption: SortOption;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isDesktop) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 8;
    const rotateX = -((y - centerY) / centerY) * 8;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || !isDesktop) return;
    cardRef.current.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      ref={cardRef}
      className="flex flex-col p-6 rounded-2xl bg-white border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: isDesktop ? "preserve-3d" : "flat",
        transition: "transform 0.1s ease-out",
      }}
    >
      <div
        className="relative w-full aspect-square mb-6 bg-white rounded-lg overflow-hidden"
        style={{
          transformStyle: isDesktop ? "preserve-3d" : "flat",
          transform: isDesktop ? "translateZ(20px)" : "none",
        }}
      >
        {product.images[0] && (
          <Image
            src={product.images[0]}
            alt={product.itemName}
            fill
            className="object-contain p-2"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
      </div>

      <div
        className="flex flex-col flex-1"
        style={{
          transformStyle: isDesktop ? "preserve-3d" : "flat",
          transform: isDesktop ? "translateZ(10px)" : "none",
        }}
      >
        <div>
          <h2 className="text-xl font-heading font-bold text-stone-800 mb-2">
            {product.itemName}
          </h2>
          {(product.design || product.finish) && (
            <div className="text-stone-600 font-body mb-2">
              {product.design && (
                <p>
                  <span className="text-amber-600 font-semibold">Design:</span>{" "}
                  {product.design}
                </p>
              )}
              {product.finish && (
                <p>
                  <span className="text-amber-600 font-semibold">Finish:</span>{" "}
                  {product.finish}
                </p>
              )}
            </div>
          )}
        </div>

        <div
          className="mt-auto"
          style={{
            transformStyle: isDesktop ? "preserve-3d" : "flat",
            transform: isDesktop ? "translateZ(30px)" : "none",
          }}
        >
          <ProductLink 
            itemNo={product.itemNo} 
            itemCategory={product.itemCategory}
            searchTerm={searchTerm}
            sortOption={sortOption}
          >
            View Details
          </ProductLink>
        </div>
      </div>
    </div>
  );
};

export function ProductGrid({
  products,
  productsPerPage = 16,
  searchTerm,
  sortOption,
}: ProductGridProps) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    Math.min(indexOfLastProduct, products.length)
  );

  useEffect(() => {
    const checkIfDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkIfDesktop();
    window.addEventListener("resize", checkIfDesktop);
    return () => window.removeEventListener("resize", checkIfDesktop);
  }, []);

  const changePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const nextPage = () =>
    currentPage < totalPages && changePage(currentPage + 1);
  const prevPage = () => currentPage > 1 && changePage(currentPage - 1);

  const getPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      pageNumbers.push(1);
      if (currentPage <= 3) {
        pageNumbers.push(2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pageNumbers.push(
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pageNumbers;
  };

  return (
    <div className="flex flex-col space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {currentProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            isDesktop={isDesktop}
            searchTerm={searchTerm}
            sortOption={sortOption}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8">
          <nav className="flex items-center space-x-2">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`p-2 rounded ${
                currentPage === 1
                  ? "text-stone-400 cursor-not-allowed"
                  : "text-amber-600 hover:bg-amber-50"
              }`}
              aria-label="Previous page"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {getPageNumbers().map((pageNumber, index) => (
              <React.Fragment key={index}>
                {pageNumber === "..." ? (
                  <span className="px-3 py-2 text-stone-500">...</span>
                ) : (
                  <button
                    onClick={() =>
                      typeof pageNumber === "number" && changePage(pageNumber)
                    }
                    className={`px-3 py-1 rounded-md ${
                      currentPage === pageNumber
                        ? "bg-amber-600 text-white"
                        : "text-stone-700 hover:bg-amber-50"
                    }`}
                  >
                    {pageNumber}
                  </button>
                )}
              </React.Fragment>
            ))}

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`p-2 rounded ${
                currentPage === totalPages
                  ? "text-stone-400 cursor-not-allowed"
                  : "text-amber-600 hover:bg-amber-50"
              }`}
              aria-label="Next page"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </nav>
        </div>
      )}

      <div className="text-center text-stone-500 text-sm">
        Showing {indexOfFirstProduct + 1}-
        {Math.min(indexOfLastProduct, products.length)} of {products.length}{" "}
        products
      </div>
    </div>
  );
}
