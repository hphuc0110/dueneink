import Image from "next/image"
import { Button } from "@/components/ui/button"

export function RecommendSection() {
  const recommendations = [
    {
      id: 1,
      image: "/img/6.webp",
      alt: "Floral lower back tattoo",
    },
    {
      id: 2,
      image: "/img/7.webp",
      alt: "Dragon side body tattoo",
    },
    {
      id: 3,
      image: "/img/8.webp",
      alt: "Ornate arm tattoo",
    },
  ]

  return (
    <section className="py-20 bg-[#f5f3f0]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Recommend for You</h2>
          <p className="text-muted-foreground text-lg font-medium">{"We've selected these works based on artists you'll love."}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {recommendations.map((item) => (
            <div key={item.id} className="space-y-4">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                <Image src={item.image || "/img/2.webp"} alt={item.alt} fill className="object-cover" />
              </div>
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8 border-2 border-foreground hover:bg-foreground hover:text-background bg-transparent"
                >
                  Power pants
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
