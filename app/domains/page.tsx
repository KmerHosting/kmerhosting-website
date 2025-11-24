"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import Navbar from "@/components/navbar";
import LoadingSpinner from "@/components/loading-spinner";
import { PageSkeletons } from "@/components/page-skeletons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Globe } from "lucide-react";

interface Domain {
  id: string;
  name: string;
  purchasedPrice?: number;
  hasRenewalPrice: boolean;
  renewalPrice?: number;
  createdAt: string;
  service?: { name: string };
}

export default function DomainsPage() {
  const { user, loading: authLoading } = useAuth();
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading) {
      fetchDomains();
    }
  }, [authLoading]);

  const fetchDomains = async () => {
    try {
      const response = await fetch("/api/domains");
      if (response.ok) {
        const data = await response.json();
        setDomains(data);
      }
    } catch (error) {
      console.error("Error fetching domains:", error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
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
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">My Domains</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Manage your registered domains</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/dashboard" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>

        {domains.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No Domains Yet</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-400">
                You don't have any registered domains yet.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {domains.map((domain) => (
              <Card key={domain.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                          {domain.name}
                        </h3>
                      </div>
                      {domain.service && (
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                          Service: <span className="font-semibold text-slate-900 dark:text-white">{domain.service.name}</span>
                        </p>
                      )}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-slate-600 dark:text-slate-400">Purchased Price</p>
                          <p className="text-lg font-semibold text-slate-900 dark:text-white">
                            {domain.purchasedPrice ? `${domain.purchasedPrice.toLocaleString()} FCFA` : "—"}
                          </p>
                        </div>
                        {domain.hasRenewalPrice && (
                          <div>
                            <p className="text-xs text-slate-600 dark:text-slate-400">Renewal Price</p>
                            <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                              {domain.renewalPrice?.toLocaleString()} FCFA
                            </p>
                          </div>
                        )}
                        <div>
                          <p className="text-xs text-slate-600 dark:text-slate-400">Registered</p>
                          <p className="text-sm text-slate-900 dark:text-white">
                            {new Date(domain.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
