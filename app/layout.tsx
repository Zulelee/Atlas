import "./globals.css";
import { Inter } from "next/font/google";
import type React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Atlas - AI-Powered Business Intelligence",
  description: "Discover the power of AI-driven business insights with Atlas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative min-h-screen bg-[#0B1221]`}>
        <div className="relative z-10">
          {/* <Navbar /> */}
          {children}
          {/* <Footer /> */}
        </div>
      </body>
    </html>
  );
}
