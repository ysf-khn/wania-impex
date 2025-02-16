import { defineType, defineField } from "sanity";

export default defineType({
  name: "seo",
  title: "SEO Metadata",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: "metaKeywords",
      title: "Meta Keywords",
      type: "array",
      of: [{ type: "string" }],
      description: "Add relevant keywords separated by commas.",
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      description:
        "Preferred URL for search engines (avoid duplicate content issues).",
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      options: { hotspot: true },
      description: "Image for social media sharing (Facebook, Twitter, etc.).",
    }),
  ],
});
