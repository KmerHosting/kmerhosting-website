"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Copy, RefreshCw, Eye, EyeOff, Lock, User } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { checkPasswordStrength, generateStrongPassword } from "@/lib/password-utils";

const passwordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type PasswordFormData = z.infer<typeof passwordSchema>;

interface PasswordStrengthState {
  score: number;
  level: "weak" | "fair" | "good" | "strong";
  feedback: string[];
}

function SetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrengthState | null>(null);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [fullName, setFullName] = useState("");

  const form = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handlePasswordChange = (value: string) => {
    form.setValue("password", value);
    if (value) {
      const strength = checkPasswordStrength(value);
      setPasswordStrength(strength);
    } else {
      setPasswordStrength(null);
    }
  };

  const handleGeneratePassword = () => {
    const newPassword = generateStrongPassword(16);
    setGeneratedPassword(newPassword);
    handlePasswordChange(newPassword);
    form.setValue("confirmPassword", newPassword);
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(generatedPassword);
    toast.success("Password copied to clipboard");
  };

  const getStrengthColor = () => {
    if (!passwordStrength) return "bg-gray-200";
    switch (passwordStrength.level) {
      case "weak":
        return "bg-red-500";
      case "fair":
        return "bg-orange-500";
      case "good":
        return "bg-yellow-500";
      case "strong":
        return "bg-green-500";
    }
  };

  const getStrengthText = () => {
    if (!passwordStrength) return "";
    return passwordStrength.level.charAt(0).toUpperCase() + passwordStrength.level.slice(1);
  };

  const onSubmit = async (data: PasswordFormData) => {
    if (!email) {
      toast.error("Email not found. Please start signup again.");
      router.push("/auth/signup");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/set-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        toast.error(error.error || "Failed to set password");
        return;
      }

      toast.success("Account created successfully! Redirecting to dashboard...");
      setIsLoading(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (error) {
      toast.error("Failed to set password");
      setIsLoading(false);
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-500 mb-4">Email not found. Please start signup again.</p>
            <Button
              onClick={() => router.push("/auth/signup")}
              className="w-full"
            >
              Back to Signup
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Complete Your Account</CardTitle>
          <CardDescription>
            Set a password to secure your KmerHosting account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            {/* Password Field */}
            <div>
              <Label htmlFor="password" className="sr-only">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  {...form.register("password")}
                  onChange={(e) => {
                    handlePasswordChange(e.target.value);
                    form.setValue("password", e.target.value);
                  }}
                  disabled={isLoading}
                  className="pl-10 pr-10 h-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {form.formState.errors.password && (
                <p className="text-xs text-red-500 mt-1.5">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <Label htmlFor="confirmPassword" className="sr-only">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm password"
                  {...form.register("confirmPassword")}
                  disabled={isLoading}
                  className="pl-10 pr-10 h-11"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {form.formState.errors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1.5">
                  {form.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Generated Password Display */}
            {generatedPassword && (
              <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded border border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">Generated Password</p>
                <div className="flex items-center justify-between gap-2">
                  <code className="text-xs font-mono break-all">{generatedPassword}</code>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyPassword}
                    className="h-auto p-1"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Password Strength Indicator - Below Form */}
            {form.watch("password") && (
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded border border-slate-200 dark:border-slate-700 space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-slate-600 dark:text-slate-400 font-semibold">Password Strength</span>
                    <span
                      className={`font-semibold ${
                        passwordStrength?.level === "weak"
                          ? "text-red-500"
                          : passwordStrength?.level === "fair"
                          ? "text-orange-500"
                          : passwordStrength?.level === "good"
                          ? "text-yellow-500"
                          : "text-green-500"
                      }`}
                    >
                      {getStrengthText()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full ${getStrengthColor()} transition-all duration-300`}
                      style={{ width: `${passwordStrength?.score || 0}%` }}
                    />
                  </div>
                </div>

                {passwordStrength?.feedback.length! > 0 && (
                  <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                    {passwordStrength?.feedback.map((feedback, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{feedback}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleGeneratePassword}
                  disabled={isLoading}
                  className="w-full h-8 text-xs"
                >
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Generate Strong Password
                </Button>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full cursor-pointer transition-all bg-[#128C7E] hover:bg-[#0f7469] h-11 mt-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function SetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <SetPasswordContent />
    </Suspense>
  );
}
