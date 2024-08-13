import AddToCartButton from "@/components/add-to-cart-button";
import { XCircle } from "lucide-react";
import Image from "next/image";

export default async function Home() {
  const response = await fetch("https://dummyjson.com/products");

  if (!response.ok) {
    console.error("Failed to fetch products:", response.statusText);
    return (
      <main>
        <div className="flex flex-col space-y-2 h-60 items-center justify-center">
          <XCircle className="size-6 text-red-500" />
          <h1 className="text-xl font-semibold">Error fetching products</h1>
        </div>
      </main>
    );
  }

  const products = await response.json();

  return (
    <main>
      <div className="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3 p-4 md:p-6">
        {products.products.map((product: any) => (
          <div
            key={product.id}
            className="rounded-lg border bg-gray-100 shadow-sm hover:scale-105 hover:border-emerald-200 transition-transform duration-300 ease-in-out"
          >
            <div className="p-4">
              <Image
                src={product.thumbnail}
                alt={product.title}
                width={500}
                height={500}
                className="rounded-lg border bg-white object-cover object-center"
              />
            </div>
            <div className="flex flex-col space-y-1.5 p-4 pt-0">
              <h3 className="text-lg font-semibold leading-none tracking-tight">
                {product.title}
              </h3>
              <p className="text-sm text-gray-500">
                $ {product.price.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center p-4 pt-0">
              <AddToCartButton product={product} />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
