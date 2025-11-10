"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export function ContactFormSection() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [selectedDemo, setSelectedDemo] = useState<string>("")

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    )
  }

  return (
    <section className="bg-[#fefdf8] py-10 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-2 items-start">
          {/* Left: Heading */}
          <div className="animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              See the
              <br />
              difference
            </h2>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-foreground/70">
              Tell us a bit about your needs, and we'll tailor
              <br className="hidden sm:block" />a demo for you.
            </p>
          </div>

          {/* Right: Form */}
          <div className="space-y-4 animate-fade-in-up animation-delay-200">
            <div className="space-y-1.5">
              <Label className="text-sm text-foreground/80">Name</Label>
              <Input className="rounded-xl border-foreground/20 bg-white h-10 focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10" />
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm text-foreground/80">Company or organization</Label>
              <Input className="rounded-xl border-foreground/20 bg-white h-10 focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10" />
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm text-foreground/80">Work email</Label>
              <Input
                type="email"
                className="rounded-xl border-foreground/20 bg-white h-10 focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-foreground/80">What are you most interested in?</Label>
              <div className="space-y-1.5">
                {["Our services/products", "Pricing and packages", "How we can help your business"].map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-300 ${
                      selectedInterests.includes(interest)
                        ? "bg-[#d4d9c8] border-[#c5cbb8]"
                        : "bg-[#e8ebe0] border-[#dde0d4] hover:bg-[#dfe3d6]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                          selectedInterests.includes(interest)
                            ? "border-foreground/60 bg-foreground/10"
                            : "border-foreground/30"
                        }`}
                      >
                        {selectedInterests.includes(interest) && (
                          <svg
                            className="w-3 h-3 text-foreground/70"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm text-foreground/80">{interest}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-foreground/80">Do you want to schedule a 30-minute demo?</Label>
              <div className="space-y-1.5">
                {["Yes, please reach out to schedule it", "No, please just email me more information"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSelectedDemo(option)}
                    className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-300 ${
                      selectedDemo === option
                        ? "bg-[#d4d9c8] border-[#c5cbb8]"
                        : "bg-[#e8ebe0] border-[#dde0d4] hover:bg-[#dfe3d6]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          selectedDemo === option ? "border-foreground/60" : "border-foreground/30"
                        }`}
                      >
                        {selectedDemo === option && <div className="w-2 h-2 rounded-full bg-foreground/70" />}
                      </div>
                      <span className="text-sm text-foreground/80">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <Button className="w-full rounded-full bg-foreground py-4 text-background hover:bg-foreground/90 transition-all duration-300 hover:scale-[1.02] mt-4">
              Submit
            </Button>

            <p className="text-xs text-foreground/50 text-center">
              Your name and email address will be used to contact you about this inquiry.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
