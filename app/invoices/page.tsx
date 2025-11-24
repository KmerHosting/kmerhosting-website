"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import Navbar from "@/components/navbar";
import LoadingSpinner from "@/components/loading-spinner";
import { PageSkeletons } from "@/components/page-skeletons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, FileText, Download } from "lucide-react";

interface Invoice {
  id: string;
  invoiceNumber: string;
  amount: number;
  status: string;
  dueDate: string;
  createdAt: string;
  service?: { name: string };
}

export default function InvoicesPage() {
  const { user, loading: authLoading } = useAuth();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

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
            <Link href="/dashboard" className="flex items-center gap-2">
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
              <Card key={invoice.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                          {invoice.invoiceNumber}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(invoice.status)}`}>
                          {invoice.status.toUpperCase()}
                        </span>
                      </div>
                      {invoice.service && (
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                          Service: <span className="font-semibold text-slate-900 dark:text-white">{invoice.service.name}</span>
                        </p>
                      )}
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-slate-600 dark:text-slate-400">Amount</p>
                          <p className="text-lg font-semibold text-slate-900 dark:text-white">
                            {invoice.amount.toLocaleString()} FCFA
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-600 dark:text-slate-400">Issued</p>
                          <p className="text-sm text-slate-900 dark:text-white">
                            {new Date(invoice.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-600 dark:text-slate-400">Due Date</p>
                          <p className="text-sm text-slate-900 dark:text-white">
                            {new Date(invoice.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button
                      asChild
                      variant="outline"
                      className="ml-4"
                    >
                      <Link href={`/api/admin/invoices/${invoice.id}/pdf`} target="_blank" className="flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Download
                      </Link>
                    </Button>
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
