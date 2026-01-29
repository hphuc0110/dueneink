"use client"

import { useState, type ReactNode } from "react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

const faqs: Array<{
  q: string
  a: string
  image?: string
  images?: { src: string; alt: string }[]
  mediaAfterBlock?: number
  imageWrapperClass?: string
  imagesWrapperClass?: string
}> = [
  {
    q: "1. Does Getting a Tattoo Hurt?",
    image: "/img/FAQ/1.jpg",
    mediaAfterBlock: 5,
    imageWrapperClass: "max-w-md center aspect-3/4",
    a: `**What Is a Tattoo?**
Before answering whether tattoos hurt, it helps to understand what a tattoo actually is. Tattooing is a form of art that uses needles to inject ink into the dermis, the second layer of the skin. Because the ink is placed beneath the surface, tattoos are generally permanent.

Nowadays, getting a tattoo is easier than ever, as society has become much more open-minded about body art. For most people today, the only real barriers to getting a tattoo are money… and the fear of pain.

**So, Does Getting a Tattoo Hurt?**
To put it simply… 
**Yes, it does.**

At its core, tattooing involves needles repeatedly penetrating the skin to deposit ink. With modern tattoo machines, the needle can puncture the skin about 10–15 times per second, and in some cases up to 80–100 times per second, at a depth of roughly 1.5 mm.

Many people describe the sensation as similar to having their skin continuously scratched or shaved. Others say it feels like a constant series of small needle pricks.

That said, the level of pain varies from person to person and depends on factors like tattoo placement, size, and individual pain tolerance.

**Factors That Affect How Painful a Tattoo Feels**
Several factors can influence how much pain you feel during a tattoo session:
- **Tattoo placement on the body:** Some areas are more sensitive to pain, such as the ribs, inner upper arm, the back of the legs, and areas close to the bone. Areas with more fat or muscle—like the outer upper arm, thighs, or glutes—are usually less painful.
- **Individual pain tolerance:** Everyone experiences pain differently. Some people feel more pain than others during a tattoo session. (But after about 7 hours, we’re all equal in pain.)
- **Tattoo size and design:** Larger and more detailed tattoos usually take more time to complete, which can make them more painful compared to smaller, simpler designs.
- **Tattoo artist’s technique:** An experienced and skilled tattoo artist can help minimize pain by using proper techniques and high-quality equipment.`,
  },
  {
    q: "2. How Long Does It Take for a Tattoo to Heal?",
    image: "/img/FAQ/2.jpg",
    mediaAfterBlock: 4,
    a: `**Stage 1: Initial Reaction (Days 1–4)**
During this time, the tattoo is usually covered with a protective wrap. After about one day, redness and swelling typically subside. While wrapped, the tattoo may release plasma and excess ink, which is completely normal and does not affect the tattoo or the ink quality.

**Stage 2: Itching (Days 5–14)**
The skin begins to form a dry, hard scab and may feel itchy. This is a normal sign that the skin is healing and regenerating.

**Stage 3: Peeling and Skin Regeneration (Weeks 2–4)**
The scabs gradually flake off, revealing new skin underneath. During this stage, the tattoo will start to look clearer and more defined.

**Stage 4: Full Recovery (1–3 Months)**
The deeper layers of skin continue to heal completely. The ink settles, and the tattoo’s colors become more stable, vibrant, and sharp.

Many people describe the sensation of getting tattooed as feeling like continuous scratching or scraping on the skin. Others say it feels like repeated needle pricks.

**[AFTERCARE GUIDE: HOW TO TAKE CARE OF YOUR NEW TATTOO]**
 Follow these steps to help your tattoo heal properly and keep the color looking great for a long time:

**1. First day after getting tattooed**
Keep the protective wrap on.

**2. The next 3 days**
Remove the wrap, gently rinse the tattoo with clean, room-temperature water, and apply the aftercare cream daily until it’s gone.
Note: If the wrap comes off early, that’s okay. You can remove it completely, but avoid friction, soap, and hot water. You can also come back to the studio and we’ll re-wrap it for you (re-wrapping fee: 10,000 VND per cm).

**3. Days 5–7 after the tattoo**
Continue avoiding soap and do not let hot water run directly over the tattoo.

**4. When the tattoo starts to peel**
You may feel some itching as new skin forms. This is normal, but please don’t scratch or rub the tattoo.

**5. For the first 5–7 days, avoid the following:**
- Alcohol (beer, liquor)
- Beef
- Water spinach (morning glory)
- Chicken skin
- Sticky rice and glutinous foods

**6. If you notice any unusual signs**
Such as excessive pain, severe swelling, or pus, please contact us immediately so we can support you in time.

**7. If you work out or play sports**
Avoid intense movement or exercise involving the freshly tattooed area for 5–7 days.

Thank you so much for choosing Duene!
If you need any further assistance, feel free to message us on Instagram @duene.inkstudio or contact our hotline at +84 962 414 222.`,
  },
  {
    q: "3. What Is Duene’s Warranty Policy?",
    a: `Duene offers a **lifetime warranty**. If your tattoo fades over time, you can book an appointment and come back to us for a **free touch-up**.`,
  },
  {
    q: "4. Do You Offer Tattoo Fixes or Cover-Ups?",
    images: [
      { src: "/img/COLORFIXTATTOO/CF1.webp", alt: "Before cover fix tattoo" },
      { src: "/img/COLORFIXTATTOO/CF2.webp", alt: "After cover fix tattoo" },
    ],
    mediaAfterBlock: 0,
    a: `Yes, we do cover-ups and tattoo corrections. You can message us on Instagram or Facebook Fanpage, or visit the studio in person to receive detailed and friendly consultation.

**We will:**
- Check the condition of your existing tattoo
- Advise you on the best option for fixing or covering it up
- Redesign the tattoo based on your preferred style and ideas.`,
  },
  {
    q: "5. Will the ink last over time?",
    image: "/img/FAQ/3.jpg",
    imageWrapperClass: "max-w-md aspect-3/4",
    mediaAfterBlock: 3,
    a: `At Duene, we only use high-quality tattoo inks from well-known brands such as **Intenze, Dynamic, Eternal, Solid Ink,** and more.

During the tattoo process, our artists work with slightly shallower needle depth to minimize skin trauma. We still make sure the tattoo looks clean, sharp, and fully saturated. Because of this technique, the tattoo may appear a little lighter after it fully heals. That’s completely normal. You can come back to Duene for 1–2 free touch-up sessions, and the tattoo will stay bold, long-lasting, and beautiful.

For color tattoos, the healed result may shift about 1–2 shades  compared to the original color. You’re always welcome to come back for a free touch-up to perfect the color.

Frequently Asked Question: Will the ink spread over time?
The answer is: Yes, it can—usually after about 3–5 years.

However, because Duene uses premium-quality inks and our artists tattoo at a controlled, shallow depth to protect the skin, the ink doesn’t penetrate too deeply into the skin layers. This helps minimize ink spreading, prevents the tattoo from turning bluish, and keeps the lines cleaner for longer.`,
  },
  {
    q: "6. Is the Tattoo Deposit Refundable?",
    a: `Tattoo deposits are **non-refundable**. Your deposit secures your appointment and covers the artist’s time for design preparation. If you cancel or choose not to continue your tattoo project, the deposit will not be refunded.`,
  },
]

