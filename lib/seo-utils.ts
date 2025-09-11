// Base business information
export const BUSINESS_NAME = "Wania Impex";
export const BUSINESS_TAGLINE =
  "Largest Manufacturer & Exporter of Incense Burners & New Age Ritual Tools";

// Category type for utility functions
interface Category {
  name: string;
  description: string;
  slug: string;
}

// Product type for utility functions
interface Product {
  itemName: string;
  itemCategory: string;
  design?: string;
  finish?: string;
  colors?: string[];
}

export function generateCategoryTitle(category: Category): string {
  return `${category.name} | ${BUSINESS_NAME}`;
}

export function generateCategoryDescription(category: Category): string {
  return `${category.description} Shop premium ${category.name.toLowerCase()} from ${BUSINESS_NAME}, leading manufacturer and exporter of incense burners and ritual tools.`;
}

export function generateCategoryKeywords(category: Category): string[] {
  const baseKeywords = [
    category.name.toLowerCase(),
    "incense burners",
    "ritual tools",
    "wania impex",
    "manufacturer",
    "exporter",
  ];

  // Add category-specific keywords
  const categoryWords = category.name.toLowerCase().split(/[\s\-\/]+/);
  return [...baseKeywords, ...categoryWords].filter(Boolean);
}

export function generateProductTitle(product: Product): string {
  // Get category name for context
  const categoryName = product.itemCategory
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return `${product.itemName} - ${categoryName} | ${BUSINESS_NAME}`;
}

export function generateProductDescription(product: Product): string {
  const parts = [product.itemName];

  if (product.design) {
    parts.push(`featuring ${product.design} design`);
  }

  if (product.finish) {
    parts.push(`with ${product.finish} finish`);
  }

  if (product.colors && product.colors.length > 0) {
    parts.push(`available in ${product.colors.join(", ")}`);
  }

  const categoryName = product.itemCategory
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const description = `${parts.join(", ")}. Premium ${categoryName.toLowerCase()} from ${BUSINESS_NAME}, trusted manufacturer and exporter of incense burners and ritual tools.`;

  // Ensure description doesn't exceed 160 characters
  return description.length > 160
    ? description.substring(0, 157) + "..."
    : description;
}

export function generateProductKeywords(product: Product): string[] {
  const keywords = [
    product.itemName.toLowerCase(),
    product.itemCategory.replace(/-/g, " "),
    "incense burner",
    "ritual tools",
    "wania impex",
  ];

  // Add design and finish as keywords
  if (product.design) {
    keywords.push(product.design.toLowerCase());
  }

  if (product.finish) {
    keywords.push(product.finish.toLowerCase());
  }

  // Add colors as keywords
  if (product.colors) {
    keywords.push(...product.colors.map((color) => color.toLowerCase()));
  }

  // Split product name and category into individual words
  const productWords = product.itemName.toLowerCase().split(/\s+/);
  const categoryWords = product.itemCategory.toLowerCase().split(/[\s\-]+/);

  return [...keywords, ...productWords, ...categoryWords].filter(Boolean);
}
