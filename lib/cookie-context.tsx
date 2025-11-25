"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface CookieContextType {
  showBannerFlag: boolean;
  showCookieBanner: () => void;
  hideCookieBanner: () => void;
}

const CookieContext = createContext<CookieContextType | undefined>(undefined);

export function CookieProvider({ children }: { children: ReactNode }) {
  const [showBannerFlag, setShowBannerFlag] = useState(false);

  const showCookieBanner = useCallback(() => {
    setShowBannerFlag(true);
  }, []);

  const hideCookieBanner = useCallback(() => {
    setShowBannerFlag(false);
  }, []);

  return (
    <CookieContext.Provider
      value={{
        showBannerFlag,
        showCookieBanner,
        hideCookieBanner,
      }}
    >
      {children}
    </CookieContext.Provider>
  );
}

export function useCookieBanner() {
  const context = useContext(CookieContext);
  if (context === undefined) {
    throw new Error("useCookieBanner must be used within CookieProvider");
  }
  return context;
}