/** Trong nội dung FAQ, dùng **chữ** để in đậm. Ví dụ: "Hello **world**" → Hello <strong>world</strong> */
function renderWithBold(str: string): ReactNode {
  const parts = str.split("**")
  if (parts.length === 1) return str
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-foreground">
        {part}
      </strong>
    ) : (
      part
    )
  )
}

function AnswerContent({
  text,
  image,
  images,
  mediaAfterBlock,
  imageWrapperClass,
  imagesWrapperClass,
}: {
  text: string
  image?: string
  images?: { src: string; alt: string }[]
  mediaAfterBlock?: number
  imageWrapperClass?: string
  imagesWrapperClass?: string
}) {
  const blocks = text.split(/\n\n+/)
  return (
    <div className="space-y-4">
      {blocks.map((block, i) => {
        const trimmed = block.trim()
        if (!trimmed) return null
        const isList = /^[-●]\s/m.test(trimmed) || /^\d+\.\s/m.test(trimmed)
        const lines = trimmed.split("\n")
        const shouldRenderMediaHere =
          typeof mediaAfterBlock === "number" && mediaAfterBlock === i
        return (
          <div key={i} className="space-y-1">
            {isList ? (
              <ul className="list-disc list-inside space-y-1 text-foreground/80">
                {lines.map((line, j) => (
                  <li key={j}>
                    {renderWithBold(
                      line.replace(/^[-●]\s*|\d+\.\s*/, "").trim() || line
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <>
                {lines.map((line, j) => {
                  const boldMatch = line.match(/^(.+?):\s*$/)
                  if (boldMatch && line.length < 80) {
                    return (
                      <p
                        key={j}
                        className="font-medium text-foreground mt-2 first:mt-0"
                      >
                        {renderWithBold(line)}
                      </p>
                    )
                  }
                  return (
                    <p key={j} className="text-foreground/80 leading-relaxed">
                      {renderWithBold(line)}
                    </p>
                  )
                })}
              </>
            )}

            {shouldRenderMediaHere && (image || (images && images.length > 0)) && (
              <div className="mt-4 space-y-3">
                {image && (
                  <div
                    className={cn(
                      "relative w-full rounded-lg overflow-hidden border border-black/10 bg-muted/30",
                      imageWrapperClass || "max-w-md aspect-4/3",
                    )}
                  >
                    <Image
                      src={image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 28rem"
                    />
                  </div>
                )}
                {images && images.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {images.map((img, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          "relative w-full rounded-lg overflow-hidden border border-black/10 bg-muted/30",
                          imagesWrapperClass || "aspect-3/4",
                        )}
                      >
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, 50vw"
                        />
                        <span className="absolute bottom-2 left-2 right-2 text-xs text-white/90 bg-black/50 px-2 py-1 rounded truncate">
                          {img.alt}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}
      {/* Nếu không cấu hình mediaAfterBlock, fallback: render media cuối cùng */}
      {typeof mediaAfterBlock !== "number" &&
        (image || (images && images.length > 0)) && (
          <div className="mt-4 space-y-3">
            {image && (
              <div
                className={cn(
                  "relative w-full rounded-lg overflow-hidden border border-black/10 bg-muted/30",
                  imageWrapperClass || "max-w-md aspect-4/3",
                )}
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 28rem"
                />
              </div>
            )}
            {images && images.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "relative w-full rounded-lg overflow-hidden border border-black/10 bg-muted/30",
                      imagesWrapperClass || "aspect-3/4",
                    )}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                    <span className="absolute bottom-2 left-2 right-2 text-xs text-white/90 bg-black/50 px-2 py-1 rounded truncate">
                      {img.alt}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
    </div>
  )
}

export default function FAQPage() {
  return (
    <main className="min-h-screen pt-12 sm:pt-12 bg-[#f5f5f0]">
      <Header />

      <section className="container mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            Frequently Asked Question
          </h1>
          <p className="mt-2 text-sm sm:text-base text-foreground/70">
            Please search some question that you need before contact us
          </p>

          <div className="mt-8 bg-white rounded-xl border border-black/10 shadow-sm p-2 sm:p-4">
            {faqs.length === 0 ? (
              <div className="p-4 sm:p-6 text-sm sm:text-base text-foreground/70">
                Chưa có nội dung FAQ. Bạn hãy gửi/paste danh sách câu hỏi từ file
                “FAQ DUENE (1).docx”, mình sẽ thêm vào ngay.
              </div>
            ) : (
              <FAQAccordion />
            )}
          </div>
        </div>
      </section>

      <Footer imageSrc="/img/9.webp" />
    </main>
  )
}

function FAQAccordion() {
  const [active, setActive] = useState<string | undefined>(undefined)

  const handleChange = (val: string) => {
    setActive(val)
    if (val && typeof window !== "undefined") {
      // Đợi Accordion mở rồi mới scroll, tránh giật layout
      window.requestAnimationFrame(() => {
        const el = document.querySelector<HTMLElement>(`[data-faq-id="${val}"]`)
        if (!el) return

        const HEADER_OFFSET = 80 // gần bằng chiều cao header
        const rect = el.getBoundingClientRect()
        const targetTop = rect.top + window.scrollY - HEADER_OFFSET

        window.scrollTo({
          top: targetTop,
          behavior: "smooth",
        })
      })
    }
  }

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      value={active}
      onValueChange={handleChange}
    >
      {faqs.map((item, idx) => {
        const value = `faq-${idx}`
        return (
          <AccordionItem
            key={value}
            value={value}
            data-faq-id={value}
            className="scroll-mt-24"
          >
            <AccordionTrigger className="text-left">
              {item.q}
            </AccordionTrigger>
            {item.a ? (
              <AccordionContent className="text-foreground/70">
                <AnswerContent
                  text={item.a}
                  image={item.image}
                  images={item.images}
                  mediaAfterBlock={item.mediaAfterBlock}
                  imageWrapperClass={item.imageWrapperClass}
                  imagesWrapperClass={item.imagesWrapperClass}
                />
              </AccordionContent>
            ) : (
              <AccordionContent className="text-foreground/70">
                {/* No answer provided in source file */}
              </AccordionContent>
            )}
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}


