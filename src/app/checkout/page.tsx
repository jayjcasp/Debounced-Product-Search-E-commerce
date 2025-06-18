"use client";

import { useCart } from "../../../context/CartContext";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("card");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !address) {
      toast.error("Please fill in all fields");
      return;
    }

    const isValidEmail = /\S+@\S+\.\S+/.test(email);
    if (!isValidEmail) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsPlacingOrder(true);

    setTimeout(() => {
      const order = {
        name,
        email,
        address,
        payment,
        items: cart,
        total,
        placedAt: new Date().toISOString(),
      };

      localStorage.setItem("lastOrder", JSON.stringify(order));
      clearCart();
      toast.success("Order placed successfully!");
      router.push("/thank-you");
    }, 1000);
  };

  if (cart.length === 0) {
    return (
      <div className="p-6 text-center">
        Your cart is empty. <br />
        <a href="/" className="text-blue-600 underline">
          Back to products
        </a>
      </div>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <form onSubmit={handleOrder} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full border px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Shipping Address
          </label>
          <textarea
            className="w-full border px-3 py-2 rounded"
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="123 Street, City, Country"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Payment Method
          </label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
          >
            <option value="card">Credit/Debit Card</option>
            <option value="cod">Cash on Delivery</option>
            <option value="upi">UPI</option>
          </select>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Cart Summary</h2>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-600">
                    {item.quantity} × ${item.price.toFixed(2)}
                  </p>
                </div>
                <p className="font-semibold">
                  ${(item.quantity * item.price).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 text-right text-xl font-bold">
            Total: ${total.toFixed(2)}
          </div>
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded mt-6 disabled:opacity-50"
          disabled={isPlacingOrder}
        >
          {isPlacingOrder ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </main>
  );
}
