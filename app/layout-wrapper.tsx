"use client";

import { Suspense, useState, useCallback, ReactNode } from "react";
import CookieBanner from "@/components/cookie-banner";
import { CookieProvider, useCookieBanner } from "@/lib/cookie-context";

function LayoutContent({ children }: { children: ReactNode }) {
  const { hideCookieBanner } = useCookieBanner();

  return (
    <>
      {children}
      <CookieBanner onClose={hideCookieBanner} />
    </>
  );
}

export default function LayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <CookieProvider>
      <Suspense fallback={
        <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-slate-300 dark:border-slate-700 border-t-teal-600 dark:border-t-teal-400 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-600 dark:text-slate-400">Loading...</p>
          </div>
        </div>
      }>
        <LayoutContent>{children}</LayoutContent>
      </Suspense>
    </CookieProvider>
  );
}


