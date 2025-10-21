"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MessageCircle, Send, X, User } from "lucide-react"
import { toast } from "sonner"

const supportAgents = [
  { id: "toscani", name: "Toscani", role: "Technical Support Lead" },
  { id: "ariane", name: "Ariane", role: "WordPress Specialist" },
  { id: "leo", name: "Leo", role: "VPS & Cloud Expert" },
  { id: "john", name: "John", role: "Billing & Accounts" },
  { id: "hanissa", name: "Hanissa", role: "Customer Success" },
  { id: "ai", name: "KmerHosting AI Agent", role: "24/7 AI Assistant" },
]

interface Message {
  id: string
  text: string
  sender: "user" | "agent"
  timestamp: Date
}

export default function LiveChatPage() {
  const router = useRouter()
  const [selectedAgent, setSelectedAgent] = useState<typeof supportAgents[0] | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showCloseDialog, setShowCloseDialog] = useState(false)

  // Load conversation from localStorage on mount
  useEffect(() => {
    const savedAgent = localStorage.getItem("selectedAgent")
    const savedMessages = localStorage.getItem("chatMessages")

    if (savedAgent) {
      setSelectedAgent(JSON.parse(savedAgent))
    }

    if (savedMessages) {
      const parsedMessages = JSON.parse(savedMessages).map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }))
      setMessages(parsedMessages)
    }
  }, [])

  // Save to localStorage whenever agent or messages change
  useEffect(() => {
    if (selectedAgent) {
      localStorage.setItem("selectedAgent", JSON.stringify(selectedAgent))
    }
  }, [selectedAgent])

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages))
  }, [messages])

  const selectAgent = (agent: typeof supportAgents[0]) => {
    setSelectedAgent(agent)
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      text: `Hello! I'm ${agent.name}, ${agent.role}. How can I help you today?`,
      sender: "agent",
      timestamp: new Date()
    }
    setMessages([welcomeMessage])
  }

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedAgent) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "user",
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setNewMessage("")
    setIsTyping(true)

    // Simulate agent response (in real app, this would be WebSocket/API call)
    setTimeout(() => {
      const responses = [
        "I understand your concern. Let me help you with that.",
        "That's a great question! Here's what you need to know:",
        "I'm here to assist you. Could you provide more details?",
        "Thank you for reaching out. I'll guide you through this step by step.",
        "I can definitely help you with that. Let me check the best solution for you."
      ]

      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: "agent",
        timestamp: new Date()
      }

      setMessages(prev => [...prev, agentResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 2000)
  }

  const closeConversation = () => {
    setShowCloseDialog(true)
  }

  const confirmCloseConversation = () => {
    setShowCloseDialog(false)
    toast("Chat closed", {
      description: "Your conversation has been closed. You can start a new chat anytime.",
      action: {
        label: "Got it",
        onClick: () => {},
      },
    })
    setSelectedAgent(null)
    setMessages([])
    localStorage.removeItem("selectedAgent")
    localStorage.removeItem("chatMessages")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (!selectedAgent) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-3xl font-bold mb-4">Live Chat Support</h1>
                <p className="text-lg text-muted-foreground">
                  Choose who you'd like to be assisted by
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {supportAgents.map((agent) => (
                  <Card
                    key={agent.id}
                    className="cursor-pointer hover:border-primary/50 transition-colors"
                    onClick={() => selectAgent(agent)}
                  >
                    <CardContent className="p-6 text-center">
                      <Avatar className="w-16 h-16 mx-auto mb-4">
                        <AvatarFallback className="bg-primary/10 text-primary text-lg">
                          {agent.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="font-semibold text-lg mb-1">{agent.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{agent.role}</p>
                      <Button className="w-full">
                        Start Chat
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
        <CookieBanner />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Chat Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {selectedAgent.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold">Chatting with {selectedAgent.name}</h1>
                  <p className="text-sm text-muted-foreground">{selectedAgent.role}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={closeConversation}>
                <X className="h-4 w-4 mr-2" />
                Close Chat
              </Button>
            </div>

            {selectedAgent.id === "ai" && (
              <p className="text-sm text-muted-foreground mb-4">Get fastest response by talking to Our IA Agent</p>
            )}

            {/* Chat Messages */}
            <Card className="flex flex-col h-[400px]">
              <ScrollArea className="flex-1 p-4 min-h-0">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.sender === "agent" && (
                        <Avatar className="w-8 h-8 flex-shrink-0">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {selectedAgent.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`max-w-[70%] rounded-lg px-4 py-2 ${
                          message.sender === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm break-words">{message.text}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit"
                          })}
                        </p>
                      </div>
                      {message.sender === "user" && (
                        <Avatar className="w-8 h-8 flex-shrink-0">
                          <AvatarFallback className="bg-secondary text-xs">
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex gap-3 justify-start">
                      <Avatar className="w-8 h-8 flex-shrink-0">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {selectedAgent.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-muted rounded-lg px-4 py-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                          <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="border-t p-4 bg-background flex-shrink-0">
                <div className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
      <CookieBanner />

      {/* Close Chat Confirmation Dialog */}
      <Dialog open={showCloseDialog} onOpenChange={setShowCloseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Close Chat</DialogTitle>
            <DialogDescription>
              Are you sure you want to close this chat? Your conversation will be lost.
              Instead you can keep it open and simply return anytime to check for response.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCloseDialog(false)}>
              Keep Chat Open
            </Button>
            <Button variant="destructive" onClick={confirmCloseConversation}>
              Close Chat
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Legal Disclaimer */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <p className="text-xs text-muted-foreground text-center">
          By using our live chat, you agree to our{" "}
          <a href="/terms" className="underline hover:text-primary">terms of service</a>{" "}
          and{" "}
          <a href="/privacy" className="underline hover:text-primary">privacy policy</a>
        </p>
      </div>
    </>
  )
}