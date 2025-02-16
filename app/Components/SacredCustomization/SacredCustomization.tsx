import React from "react";
import {
  DraftingCompass,
  Wand,
  Sparkles,
  Handshake,
  Leaf,
  Globe,
  Omega,
} from "lucide-react";
import Image from "next/image";

const SacredCustomization = () => {
  return (
    <section className="py-16 px-4 md:px-8 border-t border-stone-200 bg-stone-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-stone-800">
            Manifest Your Sacred Vision
          </h2>
          <p className="text-stone-600 font-body max-w-2xl mx-auto">
            Transform your spiritual concepts into consecrated reality through
            our artisan collaboration
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Process Visualization */}
          <div className="relative h-[500px] rounded-2xl overflow-hidden border border-stone-100">
            <Image
              src="/custom-process.jpg"
              alt="Custom creation process"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-stone-900/40 flex items-center justify-center p-8">
              <blockquote className="text-center text-amber-100">
                <Sparkles className="mx-auto mb-4" size={24} />
                <p className="font-body italic mb-4">
                  "They made my dream mandala altar plate reality - exactly as I
                  envisioned during meditation"
                </p>
                <cite className="font-heading text-sm not-italic">
                  - Priya, Temple Architect
                </cite>
              </blockquote>
            </div>
          </div>

          {/* Creation Journey */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-amber-500/10 rounded-lg">
                <Wand className="text-amber-600" size={28} />
              </div>
              <h3 className="text-2xl font-heading font-bold text-stone-800">
                From Vision to Reality
              </h3>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: DraftingCompass,
                  title: "Share Your Divine Inspiration",
                  text: "Sketch, describe, or simply share the energy you wish to manifest",
                },
                {
                  icon: Sparkles,
                  title: "Artisan Energy Alignment",
                  text: "Our craftsmen meditate on your vision before creation begins",
                },
                {
                  icon: Handshake,
                  title: "Sacred Collaboration",
                  text: "Prototypes & material samples for your blessing",
                },
                {
                  icon: Wand,
                  title: "Final Artisan Touch",
                  text: "Meticulous finishing and quality assurance by master craftsmen",
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-white rounded-lg border border-stone-100"
                >
                  <step.icon
                    className="text-amber-600 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <h4 className="font-heading text-stone-800 mb-1">
                      {step.title}
                    </h4>
                    <p className="text-stone-600 font-body text-sm">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* <div className="mt-8">
              <button className="font-cta px-8 py-3 bg-amber-500/90 hover:bg-amber-500 text-stone-900 rounded-lg transition-colors flex items-center gap-2 w-full md:w-auto justify-center">
                <DraftingCompass size={20} />
                <span>Begin Sacred Co-Creation</span>
              </button>
            </div> */}
          </div>
        </div>

        {/* Assurance Badges */}
        <div className="mt-16 grid grid-cols-2 md:grid-csssss-4 gap-4 text-center">
          {[
            { label: "100% Vision Alignment", icon: Sparkles },
            { label: "Sacred Material Sourcing", icon: Leaf },
            { label: "Discreet Global Shipping", icon: Globe },
            { label: "Timeless Ritual Craft", icon: Omega },
          ].map((badge, index) => (
            <div
              key={index}
              className="p-4 bg-white rounded-xl border border-stone-100"
            >
              <badge.icon className="mx-auto text-amber-600 mb-2" size={20} />
              <span className="font-body text-stone-600 text-sm">
                {badge.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SacredCustomization;
