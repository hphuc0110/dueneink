import { Button } from "@/components/ui/button"

export function TransformSection() {
  return (
    <section className="relative h-[600px] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/placeholder.svg?height=600&width=1920"
          alt="Transform background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-between px-12 lg:px-20">
        <h2 className="text-7xl font-light leading-tight text-white">
          Transform your
          <br />
          workflow today
        </h2>
        <Button
          variant="outline"
          className="rounded-full border-white bg-transparent px-8 py-6 text-white hover:bg-white hover:text-black transition-colors"
        >
          BOOK A DEMO
        </Button>
      </div>
    </section>
  )
}
