import React from "react";
import {
  Instagram,
  Facebook,
  Mountain,
  MapPin,
  Phone,
  ScanBarcode,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute top-0 left-1/4 w-24 h-24 bg-amber-400/10 blur-3xl rounded-full" />
      <div className="absolute bottom-10 right-20 w-16 h-16 bg-amber-400/5 blur-2xl rounded-full" />

      <section className="py-16 px-4 md:px-8 relative z-10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand & Address */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-4 group">
              <Mountain className="text-amber-500" size={28} />
              <span className="font-heading text-xl text-stone-100">
                Wania Impex
              </span>
            </div>

            <div className="flex items-start gap-3">
              <MapPin
                className="text-amber-500/80 mt-1 flex-shrink-0"
                size={20}
              />
              <address className="font-body text-stone-400 not-italic">
                170, Lajpat Nagar
                <br />
                Moradabad - 244001
                <br />
                Uttar Pradesh, India
              </address>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <Phone className="text-amber-500/80" size={20} />
              <Link
                href="tel:+911234567890"
                className="font-body text-stone-400 hover:text-amber-400 transition-colors"
              >
                +91 93552 54435
              </Link>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <ScanBarcode className="text-amber-500/80" size={20} />
              <div className="font-mono text-sm text-stone-400 bg-stone-800/30 px-3 py-1 rounded">
                IMPEX CODE: ERCPD2256Q
              </div>
            </div>
          </div>

          {/* Craftsmanship Statement */}
          <div className="flex flex-col gap-4 md:border-x md:border-stone-800 md:px-8">
            <div className="flex flex-col gap-4 relative">
              <p className="font-body text-stone-400 relative">
                <span className="absolute -left-6 top-2 text-amber-500/30 text-4xl select-none">
                  “
                </span>
                Custodians of sacred craft, where every artifact is imbued with
                intention to infuse your space with energy and harmony.
                <span className="absolute -right-0 bottom-2 text-amber-500/30 text-4xl select-none">
                  ”
                </span>
              </p>

              {/* Craftsmanship Badge */}
              <div className="mt-4 flex items-center gap-3 px-4 py-2 border border-amber-500/20 rounded-full w-fit bg-amber-500/5 hover:bg-amber-500/10 transition-colors">
                <div className="relative h-4 w-4">
                  <div className="absolute inset-0 bg-amber-500 rounded-full animate-ping" />
                  <div className="absolute inset-0 bg-amber-500 rounded-full" />
                </div>
                <span className="text-sm font-body text-amber-400">
                  ISO Certified Craftsmanship
                </span>
              </div>
            </div>
          </div>

          {/* Social Connect */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading text-stone-100 text-lg uppercase mb-2 flex items-center gap-2">
              <span className="bg-amber-500/10 px-2 py-1 rounded-md">
                Connect with us
              </span>
            </h4>

            <div className="flex gap-4">
              <button className="p-3 border border-stone-700 rounded-lg hover:bg-stone-800 transition-all duration-300 hover:scale-105 group relative">
                <Instagram
                  className="text-stone-300 group-hover:text-amber-400 transition-colors"
                  size={20}
                />
                <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-xs text-amber-400 transition-opacity">
                  Craft Stories
                </span>
              </button>

              <button className="p-3 border border-stone-700 rounded-lg hover:bg-stone-800 transition-all duration-300 hover:scale-105 group relative">
                <Facebook
                  className="text-stone-300 group-hover:text-amber-400 transition-colors"
                  size={20}
                />
                <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-xs text-amber-400 transition-opacity">
                  Artisan Community
                </span>
              </button>
            </div>

            {/* Export Certification */}
            <div className="mt-6 p-4 border border-stone-700 rounded-lg bg-stone-800/20">
              <div className="flex items-center gap-2">
                <ScanBarcode className="text-amber-500/80" size={18} />
                <span className="font-body text-sm text-stone-400">
                  Certified Global Exporters Since 2008
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Base Footer */}
      <div className="border-t border-stone-800 py-8 relative">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-sm text-stone-500 text-center">
            © {new Date().getFullYear()} Wania Impex - Energizing Sacred Spaces
            Worldwide
          </p>

          <Link
            href="https://weekendlabs.in"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm text-stone-500 hover:text-amber-500 transition-colors flex items-center gap-1"
          >
            <span>Digital Craftsmanship by</span>
            <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent font-medium">
              Weekend Labs
            </span>
          </Link>
        </div>

        {/* Floating Ornament Pattern */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="pattern-dots pattern-amber-500 pattern-opacity-10 pattern-size-4 absolute inset-0" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
