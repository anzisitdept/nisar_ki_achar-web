import type { Metadata } from "next";
import { Josefin_Sans, Abril_Fatface } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { StoreDataProvider } from "@/context/StoreDataContext";
import CartDrawer from "@/components/cart/CartDrawer";
import CheckoutModal from "@/components/cart/CheckoutModal";
import SearchModal from "@/components/layout/SearchModal";

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
});

const abrilFatface = Abril_Fatface({
  weight: "400",
  variable: "--font-abril-fatface",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nisar Achar | Authentic Pickle Brand",
  description: "Nisar Achar brings you handcrafted pickles made with premium ingredients and traditional recipes from Pakistan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${josefinSans.variable} ${abrilFatface.variable}`}>
      <body className="antialiased min-h-screen flex flex-col font-sans bg-white">
        <StoreDataProvider>
          <CartProvider>
            {children}
            <CartDrawer />
            <CheckoutModal />
            <SearchModal />
          </CartProvider>
        </StoreDataProvider>
      </body>
    </html>
  );
}
