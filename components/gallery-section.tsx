"use client"

import { Button } from "@/components/ui/button"

export function GallerySection() {
  const tattooImages = [
    {
      src: "/img/6.webp",
      alt: "Floral tattoo design",
    },
    {
      src: "/img/7.webp",
      alt: "Vine tattoo design",
    },
    {
      src: "/img/8.webp",
      alt: "Branch tattoo design",
    },
  ]

  return (
    <section className="bg-[#f5f5f0] py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {tattooImages.map((image, index) => (
            <div
              key={index}
              className="space-y-5 flex flex-col items-center animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-shadow duration-500 w-auto ">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-auto h-[500px] object-cover rounded-xl transition-transform duration-700 ease-out bg-white/30 hover:scale-[1.05]"
                />
              </div>
              <Button
                variant="outline"
                className="rounded-full border border-black/20 px-8 py-2 bg-white text-sm font-medium hover:bg-black hover:text-white transition-all duration-300"
              >
                Power pants
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* CSS animation */}
      <style jsx>{`
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-up {
          animation: fade-up 0.8s ease forwards;
        }
      `}</style>
    </section>
  )
}
