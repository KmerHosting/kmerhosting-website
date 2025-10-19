"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/components/language-provider"
import { Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const { t } = useLanguage()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // TODO: Implement actual login logic
    console.log("Login attempt:", { email, password })
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Reset form or redirect user
    }, 1000)
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-muted/30 flex items-center justify-center py-8 px-4">
        <div className="w-full max-w-sm">
          <Card className="border-0 shadow-md">
            <CardHeader className="space-y-3 text-center pb-4">
              {/* Logo */}
              <div className="flex justify-center">
                <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100">
                  <img 
                    src="/kmerhosting-logo.svg" 
                    alt="KmerHosting" 
                    className="h-7 w-7 object-contain"
                  />
                </div>
              </div>
              <CardTitle className="text-xl font-semibold">{t("auth.login.title")}</CardTitle>
              <CardDescription className="text-sm">{t("auth.login.subtitle")}</CardDescription>
            </CardHeader>
            <CardContent className="pt-2 pb-4">
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="email" className="text-sm">{t("auth.login.email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="h-9"
                  />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="password" className="text-sm">{t("auth.login.password")}</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoading}
                      className="h-9 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-9 px-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-3 w-3" />
                      ) : (
                        <Eye className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <Link
                    href="/forgot-password"
                    className="text-xs text-primary hover:underline"
                  >
                    {t("auth.login.forgotPassword")}
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full h-9"
                  disabled={isLoading}
                >
                  {isLoading ? "..." : t("auth.login.submit")}
                </Button>
              </form>

              <div className="mt-4 text-center text-xs">
                <span className="text-muted-foreground">
                  {t("auth.login.noAccount")}{" "}
                </span>
                <Link href="/signup" className="text-primary hover:underline">
                  {t("auth.login.signUpLink")}
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
      <CookieBanner />
    </>
  )
}