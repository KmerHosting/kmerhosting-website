"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
    functional: false,
  })

  useEffect(() => {
    const consent = localStorage.getItem("kmerhosting-cookie-consent")
    if (!consent) {
      setShowBanner(true)
    } else {
      // Load existing preferences if they exist
      const preferences = localStorage.getItem("kmerhosting-cookie-preferences")
      if (preferences) {
        setCookiePreferences(JSON.parse(preferences))
      }
    }

    // Listen for custom event to show banner
    const handleShowBanner = () => {
      setShowBanner(true)
    }
    window.addEventListener('showCookieBanner', handleShowBanner)

    return () => {
      window.removeEventListener('showCookieBanner', handleShowBanner)
    }
  }, [])

  const handleAcceptAll = () => {
    const allPreferences = {
      essential: true,
      analytics: true,
      marketing: true,
      functional: true,
    }
    setCookiePreferences(allPreferences)
    localStorage.setItem("kmerhosting-cookie-consent", "all")
    localStorage.setItem("kmerhosting-cookie-preferences", JSON.stringify(allPreferences))
    setShowBanner(false)
  }

  const handleDecline = () => {
    const essentialOnly = {
      essential: true,
      analytics: false,
      marketing: false,
      functional: false,
    }
    setCookiePreferences(essentialOnly)
    localStorage.setItem("kmerhosting-cookie-consent", "essential")
    localStorage.setItem("kmerhosting-cookie-preferences", JSON.stringify(essentialOnly))
    setShowBanner(false)
  }

  const handleSaveSettings = () => {
    localStorage.setItem("kmerhosting-cookie-consent", "custom")
    localStorage.setItem("kmerhosting-cookie-preferences", JSON.stringify(cookiePreferences))
    setShowBanner(false)
    setShowSettings(false)
  }

  const handlePreferenceChange = (category: keyof typeof cookiePreferences, checked: boolean) => {
    if (category === 'essential') return // Essential cookies cannot be disabled
    setCookiePreferences(prev => ({
      ...prev,
      [category]: checked
    }))
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <Card className="max-w-4xl mx-auto p-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-semibold mb-2">Cookie Preferences</h3>
            <p className="text-sm text-muted-foreground">
              We use cookies to enhance your browsing experience. By clicking "Accept All", you
              consent to our use of cookies. Read our{" "}
              <Link href="/cookies" className="text-[#07C983] hover:underline">
                Cookie Policy
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-[#07C983] hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Dialog open={showSettings} onOpenChange={setShowSettings}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex-1 sm:flex-none bg-transparent">
                  Settings
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Cookie Settings</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="essential"
                      checked={cookiePreferences.essential}
                      disabled
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="essential"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Essential Cookies
                      </label>
                      <p className="text-xs text-muted-foreground">
                        Required for the website to function properly. Cannot be disabled.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="analytics"
                      checked={cookiePreferences.analytics}
                      onCheckedChange={(checked) => handlePreferenceChange('analytics', checked as boolean)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="analytics"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Analytics Cookies
                      </label>
                      <p className="text-xs text-muted-foreground">
                        Help us understand how visitors interact with our website.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="marketing"
                      checked={cookiePreferences.marketing}
                      onCheckedChange={(checked) => handlePreferenceChange('marketing', checked as boolean)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="marketing"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Marketing Cookies
                      </label>
                      <p className="text-xs text-muted-foreground">
                        Used to deliver personalized advertisements.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="functional"
                      checked={cookiePreferences.functional}
                      onCheckedChange={(checked) => handlePreferenceChange('functional', checked as boolean)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="functional"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Functional Cookies
                      </label>
                      <p className="text-xs text-muted-foreground">
                        Enable enhanced functionality and personalization.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <Button variant="outline" onClick={() => setShowSettings(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveSettings}>
                    Save Settings
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button onClick={handleAcceptAll} className="flex-1 sm:flex-none">
              Accept All
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
