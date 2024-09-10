import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CSV File Manager",
  description: "Upload, view, and enrich CSV files",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.className} h-full grid grid-rows-[auto_1fr] grid-cols-[auto_1fr]`}
      >
        <Header />
        <Sidebar />
        <main className="container mx-auto p-4 overflow-auto">{children}</main>
      </body>
    </html>
  );
}
