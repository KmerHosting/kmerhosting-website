"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Typewriter } from "@/components/typewriter"

export default function Hero() {
  const taglines = [
    "Reliable web hosting built for Cameroonians",
    "Fast hosting with lightning-speed performance",
    "24/7 Support in English & French",
    "Free domain and SSL certificate included",
    "99.9% uptime guarantee",
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 px-4 py-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#128C7E" }}></div>
            <span className="text-sm font-semibold min-h-6" style={{ color: "#128C7E" }}>
              <Typewriter phrases={taglines} speed={40} deleteSpeed={20} delayBetween={2500} />
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight text-pretty text-slate-900 dark:text-white">
            Cloud made simpler, faster, and more secure.
            <span className="block" style={{ color: "#128C7E" }}>
              in Cameroon
            </span>
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Experience lightning-fast web hosting powered by cPanel and DirectAdmin. Whether you're starting your first
            website or managing multiple domains, KmerHosting has the perfect plan for you.
          </p>

          <div className="flex gap-4 pt-4">
            <a href="#">
              <Button size="lg" variant="outline" className="cursor-pointer hover:bg-[#128C7E] hover:!text-white transition-all px-10 py-7 text-base font-semibold border-2" style={{ color: "#128C7E", borderColor: "#128C7E" }}>
                Try for Free
              </Button>
            </a>
          </div>

          <div className="flex gap-8 pt-8 text-sm">
            <div>
              <div className="font-bold text-xl" style={{ color: "#128C7E" }}>
                99.9%
              </div>
              <div className="text-slate-600 dark:text-slate-400">Uptime Guarantee</div>
            </div>
            <div>
              <div className="font-bold text-xl" style={{ color: "#128C7E" }}>
                24/7 (En & Fr)
              </div>
              <div className="text-slate-600 dark:text-slate-400">Support</div>
            </div>
            <div>
              <div className="font-bold text-xl" style={{ color: "#128C7E" }}>
                Free Domain + SSL
              </div>
              <div className="text-slate-600 dark:text-slate-400">All Plans</div>
            </div>
          </div>
        </div>

        <div className="relative h-96 md:h-full flex items-center justify-center">
          <div className="absolute w-64 h-64 rounded-3xl opacity-10" style={{ backgroundColor: "#128C7E" }}></div>
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-white3-iwSBPyXwwEwkqAnSXqbITic8Ldae9l.png"
            alt="KmerHosting Logo"
            width={400}
            height={300}
            className="relative z-10"
          />
        </div>
      </div>
    </div>
  )
}
