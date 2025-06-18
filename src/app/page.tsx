"use client";

import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import ProductCard from "../../components/ProductCard";
import SearchBar from "../../components/SearchBar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/products");
      setProducts(res.data);
      setFiltered(res.data);
    } catch (err) {
      setError("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (query: string) => {
    if (!query) {
      setFiltered(products);
    } else {
      const result = products.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase())
      );
      setFiltered(result);
    }
  };

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <ToastContainer />
      <SearchBar onSearch={handleSearch} />

      {loading ? (
        <p className="text-gray-500">Loading products...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
