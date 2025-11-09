import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import HostingTypes from "@/components/hosting-types"
import PricingSection from "@/components/pricing-section"
import Features from "@/components/features"
import CTA from "@/components/cta"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <Hero />
      <HostingTypes />
      <PricingSection />
      <Features />
      <CTA />
      <Footer />
    </main>
  )
}
