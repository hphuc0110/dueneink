import { Button } from "@/components/ui/button"

export function ClientsSection() {
  return (
    <section className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Left Content */}
      <div className="flex flex-col justify-center bg-[#f5f5f0] px-12 py-20 lg:px-20">
        <h2 className="mb-8 text-6xl font-light leading-tight">
          OUR
          <br />
          CLIENTS:
        </h2>
        <div className="mb-8 space-y-4 text-sm leading-relaxed text-gray-700">
          <p>Our clients come from every walk of life — DJs, singers, writers, police officers, lawyers.</p>
          <p>Perhaps it's because we've never cared about the "what" — only the "why."</p>
          <p>
            If you see tattooing not as decoration but as expression — a language of emotion etched on skin — then you
            already belong here.
          </p>
          <p>Because at our studio, art doesn't choose people. People choose to live as art.</p>
        </div>
        <Button
          variant="outline"
          className="w-fit rounded-full border-black bg-transparent px-8 py-6 text-sm hover:bg-black hover:text-white transition-colors"
        >
          BOOK A CUSTOM DEMO
        </Button>
      </div>

      {/* Right Image */}
      <div className="relative min-h-[400px] lg:min-h-full">
        <img src="/placeholder.svg?height=800&width=800" alt="Client portrait" className="h-full w-full object-cover" />
      </div>
    </section>
  )
}
