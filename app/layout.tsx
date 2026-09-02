import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import { Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "DUENE INK - Tattoo Studio",
  description:
    "The generation that uses tattoos to heal emotional wounds in this era",

  // 🔥 FIX FAVICON HERE
  icons: {
    icon: [
      { url: "/img/logo.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/img/logo.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${montserrat.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ScrollToTop />

        {/* Background image */}
        <img
          src="/img/1.png"
          alt="DUENE INK background"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            opacity: 0.18,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Content */}
        <div className="relative z-10">{children}</div>

        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}