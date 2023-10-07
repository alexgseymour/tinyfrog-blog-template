import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import localFont from "next/font/local";
import Footer from "@/components/Footer";
import "./globals.css";

export const dynamic = "force-dynamic";

const satoshi = localFont({
  src: [
    {
      path: "./fonts/Satoshi-Variable.woff2",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-VariableItalic.woff2",
      style: "italic",
    },
  ],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Acme",
    default: "Acme | Blog",
  },
  description: "All the latest Acme news, straight from the team.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased scroll-smooth">
      <head>
        <script
          src="https://tinyfrog.co/tag.js"
          data-host="https://tinyfrog.co"
          data-key={process.env.TINYFROG_PUBLIC_API_KEY}
          data-project={process.env.TINYFROG_PROJECT_ID}
          defer
        ></script>
      </head>
      <body className={satoshi.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
