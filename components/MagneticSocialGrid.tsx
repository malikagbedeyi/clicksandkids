"use client";

import { motion } from "framer-motion";
import { useMemo, useRef, useState } from "react";

const socialLinks = [
  { label: "Instagram", url: "https://instagram.com" },
  { label: "Behance", url: "https://behance.net" },
  { label: "Vimeo", url: "https://vimeo.com" },
  { label: "LinkedIn", url: "https://linkedin.com" }
];

export default function MagneticSocialGrid() {
  const [cursor, setCursor] = useState({ x: 0, y: 0, active: false });
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  const linkOffsets = useMemo(
    () =>
      socialLinks.map((_, index) => {
        const item = itemRefs.current[index];
        if (!item || !cursor.active) {
          return { x: 0, y: 0 };
        }

        const rect = item.getBoundingClientRect();
        const dx = (cursor.x - (rect.left + rect.width / 2)) / 16;
        const dy = (cursor.y - (rect.top + rect.height / 2)) / 16;

        return {
          x: Math.max(-18, Math.min(18, dx)),
          y: Math.max(-18, Math.min(18, dy))
        };
      }),
    [cursor]
  );

  return (
    <div
      className="magnetic-grid"
      onMouseLeave={() => setCursor((state) => ({ ...state, active: false }))}
      onMouseMove={(event) =>
        setCursor({ x: event.clientX, y: event.clientY, active: true })
      }
    >
      {socialLinks.map((link, index) => (
        <motion.a
          key={link.label}
          ref={(el) => {
            itemRefs.current[index] = el;
          }}
          href={link.url}
          target="_blank"
          rel="noreferrer"
          className="social-pill magnetic-pill"
          animate={linkOffsets[index]}
          transition={{ type: "spring", stiffness: 250, damping: 24 }}
          whileHover={{ scale: 1.04 }}
        >
          {link.label}
        </motion.a>
      ))}
    </div>
  );
}
