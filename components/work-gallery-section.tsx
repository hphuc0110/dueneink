import Image from "next/image"
import { Button } from "@/components/ui/button"

export function WorkGallerySection() {
  return (
    <section className="py-20 bg-[#f5f3f0]">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-6xl lg:text-7xl  font-bold mb-8">
                Work
                <br />
                <span className="font-bold">GALLERY</span>
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground max-w-md">
                {
                  '"More than tattoos — we craft visual identities. Each stroke carries the discipline of fine art, the imagination of design, and the heartbeat of emotion."'
                }
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 border-2 border-foreground hover:bg-foreground hover:text-background bg-transparent"
              >
                TATTOOS
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 border-2 border-foreground hover:bg-foreground hover:text-background bg-transparent"
              >
                DIGITAL ART
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative w-[500px] h-[600px] rounded-2xl overflow-hidden">
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
