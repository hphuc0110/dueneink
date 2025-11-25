"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { digitalArtList, type DigitalArtItem } from "@/lib/tattoos-data"

export default function DigitalArtGalleryPage() {
  const params = useParams()
  const [art, setArt] = useState<DigitalArtItem | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      const foundArt = digitalArtList.find((a) => a.id === params.id)
      if (foundArt) {
        setArt(foundArt)
      }
      setLoading(false)
    }
  }, [params.id])

  if (loading) {
    return (
      <main className="min-h-screen pt-12 sm:pt-12">
        <Header />
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </main>
    )
  }

  if (!art) {
    return (
      <main className="min-h-screen pt-12 sm:pt-12">
        <Header />
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Không tìm thấy digital art.</p>
          <Link href="/product">
            <Button>Quay lại Product</Button>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen pt-12 sm:pt-12">
      <Header />
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-[#f5f5f0]">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <Link href="/product">
            <Button variant="ghost" className="mb-4 sm:mb-6 text-sm sm:text-base">
              ← Quay lại Product
            </Button>
          </Link>

          {art.images && art.images.length > 0 ? (
            <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {art.images.map((imageSrc, index) => (
                <div
                  key={index}
                  className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <Image
                    src={imageSrc}
                    alt={`${art.name} - Image ${index + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Chưa có hình ảnh.</p>
            </div>
          )}
        </div>
      </section>
      <Footer imageSrc="/img/2.webp" />
    </main>
  )
}

