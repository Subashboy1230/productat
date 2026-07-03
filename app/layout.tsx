import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Productat: build real products, 0 to 1",
  description:
    "Productat is a community of builders, by builders, helping non-technical people ship amazing tech products across UX/UI, engineering, product, and go-to-market. Join the waitlist for the inaugural hackathon in late July.",
  metadataBase: new URL("https://productat.com"),
  openGraph: {
    title: "Productat: build real products, 0 to 1",
    description:
      "A community of builders helping non-technical people ship 0-to-1 products. Join the waitlist for the inaugural hackathon.",
    url: "https://productat.com",
    siteName: "Productat",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Productat: build real products, 0 to 1",
    description:
      "A community of builders helping non-technical people ship 0-to-1 products. Join the waitlist for the inaugural hackathon.",
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
