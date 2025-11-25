"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface CreditRequestProps {
  userName: string;
  userEmail: string;
}

export default function CreditRequestForm({ userName, userEmail }: CreditRequestProps) {
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!amount || !reason.trim()) {
      toast.error("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      toast.error("Please enter a valid amount");
      setIsLoading(false);
      return;
    }

    if (reason.length > 500) {
      toast.error("Reason must be less than 500 characters");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/credits/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: numAmount,
          reason: reason.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Failed to submit credit request");
        setIsLoading(false);
        return;
      }

      toast.success("Credit request submitted successfully!");
      setSubmitted(true);
      setAmount("");
      setReason("");

      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Credit request error:", error);
      toast.error("Failed to submit credit request");
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Request Credit</CardTitle>
          <CardDescription>Submit a request for account credit</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <CheckCircle className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Request Submitted Successfully
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Our team will review your credit request within 24-48 hours and contact you at {userEmail}.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              You can track the status of your request from this page.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request Credit</CardTitle>
        <CardDescription>Submit a request for account credit or adjustments</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Info Alert */}
          <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
            <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertDescription className="text-blue-800 dark:text-blue-300 ml-2">
              Submit a credit request for billing disputes, service issues, or special circumstances. Our team will review and respond within 24-48 hours.
            </AlertDescription>
          </Alert>

          {/* Amount Field */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-gray-700 dark:text-gray-300">
              Amount Requested
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                $
              </span>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                step="0.01"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={isLoading}
                className="pl-7"
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Enter the credit amount you are requesting
            </p>
          </div>

          {/* Reason Field */}
          <div className="space-y-2">
            <Label htmlFor="reason" className="text-gray-700 dark:text-gray-300">
              Reason for Request
            </Label>
            <Textarea
              id="reason"
              placeholder="Please explain why you are requesting this credit..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              disabled={isLoading}
              maxLength={500}
              rows={5}
              className="resize-none"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {reason.length}/500 characters
            </p>
          </div>

          {/* Contact Info */}
          <div className="bg-gray-50 dark:bg-slate-900 p-4 rounded-lg space-y-2">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Name:</strong> {userName}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Email:</strong> {userEmail}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              We'll contact you at this email with our decision
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading || !amount || !reason.trim()}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Credit Request"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
