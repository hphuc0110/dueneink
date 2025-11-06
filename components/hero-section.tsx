import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/img/5.webp"
          alt="Tattoo healing process"
          className="h-full w-full object-cover animate-scale-in"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div
        className="relative z-10 flex h-full flex-col justify-between 
                   px-6 py-8 md:px-12 md:py-12"
      >
        {/* Main Title */}
        <div className="flex-1 flex items-center justify-center md:justify-start">
  <h1
    className="font-[family-name:var(--font-display)] 
               text-[4rem] sm:text-[6rem] md:text-[9rem] lg:text-[12rem]
               font-bold leading-none text-white text-center md:text-left
               uppercase tracking-tight relative overflow-hidden"
    style={{
      letterSpacing: "-0.02em",
    }}
  >
    <span className="animate-typewriter inline-block whitespace-nowrap overflow-hidden border-r-4 border-white pr-2">
      DUENE INK
    </span>
  </h1>
</div>


        {/* Bottom Content */}
        <div
          className="flex flex-col md:flex-row items-center md:items-end 
                     justify-between gap-6 w-full"
        >
          <p
            className="text-center md:text-left max-w-sm md:max-w-md 
                       text-xs sm:text-sm leading-relaxed text-white 
                       animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            The generation that uses tattoos to heal
            <br />
            emotional wounds in this era.
          </p>

          <Button
            variant="outline"
            className="rounded-full border-white bg-transparent 
                       px-6 py-4 sm:px-8 sm:py-6 text-sm sm:text-base
                       text-white hover:bg-white hover:text-black 
                       transition-all duration-300 hover:scale-105 animate-slide-up"
            style={{ animationDelay: "0.6s" }}
          >
            BOOKING NOW
          </Button>
        </div>
      </div>
    </section>
  )
}
