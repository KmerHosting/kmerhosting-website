"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

export default function PanelOverview() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const panels = [
    { image: "/panels-overview/cPanel1.png", alt: "cPanel 1" },
    { image: "/panels-overview/cPanel2.webp", alt: "cPanel 2" },
    { image: "/panels-overview/DA1.png", alt: "DirectAdmin 1" },
    { image: "/panels-overview/DA2.png", alt: "DirectAdmin 2" },
    { image: "/panels-overview/DA3.png", alt: "DirectAdmin 3" },
    { image: "/panels-overview/DA4.png", alt: "DirectAdmin 4" },
    { image: "/panels-overview/DA5.png", alt: "DirectAdmin 5" },
    { image: "/panels-overview/DA6.png", alt: "DirectAdmin 6" },
    { image: "/panels-overview/DA7.png", alt: "DirectAdmin 7" },
    { image: "/panels-overview/DA8.png", alt: "DirectAdmin 8" },
  ]

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % panels.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + panels.length) % panels.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <section className="py-16 px-4 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-slate-900 dark:text-white">
            Control Panel Overview
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Choose between cPanel or DirectAdmin - both powerful and user-friendly
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Desktop View - Show 2 images */}
          <div className="hidden md:block">
            <div className="grid grid-cols-2 gap-8">
              {[currentIndex, (currentIndex + 1) % panels.length].map((index) => (
                <div key={index} className="relative h-96 overflow-hidden rounded-lg shadow-lg bg-slate-100 dark:bg-slate-800">
                  <Image
                    src={panels[index].image}
                    alt={panels[index].alt}
                    fill
                    className="object-cover"
                    quality={85}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile View - Show 1 image */}
          <div className="md:hidden">
            <div className="relative h-80 overflow-hidden rounded-lg shadow-lg bg-slate-100 dark:bg-slate-800">
              <Image
                src={panels[currentIndex].image}
                alt={panels[currentIndex].alt}
                fill
                className="object-cover"
                quality={85}
              />
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 md:-translate-x-16 z-10 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-8 h-8 text-slate-700 dark:text-slate-300" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 md:translate-x-16 z-10 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-8 h-8 text-slate-700 dark:text-slate-300" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {panels.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-primary w-8"
                  : "bg-slate-300 dark:bg-slate-600 w-2 hover:bg-slate-400 dark:hover:bg-slate-500"
              }`}
              style={index === currentIndex ? { backgroundColor: "#128C7E" } : {}}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
