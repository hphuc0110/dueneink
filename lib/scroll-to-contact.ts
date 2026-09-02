/**
 * Utility function to scroll to contact form or navigate to it
 * If on home page, scrolls to the contact form section
 * If on other pages, navigates to home page with contact form hash
 */
export function scrollToContactForm() {
  // Check if we're on the home page
  if (typeof window !== "undefined") {
    const isHomePage = window.location.pathname === "/"
    
    if (isHomePage) {
      // Update URL hash first
      window.history.pushState(null, "", "#contact-form")
      
      // Small delay to ensure DOM is ready, especially on mobile
      const delay = window.innerWidth < 640 ? 200 : 50
      
      setTimeout(() => {
        const contactForm = document.getElementById("contact-form")
        if (contactForm) {
          // Get actual header height by finding the header element
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
          }, 500)
        }
      }, delay)
    } else {
      // Navigate to home page with contact form hash
      window.location.href = "/#contact-form"
    }
  }
}

