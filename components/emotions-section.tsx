export function EmotionsSection() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden">
      {/* Left Content */}
      <div className="flex flex-col justify-center bg-[#f5f5f0] px-6 py-12 sm:px-8 sm:py-16 md:px-12 md:py-20 lg:px-20">
        <h2 className="mb-6 sm:mb-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight">Emotions</h2>
        <div className="space-y-3 sm:space-y-4 text-sm sm:text-base leading-relaxed text-gray-700">
          <p>We serve emotions — untouched by age or occupation.</p>
          <p>Because in this life, feelings are rarely heard and even more rarely treated.</p>
          <p>Here, therapy takes a different form: not through words, but through ink and art.</p>
        </div>
      </div>

      {/* Right Image Collage */}
      <div className="grid grid-cols-2 gap-0">
        {/* Cột trái */}
        <div className="flex flex-col gap-0 overflow-hidden">
          <img
            src="/img/3_6.webp"
            alt="Tattoo 1"
            className="w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover"
          />
          <img
            src="/img/3_9.webp"
            alt="Tattoo 2"
            className="w-full h-[150px] sm:h-[200px] object-cover"
          />
        </div>

        {/* Cột phải */}
        <div className="flex flex-col gap-0">
          <img
            src="/img/3_7.webp"
            alt="Tattoo 3"
            className="w-full h-[150px] sm:h-[200px] object-cover"
          />
          <img
            src="/img/3_8.webp"
            alt="Tattoo 4"
            className="w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover"
          />
        </div>
      </div>
    </section>
  )
}
