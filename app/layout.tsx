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
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DUENE INK - Tattoo Studio",
  description: "The generation that uses tattoos to heal emotional wounds in this era",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${montserrat.variable} font-sans antialiased`}>
        <ScrollToTop />
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
