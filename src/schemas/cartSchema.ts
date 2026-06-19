import { z } from "zod";

export const cartSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  product_id: z.number(),
  quantity: z.number(),
  created_at: z.string(),
});

export type Cart = z.infer<typeof cartSchema>;

export const cartSchemaArray = z.array(cartSchema);
