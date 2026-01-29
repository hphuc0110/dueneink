"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef, useState, useEffect } from "react"
import Link from "next/link"

export function ArtDiscoverySection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const slides = [1, 2, 3, 4]

  // 👉 Cuộn tới slide chỉ định
  const scrollToIndex = (index: number) => {
    if (!scrollContainerRef.current) return
    const scrollAmount = scrollContainerRef.current.clientWidth * index
    scrollContainerRef.current.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    })
    setCurrentIndex(index)
  }

  // 👉 Chuyển slide trái/phải
  const scroll = (dir: "left" | "right") => {
    const newIndex =
      dir === "left"
        ? (currentIndex - 1 + slides.length) % slides.length
        : (currentIndex + 1) % slides.length
    scrollToIndex(newIndex)
  }

  // 👉 Lắng nghe khi người dùng cuộn bằng tay
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return
    const handleScroll = () => {
      const index = Math.round(container.scrollLeft / container.clientWidth)
      setCurrentIndex(index)
    }
    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="relative bg-[#f5f5f0] py-8 sm:py-10 md:py-12 lg:py-16 overflow-hidden">
      <div className="w-full max-w-full mx-auto px-0 sm:px-4 md:px-6 relative">
        {/* === SLIDER === */}
        <div
          ref={scrollContainerRef}
          className="flex gap-0 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory hide-scrollbar touch-pan-x w-full min-w-0"
        >
          {/* --- Các Slide --- */}
          <Slide
            bg="from-gray-900 to-gray-800"
            heading="FAQ with Duene"
            desc="Frequently Asked Questions Before and After Getting a Tattoo"
            button="See more"
            href="/faq"
            images={[
              "/img/ARTWORK/11.webp",
              "/img/ARTWORK/12.webp",
              "/img/ARTWORK/13.webp",
              "/img/ARTWORK/14.webp",
              "/img/ARTWORK/15.webp",
              "/img/ARTWORK/16.webp",
            ]}
          />
          <Slide
            bg="from-blue-900 to-purple-800"
            title1="Discover"
            title2="Emerging"
            year="Artists"
            heading="Discover and Buy Art That Moves You"
             desc="Turn art into a daily habit. Follow artists, personalized recommendations."
            button="Discover Now"
            images={[
              "/img/COLORTATTOO/C1.webp",
              "/img/COLORTATTOO/C2.webp",
              "/img/COLORTATTOO/C3.webp",
              "/img/COLORTATTOO/C4.webp",
              "/img/COLORTATTOO/C5.webp",
              "/img/COLORTATTOO/C6.webp",
            ]}
          />
          <Slide
            bg="from-green-900 to-lime-800"
            title1="Discover"
            title2="Emerging"
            year="Artists"
            heading="Discover and Buy Art That Moves You"
            desc="Turn art into a daily habit. Follow artists, personalized recommendations."
            button="Discover Now"
            images={[
              "/img/REALISTICTATTOO/R1.webp",
              "/img/REALISTICTATTOO/R2.webp",
              "/img/REALISTICTATTOO/R3.webp",
              "/img/REALISTICTATTOO/R4.webp",
              "/img/REALISTICTATTOO/R5.webp",
              "/img/REALISTICTATTOO/R6.webp",
            ]}
          />
          <Slide
            bg="from-red-900 to-orange-800"
            title1="Discover"
            title2="Emerging"
            year="Artists"
            heading="Discover and Buy Art That Moves You"
            desc="Turn art into a daily habit. Follow artists,personalized recommendations."
            button="Discover Now"
            images={[
              "/img/BLACKWORKTATTOO/B1.webp",
              "/img/BLACKWORKTATTOO/B2.webp",
              "/img/BLACKWORKTATTOO/B3.webp",
              "/img/BLACKWORKTATTOO/B4.webp",
              "/img/BLACKWORKTATTOO/B5.webp",
              "/img/BLACKWORKTATTOO/B6.webp",
            ]}
          />
        </div>

        {/* === Nút mũi tên trái/phải === */}
        <div className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 md:left-6 right-2 sm:right-4 md:right-6 flex items-center justify-between pointer-events-none z-20">
          <button
            onClick={() => scroll("left")}
            className="pointer-events-auto rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 p-2 sm:p-2.5 md:p-3 shadow-md hover:bg-white active:scale-95 transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="pointer-events-auto rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 p-2 sm:p-2.5 md:p-3 shadow-md hover:bg-white active:scale-95 transition-all"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* === Thanh dot bar === */}
        <div className="flex flex-col items-center mt-4 sm:mt-6 md:mt-8 lg:mt-10 px-4 sm:px-0">
          <div className="flex w-full max-w-md h-1 sm:h-1.5 bg-gray-300/50 opacity-70 rounded-full overflow-hidden">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                className={`flex-1 transition-all duration-500 ${
                  i === currentIndex
                    ? "bg-black"
                    : "bg-gray-400/40 hover:bg-gray-500/60 active:bg-gray-500/80"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}

/* --- COMPONENT SLIDE --- */
function Slide({
  bg,
  title1,
  title2,
  year,
  heading,
  desc,
  button,
  href,
  images,
}: {
  bg: string
  title1?: string
  title2?: string
  year?: string
  heading: string
  desc: string
  button: string
  href?: string
  images: string[]
}) {
  return (
    <div className="w-full min-w-full shrink-0 snap-start px-0 sm:px-4 md:px-0 overflow-hidden">
      {/* --- MOBILE: Stack (ảnh trên, text dưới)
           --- DESKTOP: Grid 2 cột --- */}
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-0 items-stretch min-w-0">
        {/* Left Image Collage */}
        <div
          className={`relative h-[240px] sm:h-[280px] md:h-[340px] lg:h-[420px] bg-gradient-to-br ${bg} min-w-0 overflow-hidden`}
        >
          <div className="grid grid-cols-2 grid-rows-3 h-full w-full min-w-0">
            {images.map((image, i) => (
              <div key={i} className="relative overflow-hidden min-w-0">
                <img
                  src={image}
                  alt={`Art ${i + 1}`}
                  className="w-full h-full object-cover min-w-0"
                />
              </div>
            ))}
          </div>

          {/* Overlay Text */}
          {(title1 || title2 || year) && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-2 sm:px-3 md:px-4">
              <div className="text-center space-y-0.5 sm:space-y-1 md:space-y-2">
                {title1 && (
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-wide">
                    {title1}
                  </h3>
                )}
                {title2 && (
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-wide">
                    {title2}
                  </h3>
                )}
                {year && (
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mt-1 sm:mt-2">
                    {year}
                  </h3>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Text Section */}
        <div className="bg-white flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-16 py-6 sm:py-8 md:py-10 lg:py-12 min-h-[200px] sm:min-h-[240px] md:min-h-[280px] lg:min-h-0 min-w-0 overflow-hidden">
          <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 max-w-lg text-center lg:text-left w-full min-w-0">
            <h2 className="text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light leading-snug sm:leading-tight text-balance wrap-break-word">
              {heading}
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-foreground/60 leading-relaxed wrap-break-word">
              {desc}
            </p>
            <Button
              asChild={Boolean(href)}
              variant="outline"
              className="rounded-full border-foreground/30 w-full sm:w-auto px-4 sm:px-6 md:px-8 lg:px-10 py-2.5 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base bg-transparent hover:bg-foreground/5 active:scale-95 transition-all"
            >
              {href ? <Link href={href}>{button}</Link> : button}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

