import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TrainCrewHub",
  description: "Next.js rewrite of TrainCrewHub"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bg">
      <body>{children}</body>
    </html>
  );
}
