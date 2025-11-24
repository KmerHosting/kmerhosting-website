"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, Plus, Edit, Trash2, Loader2 } from "lucide-react";

interface Domain {
  id: string;
  userId: string;
  serviceId: string;
  name: string;
  purchasedPrice?: number;
  hasRenewalPrice: boolean;
  renewalPrice?: number;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  user?: { fullName: string; email: string };
  service?: { name: string };
}

interface User {
  id: string;
  email: string;
  fullName: string;
}

interface Service {
  id: string;
  name: string;
  userId: string;
}

export default function AdminDomainsPage() {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    userId: "",
    serviceId: "",
    name: "",
    purchasedPrice: "",
    hasRenewalPrice: false,
    renewalPrice: "",
    startDate: "",
  });

  useEffect(() => {
    fetchDomains();
    fetchUsers();
    fetchServices();
  }, []);

  const fetchDomains = async () => {
    try {
      const response = await fetch("/api/admin/domains");
      if (response.ok) {
        const data = await response.json();
        setDomains(data);
      } else {
        toast.error("Failed to fetch domains");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/admin/services");
      if (response.ok) {
        const data = await response.json();
        setServices(data);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.userId || !formData.serviceId || !formData.name || !formData.startDate) {
      toast.error("Please fill in all required fields (User, Service, Domain Name, Start Date)");
      return;
    }

    try {
      setIsSubmitting(true);

      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `/api/admin/domains/${editingId}` : "/api/admin/domains";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: formData.userId,
          serviceId: formData.serviceId,
          name: formData.name,
          purchasedPrice: formData.purchasedPrice || null,
          hasRenewalPrice: formData.hasRenewalPrice,
          renewalPrice: formData.hasRenewalPrice ? formData.renewalPrice : null,
          startDate: formData.startDate,
        }),
      });

      if (response.ok) {
        toast.success(editingId ? "Domain updated" : "Domain created");
        setFormData({ userId: "", serviceId: "", name: "", purchasedPrice: "", hasRenewalPrice: false, renewalPrice: "", startDate: "" });
        setShowForm(false);
        setEditingId(null);
        fetchDomains();
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to save domain");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (domain: Domain) => {
    setFormData({
      userId: domain.userId,
      serviceId: domain.serviceId,
      name: domain.name,
      purchasedPrice: domain.purchasedPrice?.toString() || "",
      hasRenewalPrice: domain.hasRenewalPrice || false,
      renewalPrice: domain.renewalPrice?.toString() || "",
      startDate: domain.startDate ? domain.startDate.split('T')[0] : "",
    });
    setEditingId(domain.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this domain?")) return;

    try {
      const response = await fetch(`/api/admin/domains/${id}`, { method: "DELETE" });
      if (response.ok) {
        toast.success("Domain deleted");
        fetchDomains();
      } else {
        toast.error("Failed to delete domain");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard">
              <Button variant="ghost" size="icon" className="cursor-pointer">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Domains Management</h1>
          </div>
          <Button
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              setFormData({ userId: "", serviceId: "", name: "", purchasedPrice: "", hasRenewalPrice: false, renewalPrice: "", startDate: "" });
            }}
            className="cursor-pointer bg-green-600 hover:bg-green-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Domain
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Form */}
        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingId ? "Edit Domain" : "Add New Domain"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* User Selection */}
                  <div>
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Client User *
                    </label>
                    <select
                      value={formData.userId}
                      onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                      className="w-full mt-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white"
                    >
                      <option value="">Select a user</option>
                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.fullName} ({user.email})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Service Selection */}
                  <div>
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Associated Service *
                    </label>
                    <select
                      value={formData.serviceId}
                      onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                      className="w-full mt-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white"
                    >
                      <option value="">Select a service</option>
                      {services
                        .filter((s) => s.userId === formData.userId)
                        .map((service) => (
                          <option key={service.id} value={service.id}>
                            {service.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* Domain Name */}
                  <div>
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Domain Name *
                    </label>
                    <Input
                      type="text"
                      placeholder="example.com"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  {/* Start Date */}
                  <div>
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Registration Date *
                    </label>
                    <Input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg space-y-4">
                  {/* Domain Pricing Section Toggle */}
                  <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-700 rounded-lg border-2 border-slate-200 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 cursor-pointer transition-all"
                    onClick={() => setFormData({ ...formData, hasRenewalPrice: !formData.hasRenewalPrice })}>
                    <input
                      type="checkbox"
                      id="hasPricingInfo"
                      checked={formData.hasRenewalPrice}
                      onChange={(e) => setFormData({ ...formData, hasRenewalPrice: e.target.checked })}
                      className="w-5 h-5 cursor-pointer accent-blue-600"
                    />
                    <label htmlFor="hasPricingInfo" className="text-base font-bold text-slate-800 dark:text-slate-100 cursor-pointer flex-1">
                      Add Domain Pricing Information
                    </label>
                  </div>

                  {/* Pricing Fields - Only show when checked */}
                  {formData.hasRenewalPrice && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                          Purchased Price (FCFA)
                        </label>
                        <Input
                          type="number"
                          placeholder="Enter domain purchase price"
                          value={formData.purchasedPrice}
                          onChange={(e) => setFormData({ ...formData, purchasedPrice: e.target.value })}
                          className="mt-1"
                          step="0.01"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                          Renewal Price (FCFA)
                        </label>
                        <Input
                          type="number"
                          placeholder="Enter renewal price"
                          value={formData.renewalPrice}
                          onChange={(e) => setFormData({ ...formData, renewalPrice: e.target.value })}
                          className="mt-1"
                          step="0.01"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="cursor-pointer bg-green-600 hover:bg-green-700"
                  >
                    {isSubmitting ? "Saving..." : editingId ? "Update Domain" : "Add Domain"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowForm(false);
                      setEditingId(null);
                    }}
                    className="cursor-pointer"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Domains Table */}
        <Card>
          <CardHeader>
            <CardTitle>Domains List</CardTitle>
            <CardDescription>{domains.length} domains in total</CardDescription>
          </CardHeader>
          <CardContent>
            {domains.length === 0 ? (
              <p className="text-center text-slate-600 dark:text-slate-400 py-8">
                No domains yet. Add one to get started.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">
                        Domain
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">
                        Client
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">
                        Service
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">
                        Purchased Price
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">
                        Renewal Price
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">
                        Registered
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">
                        Expiry Date
                      </th>
                      <th className="text-center py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {domains.map((domain) => (
                      <tr
                        key={domain.id}
                        className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                      >
                        <td className="py-3 px-4">
                          <p className="font-semibold text-slate-900 dark:text-white">{domain.name}</p>
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-slate-900 dark:text-white">{domain.user?.fullName}</p>
                          <p className="text-xs text-slate-600 dark:text-slate-400">{domain.user?.email}</p>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded">
                            {domain.service?.name}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {domain.purchasedPrice ? (
                            <p className="text-slate-900 dark:text-white font-semibold">
                              {domain.purchasedPrice.toLocaleString()} FCFA
                            </p>
                          ) : (
                            <span className="text-slate-600 dark:text-slate-400 text-xs">—</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {domain.hasRenewalPrice ? (
                            <div>
                              <p className="text-slate-900 dark:text-white font-semibold">
                                {domain.renewalPrice?.toLocaleString()} FCFA
                              </p>
                              <p className="text-xs text-green-600 dark:text-green-400">Active</p>
                            </div>
                          ) : (
                            <span className="text-slate-600 dark:text-slate-400 text-xs">No renewal</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-slate-600 dark:text-slate-400 text-xs">
                          {domain.startDate ? new Date(domain.startDate).toLocaleDateString() : "—"}
                        </td>
                        <td className="py-3 px-4 text-slate-600 dark:text-slate-400 text-xs">
                          {domain.endDate ? new Date(domain.endDate).toLocaleDateString() : "—"}
                        </td>
                        <td className="py-3 px-4 text-center space-x-2 flex justify-center">
                          <Button
                            onClick={() => handleEdit(domain)}
                            size="sm"
                            variant="outline"
                            className="cursor-pointer"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            onClick={() => handleDelete(domain.id)}
                            size="sm"
                            variant="outline"
                            className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
