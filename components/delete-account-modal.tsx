"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface DeleteAccountModalProps {
  open: boolean;
  onClose: () => void;
  userEmail: string;
  userFullName: string;
}

export default function DeleteAccountModal({
  open,
  onClose,
  userEmail,
  userFullName,
}: DeleteAccountModalProps) {
  const router = useRouter();
  const [step, setStep] = useState<"warning" | "confirmation" | "verification">("warning");
  const [isLoading, setIsLoading] = useState(false);

  // Confirmation form state
  const [reason, setReason] = useState("");
  const [email, setEmail] = useState("");
  const [confirmationText, setConfirmationText] = useState("");
  const [mathAnswer, setMathAnswer] = useState("");
  const [mathProblem] = useState(generateMathProblem());

  function generateMathProblem() {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    return { a, b, answer: a + b };
  }

  const requiredText = `I'm ${userFullName}, i want to permanently delete my account`;
  const isConfirmationValid =
    reason.trim().length > 0 &&
    email === userEmail &&
    confirmationText === requiredText &&
    parseInt(mathAnswer) === mathProblem.answer;

  const handleDeleteClick = () => {
    setStep("confirmation");
  };

  const handleConfirm = async () => {
    if (!isConfirmationValid) {
      toast.error("Please fill all fields correctly");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch("/api/auth/delete-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          reason,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || "Failed to delete account");
        return;
      }

      toast.success("Account deleted successfully");
      
      // Redirect to home after a short delay
      setTimeout(() => {
        router.push("/");
        onClose();
      }, 1000);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to delete account");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setStep("warning");
    setReason("");
    setEmail("");
    setConfirmationText("");
    setMathAnswer("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        {step === "warning" && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <AlertCircle className="w-5 h-5" />
                Delete Account
              </DialogTitle>
              <DialogDescription>This action cannot be undone</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg space-y-2">
                <p className="font-semibold text-red-900 dark:text-red-100">Everything will be lost:</p>
                <ul className="text-sm text-red-800 dark:text-red-200 space-y-1 list-disc list-inside">
                  <li>All your account data and information</li>
                  <li>All hosting services</li>
                  <li>Account credits (non-refundable)</li>
                  <li>All domains and configurations</li>
                </ul>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg space-y-2">
                <p className="font-semibold text-blue-900 dark:text-blue-100">Important information:</p>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li>• Your email cannot be reused for 60 days</li>
                  <li>• Personal data kept for 1 year then permanently deleted</li>
                  <li>• No refunds will be issued</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={handleClose} className="flex-1">
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteClick}
                className="flex-1 cursor-pointer"
              >
                Continue
              </Button>
            </div>
          </>
        )}

        {step === "confirmation" && (
          <>
            <DialogHeader>
              <DialogTitle>Confirm Account Deletion</DialogTitle>
              <DialogDescription>Please provide the following information</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* Reason field */}
              <div>
                <Label htmlFor="reason">
                  Reason for deletion <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="reason"
                  placeholder="Tell us why you're deleting your account..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  disabled={isLoading}
                  className="mt-2"
                />
              </div>

              {/* Email confirmation */}
              <div>
                <Label htmlFor="email">
                  Confirm your email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="mt-2"
                />
                {email !== userEmail && email && (
                  <p className="text-xs text-red-500 mt-1">Email does not match</p>
                )}
              </div>

              {/* Confirmation text */}
              <div>
                <Label htmlFor="confirmation">
                  Type this exactly <span className="text-red-500">*</span>
                </Label>
                <code className="text-xs bg-slate-100 dark:bg-slate-800 p-2 rounded block my-2 break-words">
                  {requiredText}
                </code>
                <Input
                  id="confirmation"
                  type="text"
                  placeholder="Type the text above..."
                  value={confirmationText}
                  onChange={(e) => setConfirmationText(e.target.value)}
                  disabled={isLoading}
                  className="mt-2"
                />
                {confirmationText && confirmationText !== requiredText && (
                  <p className="text-xs text-red-500 mt-1">Text does not match</p>
                )}
              </div>

              {/* Math problem */}
              <div>
                <Label htmlFor="math">
                  Solve: {mathProblem.a} + {mathProblem.b} = ? <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="math"
                  type="number"
                  placeholder="Answer"
                  value={mathAnswer}
                  onChange={(e) => setMathAnswer(e.target.value)}
                  disabled={isLoading}
                  className="mt-2"
                />
                {mathAnswer && parseInt(mathAnswer) !== mathProblem.answer && (
                  <p className="text-xs text-red-500 mt-1">Incorrect answer</p>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep("warning")}
                disabled={isLoading}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                variant="destructive"
                onClick={handleConfirm}
                disabled={!isConfirmationValid || isLoading}
                className="flex-1 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete Account"
                )}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
