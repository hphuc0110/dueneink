"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function Header() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/product", label: "Product" },
    { href: "/experience", label: "Experience" },
    { href: "#magazines", label: "Magazines" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <nav className="container mx-auto px-6 py-5">
        <ul className="flex items-center justify-end gap-8 text-sm">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href} className="relative">
                <Link
                  href={item.href}
                  className={cn(
                    "relative font-medium transition-all duration-300 ease-out",
                    "hover:text-foreground",
                    "after:absolute after:bottom-[-8px] after:left-0 after:h-[2px] after:w-0 after:bg-foreground after:transition-all after:duration-300",
                    "hover:after:w-full",
                    isActive ? "text-foreground after:w-full" : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
