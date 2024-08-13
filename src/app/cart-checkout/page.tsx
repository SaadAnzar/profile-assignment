"use client";

import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);

  const updateCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setProducts(cart);
  };

  useEffect(() => {
    updateCart();

    window.addEventListener("storage", updateCart);

    return () => {
      window.removeEventListener("storage", updateCart);
    };
  }, []);

  const updateQuantity = (productId: number, newQuantity: number) => {
    const updatedProducts = products.map((product) =>
      product.id === productId
        ? { ...product, quantity: Math.max(1, newQuantity) }
        : product
    );
    setProducts(updatedProducts);
    localStorage.setItem("cart", JSON.stringify(updatedProducts));

    window.dispatchEvent(new Event("storage"));
  };

  const removeProduct = (productId: number) => {
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    setProducts(updatedProducts);
    localStorage.setItem("cart", JSON.stringify(updatedProducts));

    window.dispatchEvent(new Event("storage"));
  };

  function handleCheckoutClick() {
    localStorage.setItem("cart", "[]");
    window.dispatchEvent(new Event("storage"));
    toast.success("Checkout Successful");

    router.push("/");
  }

  return (
    <>
      {products.length > 0 ? (
        <div className="w-full flex flex-col md:flex-row gap-4 md:gap-6 py-4 md:p-6">
          <div className="md:w-[60%] border shadow-sm">
            {products.map((product: any) => (
              <div
                key={product.id}
                className="w-full flex space-x-2 h-auto border-b"
              >
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  width={200}
                  height={200}
                  className="bg-white border-r size-28 md:size-40"
                />
                <div className="relative w-full flex flex-col space-y-0.5 md:space-y-1 p-0.5 md:p-2">
                  <h1 className="text-sm md:text-[15px]">{product.title}</h1>
                  <p className="text-[13px] md:text-sm">
                    $ {product.price.toLocaleString()}
                  </p>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        updateQuantity(product.id, product.quantity - 1)
                      }
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-xs font-medium h-6 px-2 py-1 bg-blue-950 text-white hover:bg-blue-950/90"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={product.quantity}
                      onChange={(e) =>
                        updateQuantity(
                          product.id,
                          parseInt(e.target.value) || 1
                        )
                      }
                      className="w-16 text-center border rounded"
                    />
                    <button
                      onClick={() =>
                        updateQuantity(product.id, product.quantity + 1)
                      }
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-xs font-medium h-6 px-2 py-1 bg-blue-950 text-white hover:bg-blue-950/90"
                    >
                      +
                    </button>
                  </div>

                  <div className="absolute bottom-1 md:bottom-2 w-full pr-[14px] md:pr-[24px]">
                    <button
                      onClick={() => removeProduct(product.id)}
                      className="w-full inline-flex items-center justify-center whitespace-nowrap text-sm font-medium h-7 md:h-8 bg-gray-100 text-red-500 hover:bg-red-500/90 hover:text-white"
                    >
                      <Trash2 className="mr-2 size-3.5" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="md:w-[40%] md:fixed md:right-6 md:pl-[44px]">
            <div className="border shadow-sm md:max-h-[85vh] overflow-y-auto p-2 md:p-4">
              <h2 className="text-base md:text-lg font-semibold">
                Order Summary
              </h2>
              <div className="flex flex-col space-y-1 py-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex justify-between space-x-2 text-sm md:text-[15px]"
                  >
                    <span>
                      {product.title} (x{product.quantity})
                    </span>
                    <span>
                      ${(product.price * product.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-dashed py-4">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>
                    $
                    {products
                      .reduce(
                        (sum, product) =>
                          sum + product.price * product.quantity,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2 bg-blue-950 text-white hover:bg-blue-950/90"
                onClick={handleCheckoutClick}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-4 md:p-6">
          <div className="border shadow-sm h-60 flex justify-center items-center">
            <h3 className="text-lg md:text-xl text-center font-semibold">
              Your cart is empty.
              <br />
              Please add some products to your cart.
            </h3>
          </div>
        </div>
      )}
    </>
  );
}
