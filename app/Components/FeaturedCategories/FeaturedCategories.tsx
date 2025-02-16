import React from "react";
import Image from "next/image";
import { LayoutGrid, Sparkles } from "lucide-react";
import SlidingCategories from "./SlidingCategories";
import Link from "next/link";

const FeaturedCategories = () => {
  const categories = [
    {
      id: 1,
      name: "Incense Burners",
      description:
        "Discover our collection of artisanal incense burners, from traditional brass holders to modern ceramic designs. Each piece is carefully crafted to enhance your sacred rituals while serving as a beautiful centerpiece for your space.",
      image: "/featuredCollections/incenseburner.jpg",
      featured: true,
    },
    {
      id: 2,
      name: "Altar Tools",
      description:
        "Enhance your spiritual practice with our finely crafted altar tools. From sacred knives to ceremonial chalices, each item is designed to support your rituals and devotion.",
      image: "/featuredCollections/tools.jpg",
    },
    {
      id: 3,
      name: "Offering Bowls",
      description:
        "Beautifully designed offering bowls for your spiritual ceremonies. Perfect for holding sacred herbs, water, or ritual offerings, these bowls add meaning to your altar space.",
      image: "/featuredCollections/bowls.jpg",
    },
    {
      id: 4,
      name: "Lanterns",
      description:
        "Illuminate your space with our beautifully crafted lanterns. Designed with intricate patterns and sacred symbolism, these lanterns create a warm and serene ambiance for your home or altar.",
      image: "/featuredCollections/lantern.avif",
    },
    {
      id: 5,
      name: "Copper Bracelets",
      description:
        "Experience the benefits of our handcrafted copper bracelets, known for their healing and grounding properties. Each bracelet is designed with intricate detailing, blending spirituality with style.",
      image: "/featuredCollections/bracelet.jpeg",
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto">
        <div className="text-center mb-16 px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Our Featured Categories
          </h2>
          <p className="text-gray-600 font-body">
            Discover our curated collection of ritual essentials
          </p>
        </div>

        <div className="flex flex-col gap-16 px-4">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`flex flex-col md:flex-row gap-8 items-center ${
                category.featured ? "bg-amber-50/50 rounded-2xl p-8" : ""
              }`}
              style={{ flexDirection: index % 2 === 0 ? "row" : "row-reverse" }}
            >
              {/* Image Container */}
              <div className="w-full md:w-1/2">
                <div
                  className={`relative h-[400px] w-full rounded-xl overflow-hidden ${
                    category.featured ? "shadow-lg" : ""
                  }`}
                >
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* Content Container */}
              <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
                <div className="flex items-center gap-2 mb-2">
                  {category.featured && (
                    <Sparkles className="text-amber-600" size={20} />
                  )}
                  <h3 className="text-2xl md:text-3xl font-bold font-heading">
                    {category.name}
                  </h3>
                </div>
                <p className="text-gray-600 font-body mb-6 max-w-lg">
                  {category.description}
                </p>
                <button
                  className={`font-cta px-6 py-2 border rounded-xl transition-colors ${
                    category.featured
                      ? "border-amber-200 hover:bg-amber-50"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  Explore {category.name}
                </button>
              </div>
            </div>
          ))}
        </div>

        <SlidingCategories />

        <div className="text-center mt-12 md:mt-16">
          <Link
            href="/all-categories"
            className="inline-block font-cta px-8 py-3 bg-amber-500/90 hover:bg-amber-500 text-stone-900 rounded-lg transition-colors gap-2 group"
          >
            <LayoutGrid className="w-5 h-5 text-stone-900 group-hover:scale-110 transition-transform inline mr-2" />
            <span>View All Categories</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
