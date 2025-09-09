import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WalletProvider } from "@/contexts/WalletContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "domaSEO - No-Code Domain NFT Sales Pages",
  description: "Create SEO-optimized, branded landing pages for your domain NFTs. Pulls live data from Doma orderbook with Buy Now and Make Offer actions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased`}
      >
        <WalletProvider>
          <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#C6FC7B' }}>
            <Navbar />
            <div className="flex-grow">
              {children}
            </div>
            <Footer />
          </div>
        </WalletProvider>
      </body>
    </html>
  );
}
