import type { Metadata } from "next";
import { Josefin_Sans, Abril_Fatface } from "next/font/google";
import "./globals.css";

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
  title: "Soghat e Khas | No.1 Pickles Brand in Pakistan",
  description: "Discover the authentic taste of Pakistan with Soghat e Khas, the No.1 pickles brand. Made with premium ingredients and traditional recipes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${josefinSans.variable} ${abrilFatface.variable}`}>
      <body className="antialiased min-h-screen flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
