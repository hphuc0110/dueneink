"use client"

import { Button } from "@/components/ui/button"
import { scrollToContactForm } from "@/lib/scroll-to-contact"

export function ClientsSection() {
  return (
    <section className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Left Content */}
      <div className="flex flex-col justify-center bg-[#f5f5f0] px-6 py-12 sm:px-8 sm:py-16 md:px-12 md:py-20 lg:px-20">
        <h2 className="mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold leading-tight">
          OUR
          <br />
          CLIENTS:
        </h2>
        <div className="mb-6 sm:mb-8 space-y-3 sm:space-y-4 text-sm sm:text-base font-medium leading-relaxed text-gray-700">
          <p>Our clients come from every walk of life — DJs, singers, writers, police officers, lawyers.</p>
          <p>Perhaps it's because we've never cared about the "what" — only the "why."</p>
          <p>
            If you see tattooing not as decoration but as expression — a language of emotion etched on skin — then you
            already belong here.
          </p>
          <p>Because at our studio, art doesn't choose people. People choose to live as art.</p>
        </div>
        <Button
          onClick={scrollToContactForm}
          variant="outline"
          className="w-full sm:w-fit rounded-full border-black bg-transparent px-6 py-4 sm:px-8 sm:py-6 text-xs sm:text-sm hover:bg-black hover:text-white transition-colors"
        >
          BOOK A CUSTOM DEMO
        </Button>
      </div>

      {/* Right Image */}
      <div className="relative min-h-[300px] sm:min-h-[400px] lg:min-h-full">
        <img src="/img/3_1.webp" alt="Client portrait" className="h-full w-full object-cover" />
      </div>
    </section>
  )
}
