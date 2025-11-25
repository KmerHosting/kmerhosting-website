import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import prisma from "@/lib/prisma";
import { jsPDF } from "jspdf";
import fs from "fs";
import path from "path";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-change-in-production"
);

async function verifyAdminToken(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded = await jwtVerify(token, JWT_SECRET);
    if (decoded.payload.role === "admin") {
      return decoded.payload;
    }
  } catch (error) {
    return null;
  }

  return null;
}

// GET invoice PDF (returns PDF buffer for direct download)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await verifyAdminToken(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const invoice = await prisma.invoice.findUnique({
      where: { id },
      include: {
        user: true,
        service: true,
        domain: true,
      },
    });

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    // Format date to DD/MM/YYYY
    const formatDateToString = (date: Date | string) => {
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    };

    // Format currency with FCFA
    const formatCurrency = (amount: number) => {
      return `${Math.round(amount).toLocaleString("fr-FR")} FCFA`;
    };

    // Create PDF in A5 Landscape format (210mm x 148mm)
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a5",
    });

    const pageWidth = 210;
    const pageHeight = 148;
    const margin = 15;
    const contentWidth = pageWidth - margin * 2;

    // Draw header background
    doc.setFillColor(18, 140, 126); // #128C7E
    doc.rect(0, 0, pageWidth, 40, "F");

    // Add decorative circles with more transparency (lower opacity)
    doc.setFillColor(13, 107, 95);
    // Using setAlpha for transparency
    doc.setGState(new (doc as any).GState({ opacity: 0.20 }));
    doc.circle(pageWidth - 20, 20, 25, "F");
    doc.circle(pageWidth - 50, 10, 18, "F");
    doc.circle(pageWidth - 10, 35, 15, "F");
    doc.circle(25, 8, 12, "F");
    doc.circle(8, 25, 20, "F");
    doc.circle(pageWidth - 80, 30, 10, "F");

    // Reset opacity to normal
    doc.setGState(new (doc as any).GState({ opacity: 1 }));

    // Add logo from public folder
    try {
      // Try PNG first (logo.png)
      const logoPngPath = path.join(process.cwd(), "public", "logo.png");
      if (fs.existsSync(logoPngPath)) {
        const logoData = fs.readFileSync(logoPngPath);
        const logoBase64 = logoData.toString("base64");
        // Logo ratio: 2259x864 = 2.616
        const logoWidth = 80;  // mm
        const logoHeight = logoWidth / 2.616;  // ~30.6mm
        const logoX = (pageWidth - logoWidth) / 2;
        doc.addImage(
          `data:image/png;base64,${logoBase64}`,
          "PNG",
          logoX,
          2,
          logoWidth,
          logoHeight,
          undefined,
          "NONE"
        );
      } else {
        // Fallback to text if logo not found
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(26);
        doc.setFont("helvetica", "bold");
        doc.text("KmerHosting", pageWidth / 2, 20, { align: "center" });
      }
    } catch (error) {
      // Fallback to text
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(26);
      doc.setFont("helvetica", "bold");
      doc.text("KmerHosting", pageWidth / 2, 20, { align: "center" });
    }

    // Tagline
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "italic");
    doc.text("The Best Hosting Solutions for Cameroon", pageWidth / 2, 35, {
      align: "center",
    });

    // Reset text color
    doc.setTextColor(44, 62, 80);

    let yPosition = 50;

    // Add verification codes section at top in green box
    if (invoice.verificationKey || invoice.pinHash || invoice.signature) {
      doc.setFillColor(232, 245, 233); // Light green background
      doc.setDrawColor(76, 175, 80); // Green border
      doc.setLineWidth(0.5);
      doc.rect(margin, yPosition - 10, pageWidth - 2 * margin, 16, "FD");
      
      doc.setFontSize(7);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(18, 140, 126);
      doc.text("SECURITY VERIFICATION CODES (Codes de Vérification de Sécurité):", margin + 2, yPosition - 7);
      
      doc.setFontSize(6.5);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(44, 62, 80);
      
      let codeY = yPosition - 3;
      if (invoice.verificationKey) {
        doc.text(`• Verification Key: ${invoice.verificationKey.toUpperCase()}`, margin + 2, codeY);
        codeY += 2.5;
      }
      if (invoice.pinHash) {
        doc.text(`• PIN Hash: ${invoice.pinHash.toUpperCase()}`, margin + 2, codeY);
        codeY += 2.5;
      }
      if (invoice.signature) {
        doc.text(`• Digital Signature: ${invoice.signature.toUpperCase()}`, margin + 2, codeY);
        codeY += 2.5;
      }
      
      yPosition += 18;
    }

    // Add PAYÉ circle badge if invoice is paid (top right corner)
    const isPaid = invoice.isFinal || invoice.status === "paid";
    if (isPaid) {
      // Green circle background
      doc.setFillColor(76, 175, 80); // Material Green #4CAF50
      doc.setDrawColor(76, 175, 80);
      doc.setLineWidth(0);
      
      // Draw circle in top right
      const circleX = pageWidth - 25;
      const circleY = 10;
      const circleRadius = 12;
      
      doc.circle(circleX, circleY, circleRadius, "F");
      
      // Add PAYÉ text in the circle
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(255, 255, 255);
      doc.text("PAYÉ", circleX, circleY + 1.5, { align: "center" });
      
      doc.setTextColor(44, 62, 80);
    }

    // Add verification key above invoice info
    // Removed - now at bottom of page

    // Invoice Title and Number
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(44, 62, 80);
    doc.text("FACTURE / INVOICE", margin, yPosition);

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(`No: ${invoice.invoiceNumber}`, pageWidth - margin, yPosition, {
      align: "right",
    });

    doc.setFontSize(8);
    doc.text(`Date: ${formatDateToString(invoice.createdAt)}`, pageWidth - margin, yPosition + 4, {
      align: "right",
    });

    yPosition += 10;

    // Client Information Section - Improved layout
    doc.setFillColor(248, 249, 250);
    const clientBoxWidth = contentWidth * 0.48;
    doc.roundedRect(margin, yPosition, clientBoxWidth, 28, 2, 2, "F");

    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(44, 62, 80);
    doc.text("CLIENT", margin + 3, yPosition + 3);

    doc.setFontSize(7.5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(18, 140, 126);
    doc.text(invoice.user.fullName || invoice.user.email, margin + 3, yPosition + 7, { maxWidth: clientBoxWidth - 6 });
    
    // Client info in compact layout
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(73, 80, 87);
    
    const col1X = margin + 3;
    const col2X = margin + 57;
    let infoY = yPosition + 11;
    const lineHeight = 2.5;
    
    // Column 1 - Left
    doc.setFont("helvetica", "bold");
    doc.text(`Email:`, col1X, infoY);
    doc.setFont("helvetica", "normal");
    doc.text(invoice.user.email, col1X + 11, infoY, { maxWidth: 32 });
    
    infoY += lineHeight;
    doc.setFont("helvetica", "bold");
    doc.text(`Tél:`, col1X, infoY);
    doc.setFont("helvetica", "normal");
    doc.text(invoice.user.phone || "—", col1X + 7, infoY, { maxWidth: 32 });
    
    infoY += lineHeight;
    if (invoice.user.address) {
      doc.setFont("helvetica", "bold");
      doc.text(`Adresse:`, col1X, infoY);
      doc.setFont("helvetica", "normal");
      doc.text(invoice.user.address, col1X + 13, infoY, { maxWidth: 30 });
    }
    
    // Column 2 - Right
    infoY = yPosition + 11;
    if (invoice.user.city || invoice.user.country) {
      doc.setFont("helvetica", "bold");
      doc.text(`Lieu:`, col2X, infoY);
      doc.setFont("helvetica", "normal");
      doc.text(`${invoice.user.city || ""} ${invoice.user.country || ""}`, col2X + 7, infoY, { maxWidth: 32 });
    }
    
    infoY += lineHeight;
    if (invoice.user.companyName) {
      doc.setFont("helvetica", "bold");
      doc.text(`Entreprise:`, col2X, infoY);
      doc.setFont("helvetica", "normal");
      doc.text(invoice.user.companyName, col2X + 17, infoY, { maxWidth: 32 });
    }

    // Service Information Section
    const serviceX = margin + contentWidth * 0.52;
    doc.setFillColor(248, 249, 250);
    doc.roundedRect(serviceX, yPosition, contentWidth * 0.48, 28, 2, 2, "F");

    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(44, 62, 80);
    doc.text("SERVICE", serviceX + 3, yPosition + 3);

    doc.setFontSize(7.5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(18, 140, 126);
    doc.text(invoice.service?.name || "Service", serviceX + 3, yPosition + 7, {
      maxWidth: 85,
    });

    doc.setFont("helvetica", "normal");
    doc.setTextColor(73, 80, 87);
    doc.setFontSize(6);
    const years = invoice.service?.startDate && invoice.service?.endDate
      ? Math.round(
          (new Date(invoice.service.endDate).getTime() - new Date(invoice.service.startDate).getTime()) /
            (1000 * 60 * 60 * 24 * 365)
        )
      : 0;
    
    let serviceY = yPosition + 11;
    const serviceLineHeight = 2.5;
    
    doc.text(
      `Durée: ${years} an(s)`,
      serviceX + 3,
      serviceY
    );
    serviceY += serviceLineHeight;
    
    doc.text(
      `Période: ${formatDateToString(invoice.service?.startDate || "")} - ${formatDateToString(invoice.service?.endDate || "")}`,
      serviceX + 3,
      serviceY,
      { maxWidth: contentWidth * 0.48 - 6 }
    );
    serviceY += serviceLineHeight;

    // Domain name if available
    if (invoice.domain) {
      doc.text(
        `Domaine: ${invoice.domain.name}`,
        serviceX + 3,
        serviceY,
        { maxWidth: contentWidth * 0.48 - 6 }
      );
      serviceY += serviceLineHeight;
    }

    // Price
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(18, 140, 126);
    const priceText = formatCurrency(invoice.amount).replace(/\s+/g, " ");
    doc.text(priceText, serviceX + 3, serviceY + 1);

    yPosition += 32;

    // Important credentials section
    if (invoice.service) {
      doc.setFillColor(255, 243, 205);
      doc.roundedRect(margin, yPosition, contentWidth, 32, 2, 2, "F");

      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(133, 100, 4);
      doc.text(
        "INFORMATIONS IMPORTANTES - A CONSERVER PRECIEUSEMENT",
        margin + 3,
        yPosition + 5
      );

      doc.setFontSize(7);
      doc.setFont("helvetica", "italic");
      doc.text(
        "Ces informations sont essentielles pour acceder a votre hebergement",
        margin + 3,
        yPosition + 9
      );

      // Vertical line decorator
      doc.setDrawColor(133, 100, 4);
      doc.setLineWidth(0.8);
      doc.line(margin + 3, yPosition + 12, margin + 3, yPosition + 29);

      // Credentials
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(44, 62, 80);

      const credY = yPosition + 14;
      const labelX = margin + 6;
      const valueX = margin + 45;

      // Panel URL
      doc.text("CONTROL PANEL URL:", labelX, credY);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(18, 140, 126);
      doc.setFontSize(7);
      doc.text(invoice.service.url || "N/A", valueX, credY);

      // Username
      doc.setFont("helvetica", "bold");
      doc.setTextColor(44, 62, 80);
      doc.setFontSize(8);
      doc.text("USERNAME:", labelX, credY + 5);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.text(invoice.service.username || "N/A", valueX, credY + 5);

      // Password
      doc.setFont("helvetica", "bold");
      doc.setTextColor(44, 62, 80);
      doc.setFontSize(8);
      doc.text("PASSWORD:", labelX, credY + 10);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.text(invoice.service.password || "N/A", valueX, credY + 10);

      // Server IP
      doc.setFont("helvetica", "bold");
      doc.setTextColor(44, 62, 80);
      doc.setFontSize(8);
      doc.text("SERVER IP:", labelX, credY + 15);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(18, 140, 126);
      doc.setFontSize(7);
      doc.text(invoice.service.serverIp || "N/A", valueX, credY + 15);

      yPosition += 37;
    } else {
      yPosition += 5;
    }

    // Thank you message
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(18, 140, 126);
    doc.text(
      "Merci d'avoir choisi KmerHosting !",
      pageWidth / 2,
      yPosition,
      { align: "center" }
    );

    yPosition += 5;

    // Footer
    doc.setDrawColor(18, 140, 126);
    doc.setLineWidth(0.5);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);

    yPosition += 4;

    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(18, 140, 126);
    doc.text("Billing Department Team", margin, yPosition);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(73, 80, 87);

    doc.text("billing@kmerhosting.com", margin, yPosition + 4);
    doc.text("+237 6 94 19 34 93", margin, yPosition + 8);

    doc.setFontSize(6.5);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(108, 117, 125);
    doc.text(
      "NKOABANG - Yaounde, Cameroon",
      pageWidth - margin,
      yPosition + 4,
      { align: "right" }
    );
    doc.text(
      "24/7 Support Available",
      pageWidth - margin,
      yPosition + 8,
      { align: "right" }
    );

    // Verification key removed - now displayed at the top of the invoice
    
    // Copyright
    doc.setFontSize(6.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(108, 117, 125);
    const currentYear = new Date().getFullYear();
    doc.text(
      `Copyright ${currentYear} KmerHosting - Shared Hosting • Reseller Hosting • VPS • Dedicated Servers`,
      pageWidth / 2,
      pageHeight - 3,
      { align: "center" }
    );

    // Generate PDF as buffer
    const pdfBuffer = Buffer.from(doc.output("arraybuffer"));

    // Return PDF with proper headers for download
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="KmerHosting_${invoice.invoiceNumber}.pdf"`,
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate PDF",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
