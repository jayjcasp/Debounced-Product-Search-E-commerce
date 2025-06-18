"use client";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { cart } = useCart();

  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">
          🛍️ MyStore
        </Link>

        <nav className="space-x-4">
          <Link href="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>

          <Link href="/cart" className="relative inline-block">
            <span className="text-gray-700 hover:text-blue-600">Cart</span>

            {totalQty > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalQty}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
