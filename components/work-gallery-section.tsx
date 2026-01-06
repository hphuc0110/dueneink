"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { tattoosList, digitalArtList, type TattooItem, type DigitalArtItem } from "@/lib/tattoos-data"

interface WorkGallerySectionProps {
  onItemSelect: (item: TattooItem | DigitalArtItem | null) => void
}

export function WorkGallerySection({ onItemSelect }: WorkGallerySectionProps) {
  const [tattoosMenuOpen, setTattoosMenuOpen] = useState(false)
  const [digitalArtMenuOpen, setDigitalArtMenuOpen] = useState(false)

  const handleItemClick = (item: TattooItem | DigitalArtItem) => {
    onItemSelect(item)
    setTattoosMenuOpen(false)
    setDigitalArtMenuOpen(false)
    // Scroll đến RecommendSection sau một chút delay để đảm bảo state đã update
    setTimeout(() => {
      const recommendSection = document.getElementById('recommend-section')
      if (recommendSection) {
        recommendSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }
  return (
    <section className="flex flex-col lg:flex-row h-full w-full bg-[#f5f3f0] relative z-0">
      {/* Left Content */}
      <div className="flex-1 pl-0.5 py-4 flex items-center">
        <div className="space-y-6 sm:space-y-8 md:space-y-10 w-full max-w-2xl mx-auto lg:mx-0 lg:ml-20">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-2 sm:mb-4 md:mb-6">
                WORK
                <br />
                <span className="font-bold">GALLERY</span>
              </h2>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed text-muted-foreground max-w-md">
                {
                  '"More than tattoos — we craft visual identities. Each stroke carries the discipline of fine art, the imagination of design, and the heartbeat of emotion."'
                }
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 md:gap-4">
              <DropdownMenu open={tattoosMenuOpen} onOpenChange={setTattoosMenuOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="lg"
                    className="group relative rounded-full w-full sm:w-auto px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 border-2 border-foreground hover:bg-foreground hover:text-background bg-transparent text-xs sm:text-sm md:text-base overflow-hidden touch-manipulation"
                  >
                    <span className="relative z-10 inline-block transition-all duration-300 group-hover:opacity-0 group-hover:-translate-x-2">
                      TATTOOS
                    </span>
                    <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 z-10 text-xs sm:text-sm">
                      SEE MORE
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="start" 
                  className="w-[calc(100vw-2rem)] sm:w-[420px] md:w-[480px] p-2 max-h-[70vh] overflow-y-auto"
                >
                  {tattoosList.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-1">
                      {tattoosList.map((tattoo, index) => (
                        <DropdownMenuItem 
                          key={tattoo.id} 
                          className="m-0 p-0 focus:bg-transparent dropdown-item-animate"
                          style={{ animationDelay: `${index * 50}ms` }}
                          onSelect={(e) => {
                            e.preventDefault()
                            handleItemClick(tattoo)
                          }}
                        >
                          <button
                            className="w-full px-3 sm:px-3 py-3 sm:py-2.5 text-xs sm:text-sm rounded-sm hover:bg-accent focus:bg-accent transition-all duration-200 flex items-center hover:translate-x-1 touch-manipulation min-h-[44px] sm:min-h-0 text-left"
                          >
                            {tattoo.name}
                          </button>
                        </DropdownMenuItem>
                      ))}
                    </div>
                  ) : (
                    <DropdownMenuItem disabled className="m-0">
                      Chưa có danh sách
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu open={digitalArtMenuOpen} onOpenChange={setDigitalArtMenuOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="lg"
                    className="group relative rounded-full w-full sm:w-auto px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 border-2 border-foreground hover:bg-foreground hover:text-background bg-transparent text-xs sm:text-sm md:text-base overflow-hidden touch-manipulation"
                  >
                    <span className="relative z-10 inline-block transition-all duration-300 group-hover:opacity-0 group-hover:-translate-x-2">
                      DIGITAL ART
                    </span>
                    <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 z-10 text-xs sm:text-sm">
                      SEE MORE
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="start" 
                  className="w-[calc(100vw-2rem)] sm:w-[420px] md:w-[480px] p-2 max-h-[70vh] overflow-y-auto"
                >
                  {digitalArtList.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-1">
                      {digitalArtList.map((art, index) => (
                        <DropdownMenuItem 
                          key={art.id} 
                          className="m-0 p-0 focus:bg-transparent dropdown-item-animate"
                          style={{ animationDelay: `${index * 50}ms` }}
                          onSelect={(e) => {
                            e.preventDefault()
                            handleItemClick(art)
                          }}
                        >
                          <button
                            className="w-full px-3 sm:px-3 py-3 sm:py-2.5 text-xs sm:text-sm rounded-sm hover:bg-accent focus:bg-accent transition-all duration-200 flex items-center hover:translate-x-1 touch-manipulation min-h-[44px] sm:min-h-0 text-left"
                          >
                            {art.name}
                          </button>
                        </DropdownMenuItem>
                      ))}
                    </div>
                  ) : (
                    <DropdownMenuItem disabled className="m-0">
                      Chưa có danh sách
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
        </div>
      </div>

      {/* Right Image */}
      <div className="relative w-full lg:w-1/2 min-h-[300px] sm:min-h-[400px] lg:min-h-[calc(100vh-80px)] order-1 lg:order-2 overflow-hidden">
        <Image
          src="/img/1.png"
          alt="Tattoo artists at work"
          fill
          className="object-cover"
        />
      </div>
    </section>
  )
}
