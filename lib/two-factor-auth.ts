import crypto from "crypto"

/**
 * Generate a 6-digit OTP
 */
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

/**
 * Generate OTP expiry time (10 minutes from now)
 */
export function getOTPExpiry(): Date {
  const expiry = new Date()
  expiry.setMinutes(expiry.getMinutes() + 10)
  return expiry
}

/**
 * Check if OTP is expired
 */
export function isOTPExpired(expiryTime: Date): boolean {
  return new Date() > expiryTime
}

/**
 * Generate a temporary session token for OTP verification
 */
export function generateOTPSessionToken(userId: string): string {
  return crypto
    .randomBytes(32)
    .toString("hex")
}

/**
 * Hash OTP for secure storage
 */
export function hashOTP(otp: string): string {
  return crypto
    .createHash("sha256")
    .update(otp)
    .digest("hex")
}

/**
 * Verify OTP matches the hash
 */
export function verifyOTP(otp: string, hashedOTP: string): boolean {
  return hashOTP(otp) === hashedOTP
}
