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
import { ArrowLeft, FileText, Download, Eye, AlertCircle, Check } from "lucide-react";
import { toast } from "sonner";

interface Invoice {
  id: string;
  invoiceNumber: string;
  amount: number;
  status: string;
  dueDate: string;
  invoiceDate: string;
  createdAt: string;
  isFinal?: boolean;
  service?: { name: string };
}

export default function InvoicesPage() {
  const { user, loading: authLoading } = useAuth();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading) {
      fetchInvoices();
    }
  }, [authLoading]);

  const fetchInvoices = async () => {
    try {
      const response = await fetch("/api/invoices");
      if (response.ok) {
        const data = await response.json();
        setInvoices(data);
      }
    } catch (error) {
      console.error("Error fetching invoices:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async (invoiceId: string, invoiceNumber: string) => {
    try {
      setDownloadingId(invoiceId);
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
        toast.success("Invoice downloaded successfully");
      } else {
        toast.error("Failed to download invoice");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while downloading");
    } finally {
      setDownloadingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400";
      case "pending":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400";
      case "overdue":
        return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400";
      default:
        return "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return <Check className="w-4 h-4" />;
      case "overdue":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
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
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">My Invoices</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">View and download your invoices</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>

        {invoices.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No Invoices Yet</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-400">
                You don't have any invoices yet. Your first invoice will appear after you purchase a service.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <Card
                key={invoice.id}
                className={`hover:shadow-lg transition-all ${
                  invoice.status.toLowerCase() === "overdue"
                    ? "border-red-400 border-2"
                    : "border-slate-200 dark:border-slate-700"
                }`}
              >
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Left Section - Invoice Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                          {invoice.invoiceNumber}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Badge className={`${getStatusColor(invoice.status)} border-0`}>
                            {getStatusIcon(invoice.status) && (
                              <span className="mr-1">{getStatusIcon(invoice.status)}</span>
                            )}
                            {invoice.status.toUpperCase()}
                          </Badge>
                          {invoice.isFinal && (
                            <Badge className="bg-purple-600 hover:bg-purple-700 text-white">
                              Final Invoice
                            </Badge>
                          )}
                        </div>
                      </div>

                      {invoice.service && (
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                          Service: <span className="font-semibold text-slate-900 dark:text-white">{invoice.service.name}</span>
                        </p>
                      )}

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase">Amount</p>
                          <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mt-1">
                            {invoice.amount.toLocaleString()} FCFA
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase">Issued Date</p>
                          <p className="text-sm text-slate-900 dark:text-white font-medium mt-1">
                            {new Date(invoice.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase">Due Date</p>
                          <p className={`text-sm font-medium mt-1 ${
                            invoice.status.toLowerCase() === "overdue"
                              ? "text-red-600 dark:text-red-400"
                              : "text-slate-900 dark:text-white"
                          }`}>
                            {new Date(invoice.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase">Days Left</p>
                          <p className="text-sm text-slate-900 dark:text-white font-medium mt-1">
                            {Math.ceil((new Date(invoice.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right Section - Download Button */}
                    <div className="flex gap-2 md:flex-col md:items-end">
                      <Button
                        onClick={() => handleDownloadPDF(invoice.id, invoice.invoiceNumber)}
                        disabled={downloadingId === invoice.id}
                        className="flex-1 md:flex-none bg-green-600 hover:bg-green-700 text-white cursor-pointer flex items-center justify-center gap-2"
                      >
                        {downloadingId === invoice.id ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Downloading...
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4" />
                            Download PDF
                          </>
                        )}
                      </Button>
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
