"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle2, Loader, Lock } from "lucide-react";
import LoadingSpinner from "./loading-spinner";
import { toast } from "sonner";

interface SalesContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SalesContactDialog({ open, onOpenChange }: SalesContactDialogProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [captcha, setCaptcha] = useState<{ num1: number; num2: number; answer: number } | null>(null);

  // Generate random math CAPTCHA
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setCaptcha({ num1, num2, answer: num1 + num2 });
    setCaptchaAnswer("");
  };

  // Initialize CAPTCHA and reset form when dialog opens
  useEffect(() => {
    if (open) {
      generateCaptcha();
      // Reset form
      setFullName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setCaptchaAnswer("");
      setSuccess(false);
      setError("");
    }
  }, [open]);

  const handleOpenChange = (newOpen: boolean) => {
    onOpenChange(newOpen);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate fields
    if (!fullName.trim()) {
      setError("Please enter your full name");
      return;
    }
    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }
    if (!subject.trim()) {
      setError("Please enter a subject");
      return;
    }
    if (!message.trim()) {
      setError("Please enter your message");
      return;
    }
    if (message.trim().length < 10) {
      setError("Message must be at least 10 characters");
      return;
    }
    if (!captchaAnswer) {
      setError("Please answer the math question");
      return;
    }
    if (parseInt(captchaAnswer) !== captcha?.answer) {
      setError("Incorrect answer to the math question. Please try again.");
      generateCaptcha();
      setCaptchaAnswer("");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/contact/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          subject: subject.trim(),
          message: message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to send your inquiry. Please try again.");
        setLoading(false);
        return;
      }

      toast.success("Inquiry sent successfully! We'll get back to you soon.", { duration: 5000 });
      setSuccess(true);
      setLoading(false);

      // Close dialog after 5 seconds
      setTimeout(() => {
        handleOpenChange(false);
      }, 5000);
    } catch (err) {
      setError("An error occurred. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-xl">Contact Our Sales Team</DialogTitle>
          <DialogDescription className="text-sm">Quick inquiry - we'll respond within 24 hours</DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="flex flex-col items-center justify-center gap-3 py-6">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
            <div className="text-center">
              <p className="font-semibold">Thank You!</p>
              <p className="text-xs text-gray-600">Your inquiry has been sent. We'll respond soon.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            {error && (
              <div className="flex gap-2 rounded-md bg-red-50 p-2 text-xs text-red-700">
                <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="fullName" className="text-xs">Full Name *</Label>
                <Input
                  id="fullName"
                  placeholder="Your name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={loading}
                  className="h-8 text-sm"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="email" className="text-xs">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="h-8 text-sm"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="subject" className="text-xs">Subject *</Label>
              <Input
                id="subject"
                placeholder="What is your inquiry about?"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                disabled={loading}
                className="h-8 text-sm"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="message" className="text-xs">Message *</Label>
              <Textarea
                id="message"
                placeholder="Tell us about your hosting needs (min 10 chars)..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={loading}
                rows={2}
                className="text-sm resize-none"
              />
            </div>

            {/* Math CAPTCHA */}
            {captcha && (
              <div className="rounded-md bg-blue-50 dark:bg-blue-950 p-3 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <p className="text-xs font-semibold text-blue-900 dark:text-blue-100">
                    What is {captcha.num1} + {captcha.num2}?
                  </p>
                </div>
                <Input
                  id="captcha"
                  type="number"
                  placeholder="Answer"
                  value={captchaAnswer}
                  onChange={(e) => setCaptchaAnswer(e.target.value)}
                  disabled={loading}
                  className="h-8 text-sm w-20"
                />
              </div>
            )}

            <Button type="submit" disabled={loading} className="w-full h-8 text-sm cursor-pointer">
              {loading ? (
                <>
                  <LoadingSpinner /> Sending...
                </>
              ) : (
                "Send Inquiry"
              )}
            </Button>

            <p className="text-xs text-gray-500 text-center">
              We'll only use your info to respond to your inquiry.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
