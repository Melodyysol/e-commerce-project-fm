import { z } from "zod";
import { productSchema } from "./productSchema";

export const cartSchema = z.object({
  id: z.number(),
  user_id: z.string().uuid(),
  product_id: z.number(),
  quantity: z.number(),
  created_at: z.string(),
  products: productSchema,
});

export type Cart = z.infer<typeof cartSchema>;

export const cartSchemaArray = z.array(cartSchema);
