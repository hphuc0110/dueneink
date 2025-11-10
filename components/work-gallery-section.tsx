import Image from "next/image"
import { Button } from "@/components/ui/button"

export function WorkGallerySection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-[#f5f3f0]">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8">
                Work
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
              <Button
                variant="outline"
                size="lg"
                className="rounded-full w-full sm:w-auto px-6 sm:px-8 border-2 border-foreground hover:bg-foreground hover:text-background bg-transparent text-sm sm:text-base"
              >
                TATTOOS
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full w-full sm:w-auto px-6 sm:px-8 border-2 border-foreground hover:bg-foreground hover:text-background bg-transparent text-sm sm:text-base"
              >
                DIGITAL ART
              </Button>
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
