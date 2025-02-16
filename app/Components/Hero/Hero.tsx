import { Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="min-h-screen w-full flex items-center justify-center p-4 md:p-10 hero">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-2 md:gap-8 md:ml-10">
        {/* Left side - Text Content */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
          <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6 font-bold font-heading text-center md:text-left">
            Handcrafted Ritual Essentials for Sacred Spaces
          </h1>
          <div className="text-lg md:text-xl font-body text-center md:text-left mb-8">
            <p>
              From ancient traditions to modern rituals, discover spiritual
              artifacts designed to bring peace, harmony, and energy to your
              sacred space.
            </p>
          </div>
          {/* <button className="absolute font-cta  bg-white px-6 py-3 border-gray-200 border rounded-xl hover:bg-gray-50 transition-colors">
            Explore the Collection
          </button> */}
          <button className="absolute font-cta bottom-4 md:bottom-[200px] px-8 py-3 bg-amber-500/90 hover:bg-amber-500 text-stone-900 rounded-lg transition-colors flex items-center gap-2 mx-auto">
            <Sparkles className="w-5 h-5" />
            <Link href="/all-categories">Explore the Collection</Link>
          </button>
        </div>

        {/* Right side - Product Images */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="grid grid-cols-3 gap-1">
            <Image
              src="/hero1.png"
              alt="Sacred ritual item 1"
              className="rounded-lg"
              height={200}
              width={200}
            />
            <Image
              src="/hero2.png"
              alt="Sacred ritual item 2"
              className="rounded-lg mt-8"
              height={200}
              width={200}
            />
            <Image
              src="/hero3.png"
              alt="Sacred ritual item 2"
              className="rounded-lg mt-8"
              height={200}
              width={200}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
