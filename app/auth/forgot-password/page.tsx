"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Mail, ArrowLeft, Check } from "lucide-react";
import Navbar from "@/components/navbar";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Failed to process request");
        return;
      }

      setIsSubmitted(true);
      toast.success("Request processed successfully");
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <Navbar />
        <div className="max-w-md mx-auto px-4 py-10">
          <div className="flex justify-center mb-8">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-white3-iwSBPyXwwEwkqAnSXqbITic8Ldae9l.png"
              alt="KmerHosting"
              className="h-auto w-40"
            />
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Check Your Email</h2>

            <p className="text-slate-600 dark:text-slate-400 mb-6">
              If an account exists with the email address <strong>{email}</strong>, you will receive a password reset link shortly.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm text-blue-900 dark:text-blue-200">
                <strong>Next Steps:</strong>
              </p>
              <ul className="text-sm text-blue-900 dark:text-blue-200 mt-2 space-y-2 list-disc list-inside">
                <li>Open the reset link we sent to your email</li>
                <li>Follow the instructions to create a new password</li>
                <li>If you don't see the email, please check your spam folder</li>
              </ul>
            </div>

            <Button
              onClick={() => router.push("/")}
              className="w-full mb-3 font-semibold py-2 text-white hover:opacity-90 cursor-pointer flex items-center justify-center gap-2"
              style={{ backgroundColor: "#128C7E" }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>

            <Button
              onClick={() => router.push("/auth/login")}
              variant="outline"
              className="w-full font-semibold py-2 cursor-pointer"
            >
              Back to Login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar />
      <div className="max-w-md mx-auto px-4 py-10">
        <div className="flex justify-center mb-8">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-white3-iwSBPyXwwEwkqAnSXqbITic8Ldae9l.png"
            alt="KmerHosting"
            className="h-auto w-40"
          />
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Reset Password</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Enter your email address and we'll send you a link to reset your password.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="pl-10"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading || !email}
              className="w-full font-semibold py-2 text-white hover:opacity-90 cursor-pointer disabled:opacity-50"
              style={{ backgroundColor: "#128C7E" }}
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Remember your password?{" "}
              <Link href="/auth/login" className="font-semibold hover:underline" style={{ color: "#128C7E" }}>
                Back to Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
