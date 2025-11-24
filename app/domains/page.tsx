"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import Navbar from "@/components/navbar";
import LoadingSpinner from "@/components/loading-spinner";
import { PageSkeletons } from "@/components/page-skeletons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ArrowLeft, Globe, AlertCircle, Phone, Mail, Plus, Check, X } from "lucide-react";
import { toast } from "sonner";

interface Domain {
  id: string;
  name: string;
  purchasedPrice?: number;
  hasRenewalPrice: boolean;
  renewalPrice?: number;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  service?: { name: string; id: string };
}

interface Service {
  id: string;
  name: string;
}

interface AddDomainModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: Service[];
}

function AddDomainModal({ isOpen, onClose, services }: AddDomainModalProps) {
  const [selectedService, setSelectedService] = useState<string>("");
  const [domainName, setDomainName] = useState<string>("");
  const [selectedExtension, setSelectedExtension] = useState<string>(".com");

  const extensions = [
    { ext: ".com", price: 1500 },
    { ext: ".org", price: 1500 },
    { ext: ".info", price: 2000 },
    { ext: ".dev", price: 2500 },
    { ext: ".store", price: 3000 },
    { ext: ".online", price: 2500 },
  ];

  const handleSubmit = () => {
    if (!selectedService || !domainName.trim()) {
      toast.error("Please select a service and enter a domain name");
      return;
    }

    toast.success(`Domain "${domainName}${selectedExtension}" will be added soon!`);
    setDomainName("");
    setSelectedService("");
    setSelectedExtension(".com");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-blue-600" />
            Add Another Domain
          </CardTitle>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-2">
              Select Service
            </label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white"
            >
              <option value="">Choose a service...</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-2">
              Domain Name
            </label>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="example"
                value={domainName}
                onChange={(e) => setDomainName(e.target.value)}
                className="flex-1"
              />
              <select
                value={selectedExtension}
                onChange={(e) => setSelectedExtension(e.target.value)}
                className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white"
              >
                {extensions.map((item) => (
                  <option key={item.ext} value={item.ext}>
                    {item.ext}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Full domain: {domainName || "example"}{selectedExtension}
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-400">Annual Price</span>
              <span className="font-bold text-slate-900 dark:text-white">
                {extensions.find((e) => e.ext === selectedExtension)?.price.toLocaleString()} FCFA
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-blue-600 hover:bg-blue-700 cursor-pointer"
            >
              Add Domain
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 cursor-pointer"
            >
              Cancel
            </Button>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 text-center">
            Pricing and registration will be finalized in the next update
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

interface ContactAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  domainName: string;
}

function ContactAdminModal({ isOpen, onClose, domainName }: ContactAdminModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            Domain Expiring Soon
          </CardTitle>
          <CardDescription>{domainName} is approaching expiration date</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Your domain has a 30-day grace period after expiration. Please contact our admin team to renew or manage your domain before it's permanently closed.
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

export default function DomainsPage() {
  const { user, loading: authLoading } = useAuth();
  const [domains, setDomains] = useState<Domain[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddDomainModal, setShowAddDomainModal] = useState(false);
  const [contactAdminDomain, setContactAdminDomain] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading) {
      fetchDomains();
      fetchServices();
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

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/services");
      if (response.ok) {
        const data = await response.json();
        setServices(data);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
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
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">My Domains</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Manage your registered domains</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setShowAddDomainModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Another Domain
            </Button>
            <Button asChild variant="outline">
              <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
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
          <div className="space-y-6">
            {domains.map((domain) => {
              const expired = isExpired(domain.endDate || "");
              const inGracePeriod = isWithinGracePeriod(domain.endDate || "");
              const daysLeft = getDaysUntilExpiry(domain.endDate || "");
              const daysLeftGrace = getDaysLeftInGracePeriod(domain.endDate || "");

              return (
                <Card
                  key={domain.id}
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
                          <Globe className="w-6 h-6 text-blue-600" />
                          <CardTitle className="text-2xl">{domain.name}</CardTitle>
                        </div>
                        {domain.service && (
                          <CardDescription className="text-base">
                            Service: <span className="font-semibold">{domain.service.name}</span>
                          </CardDescription>
                        )}
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
                    {/* Domain Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* Registration Period */}
                      <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Domain Period</h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-slate-600 dark:text-slate-400">Start Date</span>
                            <p className="font-medium text-slate-900 dark:text-white">
                              {new Date(domain.startDate || "").toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <span className="text-slate-600 dark:text-slate-400">Expiry Date</span>
                            <p className={`font-medium ${expired || inGracePeriod ? "text-red-600" : "text-green-600"}`}>
                              {new Date(domain.endDate || "").toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Pricing */}
                      <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Pricing</h4>
                        <div className="space-y-2">
                          <div>
                            <span className="text-xs text-slate-600 dark:text-slate-400">Purchase Price</span>
                            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                              {domain.purchasedPrice ? `${domain.purchasedPrice.toLocaleString()} FCFA` : "—"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Renewal */}
                      <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Renewal</h4>
                        <div className="space-y-2">
                          <div>
                            <span className="text-xs text-slate-600 dark:text-slate-400">Annual Price</span>
                            {domain.hasRenewalPrice ? (
                              <p className="text-lg font-bold text-green-600 dark:text-green-400">
                                {domain.renewalPrice?.toLocaleString()} FCFA
                              </p>
                            ) : (
                              <p className="text-sm text-slate-600 dark:text-slate-400">Not available</p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Status</h4>
                        <div>
                          {expired ? (
                            <span className="text-sm font-bold text-red-600">Expired</span>
                          ) : inGracePeriod ? (
                            <span className="text-sm font-bold text-orange-600">{daysLeftGrace} days in grace</span>
                          ) : daysLeft <= 30 ? (
                            <span className="text-sm font-bold text-yellow-600">{daysLeft} days remaining</span>
                          ) : (
                            <span className="text-sm font-bold text-green-600">{daysLeft} days remaining</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Expiration Warning */}
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
                              {expired ? "Domain Expired" : inGracePeriod ? "Grace Period Active" : "Domain Expiring Soon"}
                            </p>
                            <p className={`text-sm mt-1 ${
                              expired || inGracePeriod ? "text-red-700 dark:text-red-300" : "text-yellow-700 dark:text-yellow-300"
                            }`}>
                              {expired || inGracePeriod
                                ? `Contact our support team before the grace period ends (${daysLeftGrace} days remaining) to avoid permanent domain loss.`
                                : `Renew your domain within the next ${daysLeft} days to avoid service interruption.`}
                            </p>
                          </div>
                          <Button
                            onClick={() => setContactAdminDomain(domain.name)}
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

      <AddDomainModal
        isOpen={showAddDomainModal}
        onClose={() => setShowAddDomainModal(false)}
        services={services}
      />

      <ContactAdminModal
        isOpen={contactAdminDomain !== null}
        onClose={() => setContactAdminDomain(null)}
        domainName={contactAdminDomain || ""}
      />
    </div>
  );
}
