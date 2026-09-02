"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Facebook, Instagram } from "lucide-react"
import { useRef, useState, useEffect } from "react"
import Link from "next/link"

const SOCIAL_STYLES: Record<
  string,
  { bg: string; label: string }
> = {
  Facebook: { bg: "bg-[#1877F2]", label: "Facebook" },
  Instagram: {
    bg: "bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737]",
    label: "Instagram",
  },
  TikTok: { bg: "bg-black", label: "Tiktok" },
}

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
    <section className="relative bg-[#f5f5f0] py-4 sm:py-6 md:py-8 lg:py-10 overflow-hidden">
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
            heading="Duene's products"
             desc="These are some of Duene's signature designs. We offer a wide range of tattoo styles, including realism, blackwork, color, cover-up, crayon, family, portrait, and even stupid tattoos."
            button="See products"
            href="/product"
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
            heading="Magazines's Duene"
            desc="These articles provide updates about the shop, us, and the stories behind the tattoos."
            button="See magazines"
            href="/magazines"
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
            bg="from-green-900 to-lime-800"
            socialLinks={[
              { name: "Facebook", url: "https://www.facebook.com/Duene.inktattoo" },
              { name: "Instagram", url: "https://www.instagram.com/duene.inkstudio?igsh=eWlyMTJvNDMydGJ1" },
              { name: "TikTok", url: "https://www.tiktok.com/@duene.studio?_r=1&_t=ZS-91B6tuiP1Dc" },
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

function SocialIcon({
  name,
  className = "size-4",
}: {
  name: string
  className?: string
}) {
  switch (name) {
    case "Facebook":
      return <Facebook className={className} />
    case "Instagram":
      return <Instagram className={className} />
    case "TikTok":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1.05-.08 6.33 6.33 0 00-6.33 6.33 6.33 6.33 0 0010.88 4.41 6.34 6.34 0 00.63-2.56v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
        </svg>
      )
    default:
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1.05-.08 6.33 6.33 0 00-6.33 6.33 6.33 6.33 0 0010.88 4.41 6.34 6.34 0 00.63-2.56v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
        </svg>
      )
  }
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
  socialLinks,
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
  socialLinks?: { name: string; url: string }[]
  images?: string[]
}) {
  const hasImages = images && images.length > 0
  const isSocialOnly = socialLinks && !hasImages

  return (
    <div className="w-full min-w-full shrink-0 snap-start px-0 sm:px-4 md:px-0 overflow-hidden">
      <div
        className={
          isSocialOnly
            ? "flex flex-col min-w-0"
            : "flex flex-col lg:grid lg:grid-cols-2 gap-0 items-stretch min-w-0"
        }
      >
        {/* Left Image Collage - ẩn khi chỉ có socials */}
        {hasImages && (
          <div
            className={`relative h-[240px] sm:h-[280px] md:h-[340px] lg:h-[420px] bg-gradient-to-br ${bg} min-w-0 overflow-hidden`}
          >
            <div className="grid grid-cols-2 grid-rows-3 h-full w-full min-w-0">
              {images!.map((image, i) => (
                <div key={i} className="relative overflow-hidden min-w-0">
                  <img
                    src={image}
                    alt={`Art ${i + 1}`}
                    className="w-full h-full object-cover min-w-0"
                  />
                </div>
              ))}
            </div>

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
        )}

        {/* Right Text Section / Full width khi chỉ có socials */}
        <div
          className={
            isSocialOnly
              ? "bg-white flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-16 py-8 sm:py-10 md:py-12 lg:py-16 min-w-0 overflow-hidden min-h-[70dvh] sm:min-h-[50vh] md:min-h-0"
              : "bg-white flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-16 py-6 sm:py-8 md:py-10 lg:py-12 min-h-[200px] sm:min-h-[240px] md:min-h-[280px] lg:min-h-0 min-w-0 overflow-hidden"
          }
        >
          <div
            className={`space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 w-full min-w-0 ${isSocialOnly ? "max-w-2xl text-center flex flex-col items-center" : "max-w-lg text-center lg:text-left"}`}
          >
            <h2 className="text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light leading-snug sm:leading-tight text-balance wrap-break-word">
              {heading}
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-foreground/60 leading-relaxed wrap-break-word">
              {desc}
            </p>
            {socialLinks ? (
              <div className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-8 w-full max-w-2xl mx-auto">
                {socialLinks.map((social) => {
                  const style = SOCIAL_STYLES[social.name] ?? {
                    bg: "bg-gray-600",
                    label: social.name,
                  }
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-2 sm:gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-foreground/30 rounded-2xl min-w-0 active:scale-[0.98] transition-transform"
                    >
                      <div
                        className={`flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl ${style.bg} text-white shadow-md group-hover:scale-105 group-active:scale-100 transition-transform touch-manipulation`}
                      >
                        <SocialIcon name={social.name} className="size-5 sm:size-6 md:size-7 lg:size-8" />
                      </div>
                      <span className="rounded-full px-2.5 py-1.5 sm:px-4 sm:py-2 bg-white border border-gray-200 text-black text-xs sm:text-sm font-medium whitespace-nowrap min-w-0 overflow-hidden text-ellipsis max-w-full">
                        {style.label}
                      </span>
                    </a>
                  )
                })}
              </div>
            ) : (
              <Button
                asChild={Boolean(href)}
                variant="outline"
                className="rounded-full border-foreground/30 w-full sm:w-auto px-4 sm:px-6 md:px-8 lg:px-10 py-2.5 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base bg-transparent hover:bg-foreground/5 active:scale-95 transition-all"
              >
                {href ? <Link href={href}>{button}</Link> : button}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

