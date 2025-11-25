"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploaderProps {
  onImagesChange: (files: File[]) => void;
  maxImages?: number;
}

export default function ImageUploader({
  onImagesChange,
  maxImages = 5,
}: ImageUploaderProps) {
  const [images, setImages] = useState<
    Array<{ file: File; preview: string }>
  >([]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages = Array.from(files);

    // Check total count
    if (images.length + newImages.length > maxImages) {
      alert(`Maximum ${maxImages} images allowed`);
      return;
    }

    // Validate and add images
    const validImages: Array<{ file: File; preview: string }> = [];

    for (const file of newImages) {
      // Validate type
      if (!file.type.startsWith("image/")) {
        console.warn(`${file.name} is not an image`);
        continue;
      }

      // Validate size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        console.warn(`${file.name} exceeds 5MB limit`);
        continue;
      }

      // Create preview
      const preview = URL.createObjectURL(file);
      validImages.push({ file, preview });
    }

    const updatedImages = [...images, ...validImages];
    setImages(updatedImages);
    onImagesChange(updatedImages.map((img) => img.file));

    // Reset input
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    URL.revokeObjectURL(images[index].preview);
    setImages(newImages);
    onImagesChange(newImages.map((img) => img.file));
  };

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium text-slate-900 dark:text-white">
        Attachments (Max {maxImages} images)
      </div>

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image.preview}
                alt={`Preview ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg border border-slate-200 dark:border-slate-700"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 p-1 bg-red-500 hover:bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                <X className="w-4 h-4 text-white" />
              </button>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">
                {image.file.name}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Upload Button */}
      {images.length < maxImages && (
        <label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            className="w-full cursor-pointer"
            asChild
          >
            <div className="flex items-center justify-center gap-2 p-2">
              <Plus className="w-4 h-4" />
              Add Images ({images.length}/{maxImages})
            </div>
          </Button>
        </label>
      )}

      {images.length === maxImages && (
        <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
          Maximum images reached
        </p>
      )}
    </div>
  );
}
