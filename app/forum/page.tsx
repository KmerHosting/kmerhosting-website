import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  MessageSquare,
  Users,
  TrendingUp,
  Search,
  Clock,
  Eye,
  MessageCircle,
  User,
  Calendar
} from "lucide-react"

const forumCategories = [
  {
    id: 1,
    name: "General Discussion",
    description: "General topics about web hosting and technology",
    topics: 245,
    posts: 1234,
    lastPost: {
      topic: "Welcome to KmerHosting Community",
      author: "Admin",
      time: "2 hours ago"
    },
    icon: MessageSquare,
    color: "bg-blue-500"
  },
  {
    id: 2,
    name: "Technical Support",
    description: "Get help with technical issues and troubleshooting",
    topics: 189,
    posts: 892,
    lastPost: {
      topic: "SSL Certificate Installation Guide",
      author: "Support Team",
      time: "4 hours ago"
    },
    icon: Users,
    color: "bg-green-500"
  },
  {
    id: 3,
    name: "WordPress",
    description: "WordPress hosting, themes, plugins, and development",
    topics: 156,
    posts: 734,
    lastPost: {
      topic: "Best WordPress Security Plugins 2024",
      author: "SarahJ",
      time: "6 hours ago"
    },
    icon: TrendingUp,
    color: "bg-purple-500"
  },
  {
    id: 4,
    name: "VPS & Cloud",
    description: "Virtual private servers, cloud hosting, and server management",
    topics: 98,
    posts: 456,
    lastPost: {
      topic: "VPS vs Dedicated Server: Which to Choose?",
      author: "TechGuru",
      time: "8 hours ago"
    },
    icon: MessageCircle,
    color: "bg-orange-500"
  },
  {
    id: 5,
    name: "Domain & DNS",
    description: "Domain registration, DNS configuration, and domain management",
    topics: 87,
    posts: 345,
    lastPost: {
      topic: "DNS Propagation Time Explained",
      author: "DomainExpert",
      time: "1 day ago"
    },
    icon: Search,
    color: "bg-red-500"
  },
  {
    id: 6,
    name: "Off Topic",
    description: "Casual discussions and community topics",
    topics: 67,
    posts: 234,
    lastPost: {
      topic: "Favorite Development Tools",
      author: "Coder123",
      time: "2 days ago"
    },
    icon: Clock,
    color: "bg-gray-500"
  }
]

const recentTopics = [
  {
    id: 1,
    title: "How to migrate from shared hosting to VPS?",
    author: "NewUser2024",
    replies: 12,
    views: 245,
    lastReply: "3 hours ago",
    category: "VPS & Cloud"
  },
  {
    id: 2,
    title: "WordPress site running slow - need optimization tips",
    author: "WebDevPro",
    replies: 8,
    views: 189,
    lastReply: "5 hours ago",
    category: "WordPress"
  },
  {
    id: 3,
    title: "SSL certificate not working on mobile devices",
    author: "MobileDev",
    replies: 15,
    views: 312,
    lastReply: "6 hours ago",
    category: "Technical Support"
  },
  {
    id: 4,
    title: "Best practices for domain name selection",
    author: "StartupFounder",
    replies: 6,
    views: 156,
    lastReply: "8 hours ago",
    category: "Domain & DNS"
  },
  {
    id: 5,
    title: "Community meetup in Cameroon?",
    author: "LocalDev",
    replies: 23,
    views: 445,
    lastReply: "1 day ago",
    category: "Off Topic"
  }
]

export default function ForumPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 sm:py-32 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="secondary" className="mb-6 px-4 py-1.5">
                Community Forum
              </Badge>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 text-balance">
                Join the KmerHosting Community
              </h1>
              <p className="text-lg text-muted-foreground text-balance">
                Connect with fellow developers, get expert advice, share your knowledge,
                and stay updated with the latest web hosting trends and best practices.
              </p>
            </div>
          </div>
        </section>

        {/* Search Bar */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search forums, topics, or users..."
                  className="pl-10 pr-4 py-3"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Forum Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-center">Forum Categories</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {forumCategories.map((category) => {
                  const IconComponent = category.icon
                  return (
                    <Card key={category.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-4">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg ${category.color}`}>
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-xl mb-2">{category.name}</CardTitle>
                            <p className="text-muted-foreground text-sm">{category.description}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                          <div className="flex gap-4">
                            <span>{category.topics} topics</span>
                            <span>{category.posts} posts</span>
                          </div>
                          <Button variant="outline" size="sm">
                            View Category
                          </Button>
                        </div>
                        <div className="border-t pt-4">
                          <div className="flex items-start gap-3">
                            <div className="flex-1">
                              <p className="font-medium text-sm">{category.lastPost.topic}</p>
                              <p className="text-xs text-muted-foreground">
                                by {category.lastPost.author} • {category.lastPost.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Recent Topics */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Recent Topics</h2>
                <Button>
                  Start New Topic
                </Button>
              </div>
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {recentTopics.map((topic) => (
                      <div key={topic.id} className="p-6 hover:bg-muted/50 transition-colors">
                        <div className="flex items-start gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="text-xs">
                                {topic.category}
                              </Badge>
                            </div>
                            <h3 className="font-semibold mb-2 hover:text-primary cursor-pointer">
                              {topic.title}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                {topic.author}
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageCircle className="h-3 w-3" />
                                {topic.replies} replies
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                {topic.views} views
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {topic.lastReply}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Community Stats */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-center">Community Stats</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">2,847</div>
                    <p className="text-muted-foreground">Total Members</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">1,234</div>
                    <p className="text-muted-foreground">Topics</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">8,956</div>
                    <p className="text-muted-foreground">Posts</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">156</div>
                    <p className="text-muted-foreground">Online Now</p>
                  </CardContent>
                </Card>
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