"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, Plus, Download, Eye, Trash2, Loader2 } from "lucide-react";

interface Invoice {
  id: string;
  userId: string;
  serviceId?: string;
  domainId?: string;
  invoiceNumber: string;
  amount: number;
  isFinal: boolean;
  status: string;
  createdAt: string;
  dueDate: string;
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
  price: number;
}

interface Domain {
  id: string;
  name: string;
  userId: string;
  serviceId: string;
  purchasedPrice?: number;
}

export default function AdminInvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    userId: "",
    serviceId: "",
    domainId: "",
    amount: "",
    isFinal: false,
    status: "pending",
    dueDate: "",
  });

  useEffect(() => {
    fetchInvoices();
    fetchUsers();
    fetchServices();
    fetchDomains();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await fetch("/api/admin/invoices");
      if (response.ok) {
        const data = await response.json();
        setInvoices(data);
      } else {
        toast.error("Failed to fetch invoices");
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

  const fetchDomains = async () => {
    try {
      const response = await fetch("/api/admin/domains");
      if (response.ok) {
        const data = await response.json();
        setDomains(data);
      }
    } catch (error) {
      console.error("Error fetching domains:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.userId || !formData.amount || (!formData.serviceId && !formData.domainId)) {
      toast.error("Please fill in required fields: User, Amount, and at least Service or Domain");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch("/api/admin/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: formData.userId,
          ...(formData.serviceId && { serviceId: formData.serviceId }),
          ...(formData.domainId && { domainId: formData.domainId }),
          amount: formData.amount,
          isFinal: formData.isFinal,
          dueDate: formData.dueDate || undefined,
        }),
      });

      if (response.ok) {
        toast.success("Invoice created");
        setFormData({ userId: "", serviceId: "", domainId: "", amount: "", isFinal: false, status: "pending", dueDate: "" });
        setShowForm(false);
        fetchInvoices();
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to create invoice");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePreviewPDF = async (invoiceId: string) => {
    try {
      const response = await fetch(`/api/admin/invoices/${invoiceId}/pdf`);
      if (response.ok) {
        const data = await response.json();
        setPreviewHtml(data.html);
      } else {
        toast.error("Failed to generate PDF");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred");
    }
  };

  const handleDownloadPDF = async (invoiceId: string, invoiceNumber: string) => {
    try {
      const response = await fetch(`/api/admin/invoices/${invoiceId}/pdf`);
      if (response.ok) {
        const data = await response.json();
        const element = document.createElement("a");
        element.setAttribute(
          "href",
          "data:text/html;charset=utf-8," + encodeURIComponent(data.html)
        );
        element.setAttribute("download", `${invoiceNumber}.html`);
        element.style.display = "none";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        toast.success("PDF downloaded");
      } else {
        toast.error("Failed to download PDF");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this invoice?")) return;

    try {
      const response = await fetch(`/api/admin/invoices/${id}`, { method: "DELETE" });
      if (response.ok) {
        toast.success("Invoice deleted");
        fetchInvoices();
      } else {
        toast.error("Failed to delete invoice");
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
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Invoices Management</h1>
          </div>
          <Button
            onClick={() => {
              setShowForm(!showForm);
              setFormData({ userId: "", serviceId: "", domainId: "", amount: "", isFinal: false, status: "pending", dueDate: "" });
            }}
            className="cursor-pointer bg-purple-600 hover:bg-purple-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Invoice
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Form */}
        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Generate New Invoice</CardTitle>
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
                      onChange={(e) => {
                        setFormData({ ...formData, userId: e.target.value, serviceId: "" });
                      }}
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
                      Service
                    </label>
                    <select
                      value={formData.serviceId}
                      onChange={(e) => {
                        const service = services.find((s) => s.id === e.target.value);
                        setFormData({
                          ...formData,
                          serviceId: e.target.value,
                          ...(service && !formData.amount && { amount: service.price.toString() }),
                        });
                      }}
                      className="w-full mt-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white"
                    >
                      <option value="">Select a service</option>
                      {services
                        .filter((s) => s.userId === formData.userId)
                        .map((service) => (
                          <option key={service.id} value={service.id}>
                            {service.name} - {service.price.toLocaleString()} FCFA
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* Domain Selection */}
                  <div>
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Domain
                    </label>
                    <select
                      value={formData.domainId}
                      onChange={(e) => setFormData({ ...formData, domainId: e.target.value })}
                      className="w-full mt-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white"
                    >
                      <option value="">Select a domain</option>
                      {domains
                        .filter((d) => d.userId === formData.userId)
                        .map((domain) => (
                          <option key={domain.id} value={domain.id}>
                            {domain.name} {domain.purchasedPrice ? `- ${domain.purchasedPrice.toLocaleString()} FCFA` : ""}
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* Amount */}
                  <div>
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Amount (FCFA) *
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  {/* Due Date */}
                  <div>
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Due Date
                    </label>
                    <Input
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* isFinal Checkbox */}
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3 cursor-pointer"
                    onClick={() => setFormData({ ...formData, isFinal: !formData.isFinal })}>
                    <input
                      type="checkbox"
                      id="isFinal"
                      checked={formData.isFinal}
                      onChange={(e) => setFormData({ ...formData, isFinal: e.target.checked })}
                      className="w-5 h-5 cursor-pointer accent-purple-600"
                    />
                    <label htmlFor="isFinal" className="text-base font-semibold text-slate-800 dark:text-slate-100 cursor-pointer flex-1">
                      Mark as Final Invoice
                    </label>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 ml-8">
                    Final invoices are automatically marked as PAID and cannot be reopened
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="cursor-pointer bg-purple-600 hover:bg-purple-700"
                  >
                    {isSubmitting ? "Creating..." : "Create Invoice"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                    className="cursor-pointer"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Invoices Table */}
        <Card>
          <CardHeader>
            <CardTitle>Invoices List</CardTitle>
            <CardDescription>{invoices.length} invoices in total</CardDescription>
          </CardHeader>
          <CardContent>
            {invoices.length === 0 ? (
              <p className="text-center text-slate-600 dark:text-slate-400 py-8">
                No invoices yet. Create one to get started.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">
                        Invoice #
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">
                        Client
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">
                        Item
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">
                        Amount
                      </th>
                      <th className="text-center py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">
                        Status
                      </th>
                      <th className="text-center py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">
                        Final
                      </th>
                      <th className="text-center py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice) => (
                      <tr
                        key={invoice.id}
                        className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                      >
                        <td className="py-3 px-4">
                          <p className="font-semibold text-slate-900 dark:text-white">
                            {invoice.invoiceNumber}
                          </p>
                          <p className="text-xs text-slate-600 dark:text-slate-400">
                            {new Date(invoice.createdAt).toLocaleDateString()}
                          </p>
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-slate-900 dark:text-white">{invoice.user?.fullName}</p>
                          <p className="text-xs text-slate-600 dark:text-slate-400">{invoice.user?.email}</p>
                        </td>
                        <td className="py-3 px-4">
                          {invoice.service?.name && <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded block mb-1">{invoice.service.name}</span>}
                          {/* Domain rendering placeholder - will be added with domain relation */}
                        </td>
                        <td className="py-3 px-4 text-right font-semibold text-slate-900 dark:text-white">
                          {invoice.amount.toLocaleString()} FCFA
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${
                              invoice.status === "paid"
                                ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                                : invoice.status === "pending"
                                ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                                : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                            }`}
                          >
                            {invoice.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          {invoice.isFinal ? (
                            <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded font-semibold">
                              ✓ Final
                            </span>
                          ) : (
                            <span className="text-xs text-slate-600 dark:text-slate-400">—</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center space-x-2 flex justify-center">
                          <Button
                            onClick={() => handlePreviewPDF(invoice.id)}
                            size="sm"
                            variant="outline"
                            className="cursor-pointer"
                            title="Preview"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            onClick={() => handleDownloadPDF(invoice.id, invoice.invoiceNumber)}
                            size="sm"
                            variant="outline"
                            className="cursor-pointer text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"
                            title="Download PDF"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button
                            onClick={() => handleDelete(invoice.id)}
                            size="sm"
                            variant="outline"
                            className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                            title="Delete"
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

      {/* PDF Preview Modal */}
      {previewHtml && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg w-full max-w-4xl max-h-96 overflow-auto">
            <div className="sticky top-0 bg-white dark:bg-slate-800 p-4 border-b flex justify-between items-center">
              <h3 className="font-bold">Invoice Preview</h3>
              <Button
                onClick={() => setPreviewHtml(null)}
                variant="outline"
                className="cursor-pointer"
              >
                Close
              </Button>
            </div>
            <div
              className="p-4"
              dangerouslySetInnerHTML={{ __html: previewHtml }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
