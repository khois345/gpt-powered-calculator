import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI-powered calculator",
  description: "A calculator that uses Gemini API to calculate math expressions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-neutral-800">
        {children}
      </body>
    </html>
  );
}
