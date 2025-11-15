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
        className="relative z-10 flex flex-col justify-between 
                   h-full px-4 py-6 sm:px-6 sm:py-8 md:px-12 md:py-12"
      >
        {/* Main Title */}
        <div className="flex flex-1 items-center justify-center">
          <h1
            className="font-[family-name:var(--font-display)] 
                       text-[3rem] sm:text-[4rem] md:text-[6rem] lg:text-[8rem] xl:text-[12rem]
                       font-bold leading-none text-white text-center
                       uppercase tracking-tight relative overflow-hidden opacity-0 animate-fade-in"
            style={{
              top: "0%",
              left: "40%",
              transform: "translate(-50%, -50%)",
              letterSpacing: "-0.02em",
              animationDelay: "0.2s",
              animationFillMode: "forwards",
            }}
          >
            <span className="inline-block ">DUENE INK</span>
          </h1>
        </div>

        {/* Bottom Content */}
        <div
          className="flex flex-col md:flex-row items-center md:items-end 
                     justify-between gap-4 sm:gap-6 w-full pb-4 sm:pb-0"
        >
          <p
            className="text-center md:text-left max-w-sm sm:max-w-md md:max-w-md 
                       text-sm sm:text-md leading-relaxed text-white 
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
                       w-full sm:w-auto px-5 py-3 sm:px-6 sm:py-4 md:px-8 md:py-6 
                       text-xs sm:text-sm md:text-base
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
