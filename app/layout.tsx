import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Productat: Build. Ship. Belong.",
  description:
    "Productat runs hackathons and a year-round product community for builders across the US, based in the Bay Area. Ship something real in a weekend, then keep building with people who do the same.",
  metadataBase: new URL("https://productat.com"),
  openGraph: {
    title: "Productat: Build. Ship. Belong.",
    description:
      "Hackathons and a product community for builders across the US, based in the Bay Area.",
    url: "https://productat.com",
    siteName: "Productat",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Productat: Build. Ship. Belong.",
    description:
      "Hackathons and a product community for builders across the US, based in the Bay Area.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
