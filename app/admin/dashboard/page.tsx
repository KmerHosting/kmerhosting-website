"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { LogOut, Users, Package, Globe, FileText, BarChart3 } from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState({
    services: 0,
    domains: 0,
    invoices: 0,
    users: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [servicesRes, domainsRes, invoicesRes] = await Promise.all([
          fetch("/api/admin/services"),
          fetch("/api/admin/domains"),
          fetch("/api/admin/invoices"),
        ]);

        if (servicesRes.ok) {
          const services = await servicesRes.json();
          setStats((prev) => ({ ...prev, services: services.length }));
        }

        if (domainsRes.ok) {
          const domains = await domainsRes.json();
          setStats((prev) => ({ ...prev, domains: domains.length }));
        }

        if (invoicesRes.ok) {
          const invoices = await invoicesRes.json();
          setStats((prev) => ({ ...prev, invoices: invoices.length }));
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/admin/logout", { method: "POST" });
      if (response.ok) {
        toast.success("Logged out successfully");
        router.push("/admin/login");
      }
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Navbar */}
      <nav className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">KmerHosting Admin</h1>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="cursor-pointer flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Dashboard</h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Services Stat */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Package className="w-4 h-4 text-blue-600" />
                Total Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">{stats.services}</p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">Active services</p>
            </CardContent>
          </Card>

          {/* Domains Stat */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Globe className="w-4 h-4 text-green-600" />
                Total Domains
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">{stats.domains}</p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">Registered domains</p>
            </CardContent>
          </Card>

          {/* Invoices Stat */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <FileText className="w-4 h-4 text-purple-600" />
                Total Invoices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">{stats.invoices}</p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">Generated invoices</p>
            </CardContent>
          </Card>

          {/* Revenue Overview */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <BarChart3 className="w-4 h-4 text-orange-600" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">Manage all resources</p>
            </CardContent>
          </Card>
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Services Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Services Management
              </CardTitle>
              <CardDescription>Create and manage hosting services</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Add services with login credentials, pricing, and features for clients.
              </p>
              <Button asChild className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700">
                <Link href="/admin/services">Manage Services</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Domains Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Domains Management
              </CardTitle>
              <CardDescription>Add and manage client domains</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Associate domains with client services and track registrations.
              </p>
              <Button asChild className="w-full cursor-pointer bg-green-600 hover:bg-green-700">
                <Link href="/admin/domains">Manage Domains</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Invoices Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Invoices Management
              </CardTitle>
              <CardDescription>Generate and send professional invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Create invoices, download PDFs, and track payment status.
              </p>
              <Button asChild className="w-full cursor-pointer bg-purple-600 hover:bg-purple-700">
                <Link href="/admin/invoices">Manage Invoices</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
