import { Header } from "@/components/header"
import { ClientsSection } from "@/components/clients-section"
import { ForeverYoungSection } from "@/components/forever-young-section"
import { EmotionsSection } from "@/components/emotions-section"
import { TraditionSection } from "@/components/tradition-section"
import { TransformSection } from "@/components/transform-section"
import { Footer } from "@/components/footer"

export default function ExperiencePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <ClientsSection />
      <ForeverYoungSection />
      <EmotionsSection />
      <TraditionSection />
      <TransformSection />
      <Footer 
        imageSrc="/img/7.webp"
        headingText={
          <>
            Start your
            <br />
            tattoo journey
          </>
        }
        buttonText="BOOK APPOINTMENT"
      />
    </main>
  )
}
