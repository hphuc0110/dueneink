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
    <section className="py-12 sm:py-16 md:py-20 bg-[#f5f3f0]">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8">
                WORK
                <br />
                <span className="font-bold">GALLERY</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground max-w-md">
                {
                  '"More than tattoos — we craft visual identities. Each stroke carries the discipline of fine art, the imagination of design, and the heartbeat of emotion."'
                }
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full w-full sm:w-auto px-6 sm:px-8 border-2 border-foreground hover:bg-foreground hover:text-background bg-transparent text-xs sm:text-base"
                  >
                    TATTOOS
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="start" 
                  className="w-[280px] sm:w-[420px] md:w-[480px] p-2"
                >
                  {tattoosList.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                      {tattoosList.map((tattoo, index) => (
                        <DropdownMenuItem 
                          key={tattoo.id} 
                          asChild 
                          className="m-0 p-0 focus:bg-transparent dropdown-item-animate"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <Link 
                            href={`/product/tattoos/${tattoo.id}`}
                            className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-sm hover:bg-accent focus:bg-accent transition-all duration-200 flex items-center hover:translate-x-1"
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
                    className="rounded-full w-full sm:w-auto px-6 sm:px-8 border-2 border-foreground hover:bg-foreground hover:text-background bg-transparent text-sm sm:text-base"
                  >
                    DIGITAL ART
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="start" 
                  className="w-[280px] sm:w-[420px] md:w-[480px] p-2"
                >
                  {digitalArtList.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                      {digitalArtList.map((art, index) => (
                        <DropdownMenuItem 
                          key={art.id} 
                          asChild 
                          className="m-0 p-0 focus:bg-transparent dropdown-item-animate"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <Link 
                            href={`/product/digital-art/${art.id}`}
                            className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-sm hover:bg-accent focus:bg-accent transition-all duration-200 flex items-center hover:translate-x-1"
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
          <div className="relative w-full lg:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-xl sm:rounded-2xl overflow-hidden order-1 lg:order-2">
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
