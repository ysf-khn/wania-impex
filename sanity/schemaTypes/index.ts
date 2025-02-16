import { type SchemaTypeDefinition } from "sanity";
import product from "./product";
import seo from "./seo";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, seo],
};
