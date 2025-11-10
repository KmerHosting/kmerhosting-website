"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function CTA() {
  return (
    <section className="py-16 px-4 bg-white dark:bg-slate-900">
      <div className="max-w-5xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl p-8 md:p-12 bg-white dark:bg-slate-900">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 mb-8">
              Join hundreds of satisfied customers. Get your website online today.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://kmerhosting.com/customers/store/cpanel-shared-hosting">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-white font-semibold group w-full"
                  style={{ backgroundColor: "#128C7E" }}
                >
                  Start Now
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <a href="https://kmerhosting.com/customers/contact.php">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-white/50 dark:hover:bg-slate-700 font-semibold bg-transparent w-full"
                >
                  Contact Support
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
