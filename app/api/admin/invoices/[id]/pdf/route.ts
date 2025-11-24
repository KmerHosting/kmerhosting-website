import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import prisma from "@/lib/prisma";
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

// GET invoice PDF HTML
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
      },
    });

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    // Format currency
    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "XAF",
      }).format(amount);
    };

    // Format date
    const formatDate = (date: Date) => {
      return new Intl.DateTimeFormat("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date);
    };

    const htmlContent = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
        color: #333;
        background: #f5f5f5;
      }
      .container {
        max-width: 900px;
        margin: 0 auto;
        background: white;
        padding: 40px;
      }
      .header {
        display: flex;
        justify-content: space-between;
        align-items: start;
        margin-bottom: 40px;
        padding-bottom: 20px;
        border-bottom: 2px solid #128C7E;
      }
      .logo-section h1 {
        color: #128C7E;
        font-size: 28px;
        font-weight: bold;
      }
      .invoice-info {
        text-align: right;
      }
      .invoice-info p {
        margin: 5px 0;
        font-size: 14px;
      }
      .invoice-number {
        font-size: 18px;
        font-weight: bold;
        color: #128C7E;
      }
      .section {
        margin-bottom: 30px;
      }
      .section-title {
        font-size: 12px;
        font-weight: bold;
        color: #128C7E;
        text-transform: uppercase;
        margin-bottom: 10px;
        letter-spacing: 1px;
      }
      .section-content {
        font-size: 14px;
        line-height: 1.8;
      }
      .row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
      }
      .col {
        flex: 1;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
      }
      th {
        background: #f0f0f0;
        padding: 12px;
        text-align: left;
        font-size: 12px;
        font-weight: bold;
        border-bottom: 2px solid #128C7E;
        color: #128C7E;
      }
      td {
        padding: 12px;
        border-bottom: 1px solid #ddd;
        font-size: 14px;
      }
      .text-right {
        text-align: right;
      }
      .summary {
        margin: 30px 0;
        padding: 20px;
        background: #f9fafb;
        border-left: 4px solid #128C7E;
      }
      .summary-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        font-size: 14px;
      }
      .summary-row.total {
        font-size: 18px;
        font-weight: bold;
        color: #128C7E;
        border-top: 2px solid #ddd;
        padding-top: 10px;
        margin-top: 10px;
      }
      .status {
        display: inline-block;
        padding: 6px 12px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: bold;
        text-transform: uppercase;
      }
      .status.pending {
        background: #fef3c7;
        color: #92400e;
      }
      .status.paid {
        background: #d1fae5;
        color: #065f46;
      }
      .footer {
        margin-top: 50px;
        padding-top: 20px;
        border-top: 1px solid #ddd;
        font-size: 12px;
        color: #666;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <!-- Header -->
      <div class="header">
        <div class="logo-section">
          <h1>KmerHosting</h1>
          <p style="font-size: 12px; color: #666;">Professional Web Hosting Services</p>
        </div>
        <div class="invoice-info">
          <p class="invoice-number">${invoice.invoiceNumber}</p>
          <p><strong>Invoice Date:</strong> ${formatDate(invoice.createdAt)}</p>
          <p><strong>Due Date:</strong> ${formatDate(invoice.dueDate)}</p>
          <p style="margin-top: 10px;">
            <span class="status ${invoice.status}">${invoice.status.toUpperCase()}</span>
          </p>
        </div>
      </div>

      <!-- Client & Company Info -->
      <div class="row">
        <div class="col">
          <div class="section">
            <div class="section-title">Bill To</div>
            <div class="section-content">
              <p><strong>${invoice.user.fullName || invoice.user.email}</strong></p>
              <p>${invoice.user.email}</p>
              <p>${invoice.user.phone || "Phone not provided"}</p>
              <p>${invoice.user.city || ""} ${invoice.user.country || ""}</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="section">
            <div class="section-title">From</div>
            <div class="section-content">
              <p><strong>KmerHosting</strong></p>
              <p>admin@kmerhosting.com</p>
              <p>Web Hosting Services</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Services Table -->
      <table>
        <thead>
          <tr>
            <th>Service Description</th>
            <th class="text-right">Unit Price</th>
            <th class="text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>${invoice.service.name}</strong>
              <br>
              <small style="color: #666;">${
                (() => {
                  try {
                    const features = JSON.parse(invoice.service.features);
                    return Array.isArray(features) ? features.join(", ") : "Standard hosting package";
                  } catch {
                    return invoice.service.features || "Standard hosting package";
                  }
                })()
              }</small>
            </td>
            <td class="text-right">${formatCurrency(invoice.service.price)}</td>
            <td class="text-right">${formatCurrency(invoice.amount)}</td>
          </tr>
        </tbody>
      </table>

      <!-- Summary -->
      <div class="summary">
        <div class="summary-row">
          <span>Subtotal:</span>
          <span>${formatCurrency(invoice.amount)}</span>
        </div>
        <div class="summary-row">
          <span>Taxes:</span>
          <span>$0.00</span>
        </div>
        <div class="summary-row total">
          <span>Total Due:</span>
          <span>${formatCurrency(invoice.amount)}</span>
        </div>
      </div>

      <!-- Payment Instructions -->
      <div class="section">
        <div class="section-title">Payment Instructions</div>
        <div class="section-content">
          <p>Please pay the invoice within 30 days from the invoice date. You can pay through:</p>
          <ul style="margin-left: 20px; margin-top: 10px;">
            <li>Bank Transfer</li>
            <li>Credit Card</li>
            <li>Mobile Money</li>
          </ul>
        </div>
      </div>

      <!-- Footer -->
      <div class="footer">
        <p>Thank you for your business! | KmerHosting © ${new Date().getFullYear()} All Rights Reserved</p>
        <p>Questions about this invoice? Contact admin@kmerhosting.com</p>
      </div>
    </div>
  </body>
</html>
    `;

    return NextResponse.json(
      { 
        html: htmlContent,
        invoice: {
          invoiceNumber: invoice.invoiceNumber,
          clientName: invoice.user.fullName || invoice.user.email,
          amount: invoice.amount,
          status: invoice.status,
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get invoice PDF error:", error);
    return NextResponse.json(
      { error: "Failed to generate invoice PDF" },
      { status: 500 }
    );
  }
}
