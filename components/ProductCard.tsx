"use client";

import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import Link from "next/link";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, cart } = useCart();

  const handleAdd = () => {
    const exists = cart.find((item) => item.id === product.id);
    addToCart(product);
    toast.success(
      exists
        ? `Increased quantity of ${product.title}`
        : `Added ${product.title} to cart`
    );
  };

  return (
    <div className="border rounded-lg p-4 shadow-md">
      <Link href={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="h-40 mx-auto object-contain mb-2 cursor-pointer"
        />
        <h2 className="text-sm font-semibold cursor-pointer">
          {product.title}
        </h2>
      </Link>
      <p className="font-bold">${product.price}</p>
      <button
        onClick={handleAdd}
        className="bg-blue-600 text-white px-3 py-1 mt-2 rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
}
