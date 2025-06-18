"use client";

import { useCart } from "../../../context/CartContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();
  const router = useRouter();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0)
    return <div className="p-6 text-center">Your cart is empty.</div>;

  return (
    <main className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b pb-4"
          >
            <div className="flex gap-4 items-center">
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-contain"
              />
              <div>
                <h2 className="font-semibold">{item.title}</h2>
                <p className="text-gray-600">${item.price}</p>

                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => {
                      decreaseQty(item.id);
                      toast.info("Decreased quantity");
                    }}
                    className="px-2 py-1 border rounded"
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => {
                      increaseQty(item.id);
                      toast.success("Increased quantity");
                    }}
                    className="px-2 py-1 border rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => {
                  removeFromCart(item.id);
                  toast.error(`Removed ${item.title} from cart`);
                }}
                className="text-red-500 text-sm mt-2 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-right text-xl font-bold">
        Total: ${total.toFixed(2)}
      </div>

      <div className="mt-4 text-right">
        <button
          onClick={() => router.push("/checkout")}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
        >
          Proceed to Checkout
        </button>
      </div>
    </main>
  );
}
