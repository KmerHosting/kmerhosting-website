"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface User {
  userId: string;
  email: string;
  fullName: string;
  isProfileComplete?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      console.log("Auth context: Fetching user from /api/auth/me");
      const response = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include", // Important: include credentials to send cookies
      });
      console.log("Auth context: /api/auth/me response status:", response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log("Auth context: User data received:", data);
        setUser(data.user);
      } else {
        console.log("Auth context: /api/auth/me returned non-ok status:", response.status);
        const errorText = await response.text();
        console.log("Auth context: Error response:", errorText);
        setUser(null);
      }
    } catch (error) {
      console.error("Auth context: Failed to fetch user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Auth context: useEffect mounted, fetching user after a small delay");
    // Add a small delay to allow cookies to be set from previous requests
    const timer = setTimeout(() => {
      fetchUser();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const refreshUser = async () => {
    await fetchUser();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
