"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageUploader from "@/components/image-uploader";
import { toast } from "sonner";
import { Loader2, Bold, Italic } from "lucide-react";

interface TicketFormProps {
  isAuthenticated: boolean;
  user?: {
    email: string;
    fullName: string;
  };
  services?: Array<{
    id: string;
    name: string;
  }>;
}

export default function TicketForm({
  isAuthenticated,
  user,
  services = [],
}: TicketFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    email: user?.email || "",
    fullName: user?.fullName || "",
    subject: "",
    department: "support",
    content: "",
    serviceId: null as string | null,
  });

  const router = useRouter();

  const departments = [
    { value: "support", label: "Technical Support" },
    { value: "billing", label: "Billing" },
    { value: "sales", label: "Sales" },
    { value: "noc", label: "Network Operations" },
    { value: "security", label: "Security" },
    { value: "abuse", label: "Abuse" },
    { value: "info", label: "General Information" },
    { value: "migrations", label: "Migrations" },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      content: e.target.value,
    }));
  };

  const handleDepartmentChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      department: value,
    }));
  };

  const handleServiceChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      serviceId: value === "none" ? null : value,
    }));
  };

  const applyFormatting = (format: "bold" | "italic") => {
    const textarea = document.getElementById(
      "content"
    ) as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.content.substring(start, end);

    if (!selectedText) {
      toast.error("Please select text to format");
      return;
    }

    let formattedText = selectedText;
    if (format === "bold") {
      formattedText = `<b>${selectedText}</b>`;
    } else if (format === "italic") {
      formattedText = `<i>${selectedText}</i>`;
    }

    const newContent =
      formData.content.substring(0, start) +
      formattedText +
      formData.content.substring(end);

    setFormData((prev) => ({
      ...prev,
      content: newContent,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate
    if (!formData.email || !formData.fullName) {
      toast.error("Email and full name are required");
      return;
    }

    if (!formData.subject || !formData.content) {
      toast.error("Subject and message are required");
      return;
    }

    setIsLoading(true);

    try {
      const form = new FormData();
      form.append("email", formData.email);
      form.append("fullName", formData.fullName);
      form.append("subject", formData.subject);
      form.append("department", formData.department);
      form.append("content", formData.content);

      if (isAuthenticated && formData.serviceId) {
        form.append("serviceId", formData.serviceId);
      }

      // Append images
      images.forEach((image) => {
        form.append("images", image);
      });

      const response = await fetch("/api/support/tickets", {
        method: "POST",
        body: form,
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Failed to submit ticket");
        return;
      }

      toast.success("Ticket submitted successfully!");
      // Reset form
      setFormData({
        email: user?.email || "",
        fullName: user?.fullName || "",
        subject: "",
        department: "support",
        content: "",
        serviceId: null,
      });
      setImages([]);

      // Redirect after a short delay
      setTimeout(() => {
        if (isAuthenticated) {
          router.push("/dashboard");
        } else {
          router.push("/");
        }
      }, 2000);
    } catch (error) {
      console.error("Error submitting ticket:", error);
      toast.error("An error occurred while submitting your ticket");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          disabled={isAuthenticated}
          placeholder="your@email.com"
          required
        />
      </div>

      {/* Full Name Field */}
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name *</Label>
        <Input
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          disabled={isAuthenticated}
          placeholder="John Doe"
          required
        />
      </div>

      {/* Subject Field */}
      <div className="space-y-2">
        <Label htmlFor="subject">Subject *</Label>
        <Input
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          placeholder="Brief description of your issue"
          required
        />
      </div>

      {/* Department Dropdown */}
      <div className="space-y-2">
        <Label htmlFor="department">Department *</Label>
        <Select value={formData.department} onValueChange={handleDepartmentChange}>
          <SelectTrigger id="department">
            <SelectValue placeholder="Select a department" />
          </SelectTrigger>
          <SelectContent>
            {departments.map((dept) => (
              <SelectItem key={dept.value} value={dept.value}>
                {dept.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Service Selection (only for authenticated users) */}
      {isAuthenticated && services.length > 0 && (
        <div className="space-y-2">
          <Label htmlFor="service">Related Service (Optional)</Label>
          <Select
            value={formData.serviceId || "none"}
            onValueChange={handleServiceChange}
          >
            <SelectTrigger id="service">
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              {services.map((service) => (
                <SelectItem key={service.id} value={service.id}>
                  {service.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Message Content */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="content">Message *</Label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => applyFormatting("bold")}
              className="p-1.5 rounded border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="Bold (select text first)"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => applyFormatting("italic")}
              className="p-1.5 rounded border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="Italic (select text first)"
            >
              <Italic className="w-4 h-4" />
            </button>
          </div>
        </div>
        <textarea
          id="content"
          value={formData.content}
          onChange={handleContentChange}
          placeholder="Describe your issue in detail..."
          className="w-full h-32 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
        <p className="text-xs text-slate-500 dark:text-slate-400">
          You can use &lt;b&gt;text&lt;/b&gt; for bold and &lt;i&gt;text&lt;/i&gt; for italic formatting
        </p>
      </div>

      {/* Image Uploader */}
      <ImageUploader onImagesChange={setImages} maxImages={5} />

      {/* Info Messages */}
      {!isAuthenticated && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-sm text-blue-900 dark:text-blue-100">
            💡 <strong>Note:</strong> We recommend creating a KmerHosting account for faster and more efficient support. You'll receive responses directly in your dashboard.
          </p>
        </div>
      )}

      {isAuthenticated && (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <p className="text-sm text-green-900 dark:text-green-100">
            ✓ You're logged in. You'll receive responses in your dashboard notifications.
          </p>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-teal-600 hover:bg-teal-700 text-white"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Ticket"
        )}
      </Button>

      {/* Response Info */}
      <div className="text-xs text-slate-600 dark:text-slate-400 text-center pt-4 border-t border-slate-200 dark:border-slate-700">
        {isAuthenticated ? (
          <p>KmerHosting users will receive responses in their dashboard notifications</p>
        ) : (
          <p>We will respond to your email shortly</p>
        )}
      </div>
    </form>
  );
}
