import Link from "next/link"
import { Button } from "@/components/ui/button"

export function AboutSection() {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="mb-8 sm:mb-12 md:mb-16 text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide animate-fade-in">
          ABOUT US
        </h2>

        <div
          className="mx-auto max-w-4xl animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 sm:gap-8">
            <div className="space-y-4 sm:space-y-5 md:space-y-6 text-sm sm:text-base leading-relaxed text-foreground/80">
              <p>
                This studio is more than a tattoo parlor — it is a crossroads
                where multiple worlds of art converge.
              </p>
              <p>
                Here, every artist carries their own past, one born from
                classical painting, another from animation, and others marked by
                modern design.
              </p>
              <p>
                Each piece bears the distinct fruit of its creator, so you will
                never find &quot;us&quot; replicated in any studio beyond these walls.
              </p>
            </div>

            <Link href="/experience" className="shrink-0">
              <Button
                variant="outline"
                className="rounded-full border-foreground/30 w-full sm:w-auto px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 text-sm sm:text-base bg-transparent hover:bg-foreground/5"
              >
                DISCOVER HOW
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
