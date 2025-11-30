"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Lock, Key, Copy, Check, Trash2, Sun, Moon, Eye, EyeOff, Mail, AlertCircle } from "lucide-react"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface ApiKey {
  id: string
  name: string
  key: string
  created: string | Date
}

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Password change state
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSavingPassword, setIsSavingPassword] = useState(false)
  const [lastValidationCheck, setLastValidationCheck] = useState<number>(0)

  // API Keys state
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([])
  const [showApiForm, setShowApiForm] = useState(false)
  const [apiKeyName, setApiKeyName] = useState("")
  const [isGeneratingKey, setIsGeneratingKey] = useState(false)
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null)

  // Newsletter state
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null)
  const [isUpdatingNewsletter, setIsUpdatingNewsletter] = useState(false)

  // API Key visibility state
  const [showFullKey, setShowFullKey] = useState<string | null>(null)
  const [showNewKeyModal, setShowNewKeyModal] = useState(false)
  const [newGeneratedKey, setNewGeneratedKey] = useState<{ key: string; name: string } | null>(null)
  const [hasConfirmedCopy, setHasConfirmedCopy] = useState(false)

  useEffect(() => setMounted(true), [])

  // Check authentication and load data
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me")
        if (res.ok) {
          const data = await res.json()
          if (data.authenticated) {
            setIsAuthenticated(true)
            // Load API keys
            await loadApiKeys()
            // Load newsletter status
            await loadNewsletterStatus()
          } else {
            router.push("/login")
          }
        } else {
          router.push("/login")
        }
      } catch (err) {
        console.error("Auth check error:", err)
        router.push("/login")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const loadApiKeys = async () => {
    try {
      const res = await fetch("/api/auth/api-keys")
      if (res.ok) {
        const data = await res.json()
        if (data.apiKeys && Array.isArray(data.apiKeys)) {
          setApiKeys(data.apiKeys)
        }
      }
    } catch (err) {
      console.error("Error loading API keys:", err)
      setApiKeys([])
    }
  }

  const loadNewsletterStatus = async () => {
    try {
      const res = await fetch("/api/auth/newsletter-status")
      if (res.ok) {
        const data = await res.json()
        setIsSubscribed(data.isSubscribed)
      }
    } catch (err) {
      console.error("Error loading newsletter status:", err)
    }
  }

  // Monitor password validation
  useEffect(() => {
    if (!newPassword) return

    const now = Date.now()
    if (now - lastValidationCheck < 1500) return
    setLastValidationCheck(now)

    const hasMinLength = newPassword.length >= 6
    const hasUppercase = /[A-Z]/.test(newPassword)
    const hasLowercase = /[a-z]/.test(newPassword)
    const hasNumber = /[0-9]/.test(newPassword)
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword)
    const allValid = hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecial

    if (allValid) {
      toast.success("✓ Password meets all requirements", { id: "pwd-validation" })
    } else {
      const missing = []
      if (!hasMinLength) missing.push("6+ chars")
      if (!hasUppercase) missing.push("uppercase")
      if (!hasLowercase) missing.push("lowercase")
      if (!hasNumber) missing.push("number")
      if (!hasSpecial) missing.push("special char")
      toast.loading(`Missing: ${missing.join(", ")}`, { id: "pwd-validation" })
    }
  }, [newPassword, lastValidationCheck])

  // Monitor confirm password
  useEffect(() => {
    if (!newPassword || !confirmPassword) return

    if (newPassword === confirmPassword) {
      toast.success("✓ Passwords match", { id: "confirm-validation" })
    } else if (confirmPassword.length > 0) {
      toast.error("✗ Passwords don't match", { id: "confirm-validation" })
    }
  }, [confirmPassword, newPassword])

  const validatePassword = (pwd: string) => {
    if (pwd.length < 6) return { valid: false, message: "Password must be at least 6 characters" }
    if (!/[a-z]/.test(pwd)) return { valid: false, message: "Password must contain at least one lowercase letter" }
    if (!/[A-Z]/.test(pwd)) return { valid: false, message: "Password must contain at least one uppercase letter" }
    if (!/[0-9]/.test(pwd)) return { valid: false, message: "Password must contain at least one number" }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)) {
      return { valid: false, message: "Password must contain at least one special character" }
    }
    return { valid: true, message: "" }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields")
      return
    }

    const validation = validatePassword(newPassword)
    if (!validation.valid) {
      toast.error(validation.message)
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    setIsSavingPassword(true)
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        toast.success("Password changed successfully! Check your email for confirmation.")
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
      } else {
        toast.error(data.error || "Failed to change password")
      }
    } catch (err) {
      console.error("Change password error:", err)
      toast.error("Failed to change password")
    } finally {
      setIsSavingPassword(false)
    }
  }

  const handleGenerateApiKey = async () => {
    if (!apiKeyName.trim()) {
      toast.error("Please enter an API key name")
      return
    }

    setIsGeneratingKey(true)
    try {
      const res = await fetch("/api/auth/api-keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: apiKeyName.trim() }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        // Add the new key to state without Date conversion
        setApiKeys([data.apiKey, ...apiKeys])
        setApiKeyName("")
        setShowApiForm(false)
        // Show modal to copy the key
        setNewGeneratedKey({
          key: data.apiKey.key,
          name: data.apiKey.name,
        })
        setShowNewKeyModal(true)
      } else {
        toast.error(data.error || "Failed to generate API key")
      }
    } catch (err) {
      console.error("Generate API key error:", err)
      toast.error("Failed to generate API key")
    } finally {
      setIsGeneratingKey(false)
    }
  }

  const handleDeleteApiKey = async (id: string) => {
    try {
      const res = await fetch(`/api/auth/api-keys?id=${id}`, {
        method: "DELETE",
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setApiKeys(apiKeys.filter((k) => k.id !== id))
        toast.success("API key deleted successfully")
      } else {
        toast.error(data.error || "Failed to delete API key")
      }
    } catch (err) {
      console.error("Delete API key error:", err)
      toast.error("Failed to delete API key")
    }
  }

  const handleCopyApiKey = (key: string, id: string) => {
    navigator.clipboard.writeText(key)
    toast.success("API key copied to clipboard!")
    setCopiedKeyId(id)
    setTimeout(() => setCopiedKeyId(null), 2000)
  }

  const handleNewsletterToggle = async () => {
    setIsUpdatingNewsletter(true)
    try {
      const res = await fetch("/api/auth/newsletter-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscribe: !isSubscribed }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setIsSubscribed(!isSubscribed)
        toast.success(data.message)
      } else {
        toast.error(data.error || "Failed to update newsletter status")
      }
    } catch (err) {
      console.error("Newsletter update error:", err)
      toast.error("Failed to update newsletter status")
    } finally {
      setIsUpdatingNewsletter(false)
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-slate-300 dark:border-slate-700 border-t-teal-600 dark:border-t-teal-400"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </main>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  // Helper function to mask API key
  const maskApiKey = (key: string): string => {
    if (key.length <= 20) return key
    const prefix = key.slice(0, 5) // First 5 chars (kh-XX)
    const suffix = key.slice(-5) // Last 5 chars
    const masked = "•".repeat(20) // 20 dots for middle part
    return `${prefix}${masked}${suffix}`
  }

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/customers/dashboard"
            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </Link>
          <button
            aria-label="Toggle theme"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg transition"
          >
            {mounted &&
              (resolvedTheme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" />
              ))}
          </button>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Settings</h1>

        {/* Settings Grid */}
        <div className="space-y-6">
          {/* Change Password Section */}
          <section className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Change Password</h2>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4">
              {/* Current Password */}
              <div className="relative">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    disabled={isSavingPassword}
                    className="w-full px-4 py-2 pr-10 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 dark:focus:ring-teal-400 disabled:opacity-50 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  >
                    {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="relative">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password (min 6 chars, 1 upper, 1 lower, 1 num, 1 special)"
                    disabled={isSavingPassword}
                    className="w-full px-4 py-2 pr-10 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 dark:focus:ring-teal-400 disabled:opacity-50 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    disabled={isSavingPassword}
                    className="w-full px-4 py-2 pr-10 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 dark:focus:ring-teal-400 disabled:opacity-50 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSavingPassword}
                className="w-full px-4 py-2 bg-teal-600 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700 text-white font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSavingPassword ? "Saving..." : "Save Password"}
              </button>
            </form>
          </section>

          {/* Newsletter Section */}
          <section className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Newsletter</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {isSubscribed ? "You are subscribed" : "You are not subscribed"}
                  </p>
                </div>
              </div>
              <button
                onClick={handleNewsletterToggle}
                disabled={isUpdatingNewsletter}
                className={`px-6 py-2 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed ${
                  isSubscribed
                    ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50"
                    : "bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 hover:bg-teal-200 dark:hover:bg-teal-900/50"
                }`}
              >
                {isSubscribed ? "Unsubscribe" : "Subscribe"}
              </button>
            </div>
          </section>

          {/* API Keys Section */}
          <section className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Key className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">API Keys</h2>
            </div>

            {/* API Keys Table */}
            {apiKeys.length > 0 && (
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Key</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Created</th>
                      <th className="text-right py-3 px-4 font-semibold text-slate-900 dark:text-white">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {apiKeys.map((apiKey) => (
                      <tr key={apiKey.id} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                        <td className="py-3 px-4 text-slate-900 dark:text-white">{apiKey.name}</td>
                        <td className="py-3 px-4 font-mono text-xs text-slate-600 dark:text-slate-400">
                          {maskApiKey(apiKey.key)}
                        </td>
                        <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                          {new Date(apiKey.created).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex gap-2 justify-end">
                            <button
                              onClick={() => handleDeleteApiKey(apiKey.id)}
                              className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition"
                              title="Delete API key"
                            >
                              <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Generate API Key Form */}
            {!showApiForm ? (
              <button
                onClick={() => setShowApiForm(true)}
                disabled={apiKeys.length >= 10}
                className="w-full px-4 py-2 bg-teal-600 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700 text-white font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {apiKeys.length >= 10 ? "Maximum keys reached" : "Generate New API Key"}
              </button>
            ) : (
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 space-y-3">
                <input
                  type="text"
                  value={apiKeyName}
                  onChange={(e) => setApiKeyName(e.target.value)}
                  placeholder="API Key Name (e.g., Production, Development)"
                  maxLength={50}
                  className="w-full px-4 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 dark:focus:ring-teal-400"
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleGenerateApiKey}
                    disabled={isGeneratingKey}
                    className="flex-1 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition disabled:opacity-50"
                  >
                    {isGeneratingKey ? "Generating..." : "Generate"}
                  </button>
                  <button
                    onClick={() => {
                      setShowApiForm(false)
                      setApiKeyName("")
                    }}
                    className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 font-medium rounded-lg transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* New API Key Modal */}
      {showNewKeyModal && newGeneratedKey && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-900 rounded-lg max-w-md w-full p-6 space-y-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Save Your API Key Now</h3>
            </div>
            
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-3 space-y-2">
              <p className="text-sm font-semibold text-red-800 dark:text-red-200">Important Security Notice:</p>
              <p className="text-sm text-red-700 dark:text-red-300">
                For security reasons, you will never be able to see this API key again after closing this dialog. You must copy it now and store it in a secure location.
              </p>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg space-y-2">
              <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold">Key Name:</p>
              <p className="font-semibold text-slate-900 dark:text-white">{newGeneratedKey.name}</p>
              
              <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold mt-4">Your API Key:</p>
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-3 break-all font-mono text-xs text-slate-900 dark:text-white select-all">
                {newGeneratedKey.key}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Click the key above to select all, then copy (Ctrl+C / Cmd+C)</p>
            </div>

            {/* Copy Confirmation Checkbox */}
            <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <input
                type="checkbox"
                id="confirm-copy"
                checked={hasConfirmedCopy}
                onChange={(e) => setHasConfirmedCopy(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-teal-600 focus:ring-teal-600 cursor-pointer"
              />
              <label htmlFor="confirm-copy" className="text-sm text-slate-700 dark:text-slate-300 cursor-pointer flex-1">
                I have copied and stored my API key in a secure location
              </label>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(newGeneratedKey.key)
                  toast.success("API key copied to clipboard!")
                }}
                className="flex-1 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition flex items-center justify-center gap-2"
              >
                <Copy className="w-4 h-4" />
                Copy to Clipboard
              </button>
              <button
                onClick={() => {
                  if (!hasConfirmedCopy) {
                    toast.error("Please confirm you have saved the API key")
                    return
                  }
                  setShowNewKeyModal(false)
                  setNewGeneratedKey(null)
                  setHasConfirmedCopy(false)
                  toast.success("API key created successfully. You can now use it!", { duration: 3000 })
                }}
                disabled={!hasConfirmedCopy}
                className="flex-1 px-4 py-2 bg-slate-600 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}
    </main>
  )
}
