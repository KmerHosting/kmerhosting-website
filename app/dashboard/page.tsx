"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import ProfileCompletionModal from "@/components/profile-completion-modal";
import LoadingSpinner from "@/components/loading-spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { LayoutDashboard, ShoppingCart, Globe, FileText, AlertCircle, CheckCircle2, LightbulbIcon } from "lucide-react";

export default function DashboardPage() {
  const { user, isAuthenticated, loading, refreshUser } = useAuth();
  const router = useRouter();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(user?.isProfileComplete || false);

  const isProfileIncomplete = !isProfileComplete;

  // Redirect to login if not authenticated
  useEffect(() => {
    console.log("Dashboard useEffect: loading =", loading, "isAuthenticated =", isAuthenticated);
    if (!loading && !isAuthenticated) {
      console.log("Dashboard: Redirecting to login because not authenticated");
      router.push("/auth/login");
    }
  }, [isAuthenticated, loading, router]);

  // Update isProfileComplete when user data changes
  useEffect(() => {
    if (user?.isProfileComplete !== undefined) {
      console.log("Dashboard: Updating isProfileComplete to", user.isProfileComplete);
      setIsProfileComplete(user.isProfileComplete);
    }
  }, [user?.isProfileComplete]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">
            Welcome, {user?.fullName}!
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Manage your hosting services</p>
        </div>

        {/* Profile Completion Alert & Button */}
        {isProfileIncomplete && (
          <Card className="mb-8 border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-900/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-200">
                <AlertCircle className="w-5 h-5" />
                Complete Your Profile
              </CardTitle>
              <CardDescription className="text-amber-700 dark:text-amber-300">
                Please complete your profile information to unlock all features and enable invoice creation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => setIsProfileModalOpen(true)}
                className="bg-amber-600 hover:bg-amber-700 text-white cursor-pointer transition-all"
              >
                Complete Profile Now
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Profile Complete Indicator */}
        {!isProfileIncomplete && (
          <Card className="mb-8 border-green-200 dark:border-green-900/50 bg-green-50 dark:bg-green-900/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-900 dark:text-green-200">
                <CheckCircle2 className="w-5 h-5" />
                Profile Complete
              </CardTitle>
              <CardDescription className="text-green-700 dark:text-green-300">
                Your profile is complete. You have access to all features.
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        {/* Dashboard Cards - Disabled if profile incomplete */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${isProfileIncomplete ? "opacity-50 pointer-events-none" : ""}`}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LayoutDashboard className="w-5 h-5" />
                Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">View your account overview</p>
              <Button asChild variant="outline" className="w-full">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Manage your hosting services</p>
              <Button asChild variant="outline" className="w-full">
                <Link href="/services">View Services</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Domains
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Manage your domains</p>
              <Button asChild variant="outline" className="w-full">
                <Link href="/domains">View Domains</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Invoices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">View your invoices</p>
              <Button asChild variant="outline" className="w-full">
                <Link href="/invoices">View Invoices</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Disabled State Message */}
        {isProfileIncomplete && (
          <div className="mt-8 p-4 bg-slate-200 dark:bg-slate-800 rounded-lg text-center flex items-center justify-center gap-2">
            <LightbulbIcon className="w-5 h-5" />
            <p className="text-slate-700 dark:text-slate-300 font-medium">
              Complete your profile to unlock all dashboard features
            </p>
          </div>
        )}
      </div>

      {/* Profile Completion Modal */}
      <ProfileCompletionModal
        open={isProfileModalOpen}
        email={user?.email || ""}
        onClose={() => setIsProfileModalOpen(false)}
        onSuccess={async () => {
          // Refresh user data from server after profile update
          await refreshUser();
          setIsProfileModalOpen(false);
        }}
      />
    </div>
  );
}
