"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ContactForm } from "@/components/contact-form"

interface ContactFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ContactFormDialog({ open, onOpenChange }: ContactFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl sm:text-3xl font-bold">
            See the difference
          </DialogTitle>
          <p className="text-sm text-foreground/70 mt-2">
            Tell us a bit about your needs, and we'll tailor a demo for you.
          </p>
        </DialogHeader>
        <div className="mt-4">
          <ContactForm
            onSuccess={() => {
              // Close dialog after successful submission
              setTimeout(() => {
                onOpenChange(false)
              }, 1000)
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

