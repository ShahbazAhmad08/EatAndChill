import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import path from "path";
import Settings from "@/lib/models/Settings";
import { connectDB } from "@/lib/db";

export { cloudinary };

/**
 * Upload an image buffer to Cloudinary with graceful fallback to local /uploads
 * @param {Buffer} buffer - File buffer
 * @param {string} originalName - Original file name
 * @param {string} folder - Target folder on Cloudinary
 * @returns {Promise<{ url: string, isCloudinary: boolean, filename?: string }>}
 */
export async function uploadImage(buffer, originalName = "dish.jpg", folder = "eat_and_chill_dishes") {
  let cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  let apiKey = process.env.CLOUDINARY_API_KEY;
  let apiSecret = process.env.CLOUDINARY_API_SECRET;

  // Check if configured dynamically in Admin Settings
  try {
    await connectDB();
    const settings = await Settings.findOne({});
    if (settings) {
      if (settings.cloudinaryCloudName) cloudName = settings.cloudinaryCloudName;
      if (settings.cloudinaryApiKey) apiKey = settings.cloudinaryApiKey;
      if (settings.cloudinaryApiSecret) apiSecret = settings.cloudinaryApiSecret;
    }
  } catch (_) {}

  // 1. Try Cloudinary if credentials are configured
  if (cloudName && apiKey && apiSecret) {
    try {
      cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
      });

      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder,
            resource_type: "image",
            transformation: [{ width: 800, height: 800, crop: "fill", quality: "auto" }],
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(buffer);
      });

      return {
        url: result.secure_url,
        isCloudinary: true,
        publicId: result.public_id,
      };
    } catch (err) {
      console.warn("Cloudinary upload failed, falling back to local storage:", err.message);
    }
  }

  // 2. Fallback to local storage in public/uploads and public/images
  const uniqueName = `${Date.now()}-${originalName.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  const imagesDir = path.join(process.cwd(), "public", "images");

  await fs.mkdir(uploadDir, { recursive: true });
  await fs.mkdir(imagesDir, { recursive: true });

  await fs.writeFile(path.join(uploadDir, uniqueName), buffer);
  await fs.writeFile(path.join(imagesDir, uniqueName), buffer);

  return {
    url: `/uploads/${uniqueName}`,
    isCloudinary: false,
    filename: uniqueName,
  };
}
