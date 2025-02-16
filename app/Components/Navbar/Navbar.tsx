"use client";
import {
  Bars3Icon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  const categories = [
    {
      name: "Incense & Burners",
      subcategories: [
        "Aluminium Incense Holders",
        "Brass Incense & Fragrance Burners",
        "T-Light Holders",
        "Wooden Incense Holders",
        "Incense Accessories",
      ],
    },
    {
      name: "Altar & Ritual Tools",
      subcategories: [
        "Altar Tables",
        "Altar Tools",
        "Offering Bowls",
        "Cauldrons",
      ],
    },
    { name: "Spiritual Jewelry", subcategories: ["Copper Bracelets"] },
    {
      name: "Sacred Geometry & Decor",
      subcategories: [
        "Brass Grids",
        "Copper Grids",
        "Wooden Wall Hangings",
        "Metal Wall Hangings",
      ],
    },
    {
      name: "Meditation & Sound",
      subcategories: ["Singing Bowls", "Ting Shas (Tibetan Cymbals)"],
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(lastScrollY > currentScrollY || currentScrollY < 10);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <nav
      className={`fixed w-full z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Desktop Navbar */}
      <div className="font-body backdrop-blur-md bg-white/80 rounded-full border border-gray-200 mt-5 w-[95%] mx-auto ">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <span className="text-2xl text-black font-bold">
                <Link href="/">Wania Impex</Link>
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-12">
              <div className="relative">
                <button
                  className="flex items-center text-black hover:text-orange-600 transition-colors"
                  onClick={() =>
                    setActiveMegaMenu(
                      activeMegaMenu === "products" ? null : "products"
                    )
                  }
                >
                  Products
                  <ChevronDownIcon
                    className={`ml-2 h-3 w-3 transition-transform duration-300 ${
                      activeMegaMenu === "products" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Mega Menu */}
                <div
                  className={`absolute left-[10%] transform -translate-x-1/2 top-full md:top-14 w-[80vw] max-w-5xl bg-white shadow-xl rounded-xl border border-gray-100 transition-all duration-300 ease-in-out 
                  ${
                    activeMegaMenu === "products"
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-6">
                    {categories.map((category) => (
                      <div key={category.name} className="space-y-3">
                        <h3 className="text-lg font-bold text-gray-600">
                          {category.name}
                        </h3>
                        <ul className="space-y-2">
                          {category.subcategories.map((sub) => (
                            <li key={sub}>
                              <Link
                                href="#"
                                className="text-gray-700 hover:text-orange-600 block py-1 transition-colors"
                              >
                                {sub}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                href="/about-us"
                className="text-black hover:text-orange-600 transition-colors"
              >
                About Us
              </Link>
              <Link
                href="#"
                className="text-black hover:text-orange-600 transition-colors"
              >
                Netherlands
              </Link>
              <Link
                href="#"
                className="text-black hover:text-orange-600 transition-colors"
              >
                Contact
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-full"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6 text-gray-700" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Mobile Menu - Fullscreen Slide from Right */}
      <div
        className={`fixed top-0 right-0 w-full h-screen bg-white z-50 transform transition-transform duration-300 ease-in-out 
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4"
            onClick={() => setIsOpen(false)}
          >
            <XMarkIcon className="h-6 w-6 text-gray-700" />
          </button>

          <nav className="mt-8 space-y-4 flex-1 overflow-y-auto bg-white h-full">
            {/* Mobile Products Dropdown */}
            <button
              className="w-full flex justify-between items-center text-black font-medium py-3 border-b border-gray-200"
              onClick={() =>
                setActiveMegaMenu(
                  activeMegaMenu === "mobile-products"
                    ? null
                    : "mobile-products"
                )
              }
            >
              Products
              <ChevronDownIcon
                className={`h-5 w-5 transition-transform duration-300 ${
                  activeMegaMenu === "mobile-products" ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Mobile Mega Menu */}
            {activeMegaMenu === "mobile-products" && (
              <div className="pl-4 py-2 space-y-3">
                {categories.map((category) => (
                  <div key={category.name}>
                    <h3 className="text-sm font-bold text-gray-700">
                      {category.name}
                    </h3>
                    <ul className="pl-3 space-y-1">
                      {category.subcategories.map((sub) => (
                        <li key={sub}>
                          <Link
                            href="#"
                            className="block text-gray-600 hover:text-orange-600"
                          >
                            {sub}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
            <Link
              href="/about-us"
              className="block text-black font-medium py-3 border-b border-gray-200 hover:text-orange-600"
            >
              About Us
            </Link>
            <Link
              href="#"
              className="block text-black font-medium py-3 border-b border-gray-200 hover:text-orange-600"
            >
              Netherlands
            </Link>
            <Link
              href="#"
              className="block text-black font-medium py-3 border-b border-gray-200 hover:text-orange-600"
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
