// import { useContext } from "react";
// import { CartContext } from "../hooks/useCart";
import { useToast } from "./useToast";
import { supabase } from "../lib/supabase";

export const useCart = () => {
  // const context = useContext(CartContext);

  // if (!context) {
  //   throw new Error("cartContext must be used within CartProvider");
  // }

  // return context;

  const toastContext = useToast();

  const addToBag = async (productId: number) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      const newToast = {
        id: crypto.randomUUID(),
        message: "Please login to add sneakers to your cart",
      };
      toastContext.dispatch({ type: "error", payload: newToast });
      return;
    }

    const { data: existingItem } = await supabase
      .from("cart")
      .select("id, quantity")
      .eq("user_id", user.id)
      .eq("product_id", productId)
      .maybeSingle();

    if (existingItem) {
      const { error } = await supabase
        .from("cart")
        .update({ quantity: existingItem.quantity + 1 })
        .eq("id", existingItem.id);

      if (error) {
        const newToast = {
          id: crypto.randomUUID(),
          message: `Error updating quantity: ${error.message}`,
        };
        toastContext.dispatch({ type: "error", payload: newToast });
        return;
      } else {
        const newToast = {
          id: crypto.randomUUID(),
          message: `Increased sneaker quantity in cart!`,
        };
        toastContext.dispatch({ type: "success", payload: newToast });
      }
    } else {
      const { error } = await supabase.from("cart").insert({
        user_id: user.id,
        product_id: productId,
        quantity: 1,
      });

      if (error) {
        const newToast = {
          id: crypto.randomUUID(),
          message: `"Error inserting item:", ${error.message}`,
        };
        toastContext.dispatch({ type: "error", payload: newToast });
        return;
      } else {
        const newToast = {
          id: crypto.randomUUID(),
          message: `Sneaker added to cart!`,
        };
        toastContext.dispatch({ type: "success", payload: newToast });
      }
    }
  };

  const removeFromCart = async (productId: number) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      const newToast = {
        id: crypto.randomUUID(),
        message: "Please login to add sneakers to your cart",
      };
      toastContext.dispatch({ type: "error", payload: newToast });
      return;
    }

    const { error } = await supabase
      .from("cart")
      .delete()
      .eq("user_id", user.id)
      .eq("product_id", productId);

    if (error) {
      const newToast = {
        id: crypto.randomUUID(),
        message: `Error: ${error.message}`,
      };
      toastContext.dispatch({ type: "error", payload: newToast });
      return;
    } else {
      const newToast = {
        id: crypto.randomUUID(),
        message: "Item removed from cart",
      };
      toastContext.dispatch({ type: "error", payload: newToast });
    }
  };

  return { addToBag, removeFromCart };
};
