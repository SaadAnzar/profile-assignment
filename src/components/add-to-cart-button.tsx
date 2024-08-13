"use client";

import { toast } from "sonner";

export default function AddToCartButton({ product }: any) {
  function handleAddClick() {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingProduct = cart.find((item: any) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      product.quantity = 1;
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    window.dispatchEvent(new Event("storage"));

    toast.success("Added to Cart");
  }

  return (
    <button
      className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2 bg-blue-950 text-white hover:bg-blue-950/90"
      onClick={handleAddClick}
    >
      Add to Cart
    </button>
  );
}
