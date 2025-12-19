"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";

export default function LayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}


