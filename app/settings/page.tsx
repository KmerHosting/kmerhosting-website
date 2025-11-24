"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import LoadingSpinner from "@/components/loading-spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import DeleteAccountModal from "@/components/delete-account-modal";

export default function SettingsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    router.push("/auth/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">Settings</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Manage your account and preferences</p>
        </div>

        <Tabs defaultValue="account" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="account">Account Info</TabsTrigger>
            <TabsTrigger value="danger">Danger Zone</TabsTrigger>
          </TabsList>

          {/* Account Info Tab */}
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>View your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-slate-600 dark:text-slate-400">Full Name</Label>
                    <p className="mt-2 font-semibold text-slate-900 dark:text-slate-100">
                      {user.fullName}
                    </p>
                  </div>
                  <div>
                    <Label className="text-slate-600 dark:text-slate-400">Email</Label>
                    <p className="mt-2 font-semibold text-slate-900 dark:text-slate-100">
                      {user.email}
                    </p>
                  </div>
                  <div>
                    <Label className="text-slate-600 dark:text-slate-400">Profile Status</Label>
                    <p className="mt-2 font-semibold">
                      {user.isProfileComplete ? (
                        <span className="text-green-600 dark:text-green-400">Complete ✓</span>
                      ) : (
                        <span className="text-amber-600 dark:text-amber-400">Incomplete</span>
                      )}
                    </p>
                  </div>
                  <div>
                    <Label className="text-slate-600 dark:text-slate-400">Account Created</Label>
                    <p className="mt-2 font-semibold text-slate-900 dark:text-slate-100">
                      {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <Button asChild>
                  <a href="/dashboard" className="w-full cursor-pointer">
                    Edit Profile
                  </a>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Danger Zone Tab */}
          <TabsContent value="danger">
            <Card className="border-red-200 dark:border-red-900/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
                  <AlertCircle className="w-5 h-5" />
                  Danger Zone
                </CardTitle>
                <CardDescription>Irreversible actions that will affect your account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-lg">
                    <h3 className="font-semibold text-red-900 dark:text-red-100 mb-2">Delete Account</h3>
                    <p className="text-sm text-red-800 dark:text-red-200 mb-4">
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                    <Button
                      onClick={() => setIsDeleteModalOpen(true)}
                      variant="destructive"
                      className="w-full cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete My Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Delete Account Modal */}
      <DeleteAccountModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        userEmail={user.email}
        userFullName={user.fullName}
      />
    </div>
  );
}
