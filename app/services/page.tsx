"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import Navbar from "@/components/navbar";
import LoadingSpinner from "@/components/loading-spinner";
import { PageSkeletons } from "@/components/page-skeletons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, Server, Copy, ExternalLink, AlertCircle, Phone, Mail, Check } from "lucide-react";
import { toast } from "sonner";

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
  startDate?: string;
  endDate?: string;
  createdAt: string;
}

interface ContactAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
}

function ContactAdminModal({ isOpen, onClose, serviceName }: ContactAdminModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            Service Expiring Soon
          </CardTitle>
          <CardDescription>
            {serviceName} is approaching expiration date
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Your service has a 30-day grace period after expiration. Please contact our admin team to renew or manage your service before it's permanently closed.
          </p>
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg space-y-3">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-600" />
              <a href="mailto:support@kmerhosting.com" className="text-blue-600 hover:underline text-sm font-medium">
                support@kmerhosting.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-green-600" />
              <a href="tel:+237697123456" className="text-green-600 hover:underline text-sm font-medium">
                +237 697 123 456
              </a>
            </div>
          </div>
          <Button
            onClick={onClose}
            className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer"
          >
            Got It, I'll Contact Admin
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ServicesPage() {
  const { user, loading: authLoading } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [contactAdminService, setContactAdminService] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

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

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    toast.success("Copied to clipboard");
  };

  const isExpired = (endDate: string) => {
    return new Date(endDate) < new Date();
  };

  const isWithinGracePeriod = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const gracePeriodEnd = new Date(end.getTime() + 30 * 24 * 60 * 60 * 1000);
    return now > end && now <= gracePeriodEnd;
  };

  const getDaysUntilExpiry = (endDate: string) => {
    const days = Math.ceil((new Date(endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return days;
  };

  const getDaysLeftInGracePeriod = (endDate: string) => {
    const end = new Date(endDate);
    const gracePeriodEnd = new Date(end.getTime() + 30 * 24 * 60 * 60 * 1000);
    const days = Math.ceil((gracePeriodEnd.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return days;
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
            <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
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
                <Link href="/#pricing" className="cursor-pointer">View Plans</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {services.map((service) => {
              let features: string[] = [];
              try {
                features = JSON.parse(service.features);
              } catch {
                features = [service.features];
              }

              const expired = isExpired(service.endDate || "");
              const inGracePeriod = isWithinGracePeriod(service.endDate || "");
              const daysLeft = getDaysUntilExpiry(service.endDate || "");
              const daysLeftGrace = getDaysLeftInGracePeriod(service.endDate || "");

              return (
                <Card
                  key={service.id}
                  className={`overflow-hidden transition-all ${
                    expired
                      ? "border-red-400 border-2"
                      : inGracePeriod
                      ? "border-orange-400 border-2"
                      : "border-slate-200 dark:border-slate-700"
                  }`}
                >
                  {/* Header */}
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Server className="w-6 h-6 text-blue-600" />
                          <CardTitle className="text-2xl">{service.name}</CardTitle>
                        </div>
                        <CardDescription className="text-base">
                          {service.type} Control Panel
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-blue-600">
                          {service.price.toLocaleString()}
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">FCFA/year</p>
                      </div>
                    </div>

                    {/* Status Badges */}
                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-blue-200 dark:border-blue-800">
                      {expired && (
                        <Badge className="bg-red-600 hover:bg-red-700 text-white">
                          Expired
                        </Badge>
                      )}
                      {inGracePeriod && (
                        <Badge className="bg-orange-600 hover:bg-orange-700 text-white">
                          Grace Period ({daysLeftGrace} days left)
                        </Badge>
                      )}
                      {!expired && daysLeft <= 30 && daysLeft > 0 && (
                        <Badge className="bg-yellow-600 hover:bg-yellow-700 text-white">
                          Expiring Soon ({daysLeft} days)
                        </Badge>
                      )}
                      {!expired && daysLeft > 30 && (
                        <Badge className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          Active
                        </Badge>
                      )}
                    </div>
                  </CardHeader>

                  {/* Body */}
                  <CardContent className="pt-6 space-y-6">
                    {/* Service Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Dates */}
                      <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Service Period</h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-slate-600 dark:text-slate-400">Start Date</span>
                            <p className="font-medium text-slate-900 dark:text-white">
                              {new Date(service.startDate || "").toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <span className="text-slate-600 dark:text-slate-400">End Date</span>
                            <p className={`font-medium ${expired || inGracePeriod ? "text-red-600" : "text-green-600"}`}>
                              {new Date(service.endDate || "").toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Server Info */}
                      <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Server Information</h4>
                        <div className="space-y-2">
                          <div>
                            <span className="text-sm text-slate-600 dark:text-slate-400">Panel Type</span>
                            <p className="font-mono text-sm text-slate-900 dark:text-white">{service.type}</p>
                          </div>
                          <div>
                            <span className="text-sm text-slate-600 dark:text-slate-400">Server IP</span>
                            <p className="font-mono text-sm text-slate-900 dark:text-white break-all">{service.serverIp}</p>
                          </div>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Included Features</h4>
                        <ul className="space-y-1">
                          {features.slice(0, 3).map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <span className="w-4 h-4 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Check className="w-2.5 h-2.5 text-white" />
                              </span>
                              <span className="text-slate-900 dark:text-white">{feature}</span>
                            </li>
                          ))}
                          {features.length > 3 && (
                            <li className="text-slate-600 dark:text-slate-400 text-sm pt-1">
                              +{features.length - 3} more features
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>

                    {/* Control Panel Access */}
                    {!expired && (
                      <div className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-700/50 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                          <ExternalLink className="w-5 h-5 text-blue-600" />
                          Control Panel Access
                        </h4>

                        <div className="space-y-4">
                          {/* URL */}
                          <div>
                            <label className="text-sm font-medium text-slate-600 dark:text-slate-400 block mb-2">
                              Panel URL
                            </label>
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={service.url || ""}
                                readOnly
                                className="flex-1 px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-sm font-mono"
                              />
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => copyToClipboard(service.url || "", `url-${service.id}`)}
                                className={`cursor-pointer ${copiedId === `url-${service.id}` ? "bg-green-50 dark:bg-green-900/30" : ""}`}
                              >
                                {copiedId === `url-${service.id}` ? (
                                  <Check className="w-4 h-4 text-green-600" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </Button>
                            </div>
                          </div>

                          {/* Username */}
                          <div>
                            <label className="text-sm font-medium text-slate-600 dark:text-slate-400 block mb-2">
                              Username
                            </label>
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={service.username || ""}
                                readOnly
                                className="flex-1 px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-sm font-mono"
                              />
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => copyToClipboard(service.username || "", `user-${service.id}`)}
                                className={`cursor-pointer ${copiedId === `user-${service.id}` ? "bg-green-50 dark:bg-green-900/30" : ""}`}
                              >
                                {copiedId === `user-${service.id}` ? (
                                  <Check className="w-4 h-4 text-green-600" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </Button>
                            </div>
                          </div>

                          {/* Password */}
                          <div>
                            <label className="text-sm font-medium text-slate-600 dark:text-slate-400 block mb-2">
                              Password
                            </label>
                            <div className="flex items-center gap-2">
                              <input
                                type="password"
                                value={service.password || ""}
                                readOnly
                                className="flex-1 px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-sm font-mono"
                              />
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => copyToClipboard(service.password || "", `pass-${service.id}`)}
                                className={`cursor-pointer ${copiedId === `pass-${service.id}` ? "bg-green-50 dark:bg-green-900/30" : ""}`}
                              >
                                {copiedId === `pass-${service.id}` ? (
                                  <Check className="w-4 h-4 text-green-600" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </Button>
                            </div>
                          </div>

                          {/* Login Button */}
                          <div className="flex gap-3 pt-2">
                            <a href={service.url || "#"} target="_blank" rel="noopener noreferrer" className="flex-1">
                              <Button className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2 cursor-pointer">
                                <ExternalLink className="w-4 h-4" />
                                Login to Panel
                              </Button>
                            </a>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Expired/Grace Period Warning */}
                    {(expired || inGracePeriod || (daysLeft > 0 && daysLeft <= 30)) && (
                      <div className={`p-4 rounded-lg border-2 ${
                        expired || inGracePeriod
                          ? "bg-red-50 dark:bg-red-900/20 border-red-400"
                          : "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-400"
                      }`}>
                        <div className="flex items-start gap-3">
                          <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                            expired || inGracePeriod ? "text-red-600" : "text-yellow-600"
                          }`} />
                          <div className="flex-1">
                            <p className={`font-semibold ${
                              expired || inGracePeriod ? "text-red-800 dark:text-red-200" : "text-yellow-800 dark:text-yellow-200"
                            }`}>
                              {expired ? "Service Expired" : inGracePeriod ? "Grace Period Active" : "Service Expiring Soon"}
                            </p>
                            <p className={`text-sm mt-1 ${
                              expired || inGracePeriod ? "text-red-700 dark:text-red-300" : "text-yellow-700 dark:text-yellow-300"
                            }`}>
                              {expired || inGracePeriod
                                ? `Contact our support team before the grace period ends (${daysLeftGrace} days remaining) to avoid permanent data loss.`
                                : `Renew your service within the next ${daysLeft} days to avoid service interruption.`}
                            </p>
                          </div>
                          <Button
                            onClick={() => setContactAdminService(service.name)}
                            className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer flex-shrink-0"
                          >
                            Contact Admin
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      <ContactAdminModal
        isOpen={contactAdminService !== null}
        onClose={() => setContactAdminService(null)}
        serviceName={contactAdminService || ""}
      />
    </div>
  );
}
