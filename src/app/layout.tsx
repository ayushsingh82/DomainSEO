import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WalletProvider } from "@/contexts/WalletContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DomainBet - Prediction Trading Competitions",
  description: "Compete in prediction-based trading competitions where traders predict domain price movements. AI-powered valuation oracles verify accuracy with leaderboards and rewards for top predictors.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
