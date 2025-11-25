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
import { AlertCircle, Trash2, Loader2, Info, Copy, Check, Shield } from "lucide-react";
import { toast } from "sonner";
import DeleteAccountModal from "@/components/delete-account-modal";

export default function SettingsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [apiKeys, setApiKeys] = useState<any[]>([]);
  const [loadingKeys, setLoadingKeys] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [showNewKeyModal, setShowNewKeyModal] = useState(false);

  // Form state for editable fields
  const [formData, setFormData] = useState({
    phone: "",
    whatsapp: "",
    city: "",
    address: "",
    birthDate: "",
    companyName: "",
    jobTitle: "",
    // New fields
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    username: "",
    newsletter: true,
    isProfilePublic: false,
    twoFactorEnabled: false,
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
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
        username: user.username || "",
        newsletter: user.newsletter ?? true,
        isProfilePublic: user.isProfilePublic ?? false,
        twoFactorEnabled: user.twoFactorEnabled ?? false,
      });
    }
  }, [user]);

  // Fetch API keys when user loads
  useEffect(() => {
    if (user) {
      fetchApiKeys();
    }
  }, [user]);

  const fetchApiKeys = async () => {
    try {
      setLoadingKeys(true);
      const response = await fetch("/api/auth/api-keys", {
        method: "GET",
        credentials: "include",
      });
      
      if (response.ok) {
        const data = await response.json();
        setApiKeys(data.apiKeys || []);
      }
    } catch (error) {
      console.error("Error fetching API keys:", error);
      toast.error("Failed to load API keys");
    } finally {
      setLoadingKeys(false);
    }
  };

  const handleGenerateApiKey = async () => {
    if (!newKeyName.trim()) {
      toast.error("Please enter a name for the API key");
      return;
    }

    try {
      setIsSaving(true);
      const response = await fetch("/api/auth/api-keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name: newKeyName }),
      });

      if (!response.ok) {
        const error = await response.json();
        toast.error(error.error || "Failed to generate API key");
        return;
      }

      const data = await response.json();
      toast.success(data.message);
      setNewKeyName("");
      setShowNewKeyModal(false);
      await fetchApiKeys();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to generate API key");
    } finally {
      setIsSaving(false);
    }
  };

  const handleRevokeApiKey = async (keyId: string) => {
    if (!confirm("Are you sure you want to revoke this API key?")) {
      return;
    }

    try {
      setIsSaving(true);
      const response = await fetch(`/api/auth/api-keys/${keyId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        toast.error(error.error || "Failed to revoke API key");
        return;
      }

      toast.success("API key revoked successfully");
      await fetchApiKeys();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to revoke API key");
    } finally {
      setIsSaving(false);
    }
  };

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

  const handleSettingsUpdate = async (action: string) => {
    try {
      setIsSaving(true);
      const response = await fetch("/api/auth/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          ...(action === "changePassword" && {
            oldPassword: formData.oldPassword,
            newPassword: formData.newPassword,
          }),
          ...(action === "updateNewsletter" && {
            newsletter: formData.newsletter,
          }),
          ...(action === "updateUsername" && {
            username: formData.username,
          }),
          ...(action === "updateProfileVisibility" && {
            isProfilePublic: formData.isProfilePublic,
          }),
          ...(action === "toggle2FA" && {
            twoFactorEnabled: formData.twoFactorEnabled,
          }),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        toast.error(error.error || "Failed to update settings");
        return;
      }

      if (action === "changePassword") {
        setFormData(prev => ({ ...prev, oldPassword: "", newPassword: "", confirmPassword: "" }));
      }

      toast.success("Settings updated successfully");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to update settings");
    } finally {
      setIsSaving(false);
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
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
          <TabsList className="grid w-full max-w-3xl grid-cols-5">
            <TabsTrigger value="account">Account Info</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="credentials">Keys & Credentials</TabsTrigger>
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

                {/* Profile Picture Upload */}
                <div>
                  <Label>Profile Picture</Label>
                  <div className="mt-2 flex items-center gap-4">
                    {user?.profilePicture ? (
                      <img
                        src={user.profilePicture}
                        alt="Profile"
                        className="w-20 h-20 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                        <span className="text-slate-500">No photo</span>
                      </div>
                    )}
                    <div>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;

                          // Validate file size (max 5MB)
                          if (file.size > 5 * 1024 * 1024) {
                            toast.error("File size must be less than 5MB");
                            return;
                          }

                          // Validate file type
                          if (!file.type.startsWith("image/")) {
                            toast.error("Please upload an image file");
                            return;
                          }

                          try {
                            setIsSaving(true);
                            const formData = new FormData();
                            formData.append("file", file);

                            const response = await fetch("/api/auth/upload-profile-picture", {
                              method: "POST",
                              credentials: "include",
                              body: formData,
                            });

                            if (!response.ok) {
                              const error = await response.json();
                              toast.error(error.error || "Failed to upload profile picture");
                              return;
                            }

                            const data = await response.json();
                            // Update user profile picture in context
                            window.location.reload(); // Refresh to update user context
                            toast.success("Profile picture updated successfully");
                          } catch (error) {
                            console.error("Error:", error);
                            toast.error("Failed to upload profile picture");
                          } finally {
                            setIsSaving(false);
                          }
                        }}
                        disabled={isSaving}
                        className="cursor-pointer"
                      />
                      <p className="text-xs text-slate-500 mt-1">JPG, PNG or GIF (max 5MB)</p>
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

          {/* Security Tab */}
          <TabsContent value="security">
            <div className="space-y-6">
              {/* Change Password */}
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>Update your password regularly to keep your account secure</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Current Password</Label>
                    <Input
                      type="password"
                      name="oldPassword"
                      value={formData.oldPassword}
                      onChange={handleInputChange}
                      placeholder="Enter your current password"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>New Password</Label>
                    <Input
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      placeholder="Enter a new password (min. 8 characters)"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>Confirm Password</Label>
                    <Input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm new password"
                      className="mt-2"
                    />
                  </div>
                  <Button
                    onClick={() => {
                      if (formData.newPassword !== formData.confirmPassword) {
                        toast.error("Passwords do not match");
                        return;
                      }
                      handleSettingsUpdate("changePassword");
                    }}
                    disabled={isSaving || !formData.oldPassword || !formData.newPassword}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                    Update Password
                  </Button>
                </CardContent>
              </Card>

              {/* 2FA */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Two-Factor Authentication
                  </CardTitle>
                  <CardDescription>Add an extra layer of security to your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded border border-yellow-200 dark:border-yellow-900/50 mb-4">
                    <p className="text-sm text-yellow-900 dark:text-yellow-100">
                      ⚠️ Two-factor authentication is currently <strong>{formData.twoFactorEnabled ? "ENABLED" : "DISABLED"}</strong>
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      const newValue = !formData.twoFactorEnabled;
                      setFormData(prev => ({ ...prev, twoFactorEnabled: newValue }));
                      // Send the new value to the API
                      setIsSaving(true);
                      fetch("/api/auth/settings", {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          action: "toggle2FA",
                          twoFactorEnabled: newValue,
                        }),
                      })
                        .then(async res => {
                          if (!res.ok) {
                            const error = await res.json();
                            toast.error(error.error || "Failed to update 2FA");
                            setFormData(prev => ({ ...prev, twoFactorEnabled: !newValue }));
                          } else {
                            toast.success(newValue ? "2FA enabled successfully" : "2FA disabled successfully");
                          }
                        })
                        .catch(error => {
                          console.error("Error:", error);
                          toast.error("Failed to update 2FA");
                          setFormData(prev => ({ ...prev, twoFactorEnabled: !newValue }));
                        })
                        .finally(() => setIsSaving(false));
                    }}
                    disabled={isSaving}
                    className={formData.twoFactorEnabled ? "w-full bg-red-600 hover:bg-red-700" : "w-full bg-green-600 hover:bg-green-700"}
                  >
                    {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                    {formData.twoFactorEnabled ? "Disable 2FA" : "Enable 2FA"}
                  </Button>
                </CardContent>
              </Card>

              {/* Referral Code */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Referral Code</CardTitle>
                  <CardDescription>Share this code with friends to earn rewards</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Input
                      value={user.referralCode || "N/A"}
                      disabled
                      className="bg-slate-100 dark:bg-slate-800"
                    />
                    <Button
                      onClick={() => copyToClipboard(user.referralCode || "", "referralCode")}
                      variant="outline"
                      size="sm"
                    >
                      {copiedField === "referralCode" ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences">
            <div className="space-y-6">
              {/* Username */}
              <Card>
                <CardHeader>
                  <CardTitle>Chat Username</CardTitle>
                  <CardDescription>Set a username for the KmerHosting Chat Room</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Username (3-20 characters, letters/numbers/underscore only)</Label>
                    <Input
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder="my_username"
                      className="mt-2"
                    />
                  </div>
                  <Button
                    onClick={() => handleSettingsUpdate("updateUsername")}
                    disabled={isSaving || !formData.username}
                    className="w-full"
                  >
                    {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                    Save Username
                  </Button>
                </CardContent>
              </Card>

              {/* Profile Visibility */}
              <Card>
                <CardHeader>
                  <CardTitle>Profile Visibility</CardTitle>
                  <CardDescription>Make your profile public to access chat and multiplayer features</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-900/50">
                      <div>
                        <p className="font-semibold text-blue-900 dark:text-blue-100">Make Profile Public</p>
                        <p className="text-sm text-blue-800 dark:text-blue-200">Unlock chat and multiplayer features</p>
                      </div>
                      <Button
                        onClick={() => {
                          const newValue = !formData.isProfilePublic;
                          setFormData(prev => ({ ...prev, isProfilePublic: newValue }));
                          // Send the new value to the API
                          setIsSaving(true);
                          fetch("/api/auth/settings", {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              action: "updateProfileVisibility",
                              isProfilePublic: newValue,
                            }),
                          })
                            .then(async res => {
                              if (!res.ok) {
                                const error = await res.json();
                                toast.error(error.error || "Failed to update profile visibility");
                                setFormData(prev => ({ ...prev, isProfilePublic: !newValue }));
                              } else {
                                toast.success(newValue ? "Profile is now public" : "Profile is now private");
                              }
                            })
                            .catch(error => {
                              console.error("Error:", error);
                              toast.error("Failed to update profile visibility");
                              setFormData(prev => ({ ...prev, isProfilePublic: !newValue }));
                            })
                            .finally(() => setIsSaving(false));
                        }}
                        disabled={isSaving}
                        variant={formData.isProfilePublic ? "default" : "outline"}
                        className={formData.isProfilePublic ? "bg-green-600 hover:bg-green-700" : ""}
                      >
                        {formData.isProfilePublic ? "✓ Public" : "Make Public"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter */}
              <Card>
                <CardHeader>
                  <CardTitle>Newsletter</CardTitle>
                  <CardDescription>Stay updated with our latest news and offers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-900/50">
                      <div>
                        <p className="font-semibold text-purple-900 dark:text-purple-100">Email Newsletter</p>
                        <p className="text-sm text-purple-800 dark:text-purple-200">Receive updates about new services and promotions</p>
                      </div>
                      <Button
                        onClick={() => {
                          const newValue = !formData.newsletter;
                          setFormData(prev => ({ ...prev, newsletter: newValue }));
                          // Send the new value to the API
                          setIsSaving(true);
                          fetch("/api/auth/settings", {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              action: "updateNewsletter",
                              newsletter: newValue,
                            }),
                          })
                            .then(async res => {
                              if (!res.ok) {
                                const error = await res.json();
                                toast.error(error.error || "Failed to update newsletter preference");
                                setFormData(prev => ({ ...prev, newsletter: !newValue }));
                              } else {
                                toast.success(newValue ? "You are now subscribed" : "You have unsubscribed");
                              }
                            })
                            .catch(error => {
                              console.error("Error:", error);
                              toast.error("Failed to update newsletter preference");
                              setFormData(prev => ({ ...prev, newsletter: !newValue }));
                            })
                            .finally(() => setIsSaving(false));
                        }}
                        disabled={isSaving}
                        variant={formData.newsletter ? "default" : "outline"}
                        className={formData.newsletter ? "bg-purple-600 hover:bg-purple-700" : ""}
                      >
                        {formData.newsletter ? "✓ Subscribed" : "Subscribe"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Keys and Credentials Tab */}
          <TabsContent value="credentials">
            <div className="space-y-6">
              {/* PIN Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Your PIN Code
                  </CardTitle>
                  <CardDescription>This 5-digit code is used for invoice verification</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Input
                      value={user?.pinCode ? "●●●●●" : "Not set"}
                      disabled
                      className="bg-slate-100 dark:bg-slate-800 font-mono"
                    />
                    <Button
                      onClick={() => {
                        if (user?.pinCode) {
                          copyToClipboard(user.pinCode, "pin");
                        }
                      }}
                      variant="outline"
                      size="sm"
                      disabled={!user?.pinCode}
                    >
                      {copiedField === "pin" ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* API Keys Card */}
              <Card>
                <CardHeader>
                  <CardTitle>API Keys</CardTitle>
                  <CardDescription>Manage your API keys for programmatic access ({apiKeys.length}/20)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {loadingKeys ? (
                    <div className="text-center py-4">
                      <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                      <p className="text-sm text-slate-500 mt-2">Loading API keys...</p>
                    </div>
                  ) : apiKeys.length === 0 ? (
                    <div className="text-center py-8 text-slate-500">
                      <p>No API keys yet. Create one to get started.</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {apiKeys.map((key) => (
                        <div key={key.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700">
                          <div className="flex-1">
                            <p className="font-medium text-sm">{key.name}</p>
                            <p className="text-xs text-slate-500">
                              {key.keyPrefix}...*** • Created {new Date(key.createdAt).toLocaleDateString()}
                              {key.lastUsedAt && ` • Last used ${new Date(key.lastUsedAt).toLocaleDateString()}`}
                            </p>
                          </div>
                          <Button
                            onClick={() => handleRevokeApiKey(key.id)}
                            disabled={isSaving}
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  {apiKeys.length < 20 && (
                    <Button
                      onClick={() => setShowNewKeyModal(true)}
                      disabled={isSaving}
                      className="w-full bg-blue-600 hover:bg-blue-700 mt-4"
                    >
                      + Generate New API Key
                    </Button>
                  )}

                  {showNewKeyModal && (
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-900/50 space-y-3">
                      <div>
                        <Label>API Key Name</Label>
                        <Input
                          value={newKeyName}
                          onChange={(e) => setNewKeyName(e.target.value)}
                          placeholder="e.g., My App, Production Server"
                          className="mt-2"
                        />
                        <p className="text-xs text-slate-500 mt-1">3-50 characters to identify this key</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={handleGenerateApiKey}
                          disabled={isSaving || !newKeyName.trim()}
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
                        >
                          {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                          Generate
                        </Button>
                        <Button
                          onClick={() => {
                            setShowNewKeyModal(false);
                            setNewKeyName("");
                          }}
                          disabled={isSaving}
                          variant="outline"
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

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
