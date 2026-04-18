// lib/photos.ts
import { prisma } from "./db";

export type Photo = {
  id: string;
  title: string;
  src: string;
  alt: string;
  aspect: string;
  iso: string;
  aperture: string;
  location: string;
  priority: number;
  category: string;
  media_type: "photo" | "video";
  resource_type: "image" | "video";
  public_id?: string; 
};

export const seedPhotos: Photo[] = [
  {
    id: "seed-1",
    title: "Clicks & Kids",
    src: "/image/hero/photo-img.jpg", 
    alt: "Stable fallback",
    aspect: "wide",
    iso: "100",
    aperture: "f/2.8",
    location: "Dublin",
    priority: 1,
    category: "Studio",
    media_type: "photo",
    resource_type: "image"
  }
];

// 1. Get ALL Media (Used by LatestWorks grid)
export async function getPhotos(): Promise<Photo[]> {
  try {
    const photos = await prisma.photo.findMany({ 
      orderBy: [{ priority: "desc" }, { createdAt: "desc" }] 
    });
    
    if (!photos || photos.length === 0) {
      return seedPhotos;
    }
    
    return photos.map((p: any) => ({
      ...p,
      media_type: p.media_type || "photo",
      resource_type: p.resource_type || (p.media_type === "video" ? "video" : "image"),
    })) as Photo[];
  } catch (error) {
    console.error("Database fetch error:", error);
    return seedPhotos;
  }
}

// 2. Get Media by Type (Used for specific photo/video filtering)
export async function getPhotosByType(media_type: "photo" | "video"): Promise<Photo[]> {
  try {
    const photos = await prisma.photo.findMany({
      where: { media_type },
      orderBy: [{ priority: "desc" }, { createdAt: "desc" }]
    });

    if (!photos || photos.length === 0) {
      return seedPhotos.filter((p) => p.media_type === media_type);
    }

    return photos as unknown as Photo[];
  } catch (error) {
    return seedPhotos.filter((p) => p.media_type === media_type);
  }
}

// 3. Create Photo (RESTORED - Used by the Admin Upload page)
export async function createPhoto(data: {
  title: string;
  src: string;
  alt: string;
  aspect: "tall" | "wide" | "square" | string;
  iso: string;
  aperture: string;
  location: string;
  category: string;
  media_type?: "photo" | "video";
  resource_type?: "image" | "video";
  public_id?: string;
  priority?: number;
}) {
  return prisma.photo.create({
    data: {
      ...data,
      priority: data.priority ?? 0,
      media_type: data.media_type ?? "photo",
      resource_type: data.resource_type ?? (data.media_type === "video" ? "video" : "image")
    }
  });
}

export const getAllMedia = getPhotos;