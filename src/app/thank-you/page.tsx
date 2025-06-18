"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ThankYouPage() {
  const [order, setOrder] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const lastOrder = localStorage.getItem("lastOrder");
    if (lastOrder) {
      setOrder(JSON.parse(lastOrder));
    } else {
      // Redirect if user landed directly
      router.push("/");
    }
  }, [router]);

  if (!order) return null;

  return (
    <main className="max-w-2xl mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-4">🎉 Thank you for your order!</h1>

      <p className="text-gray-700 mb-6">
        A confirmation has been sent to{" "}
        <span className="font-medium">{order.email}</span>
      </p>

      <div className="bg-gray-100 p-4 rounded text-left">
        <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
        <ul className="divide-y">
          {order.items.map((item: any) => (
            <li key={item.id} className="py-2 flex justify-between">
              <div>
                {item.quantity} × {item.title}
              </div>
              <div>${(item.quantity * item.price).toFixed(2)}</div>
            </li>
          ))}
        </ul>
        <div className="mt-4 font-bold text-right text-lg">
          Total: ${order.total.toFixed(2)}
        </div>
        <p className="mt-4 text-sm text-gray-600">
          Payment method:{" "}
          <span className="font-medium capitalize">{order.payment}</span>
        </p>
        <p className="text-sm text-gray-600">
          Estimated delivery:{" "}
          <span className="font-medium">3-5 business days</span>
        </p>
      </div>

      <button
        onClick={() => router.push("/")}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
      >
        Continue Shopping
      </button>
    </main>
  );
}
