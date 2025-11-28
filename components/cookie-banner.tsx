"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
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
  const [showModal, setShowModal] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(
    DEFAULT_PREFERENCES
  );

  useEffect(() => {
    if (showBannerFlag) {
      setShowBanner(true);
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
    setShowModal(false);
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

  const handleCloseBanner = () => {
    setShowBanner(false);
    hideCookieBanner();
    onClose?.();
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {/* Banner - Far Left with Clear Text and Legal Links */}
      <div className="fixed bottom-6 left-6 z-50 pointer-events-auto max-w-xs">
        <div className="bg-white dark:bg-slate-900 rounded-lg shadow-2xl p-4 border border-slate-200 dark:border-slate-700">
          <div className="mb-3">
            <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">
              Cookie Settings
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              We use cookies to enhance your experience and analyze site usage. By continuing to use our site, you agree to our use of cookies.
            </p>
            <div className="flex gap-2 mt-2 text-xs">
              <a href="/legal/privacy-policy" className="text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 underline">
                Privacy Policy
              </a>
              <span className="text-slate-400">•</span>
              <a href="/legal/cookies-policy" className="text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 underline">
                Cookie Policy
              </a>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleAcceptAll}
              className="text-xs px-3 py-1.5 h-auto flex-1"
              style={{ backgroundColor: "#128C7E", color: "white" }}
            >
              Accept All
            </Button>
            <Button
              onClick={() => {
                setPreferences(getCookiePreferences() || DEFAULT_PREFERENCES);
                setShowModal(true);
              }}
              variant="outline"
              className="text-xs px-3 py-1.5 h-auto flex-1"
            >
              Manage
            </Button>
          </div>
        </div>
      </div>

      {/* Preferences Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40 pointer-events-auto"
            onClick={handleCloseModal}
          />

          {/* Modal */}
          <div className="relative bg-white dark:bg-slate-900 rounded-lg shadow-2xl max-w-md w-full mx-4 pointer-events-auto overflow-hidden">
            <div className="max-h-[90vh] overflow-y-auto p-6">
          {/* Header */}
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                    Cookie Settings
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    We use cookies to enhance your experience and analyze site usage.
                  </p>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors flex-shrink-0 ml-4 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Cookie Types */}
              <div className="space-y-3 mb-6">
                {/* Essential Cookies */}
                <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="essential"
                      checked={true}
                      disabled
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor="essential"
                        className="text-sm font-semibold text-slate-900 dark:text-white cursor-default"
                      >
                        Essential Cookies
                      </Label>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Always enabled. Necessary for the website to function properly.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-3">
                  <div className="flex items-start gap-2">
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
                        Help us understand how you use our site to improve your experience.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-3">
                  <div className="flex items-start gap-2">
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
                        Track your activity and show you personalized ads and content.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Preference Cookies */}
                <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-3">
                  <div className="flex items-start gap-2">
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
                        Remember your preferences for a personalized experience.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Info Links */}
              <div className="flex flex-wrap gap-3 mb-4 text-xs text-slate-500 dark:text-slate-400">
                <a href="/legal/privacy-policy" className="hover:text-slate-700 dark:hover:text-slate-300 hover:underline">
                  Privacy Policy
                </a>
                <a href="/legal/cookies-policy" className="hover:text-slate-700 dark:hover:text-slate-300 hover:underline">
                  Cookie Policy
                </a>
              </div>

              {/* Buttons */}
              <div className="flex gap-2">
                <Button
                  onClick={handleCloseModal}
                  variant="outline"
                  className="flex-1 text-xs py-2 h-auto"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSavePreferences}
                  className="flex-1 text-xs py-2 h-auto"
                  style={{ backgroundColor: "#128C7E", color: "white" }}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
