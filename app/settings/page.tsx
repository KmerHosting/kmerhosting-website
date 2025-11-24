"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import LoadingSpinner from "@/components/loading-spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Trash2, Loader2, Info } from "lucide-react";
import { toast } from "sonner";
import DeleteAccountModal from "@/components/delete-account-modal";

export default function SettingsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form state for editable fields
  const [formData, setFormData] = useState({
    phone: "",
    whatsapp: "",
    city: "",
    address: "",
    birthDate: "",
    companyName: "",
    jobTitle: "",
  });

  // Initialize form data when user data loads
  useEffect(() => {
    if (user) {
      setFormData({
        phone: user.phone || "",
        whatsapp: user.whatsapp || "",
        city: user.city || "",
        address: user.address || "",
        birthDate: user.birthDate ? new Date(user.birthDate).toISOString().split('T')[0] : "",
        companyName: user.companyName || "",
        jobTitle: user.jobTitle || "",
      });
    }
  }, [user]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    router.push("/auth/login");
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const response = await fetch("/api/auth/update-profile", {
        method: "POST",
        body: (() => {
          const formDataObj = new FormData();
          formDataObj.append("email", user.email);
          formDataObj.append("phone", formData.phone);
          formDataObj.append("whatsapp", formData.whatsapp);
          formDataObj.append("city", formData.city);
          formDataObj.append("address", formData.address);
          formDataObj.append("country", "Cameroon");
          formDataObj.append("birthDate", formData.birthDate);
          formDataObj.append("companyName", formData.companyName);
          formDataObj.append("jobTitle", formData.jobTitle);
          return formDataObj;
        })(),
      });

      if (!response.ok) {
        const error = await response.json();
        toast.error(error.error || "Failed to update profile");
        return;
      }

      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

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
                <CardDescription>View and manage your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Non-editable fields */}
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded border border-blue-200 dark:border-blue-900/50">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">To avoid fraud, some fields cannot be modified</p>
                      <p className="text-xs text-blue-800 dark:text-blue-200">
                        {" "} If you need to change these information, contact our support team at {" "}
                        <a href="mailto:support@kmerhosting.com" className="font-semibold hover:underline">
                          support@kmerhosting.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div>
                    <Label className="text-slate-600 dark:text-slate-400">Email</Label>
                    <Input
                      value={user.email}
                      disabled
                      className="mt-2 bg-slate-100 dark:bg-slate-800 cursor-not-allowed"
                    />
                  </div>

                  {/* Full Name */}
                  <div>
                    <Label className="text-slate-600 dark:text-slate-400">Full Name</Label>
                    <Input
                      value={user.fullName}
                      disabled
                      className="mt-2 bg-slate-100 dark:bg-slate-800 cursor-not-allowed"
                    />
                  </div>

                  {/* Birth Date */}
                  <div>
                    <Label className="text-slate-600 dark:text-slate-400">Birth Date</Label>
                    <Input
                      type="date"
                      value={formData.birthDate}
                      disabled={!!user.birthDate}
                      onChange={handleInputChange}
                      name="birthDate"
                      className="mt-2"
                    />
                    {user.birthDate && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Cannot be changed after setting</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <Label className="text-slate-600 dark:text-slate-400">Phone</Label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+237..."
                      className="mt-2"
                    />
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <Label className="text-slate-600 dark:text-slate-400">WhatsApp</Label>
                    <Input
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      placeholder="+237..."
                      className="mt-2"
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <Label className="text-slate-600 dark:text-slate-400">Country</Label>
                    <Input
                      type="text"
                      value="Cameroon"
                      disabled
                      className="mt-2 bg-slate-100 dark:bg-slate-800 cursor-not-allowed"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <Label className="text-slate-600 dark:text-slate-400">City</Label>
                    <Input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="mt-2"
                    />
                  </div>

                  {/* Job Title */}
                  <div>
                    <Label className="text-slate-600 dark:text-slate-400">Job Title</Label>
                    <Input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                      className="mt-2"
                    />
                  </div>

                  {/* Company Name */}
                  <div>
                    <Label className="text-slate-600 dark:text-slate-400">Company Name</Label>
                    <Input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="mt-2"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <Label className="text-slate-600 dark:text-slate-400">Address</Label>
                  <Textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Street address"
                    className="mt-2"
                    rows={3}
                  />
                </div>

                {/* Save Button */}
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full cursor-pointer bg-[#128C7E] hover:bg-[#0f7469] h-11"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
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
