"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Link from "next/link";
import { Loader2, RotateCcw } from "lucide-react";

const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
});

const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

type SignupFormData = z.infer<typeof signupSchema>;
type OTPFormData = z.infer<typeof otpSchema>;

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<"signup" | "otp">("signup");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);

  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      fullName: "",
    },
  });

  const otpForm = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  // Timer for resend button
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendCountdown > 0) {
      interval = setInterval(() => {
        setResendCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendCountdown]);

  const onSignupSubmit = async (data: SignupFormData) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("Signup error:", result);
        toast.error(result.error || "Signup failed");
        return;
      }

      setEmail(data.email);
      setStep("otp");
      setResendCountdown(60);
      toast.success("OTP sent to your email");
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const onResendOTP = async () => {
    if (resendCountdown > 0) return;
    
    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          fullName: signupForm.getValues("fullName"),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || "Failed to resend OTP");
        setIsLoading(false);
        return;
      }

      setResendCountdown(60);
      otpForm.reset({ otp: "" });
      toast.success("New OTP sent to your email");
      setIsLoading(false);
    } catch (error) {
      toast.error("Failed to resend OTP");
      setIsLoading(false);
    }
  };

  const onOTPSubmit = async (data: OTPFormData) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          otp: data.otp,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        toast.error(error.error || "Verification failed");
        setIsLoading(false);
        return;
      }

      toast.success("Email verified! Redirecting to password setup...");
      // Keep loading true to disable button during redirect
      setTimeout(() => {
        router.push(`/auth/set-password?email=${encodeURIComponent(email)}`);
      }, 1000);
    } catch (error) {
      toast.error("Failed to verify OTP");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>
            {step === "signup"
              ? "Sign up with your email and full name"
              : "Enter the OTP sent to your email"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === "signup" ? (
            <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="John Doe"
                  {...signupForm.register("fullName")}
                  disabled={isLoading}
                />
                {signupForm.formState.errors.fullName && (
                  <p className="text-sm text-red-500 mt-1">
                    {signupForm.formState.errors.fullName.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...signupForm.register("email")}
                  disabled={isLoading}
                />
                {signupForm.formState.errors.email && (
                  <p className="text-sm text-red-500 mt-1">
                    {signupForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full cursor-pointer transition-all bg-[#128C7E] hover:bg-[#0f7469]" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  "Send OTP"
                )}
              </Button>

              <p className="text-sm text-center text-slate-600 dark:text-slate-400">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-[#128C7E] hover:underline">
                  Login
                </Link>
              </p>
            </form>
          ) : (
            <form onSubmit={otpForm.handleSubmit(onOTPSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="otp">Verification Code</Label>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  Sent to: <span className="font-semibold">{email}</span>
                </p>
                
                {/* OTP Input with Individual Digits */}
                <div className="flex justify-center gap-2 mb-4">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <input
                      key={index}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={otpForm.watch("otp")[index] || ""}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        if (value) {
                          const currentOtp = otpForm.getValues("otp").split("");
                          currentOtp[index] = value;
                          const newOtp = currentOtp.join("");
                          otpForm.setValue("otp", newOtp);
                          
                          // Auto-focus next input
                          if (index < 5) {
                            const nextInput = document.querySelector(
                              `input[data-otp-index="${index + 1}"]`
                            ) as HTMLInputElement;
                            nextInput?.focus();
                          }
                        }
                      }}
                      onKeyDown={(e) => {
                        const currentValue = otpForm.getValues("otp")[index];
                        
                        if (e.key === "Backspace") {
                          e.preventDefault();
                          // Delete current digit
                          const currentOtp = otpForm.getValues("otp").split("");
                          currentOtp[index] = "";
                          otpForm.setValue("otp", currentOtp.join(""));
                          
                          // Move to previous input if current is empty
                          if (!currentValue && index > 0) {
                            const prevInput = document.querySelector(
                              `input[data-otp-index="${index - 1}"]`
                            ) as HTMLInputElement;
                            prevInput?.focus();
                          }
                        }
                        
                        // Handle arrow keys
                        if (e.key === "ArrowRight" && index < 5) {
                          const nextInput = document.querySelector(
                            `input[data-otp-index="${index + 1}"]`
                          ) as HTMLInputElement;
                          nextInput?.focus();
                        }
                        if (e.key === "ArrowLeft" && index > 0) {
                          const prevInput = document.querySelector(
                            `input[data-otp-index="${index - 1}"]`
                          ) as HTMLInputElement;
                          prevInput?.focus();
                        }
                      }}
                      onPaste={(e) => {
                        e.preventDefault();
                        const pastedData = e.clipboardData.getData("text").replace(/[^0-9]/g, "");
                        if (pastedData.length > 0) {
                          // Take only 6 digits max
                          const digitsToUse = pastedData.slice(0, 6);
                          otpForm.setValue("otp", digitsToUse);
                          
                          // Focus on the last filled input
                          const focusIndex = Math.min(digitsToUse.length, 5);
                          setTimeout(() => {
                            const focusInput = document.querySelector(
                              `input[data-otp-index="${focusIndex}"]`
                            ) as HTMLInputElement;
                            focusInput?.focus();
                          }, 0);
                        }
                      }}
                      data-otp-index={index}
                      className="w-14 h-16 text-center text-3xl font-bold border-2 border-slate-300 dark:border-slate-600 rounded-lg focus:border-[#128C7E] focus:ring-2 focus:ring-[#128C7E] focus:ring-opacity-20 transition-all dark:bg-slate-800 dark:text-white"
                    />
                  ))}
                </div>

                {otpForm.formState.errors.otp && (
                  <p className="text-sm text-red-500 mt-2">
                    {otpForm.formState.errors.otp.message}
                  </p>
                )}
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                  Code expires in 15 minutes
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full cursor-pointer transition-all bg-[#128C7E] hover:bg-[#0f7469]" 
                disabled={isLoading || otpForm.getValues("otp").length !== 6}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify Email"
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full cursor-pointer transition-all"
                onClick={onResendOTP}
                disabled={resendCountdown > 0 || isLoading}
              >
                {resendCountdown > 0 ? (
                  <>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Resend in {resendCountdown}s
                  </>
                ) : (
                  <>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Resend OTP
                  </>
                )}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
