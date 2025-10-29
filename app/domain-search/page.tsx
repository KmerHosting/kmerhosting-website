"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Check, X, ShoppingCart } from "lucide-react"

interface DomainResult {
  domain: string
  extension: string
  available: boolean
  price: string
}

const popularTlds = [
  { ext: ".com", price: "7,800 FCFA" },
  { ext: ".net", price: "9,000 FCFA" },
  { ext: ".org", price: "8,400 FCFA" },
  { ext: ".info", price: "11,400 FCFA" },
  { ext: ".biz", price: "12,000 FCFA" },
  { ext: ".co", price: "15,000 FCFA" },
]

export default function DomainSearchPage() {const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<DomainResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchTerm.trim()) return

    setIsSearching(true)
    setHasSearched(true)

    // Remove common extensions from search term
    const cleanDomain = searchTerm.toLowerCase().replace(/\.(com|net|org|info|biz|co)$/, "")

    // Simulate API call for domain availability
    setTimeout(() => {
      const results: DomainResult[] = popularTlds.map((ext, index) => ({
        domain: cleanDomain + ext.ext,
        extension: ext.ext,
        available: Math.random() > 0.3, // Random availability for demo
        price: ext.price,
      }))

      setSearchResults(results)
      setIsSearching(false)
    }, 1500)
  }

  const handleAddToCart = (domain: string) => {
    // TODO: Implement add to cart functionality
    console.log("Adding to cart:", domain)
    alert(`Added ${domain} to cart!`) // Temporary feedback
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-muted/30">
        {/* Hero Section */}
        <section className="py-20 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
                {"Find Your Perfect Domain"}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {"Search for available domains"}
              </p>
            </div>

            {/* Search Form */}
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleSearch} className="flex gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        type="text"
                        placeholder="Enter your domain name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                        disabled={isSearching}
                      />
                    </div>
                    <Button type="submit" disabled={isSearching || !searchTerm.trim()}>
                      {isSearching ? "..." : "Search"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Popular Extensions */}
        <section className="pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold mb-4">Popular Extensions</h2>
              <div className="flex flex-wrap justify-center gap-4">
                {popularTlds.map((ext) => (
                  <Badge key={ext.ext} variant="outline" className="px-4 py-2 text-sm">
                    {ext.ext} - <span className="font-semibold">{ext.price}/year</span>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Search Results */}
        {hasSearched && (
          <section className="pb-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-8 text-center">
                  {isSearching ? "Searching..." : "Search Results"}
                </h2>
                
                {isSearching ? (
                  <div className="grid gap-4">
                    {[...Array(6)].map((_, i) => (
                      <Card key={i}>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-24 h-4 bg-muted animate-pulse rounded"></div>
                              <div className="w-16 h-4 bg-muted animate-pulse rounded"></div>
                            </div>
                            <div className="w-20 h-8 bg-muted animate-pulse rounded"></div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {searchResults.map((result) => (
                      <Card key={result.domain}>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                {result.available ? (
                                  <Check className="h-5 w-5 text-[#07C983]" />
                                ) : (
                                  <X className="h-5 w-5 text-red-600" />
                                )}
                                <span className="font-mono text-lg font-medium">
                                  {result.domain}
                                </span>
                              </div>
                              <Badge
                                variant={result.available ? "default" : "secondary"}
                                className={
                                  result.available ? "bg-green-100 text-[#07C983]" : "bg-red-100 text-red-800"
                                }
                              >
                                {result.available ? "Available" : "Unavailable"}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                              {result.available && (
                                <>
                                  <span className="font-semibold">{result.price}/year</span>
                                  <Button
                                    onClick={() => handleAddToCart(result.domain)}
                                    size="sm"
                                  >
                                    <ShoppingCart className="h-4 w-4 mr-2" />
                                    Add to Cart
                                  </Button>
                                </>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Suggestions for unavailable domains */}
                {!isSearching && searchResults.some(r => !r.available) && (
                  <div className="mt-12">
                    <Card>
                      <CardHeader>
                        <CardTitle>Alternative Suggestions</CardTitle>
                        <CardDescription>
                          Try these alternative domain names that are available:
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Generate alternative suggestions */}
                          {[1, 2, 3, 4].map((i) => {
                            const altDomain = searchTerm.replace(/\.(com|net|org|info|biz|co)$/, "") + 
                              (i === 1 ? "online" : i === 2 ? "web" : i === 3 ? "site" : "host") + ".com"
                            return (
                              <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                                <span className="font-mono">{altDomain}</span>
                                <div className="flex items-center space-x-2">
                                  <Badge className="bg-green-100 text-[#07C983]">
                                    Available
                                  </Badge>
                                  <Button size="sm" variant="outline">
                                    <ShoppingCart className="h-4 w-4 mr-1" />
                                    Add
                                  </Button>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <CookieBanner />
    </>
  )
}