import type { Metadata } from "next";

import { getPhotosByType } from "../../lib/photos";
import GalleryTabs from "../../components/GalleryTabs";

export const metadata: Metadata = {
  title: "Gallery — Click & Kids Photography",
  description: "Browse our collection of photos and videos showcasing the joy of childhood.",
};

export default async function GalleryPage() {

  const photos = await getPhotosByType("photo");
  const videos = await getPhotosByType("video");

  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <div className="gallery-page-header">
        <h1 className="text-white">Gallery</h1>
      </div>

      <div className="page-shell !pt-0">
        <GalleryTabs initialPhotos={photos} initialVideos={videos} />
      </div>
    </main>
  );
}