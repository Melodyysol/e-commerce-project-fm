import { supabase } from "../lib/supabase";
import { cartSchemaArray, type Cart } from "../schemas/cartSchema";

export const fetchCart = async (): Promise<Cart[]> => {
  try {
    const { data: carts, error } = await supabase
      .from("cart")
      .select("*, products(*)");
    if (error) {
      throw new Error(error.message);
    }
    const validatedCarts = cartSchemaArray.safeParse(carts);

    if (!validatedCarts.success) {
      throw new Error(validatedCarts.error.message);
    }
    console.log(validatedCarts.data);
    return validatedCarts.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Unknown error", {
      cause: error,
    });
  }
};
