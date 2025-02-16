import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { ImageCarousel } from "@/app/Components/ImageCarousel/ImageCarousel";
// import { Card, CardContent } from "@/components/ui/card";
import { ProductDetailsClient } from "@/app/Components/ProductDetailsClient";

// Existing queries remain the same
const productPathsQuery = groq`
  *[_type == "product"]{
    itemNo
  }
`;

const productQuery = groq`
  *[_type == "product" && itemNo == $itemNo][0]{
    _id,
    itemNo,
    itemName,
    itemCategory,
    sizes,
    design,
    finish,
    colors,
    "images": images[].asset->url
  }
`;

export async function generateStaticParams() {
  const products = await client.fetch(productPathsQuery);
  return products.map((product: { itemNo: string }) => ({
    itemNo: product.itemNo,
  }));
}

export const revalidate = 60;

const formatCategory = (category: string) => {
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default async function ProductPage({
  params,
}: {
  params: { itemNo: string };
}) {
  const { itemNo } = params;
  const product = await client.fetch(productQuery, { itemNo });

  if (!product) {
    return <div>Product Not Found</div>;
  }

  const formattedCategory = formatCategory(product.itemCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-amber-50">
      <div className="container mx-auto px-4 md:px-8 py-16">
        <nav className="mb-8">
          <p className="text-sm text-stone-600">
            Home / {formattedCategory} / {product.itemName}
          </p>
        </nav>

        <div className="overflow-hidden bg-white/80 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Left Column - Images */}
            <div className="relative group">
              <ImageCarousel
                images={product.images}
                productName={product.itemName}
              />
            </div>

            {/* Right Column - Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-heading font-bold text-stone-800 mb-2">
                  {product.itemName}
                </h1>
                <p className="text-lg text-stone-600">{formattedCategory}</p>
              </div>

              <div className="bg-amber-50 rounded-lg p-4">
                <h2 className="font-semibold text-amber-800 mb-2">
                  Product Details
                </h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-stone-600">Item No</p>
                    <p className="font-medium">{product.itemNo}</p>
                  </div>
                  {product.design && (
                    <div>
                      <p className="text-stone-600">Design</p>
                      <p className="font-medium">{product.design}</p>
                    </div>
                  )}
                  {product.finish && (
                    <div>
                      <p className="text-stone-600">Finish</p>
                      <p className="font-medium">{product.finish}</p>
                    </div>
                  )}
                  {product.colors && (
                    <div>
                      <p className="text-stone-600">Colors</p>
                      <p className="font-medium">{product.colors.join(", ")}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Client Component for Interactive Elements */}
              <ProductDetailsClient sizes={product.sizes} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
