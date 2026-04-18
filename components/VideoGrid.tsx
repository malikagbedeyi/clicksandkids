"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Photo } from "../lib/photos";

interface VideoGridProps {
  videos: Photo[];
}

export default function VideoGrid({ videos }: VideoGridProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (videos.length === 0) {
    return (
      <div className="gallery-empty">
        <p className="eyebrow">No videos yet</p>
        <p>Check back soon for video moments!</p>
      </div>
    );
  }

  return (
    <div className="video-grid">
      {videos.map((video, index) => (
        <VideoThumbnail
          key={video.id}
          video={video}
          isHovered={hoveredId === video.id}
          onHover={setHoveredId}
          isWide={index % 4 === 0}
        />
      ))}
    </div>
  );
}

interface VideoThumbnailProps {
  video: Photo;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  isWide: boolean;
}

function VideoThumbnail({ video, isHovered, onHover, isWide }: VideoThumbnailProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <motion.div
      className={`video-grid-item ${isWide ? 'wide' : ''}`}
      onMouseEnter={() => {
        onHover(video.id);
        if (videoRef.current) {
          videoRef.current.play().catch((e) => console.warn("Video play failed:", e));
        }
      }}
      onMouseLeave={() => {
        onHover(null);
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <div className="video-grid-wrap">
        <video
          ref={videoRef}
          src={video.src}
          muted
          loop
          playsInline
          preload="metadata"
          className="video-grid-element"
          poster={video.src}
        />
        <div className="video-play-icon">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle
              cx="24"
              cy="24"
              r="22"
              stroke="currentColor"
              strokeWidth="2"
              opacity="0.8"
            />
            <polygon points="19,14 19,34 33,24" fill="currentColor" opacity="0.8" />
          </svg>
        </div>
      </div>
      <div className="video-grid-overlay">
        <h3>{video.title}</h3>
        <p className="eyebrow">{video.location}</p>
      </div>
    </motion.div>
  );
}
