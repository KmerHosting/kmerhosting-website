"use client";

import { useAuth } from "@/lib/auth-context";
import Navbar from "@/components/navbar";
import LoadingSpinner from "@/components/loading-spinner";
import { PageSkeletons } from "@/components/page-skeletons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ServicesPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <>
        <Navbar />
        <PageSkeletons />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">My Services</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">View and manage all your hosting services</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/dashboard" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>No Services Yet</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 dark:text-slate-400">
              You don't have any hosting services yet. Visit our pricing page to get started.
            </p>
            <Button asChild className="mt-4">
              <Link href="/#pricing">View Plans</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
