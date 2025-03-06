import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { ImageCarousel } from "@/app/Components/ImageCarousel/ImageCarousel";
import { ProductDetailsClient } from "@/app/Components/ProductDetailsClient";
import Link from "next/link";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

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
    inside,
    outside,
    note,
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

// const formatCategory = (category: string) => {
//   return category
//     .split("-")
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(" ");
// };

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

  // const formattedCategory = formatCategory(product.itemCategory);

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="self-start mb-8 mt-12">
          <Link
            href={`/${product.itemCategory}`}
            className="text-stone-600 hover:text-amber-600 transition-colors font-body flex items-center gap-1"
          >
            &larr; Back to All Items
          </Link>
        </div>

        <div className="overflow-hidden bg-white/80 backdrop-blur-sm rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:min-h-[650px]">
            {/* Left Column - Images with height adjustment */}
            <div className="relative group md:h-full">
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

              {/* Sizes Component */}
              <ProductDetailsClient
                sizes={product.sizes}
                itemNo={product.itemNo}
                itemName={product.itemName}
              />

              {/* Optional Inside/Outside Details */}
              {(product.inside || product.outside) && (
                <div className="bg-stone-100 rounded-lg p-4">
                  <h2 className="font-semibold text-stone-800 mb-2">
                    Additional Details
                  </h2>
                  {product.inside && (
                    <div className="mb-2">
                      <p className="text-stone-600 text-sm">Inside</p>
                      <p className="text-stone-800">{product.inside}</p>
                    </div>
                  )}
                  {product.outside && (
                    <div>
                      <p className="text-stone-600 text-sm">Outside</p>
                      <p className="text-stone-800">{product.outside}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Optional Note Section */}
              {product.note && (
                <div className="bg-amber-50 rounded-lg p-4 flex items-center space-x-2">
                  <InformationCircleIcon className="h-5 w-5 text-amber-600" />
                  <p className="text-amber-800">{product.note}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
