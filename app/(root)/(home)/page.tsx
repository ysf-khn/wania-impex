import FeaturedCategories from "@/app/Components/FeaturedCategories/FeaturedCategories";
import Footer from "@/app/Components/Footer/Footer";
import Hero from "@/app/Components/Hero/Hero";
import SacredCustomization from "@/app/Components/SacredCustomization/SacredCustomization";
import SacredLogistics from "@/app/Components/SacredLogistics/SacredLogistics";
import WhyChooseUs from "@/app/Components/WhyChooseUs/WhyChooseUs";
import React from "react";

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
