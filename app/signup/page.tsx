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
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff } from "lucide-react"

export default function SignupPage() {const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match") // TODO: Replace with proper error handling
      return
    }
    
    if (!agreedToTerms) {
      alert("Please agree to the terms and conditions") // TODO: Replace with proper error handling
      return
    }
    
    setIsLoading(true)
    
    // TODO: Implement actual signup logic
    console.log("Signup attempt:", formData)
    
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
            <CardHeader className="space-y-2 text-center pb-3">
              <CardTitle className="text-xl font-semibold">{"Create Account"}</CardTitle>
              <CardDescription className="text-sm">{"Sign up for KmerHosting"}</CardDescription>
            </CardHeader>
            <CardContent className="pt-2 pb-4">
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="name" className="text-sm">{"Full Name"}</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                    disabled={isLoading}
                    className="h-9"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="email" className="text-sm">{"Email Address"}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    disabled={isLoading}
                    className="h-9"
                  />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="password" className="text-sm">{"Password"}</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
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

                <div className="space-y-1">
                  <Label htmlFor="confirmPassword" className="text-sm">{"Confirm Password"}</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      required
                      disabled={isLoading}
                      className="h-9 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-9 px-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-3 w-3" />
                      ) : (
                        <Eye className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-1">
                  <Checkbox
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                    disabled={isLoading}
                  />
                  <Label htmlFor="terms" className="text-xs leading-relaxed peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {"I agree to the"}{" "}
                    <Link href="/terms" className="text-primary hover:underline">
                      {"Terms of Service"}
                    </Link>{" "}
                    {"and"}{" "}
                    <Link href="/privacy" className="text-primary hover:underline">
                      {"Privacy Policy"}
                    </Link>
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full h-9"
                  disabled={isLoading || !agreedToTerms}
                >
                  {isLoading ? "..." : "Sign Up"}
                </Button>
              </form>

              <div className="mt-4 text-center text-xs">
                <span className="text-muted-foreground">
                  {"Already have an account?"}{" "}
                </span>
                <Link href="/login" className="text-primary hover:underline">
                  {"Login here"}
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