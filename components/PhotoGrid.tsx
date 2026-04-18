"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Photo } from "../lib/photos";

interface PhotoGridProps {
  photos: Photo[];
}

export default function PhotoGrid({ photos }: PhotoGridProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 }
  };

  if (photos.length === 0) {
    return (
      <div className="gallery-empty">
        <p>No photos yet. Check back soon!</p>
      </div>
    );
  }

  return (
    <motion.div
      className="photo-grid"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {photos.map((photo, index) => (
        <motion.div
          key={photo.id}
          className={`photo-grid-item ${index % 5 === 0 ? 'large' : ''}`}
          variants={itemVariants}
        >
          <div className="photo-wrapper">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="photo-image"
            />
          </div>
          <div className="photo-info">
            <h3>{photo.title}</h3>
            <p className="photo-location">{photo.location}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
