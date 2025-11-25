"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { CheckCircle, XCircle, AlertCircle, Loader2, Shield } from "lucide-react";
import Navbar from "@/components/navbar";
import Link from "next/link";

function VerifyInvoiceContent() {
  const searchParams = useSearchParams();
  const [invoiceNumber, setInvoiceNumber] = useState(searchParams.get("invoiceNumber") || "");
  const [verificationKey, setVerificationKey] = useState(searchParams.get("key") || "");
  const [email, setEmail] = useState("");
  const [pinHash, setPinHash] = useState("");
  const [signature, setSignature] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    if (!invoiceNumber.trim() || !verificationKey.trim() || !email.trim() || !pinHash.trim() || !signature.trim()) {
      setError("Veuillez remplir tous les champs obligatoires.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `/api/invoices/verify?invoiceNumber=${encodeURIComponent(invoiceNumber)}&key=${encodeURIComponent(verificationKey)}&email=${encodeURIComponent(email)}&pinHash=${encodeURIComponent(pinHash)}&signature=${encodeURIComponent(signature)}`
      );
      const data = await response.json();

      if (response.ok && data.valid) {
        setResult({
          valid: true,
          invoice: data.invoice,
        });
      } else {
        setError(data.message || "Les informations de vérification sont invalides. Veuillez vérifier tous les détails.");
      }
    } catch (err) {
      setError("Une erreur de connexion s'est produite. Veuillez réessayer ultérieurement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <Navbar />
      
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-10 h-10 text-teal-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              Vérifier l'Authenticité d'une Facture
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Utilisez les codes uniques imprimés sur votre facture pour confirmer son authenticité
          </p>
        </div>

        {/* Security Alert */}
        <Alert className="mb-8 border-green-200 bg-green-50">
          <AlertCircle className="h-4 w-4 text-green-600" />
          <div className="ml-3">
            <p className="font-semibold text-green-900">Comment vérifier votre facture?</p>
            <p className="text-sm text-green-800 mt-1">
              Chaque facture KmerHosting contient 4 codes de sécurité uniques générés par nos serveurs. Entrez-les ci-dessous pour confirmer que la facture est authentique et qu'aucune information n'a été modifiée. Seul KmerHosting peut générer ces codes.
            </p>
          </div>
        </Alert>

        {/* Verification Form */}
        <Card className="p-8 mb-8 shadow-lg border-0">
          <form onSubmit={handleVerify} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                placeholder="Ex: votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                disabled={loading}
              />
              <p className="text-xs text-gray-500 mt-2">
                L'adresse email exacte du client sur la facture (telle qu'elle apparaît sur le PDF)
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Hash du Code PIN <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                placeholder="Ex: 3f3d5c8a2b1e9f7d"
                value={pinHash}
                onChange={(e) => setPinHash(e.target.value.toLowerCase())}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent font-mono text-sm tracking-wider"
                disabled={loading}
              />
              <p className="text-xs text-gray-500 mt-2">
                Code de sécurité dans la zone verte en haut du PDF (16 caractères hexadécimaux). Copiez-collez exactement.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Clé de Vérification <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                placeholder="Ex: abc123xy"
                value={verificationKey}
                onChange={(e) => setVerificationKey(e.target.value.toLowerCase())}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent font-mono tracking-widest text-center text-lg"
                disabled={loading}
              />
              <p className="text-xs text-gray-500 mt-2">
                Clé unique (8 caractères) dans la zone verte du PDF. Copiez-collez exactement.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Numéro de Facture <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                placeholder="Ex: INV-1764001008863-1"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent font-mono"
                disabled={loading}
              />
              <p className="text-xs text-gray-500 mt-2">
                Vous trouverez ce numéro en haut de votre facture PDF.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Signature Numérique <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                placeholder="Ex: a1b2c3d4e5f6g7h8"
                value={signature}
                onChange={(e) => setSignature(e.target.value.toLowerCase())}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent font-mono text-sm tracking-wider"
                disabled={loading}
              />
              <p className="text-xs text-gray-500 mt-2">
                Signature cryptographique dans la zone verte du PDF (16 caractères hexadécimaux). Seul KmerHosting peut générer ces signatures - elles ne peuvent pas être contrefaites.
              </p>
            </div>

            <Button
              type="submit"
              disabled={loading || !invoiceNumber.trim() || !verificationKey.trim() || !email.trim() || !pinHash.trim() || !signature.trim()}
              className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Vérification en cours...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  Vérifier la Facture
                </>
              )}
            </Button>
          </form>

          {error && (
            <Alert className="mt-6 border-red-200 bg-red-50">
              <XCircle className="h-5 w-5 text-red-600" />
              <div className="ml-3">
                <p className="font-semibold text-red-900">Vérification Échouée</p>
                <p className="text-sm text-red-800 mt-1">{error}</p>
              </div>
            </Alert>
          )}
        </Card>

        {/* Success Result */}
        {result && result.valid && (
          <Card className="p-8 bg-green-50 border-2 border-green-200 shadow-lg">
            <div className="flex items-start gap-4 mb-6">
              <CheckCircle className="w-10 h-10 text-green-600 flex-shrink-0" />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-green-900">
                  Facture Authentifiée
                </h2>
                <p className="text-green-800 mt-1">
                  Cette facture est authentique et provient genuinement de KmerHosting. Vous pouvez procéder en toute confiance.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 space-y-4 border border-green-200">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Numéro de Facture</p>
                  <p className="text-lg font-semibold text-gray-900 font-mono">{result.invoice.invoiceNumber}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Montant</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {Math.round(result.invoice.amount).toLocaleString("fr-FR")} FCFA
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Client</p>
                <p className="text-gray-900">{result.invoice.clientName || result.invoice.clientEmail || 'N/A'}</p>
              </div>
            </div>

            <p className="text-sm text-green-700 mt-6 italic text-center">
              ✓ Vérifiée par KmerHosting - Solutions d'Hébergement Fiable
            </p>
          </Card>
        )}

        {/* Information Section */}
        <Card className="p-8 mt-8 bg-blue-50 border-blue-200 shadow">
          <h3 className="text-xl font-bold text-blue-900 mb-6 flex items-center gap-3">
            <Shield className="w-6 h-6" />
            Comment Vérifier une Facture?
          </h3>
          <ol className="space-y-4 text-blue-900">
            <li className="flex gap-4">
              <span className="font-bold flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-200 rounded-full">1</span>
              <span><strong>Ouvrez la facture PDF</strong> reçue par email de KmerHosting</span>
            </li>
            <li className="flex gap-4">
              <span className="font-bold flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-200 rounded-full">2</span>
              <span>Localisez le <strong>numéro de facture</strong> affiché en haut à droite (format: INV-...)</span>
            </li>
            <li className="flex gap-4">
              <span className="font-bold flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-200 rounded-full">3</span>
              <span>Trouvez la <strong>clé de vérification</strong> en bas à gauche, affichée en <span className="text-green-600 font-bold">vert</span> (8 caractères alphanumériques)</span>
            </li>
            <li className="flex gap-4">
              <span className="font-bold flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-200 rounded-full">4</span>
              <span>Entrez ces deux informations dans les champs ci-dessus</span>
            </li>
            <li className="flex gap-4">
              <span className="font-bold flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-200 rounded-full">5</span>
              <span>Cliquez sur <strong>"Vérifier la Facture"</strong></span>
            </li>
            <li className="flex gap-4">
              <span className="font-bold flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-200 rounded-full">6</span>
              <span>Si la facture est authentique, un message de confirmation apparaîtra</span>
            </li>
          </ol>
        </Card>

        {/* Warning Box */}
        <Card className="p-8 mt-8 bg-red-50 border-red-200 border-2">
          <div className="flex gap-4">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-red-900 text-lg mb-3">⚠ Attention: Prévention des Arnaq</h4>
              <ul className="space-y-2 text-red-800 text-sm">
                <li>• <strong>Vérifiez toujours</strong> l'authenticité avant de cliquer sur des liens ou pièces jointes</li>
                <li>• Les cybercriminels peuvent <strong>usurper l'identité de KmerHosting</strong> par email</li>
                <li>• <strong>N'effectuez jamais</strong> de paiement ou ne partagez vos identifiants sans vérification préalable</li>
                <li>• Si vous avez des doutes, <strong>contactez directement</strong> KmerHosting via notre site officiel</li>
                <li>• Les vraies factures KmerHosting incluent <strong>toujours une clé de vérification</strong></li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Footer Links */}
        <div className="text-center mt-12 space-y-3">
          <div className="space-y-2">
            <p className="text-gray-600">
              <Link href="/" className="text-teal-600 hover:text-teal-700 font-semibold underline">
                Retour à l'Accueil
              </Link>
              {" • "}
              <Link href="/contact" className="text-teal-600 hover:text-teal-700 font-semibold underline">
                Signaler une Fraude
              </Link>
            </p>
          </div>
          <p className="text-sm text-gray-500">
            © 2024 KmerHosting - Hébergement, VPS et Serveurs Dédiés
          </p>
        </div>
      </div>
    </div>
  );
}

export default function VerifyInvoicePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-teal-50" />}>
      <VerifyInvoiceContent />
    </Suspense>
  );
}
