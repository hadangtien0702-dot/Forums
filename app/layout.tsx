import React from 'react';
import type { Metadata } from "next";
import Sidebar from "../components/Sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Forums - Age Calculator",
  description: "An age calculator for insurance agents, which calculates age based on the US insurance industry standard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-50 flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
           {/* Header for mobile with hamburger can be re-implemented here if needed, keeping simple for now */}
           <main className="flex-1 overflow-y-auto">
              {children}
           </main>
        </div>
      </body>
    </html>
  );
}