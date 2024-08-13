"use client";

import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

export default function CartIcon() {
  const [cartLength, setCartLength] = useState<number>(0);

  useEffect(() => {
    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartLength(cart.length);
    };

    updateCart();

    window.addEventListener("storage", updateCart);

    return () => {
      window.removeEventListener("storage", updateCart);
    };
  }, []);

  return (
    <div className="relative">
      <ShoppingCart className="size-6" />
      {cartLength > 0 && (
        <span className="absolute bottom-3 right-3 text-xs bg-red-500 min-w-4 px-1 py-[1px] text-center rounded-full text-white">
          {cartLength}
        </span>
      )}
    </div>
  );
}
