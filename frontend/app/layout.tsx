import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";
import BottomNav from "./_components/BottomNav";

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
      <body className={`${inter.className} h-full`}>
        <div className="h-full flex flex-col lg:grid lg:grid-cols-[auto_1fr] lg:grid-rows-[auto_1fr]">
          <Header className="col-span-2" />
          <Sidebar className="hidden lg:block" />
          <main className="flex-1 overflow-auto p-4 lg:p-6">{children}</main>
          <BottomNav className="lg:hidden" />
        </div>
      </body>
    </html>
  );
}
