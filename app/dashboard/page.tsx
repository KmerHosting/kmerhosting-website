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
import { ShoppingCart, Globe, FileText, AlertCircle, CheckCircle2, LightbulbIcon, Plus, Zap } from "lucide-react";

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
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">
              Welcome, {user?.fullName}!
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Manage your hosting services</p>
          </div>
          {/* Credit Balance - Top Right */}
          <div className="text-right">
            <p className="text-xs text-slate-600 dark:text-slate-400 uppercase tracking-wide">Account Credit</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">0 FCFA</p>
            <Button className="mt-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900 text-white cursor-pointer transition-all flex items-center justify-center gap-2 ml-auto">
              <Plus className="w-4 h-4" />
              Add
            </Button>
          </div>
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

        {/* Profile Complete Indicator - Minimal Design */}
        {!isProfileIncomplete && (
          <div className="mb-8 w-fit p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800 relative overflow-hidden">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-green-900 dark:text-green-200">Account verified</p>
                <p className="text-xs text-green-700 dark:text-green-300 mt-1">You have access to all features</p>
              </div>
            </div>
          </div>
        )}

        {/* Services Cards - Minimal Design & Disabled if profile incomplete */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${isProfileIncomplete ? "opacity-50 pointer-events-none" : ""}`}>
          {/* Services Card - Minimal */}
          <Card className="border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="flex items-center gap-2 text-sm">
                <ShoppingCart className="w-4 h-4" />
                Services
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-3 px-4">
              <Button asChild variant="outline" className="w-full text-sm h-9">
                <Link href="/services">View Services</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Domains Card - Minimal */}
          <Card className="border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Globe className="w-4 h-4" />
                Domains
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-3 px-4">
              <Button asChild variant="outline" className="w-full text-sm h-9">
                <Link href="/domains">View Domains</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Invoices Card - Minimal */}
          <Card className="border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="flex items-center gap-2 text-sm">
                <FileText className="w-4 h-4" />
                Invoices
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-3 px-4">
              <Button asChild variant="outline" className="w-full text-sm h-9">
                <Link href="/invoices">View Invoices</Link>
              </Button>
            </CardContent>
          </Card>

          {/* KmerHosting AI Card - Minimal with NEW Badge */}
          <Card className="border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow relative">
            <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
              NEW
            </div>
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Zap className="w-4 h-4" />
                KmerHosting AI
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-3 px-4">
              <Button asChild variant="outline" className="w-full text-sm h-9">
                <Link href="#">Explore</Link>
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
