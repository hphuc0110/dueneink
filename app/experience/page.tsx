import { Header } from "@/components/header"
import { ClientsSection } from "@/components/clients-section"
import { ForeverYoungSection } from "@/components/forever-young-section"
import { EmotionsSection } from "@/components/emotions-section"
import { TraditionSection } from "@/components/tradition-section"
import { Footer } from "@/components/footer"

export default function ExperiencePage() {
  return (
    <main className="min-h-screen pt-12 sm:pt-12">
      <Header />
      <ClientsSection />
      <ForeverYoungSection />
      <EmotionsSection />
      <TraditionSection />
      <Footer 
        imageSrc="/img/3_13.webp"
        headingText={
          <>
            Transform your
            <br />
            workflow today
          </>
        }
        buttonText="BOOK A DEMO"
      />
    </main>
  )
}
