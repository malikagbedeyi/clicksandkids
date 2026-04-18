// app/layout.tsx

import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Header from "../components/Header";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-montserrat"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-playfair"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://clickandkids.photo"),
  title: {
    default: "Click & Kids Photography",
    template: "%s | Click & Kids Photography"
  },
  description: "Capturing the joy and authentic moments of childhood with a playful, creative approach.",
  icons: {
    icon: "/image/logo/logo-03.png",
    shortcut: "/image/logo/logo-03.png",
    apple: "/image/logo/logo-03.png",
  },
  openGraph: {
    title: "Click & Kids Photography",
    description: "Authentic, joyful photography sessions for families and children.",
    type: "website",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Click & Kids Photography"
      }
    ],
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} ${playfair.variable}`}>
        <Header />
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            classNames: {
              toast: "sonner-toast",
              description: "sonner-description",
              closeButton: "sonner-close-button"
            }
          }}
        />
      </body>
    </html>
  );
}