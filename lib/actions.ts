"use server";

import { createPhoto } from "./photos";
import { revalidatePath } from "next/cache";
import cloudinary from "./cloudinary";

export async function uploadMediaAction(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    const title = formData.get("title") as string;
    const media_type = (formData.get("media_type") as "photo" | "video") || "photo";

    if (!file || file.size === 0) {
      throw new Error("No file uploaded or file is empty.");
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "click-and-kids",
          resource_type: media_type === "video" ? "video" : "image",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    // Save to Database
    const photo = await createPhoto({
      title: title || file.name,
      src: uploadResult.secure_url,
      alt: (formData.get("alt") as string) || title,
      aspect: (formData.get("aspect") as "tall" | "wide" | "square") || "wide",
      iso: (formData.get("iso") as string) || "100",
      aperture: (formData.get("aperture") as string) || "f/2.8",
      location: (formData.get("location") as string) || "Unknown",
      category: (formData.get("category") as string) || "Gallery",
      media_type: media_type,
      resource_type: uploadResult.resource_type,
      public_id: uploadResult.public_id,
    });

    revalidatePath("/gallery");
    revalidatePath("/admin/manage");
    
    return { success: true, data: photo };
  } catch (error: any) {
    console.error("Upload Error:", error);
    return { success: false, error: error.message || "Failed to upload" };
  }
}