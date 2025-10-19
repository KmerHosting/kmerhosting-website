import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"
import { Hero } from "@/components/sections/hero"
import { Features } from "@/components/sections/features"
import { HostingTypes } from "@/components/sections/hosting-types"
import { WhyChooseUs } from "@/components/sections/why-choose-us"
import { Testimonials } from "@/components/sections/testimonials"
import { CTA } from "@/components/sections/cta"

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <HostingTypes />
        <WhyChooseUs />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
      <CookieBanner />
    </>
  )
}
