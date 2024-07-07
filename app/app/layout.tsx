import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OmeLive",
  description: "Chat with strangers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-gradient-to-r from-gray-600 via-zinc-800 to-slate-900 h-screen w-screen ${inter.className}`}>{children}</body>
    </html>
  );
}
