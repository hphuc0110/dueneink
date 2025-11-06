"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef, useState, useEffect } from "react"

export function ArtDiscoverySection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const slides = [1, 2, 3, 4] // 👉 nếu thêm slide thì tăng mảng này

  // 👉 Hàm cuộn slide
  const scrollToIndex = (index: number) => {
    if (!scrollContainerRef.current) return
    const scrollAmount = scrollContainerRef.current.clientWidth * index
    scrollContainerRef.current.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    })
    setCurrentIndex(index)
  }

  const scroll = (dir: "left" | "right") => {
    const newIndex =
      dir === "left"
        ? (currentIndex - 1 + slides.length) % slides.length
        : (currentIndex + 1) % slides.length
    scrollToIndex(newIndex)
  }

  // 👉 Lắng nghe khi người dùng vuốt / cuộn ngang
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
    <section className="bg-[#f5f5f0] py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        {/* === SLIDER === */}
        <div
          ref={scrollContainerRef}
          className="flex gap-0 overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar touch-pan-x"
        >
          {/* --- SLIDE 1 --- */}
          <Slide
            bg="from-gray-900 to-gray-800"
            title1="The ARTSY"
            title2="VANGUARD"
            year="2026"
            heading="The Artsy Vanguard 2026"
            desc="Meet 10 artists moving culture forward."
            button="Explore Now"
          />

          {/* --- SLIDE 2 --- */}
            <Slide
              bg="from-blue-900 to-purple-800"
              title1="Discover"
              title2="Emerging"
              year="Artists"
              heading="Discover and Buy Art That Moves You"
              desc="Turn art into a daily habit. Follow artists, explore stories, and get personalized recommendations."
              button="Discover Now"
            />

            {/* --- SLIDE 3 --- */}
            <Slide
              bg="from-green-900 to-lime-800"
              title1="Discover"
              title2="Emerging"
              year="Artists"
              heading="Discover and Buy Art That Moves You"
              desc="Turn art into a daily habit. Follow artists, explore stories, and get personalized recommendations."
              button="Discover Now"
            />

            {/* --- SLIDE 4 --- */}
            <Slide
              bg="from-red-900 to-orange-800"
              title1="Discover"
              title2="Emerging"
              year="Artists"
              heading="Discover and Buy Art That Moves You"
              desc="Turn art into a daily habit. Follow artists, explore stories, and get personalized recommendations."
              button="Discover Now"
            />
        </div>

        {/* === NAVIGATION === */}
        <div className="flex flex-col items-center mt-10 space-y-4">
          {/* Thanh ngang (dot bar) */}
          <div className="flex w-full  h-1.5 bg-gray-300/50 opacity-70 rounded-full overflow-hidden">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                className={`flex-1 transition-all duration-500 ${
                  i === currentIndex ? "bg-black" : "bg-gray-400/40 hover:bg-gray-500/60"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Nút mũi tên — ẩn trên mobile */}
          <div className="hidden lg:flex justify-center gap-4 mt-4">
            <button
              onClick={() => scroll("left")}
              className="rounded-full border-2 border-foreground/20 p-3 hover:bg-foreground/5 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="rounded-full border-2 border-foreground/20 p-3 hover:bg-foreground/5 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
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
}: {
  bg: string
  title1: string
  title2: string
  year: string
  heading: string
  desc: string
  button: string
}) {
  return (
    <div className="min-w-full flex-shrink-0 snap-start">
      <div className="grid lg:grid-cols-2 gap-0 items-center">
        {/* Left */}
        <div className={`relative h-[350px] sm:h-[400px] bg-gradient-to-br ${bg}`}>
          <div className="grid grid-cols-2 grid-rows-3 h-full">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="relative overflow-hidden">
                <img
                  src={`/placeholder.svg?height=400&width=400&text=Art+${i + 1}`}
                  alt={`Art ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Overlay Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
            <div className="text-center space-y-2">
              <h3 className="text-4xl sm:text-5xl font-light tracking-wide">{title1}</h3>
              <h3 className="text-4xl sm:text-5xl font-light tracking-wide">{title2}</h3>
              <div className="border-2 border-white inline-block px-4 py-1 mt-2">
                <span className="text-sm tracking-widest">ART.SY</span>
              </div>
              <h3 className="text-5xl sm:text-6xl font-light mt-4">{year}</h3>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="bg-white h-[350px] sm:h-[400px] flex items-center justify-center px-6 sm:px-16">
          <div className="space-y-6 sm:space-y-8 max-w-lg text-center lg:text-left">
            <h2 className="text-3xl sm:text-5xl font-light leading-tight text-balance">{heading}</h2>
            <p className="text-base sm:text-xl text-foreground/60 leading-relaxed">{desc}</p>
            <Button
              variant="outline"
              className="rounded-full border-foreground/30 px-8 sm:px-12 py-4 sm:py-6 text-base bg-transparent hover:bg-foreground/5"
            >
              {button}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
