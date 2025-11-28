import { Suspense, lazy } from "react"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import LoadingScreen from "@/components/loading-screen"
import { CardSkeleton } from "@/components/skeletons"

// Lazy load heavy components
const HostingTypes = lazy(() => import("@/components/hosting-types"))
const PanelOverview = lazy(() => import("@/components/panel-overview"))
const PricingSection = lazy(() => import("@/components/pricing-section"))
const Features = lazy(() => import("@/components/features"))
const BackendOverview = lazy(() => import("@/components/backend-overview"))
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
      <Suspense fallback={<LoadingScreen />}>
        <Hero />
      </Suspense>
      <Suspense fallback={<SkeletonLoader />}>
        <HostingTypes />
      </Suspense>
      <Suspense fallback={<SkeletonLoader />}>
        <PanelOverview />
      </Suspense>
      <Suspense fallback={<SkeletonLoader />}>
        <PricingSection />
      </Suspense>
      <Suspense fallback={<SkeletonLoader />}>
        <Features />
      </Suspense>
      <Suspense fallback={<SkeletonLoader />}>
        <BackendOverview />
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
