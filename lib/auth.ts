import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import prisma from "./prisma";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key"
);

export interface JWTPayload {
  userId: string;
  email: string;
  fullName: string;
  isProfileComplete?: boolean;
  iat: number;
  exp: number;
}

export async function generateJWT(
  userId: string,
  email: string,
  fullName: string
): Promise<string> {
  const token = await new SignJWT({
    userId,
    email,
    fullName,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);

  return token;
}

export async function verifyJWT(token: string): Promise<JWTPayload | null> {
  try {
    const verified = await jwtVerify(token, JWT_SECRET);
    return {
      userId: verified.payload.userId as string,
      email: verified.payload.email as string,
      fullName: verified.payload.fullName as string,
      isProfileComplete: (verified.payload.isProfileComplete as boolean) || false,
      iat: verified.payload.iat as number,
      exp: verified.payload.exp as number,
    };
  } catch (err) {
    return null;
  }
}

export function getAuthCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: "/",
  };
}

export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set("auth_token", token, getAuthCookieOptions());
}

export async function removeAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
}

export async function getAuthCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get("auth_token")?.value;
}

export async function getCurrentUser(): Promise<JWTPayload | null> {
  try {
    const token = await getAuthCookie();
    if (!token) {
      console.log("No token found in cookies");
      return null;
    }

    const payload = await verifyJWT(token);
    if (!payload) {
      console.log("Token verification failed");
      return null;
    }

    // Fetch updated user info from database to get isProfileComplete
    const user = await prisma.user.findUnique({
      where: { email: payload.email },
      select: {
        id: true,
        email: true,
        fullName: true,
        isProfileComplete: true,
      },
    });

    if (!user) {
      console.log("User not found in database for email:", payload.email);
      return null;
    }

    return {
      userId: user.id,
      email: user.email,
      fullName: user.fullName,
      isProfileComplete: user.isProfileComplete,
      iat: payload.iat,
      exp: payload.exp,
    };
  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    return null;
  }
}

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function getOTPExpiration(): Date {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 15); // OTP valid for 15 minutes
  return now;
}

// Generate referral code: 8 characters (uppercase letters and numbers)
export function generateReferralCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Password hashing functions
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
