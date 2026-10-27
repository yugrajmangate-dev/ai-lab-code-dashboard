import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Lab Code Dashboard",
  description: "A focused library for AI lab programs and notebooks."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
