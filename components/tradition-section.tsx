export function TraditionSection() {
  return (
    <section className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Left Image Collage */}
      <div className="relative min-h-[500px] bg-black lg:min-h-full">
        <div className="grid h-full grid-rows-2 gap-1">
          <div className="relative">
            <img
              src="/placeholder.svg?height=400&width=800"
              alt="Traditional tattoo work 1"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="relative">
            <img
              src="/placeholder.svg?height=400&width=800"
              alt="Traditional tattoo work 2"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex flex-col justify-center bg-[#f5f5f0] px-12 py-20 lg:px-20">
        <h2 className="mb-8 text-7xl font-light leading-tight">Tradition</h2>
        <div className="space-y-4 text-sm leading-relaxed text-gray-700">
          <p>But that doesn't mean we turn away from tradition or from our older clients.</p>
          <p>
            On the opposite — they are often the most captivating souls: timeless in age, yet endlessly young in spirit.
          </p>
          <p>
            They understand that beauty isn't only what adorns the skin, but what dares to live, to evolve, and to tell
            its story through art.
          </p>
        </div>
      </div>
    </section>
  )
}
