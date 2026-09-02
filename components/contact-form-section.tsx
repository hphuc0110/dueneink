"use client"

import { useEffect } from "react"
import { ContactForm } from "@/components/contact-form"

export function ContactFormSection() {

  // Scroll to contact form if hash is present in URL
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#contact-form") {
      // Longer delay on mobile to ensure DOM is fully ready
      const delay = window.innerWidth < 640 ? 400 : 200
      
      setTimeout(() => {
        const contactForm = document.getElementById("contact-form")
        if (contactForm) {
          // Get actual header height
          const header = document.querySelector("header")
          const headerHeight = header ? header.offsetHeight : (window.innerWidth >= 640 ? 80 : 60)
          
          // Calculate scroll position
          const elementTop = contactForm.getBoundingClientRect().top
          const currentScroll = window.pageYOffset || document.documentElement.scrollTop
          const targetScroll = elementTop + currentScroll - headerHeight
          
          // Use window.scrollTo for better mobile support
          window.scrollTo({
            top: Math.max(0, targetScroll),
            behavior: "smooth"
          })
          
          // Double-check after scroll completes (especially for mobile)
          setTimeout(() => {
            const finalPosition = contactForm.getBoundingClientRect().top + window.pageYOffset - headerHeight
            const currentPosition = window.pageYOffset || document.documentElement.scrollTop
            
            // If we're not close enough, try again with scrollIntoView as fallback
            if (Math.abs(currentPosition - finalPosition) > 100) {
              contactForm.scrollIntoView({ behavior: "smooth", block: "start" })
            }
          }, 600)
        }
      }, delay)
    }
  }, [])

  return (
    <section id="contact-form" className="bg-[#fefdf8] py-10 sm:py-12 md:py-16">
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
          <div className="animate-fade-in-up animation-delay-200">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
