import { z } from "zod";
export const productSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  description: z.string(),
  image: z.string(),
  name: z.string(),
  price: z.number(),
  rating: z.number(),
  category: z.string(),
});

export type Product = z.infer<typeof productSchema>;

export const productsSchema = z.array(productSchema);
