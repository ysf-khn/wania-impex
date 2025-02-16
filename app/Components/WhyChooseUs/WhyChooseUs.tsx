import React from "react";
import { Award, Heart, Leaf, Pickaxe } from "lucide-react";

const WhyChooseUs = () => {
  const usps = [
    {
      id: 1,
      icon: Pickaxe,
      title: "Artisan Crafted",
      description:
        "Each piece is carefully handcrafted by skilled artisans using traditional techniques passed down through generations.",
      gradientFrom: "from-orange-50",
      gradientTo: "to-stone-100",
      iconColor: "text-orange-700",
    },
    {
      id: 2,
      icon: Award,
      title: "Authentic Materials",
      description:
        "We source only the finest authentic materials, ensuring each item maintains its sacred properties and traditional significance.",
      gradientFrom: "from-orange-50",
      gradientTo: "to-stone-100",
      iconColor: "text-orange-700",
    },
    {
      id: 3,
      icon: Heart,
      title: "Blessed by Artisans",
      description:
        "Every item is blessed during the creation process, infusing positive energy and sacred intentions into each piece.",
      gradientFrom: "from-orange-50",
      gradientTo: "to-stone-100",
      iconColor: "text-orange-700",
    },
    {
      id: 4,
      icon: Leaf,
      title: "Ethically Sourced",
      description:
        "We maintain strong relationships with local artisans and ensure all materials are ethically and sustainably sourced.",
      gradientFrom: "from-orange-50",
      gradientTo: "to-stone-100",
      iconColor: "text-orange-700",
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-stone-800">
            More Than Tools - A Connection to the Divine
          </h2>
          <p className="text-stone-600 font-body max-w-2xl mx-auto">
            We combine traditional craftsmanship with sacred intentions to
            create ritual tools that enhance your spiritual practice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {usps.map((usp) => (
            <div
              key={usp.id}
              className={`flex flex-col items-center text-center p-6 bg-gradient-to-br ${usp.gradientFrom} ${usp.gradientTo} rounded-xl border border-stone-200 hover:shadow-lg transition-all duration-300 group`}
            >
              <div
                className={`mb-6 p-4 bg-white/80 backdrop-blur-sm rounded-full group-hover:scale-110 transition-transform duration-300 border border-stone-100`}
              >
                <usp.icon className={`w-8 h-8 ${usp.iconColor}`} />
              </div>

              <h3 className="text-xl font-bold font-heading mb-3 text-stone-800">
                {usp.title}
              </h3>

              <p className="text-stone-600 font-body">{usp.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-stone-500 font-body max-w-xl mx-auto">
            Each item in our collection is created with intention and respect
            for ancient traditions, ensuring you receive only the most authentic
            and powerful tools for your practice.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
