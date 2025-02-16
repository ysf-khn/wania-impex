import React from "react";
import {
  Leaf,
  Globe,
  ShieldCheck,
  PackageCheck,
  Handshake,
} from "lucide-react";

const SacredLogistics = () => {
  return (
    <section className="py-16 px-4 md:px-8 border-t border-stone-200 bg-amber-50/20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-stone-800">
            Conscious Conveyance of Sacred Goods
          </h2>
          <p className="text-stone-600 font-body max-w-2xl mx-auto">
            We handle the earthly details so you can focus on spiritual matters
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Earth-Conscious Packaging */}
          <div className="p-8 rounded-2xl bg-white border border-stone-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-amber-500/10 rounded-lg">
                <Leaf className="text-amber-600" size={28} />
              </div>
              <h3 className="text-2xl font-heading font-bold text-stone-800">
                Blessed Packaging Solutions
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Natural Material Wrapping",
                  desc: "Herb-infused cotton, handmade paper & plant-based inks",
                },
                {
                  title: "Reusable Sacred Caskets",
                  desc: "Hand-carved wooden boxes for lifelong ritual use",
                },
                {
                  title: "Energy-Cleared Containers",
                  desc: "Smudge-cleaned packaging with crystal charging",
                },
                {
                  title: "Bespoke Branding",
                  desc: "Custom spiritual symbols & mantra engravings",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 bg-amber-500 rounded-full" />
                  <div>
                    <h4 className="font-heading text-amber-600">
                      {item.title}
                    </h4>
                    <p className="text-stone-600 font-body text-sm">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Global Sacred Shipments */}
          <div className="p-8 rounded-2xl bg-white border border-stone-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-amber-500/10 rounded-lg">
                <Globe className="text-amber-600" size={28} />
              </div>
              <h3 className="text-2xl font-heading font-bold text-stone-800">
                Tailored Global Solutions
              </h3>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-stone-100 rounded-lg">
                  <h4 className="font-heading text-amber-600 mb-2">
                    Shipment Guardianship
                  </h4>
                  <div className="space-y-2">
                    <p className="font-body text-sm text-stone-600 flex items-center gap-2">
                      <ShieldCheck className="text-amber-500" size={16} />
                      DDP/DDU Solutions
                    </p>
                    <p className="font-body text-sm text-stone-600 flex items-center gap-2">
                      <PackageCheck className="text-amber-500" size={16} />
                      CIF/FOB Expertise
                    </p>
                  </div>
                </div>

                <div className="p-4 border border-stone-100 rounded-lg">
                  <h4 className="font-heading text-amber-600 mb-2">
                    Harmonized Compliance
                  </h4>
                  <div className="space-y-2">
                    <p className="font-body text-sm text-stone-600">
                      Global Certification Management
                    </p>
                    <p className="font-body text-sm text-stone-600">
                      Ritual Item Clearance Assistance
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="mt-12 text-center">
          <button className="font-cta px-8 py-3 bg-amber-500/90 hover:bg-amber-500 text-stone-900 rounded-lg transition-colors flex items-center gap-2 mx-auto">
            <Handshake size={20} />
            <span>Begin Sacred Collaboration</span>
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default SacredLogistics;
