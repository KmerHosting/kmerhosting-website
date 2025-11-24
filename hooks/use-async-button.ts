"use client";

import { useState, useCallback } from "react";

interface UseAsyncButtonOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useAsyncButton(options?: UseAsyncButtonOptions) {
  const [isLoading, setIsLoading] = useState(false);

  const execute = useCallback(
    async (asyncFn: () => Promise<void>) => {
      try {
        setIsLoading(true);
        await asyncFn();
        options?.onSuccess?.();
      } catch (error) {
        options?.onError?.(error as Error);
      } finally {
        setIsLoading(false);
      }
    },
    [options]
  );

  return { isLoading, execute };
}
