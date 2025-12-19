"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/lib/cart-context";

export default function LayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ThemeProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </ThemeProvider>
  );
}


