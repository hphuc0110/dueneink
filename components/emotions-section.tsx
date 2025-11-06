export function EmotionsSection() {
  return (
    <section className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Left Content */}
      <div className="flex flex-col justify-center bg-[#f5f5f0] px-12 py-20 lg:px-20">
        <h2 className="mb-8 text-7xl font-light leading-tight">Emotions</h2>
        <div className="space-y-4 text-sm leading-relaxed text-gray-700">
          <p>We serve emotions — untouched by age or occupation.</p>
          <p>Because in this life, feelings are rarely heard and even more rarely treated.</p>
          <p>Here, therapy takes a different form: not through words, but through ink and art.</p>
        </div>
      </div>

      {/* Right Image Collage */}
      <div className="relative min-h-[500px] bg-black lg:min-h-full">
        <div className="grid h-full grid-cols-2 grid-rows-2 gap-1">
          <div className="relative row-span-2">
            <img
              src="/img/6.webp"
              alt="Tattoo session 1"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="relative">
            <img
              src="/placeholder.svg?height=400&width=400"
              alt="Tattoo session 2"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="relative">
            <img
              src="/placeholder.svg?height=400&width=400"
              alt="Tattoo session 3"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
