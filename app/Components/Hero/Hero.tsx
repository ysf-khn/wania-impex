import { Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="min-h-screen w-full flex flex-col justify-center p-4 md:p-10 hero pt-[15vh] md:pt-[10vh]">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-2 md:gap-16 h-full">
        {/* Left side - Text Content */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
          <h1 className="text-3xl md:text-4xl lg:text-5xl mb-6 font-bold font-heading text-center md:text-left">
            Largest Manufacturer & Exporter of Incense Burners & New Age Ritual
            Tools
          </h1>
          <div className="text-lg md:text-xl font-body text-center md:text-left mb-4">
            Trusted by 100+ Global Partners
          </div>
          <div className="text-md md:text-xl font-body text-center md:text-left mb-8">
            <p>
              From ancient traditions to modern rituals, discover spiritual
              artifacts designed to bring peace, harmony, and energy to your
              sacred space.
            </p>
          </div>
          <div className="hidden md:block">
            <Link href="/all-categories">
              <button className="font-cta px-8 py-3 bg-amber-500/90 hover:bg-amber-500 text-stone-900 rounded-lg transition-colors flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Explore the Collection
              </button>
            </Link>
          </div>
        </div>

        {/* Right side - Product Images */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="grid grid-cols-3 gap-4">
            <Image
              src="/hero1.png"
              alt="Sacred ritual item 1"
              className="rounded-lg"
              height={240}
              width={240}
              objectFit="cover"
            />
            <Image
              src="/hero2.png"
              alt="Sacred ritual item 2"
              className="rounded-lg mt-8"
              height={240}
              width={240}
              objectFit="cover"
            />
            <Image
              src="/hero3.png"
              alt="Sacred ritual item 3"
              className="rounded-lg"
              height={240}
              width={240}
              objectFit="cover"
            />
          </div>
        </div>
      </div>

      {/* Mobile CTA button at bottom of hero section */}
      <div className="block md:hidden mt-8 mb-4 text-center">
        <Link href="/all-categories">
          <button className="font-cta px-8 py-3 bg-amber-500/90 hover:bg-amber-500 text-stone-900 rounded-lg transition-colors flex items-center gap-2 mx-auto">
            <Sparkles className="w-5 h-5" />
            Explore the Collection
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
