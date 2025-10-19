"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "E-commerce Owner",
    content:
      "Switching to KmerHosting was the best decision for my online store. The speed improvement was immediate, and their support team is incredibly responsive.",
    rating: 5,
    initials: "SJ",
  },
  {
    name: "Michael Chen",
    role: "Web Developer",
    content:
      "As a developer, I appreciate the technical features like SSH access, Git integration, and support for multiple languages. The platform is robust and reliable.",
    rating: 5,
    initials: "MC",
  },
  {
    name: "Emma Williams",
    role: "Blogger",
    content:
      "I've been hosting my WordPress blog with KmerHosting for over a year. The automatic backups and updates give me peace of mind to focus on creating content.",
    rating: 5,
    initials: "EW",
  },
]

export function Testimonials() {
  return (
    <section className="py-20 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Trusted by thousands of customers</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            See what our customers have to say about their experience with KmerHosting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-sm text-muted-foreground mb-6">{testimonial.content}</p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{testimonial.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-sm">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
