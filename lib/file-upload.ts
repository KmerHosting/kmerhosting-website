import fs from "fs"
import path from "path"
import { v4 as uuidv4 } from "uuid"

/**
 * Saves base64 image data to local filesystem
 * @param base64Data - Base64 encoded image data (including data:image/... prefix)
 * @param uploadFolder - Folder name (e.g., 'payment-proofs', 'service-docs')
 * @returns Relative path to saved image
 */
export async function saveBase64Image(
  base64Data: string,
  uploadFolder: string = "payment-proofs"
): Promise<string> {
  try {
    // Extract base64 content and file type
    const matches = base64Data.match(/^data:image\/([a-zA-Z0-9]+);base64,(.+)$/)
    if (!matches) {
      throw new Error("Invalid base64 image format")
    }

    const fileExtension = matches[1]
    const base64Content = matches[2]
    const buffer = Buffer.from(base64Content, "base64")

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), "public", "uploads", uploadFolder)
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true })
    }

    // Generate unique filename
    const filename = `${uuidv4()}.${fileExtension}`
    const filepath = path.join(uploadsDir, filename)

    // Save file
    fs.writeFileSync(filepath, buffer)

    // Return relative path for database storage
    return `/uploads/${uploadFolder}/${filename}`
  } catch (error) {
    console.error("Error saving image:", error)
    throw error
  }
}

/**
 * Saves multiple base64 images
 * @param images - Array of base64 encoded images
 * @param uploadFolder - Folder name
 * @returns Array of relative paths
 */
export async function saveMultipleImages(
  images: string[],
  uploadFolder: string = "payment-proofs"
): Promise<string[]> {
  try {
    const savedPaths: string[] = []
    for (const image of images) {
      const path = await saveBase64Image(image, uploadFolder)
      savedPaths.push(path)
    }
    return savedPaths
  } catch (error) {
    console.error("Error saving multiple images:", error)
    throw error
  }
}

/**
 * Deletes an image file from local filesystem
 * @param imagePath - Relative path of image (e.g., /uploads/payment-proofs/uuid.jpg)
 */
export async function deleteImage(imagePath: string): Promise<void> {
  try {
    const fullPath = path.join(process.cwd(), "public", imagePath)
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath)
    }
  } catch (error) {
    console.error("Error deleting image:", error)
    throw error
  }
}
