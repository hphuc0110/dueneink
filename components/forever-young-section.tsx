export function ForeverYoungSection() {
  return (
    <section className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Left Image Collage */}
      <div className="relative min-h-[500px] bg-black lg:min-h-full">
        <div className="grid h-full grid-rows-3 gap-1">
          <div className="relative">
            <img
              src="/placeholder.svg?height=300&width=600"
              alt="Tattoo work 1"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="relative">
            <img
              src="/placeholder.svg?height=300&width=600"
              alt="Tattoo work 2"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="relative">
            <img
              src="/placeholder.svg?height=300&width=600"
              alt="Tattoo work 3"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex flex-col justify-center bg-[#f5f5f0] px-12 py-20 lg:px-20">
        <h2 className="mb-8 text-7xl font-light leading-tight">
          Forever
          <br />
          young
        </h2>
        <div className="space-y-4 text-sm leading-relaxed text-gray-700">
          <p>
            Staying forever young is our core instinct — the only way to keep pace with a world that never stops
            changing.
          </p>
          <p>
            We begin with every trend, yet never lose the spirit that started it all: curiosity, courage, and a love for
            creating what hasn't been seen before.
          </p>
        </div>
      </div>
    </section>
  )
}
