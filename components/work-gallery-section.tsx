"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { tattoosList, digitalArtList } from "@/lib/tattoos-data"

export function WorkGallerySection() {
  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-[#f5f3f0]">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8 order-2 lg:order-1">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-4 sm:mb-6 md:mb-8">
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
              <DropdownMenu>
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
                      Xem thêm
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
                          asChild 
                          className="m-0 p-0 focus:bg-transparent dropdown-item-animate"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <Link 
                            href={`/product/tattoos/${tattoo.id}`}
                            className="w-full px-3 sm:px-3 py-3 sm:py-2.5 text-xs sm:text-sm rounded-sm hover:bg-accent focus:bg-accent transition-all duration-200 flex items-center hover:translate-x-1 touch-manipulation min-h-[44px] sm:min-h-0"
                          >
                            {tattoo.name}
                          </Link>
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

              <DropdownMenu>
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
                      Xem thêm
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
                          asChild 
                          className="m-0 p-0 focus:bg-transparent dropdown-item-animate"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <Link 
                            href={`/product/digital-art/${art.id}`}
                            className="w-full px-3 sm:px-3 py-3 sm:py-2.5 text-xs sm:text-sm rounded-sm hover:bg-accent focus:bg-accent transition-all duration-200 flex items-center hover:translate-x-1 touch-manipulation min-h-[44px] sm:min-h-0"
                          >
                            {art.name}
                          </Link>
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

          {/* Right Image */}
          <div className="relative w-full lg:w-[500px] h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden order-1 lg:order-2">
            <Image
              src="/img/1.png"
              alt="Tattoo artists at work"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
