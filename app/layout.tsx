export const metadata = {
  title: "Carbon Footprint Reduction Project PDF",
  description: "Generate a professional PDF proposal for reducing carbon footprint",
};

import "./globals.css";
import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <div className="max-w-5xl mx-auto p-6">{children}</div>
      </body>
    </html>
  );
}

