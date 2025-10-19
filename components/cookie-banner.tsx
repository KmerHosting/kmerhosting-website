"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("kmerhosting-cookie-consent")
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const handleAcceptAll = () => {
    localStorage.setItem("kmerhosting-cookie-consent", "all")
    setShowBanner(false)
  }

  const handleDecline = () => {
    localStorage.setItem("kmerhosting-cookie-consent", "essential")
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <Card className="max-w-4xl mx-auto p-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-semibold mb-2">Cookie Preferences</h3>
            <p className="text-sm text-muted-foreground">
              We use cookies to enhance your browsing experience and analyze our traffic. By clicking "Accept All", you
              consent to our use of cookies. Read our{" "}
              <Link href="/cookies" className="text-accent hover:underline">
                Cookie Policy
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-accent hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button onClick={handleDecline} variant="outline" className="flex-1 sm:flex-none bg-transparent">
              Decline
            </Button>
            <Button onClick={handleAcceptAll} className="flex-1 sm:flex-none">
              Accept All
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
