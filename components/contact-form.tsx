"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { toast } from "sonner"

interface ContactFormProps {
  onSuccess?: () => void
}

export function ContactForm({ onSuccess }: ContactFormProps) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [formData, setFormData] = useState({
    name: "",
    phoneOrInstagram: "",
    email: "",
    demoTiming: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.name.trim()) {
      toast.error("Please enter your name")
      return
    }

    if (!formData.email.trim()) {
      toast.error("Please enter your email")
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phoneOrInstagram: formData.phoneOrInstagram,
          email: formData.email,
          contactTimes: selectedInterests,
          demoTiming: formData.demoTiming,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit form")
      }

      toast.success("Thank you! We'll contact you soon.")
      
      // Reset form
      setFormData({
        name: "",
        phoneOrInstagram: "",
        email: "",
        demoTiming: "",
      })
      setSelectedInterests([])

      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      console.error("Form submission error:", error)
      toast.error("Something went wrong. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label className="text-sm text-foreground/80">Name</Label>
        <Input
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="rounded-xl border-foreground/20 bg-white h-10 focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10"
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-sm text-foreground/80"> Phone Number or Instagram</Label>
        <Input
          value={formData.phoneOrInstagram}
          onChange={(e) => setFormData({ ...formData, phoneOrInstagram: e.target.value })}
          className="rounded-xl border-foreground/20 bg-white h-10 focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10"
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-sm text-foreground/80">Work email</Label>
        <Input
          required
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="rounded-xl border-foreground/20 bg-white h-10 focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm text-foreground/80">When can I contact you?</Label>
        <div className="space-y-1.5">
          {["10H - 12H", "18H - 20H"].map((interest) => (
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

      <div className="space-y-1.5">
        <Label className="text-sm text-foreground/80">How soon do you want the demo?</Label>
        <Input
          value={formData.demoTiming}
          onChange={(e) => setFormData({ ...formData, demoTiming: e.target.value })}
          className="rounded-xl border-foreground/20 bg-white h-10 focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-foreground py-4 text-background hover:bg-foreground/90 transition-all duration-300 hover:scale-[1.02] mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>

      <p className="text-xs text-foreground/50 text-center">
        Your name and email address will be used to contact you about this inquiry.
      </p>
    </form>
  )
}

