import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { ImageCarousel } from "@/app/Components/ImageCarousel/ImageCarousel";

// Query to get all product item numbers for static paths
const productPathsQuery = groq`
  *[_type == "product"]{
    itemNo
  }
`;

// Query to get detailed product data
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

// Generate static params for all products
export async function generateStaticParams() {
  const products = await client.fetch(productPathsQuery);
  return products.map((product: { itemNo: string }) => ({
    itemNo: product.itemNo,
  }));
}

export const revalidate = 60;

interface ProductPageProps {
  params: {
    itemNo: string;
  };
}

// Helper function to format the category string
const formatCategory = (category: string) => {
  return category
    .split("-") // Split by dashes
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(" "); // Join with spaces
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { itemNo } = params;
  const product = await client.fetch(productQuery, { itemNo });

  if (!product) {
    return <div>Product Not Found</div>;
  }

  // Format the category
  const formattedCategory = formatCategory(product.itemCategory);

  return (
    <div className="h-[80vh] bg-stone-50">
      <div className="container mx-auto px-4 md:px-8 py-28">
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="relative">
              <ImageCarousel
                images={product.images}
                productName={product.itemName}
              />
            </div>

            {/* Product Details */}
            <div>
              <h1 className="text-3xl font-heading font-bold text-stone-800 mb-4">
                {product.itemName}
              </h1>

              {/* Item Number and Category */}
              <div className="text-stone-600 font-body mb-4">
                <p className="mb-2">
                  <span className="text-amber-600 font-semibold">Item No:</span>{" "}
                  {product.itemNo}
                </p>
                <p className="mb-2">
                  <span className="text-amber-600 font-semibold">
                    Category:
                  </span>{" "}
                  {formattedCategory}
                </p>
              </div>

              {/* Design and Finish */}
              {(product.design || product.finish) && (
                <div className="text-stone-600 font-body mb-4">
                  {product.design && (
                    <p className="mb-2">
                      <span className="text-amber-600 font-semibold">
                        Design:
                      </span>{" "}
                      {product.design}
                    </p>
                  )}
                  {product.finish && (
                    <p>
                      <span className="text-amber-600 font-semibold">
                        Finish:
                      </span>{" "}
                      {product.finish}
                    </p>
                  )}
                </div>
              )}

              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div className="text-stone-600 font-body mb-4">
                  <p className="mb-2">
                    <span className="text-amber-600 font-semibold">
                      Colors:
                    </span>{" "}
                    {product.colors.join(", ")}
                  </p>
                </div>
              )}

              {/* Sizes and Prices */}
              <div className="mt-6">
                <h2 className="text-xl font-heading font-bold text-stone-800 mb-4">
                  Available Sizes & Prices
                </h2>
                <div className="space-y-2">
                  {product.sizes.map(
                    (size: { size: string; price: number }) => (
                      <div
                        key={size.size}
                        className="flex justify-between items-center p-3 bg-stone-50 rounded-lg"
                      >
                        <span className="font-semibold">{size.size}</span>
                        <span className="text-amber-600 font-bold">
                          USD {size.price.toFixed(2)}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
