import "./globals.css";
import { ReactNode } from "react";
import { CartProvider } from "../../context/CartContext";
import Header from "../../components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          {children}
          <ToastContainer position="top-center" autoClose={2000} />
        </CartProvider>
      </body>
    </html>
  );
}
