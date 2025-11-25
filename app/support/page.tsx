"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import TicketForm from "@/components/ticket-form";
import { toast } from "sonner";
import { Loader2, ArrowLeft, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function SupportPage() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [services, setServices] = useState<Array<{ id: string; name: string }>>([]);
  const [isLoadingServices, setIsLoadingServices] = useState(false);

  // Fetch user's services if authenticated
  useEffect(() => {
    if (isAuthenticated && user?.userId) {
      setIsLoadingServices(true);
      fetch("/api/services")
        .then((res) => res.json())
        .then((data) => {
          if (data.services) {
            setServices(
              data.services.map((service: any) => ({
                id: service.id,
                name: service.name,
              }))
            );
          }
        })
        .catch((error) => {
          console.error("Failed to fetch services:", error);
        })
        .finally(() => {
          setIsLoadingServices(false);
        });
    }
  }, [isAuthenticated, user?.userId]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Link href="/" className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            <HelpCircle className="inline-block w-8 h-8 mr-3 text-teal-600" />
            Support Ticket
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Open a support ticket and our team will get back to you as soon as possible.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Column */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
              {isLoadingServices ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-teal-600" />
                </div>
              ) : (
                <TicketForm
                  isAuthenticated={isAuthenticated}
                  user={
                    isAuthenticated
                      ? {
                          email: user?.email || "",
                          fullName: user?.fullName || "",
                        }
                      : undefined
                  }
                  services={services}
                />
              )}
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            {/* Quick Info Card */}
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Quick Tips
              </h3>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex gap-2">
                  <span className="text-teal-600 font-bold">1.</span>
                  <span>Be specific and include relevant details</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-teal-600 font-bold">2.</span>
                  <span>Attach screenshots or files that help explain the issue</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-teal-600 font-bold">3.</span>
                  <span>Select the correct department for faster resolution</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-teal-600 font-bold">4.</span>
                  <span>Include any error messages you're receiving</span>
                </li>
              </ul>
            </div>

            {/* Contact Info Card */}
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Other Ways to Reach Us
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-slate-600 dark:text-slate-400 mb-1">Email</p>
                  <a
                    href="mailto:support@kmerhosting.com"
                    className="text-teal-600 hover:text-teal-700 font-medium"
                  >
                    support@kmerhosting.com
                  </a>
                </div>
                <div>
                  <p className="text-slate-600 dark:text-slate-400 mb-1">Phone</p>
                  <a
                    href="tel:+237694193493"
                    className="text-teal-600 hover:text-teal-700 font-medium"
                  >
                    +237 6 94 19 34 93
                  </a>
                </div>
                <div>
                  <p className="text-slate-600 dark:text-slate-400 mb-1">Hours</p>
                  <p className="text-slate-700 dark:text-slate-300 font-medium">
                    24/7 Available
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Link Card */}
            <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-200 dark:border-teal-800 p-6">
              <h3 className="text-lg font-semibold text-teal-900 dark:text-teal-100 mb-2">
                Need Quick Answers?
              </h3>
              <p className="text-sm text-teal-800 dark:text-teal-200 mb-4">
                Check out our FAQ section for common questions and solutions.
              </p>
              <Link
                href="/faq"
                className="text-teal-600 hover:text-teal-700 font-semibold text-sm"
              >
                Visit FAQ →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
