import { defineType, defineField } from "sanity";

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "itemNo",
      title: "Item Number",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "itemName",
      title: "Item Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "itemCategory",
      title: "Item Category",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: "Altar Tables", value: "altar-tables" },
          { title: "Altar Tools", value: "altar-tools" },
          {
            title: "Aluminium Incense Holders",
            value: "aluminium-incense-holders",
          },
          {
            title: "Brass Grids / Altar Grids",
            value: "brass-grids-altar-grids",
          },
          {
            title: "Brass Incense / Fragrance Burners",
            value: "brass-incense-fragrance-burners",
          },
          { title: "Cauldrons", value: "cauldrons" },
          { title: "Copper Bracelets", value: "copper-bracelets" },
          { title: "Copper Grids", value: "copper-grids" },
          { title: "Herb Grinders", value: "herb-grinders" },
          { title: "Incense Accessories", value: "incense-accessories" },
          { title: "Lanterns", value: "lanterns" },
          { title: "Metal Wall Hangings", value: "metal-wall-hangings" },
          { title: "Offering Bowls", value: "offering-bowls" },
          { title: "Singing Bowls", value: "singing-bowls" },
          { title: "Storage Shelves", value: "storage-shelves" },
          { title: "Ting Shas", value: "ting-shas" },
          {
            title: "T Light Holders / Incense Burners",
            value: "t-light-holders-incense-burners",
          },
          {
            title: "Trinket / Storage Dishes",
            value: "trinket-storage-dishes",
          },
          { title: "Wooden Wall Hangings", value: "wooden-wall-hangings" },
          {
            title: "Wooden Incense Holders / Grids",
            value: "wooden-incense-holders-grids",
          },
        ],
      },
    }),
    defineField({
      name: "sizes",
      title: "Sizes & Prices",
      type: "array",
      of: [
        defineField({
          name: "sizeOption",
          title: "Size Option",
          type: "object",
          fields: [
            defineField({
              name: "size",
              title: "Size",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "price",
              title: "Price",
              type: "number",
              validation: (Rule) => Rule.required().min(0),
            }),
          ],
          preview: {
            select: {
              title: "size",
              subtitle: "price",
            },
            prepare({ title, subtitle }) {
              return { title, subtitle: `$${subtitle}` };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1), // Ensure at least one size exists
    }),
    defineField({
      name: "images",
      title: "Product Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "design",
      title: "Design",
      type: "string",
    }),
    defineField({
      name: "finish",
      title: "Finish",
      type: "string",
    }),
    defineField({
      name: "colors",
      title: "Colors",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "seo",
      title: "SEO Metadata",
      type: "seo", // Uses the reusable SEO schema
    }),
  ],
});
