import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <Hero />
      <Footer />
    </main>
  )
}
