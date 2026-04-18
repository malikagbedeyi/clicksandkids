"use server";

import { v2 as cloudinary } from "cloudinary";
import { prisma } from "../../../lib/db";
import { revalidatePath } from "next/cache";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function deleteMediaItem(
  mediaId: string,
  cloudinaryPublicId: string,
  resourceType: "image" | "video"
) {
  console.log(`Attempting to delete: ${cloudinaryPublicId}`);

  try {
    const cloudinaryResponse = await cloudinary.uploader.destroy(cloudinaryPublicId, {
      resource_type: resourceType,
    });

    if (cloudinaryResponse.result !== "ok" && cloudinaryResponse.result !== "not found") {
      console.error("Cloudinary delete failed:", cloudinaryResponse);
      throw new Error(`Cloudinary Error: ${cloudinaryResponse.result}`);
    }


    await prisma.photo.delete({
      where: {
        id: mediaId,
      },
    });

    revalidatePath("/");
    revalidatePath("/gallery");
    revalidatePath("/admin/manage");

    return { success: true };
  } catch (error: any) {
    console.error("deleteMediaItem failed:", error.message);

    throw new Error(error.message || "Failed to delete item.");
  }
}