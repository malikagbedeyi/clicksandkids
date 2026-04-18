"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 1. Update the interface to match your Prisma model
interface Testimonial {
  id: string;
  name: string;
  session: string | null; // This matches 'role' in your old code
  content: string;        // This matches 'text' in your old code
}

interface TestimonialSliderProps {
  data: Testimonial[];
}

export default function TestimonialSlider({ data }: TestimonialSliderProps) {
  const [current, setCurrent] = useState(0);

  // If there are no approved testimonials, don't show the section
  if (!data || data.length === 0) return null;

  const next = () => setCurrent((current + 1) % data.length);
  const prev = () => setCurrent((current - 1 + data.length) % data.length);

  const testimonial = data[current];

  return (
    <section className="testimonial-section">
      <div className="max-w-[1000px] mx-auto px-6">
        <span className="eyebrow" style={{display:"flex" , justifyContent:"center", marginBottom:"100px"}}>Client Stories</span>
        
        <div className="testimonial-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.6, ease: [0.2, 0.6, 0.2, 1] }}
              className="testimonial-card"
            >
              <div className="quote-mark">“</div>
              
              <blockquote className="testimonial-quote">
                {testimonial.content}
              </blockquote>

              <div className="testimonial-meta">
                <div className="meta-line"></div>
                <p className="testimonial-name">{testimonial.name}</p>
                <p className="testimonial-role">{testimonial.session}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="testimonial-nav">
            <button onClick={prev} className="nav-btn" aria-label="Prev">
              <span className="nav-arrow">←</span>
            </button>
            
            <div className="nav-dots">
              {data.map((_, index) => (
                <button
                  key={index}
                  className={`nav-dot ${index === current ? "active" : ""}`}
                  onClick={() => setCurrent(index)}
                />
              ))}
            </div>

            <button onClick={next} className="nav-btn" aria-label="Next">
              <span className="nav-arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}