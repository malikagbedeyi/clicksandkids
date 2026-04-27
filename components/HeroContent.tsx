"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: "01",
    title: <>Capture <br /> <span>Your Moments</span> <b>with Us</b></>,
    description: "Every childhood moment is fleeting — let us help you hold onto it forever.",
    image: "/image/gallery/img-03.jpg",
  },
  {
    id: "02",
    title: <>Creative <br /> <span>Themed Sets</span> <b>for Kids</b></>,
    description: "From classic plain to stunning African Trad builds, tailored for every occasion.",
    image: "/image/gallery/img-02.jpg",
  },
  {
    id: "03",
    title: <>Timeless <br /> <span>Maternity</span> <b>Glow</b></>,
    description: "A cinematic portrait experience for mother and child.",
    image: "/image/gallery/img-05.jpg",
  },
];

export default function HeroContent() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [index]);

  return (
    <section className="hero-wrapper">
      <div className="hero-video-bg">
        <AnimatePresence mode="wait">
          <motion.img
  key={slides[index].image}
  src={slides[index].image}
  initial={{ opacity: 0, scale: 1.1 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 1, ease: "easeInOut" }}
  className="hero-img" 
  style={{ display: "block" }}
  onError={(e) => {
    const target = e.target as HTMLImageElement;
    target.src = ""; 
    target.style.backgroundColor = "#0A0A0A";
  }}
/>
        </AnimatePresence>
      </div>

      <div className="hero-content-left">
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[index].id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <p className="hero-description">{slides[index].description}</p>
            <h1 className="hero-title">{slides[index].title}</h1>
            <motion.a href="about" className="hero-link" whileHover={{ x: 10 }}>
              LEARN MORE —
            </motion.a>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="hero-side-nav">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            onClick={() => setIndex(i)}
            className={`cursor-pointer transition-all duration-300 ${
              index === i ? "active text-[#C8A988] scale-125" : "text-white/40 hover:text-white"
            }`}
            style={{ background: 'none', border: 'none', padding: 0 }}
          >
            {slide.id}
          </button>
        ))}
      </div>
    </section>
  );
}