"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Lock, Bell, Moon, Globe, Eye, Trash2 } from "lucide-react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    twoFactorEnabled: false,
    emailNotifications: true,
    darkMode: true,
    language: "en",
    sessionTimeout: 30,
  })

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div>
          <Link href="/customers/dashboard" className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-4 transition">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Settings</h1>
        </div>

        {/* Settings Cards */}
        <div className="mt-8 space-y-6">
          {/* Security */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-8">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-6 h-6" style={{ color: "#128C7E" }} />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Security</h2>
            </div>

            <div className="space-y-6">
              {/* Two Factor Auth */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-700">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white mb-1">Two-Factor Authentication</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Add an extra layer of security to your account</p>
                </div>
                <button
                  onClick={() => setSettings({ ...settings, twoFactorEnabled: !settings.twoFactorEnabled })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.twoFactorEnabled ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-600"}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.twoFactorEnabled ? "translate-x-6" : "translate-x-1"}`}
                  />
                </button>
              </div>

              {/* Change Password */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white mb-1">Change Password</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Update your account password</p>
                </div>
                <button
                  className="px-6 py-2 rounded-lg font-medium border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
                >
                  Change
                </button>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-8">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-6 h-6" style={{ color: "#128C7E" }} />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Notifications</h2>
            </div>

            <div className="space-y-6">
              {/* Email Notifications */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white mb-1">Email Notifications</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Get updates about your services and billing</p>
                </div>
                <button
                  onClick={() => setSettings({ ...settings, emailNotifications: !settings.emailNotifications })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.emailNotifications ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-600"}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.emailNotifications ? "translate-x-6" : "translate-x-1"}`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-8">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-6 h-6" style={{ color: "#128C7E" }} />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Preferences</h2>
            </div>

            <div className="space-y-6">
              {/* Language */}
              <div>
                <label className="text-sm font-semibold text-slate-900 dark:text-white mb-2 block">Language</label>
                <select
                  value={settings.language}
                  onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-600 rounded-lg"
                >
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                </select>
              </div>

              {/* Session Timeout */}
              <div>
                <label className="text-sm font-semibold text-slate-900 dark:text-white mb-2 block">Session Timeout (minutes)</label>
                <input
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => setSettings({ ...settings, sessionTimeout: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-600 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800 p-8">
            <h2 className="text-xl font-bold text-red-900 dark:text-red-100 mb-6">Danger Zone</h2>

            <div className="space-y-4">
              {/* Logout All Sessions */}
              <div className="flex items-center justify-between pb-4 border-b border-red-200 dark:border-red-800">
                <div>
                  <p className="font-semibold text-red-900 dark:text-red-100 mb-1">Logout All Sessions</p>
                  <p className="text-sm text-red-800 dark:text-red-200">Log out from all active sessions on other devices</p>
                </div>
                <button className="px-6 py-2 rounded-lg font-medium border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/40 transition-all">
                  Logout
                </button>
              </div>

              {/* Delete Account */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-red-900 dark:text-red-100 mb-1 flex items-center gap-2">
                    <Trash2 className="w-4 h-4" />
                    Delete Account
                  </p>
                  <p className="text-sm text-red-800 dark:text-red-200">Permanently delete your account and all data</p>
                </div>
                <button className="px-6 py-2 rounded-lg font-medium bg-red-600 text-white hover:bg-red-700 transition-all cursor-pointer">
                  Delete
                </button>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex gap-4">
            <button
              className="px-6 py-3 rounded-lg font-semibold text-white transition-all cursor-pointer"
              style={{ backgroundColor: "#128C7E" }}
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
