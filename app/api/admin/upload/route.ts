import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createPhoto } from "../../../../lib/photos";
import { revalidatePath } from "next/cache";

// Disable default body parser for streaming support
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "500mb",
    },
  },
};

function createCloudinarySignature(params: Record<string, string>, apiSecret: string) {
  const sortedKeys = Object.keys(params).sort();
  const sortedParams: Record<string, string> = {};
  const signatureBase = sortedKeys
    .map((key) => {
      sortedParams[key] = params[key];
      return `${key}=${params[key]}`;
    })
    .join("&");

  console.log("🔐 Cloudinary signature params:", sortedParams);

  const signature = crypto
    .createHash("sha1")
    .update(`${signatureBase}${apiSecret}`)
    .digest("hex");

  console.log("🔐 Generated Cloudinary signature:", signature);
  return signature;
}

async function uploadToCloudinary(
  file: File,
  cloudName: string,
  apiKey: string,
  apiSecret: string,
  isVideo: boolean
): Promise<any> {
  console.log("📤 Starting Cloudinary upload for:", {
    fileName: file.name,
    fileSize: file.size,
    fileType: file.type,
    isVideo,
  });

  const timestamp = Math.floor(Date.now() / 1000);
  const paramsToSign: Record<string, string> = {
    api_key: apiKey,
    folder: "click-and-kids",
    resource_type: isVideo ? "video" : "image",
    timestamp: String(timestamp),
  };

  // Remove eager for now to simplify video uploads
  // if (isVideo) {
  //   paramsToSign.eager = "c_scale,w_320,h_240,f_jpg|c_scale,w_640,h_480,f_jpg";
  //   paramsToSign.eager_async = "true";
  // }

  const signature = createCloudinarySignature(paramsToSign, apiSecret);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("signature", signature);
  Object.entries(paramsToSign).forEach(([key, value]) => {
    formData.append(key, value);
  });

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const responseText = await response.text();
    let result: any;

    try {
      result = JSON.parse(responseText);
    } catch {
      result = { raw: responseText };
    }

    if (!response.ok || result.error) {
      const errorBody = result.error || result.message || result.raw || responseText;
      console.error("❌ Cloudinary API Error:", {
        status: response.status,
        statusText: response.statusText,
        errorBody,
        fullResponse: result,
      });

      throw new Error(
        typeof errorBody === "string"
          ? `Cloudinary upload failed: ${errorBody}`
          : `Cloudinary upload failed with status ${response.status}`
      );
    }

    console.log("✅ Cloudinary upload successful:", {
      publicId: result.public_id,
      secureUrl: result.secure_url,
      format: result.format,
      duration: result.duration,
    });

    return result;
  } catch (error) {
    console.error("🚨 Cloudinary upload error:", {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    throw error;
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const title = (formData.get("title") as string) ?? null;
    const alt = (formData.get("alt") as string) ?? "Uploaded media";
    const category = (formData.get("category") as string) ?? "Gallery";
    const location = (formData.get("location") as string) ?? "Unknown";
    const iso = (formData.get("iso") as string) ?? "100";
    const aperture = (formData.get("aperture") as string) ?? "f/2.8";
    const aspect = (formData.get("aspect") as string) as "tall" | "wide" | "square";
    const media_type = (formData.get("media_type") as "photo" | "video") ?? "photo";

    if (!file || !title) {
      console.error("❌ Upload API missing required fields:", { file: Boolean(file), title });
      return NextResponse.json(
        { error: "Required upload fields are missing (file, title)" },
        { status: 400 }
      );
    }

    const isVideo = media_type === "video";

    console.log("📨 Upload API request received:", {
      fileName: file.name,
      fileSize: file.size,
      mediaType: media_type,
      title,
    });

    const adminToken = process.env.ADMIN_UPLOAD_TOKEN;
    const authCookie = request.cookies.get("admin_access")?.value;

    if (adminToken && authCookie !== adminToken) {
      console.warn("Unauthorized API upload access attempt", {
        authCookiePresent: Boolean(authCookie),
      });
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      console.warn("⚠️  Cloudinary credentials missing - using mock mode");
      // Mock upload for development
      const mockSrc = isVideo
        ? `https://res.cloudinary.com/demo/video/upload/v1/sample.mp4`
        : `https://res.cloudinary.com/demo/image/upload/w_1200,h_900,c_fill/v1/sample.jpg`;

      const photo = await createPhoto({
        title,
        src: mockSrc,
        alt,
        category,
        location,
        iso,
        aperture,
        aspect: aspect ?? "wide",
        media_type,
        public_id: `mock_${Date.now()}`,
        resource_type: isVideo ? "video" : "image",
      });

      revalidatePath("/gallery");
      revalidatePath("/");

      return NextResponse.json(photo, { status: 200 });
    }

    // Upload to Cloudinary with streaming support
    const result = await uploadToCloudinary(file, cloudName, apiKey, apiSecret, isVideo);

    if (!result.secure_url) {
      console.error("❌ Cloudinary response missing secure_url:", result);
      return NextResponse.json(
        { error: "Cloudinary did not return a secure URL" },
        { status: 500 }
      );
    }

    // Create database record with correct media_type
    const photo = await createPhoto({
      title,
      src: result.secure_url,
      alt,
      category,
      location,
      iso,
      aperture,
      aspect: aspect ?? "wide",
      media_type, // Ensure media_type is saved as 'video' or 'photo'
      public_id: result.public_id,
      resource_type: isVideo ? "video" : "image",
    });

    console.log("✅ Media saved to database:", {
      id: photo.id,
      media_type: media_type,
      title: photo.title,
    });

    revalidatePath("/gallery");
    revalidatePath("/");

    return NextResponse.json(photo, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;

    console.error("❌ Upload API error:", {
      message: errorMessage,
      stack: errorStack,
    });

    return NextResponse.json(
      {
        error: errorMessage || "Upload failed",
        details: process.env.NODE_ENV === "development" ? errorStack : undefined,
      },
      { status: 500 }
    );
  }
}
