"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import Navbar from "@/components/navbar";
import { PageSkeletons } from "@/components/page-skeletons";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert } from "@/components/ui/alert";
import Link from "next/link";
import { ArrowLeft, FileText, Download, AlertCircle, Shield } from "lucide-react";
import { toast } from "sonner";

interface Invoice {
  id: string;
  invoiceNumber: string;
  amount: number;
  status: string;
  dueDate: string;
  createdAt: string;
  isFinal?: boolean;
  verificationKey?: string;
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
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const element = document.createElement("a");
        element.href = url;
        element.download = `KmerHosting_${invoiceNumber}.pdf`;
        element.style.display = "none";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        window.URL.revokeObjectURL(url);
        toast.success("Invoice downloaded");
      } else {
        toast.error("Failed to download");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Download error");
    } finally {
      setDownloadingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "overdue":
        return "bg-red-100 text-red-700";
      default:
        return "bg-slate-100 text-slate-700";
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
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">My Invoices</h1>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/dashboard" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Dashboard
            </Link>
          </Button>
        </div>

        {/* Verification Info Alert */}
        <Alert className="mb-8 border-blue-200 bg-blue-50">
          <Shield className="h-4 w-4 text-blue-600" />
          <div className="ml-3">
            <p className="font-semibold text-blue-900">Besoin de vérifier une facture?</p>
            <p className="text-sm text-blue-800 mt-1">
              Chaque PDF contient 4 codes uniques dans la section verte: Clé de Vérification, Hash PIN, et Signature Numérique. 
              <Button asChild variant="link" className="ml-1 p-0 h-auto text-blue-600 hover:text-blue-800">
                <Link href="/verify-invoice">Vérifier l'authenticité →</Link>
              </Button>
            </p>
          </div>
        </Alert>

        {/* Invoices List */}
        {invoices.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-slate-600">No invoices yet.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {invoices.map((invoice) => (
              <Card
                key={invoice.id}
                className={`hover:shadow-md transition-shadow ${
                  invoice.status.toLowerCase() === "overdue" ? "border-red-300 border-2" : ""
                }`}
              >
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    {/* Invoice Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-3 mb-3">
                        <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-slate-900">{invoice.invoiceNumber}</p>
                          {invoice.verificationKey && (
                            <p className="text-xs text-slate-600 mt-1">
                              Verification KEY: <span className="font-mono font-semibold text-teal-600">{invoice.verificationKey.toUpperCase()}</span>
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-3 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-xs text-slate-500 uppercase mb-1">Amount</p>
                          <p className="font-semibold text-slate-900">{invoice.amount.toLocaleString()} FCFA</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 uppercase mb-1">Status</p>
                          <Badge className={`${getStatusColor(invoice.status)} border-0`}>
                            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 uppercase mb-1">Issued</p>
                          <p className="text-slate-900">{new Date(invoice.createdAt).toLocaleDateString("fr-FR")}</p>
                        </div>
                        <div className="hidden md:block">
                          <p className="text-xs text-slate-500 uppercase mb-1">Due</p>
                          <p className={invoice.status.toLowerCase() === "overdue" ? "text-red-600 font-semibold" : "text-slate-900"}>
                            {new Date(invoice.dueDate).toLocaleDateString("fr-FR")}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Download Button */}
                    <Button
                      onClick={() => handleDownloadPDF(invoice.id, invoice.invoiceNumber)}
                      disabled={downloadingId === invoice.id}
                      className="bg-teal-600 hover:bg-teal-700 text-white gap-2 flex-shrink-0 self-start"
                      size="sm"
                    >
                      {downloadingId === invoice.id ? (
                        <>
                          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Security Info - at the end, short and minimal */}
        <div className="mt-12 space-y-3 pt-8 border-t border-slate-200">
          <Alert className="border-blue-200 bg-blue-50">
            <Shield className="h-4 w-4 text-blue-600" />
            <p className="ml-3 text-sm text-blue-800">
              <strong>Verify invoices:</strong> All invoices have a Verification KEY. <Link href="/verify-invoice" className="font-semibold underline hover:text-blue-900">Verify authenticity here</Link>
            </p>
          </Alert>
          
          <Alert className="border-orange-200 bg-orange-50">
            <AlertCircle className="h-4 w-4 text-orange-600" />
            <p className="ml-3 text-sm text-orange-800">
              <strong>Never share:</strong> PIN Hash or control panel credentials. Always verify before responding to invoice emails.
            </p>
          </Alert>
        </div>
      </div>
    </div>
  );
}
