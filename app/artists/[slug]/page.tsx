import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { artistsList, getArtistBySlug } from "@/lib/artists-data"
import { ArtistGallery } from "@/components/artist-gallery"

export function generateStaticParams() {
  return artistsList.map((artist) => ({ slug: artist.slug }))
}

export default async function ArtistPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const artist = getArtistBySlug(slug)
  if (!artist) notFound()

  const title = artist.headerTitle ?? artist.name
  const galleryImages = artist.galleryImages ?? []

  return (
    <main className="min-h-screen bg-[#f5f3f0] pt-12 sm:pt-12">
      <Header />

      {/* Big centered header (e.g. BOSS) */}
      <section className="py-12 sm:py-16 md:py-20">
        <h1 className="text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-black">
          {title}
        </h1>
      </section>

      {/* Two columns: left = info, right = image */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
            {/* Left: text info */}
            <div className="space-y-6 sm:space-y-8 text-left">
              <div className="space-y-3">
                <p className="text-sm sm:text-base">
                  <span className="font-bold">Name:</span> {artist.profileName ?? artist.name}
                </p>
                {artist.age != null && (
                  <p className="text-sm sm:text-base">
                    <span className="font-bold">Age:</span> {artist.age}
                  </p>
                )}
                {artist.from && (
                  <p className="text-sm sm:text-base">
                    <span className="font-bold">From:</span> {artist.from}
                  </p>
                )}
              </div>
              {artist.about && (
                <div className="space-y-3">
                  <p className="font-bold text-sm sm:text-base">{artist.aboutLabel ?? "About him:"}</p>
                  <div className="text-sm sm:text-base leading-relaxed text-black whitespace-pre-wrap">
                    {artist.about}
                  </div>
                </div>
              )}
            </div>
            {/* Right: large image (rectangular - about her/him) */}
            <div className="relative w-full aspect-3/4 max-h-[520px] md:max-h-[600px] rounded-lg overflow-hidden">
              <Image
                src={artist.image}
                alt={artist.name}
                fill
                className="object-cover object-top"
                sizes="(min-width: 768px) 50vw, 100vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* View Gallery */}
      {galleryImages.length > 0 && (
        <section className="py-12 sm:py-16 md:py-20 border-t border-black/10">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-black mb-10 sm:mb-12">
              View Gallery
            </h2>

            <ArtistGallery images={galleryImages} artistName={artist.name} />

            <p className="text-center text-sm sm:text-base text-black/80 mt-10 sm:mt-12">
              See more at{" "}
              <Link href="/product" className="underline hover:no-underline">
                product
              </Link>{" "}
              or  {" "}
              <Link href="https://www.instagram.com/duene.inkstudio?igsh=eWlyMTJvNDMydGJ1" className="underline hover:no-underline">
                @duene.inkstudio
              </Link>{" "}
            </p>
          </div>
        </section>
      )}

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
