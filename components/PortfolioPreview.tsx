"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Photo } from "../lib/photos";

interface PortfolioPreviewProps {
  photos: Photo[];
  videos: Photo[];
}

export default function PortfolioPreview({ photos, videos }: PortfolioPreviewProps) {
  const items = [...photos.slice(0, 4), ...videos.slice(0, 2)];

  return (
    <div className="portfolio-preview-grid">
      {items.map((item, index) => {
        const isVideo = item.media_type === "video";
        // Create asymmetrical layout with varying aspects
        const aspectClasses = [
          "aspect-tall",   // 3:4
          "aspect-wide",   // 16:9
          "aspect-square", // 1:1
          "aspect-tall",   // 3:4
          "aspect-wide",   // 16:9
          "aspect-square"  // 1:1
        ];
        const aspectClass = aspectClasses[index % aspectClasses.length];
        
        return (
          <motion.div
            key={item.id}
            className={`portfolio-item ${aspectClass} ${isVideo ? "portfolio-video" : "portfolio-photo"}`}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.06 }}
          >
            {isVideo ? <VideoPreviewItem video={item} /> : <PhotoPreviewItem photo={item} />}
          </motion.div>
        );
      })}
    </div>
  );
}

function PhotoPreviewItem({ photo }: { photo: Photo }) {
  return (
    <div className="preview-item-wrap">
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="preview-image"
      />
    </div>
  );
}

function VideoPreviewItem({ video }: { video: Photo }) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div
      className="preview-item-wrap"
      onMouseEnter={() => {
        setIsHovered(true);
        if (videoRef.current) {
          videoRef.current.play().catch((e) => console.warn("Video play failed:", e));
        }
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }}
    >
      <video
        ref={videoRef}
        src={video.src}
        muted
        loop
        playsInline
        preload="metadata"
        className="preview-video"
      />
      {!isHovered && (
        <div className="preview-play-button">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.5" />
            <polygon points="16,12 16,28 28,20" fill="currentColor" />
          </svg>
        </div>
      )}
    </div>
  );
}
