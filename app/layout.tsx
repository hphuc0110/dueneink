import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import { Geist_Mono } from "next/font/google"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/next"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const META_PIXEL_ID = "1336017861727679"

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
        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>

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