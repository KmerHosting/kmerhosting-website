import { Suspense, lazy } from "react"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import { CardSkeleton } from "@/components/skeletons"

// Lazy load heavy components
const HostingTypes = lazy(() => import("@/components/hosting-types"))
const PricingSection = lazy(() => import("@/components/pricing-section"))
const Features = lazy(() => import("@/components/features"))
const CTA = lazy(() => import("@/components/cta"))
const Footer = lazy(() => import("@/components/footer"))

function SkeletonLoader() {
  return (
    <div className="space-y-8 px-4 py-12">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  )
}

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <Hero />
      <Suspense fallback={<SkeletonLoader />}>
        <HostingTypes />
      </Suspense>
      <Suspense fallback={<SkeletonLoader />}>
        <PricingSection />
      </Suspense>
      <Suspense fallback={<SkeletonLoader />}>
        <Features />
      </Suspense>
      <Suspense fallback={<SkeletonLoader />}>
        <CTA />
      </Suspense>
      <Suspense fallback={<SkeletonLoader />}>
        <Footer />
      </Suspense>
    </main>
  )
}
