import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyInvoiceSignature } from "@/lib/verification";

const SERVER_SECRET = process.env.INVOICE_SIGNING_SECRET || "default-secret-change-in-production";

// GET - Verify an invoice with email, invoice number, verification key and PIN hash
// The PIN hash is what appears on the invoice - user just needs to copy/paste it
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const invoiceNumber = searchParams.get("invoiceNumber");
  const verificationKey = searchParams.get("key");
  const email = searchParams.get("email");
  const pinHash = searchParams.get("pinHash");
  const signature = searchParams.get("signature");

  if (!invoiceNumber || !verificationKey || !email || !pinHash || !signature) {
    return NextResponse.json(
      { valid: false, message: "Tous les champs sont obligatoires" },
      { status: 400 }
    );
  }

  try {
    // Find invoice
    const invoice = await prisma.invoice.findUnique({
      where: { invoiceNumber },
      include: { user: true },
    });

    if (!invoice) {
      return NextResponse.json(
        { valid: false, message: "Facture non trouvée" },
        { status: 404 }
      );
    }

    // Verify invoice number
    if (invoice.invoiceNumber !== invoiceNumber) {
      return NextResponse.json(
        { valid: false, message: "Numéro de facture invalide" },
        { status: 400 }
      );
    }

    // Verify email matches user email (this ensures only the invoice owner can verify)
    if (invoice.user.email.toLowerCase() !== email.toLowerCase()) {
      return NextResponse.json(
        { valid: false, message: "Email invalide ou ne correspond pas à cette facture" },
        { status: 400 }
      );
    }

    // Verify verification key (case-insensitive)
    if (invoice.verificationKey.toLowerCase() !== verificationKey.toLowerCase()) {
      return NextResponse.json(
        { valid: false, message: "Clé de vérification invalide" },
        { status: 400 }
      );
    }

    // Verify PIN hash (case-insensitive) - this is the actual security check
    // The hash is printed on the PDF invoice, user just needs to copy/paste it
    if (!invoice.pinHash || invoice.pinHash.toLowerCase() !== pinHash.toLowerCase()) {
      return NextResponse.json(
        { valid: false, message: "Hash de PIN invalide. Vérifiez le code PIN Hash sur votre facture." },
        { status: 400 }
      );
    }

    // CRITICAL: Verify the cryptographic signature
    // This prevents anyone from forging an invoice
    const isSignatureValid = verifyInvoiceSignature(
      invoice.invoiceNumber,
      invoice.amount,
      invoice.user.email,
      invoice.verificationKey,
      signature,
      SERVER_SECRET
    );

    if (!isSignatureValid) {
      return NextResponse.json(
        { valid: false, message: "Signature de facture invalide. Cette facture pourrait être contrefaite." },
        { status: 400 }
      );
    }

    // All verifications passed!
    return NextResponse.json({
      valid: true,
      message: "Facture authentique et originaire de KmerHosting. Solutions d'Hébergement Fiable",
      invoice: {
        invoiceNumber: invoice.invoiceNumber,
        amount: invoice.amount,
        createdAt: invoice.createdAt,
        status: invoice.status,
        clientName: invoice.user.fullName,
        clientEmail: invoice.user.email,
      },
    });
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { valid: false, message: "Erreur lors de la vérification" },
      { status: 500 }
    );
  }
}
