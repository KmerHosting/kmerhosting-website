// Cookie preferences types and utilities

export interface CookiePreferences {
  essential: boolean; // Always true
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export const DEFAULT_PREFERENCES: CookiePreferences = {
  essential: true,
  analytics: false,
  marketing: false,
  preferences: false,
};

const COOKIE_NAME = "kmerhosting_cookie_consent";
const COOKIE_EXPIRY_DAYS = 365;

export function getCookiePreferences(): CookiePreferences | null {
  if (typeof window === "undefined") return null;

  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(COOKIE_NAME + "="));

  if (!cookie) return null;

  try {
    const value = decodeURIComponent(cookie.split("=")[1]);
    return JSON.parse(value);
  } catch (error) {
    console.error("Error parsing cookie preferences:", error);
    return null;
  }
}

export function saveCookiePreferences(preferences: CookiePreferences): void {
  if (typeof window === "undefined") return;

  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + COOKIE_EXPIRY_DAYS);

  const cookieValue = encodeURIComponent(JSON.stringify(preferences));
  document.cookie = `${COOKIE_NAME}=${cookieValue};expires=${expiryDate.toUTCString()};path=/;SameSite=Lax`;

  // Load scripts based on preferences
  loadCookieScripts(preferences);
}

export function hasAcceptedCookies(): boolean {
  return getCookiePreferences() !== null;
}

function loadCookieScripts(preferences: CookiePreferences): void {
  if (typeof window === "undefined") return;

  // Analytics scripts (e.g., Google Analytics)
  if (preferences.analytics) {
    // Add your analytics script here
    console.log("Analytics cookies enabled");
  }

  // Marketing scripts
  if (preferences.marketing) {
    // Add your marketing scripts here
    console.log("Marketing cookies enabled");
  }

  // Preferences scripts
  if (preferences.preferences) {
    // Add your preferences scripts here
    console.log("Preference cookies enabled");
  }
}
