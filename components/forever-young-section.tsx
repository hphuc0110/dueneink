"use client"

export function ForeverYoungSection() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden">
      {/* Left Image Collage */}
      <div className="grid grid-cols-2 gap-0 order-2 lg:order-1">
        {/* Cột trái */}
        <div className="flex flex-col gap-0">
          <img
            src="/img/3_2.webp"
            alt="Tattoo 1"
            className="w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover"
          />
          <img
            src="/img/3_5.webp"
            alt="Tattoo 2"
            className="w-full h-[150px] sm:h-[200px] object-cover"
          />
        </div>

        {/* Cột phải */}
        <div className="flex flex-col gap-0">
          <img
            src="/img/3_3.webp"
            alt="Tattoo 3"
            className="w-full h-[150px] sm:h-[200px] object-cover"
          />
          <img
            src="/img/3_4.webp"
            alt="Tattoo 4"
            className="w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover"
          />
        </div>
      </div>

      {/* Right Content */}
      <div className="flex flex-col justify-center bg-[#f5f5f0] px-6 py-12 sm:px-8 sm:py-16 md:px-12 md:py-20 lg:px-20 order-1 lg:order-2">
        <h2 className="mb-6 sm:mb-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight text-black">
          Forever
          <br />
          young
        </h2>
        <div className="space-y-3 sm:space-y-4 text-sm sm:text-base leading-relaxed text-gray-700 max-w-md">
          <p>
            Staying forever young is our core instinct — the only way to keep pace with a world that never stops changing.
          </p>
          <p>
            We evolve with every trend, yet never lose the spirit that started it all: curiosity, courage, and a love for
            creating what hasn't been seen before.
          </p>
        </div>
      </div>
    </section>
  )
}
