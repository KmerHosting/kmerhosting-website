"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Lock, Mail, Key, Copy, Check, Trash2, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { toast } from "sonner"

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [isSubscribed, setIsSubscribed] = useState(true)
  const [apiKeys, setApiKeys] = useState<Array<{ id: string; name: string; key: string; created: Date }>>([
    {
      id: "1",
      name: "Default Key",
      key: "km_prod_1a2b3c4d5e6f7g8h",
      created: new Date(Date.now() - 2592000000),
    },
  ])
  const [showApiForm, setShowApiForm] = useState(false)
  const [apiKeyName, setApiKeyName] = useState("")
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null)

  useEffect(() => setMounted(true), [])

  const generateApiKey = () => {
    if (!apiKeyName.trim()) {
      toast.error("Please enter an API key name", { duration: 2000 })
      return
    }

    // Generate 16 character key with lowercase letters and digits only
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789"
    let key = "km_"
    for (let i = 0; i < 16; i++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length))
    }

    const newKey = {
      id: Date.now().toString(),
      name: apiKeyName,
      key: key,
      created: new Date(),
    }

    setApiKeys([...apiKeys, newKey])
    setApiKeyName("")
    setShowApiForm(false)
    toast.success("API key generated successfully!", { duration: 2000 })
  }

  const deleteApiKey = (id: string) => {
    setApiKeys(apiKeys.filter((k) => k.id !== id))
    toast.success("API key deleted", { duration: 2000 })
  }

  const copyApiKey = (key: string, id: string) => {
    navigator.clipboard.writeText(key)
    toast.success("API key copied to clipboard!", { duration: 2000 })
    setCopiedKeyId(id)
    setTimeout(() => setCopiedKeyId(null), 2000)
  }

  const handleUnsubscribe = () => {
    setIsSubscribed(false)
    toast.success("Unsubscribed from newsletter", { duration: 2000 })
  }

  const handleResubscribe = () => {
    setIsSubscribed(true)
    toast.success("Subscribed to newsletter", { duration: 2000 })
  }

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/customers/dashboard" className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-4 transition">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Settings</h1>
          </div>
          <button
            aria-label="Toggle theme"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {mounted && (resolvedTheme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-700 dark:text-slate-300" />)}
          </button>
        </div>

        {/* Settings Cards */}
        <div className="space-y-6">
          {/* Change Password */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-8">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-6 h-6" style={{ color: "#128C7E" }} />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Change Password</h2>
            </div>
            <input
              type="password"
              placeholder="New password"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 mb-3"
            />
            <input
              type="password"
              placeholder="Confirm password"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 mb-4"
            />
            <button
              className="w-full px-6 py-3 rounded-lg font-semibold text-white transition-all"
              style={{ backgroundColor: "#128C7E" }}
            >
              Save New Password
            </button>
          </div>

          {/* Newsletter */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-8">
            <div className="flex items-center gap-3 mb-6">
              <Mail className="w-6 h-6" style={{ color: "#128C7E" }} />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Newsletter</h2>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900 dark:text-white mb-1">Newsletter Status</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {isSubscribed ? "You are currently subscribed" : "You are not subscribed"}
                </p>
              </div>
              <button
                onClick={isSubscribed ? handleUnsubscribe : handleResubscribe}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  isSubscribed
                    ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50"
                    : "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/50"
                }`}
              >
                {isSubscribed ? "Unsubscribe" : "Subscribe"}
              </button>
            </div>
          </div>

          {/* API Keys */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-8">
            <div className="flex items-center gap-3 mb-6">
              <Key className="w-6 h-6" style={{ color: "#128C7E" }} />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">API Keys</h2>
            </div>

            {/* API Keys List */}
            <div className="space-y-3 mb-6">
              {apiKeys.map((apiKey) => (
                <div key={apiKey.id} className="flex items-center justify-between bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 dark:text-white text-sm">{apiKey.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Created {apiKey.created.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => copyApiKey(apiKey.key, apiKey.id)}
                      className="p-2 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition"
                    >
                      {copiedKeyId === apiKey.id ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                      )}
                    </button>
                    <button
                      onClick={() => deleteApiKey(apiKey.id)}
                      className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Generate API Key Form */}
            {!showApiForm ? (
              <button
                onClick={() => setShowApiForm(true)}
                className="w-full px-6 py-3 rounded-lg font-semibold text-white transition-all"
                style={{ backgroundColor: "#128C7E" }}
              >
                Generate New API Key
              </button>
            ) : (
              <div className="space-y-3 bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                <input
                  type="text"
                  value={apiKeyName}
                  onChange={(e) => setApiKeyName(e.target.value)}
                  placeholder="API Key Name"
                  className="w-full px-4 py-2 bg-white dark:bg-slate-600 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
                />
                <div className="flex gap-3">
                  <button
                    onClick={generateApiKey}
                    className="flex-1 px-4 py-2 rounded-lg font-medium text-white transition-all"
                    style={{ backgroundColor: "#128C7E" }}
                  >
                    Generate
                  </button>
                  <button
                    onClick={() => {
                      setShowApiForm(false)
                      setApiKeyName("")
                    }}
                    className="flex-1 px-4 py-2 rounded-lg font-medium border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
