"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { useCookieBanner } from "@/lib/cookie-context";
import {
  getCookiePreferences,
  saveCookiePreferences,
  hasAcceptedCookies,
  DEFAULT_PREFERENCES,
  type CookiePreferences,
} from "@/lib/cookie-utils";

interface CookieBannerProps {
  onClose?: () => void;
}

export default function CookieBanner({ onClose }: CookieBannerProps) {
  const { showBannerFlag, hideCookieBanner } = useCookieBanner();
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(
    DEFAULT_PREFERENCES
  );

  useEffect(() => {
    if (showBannerFlag) {
      setShowBanner(true);
      setShowPreferences(false);
      return;
    }

    // Check if user has already made a choice
    const hasAccepted = hasAcceptedCookies();
    if (!hasAccepted) {
      setShowBanner(true);
    }
  }, [showBannerFlag]);

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      essential: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    saveCookiePreferences(allAccepted);
    setShowBanner(false);
    hideCookieBanner();
    onClose?.();
  };

  const handleSavePreferences = () => {
    saveCookiePreferences(preferences);
    setShowBanner(false);
    setShowPreferences(false);
    hideCookieBanner();
    onClose?.();
  };

  const handleTogglePreference = (key: keyof CookiePreferences) => {
    if (key === "essential") return; // Essential can't be toggled
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!showBanner) return null;

  const handleRejectAll = () => {
    setShowBanner(false);
    hideCookieBanner();
    onClose?.();
  };

  const handleCloseBanner = () => {
    setShowBanner(false);
    hideCookieBanner();
    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 pointer-events-auto"
        onClick={handleCloseBanner}
      />

      {/* Banner */}
      <div className="relative bg-white dark:bg-slate-900 rounded-t-2xl shadow-2xl max-w-2xl w-full mx-4 pointer-events-auto overflow-hidden">
        <div className="max-h-[80vh] overflow-y-auto p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Cookie Settings
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                We use cookies to enhance your experience and analyze site usage.
              </p>
            </div>
            <button
              onClick={handleCloseBanner}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors flex-shrink-0 ml-4"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cookie Types */}
          <div className="space-y-4 mb-8">
            {/* Essential Cookies */}
            <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="essential"
                  checked={true}
                  disabled
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label
                    htmlFor="essential"
                    className="text-sm font-semibold text-slate-900 dark:text-white cursor-pointer"
                  >
                    Essential Cookies
                  </Label>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Always enabled. These cookies are necessary for the website to function properly and provide security.
                  </p>
                </div>
              </div>
            </div>

            {/* Expandable Preferences */}
            {!showPreferences && (
              <button
                onClick={() => setShowPreferences(true)}
                className="w-full flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <span className="text-sm font-semibold text-slate-900 dark:text-white">
                  Show more options
                </span>
                <ChevronDown className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </button>
            )}

            {/* Optional Cookies */}
            {showPreferences && (
              <>
                {/* Analytics Cookies */}
                <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="analytics"
                      checked={preferences.analytics}
                      onCheckedChange={() => handleTogglePreference("analytics")}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor="analytics"
                        className="text-sm font-semibold text-slate-900 dark:text-white cursor-pointer"
                      >
                        Analytics Cookies
                      </Label>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Help us understand how you use our site so we can improve your experience.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="marketing"
                      checked={preferences.marketing}
                      onCheckedChange={() => handleTogglePreference("marketing")}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor="marketing"
                        className="text-sm font-semibold text-slate-900 dark:text-white cursor-pointer"
                      >
                        Marketing Cookies
                      </Label>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Used to track your activity and show you personalized ads and content.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Preference Cookies */}
                <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="preferences"
                      checked={preferences.preferences}
                      onCheckedChange={() => handleTogglePreference("preferences")}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor="preferences"
                        className="text-sm font-semibold text-slate-900 dark:text-white cursor-pointer"
                      >
                        Preference Cookies
                      </Label>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Remember your preferences so you have a personalized experience next time.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hide button */}
                <button
                  onClick={() => setShowPreferences(false)}
                  className="w-full flex items-center justify-center p-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <ChevronUp className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                </button>
              </>
            )}
          </div>

          {/* Info Links */}
          <div className="flex flex-wrap gap-4 mb-6 text-xs text-slate-500 dark:text-slate-400">
            <a href="/legal/privacy-policy" className="hover:text-slate-700 dark:hover:text-slate-300 hover:underline">
              Privacy Policy
            </a>
            <a href="/legal/cookies-policy" className="hover:text-slate-700 dark:hover:text-slate-300 hover:underline">
              Cookie Policy
            </a>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleRejectAll}
              variant="outline"
              className="flex-1"
            >
              Reject All
            </Button>
            <Button
              onClick={() => setShowPreferences(true)}
              variant="outline"
              className="flex-1"
            >
              Manage Preferences
            </Button>
            <Button
              onClick={handleAcceptAll}
              className="flex-1"
              style={{ backgroundColor: "#128C7E", color: "white" }}
            >
              Accept All
            </Button>
          </div>

          {/* Save Preferences Button (shown only when preferences expanded) */}
          {showPreferences && (
            <Button
              onClick={handleSavePreferences}
              className="w-full mt-3"
              style={{ backgroundColor: "#128C7E", color: "white" }}
            >
              Save Preferences
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
