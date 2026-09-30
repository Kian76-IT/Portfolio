import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kian Aurelio Wibowo | AI / Machine Learning Engineer",
  description:
    "Portfolio of Kian Aurelio Wibowo, a Computer Science student focused on Artificial Intelligence, Machine Learning, and Software Engineering.",

  keywords: [
    "Kian Aurelio Wibowo",
    "AI Engineer",
    "Machine Learning Engineer",
    "Software Engineer",
    "Computer Science",
    "Artificial Intelligence",
    "Machine Learning",
  ],

  authors: [
    {
      name: "Kian Aurelio Wibowo",
    },
  ],

  creator: "Kian Aurelio Wibowo",

  openGraph: {
    title: "Kian Aurelio Wibowo | AI / Machine Learning Engineer",
    description:
      "Portfolio of Kian Aurelio Wibowo, featuring projects in AI, Machine Learning, and Software Engineering.",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Kian Aurelio Wibowo | AI / Machine Learning Engineer",
    description:
      "Portfolio of Kian Aurelio Wibowo, featuring projects in AI, Machine Learning, and Software Engineering.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}