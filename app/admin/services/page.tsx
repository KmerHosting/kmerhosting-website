"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, Plus, Edit, Trash2, Loader2 } from "lucide-react";

interface Service {
  id: string;
  userId: string;
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
  user?: { fullName: string; email: string };
}

interface User {
  id: string;
  email: string;
  fullName: string;
}

export default function AdminServicesPage() {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    price: "",
    features: "",
    type: "cPanel",
    url: "",
    username: "",
    password: "",
    serverIp: "",
    startDate: "",
  });

  useEffect(() => {
    fetchServices();
    fetchUsers();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/admin/services");
      if (response.ok) {
        const data = await response.json();
        setServices(data);
      } else {
        toast.error("Failed to fetch services");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.userId || !formData.name || !formData.price || !formData.type || !formData.url || !formData.username || !formData.password || !formData.serverIp || !formData.startDate) {
      toast.error("Please fill in all required fields including panel credentials and start date");
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        userId: formData.userId,
        name: formData.name,
        price: formData.price,
        features: formData.features.split(",").map((f) => f.trim()).filter(Boolean),
        type: formData.type,
        url: formData.url,
        username: formData.username,
        password: formData.password,
        serverIp: formData.serverIp,
        startDate: formData.startDate,
      };

      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `/api/admin/services/${editingId}` : "/api/admin/services";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success(editingId ? "Service updated" : "Service created");
        setFormData({
          userId: "",
          name: "",
          price: "",
          features: "",
          type: "cPanel",
          url: "",
          username: "",
          password: "",
          serverIp: "",
          startDate: "",
        });
        setShowForm(false);
        setEditingId(null);
        fetchServices();
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to save service");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (service: Service) => {
    const parsedFeatures = typeof service.features === 'string' ? JSON.parse(service.features) : service.features;
    setFormData({
      userId: service.userId,
      name: service.name,
      price: service.price.toString(),
      features: Array.isArray(parsedFeatures) ? parsedFeatures.join(", ") : "",
      type: service.type,
      url: service.url || "",
      username: service.username || "",
      password: service.password || "",
      serverIp: service.serverIp || "",
      startDate: service.startDate ? service.startDate.split('T')[0] : "",
    });
    setEditingId(service.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      const response = await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
      if (response.ok) {
        toast.success("Service deleted");
        fetchServices();
      } else {
        toast.error("Failed to delete service");
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
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Services Management</h1>
          </div>
          <Button
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              setFormData({
                userId: "",
                name: "",
                price: "",
                features: "",
                type: "cPanel",
                url: "",
                username: "",
                password: "",
                serverIp: "",
                startDate: "",
              });
            }}
            className="cursor-pointer bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Service
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Form */}
        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingId ? "Edit Service" : "Create New Service"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                  {/* Service Name */}
                  <div>
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Service Name *
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g., Premium Hosting"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Price (FCFA) *
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  {/* Service Type */}
                  <div>
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Control Panel Type *
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full mt-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white"
                    >
                      <option value="cPanel">cPanel</option>
                      <option value="DirectAdmin">DirectAdmin</option>
                      <option value="Plesk">Plesk</option>
                    </select>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Features (comma-separated)
                  </label>
                  <Input
                    type="text"
                    placeholder="SSL Certificate, Unlimited Email, Database Support"
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    className="mt-1"
                  />
                </div>

                {/* Control Panel Details */}
                <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <p className="font-semibold text-slate-700 dark:text-slate-300 mb-4">
                    Control Panel Credentials
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        URL/Hostname
                      </label>
                      <Input
                        type="text"
                        placeholder="https://panel.kmerhosting.com"
                        value={formData.url}
                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Server IP
                      </label>
                      <Input
                        type="text"
                        placeholder="192.168.1.1"
                        value={formData.serverIp}
                        onChange={(e) => setFormData({ ...formData, serverIp: e.target.value })}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Username
                      </label>
                      <Input
                        type="text"
                        placeholder="cPanel username"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Password
                      </label>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Service Dates */}
                <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <p className="font-semibold text-slate-700 dark:text-slate-300 mb-4">
                    Service Dates
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Service Start Date *
                      </label>
                      <Input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Service End Date (Auto-calculated)
                      </label>
                      <Input
                        type="date"
                        disabled
                        value={formData.startDate ? new Date(new Date(formData.startDate).setFullYear(new Date(formData.startDate).getFullYear() + 1)).toISOString().split('T')[0] : ""}
                        className="mt-1 bg-slate-200 dark:bg-slate-700 cursor-not-allowed"
                      />
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                        Automatically calculated as start date + 1 year
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="cursor-pointer bg-blue-600 hover:bg-blue-700"
                  >
                    {isSubmitting ? "Saving..." : editingId ? "Update Service" : "Create Service"}
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

        {/* Services Table */}
        <Card>
          <CardHeader>
            <CardTitle>Services List</CardTitle>
            <CardDescription>{services.length} services in total</CardDescription>
          </CardHeader>
          <CardContent>
            {services.length === 0 ? (
              <p className="text-center text-slate-600 dark:text-slate-400 py-8">
                No services yet. Create one to get started.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">
                        Service Name
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">
                        Client
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">
                        Type
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">
                        Price
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">
                        Start Date
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">
                        End Date
                      </th>
                      <th className="text-center py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((service) => (
                      <tr
                        key={service.id}
                        className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                      >
                        <td className="py-3 px-4">
                          <p className="font-semibold text-slate-900 dark:text-white">{service.name}</p>
                          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                            {(() => {
                              try {
                                const features = JSON.parse(service.features);
                                return (
                                  <>
                                    {features.slice(0, 2).join(", ")}
                                    {features.length > 2 && `... +${features.length - 2} more`}
                                  </>
                                );
                              } catch {
                                return service.features || 'No features';
                              }
                            })()}
                          </p>
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-slate-900 dark:text-white">{service.user?.fullName}</p>
                          <p className="text-xs text-slate-600 dark:text-slate-400">{service.user?.email}</p>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded">
                            {service.type}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right font-semibold text-slate-900 dark:text-white">
                          {service.price.toLocaleString()} FCFA
                        </td>
                        <td className="py-3 px-4 text-slate-600 dark:text-slate-400 text-xs">
                          {service.startDate ? new Date(service.startDate).toLocaleDateString() : "—"}
                        </td>
                        <td className="py-3 px-4 text-slate-600 dark:text-slate-400 text-xs">
                          {service.endDate ? new Date(service.endDate).toLocaleDateString() : "—"}
                        </td>
                        <td className="py-3 px-4 text-center space-x-2 flex justify-center">
                          <Button
                            onClick={() => handleEdit(service)}
                            size="sm"
                            variant="outline"
                            className="cursor-pointer"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            onClick={() => handleDelete(service.id)}
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
