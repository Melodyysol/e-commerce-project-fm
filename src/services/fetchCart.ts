import { supabase } from "../lib/supabase";
import { cartSchemaArray, type Cart } from "../schemas/cartSchema";

export const fetchCart = async (): Promise<Cart[]> => {
  try {
    const { data: cart, error } = await supabase.from("cart").select("*");
    if (error) {
      throw new Error(error.message);
    }
    const validatedCarts = cartSchemaArray.safeParse(cart);

    if (!validatedCarts.success) {
      throw new Error(validatedCarts.error.message);
    }
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
