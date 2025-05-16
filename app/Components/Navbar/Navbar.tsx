"use client";
import { categories } from "@/lib/categories";
import {
  Bars3Icon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  // Create a ref for the mega menu and dropdown button
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close menu function
  const closeMenu = () => {
    setIsOpen(false);
    setOpenCategories([]);
    setActiveMegaMenu(null);
  };

  // Organize categories into main categories
  const organizedCategories = [
    {
      name: "Incense & Burners",
      subcategories: categories.filter((cat) =>
        [
          "Aluminium Incense Holders",
          "Brass Incense / Fragrance Burners",
          "T-Light Holders / Incense Burners",
          "Wooden Incense Holders / Grids",
          "Incense Accessories",
          "Lanterns",
        ].includes(cat.name)
      ),
    },
    {
      name: "Altar & Ritual Tools",
      subcategories: categories.filter((cat) =>
        ["Altar Tables", "Altar Tools", "Offering Bowls", "Cauldrons"].includes(
          cat.name
        )
      ),
    },
    {
      name: "Spiritual Jewelry",
      subcategories: categories.filter((cat) =>
        ["Copper Bracelets"].includes(cat.name)
      ),
    },
    {
      name: "Sacred Geometry & Decor",
      subcategories: categories.filter((cat) =>
        [
          "Brass Grids / Altar Grids",
          "Copper Grids",
          "Wooden Wall Hangings",
          "Metal Wall Hangings",
        ].includes(cat.name)
      ),
    },
    {
      name: "Meditation & Sound",
      subcategories: categories.filter((cat) =>
        ["Singing Bowls", "Ting Shas (Tibetan Cymbals)"].includes(cat.name)
      ),
    },
  ];

  // Handle clicks outside the mega menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is outside both the mega menu and the dropdown button
      if (
        megaMenuRef.current &&
        dropdownButtonRef.current &&
        !megaMenuRef.current.contains(event.target as Node) &&
        !dropdownButtonRef.current.contains(event.target as Node)
      ) {
        setActiveMegaMenu(null);
      }
    };

    // Add event listener when mega menu is open
    if (activeMegaMenu === "products") {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeMegaMenu]);

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

  // Auto-scroll to bottom of category when expanded
  useEffect(() => {
    if (openCategories.length > 0 && mobileMenuRef.current) {
      const lastOpenedCategory = openCategories[openCategories.length - 1];
      const categoryElement = document.getElementById(
        `category-${lastOpenedCategory}`
      );

      if (categoryElement) {
        // Calculate the position to scroll to
        const categoryBottom =
          categoryElement.offsetTop + categoryElement.offsetHeight;
        mobileMenuRef.current.scrollTo({
          top: categoryBottom,
          behavior: "smooth",
        });
      }
    }
  }, [openCategories]);

  const toggleCategory = (categoryName: string) => {
    setOpenCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((name) => name !== categoryName)
        : [...prev, categoryName]
    );
  };

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
                <Link href="/" onClick={closeMenu}>
                  <Image
                    src="/logo.svg"
                    alt="Wania Impex Logo"
                    className="hidden sm:block"
                    height={100}
                    width={100}
                  />
                  <Image
                    src="/logo.svg"
                    alt="Wania Impex Logo"
                    className="block sm:hidden"
                    height={50}
                    width={50}
                  />
                </Link>
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-12">
              <div className="relative">
                <button
                  ref={dropdownButtonRef}
                  className="flex items-center text-black hover:text-orange-600 transition-colors"
                  onClick={() =>
                    setActiveMegaMenu(
                      activeMegaMenu === "products" ? null : "products"
                    )
                  }
                >
                  Bulk Catalog
                  <ChevronDownIcon
                    className={`ml-2 h-3 w-3 transition-transform duration-300 ${
                      activeMegaMenu === "products" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Mega Menu */}
                <div
                  ref={megaMenuRef}
                  className={`absolute left-[10%] transform -translate-x-1/2 top-full md:top-14 w-[80vw] max-w-5xl bg-white shadow-xl rounded-xl border border-gray-100 transition-all duration-300 ease-in-out 
                  ${
                    activeMegaMenu === "products"
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-6">
                    {organizedCategories.map((category) => (
                      <div key={category.name} className="space-y-3">
                        <h3 className="text-lg font-bold text-gray-600">
                          {category.name}
                        </h3>
                        <ul className="space-y-2">
                          {category.subcategories.map((sub) => (
                            <li key={sub.id}>
                              <Link
                                href={`/${sub.slug}`}
                                onClick={closeMenu}
                                className="text-gray-700 hover:text-orange-600 block py-1 transition-colors"
                              >
                                {sub.name}
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
                onClick={closeMenu}
                className="text-black hover:text-orange-600 transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/netherlands"
                onClick={closeMenu}
                className="text-black hover:text-orange-600 transition-colors"
              >
                Netherlands
              </Link>
              <Link
                href="/contact-us"
                onClick={closeMenu}
                className="text-black hover:text-orange-600 transition-colors"
              >
                Contact
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-full"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Open Mobile Menu"
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
        onClick={closeMenu}
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
            onClick={closeMenu}
            aria-label="Close Menu"
          >
            <XMarkIcon className="h-6 w-6 text-gray-700" />
          </button>

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Link href="/" onClick={closeMenu}>
              <Image
                src="/logo.svg"
                alt="Wania Impex Logo"
                height={100}
                width={100}
              />
            </Link>
          </div>

          {/* Scrollable Container */}
          <div
            ref={mobileMenuRef}
            className="flex-1 overflow-y-auto pb-16" // Added padding at the bottom
          >
            {/* Mobile Categories */}
            {organizedCategories.map((category) => (
              <div
                id={`category-${category.name}`}
                key={category.name}
                className="border-b border-gray-200 font-body"
              >
                <button
                  onClick={() => toggleCategory(category.name)}
                  className="w-full flex justify-between items-center text-left p-4 hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-gray-800">
                    {category.name}
                  </span>
                  <ChevronDownIcon
                    className={`h-6 w-6 text-gray-600 transition-transform duration-300 ${
                      openCategories.includes(category.name)
                        ? "rotate-180"
                        : "rotate-0"
                    }`}
                  />
                </button>

                {/* Subcategories with Smooth Transition */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openCategories.includes(category.name)
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-4 pt-0 space-y-2">
                    {category.subcategories.map((sub) => (
                      <Link
                        key={sub.id}
                        href={`/${sub.slug}`}
                        onClick={closeMenu}
                        className="block pl-4 py-2 text-gray-700 hover:text-orange-600 hover:bg-gray-100 rounded-md transition-colors"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Static Menu Items */}
            <Link
              href="/about-us"
              onClick={closeMenu}
              className="font-body block p-4 text-lg font-semibold text-gray-800 border-b border-gray-200 hover:bg-gray-50 transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/netherlands"
              onClick={closeMenu}
              className="font-body block p-4 text-lg font-semibold text-gray-800 border-b border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Netherlands
            </Link>
            <Link
              href="/contact-us"
              onClick={closeMenu}
              className="font-body block p-4 text-lg font-semibold text-gray-800 border-b border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
