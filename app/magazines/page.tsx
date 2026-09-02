"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

interface MagazineArticle {
  id: string
  title: string
  content: string
  images: string[]
  createdAt: string
  updatedAt: string
}

export default function MagazinesPage() {
  const [magazines, setMagazines] = useState<MagazineArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMagazines()
  }, [])

  const fetchMagazines = async () => {
    try {
      const response = await fetch("/api/magazines")
      const data = await response.json()
      setMagazines(data)
    } catch (error) {
      console.error("Failed to fetch magazines:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen pt-12 sm:pt-12">
      <Header />
      <section className="py-12 sm:py-16 md:py-20 bg-[#f5f5f0]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Magazines
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
              Discover our latest articles and stories
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading...</p>
            </div>
          ) : magazines.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No articles yet.</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:gap-6 md:gap-8 lg:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {magazines.map((magazine) => (
                <article
                  key={magazine.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
                >
                  <Link href={`/magazines/${magazine.id}`} className="block relative w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px]">
                    <Image
                      src={magazine.images?.[0] || "/placeholder.jpg"}
                      alt={magazine.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                    {magazine.images && magazine.images.length > 1 && (
                      <div className="absolute top-2 right-2">
                        <span className="text-xs bg-black/50 text-white px-2 py-1 rounded">
                          +{magazine.images.length - 1} more
                        </span>
                      </div>
                    )}
                  </Link>
                  <div className="p-4 sm:p-6">
                    <Link href={`/magazines/${magazine.id}`}>
                      <h2 className="text-xl sm:text-2xl font-bold mb-2 line-clamp-2 hover:text-primary transition-colors cursor-pointer">
                        {magazine.title}
                      </h2>
                    </Link>
                    <p className="text-muted-foreground text-sm sm:text-base line-clamp-3 mb-4">
                      {magazine.content.replace(/\[IMAGE:\d+\]/g, "").trim()}
                    </p>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                      <span className="text-xs text-muted-foreground">
                        {new Date(magazine.createdAt).toLocaleDateString()}
                      </span>
                      <Link href={`/magazines/${magazine.id}`} className="w-full sm:w-auto">
                        <Button variant="outline" size="sm" className="w-full sm:w-auto">
                          Read More
                        </Button>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer imageSrc="/img/9.webp" />
    </main>
  )
}

