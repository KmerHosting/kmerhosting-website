"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import Navbar from "@/components/navbar";
import LoadingSpinner from "@/components/loading-spinner";
import { PageSkeletons } from "@/components/page-skeletons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Server } from "lucide-react";

interface Service {
  id: string;
  name: string;
  price: number;
  features: string;
  type: string;
  url?: string;
  username?: string;
  password?: string;
  serverIp?: string;
  createdAt: string;
}

export default function ServicesPage() {
  const { user, loading: authLoading } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading) {
      fetchServices();
    }
  }, [authLoading]);

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/services");
      if (response.ok) {
        const data = await response.json();
        setServices(data);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
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

        {services.length === 0 ? (
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              let features: string[] = [];
              try {
                features = JSON.parse(service.features);
              } catch {
                features = [service.features];
              }

              return (
                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Server className="w-5 h-5" />
                      {service.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Price</p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        {service.price.toLocaleString()} FCFA
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Type</p>
                      <p className="font-semibold text-slate-900 dark:text-white">{service.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Features</p>
                      <ul className="space-y-1">
                        {features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="text-sm text-slate-700 dark:text-slate-300">
                            ✓ {feature}
                          </li>
                        ))}
                        {features.length > 3 && (
                          <li className="text-sm text-slate-600 dark:text-slate-400 italic">
                            +{features.length - 3} more features
                          </li>
                        )}
                      </ul>
                    </div>
                    {service.username && (
                      <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                        <p className="text-sm text-slate-600 dark:text-slate-400">Control Panel</p>
                        <p className="font-mono text-sm text-slate-900 dark:text-white">{service.username}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
