import type { Metadata } from "next";
import { Poppins, Lora, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "700"], // Regular & Bold
  variable: "--font-cormorant", // Define CSS variable
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "600"], // Normal & Semi-bold
  variable: "--font-lora",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // Different weights for contrast
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Wania Impex",
  description: "Handcrafted Ritual Essentials for Sacred Spaces",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorantGaramond.variable} ${lora.variable} ${poppins.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
