"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  useVelocity
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Photo } from "../lib/photos";

type GalleryProps = {
  photos: Photo[];
};

export default function Gallery({ photos }: GalleryProps) {
  const ordered = useMemo(
    () => [...photos].sort((a, b) => b.priority - a.priority),
    [photos]
  );

  const shellRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const [maxScroll, setMaxScroll] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const progress = useMotionValue(0);

  const velocity = useVelocity(x);
  const tilt = useTransform(velocity, [-1200, 0, 1200], [8, 0, -8]);
  const metaX = useTransform(x, (latest) => {
    const current = Math.min(Math.max(-latest, 0), maxScroll);
    return current / maxScroll * 20;
  });

  useEffect(() => {
    const updateMaxScroll = () => {
      const shell = shellRef.current;
      const track = trackRef.current;
      if (!shell || !track) return;

      const available = Math.max(track.scrollWidth - shell.clientWidth, 1);
      setMaxScroll(available);
      setIsMobile(window.innerWidth < 768);
    };

    updateMaxScroll();
    window.addEventListener("resize", updateMaxScroll);
    return () => window.removeEventListener("resize", updateMaxScroll);
  }, []);

  useMotionValueEvent(x, "change", (latest) => {
    const current = Math.min(Math.max(-latest, 0), maxScroll);
    progress.set(maxScroll ? current / maxScroll : 0);
  });

  return (
    <div className="gallery-shell" role="list" ref={shellRef}>
      <motion.div
        ref={trackRef}
        className="gallery-track"
        style={{ x }}
        drag={isMobile ? false : "x"}
        dragConstraints={{ left: -maxScroll, right: 0 }}
        dragElastic={0.18}
        dragMomentum
        whileTap={{ cursor: "grabbing" }}
      >
        {ordered.map((photo, index) => (
          <motion.article
            key={photo.id}
            className={`gallery-card gallery-card--${photo.aspect}`}
            style={{ rotate: tilt }}
            whileHover={{ y: -10 }}
          >
            <div className="image-frame">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="gallery-image"
                sizes="(max-width: 768px) 92vw, 33vw"
                priority={index < 3}
              />
            </div>
            <motion.div className="meta-overlay" style={{ x: metaX }}>
              <p className="meta-title">{photo.title}</p>
              <p>{photo.iso} • {photo.aperture} • {photo.location}</p>
            </motion.div>
          </motion.article>
        ))}
      </motion.div>
      <div className="gallery-progress">
        <motion.div
          className="gallery-progress__fill"
          style={{ scaleX: progress }}
          initial={{ scaleX: 0 }}
        />
      </div>
    </div>
  );
}
