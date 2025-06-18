"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCart } from "../../../../context/CartContext";
import { toast } from "react-toastify";
import axios from "axios";
import Link from "next/link";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const productId = Array.isArray(id) ? id[0] : id;
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `https://fakestoreapi.com/products/${productId}`
        );
        setProduct(res.data);
      } catch (err) {
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    if (productId) fetchProduct();
  }, [productId]);

  if (loading) return <div className="p-6 text-center">Loading product...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!product) return null;

  return (
    <main className="px-4 py-6 max-w-4xl mx-auto">
      <Link href="/" className="text-blue-600 underline">
        ← Back to Products
      </Link>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <img
          src={product.image}
          alt={product.title}
          className="w-full max-w-sm h-80 object-contain border p-4 bg-white mx-auto"
        />

        <div>
          <h1 className="text-xl md:text-2xl font-bold mb-2">
            {product.title}
          </h1>
          <p className="text-sm md:text-base text-gray-600 mb-4">
            {product.description}
          </p>
          <p className="text-lg md:text-xl font-semibold mb-4">
            ${product.price}
          </p>
          <button
            onClick={() => {
              addToCart(product);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}
