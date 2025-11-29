"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, Copy, Check } from "lucide-react"

export default function ProfilePage() {
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  const [profile, setProfile] = useState({
    firstName: "Toscani",
    lastName: "TENEKEU",
    email: "toscani@kmerhosting.com",
    phone: "+237 6XX XXX XXX",
    country: "Cameroon",
    city: "Yaoundé",
    joinDate: "2024-01-15",
  })

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/customers/dashboard" className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-4 transition">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Profile</h1>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${isEditing ? "bg-red-500 hover:bg-red-600 text-white" : "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100"}`}
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-8">
          {/* Avatar Section */}
          <div className="flex items-center justify-between mb-8 pb-8 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white" style={{ backgroundColor: "#128C7E" }}>
                {profile.firstName[0]}{profile.lastName[0]}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                  {profile.firstName} {profile.lastName}
                </h2>
                <p className="text-slate-600 dark:text-slate-400">Premium Member</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-600 dark:text-slate-400 uppercase font-semibold mb-1">Member Since</p>
              <p className="text-slate-900 dark:text-white font-semibold">{new Date(profile.joinDate).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Profile Info Grid */}
          <div className="space-y-6">
            {/* First Name & Last Name */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs text-slate-600 dark:text-slate-400 uppercase font-semibold mb-2 block">First Name</label>
                <input
                  type="text"
                  value={profile.firstName}
                  disabled={!isEditing}
                  onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-600 rounded-lg disabled:opacity-50"
                />
              </div>
              <div>
                <label className="text-xs text-slate-600 dark:text-slate-400 uppercase font-semibold mb-2 block">Last Name</label>
                <input
                  type="text"
                  value={profile.lastName}
                  disabled={!isEditing}
                  onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-600 rounded-lg disabled:opacity-50"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-xs text-slate-600 dark:text-slate-400 uppercase font-semibold mb-2 block flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={profile.email}
                  disabled
                  className="flex-1 px-4 py-2 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-600 rounded-lg opacity-50"
                />
                <button
                  onClick={() => handleCopy(profile.email, "email")}
                  className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  {copiedField === "email" ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600 dark:text-slate-400" />}
                </button>
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="text-xs text-slate-600 dark:text-slate-400 uppercase font-semibold mb-2 block flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone
              </label>
              <input
                type="tel"
                value={profile.phone}
                disabled={!isEditing}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-600 rounded-lg disabled:opacity-50"
              />
            </div>

            {/* Location */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs text-slate-600 dark:text-slate-400 uppercase font-semibold mb-2 block flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Country
                </label>
                <input
                  type="text"
                  value={profile.country}
                  disabled={!isEditing}
                  onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-600 rounded-lg disabled:opacity-50"
                />
              </div>
              <div>
                <label className="text-xs text-slate-600 dark:text-slate-400 uppercase font-semibold mb-2 block">City</label>
                <input
                  type="text"
                  value={profile.city}
                  disabled={!isEditing}
                  onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-600 rounded-lg disabled:opacity-50"
                />
              </div>
            </div>

            {/* Save Button */}
            {isEditing && (
              <div className="flex gap-4 pt-6">
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 px-6 py-3 rounded-lg font-semibold text-white transition-all cursor-pointer"
                  style={{ backgroundColor: "#128C7E" }}
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
