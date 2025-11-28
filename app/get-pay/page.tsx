"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Upload, X, AlertCircle, CheckCircle2, User, Mail, Phone, MapPin, Info } from "lucide-react"
import { toast } from "sonner"

interface PaymentProof {
  images: File[]
  description: string
}

export default function GetPayPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [contactFullName, setContactFullName] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const [contactAddress, setContactAddress] = useState("")

  useEffect(() => {
    // Check authentication server-side via API (httpOnly cookie)
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me")
        if (res.ok) {
          const data = await res.json()
          if (data.authenticated) {
            setIsAuthenticated(true)
            // Only prefill email
            setContactEmail(data.user?.email || "")
          }
        }
      } catch (err) {
        console.error("Error checking auth for get-pay:", err)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (!files) return

    if (uploadedImages.length + files.length > 5) {
      alert("Maximum 5 images allowed")
      return
    }

    const newImages = Array.from(files).map((file) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      return new Promise<string>((resolve) => {
        reader.onload = () => {
          resolve(reader.result as string)
        }
      })
    })

    Promise.all(newImages).then((images) => {
      setUploadedImages([...uploadedImages, ...images])
    })
  }

  const removeImage = (index: number) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (uploadedImages.length === 0) {
      alert("Please upload at least one payment proof image")
      return
    }

    if (!description.trim()) {
      alert("Please describe your payment")
      return
    }

    if (!contactFullName.trim()) {
      alert("Please enter your full name")
      return
    }

    if (!contactPhone.trim()) {
      alert("Please enter your phone number")
      return
    }

    if (!contactAddress.trim()) {
      alert("Please enter your address")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/payment/submit-proof", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          images: uploadedImages,
          description: description.trim(),
          fullName: contactFullName || null,
          email: contactEmail,
          phone: contactPhone,
          address: contactAddress,
        }),
      })

      if (response.ok) {
        toast.success("Payment proof submitted successfully!", { duration: 5000 })
        setSubmitSuccess(true)
        setUploadedImages([])
        setDescription("")
        setTimeout(() => {
          router.push("/dashboard")
        }, 5000)
      } else {
        alert("Failed to submit proof")
      }
    } catch (error) {
      alert("An error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-teal-200 border-t-teal-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </main>
    )
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 text-center">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
              Authentication Required
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              You must be logged into a valid KmerHosting account to access this page.
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              ✓ You are accessing this page because you are an authenticated KmerHosting user.
              Always verify the URL is <strong>kmerhosting.com</strong>
            </p>
            <Link
              href="/login"
              className="inline-block px-6 py-2 rounded-lg font-medium text-white transition-all"
              style={{ backgroundColor: "#128C7E" }}
            >
              Go to Login
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Minimal Auth Bar */}
        <div className="border-l-4 border-teal-500 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-sm mb-8 flex items-center justify-between">
          <p className="text-xs text-slate-700 dark:text-slate-300">Authenticated user: {contactEmail}</p>
        </div>
        
        {/* Main Content */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Submit Payment Proof
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Send your payment evidence and we'll verify and activate your service shortly.
          </p>

          {submitSuccess ? (
            <div className="text-center py-12">
              <CheckCircle2 className="w-16 h-16 mx-auto mb-4" style={{ color: "#128C7E" }} />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Payment Proof Submitted!
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Thank you! We'll verify your payment and activate your service within 15 minutes.
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-700 p-4 rounded-lg mb-6">
                You'll see your service in your dashboard once it's activated. If there's any issue, contact us at <strong>support@kmerhosting.com</strong> with subject <strong>"WAITING SERVICES ACTIVATION"</strong>
              </p>
              <Link
                href="/dashboard"
                className="inline-block px-6 py-2 rounded-lg font-medium text-white"
                style={{ backgroundColor: "#128C7E" }}
              >
                Go to Dashboard
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Payment Instructions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-900 dark:text-white">Payment Instructions</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Transfer the amount shown in your order to one of our official accounts below.</p>

                  <div className="bg-white dark:bg-slate-800 p-4 rounded-md border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-3 mb-3">
                      <Phone className="w-4 h-4 text-slate-600" />
                      <div>
                        <div className="text-sm font-medium text-slate-900 dark:text-white">Orange Money</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400 font-mono">+237 694 193 493</div>
                        <div className="text-xs text-slate-500 dark:text-slate-300">TOSCANI TENEKEU MODJOU</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-slate-600" />
                      <div>
                        <div className="text-sm font-medium text-slate-900 dark:text-white">MTN Mobile Money</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400 font-mono">+237 652 903 110</div>
                        <div className="text-xs text-slate-500 dark:text-slate-300">TOSCANI TENEKEU MODJOU</div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center gap-3">
                      <Mail className="w-4 h-4 text-slate-600" />
                      <div>
                        <div className="text-sm font-medium text-slate-900 dark:text-white">Support Email</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400 font-mono">support@kmerhosting.com</div>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    <strong>Note:</strong> These official numbers are used to receive your payment. Any other numbers are not associated with KmerHosting.
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-4 rounded-md border border-slate-200 dark:border-slate-700">
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-3">Your billing details</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2"><User className="w-3 h-3" /> Full name <span className="text-red-500">*</span></label>
                      <input required value={contactFullName} onChange={(e) => setContactFullName(e.target.value)} placeholder="John Doe" className="w-full mt-1 px-3 py-2 text-sm rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
                    </div>
                    <div>
                      <label className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2"><Mail className="w-3 h-3" /> Email</label>
                      <input value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="you@email.com" className="w-full mt-1 px-3 py-2 text-sm rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
                    </div>
                    <div>
                      <label className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2"><Phone className="w-3 h-3" /> Phone <span className="text-red-500">*</span></label>
                      <input required value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} placeholder="e.g., +237 6xx xxx xxx" className="w-full mt-1 px-3 py-2 text-sm rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
                    </div>
                    <div>
                      <label className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2"><MapPin className="w-3 h-3" /> Address <span className="text-red-500">*</span></label>
                      <input required value={contactAddress} onChange={(e) => setContactAddress(e.target.value)} placeholder="Yaounde, Nkoabang, ..." className="w-full mt-1 px-3 py-2 text-sm rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 flex items-start gap-2">
                      <Info className="w-3 h-3 mt-0.5" />
                      <div>These details are used only to create your invoice and will not be shared publicly.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">
                  Upload Payment Proof (Max 5 images) *
                </label>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                  {uploadedImages.map((image, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={image}
                        alt={`Proof ${idx + 1}`}
                        className="w-full h-24 object-cover rounded-lg border border-slate-300 dark:border-slate-600"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {uploadedImages.length < 5 && (
                    <label className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                      <Upload className="w-6 h-6 text-slate-400 mb-1" />
                      <span className="text-xs text-slate-600 dark:text-slate-400">
                        Add image
                      </span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Upload screenshots of your payment confirmation, receipt, or transaction evidence.
                </p>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">
                  Payment Description *
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="E.g., Sent 50,000 FCFA via Orange Money to +237 694 193 493 at 3:45 PM on Nov 26"
                  className="w-full px-4 py-3 h-24 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-lg font-medium text-white transition-all cursor-pointer"
                style={{
                  backgroundColor: isSubmitting ? "#999" : "#128C7E",
                }}
                onMouseEnter={(e) =>
                  !isSubmitting &&
                  (e.currentTarget.style.backgroundColor = "#0a6f62")
                }
                onMouseLeave={(e) =>
                  !isSubmitting &&
                  (e.currentTarget.style.backgroundColor = "#128C7E")
                }
              >
                {isSubmitting ? "Submitting..." : "Submit Payment Proof"}
              </button>

              {/* Help Text */}
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                <p className="text-sm text-amber-900 dark:text-amber-100">
                  <strong>After submission:</strong> We'll verify your payment within 15 minutes. You'll receive a confirmation email and your service will appear in your dashboard. If you experience any delays, contact support@kmerhosting.com with subject "<strong>WAITING SERVICES ACTIVATION</strong>" and your order ID as message.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}
