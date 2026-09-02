"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

interface MagazineArticle {
  id: string
  title: string
  content: string
  images: string[]
  createdAt: string
  updatedAt: string
}

export default function MagazineDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [magazine, setMagazine] = useState<MagazineArticle | null>(null)
  const [loading, setLoading] = useState(true)

  const renderArticleContent = (content: string, images: string[]) => {
    const parts = content.split(/(\[IMAGE:\d+\])/g)
    return parts.map((part, index) => {
      const imageMatch = part.match(/\[IMAGE:(\d+)\]/)
      if (imageMatch) {
        const imageIndex = parseInt(imageMatch[1])
        if (images[imageIndex]) {
          return (
            <div key={index} className="my-4 sm:my-6 md:my-8">
              <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] xl:h-[600px] rounded-lg overflow-hidden">
                <Image
                  src={images[imageIndex]}
                  alt={`${magazine?.title || "Article"} - Image ${imageIndex + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )
        }
        return null
      }
      if (part.trim()) {
        return (
          <p key={index} className="mb-3 sm:mb-4 text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-wrap">
            {part}
          </p>
        )
      }
      return null
    })
  }

  useEffect(() => {
    if (params.id) {
      fetchMagazine(params.id as string)
    }
  }, [params.id])

  const fetchMagazine = async (id: string) => {
    try {
      const response = await fetch(`/api/magazines?id=${id}`)
      if (response.ok) {
        const data = await response.json()
        setMagazine(data)
      } else {
        router.push("/magazines")
      }
    } catch (error) {
      console.error("Failed to fetch magazine:", error)
      router.push("/magazines")
    } finally {
      setLoading(false)
    }
  }

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

  if (!magazine) {
    return (
      <main className="min-h-screen pt-12 sm:pt-12">
        <Header />
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Article not found.</p>
          <Link href="/magazines">
            <Button>Back to Magazines</Button>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen pt-12 sm:pt-12">
      <Header />
      <article className="py-8 sm:py-12 md:py-16 lg:py-20 bg-[#f5f5f0]">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <Link href="/magazines">
            <Button variant="ghost" className="mb-4 sm:mb-6 text-sm sm:text-base">
              ← Back to Magazines
            </Button>
          </Link>

          <div className="bg-white rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 sm:p-6 md:p-8 lg:p-10">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
                {magazine.title}
              </h1>
              <div className="text-xs sm:text-sm text-muted-foreground mb-6 sm:mb-8">
                Published on {new Date(magazine.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none">
                {renderArticleContent(magazine.content, magazine.images || [])}
              </div>
            </div>
          </div>
        </div>
      </article>
      <Footer imageSrc="/img/9.webp" />
    </main>
  )
}

