// import axios from "axios";
import { productsSchema, type Product } from "../schemas/productSchema";
import { supabase } from "../lib/supabase";

// const client_id = import.meta.env.VITE_UNSPLASH_IMAGE_KEY;

export async function fetchProduct(search: string): Promise<Product[]> {
  // const url = `https://api.unsplash.com/search/photos?client_id=${client_id}&per_page=20&query="sneaker"`;
  try {
    const response = search
      ? await supabase.from("products").select("*").ilike("name", `%${search}%`)
      : await supabase.from("products").select("*");
    if (response.error) {
      throw new Error(response.error.message);
    }
    const validateProducts = productsSchema.safeParse(response.data);
    if (!validateProducts.success) {
      throw new Error(validateProducts.error.message);
    }
    return validateProducts.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Unknown error occurred", {
      cause: error,
    });
  }
}
