import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

const fetchData = async () => {
  const categories = await client.fetch(groq`*[_type == "category"]{slug}`);
  const products = await client.fetch(
    groq`*[_type == "product"]{slug, "category": category->slug}`
  );

  return { categories, products };
};

export async function GET() {
  const { categories, products } = await fetchData();
  const siteUrl = "https://waniaimpexind.com";

  const staticPages = ["", "all-categories"];

  const categoryPages = categories.map(({ slug }: any) => `${slug.current}`);
  const productPages = products.map(
    ({ slug, category }: any) => `${category.current}/${slug.current}`
  );

  const allPages = [...staticPages, ...categoryPages, ...productPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allPages
      .map((path) => {
        return `
          <url>
            <loc>${siteUrl}/${path}</loc>
            <changefreq>weekly</changefreq>
            <priority>${path === "" ? 1.0 : 0.8}</priority>
          </url>
        `;
      })
      .join("")}
  </urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
