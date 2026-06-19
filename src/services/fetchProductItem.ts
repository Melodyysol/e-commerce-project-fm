import { productSchema, type Product } from "../schemas/productSchema";
import { supabase } from "../lib/supabase";
// import { client_id } from "../lib/unsplash";

const fetchProductItem = async (photoId: string): Promise<Product> => {
  try {
    // const url = `https://api.unsplash.com/search/{${photoId}}&client_id=${client_id}`;
    const { data: productItem, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", photoId)
      .single();

    const validateItem = productSchema.safeParse(productItem);
    if (error) {
      throw new Error(error.message);
    } else if (!validateItem.success) {
      throw new Error(validateItem.error.message);
    }
    return validateItem.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Uncaught Error", {
      cause: error,
    });
  }
};

export default fetchProductItem;
