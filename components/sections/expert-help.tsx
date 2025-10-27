"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageCircle, Users, Ticket } from "lucide-react"

export function ExpertHelp() {
  return (
    <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <MessageCircle className="h-8 w-8 text-primary" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            {"24/7 Expert Support"}
          </h2>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {"Not knowing what to choose? Our support is here to help you make the right choice for your needs"}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/support/live-chat">
              <Button variant="outline" size="lg" className="min-w-[200px] bg-transparent px-8 py-6">
                <MessageCircle className="h-5 w-5 mr-2" />
                {"Live Chat"}
              </Button>
            </Link>

            <Link href="/support">
              <Button variant="outline" size="lg" className="min-w-[200px] bg-transparent px-8 py-6">
                <Ticket className="h-5 w-5 mr-2" />
                {"Open Ticket"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}