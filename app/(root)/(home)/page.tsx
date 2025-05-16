import FeaturedCategories from "@/app/Components/FeaturedCategories/FeaturedCategories";
import Hero from "@/app/Components/Hero/Hero";
import SacredCustomization from "@/app/Components/SacredCustomization/SacredCustomization";
import SacredLogistics from "@/app/Components/SacredLogistics/SacredLogistics";
import WhyChooseUs from "@/app/Components/WhyChooseUs/WhyChooseUs";
import React from "react";

export const metadata = {
  title: "Wania Impex",
  description:
    "Largest Manufacturer & Exporter of Incense Burners & New Age Ritual Tools",
  openGraph: {
    title: "Wania Impex",
    description:
      "Largest Manufacturer & Exporter of Incense Burners & New Age Ritual Tools",
    url: "https://www.waniaimpex.com",
    siteName: "Wania Impex",
    images: [
      {
        url: "https://www.waniaimpex.com/opengraph-image.png", // 👈 must be full URL
        width: 1200,
        height: 630,
        alt: "Wania Impex - Great Products",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wania Impex",
    description:
      "Largest Manufacturer & Exporter of Incense Burners & New Age Ritual Tools",
    images: ["https://www.waniaimpex.com/opengraph-image.png"],
  },
};

const page = () => {
  return (
    <div className="bg-gray-100 text-black">
      <Hero />
      <FeaturedCategories />
      <SacredLogistics />
      <SacredCustomization />
      <WhyChooseUs />
    </div>
  );
};

export default page;
