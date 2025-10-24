import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, ArrowRight } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog - Web Hosting Tips & Tutorials | KmerHosting",
  description: "Expert articles on web hosting, WordPress, security, performance optimization, and website management. Stay updated with the latest hosting industry trends.",
  keywords: [
    "hosting blog",
    "web hosting tips",
    "WordPress tutorials",
    "website security",
    "hosting guides",
    "server optimization",
  ],
  openGraph: {
    title: "KmerHosting Blog - Hosting Tips & Tutorials",
    description: "Expert guides and tutorials on web hosting, WordPress, security, and website performance.",
    url: "https://kmerhosting.com/blog",
    siteName: "KmerHosting",
    type: "website",
  },
  alternates: {
    canonical: "https://kmerhosting.com/blog",
  },
}

const blogPosts = [
  {
    id: 1,
    title: "10 Essential Security Tips for Your WordPress Website",
    excerpt: "Learn the most important security measures to protect your WordPress site from hackers and malware.",
    author: "Sarah Johnson",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Security",
    image: "/blog/security-tips.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "How to Choose the Right Hosting Plan for Your Business",
    excerpt: "A comprehensive guide to selecting the perfect hosting solution based on your business needs and budget.",
    author: "Michael Chen",
    date: "2024-01-12",
    readTime: "7 min read",
    category: "Hosting",
    image: "/blog/choose-hosting.jpg",
    featured: false,
  },
  {
    id: 3,
    title: "SSL Certificates: Why They're Essential for Modern Websites",
    excerpt: "Understanding the importance of SSL certificates and how they protect your visitors' data.",
    author: "Emma Williams",
    date: "2024-01-10",
    readTime: "4 min read",
    category: "SSL",
    image: "/blog/ssl-certificates.jpg",
    featured: false,
  },
  {
    id: 4,
    title: "Optimizing Your Website for Better Performance",
    excerpt: "Practical tips and techniques to improve your website loading speed and user experience.",
    author: "David Rodriguez",
    date: "2024-01-08",
    readTime: "6 min read",
    category: "Performance",
    image: "/blog/website-optimization.jpg",
    featured: false,
  },
  {
    id: 5,
    title: "The Complete Guide to VPS Hosting",
    excerpt: "Everything you need to know about Virtual Private Server hosting and when to choose it.",
    author: "Lisa Thompson",
    date: "2024-01-05",
    readTime: "8 min read",
    category: "VPS",
    image: "/blog/vps-guide.jpg",
    featured: false,
  },
  {
    id: 6,
    title: "Domain Name Best Practices for 2024",
    excerpt: "Tips for choosing and managing domain names that strengthen your online presence.",
    author: "James Park",
    date: "2024-01-03",
    readTime: "5 min read",
    category: "Domains",
    image: "/blog/domain-best-practices.jpg",
    featured: false,
  },
]

export default function BlogPage() {
  const featuredPost = blogPosts.find(post => post.featured)
  const regularPosts = blogPosts.filter(post => !post.featured)

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 sm:py-32 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="secondary" className="mb-6 px-4 py-1.5">
                Blog
              </Badge>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 text-balance">
                Insights & Updates from KmerHosting
              </h1>
              <p className="text-lg text-muted-foreground text-balance">
                Stay informed with the latest web hosting tips, industry news, and expert advice
                to help you build and maintain successful online projects.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-8 text-center">Featured Article</h2>
                <Card className="overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/2">
                      <div className="h-64 md:h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white text-lg font-semibold">Featured Image</span>
                      </div>
                    </div>
                    <div className="md:w-1/2 p-8">
                      <Badge variant="outline" className="mb-4">
                        {featuredPost.category}
                      </Badge>
                      <h3 className="text-2xl font-bold mb-4">{featuredPost.title}</h3>
                      <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {featuredPost.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(featuredPost.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {featuredPost.readTime}
                        </div>
                      </div>
                      <Button>
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* Blog Posts Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-center">Latest Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-48 bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">{post.category}</span>
                    </div>
                    <CardContent className="p-6">
                      <Badge variant="outline" className="mb-3">
                        {post.category}
                      </Badge>
                      <h3 className="text-xl font-semibold mb-3 line-clamp-2">{post.title}</h3>
                      <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.date).toLocaleDateString()}
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        Read Article
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CookieBanner />
    </>
  )
}