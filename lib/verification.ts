/**
 * Generate a unique 8-character alphanumeric verification key
 * Uses lowercase letters and numbers for easy verification
 */
export function generateVerificationKey(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let key = "";
  for (let i = 0; i < 8; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return key;
}

/**
 * Format verification key for display (e.g., "AB12-CD34")
 */
export function formatVerificationKey(key: string): string {
  if (key.length !== 8) return key;
  return `${key.substring(0, 4).toUpperCase()}-${key.substring(4, 8).toUpperCase()}`;
}

/**
 * Generate a 5-digit PIN code (not hashed, plain text)
 */
export function generatePinCode(): string {
  return String(Math.floor(Math.random() * 100000)).padStart(5, "0");
}

/**
 * Hash a PIN code using SHA256
 * Returns the first 16 characters (standard format)
 */
export function hashPin(pin: string): string {
  const crypto = require("crypto");
  return crypto.createHash("sha256").update(pin).digest("hex").substring(0, 16);
}

/**
 * Generate a cryptographic signature for an invoice
 * This ensures the invoice is authentic and hasn't been tampered with
 * Only the server can generate this signature using the secret key
 * 
 * @param invoiceNumber - The invoice number
 * @param amount - The invoice amount
 * @param email - The customer email
 * @param verificationKey - The 8-character verification key
 * @param serverSecret - The server's secret key (from environment variable)
 * @returns A 16-character hex signature
 */
export function generateInvoiceSignature(
  invoiceNumber: string,
  amount: number,
  email: string,
  verificationKey: string,
  serverSecret: string
): string {
  const crypto = require("crypto");
  
  // Combine all invoice data with the server secret
  const data = `${invoiceNumber}|${amount}|${email}|${verificationKey}|${serverSecret}`;
  
  // Generate HMAC-SHA256 signature
  return crypto
    .createHmac("sha256", serverSecret)
    .update(data)
    .digest("hex")
    .substring(0, 16); // Return first 16 chars for display (like PIN hash)
}

/**
 * Verify an invoice signature
 * This confirms the invoice is genuine and hasn't been forged
 */
export function verifyInvoiceSignature(
  invoiceNumber: string,
  amount: number,
  email: string,
  verificationKey: string,
  providedSignature: string,
  serverSecret: string
): boolean {
  const expectedSignature = generateInvoiceSignature(
    invoiceNumber,
    amount,
    email,
    verificationKey,
    serverSecret
  );
  
  return expectedSignature.toLowerCase() === providedSignature.toLowerCase();
}
