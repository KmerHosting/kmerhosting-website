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
import { ShoppingCart, Globe, FileText, AlertCircle, CheckCircle2, LightbulbIcon, Plus, Zap, BookOpen, Wrench, Copy, MessageSquare } from "lucide-react";

interface DashboardStats {
  services: number;
  domains: number;
  invoices: number;
}

export default function DashboardPage() {
  const { user, isAuthenticated, loading, refreshUser } = useAuth();
  const router = useRouter();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(user?.isProfileComplete || false);
  const [stats, setStats] = useState<DashboardStats>({ services: 0, domains: 0, invoices: 0 });
  const [statsLoading, setStatsLoading] = useState(false);

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

  // Fetch user stats
  useEffect(() => {
    if (isAuthenticated && !isProfileIncomplete) {
      fetchStats();
    }
  }, [isAuthenticated, isProfileIncomplete]);

  const fetchStats = async () => {
    try {
      setStatsLoading(true);
      const [servicesRes, domainsRes, invoicesRes] = await Promise.all([
        fetch("/api/services"),
        fetch("/api/domains"),
        fetch("/api/invoices"),
      ]);

      const servicesData = servicesRes.ok ? await servicesRes.json() : [];
      const domainsData = domainsRes.ok ? await domainsRes.json() : [];
      const invoicesData = invoicesRes.ok ? await invoicesRes.json() : [];

      setStats({
        services: Array.isArray(servicesData) ? servicesData.length : 0,
        domains: Array.isArray(domainsData) ? domainsData.length : 0,
        invoices: Array.isArray(invoicesData) ? invoicesData.length : 0,
      });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setStatsLoading(false);
    }
  };

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
        {/* Top Section - Title & Profile Indicators */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Welcome, {user?.fullName}!
          </h1>
          
          {/* Account Info Row - Verified Badge, PIN, Referral Code */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
            {/* Profile Complete Indicator */}
            {!isProfileIncomplete && (
              <div className="w-fit p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-green-900 dark:text-green-200">Account verified</p>
                  </div>
                </div>
              </div>
            )}

            {/* PIN Code Display */}
            {!isProfileIncomplete && user?.pinCode && (
              <div className="flex items-center gap-2 px-3 py-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-200 dark:border-teal-800">
                <span className="text-xs font-semibold text-teal-900 dark:text-teal-200">PIN:</span>
                <code className="font-mono font-bold text-teal-600 dark:text-teal-300 tracking-widest">
                  {user.pinCode}
                </code>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => navigator.clipboard.writeText(user.pinCode || "")}
                  className="text-teal-600 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900/50 h-6 px-2"
                >
                  Copy
                </Button>
              </div>
            )}

            {/* Referral Code Display */}
            {!isProfileIncomplete && user?.referralCode && (
              <div className="flex items-center gap-2 px-3 py-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <span className="text-xs font-semibold text-purple-900 dark:text-purple-200">Referral:</span>
                <code className="font-mono font-bold text-purple-600 dark:text-purple-300 tracking-widest">
                  {user.referralCode}
                </code>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => navigator.clipboard.writeText(user.referralCode || "")}
                  className="text-purple-600 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/50 h-6 px-2"
                >
                  Copy
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Credit Balance Card */}
        <div className="mb-8 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-600 dark:text-slate-400 uppercase tracking-wide font-semibold">Account Credit</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-slate-100 mt-2">0 FCFA</p>
            </div>
            <Button className="bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900 text-white cursor-pointer transition-all flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" />
              Add Credit
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

        {/* Services Cards - Minimal Design & Disabled if profile incomplete */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 ${isProfileIncomplete ? "opacity-50 pointer-events-none" : ""}`}>
          {/* Services Card - Minimal */}
          <Card className="border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow rounded-2xl">
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="flex items-center gap-2 text-sm">
                <ShoppingCart className="w-4 h-4" />
                Services
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-3 px-4">
              <p className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{stats.services}</p>
              <Button asChild variant="outline" className="w-full text-sm h-9">
                <Link href="/services">View Services</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Domains Card - Minimal */}
          <Card className="border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow rounded-2xl">
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Globe className="w-4 h-4" />
                Domains
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-3 px-4">
              <p className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{stats.domains}</p>
              <Button asChild variant="outline" className="w-full text-sm h-9">
                <Link href="/domains">View Domains</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Invoices Card - Minimal */}
          <Card className="border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow rounded-2xl">
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="flex items-center gap-2 text-sm">
                <FileText className="w-4 h-4" />
                Invoices
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-3 px-4">
              <p className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{stats.invoices}</p>
              <Button asChild variant="outline" className="w-full text-sm h-9">
                <Link href="/invoices">View Invoices</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Students Hosting Card with NEW Badge */}
          <Card className="border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow rounded-2xl relative">
            <div className="absolute -top-3 -right-3 bg-teal-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-full shadow-lg">
              NEW
            </div>
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="flex items-center gap-2 text-sm">
                <BookOpen className="w-4 h-4" />
                Students Hosting
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-3 px-4">
              <p className="text-2xl font-bold text-slate-900 dark:text-white mb-2">2</p>
              <Button asChild variant="outline" className="w-full text-sm h-9">
                <Link href="#">Learn More</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Free Tools Card with NEW Badge */}
          <Card className="border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow rounded-2xl relative">
            <div className="absolute -top-3 -right-3 bg-teal-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-full shadow-lg">
              NEW
            </div>
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Wrench className="w-4 h-4" />
                Free Tools
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-3 px-4">
              <p className="text-2xl font-bold text-slate-900 dark:text-white mb-2">5</p>
              <Button asChild variant="outline" className="w-full text-sm h-9">
                <Link href="#">Explore</Link>
              </Button>
            </CardContent>
          </Card>

          {/* KmerHosting AI Card - with NEW Badge */}
          <Card className="border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow rounded-2xl relative">
            <div className="absolute -top-3 -right-3 bg-teal-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-full shadow-lg">
              NEW
            </div>
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Zap className="w-4 h-4" />
                KmerHosting AI
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-3 px-4">
              <p className="text-2xl font-bold text-slate-900 dark:text-white mb-2">2</p>
              <Button asChild variant="outline" className="w-full text-sm h-9">
                <Link href="#">Explore</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Additional Features Row */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 ${isProfileIncomplete ? "opacity-50 pointer-events-none" : ""}`}>
          {/* KmerHosting Chat Room Card */}
          <Card className="border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow rounded-2xl relative">
            <div className="absolute -top-3 -right-3 bg-teal-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-full shadow-lg">
              NEW
            </div>
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="flex items-center gap-2 text-sm">
                <MessageSquare className="w-4 h-4" />
                KmerHosting Chat Room
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-3 px-4">
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">Connect with community members</p>
              <Button asChild variant="outline" className="w-full text-sm h-9">
                <Link href="#">Join Chat</Link>
              </Button>
            </CardContent>
          </Card>

          {/* KmerHosting Books Card */}
          <Card className="border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow rounded-2xl relative">
            <div className="absolute -top-3 -right-3 bg-teal-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-full shadow-lg">
              NEW
            </div>
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="flex items-center gap-2 text-sm">
                <BookOpen className="w-4 h-4" />
                KmerHosting Books
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-3 px-4">
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">Learn from our comprehensive guides</p>
              <Button asChild variant="outline" className="w-full text-sm h-9">
                <Link href="#">Browse Library</Link>
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
