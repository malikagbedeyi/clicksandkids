"use server";

import { createPhoto } from "@../../../lib/photos"; 
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadPhoto(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    const title = formData.get("title") as string;
    const media_type = formData.get("media_type") as string; 
    
    if (!file || file.size === 0) {
      throw new Error("No file uploaded");
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Data = buffer.toString("base64");
    const fileUri = `data:${file.type};base64,${base64Data}`;

    const uploadResult = await cloudinary.uploader.upload(fileUri, {
      folder: "click-and-kids",
      resource_type: "auto", 
    });

    // Fix: Type casting Cloudinary string to your Prisma Type
    const validResourceType = (uploadResult.resource_type === "image" || uploadResult.resource_type === "video") 
      ? uploadResult.resource_type 
      : "image";

    const newPhoto = await createPhoto({
      title: title || file.name,
      src: uploadResult.secure_url,
      alt: (formData.get("alt") as string) || title,
      category: (formData.get("category") as string) || "Gallery",
      location: (formData.get("location") as string) || "Unknown",
      
      iso: uploadResult.width.toString(), 
      aperture: uploadResult.height.toString(),
      
      aspect: uploadResult.width > uploadResult.height ? "wide" : "tall",
      media_type: media_type === "video" ? "video" : "photo",
      resource_type: validResourceType as "image" | "video",
      public_id: uploadResult.public_id,
    });

    revalidatePath("/");
    revalidatePath("/admin/upload");

    return JSON.parse(JSON.stringify(newPhoto)); 
  } catch (error: any) {
    const errorMessage = error?.error?.message || error.message || "Failed to upload to server";
    throw new Error(errorMessage);
  }
}