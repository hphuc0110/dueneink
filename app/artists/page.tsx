import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { artistsList } from "@/lib/artists-data"

export default function ArtistsPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f0] pt-12 sm:pt-12">
      <Header />
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12 md:mb-16">
            <p className="text-xs sm:text-sm tracking-[0.25em] uppercase text-gray-500 mb-3">
              about artist
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-light leading-tight">
              Meet the minds and hands <br className="hidden sm:block" />
              behind every piece of work at Duene.
            </h1>
          </div>

          <div className="grid gap-6 sm:gap-8 md:gap-10 md:grid-cols-2 lg:grid-cols-3">
            {artistsList.map((artist) => (
              <article
                key={artist.id}
                className="flex flex-col overflow-hidden bg-[#f5f3f0] rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <Link href={`/artists/${artist.slug}`} className="block">
                  <div className="relative w-full h-56 sm:h-60 md:h-64">
                    <Image
                      src={artist.image}
                      alt={artist.name}
                      fill
                      className="object-cover hover:scale-[1.03] transition-transform duration-300"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                </Link>
                <div className="p-5 sm:p-6 flex flex-col gap-2.5 sm:gap-3">
                  <h2 className="text-lg sm:text-xl font-semibold">{artist.name}</h2>
                  <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-gray-500">
                    {artist.role}
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-gray-700">{artist.style}</p>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3">
                    {artist.bio}
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full border border-black/40 w-full sm:w-auto mt-2"
                  >
                    <Link href={`/artists/${artist.slug}`}>View Gallery</Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer
        imageSrc="/img/2.webp"
        headingText={
          <>
            Ready for
            <br />
            your next piece?
          </>
        }
        buttonText="BOOK A SESSION"
        buttonLink="/"
      />
    </main>
  )
}

