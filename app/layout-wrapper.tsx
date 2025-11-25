"use client";

import { useState, useCallback, ReactNode } from "react";
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
      <LayoutContent>{children}</LayoutContent>
    </CookieProvider>
  );
}


