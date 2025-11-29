"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Send, MessageCircle, Users, Plus, Search, Heart, MessageSquare, Share2, UserPlus, UserCheck, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { toast } from "sonner"

interface User {
  id: string
  name: string
  avatar: string
  status: "online" | "away" | "offline"
  lastSeen: string
  isFollowing: boolean
}

interface DiscussionGroup {
  id: string
  name: string
  description: string
  members: number
  icon: string
  isJoined: boolean
  messages: GroupMessage[]
}

interface GroupMessage {
  id: string
  author: string
  avatar: string
  content: string
  timestamp: Date
  likes: number
  liked: boolean
}

export default function ChatPage() {
  const [activeTab, setActiveTab] = useState<"groups" | "users">("groups")
  const [selectedGroup, setSelectedGroup] = useState<DiscussionGroup | null>(null)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [onlineUsers, setOnlineUsers] = useState<User[]>([
    {
      id: "1",
      name: "Ahmed Hassan",
      avatar: "AH",
      status: "online",
      lastSeen: "now",
      isFollowing: false,
    },
    {
      id: "2",
      name: "Marie Dupont",
      avatar: "MD",
      status: "online",
      lastSeen: "now",
      isFollowing: true,
    },
    {
      id: "3",
      name: "Carlos Lopez",
      avatar: "CL",
      status: "away",
      lastSeen: "5m ago",
      isFollowing: false,
    },
    {
      id: "4",
      name: "Sarah Johnson",
      avatar: "SJ",
      status: "online",
      lastSeen: "now",
      isFollowing: false,
    },
    {
      id: "5",
      name: "Jean Pierre",
      avatar: "JP",
      status: "offline",
      lastSeen: "2h ago",
      isFollowing: true,
    },
  ])

  const [discussionGroups, setDiscussionGroups] = useState<DiscussionGroup[]>([
    {
      id: "1",
      name: "WordPress Tips & Tricks",
      description: "Share and discuss WordPress hosting tips",
      members: 342,
      icon: "📝",
      isJoined: true,
      messages: [
        {
          id: "1",
          author: "Ahmed Hassan",
          avatar: "AH",
          content: "Just discovered a great plugin for optimizing WordPress databases. Really improved my site speed!",
          timestamp: new Date(Date.now() - 600000),
          likes: 24,
          liked: false,
        },
        {
          id: "2",
          author: "Marie Dupont",
          avatar: "MD",
          content: "Which plugin are you using? I'm looking for something similar.",
          timestamp: new Date(Date.now() - 300000),
          likes: 8,
          liked: false,
        },
      ],
    },
    {
      id: "2",
      name: "Server Configuration",
      description: "Technical discussions about server setup",
      members: 256,
      icon: "⚙️",
      isJoined: true,
      messages: [
        {
          id: "1",
          author: "Carlos Lopez",
          avatar: "CL",
          content: "Anyone else using Nginx? How's your experience compared to Apache?",
          timestamp: new Date(Date.now() - 1800000),
          likes: 45,
          liked: false,
        },
      ],
    },
    {
      id: "3",
      name: "E-commerce Solutions",
      description: "Discuss e-commerce platforms and strategies",
      members: 189,
      icon: "🛍️",
      isJoined: false,
      messages: [],
    },
    {
      id: "4",
      name: "Security Best Practices",
      description: "Keep your website and data secure",
      members: 421,
      icon: "🔒",
      isJoined: true,
      messages: [],
    },
    {
      id: "5",
      name: "Performance Optimization",
      description: "Techniques to boost your website performance",
      members: 312,
      icon: "⚡",
      isJoined: false,
      messages: [],
    },
  ])

  useEffect(() => setMounted(true), [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [selectedGroup])

  const handleFollowUser = (userId: string) => {
    setOnlineUsers(
      onlineUsers.map((user) =>
        user.id === userId ? { ...user, isFollowing: !user.isFollowing } : user
      )
    )
    const user = onlineUsers.find((u) => u.id === userId)
    if (user) {
      toast.success(
        user.isFollowing ? `Unfollowed ${user.name}` : `Following ${user.name}!`,
        { duration: 2000 }
      )
    } else {
      toast.success("Updated", { duration: 2000 })
    }
  }

  const handleJoinGroup = (groupId: string) => {
    setDiscussionGroups(
      discussionGroups.map((group) =>
        group.id === groupId ? { ...group, isJoined: !group.isJoined } : group
      )
    )
    const group = discussionGroups.find((g) => g.id === groupId)
    toast.success(
      group?.isJoined ? `Left ${group?.name}` : `Joined ${group?.name}!`,
      { duration: 2000 }
    )
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedGroup) return

    const newMsg: GroupMessage = {
      id: Date.now().toString(),
      author: "You",
      avatar: "YOU",
      content: newMessage,
      timestamp: new Date(),
      likes: 0,
      liked: false,
    }

    setDiscussionGroups(
      discussionGroups.map((group) =>
        group.id === selectedGroup.id
          ? { ...group, messages: [...group.messages, newMsg] }
          : group
      )
    )

    setSelectedGroup((prev) =>
      prev ? { ...prev, messages: [...prev.messages, newMsg] } : null
    )

    setNewMessage("")
    toast.success("Message sent!", { duration: 2000 })
  }

  const handleLikeMessage = (messageId: string) => {
    if (!selectedGroup) return

    setDiscussionGroups(
      discussionGroups.map((group) =>
        group.id === selectedGroup.id
          ? {
              ...group,
              messages: group.messages.map((msg) =>
                msg.id === messageId
                  ? {
                      ...msg,
                      liked: !msg.liked,
                      likes: msg.liked ? msg.likes - 1 : msg.likes + 1,
                    }
                  : msg
              ),
            }
          : group
      )
    )

    setSelectedGroup((prev) =>
      prev
        ? {
            ...prev,
            messages: prev.messages.map((msg) =>
              msg.id === messageId
                ? {
                    ...msg,
                    liked: !msg.liked,
                    likes: msg.liked ? msg.likes - 1 : msg.likes + 1,
                  }
                : msg
            ),
          }
        : null
    )
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              href="/customers/dashboard"
              className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-4 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Link>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">KmerHosting Chat Room</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Connect with users, join discussions, and share knowledge</p>
          </div>
          <button
            aria-label="Toggle theme"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {mounted && (resolvedTheme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-700 dark:text-slate-300" />)}
          </button>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-4 gap-6">
          {/* Left Sidebar - Online Users */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5" style={{ color: "#128C7E" }} />
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Online Users</h2>
              </div>
              <div className="space-y-3">
                {onlineUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition cursor-pointer"
                  >
                    <div className="flex items-center gap-2 flex-1">
                      <div className="relative">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-xs font-bold">
                          {user.avatar}
                        </div>
                        <div
                          className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-slate-800 ${
                            user.status === "online"
                              ? "bg-emerald-500"
                              : user.status === "away"
                              ? "bg-yellow-500"
                              : "bg-slate-400"
                          }`}
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{user.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{user.lastSeen}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleFollowUser(user.id)}
                      className="p-1 hover:bg-slate-200 dark:hover:bg-slate-600 rounded transition"
                    >
                      {user.isFollowing ? (
                        <UserCheck className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <UserPlus className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Middle - Discussion Groups or Selected Group Chat */}
          <div className="md:col-span-3">
            {!selectedGroup ? (
              <div className="space-y-4">
                {/* Tabs */}
                <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700">
                  <button
                    onClick={() => setActiveTab("groups")}
                    className={`px-4 py-3 font-medium transition-colors border-b-2 ${
                      activeTab === "groups"
                        ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                        : "border-transparent text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    <MessageCircle className="w-4 h-4 inline mr-2" />
                    Discussion Groups
                  </button>
                </div>

                {/* Discussion Groups List */}
                <div className="grid gap-4">
                  {discussionGroups.map((group) => (
                    <div
                      key={group.id}
                      className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-md dark:hover:shadow-lg transition"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="text-3xl">{group.icon}</div>
                          <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{group.name}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{group.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-slate-900 dark:text-white">{group.members}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">members</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                          <Users className="w-4 h-4" />
                          <span className="text-sm">{group.messages.length} recent messages</span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedGroup(group)}
                            className="px-4 py-2 rounded-lg font-medium text-white transition-all"
                            style={{ backgroundColor: "#128C7E" }}
                          >
                            {group.isJoined ? "Open" : "View"}
                          </button>
                          {!group.isJoined && (
                            <button
                              onClick={() => handleJoinGroup(group.id)}
                              className="px-4 py-2 rounded-lg font-medium border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Selected Group Chat */
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col h-[600px]">
                {/* Group Header */}
                <div className="border-b border-slate-200 dark:border-slate-700 p-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedGroup(null)}
                      className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition"
                    >
                      <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    </button>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{selectedGroup.icon}</span>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{selectedGroup.name}</h3>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{selectedGroup.members} members</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleJoinGroup(selectedGroup.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedGroup.isJoined
                        ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50"
                        : "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/50"
                    }`}
                  >
                    {selectedGroup.isJoined ? "Leave Group" : "Join Group"}
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {selectedGroup.messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-center">
                      <div>
                        <MessageCircle className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                        <p className="text-slate-600 dark:text-slate-400">No messages yet. Be the first to start a discussion!</p>
                      </div>
                    </div>
                  ) : (
                    selectedGroup.messages.map((message) => (
                      <div key={message.id} className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {message.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-sm font-bold text-slate-900 dark:text-white">{message.author}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{formatTime(message.timestamp)}</p>
                          </div>
                          <p className="text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-700 p-3 rounded-lg mb-2">
                            {message.content}
                          </p>
                          <div className="flex gap-4">
                            <button
                              onClick={() => handleLikeMessage(message.id)}
                              className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition"
                            >
                              <Heart
                                className={`w-4 h-4 ${message.liked ? "fill-current text-red-600 dark:text-red-400" : ""}`}
                              />
                              {message.likes}
                            </button>
                            <button className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition">
                              <MessageSquare className="w-4 h-4" />
                              Reply
                            </button>
                            <button className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                              <Share2 className="w-4 h-4" />
                              Share
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                {selectedGroup.isJoined && (
                  <div className="border-t border-slate-200 dark:border-slate-700 p-6">
                    <form onSubmit={handleSendMessage} className="flex gap-3">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Share your thoughts..."
                        className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
                      />
                      <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        className="p-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-white"
                        style={{ backgroundColor: "#128C7E" }}
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </form>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
