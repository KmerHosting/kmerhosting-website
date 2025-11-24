"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertCircle, Lock, Loader2, Upload, X, Shield, Mail, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { CAMEROON_CITIES_WITH_AREAS } from "@/lib/cameroon-data";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

const profileSchema = z.object({
  phone: z.string().min(1, "Phone number is required"),
  whatsapp: z.string().min(1, "WhatsApp number is required"),
  city: z.string().min(1, "Current city is required"),
  address: z.string().min(1, "Address is required"),
  country: z.string().min(1, "Country is required"),
  birthDate: z.string().optional().or(z.literal("")),
  companyName: z.string().optional().or(z.literal("")),
  jobTitle: z.string().optional().or(z.literal("")),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileCompletionModalProps {
  open: boolean;
  email: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ProfileCompletionModal({ open, email, onClose, onSuccess }: ProfileCompletionModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [customAddress, setCustomAddress] = useState<string>("");
  const [newsletter, setNewsletter] = useState(true); // Default to true
  const [termsAccepted, setTermsAccepted] = useState(false);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      phone: "",
      whatsapp: "",
      city: "",
      address: "",
      country: "Cameroon",
      birthDate: "",
      companyName: "",
      jobTitle: "",
    },
  });

  const cityAreas = selectedCity ? CAMEROON_CITIES_WITH_AREAS[selectedCity] || [] : [];
  const selectedAddressValue = form.watch("address");
  const showCustomAddressInput = selectedAddressValue === "Other";

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be less than 5MB");
        return;
      }

      setProfilePicture(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfilePicture = () => {
    setProfilePicture(null);
    setPreviewUrl(null);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const city = e.target.value;
    setSelectedCity(city);
    form.setValue("city", city);
    form.setValue("address", ""); // Reset address when city changes
  };

  const onSubmit = async (data: ProfileFormData) => {
    try {
      // If custom address is selected, use it instead
      const finalAddress = showCustomAddressInput ? customAddress : data.address;
      
      if (!finalAddress) {
        toast.error("Please enter an address");
        return;
      }

      setIsLoading(true);

      const formData = new FormData();
      formData.append("email", email);
      formData.append("phone", data.phone);
      formData.append("whatsapp", data.whatsapp);
      formData.append("city", data.city);
      formData.append("address", finalAddress);
      formData.append("country", data.country);
      formData.append("birthDate", data.birthDate || "");
      formData.append("companyName", data.companyName || "");
      formData.append("jobTitle", data.jobTitle || "");
      formData.append("newsletter", newsletter.toString());

      if (profilePicture) {
        formData.append("profilePicture", profilePicture);
      }

      const response = await fetch("/api/auth/update-profile", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || "Failed to update profile");
        return;
      }

      toast.success("Profile completed successfully!");
      form.reset();
      removeProfilePicture();
      setSelectedCity("");
      setCustomAddress("");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Complete Your Profile</DialogTitle>
          <DialogDescription>
            Help us create accurate invoices and improve your experience
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Profile Picture Section */}
          <div className="space-y-2">
            <Label>Profile Picture (Optional)</Label>
            <div className="flex items-center gap-4">
              {previewUrl ? (
                <div className="relative">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-24 h-24 rounded-full object-cover border-2 border-slate-300"
                  />
                  <button
                    type="button"
                    onClick={removeProfilePicture}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="w-24 h-24 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center bg-slate-50 cursor-pointer hover:border-[#128C7E] hover:bg-slate-100 transition-all">
                  <Upload className="w-6 h-6 text-slate-400" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    className="hidden"
                    disabled={isLoading}
                  />
                </label>
              )}
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900 dark:text-white mb-2">Click the circle to upload</p>
                <p className="text-xs text-slate-500 mt-2">JPG, PNG or GIF (max 5MB)</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900 dark:text-white">Contact Information</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  placeholder="+237 6XX XXX XXX"
                  {...form.register("phone")}
                  disabled={isLoading}
                />
                {form.formState.errors.phone && (
                  <p className="text-sm text-red-500 mt-1">{form.formState.errors.phone.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="whatsapp">WhatsApp Number *</Label>
                <Input
                  id="whatsapp"
                  placeholder="+237 6XX XXX XXX"
                  {...form.register("whatsapp")}
                  disabled={isLoading}
                />
                {form.formState.errors.whatsapp && (
                  <p className="text-sm text-red-500 mt-1">{form.formState.errors.whatsapp.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">Current City *</Label>
                <select
                  id="city"
                  value={selectedCity}
                  onChange={handleCityChange}
                  disabled={isLoading}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#128C7E]"
                >
                  <option value="">Select a city...</option>
                  {Object.keys(CAMEROON_CITIES_WITH_AREAS).map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                {form.formState.errors.city && (
                  <p className="text-sm text-red-500 mt-1">{form.formState.errors.city.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value="Cameroon"
                  disabled
                  className="bg-slate-100 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Address Selection */}
            {selectedCity && (
              <div>
                <Label htmlFor="address">Address / Neighborhood *</Label>
                <select
                  id="address"
                  value={form.watch("address")}
                  onChange={(e) => form.setValue("address", e.target.value)}
                  disabled={isLoading}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#128C7E]"
                >
                  <option value="">Select address...</option>
                  {cityAreas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
                {form.formState.errors.address && (
                  <p className="text-sm text-red-500 mt-1">{form.formState.errors.address.message}</p>
                )}
              </div>
            )}

            {/* Custom Address Input */}
            {showCustomAddressInput && (
              <div>
                <Label htmlFor="customAddress">Enter Custom Address</Label>
                <Input
                  id="customAddress"
                  placeholder="Enter your address or neighborhood"
                  value={customAddress}
                  onChange={(e) => setCustomAddress(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            )}

            <div>
              <Label htmlFor="birthDate">Birth Date (Optional)</Label>
              <Input
                id="birthDate"
                type="date"
                {...form.register("birthDate")}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Professional Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900 dark:text-white">Professional Information</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyName">Company Name (Optional)</Label>
                <Input
                  id="companyName"
                  placeholder="Your company"
                  {...form.register("companyName")}
                  disabled={isLoading}
                />
              </div>
              <div>
                <Label htmlFor="jobTitle">Job Title (Optional)</Label>
                <Input
                  id="jobTitle"
                  placeholder="Your position"
                  {...form.register("jobTitle")}
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex gap-3">
            <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">Your Privacy is Protected</p>
              <p className="text-sm text-blue-700 dark:text-blue-200 mt-1">
                We keep your data private and secure. Your information will only be used for invoice creation and customer support. We never expose your personal data publicly.
              </p>
            </div>
          </div>

          {/* Newsletter Toggle */}
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#128C7E]" />
              <div>
                <p className="font-semibold text-slate-900 dark:text-slate-100">Join our Newsletter</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Get updates about new features and offers</p>
              </div>
            </div>
            <Switch
              checked={newsletter}
              onCheckedChange={setNewsletter}
              disabled={isLoading}
            />
          </div>

          {/* Terms Acceptance */}
          <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/10 rounded-lg border border-amber-200 dark:border-amber-900/50">
            <Checkbox
              id="terms"
              checked={termsAccepted}
              onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
              disabled={isLoading}
              className="mt-1"
            />
            <label htmlFor="terms" className="text-sm text-slate-700 dark:text-slate-300 cursor-pointer flex-1">
              I have read and accept the{" "}
              <a href="/legal/terms-of-service" target="_blank" className="text-[#128C7E] hover:underline font-semibold">
                Terms of Service
              </a>
              {" "}and{" "}
              <a href="/legal/privacy-policy" target="_blank" className="text-[#128C7E] hover:underline font-semibold">
                Privacy Policy
              </a>
            </label>
          </div>

          {/* Error Display */}
          {Object.keys(form.formState.errors).length > 0 && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-red-900 dark:text-red-100">Please fix the following errors:</p>
                <ul className="text-sm text-red-700 dark:text-red-200 mt-2 list-disc list-inside">
                  {Object.entries(form.formState.errors).map(([key, error]) => (
                    <li key={key}>
                      {key}: {error?.message || "Invalid value"}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !termsAccepted}
              className="flex-1 bg-[#128C7E] hover:bg-[#0f7469] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving Profile...
                </>
              ) : !termsAccepted ? (
                "Accept terms to continue"
              ) : (
                "Complete Profile"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
